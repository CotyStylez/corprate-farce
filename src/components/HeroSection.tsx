import type { FC, MouseEvent } from 'react';

interface HeroSectionProps {
  onMonetizeSoul: (e: MouseEvent<HTMLButtonElement>) => void;
  onScheduleMeeting: () => void;
}

export const HeroSection: FC<HeroSectionProps> = ({
  onMonetizeSoul,
  onScheduleMeeting,
}) => {
  return (
    <section className="hero-section">
      <div className="pill-badge">
        <span className="live-dot"></span>
        Enterprise Synergy v4.04 // Cloud-Free Edition
      </div>
      <h1 className="hero-title">Synergize Your Compliance.</h1>
      <p className="hero-sub">
        The industry's first zero-telemetry, edge-native farce engine engineered to convert raw human attention directly into meaningless corporate buzzwords without calling home.
      </p>
      <div className="hero-actions">
        <button className="btn-primary" onClick={onMonetizeSoul}>
          <span>⚡</span>
          <span>Monetize My Soul</span>
        </button>
        <button className="btn-secondary" onClick={onScheduleMeeting}>
          <span>📅</span>
          <span>Schedule Unnecessary Meeting</span>
        </button>
      </div>
    </section>
  );
};
