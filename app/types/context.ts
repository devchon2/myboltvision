export interface LLMConfig {
  provider: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
}

export interface Context {
  id: string;
  type: string;
  data: Record<string, any>;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    source?: string;
    version: string;
  };
  relations?: ContextRelation[];
}

export interface ContextRelation {
  type: string;
  targetContextId: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface ContextShard {
  id: string;
  type: string;
  data: any;
  content: string;
  timestamp: string | Date | number;
  complexityMetric: number;
  innovationPotential: number;
  relatedClusters: ContextCluster[];
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    source?: string;
    version: string;
  };
  parentContextId?: string;
}

export interface ContextCluster {
  id: string;
  vectors: {
    embedding: number[];
    metadata: Record<string, unknown>;
    content: string;
  }[];
  type: string;
  data: Record<string, any>;
  content: string;
  relatedClusters: string[];
  timestamp: number;
  complexityMetric: number;
  innovationPotential: number;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
  };
  shards: ContextShard[];
  primaryShard?: ContextShard;
  relations?: ContextRelation[];
}
