'use client';
import { colors } from '../../app/design-system.ts';
import styled from 'styled-components';
import type { CSSProperties } from 'react';

interface StyledProps {
  background?: CSSProperties['background'];
}

const PricingContainer = styled.div<StyledProps>`
  padding: 4rem 2rem;
  background: ${({background}: StyledProps) => background || colors.background};
  text-align: center;
`;

const PlanCard = styled.div<StyledProps>`
  background: ${({background}: StyledProps) => background || 'white'};
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 300px;
  display: inline-block;
`;

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Gratuit',
      features: [
        '1 projet actif',
        '500 requêtes/mois',
        'Support de base'
      ],
      cta: 'Commencer'
    },
    {
      name: 'Pro',
      price: '29€/mois',
      features: [
        '5 projets actifs',
        '5000 requêtes/mois',
        'Support prioritaire',
        'Analytics avancées'
      ],
      cta: 'Essayer'
    },
    {
      name: 'Entreprise',
      price: 'Sur mesure',
      features: [
        'Projets illimités',
        'Requêtes illimitées',
        'Support 24/7',
        'Dédié',
        'SLA 99.9%'
      ],
      cta: 'Nous contacter'
    }
  ];

  return (
    <PricingContainer>
      <h2>Nos offres</h2>
      <div>
        {plans.map((plan, index) => (
          <PlanCard key={index}>
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button>{plan.cta}</button>
          </PlanCard>
        ))}
      </div>
    </PricingContainer>
  );
};

export default Pricing;
