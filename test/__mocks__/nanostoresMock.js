// Mock pour le module '@nanostores/react'
module.exports = {
  useStore: jest.fn(() => ({})),
  atom: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    subscribe: jest.fn()
  })),
  map: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    subscribe: jest.fn()
  }))
};
