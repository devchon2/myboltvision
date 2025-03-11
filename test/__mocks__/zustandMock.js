// Mock pour le module 'zustand'
module.exports = {
  useStore: jest.fn(() => ({})),
  create: jest.fn(() => jest.fn(() => ({}))),
  createStore: jest.fn(() => ({
    getState: jest.fn(),
    setState: jest.fn(),
    subscribe: jest.fn()
  }))
};
