export interface ContextCluster {
  id: string;
  type: string;
  primaryShard: {
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
    relatedClusters: any[];
    data: Record<string, any>;
    parentContextId: string;
  };
  vectors: {
    embedding: number[];
    metadata: Record<string, any>;
    content: string;
  }[];
  data: Record<string, any>;
  content: string;
  relatedClusters: any[];
  timestamp: number;
  complexityMetric: number;
  innovationPotential: number;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
  };
  shards: any[];
}
