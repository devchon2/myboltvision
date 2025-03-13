export interface ContextCluster {
  id: string;
  type: string;
  data: { [key: string]: any };
  content: string;
  vectors: Array<{
    embedding: number[];
    metadata: { [key: string]: any };
    content: string;
  }>;
  relatedClusters: string[];
  shards: any[];
  primaryShard: {
    id: string;
    type: string;
    data: any;
    content: string;
    timestamp: string;
    metadata: {
      createdAt: Date;
      updatedAt: Date;
      version: string;
    };
    complexityMetric: number;
    innovationPotential: number;
    relatedClusters: string[];
  };
  timestamp: number;
  complexityMetric: number;
  innovationPotential: number;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
  };
}
