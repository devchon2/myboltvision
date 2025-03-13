'use client';

import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import { createScopedLogger } from '../../utils/logger';

const logger = createScopedLogger('CodeEditor');

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  theme?: 'vs-dark' | 'vs-light';
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
  className?: string;
}

/**
 * Version simplifiée de l'éditeur de code pour la migration vers Next.js
 * Cette version utilise un textarea standard en attendant l'intégration complète de Monaco Editor
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '',
  language = 'javascript',
  theme = 'vs-dark',
  readOnly = false,
  onChange,
  onSave,
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState(initialValue);
  const isDarkTheme = theme === 'vs-dark';

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Gestion des raccourcis clavier (Ctrl+S/Cmd+S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();

        if (onSave) {
          onSave(value);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [value, onSave]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div
      className={classNames(
        'code-editor-container h-full w-full overflow-hidden border rounded-md',
        isDarkTheme ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200',
        className,
      )}
    >
      <div className="p-2 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span
            className={classNames(
              'text-sm font-mono px-2 py-1 rounded',
              isDarkTheme ? 'bg-gray-700 text-blue-300' : 'bg-gray-100 text-blue-600',
            )}
          >
            {language}
          </span>
        </div>
        <div className="space-x-1">
          {onSave && (
            <button
              onClick={() => onSave(value)}
              className={classNames(
                'p-1 rounded text-xs',
                isDarkTheme
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              )}
            >
              Save (Ctrl+S)
            </button>
          )}
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        spellCheck={false}
        className={classNames(
          'w-full h-full p-4 outline-none font-mono text-sm',
          'resize-none overflow-auto',
          isDarkTheme
            ? 'bg-gray-900 text-gray-100 placeholder-gray-500'
            : 'bg-white text-gray-800 placeholder-gray-400',
        )}
        style={{
          minHeight: '200px',
          tabSize: 2,
        }}
        placeholder={`// Entrez votre code ${language} ici...`}
      />

      <style jsx>{`
        textarea {
          line-height: 1.5;
          tab-size: 2;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
