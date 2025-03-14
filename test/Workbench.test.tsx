// @ts-nocheck
/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import Workbench from '../app/components/workbench/Workbench';
import { IdeationAgent } from '../lib/agents/IdeationAgent';
import { MarketAnalysisAgent } from '../lib/agents/MarketAnalysisAgent';
import { DocumentationAgent } from '../lib/agents/DocumentationAgent';
import { DeploymentAgent } from '../lib/agents/DeploymentAgent'; // Import DeploymentAgent
import { DesignAgent } from '../lib/agents/DesignAgent'; // Import DesignAgent
import { DevAgent } from '../lib/agents/DevAgent'; // Import DevAgent
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Workbench', () => {
  it('should render', () => {
    render(<Workbench />);
    expect(screen.getByText('Workbench')).toBeInTheDocument();
  });
});
