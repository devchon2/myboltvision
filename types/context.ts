export interface ContextShard {
  id: string;
  type: string;
  content: string;
  timestamp: number;
  complexityMetric: number;
  innovationPotential: number;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
  };
  relatedClusters: ContextCluster[];
  data: Record<string, any>;
  parentContextId: string;
}

export interface ContextCluster {
  primaryShard?: ContextShard;
  data: Record<string, any>;
  content: string;
  relatedClusters: ContextCluster[];
  timestamp: number;
  complexityMetric: number;
  innovationPotential: number;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
  };
  shards: ContextShard[];
  id: string;
  type: string;
  vectors?: {
    embedding: number[];
    metadata: Record<string, any>;
    content: string;
  }[];
}
