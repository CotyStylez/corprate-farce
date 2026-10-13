import type { FC } from 'react';

interface FeaturesSectionProps {
  onSimulateHarvest: () => void;
  onPredictThought: () => void;
  onMultiplyBureaucracy: () => void;
}

export const FeaturesSection: FC<FeaturesSectionProps> = ({
  onSimulateHarvest,
  onPredictThought,
  onMultiplyBureaucracy,
}) => {
  return (
    <section>
      <div className="section-head">
        <h2>Enterprise-Grade Inutility</h2>
        <p>Built strictly for comedy. Pure client-side logic. Nothing leaves your browser.</p>
      </div>

      <div className="feature-grid">
        {/* Card 1 */}
        <div className="feature-card">
          <div>
            <div className="feature-icon">🛰️</div>
            <h3 className="feature-title">Attention Harvester 3000</h3>
            <p className="feature-desc">
              Continuously monitors zero keystrokes and harvests negative telemetry while keeping your eyes glued to high-contrast emerald pixels.
            </p>
          </div>
          <button className="feature-interactive-btn" onClick={onSimulateHarvest}>
            Simulate Harvest
          </button>
        </div>

        {/* Card 2 */}
        <div className="feature-card">
          <div>
            <div className="feature-icon">🔮</div>
            <h3 className="feature-title">Thought Predictor AI</h3>
            <p className="feature-desc">
              99.9% empirical accuracy at predicting that you are currently an intelligent human staring at a glowing glass rectangle.
            </p>
          </div>
          <button className="feature-interactive-btn" onClick={onPredictThought}>
            Predict My Next Thought
          </button>
        </div>

        {/* Card 3 */}
        <div className="feature-card">
          <div>
            <div className="feature-icon">📈</div>
            <h3 className="feature-title">Bureaucracy Multiplier</h3>
            <p className="feature-desc">
              Transforms simple 3-second actionable realizations into fourteen 45-minute calendar syncs and a 40-slide PowerPoint deck.
            </p>
          </div>
          <button className="feature-interactive-btn" onClick={onMultiplyBureaucracy}>
            Generate 14 Meetings
          </button>
        </div>

        {/* Card 4 */}
        <div className="feature-card">
          <div>
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Retention Infinite Loop</h3>
            <p className="feature-desc">
              A bespoke, hardware-accelerated progress wheel designed to spin forever and accomplish absolutely nothing on your behalf.
            </p>
          </div>
          <div className="spinner-box">
            <div className="endless-spinner"></div>
            <span>Optimizing core alignment... (∞%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
