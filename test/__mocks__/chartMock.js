// Mock pour le module 'chart.js' et 'react-chartjs-2'
const MockChart = jest.fn().mockImplementation(() => ({
  render: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  data: {}
}));

module.exports = {
  Line: jest.fn().mockImplementation(() => ({
    render: jest.fn()
  })),
  Bar: jest.fn().mockImplementation(() => ({
    render: jest.fn()
  })),
  Pie: jest.fn().mockImplementation(() => ({
    render: jest.fn()
  })),
  Chart: MockChart,
  registerables: [],
  register: jest.fn(),
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
  Filler: jest.fn()
};
