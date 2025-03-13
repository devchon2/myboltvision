'use client';

import React, { useState } from 'react';
import { classNames } from '../../utils/classNames';
import { createScopedLogger } from '../../utils/logger';

const logger = createScopedLogger('WorkflowBuilder');

interface WorkflowNode {
  id: string;
  type: 'input' | 'process' | 'output' | 'decision';
  label: string;
  position: { x: number; y: number };
  connectedTo?: string[];
}

interface WorkflowBuilderProps {
  className?: string;
  initialNodes?: WorkflowNode[];
  readOnly?: boolean;
  onSave?: (nodes: WorkflowNode[]) => void;
}

/**
 * Version simplifiée du constructeur de flux de travail pour la migration Next.js
 */
export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
  className = '',
  initialNodes = [],
  readOnly = false,
  onSave,
}) => {
  const [nodes, setNodes] = useState<WorkflowNode[]>(
    initialNodes.length > 0
      ? initialNodes
      : [
          { id: 'start', type: 'input', label: 'Début', position: { x: 100, y: 100 } },
          {
            id: 'process1',
            type: 'process',
            label: 'Traitement',
            position: { x: 300, y: 100 },
            connectedTo: ['start'],
          },
          {
            id: 'decision',
            type: 'decision',
            label: 'Décision',
            position: { x: 500, y: 100 },
            connectedTo: ['process1'],
          },
          {
            id: 'output1',
            type: 'output',
            label: 'Résultat 1',
            position: { x: 700, y: 50 },
            connectedTo: ['decision'],
          },
          {
            id: 'output2',
            type: 'output',
            label: 'Résultat 2',
            position: { x: 700, y: 150 },
            connectedTo: ['decision'],
          },
        ],
  );

  const [_selectedNode, setSelectedNode] = useState<string | null>(null);
  const [_mode, setMode] = useState<'select' | 'add' | 'connect'>('select');
  const [_zoom, setZoom] = useState(1);

  // Palette de couleurs pour les différents types de nœuds
  const nodeColors = {
    input: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-800' },
    process: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-800' },
    decision: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800' },
    output: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-800' },
  };

  const handleNodeClick = (nodeId: string) => {
    if (readOnly) {
      return;
    }

    if (_mode === 'select') {
      setSelectedNode(_selectedNode === nodeId ? null : nodeId);
    } else if (_mode === 'connect' && _selectedNode) {
      setNodes(
        nodes.map((node) => {
          if (node.id === _selectedNode) {
            return {
              ...node,
              connectedTo: [...(node.connectedTo || []), nodeId].filter(
                (id, index, self) => self.indexOf(id) === index,
              ),
            };
          }

          return node;
        }),
      );
      setSelectedNode(null);
    }
  };

  const addNode = (type: 'input' | 'process' | 'output' | 'decision') => {
    if (readOnly) {
      return;
    }

    const newId = `node-${Date.now()}`;

    setNodes([
      ...nodes,
      {
        id: newId,
        type,
        label: `Nouveau ${type}`,
        position: { x: 300, y: 300 },
      },
    ]);

    setSelectedNode(newId);
  };

  const deleteSelectedNode = () => {
    if (readOnly || !_selectedNode) {
      return;
    }

    const updatedNodes = nodes.filter((node) => node.id !== _selectedNode);

    updatedNodes.forEach((node) => {
      if (node.connectedTo) {
        node.connectedTo = node.connectedTo.filter((id) => id !== _selectedNode);
      }
    });

    setNodes(updatedNodes);
    setSelectedNode(null);
  };

  const saveWorkflow = () => {
    if (onSave) {
      onSave(nodes);
      logger.debug('Workflow saved', { nodesCount: nodes.length });
    }
  };

  return (
    <div className={classNames('workflow-builder overflow-hidden flex flex-col', className)}>
      <div className="p-2 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Éditeur de flux</h3>
          <div className="flex border border-gray-300 rounded overflow-hidden">
            <button
              className={classNames(
                'px-2 py-1 text-xs',
                _mode === 'select' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100',
              )}
              onClick={() => setMode('select')}
            >
              Sélectionner
            </button>
            <button
              className={classNames(
                'px-2 py-1 text-xs',
                _mode === 'add' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100',
              )}
              onClick={() => setMode('add')}
              disabled={readOnly}
            >
              Ajouter
            </button>
            <button
              className={classNames(
                'px-2 py-1 text-xs',
                _mode === 'connect' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100',
              )}
              onClick={() => setMode('connect')}
              disabled={readOnly}
            >
              Connecter
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50"
            onClick={deleteSelectedNode}
            disabled={readOnly || !_selectedNode}
          >
            Supprimer
          </button>
          <button
            className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50"
            onClick={saveWorkflow}
            disabled={readOnly}
          >
            Enregistrer
          </button>
        </div>
      </div>

      {_mode === 'add' && !readOnly && (
        <div className="p-2 border-b border-gray-200 bg-gray-50 flex space-x-2">
          <button
            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded border border-green-500 hover:bg-green-200"
            onClick={() => addNode('input')}
          >
            + Entrée
          </button>
          <button
            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border border-blue-500 hover:bg-blue-200"
            onClick={() => addNode('process')}
          >
            + Traitement
          </button>
          <button
            className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded border border-yellow-500 hover:bg-yellow-200"
            onClick={() => addNode('decision')}
          >
            + Décision
          </button>
          <button
            className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded border border-red-500 hover:bg-red-200"
            onClick={() => addNode('output')}
          >
            + Sortie
          </button>
        </div>
      )}

      <div className="flex-1 bg-gray-50 relative overflow-auto">
        <div
          className="workflow-canvas"
          style={{
            transform: `scale(${_zoom})`,
            transformOrigin: '0 0',
            position: 'relative',
            width: '1500px',
            height: '1000px',
          }}
        >
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {nodes.map((node) =>
              (node.connectedTo || []).map((targetId) => {
                const targetNode = nodes.find((n) => n.id === targetId);

                if (!targetNode) {
                  return null;
                }

                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={node.position.x + 50}
                    y1={node.position.y + 25}
                    x2={targetNode.position.x + 50}
                    y2={targetNode.position.y + 25}
                    stroke="#888"
                    strokeWidth="2"
                    strokeDasharray={node.type === 'decision' ? '5,5' : undefined}
                    markerEnd="url(#arrowhead)"
                  />
                );
              }),
            )}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
              </marker>
            </defs>
          </svg>

          {nodes.map((node) => (
            <div
              key={node.id}
              className={classNames(
                'absolute rounded-md border-2 p-2 min-w-[100px] cursor-move',
                nodeColors[node.type].bg,
                nodeColors[node.type].border,
                nodeColors[node.type].text,
                _selectedNode === node.id ? 'ring-2 ring-offset-2 ring-blue-400' : '',
                readOnly ? 'pointer-events-none' : '',
              )}
              style={{
                left: `${node.position.x}px`,
                top: `${node.position.y}px`,
                zIndex: 2,
              }}
              onClick={() => handleNodeClick(node.id)}
            >
              <div className="text-xs font-semibold">{node.label}</div>
              <div className="text-xs opacity-80">{node.type}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-gray-200 bg-gray-100 flex justify-between text-xs text-gray-600">
        <div>{_selectedNode ? `Nœud sélectionné: ${_selectedNode}` : `${nodes.length} nœuds dans le flux`}</div>
        <div className="flex space-x-2">
          <button
            className="px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-200"
            onClick={() => setZoom(Math.max(0.5, _zoom - 0.1))}
          >
            –
          </button>
          <span>{Math.round(_zoom * 100)}%</span>
          <button
            className="px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-200"
            onClick={() => setZoom(Math.min(2, _zoom + 0.1))}
          >
            +
          </button>
        </div>
      </div>

      {readOnly && (
        <div className="p-2 border-t border-blue-300 bg-blue-50 text-blue-800 text-xs text-center">
          La fonctionnalité de modification des flux est en cours de migration vers Next.js.
        </div>
      )}
    </div>
  );
};

export default WorkflowBuilder;
