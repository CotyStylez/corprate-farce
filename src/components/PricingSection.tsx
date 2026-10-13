import type { FC } from 'react';

interface PricingSectionProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const PricingSection: FC<PricingSectionProps> = ({ onShowToast }) => {
  return (
    <section>
      <div className="section-head">
        <h2>Transparent Extortion Models</h2>
        <p>Select the subscription tier that best matches your tolerance for corporate hot air.</p>
      </div>

      <div className="pricing-grid">
        {/* Tier 1 */}
        <div className="pricing-card selected-tier">
          <div className="tier-badge">Active Default</div>
          <h3>The Free Drone</h3>
          <div className="price-num">
            $0 <span className="price-period">/ forever</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            For sovereign operators who value privacy and local execution.
          </p>
          <ul className="tier-features">
            <li>Zero analytics collected</li>
            <li>Zero external scripts executed</li>
            <li>Infinite satire delivered</li>
            <li>Full browser independence</li>
          </ul>
          <button
            className="btn-tier"
            style={{ borderColor: 'var(--neon-green)', color: 'var(--neon-green)' }}
            onClick={() => onShowToast('You are already free. No subscription required.', '🛡️')}
          >
            Currently Sovereign
          </button>
        </div>

        {/* Tier 2 */}
        <div className="pricing-card">
          <h3>The Middle Manager</h3>
          <div className="price-num">
            $999 <span className="price-period">/ mo</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            For those who thrive on calendar invites and buzzword jargon.
          </p>
          <ul className="tier-features">
            <li>7 mandatory weekly syncs</li>
            <li>Passive-aggressive email templates</li>
            <li>Synergy alignment deliverables</li>
            <li>Unlimited virtual whiteboard post-its</li>
          </ul>
          <button
            className="btn-tier"
            onClick={() =>
              onShowToast('Decline successful: You just saved $999/mo and 40 hours of your life.', '📉')
            }
          >
            Decline Synergistically
          </button>
        </div>

        {/* Tier 3 */}
        <div className="pricing-card">
          <h3>The Oligarch</h3>
          <div className="price-num">
            $99,999 <span className="price-period">/ mo</span>
          </div>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            For venture titans who own private islands and despise personal accountability.
          </p>
          <ul className="tier-features">
            <li>Private jet emission obfuscation</li>
            <li>AI-driven golden parachute generator</li>
            <li>Personalized 24/7 reality distortion</li>
            <li>Immunity to public shame</li>
          </ul>
          <button
            className="btn-tier"
            onClick={() =>
              onShowToast('Invoice routed directly to the Cayman Islands. Transaction denied.', '🏝️')
            }
          >
            Bill Someone Else
          </button>
        </div>
      </div>
    </section>
  );
};
