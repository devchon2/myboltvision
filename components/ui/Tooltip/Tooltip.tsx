import React, { useState, useId } from 'react';

export interface TooltipProps {
  /**
   * Contenu du tooltip
   */
  content: React.ReactNode;
  
  /**
   * Délai avant affichage du tooltip (ms)
   */
  delay?: number;

  /**
   * Contenu sur lequel le tooltip s'affiche
   */
  children: React.ReactNode;

  /**
   * Classes CSS personnalisées
   */
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, delay = 300, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  const handleMouseEnter = () => {
    setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div 
      className={`tooltipWrapper ${className || ''}`.trim()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-describedby={isVisible ? tooltipId : undefined}
      style={{ position: 'relative', display: 'inline-flex' }}
    >
      {children}
      <span
        id={tooltipId}
        role="tooltip"
        className="tooltipText"
        style={{
          visibility: isVisible ? 'visible' as const : 'hidden' as const,
          opacity: isVisible ? 1 : 0,
          width: '120px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#ffffff',
          textAlign: 'center' as const,
          borderRadius: '4px',
          padding: '6px 10px',
          position: 'absolute' as const,
          zIndex: 100,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-8px)',
          whiteSpace: 'nowrap' as const,
          fontSize: '14px',
          fontWeight: 'normal',
          transition: 'opacity 0.3s'
        }}
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
