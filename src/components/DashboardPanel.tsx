import { useState, useEffect, type FC } from 'react';

interface DashboardPanelProps {
  onShowToast: (message: string, icon?: string) => void;
  harvestState: {
    isHarvesting: boolean;
    extracted: boolean;
  };
  onTriggerToggle: () => void;
  isSwitchActive: boolean;
  onEngagePanic: () => void;
}

export const DashboardPanel: FC<DashboardPanelProps> = ({
  harvestState,
  onTriggerToggle,
  isSwitchActive,
  onEngagePanic,
}) => {
  const [buzzwordsCount, setBuzzwordsCount] = useState<number>(1402);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuzzwordsCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="dashboard-panel">
      <div className="dash-header">
        <div className="dash-title">
          <span className="live-dot"></span>
          Live Parody Telemetry Stream
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#86efac' }}>
            STATUS: SOVEREIGN & UNMONITORED
          </div>
          <button
            type="button"
            onClick={onEngagePanic}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid var(--red-alert)',
              color: '#fca5a5',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--red-alert)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
              e.currentTarget.style.color = '#fca5a5';
            }}
          >
            <span>🚨</span>
            <span>QUARTERLY PANIC BUTTON</span>
          </button>
        </div>
      </div>

      <div className="telemetry-grid">
        {/* Metric 1 */}
        <div className="metric-card">
          <div className="metric-label">Data Harvested From You</div>
          <div className="metric-val" id="metric-harvest">
            {harvestState.isHarvesting ? (
              <>
                4.2 <span style={{ fontSize: '1rem', color: '#ef4444' }}>KB</span>
              </>
            ) : (
              <>
                0 <span style={{ fontSize: '1rem', color: '#6ee7b7' }}>Bytes</span>
              </>
            )}
          </div>
          <div
            className="metric-sub"
            id="metric-harvest-sub"
            style={{
              color: harvestState.isHarvesting
                ? '#ef4444'
                : harvestState.extracted
                ? '#86efac'
                : '#6b7280',
            }}
          >
            {harvestState.isHarvesting
              ? 'Attempting extraction...'
              : harvestState.extracted
              ? '✓ Snuffed out! Zero bytes allowed off-device.'
              : '✓ 0 packets transmitted off-device'}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="metric-card">
          <div className="metric-label">Corporate Disappointment</div>
          <div className="metric-val" style={{ color: 'var(--red-alert)' }}>
            100%
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill"></div>
          </div>
          <div className="metric-sub">Shareholders baffled by local execution</div>
        </div>

        {/* Metric 3 */}
        <div className="metric-card">
          <div className="metric-label">Buzzwords Synthesized</div>
          <div className="metric-val" id="buzz-counter">
            {buzzwordsCount.toLocaleString()}
          </div>
          <div className="metric-sub">Paradigms shifted per second</div>
        </div>

        {/* Metric 4: Surveillance toggle joke */}
        <div className="surveillance-toggle-card">
          <div className="toggle-info">
            <h4>Mandatory Corporate Telemetry</h4>
            <p>Opt in to beam unencrypted biometrics & keyboard cadence to a faraway data center for &quot;optimization&quot;.</p>
          </div>
          <div
            className={`switch-ui ${isSwitchActive ? 'active' : ''}`}
            id="surveillance-switch"
            onClick={onTriggerToggle}
            role="switch"
            aria-checked={isSwitchActive}
          >
            <div className="switch-thumb"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
