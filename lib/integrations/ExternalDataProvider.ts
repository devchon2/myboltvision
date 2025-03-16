export class ExternalDataProvider {

  async fetchData(source: string): Promise<any> {
    // Simuler la récupération de données externes
    return {
      source,
      data: {
        marketSize: 5000000,
        growthRate: 0.08,
        topCompetitors: [
          { name: "Competitor A", marketShare: 0.25 },
          { name: "Competitor B", marketShare: 0.20 },
          { name: "Competitor C", marketShare: 0.15 },
        ],
        keySegments: [
          { name: "Segment 1", size: 2000000 },
          { name: "Segment 2", size: 1500000 },
          { name: "Segment 3", size: 1500000 },
        ],
      },
      timestamp: Date.now(),
    };
  }
}
