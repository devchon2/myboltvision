import React from 'react';

// Simple mock that renders content as a div
function ReactMarkdown({ children }) {
  return React.createElement('div', { className: 'react-markdown-mock' }, children);
}

export default ReactMarkdown;

// Mock the Components type
export const Components = {};
