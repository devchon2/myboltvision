// Mock pour le module 'ai'
module.exports = {
  createDataStream: jest.fn(),
  generateId: jest.fn(() => 'mocked-id'),
  generateText: jest.fn().mockResolvedValue({ text: 'Mocked response' }),
  LanguageModelV1: jest.fn()
};
