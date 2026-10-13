import { useState, useEffect, type FC } from 'react';
import { startPanicSiren, stopPanicSiren } from '../utils/audioSynthesizer';

interface QuarterlyPanicProps {
  isActive: boolean;
  onClose: () => void;
  onShowToast: (message: string, icon?: string) => void;
  onTriggerConfetti: () => void;
}

export const QuarterlyPanicMode: FC<QuarterlyPanicProps> = ({
  isActive,
  onClose,
  onShowToast,
  onTriggerConfetti,
}) => {
  const [isSirenMuted, setIsSirenMuted] = useState<boolean>(false);
  const [stockPrice, setStockPrice] = useState<number>(0.0012);
  const [panicLevel, setPanicLevel] = useState<number>(99.8);
  const [crisisResolution, setCrisisResolution] = useState<string | null>(null);

  useEffect(() => {
    if (isActive && !isSirenMuted) {
      startPanicSiren();
    } else {
      stopPanicSiren();
    }

    return () => {
      stopPanicSiren();
    };
  }, [isActive, isSirenMuted]);

  // Live stock fluctuations
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setStockPrice((prev) => Math.max(0.0001, prev + (Math.random() - 0.55) * 0.0002));
      setPanicLevel((prev) => Math.min(100, Math.max(95, prev + (Math.random() - 0.48) * 0.5)));
    }, 1200);
    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  const toggleSirenMute = () => {
    setIsSirenMuted((prev) => !prev);
  };

  const handleBlameHeadwinds = () => {
    setStockPrice((prev) => prev + 0.0003);
    onShowToast('C-Suite blames "global macro climate". Stock temporarily stabilized by $0.0003.', '📉');
  };

  const handleRebrandLayoffs = () => {
    onShowToast('Layoffs successfully rebranded as "Alumni Graduation Accelerators". Stock up 0.01%.', '🎓');
  };

  const handlePizzaParty = () => {
    setCrisisResolution('🍕 Emergency Pizza Party Dispatched! The single-slice pepperoni miracle has pacified all 6,000 employees. Crisis averted!');
    stopPanicSiren();
    onTriggerConfetti();
    onShowToast('Crisis Solved: $12 Pizza Party restored shareholder confidence to 100%!', '🍕');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(10, 0, 0, 0.94)',
        zIndex: 9990,
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        overflowY: 'auto',
        animation: 'panicPulse 1s ease-in-out infinite alternate',
      }}
    >
      <style>{`
        @keyframes panicPulse {
          0% { box-shadow: inset 0 0 50px rgba(239, 68, 68, 0.4); }
          100% { box-shadow: inset 0 0 120px rgba(239, 68, 68, 0.85); }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* Top Banner Alert */}
      <div>
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.25)',
            border: '2px solid var(--red-alert)',
            borderRadius: '10px',
            padding: '1rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem', animation: 'pulse 0.5s infinite' }}>🚨</span>
            <div>
              <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                DEFCON 1: QUARTERLY PANIC ENGAGED
              </h2>
              <div style={{ color: '#fca5a5', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                WALL STREET HAS DETECTED EMPLOYEES TAKING FULL 30-MINUTE LUNCH BREAKS
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button
              type="button"
              className="cookie-btn cookie-btn-secondary"
              style={{ borderColor: 'var(--red-alert)', color: '#fca5a5' }}
              onClick={toggleSirenMute}
            >
              {isSirenMuted ? '🔊 Unmute Siren' : '🔇 Mute Siren'}
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-primary"
              style={{ background: 'var(--red-alert)', color: '#fff' }}
              onClick={() => {
                stopPanicSiren();
                onClose();
              }}
            >
              ✕ Exit Crisis Mode
            </button>
          </div>
        </div>

        {/* Breaking News Marquee */}
        <div
          style={{
            background: '#000',
            borderBottom: '1px solid var(--red-alert)',
            padding: '0.5rem 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            marginTop: '0.75rem',
            borderRadius: '6px',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              animation: 'marqueeScroll 25s linear infinite',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#f87171',
            }}
          >
            🔥 BREAKING: BOARD VOTES TO REPLACE RESTROOM DOORS WITH COLLABORATIVE WHITEBOARDS ··· FREE COFFEE REPLACED WITH SINGLE-USE WARM WATER PACKETS ··· CEO SELLS SECOND YACHT TO BUY SMALLER EMERGENCY BACKUP YACHT ··· ALL WORK DECLARED MISSION CRITICAL SIMULTANEOUSLY ··· WALL STREET COMMENDS BRAVERY OF 4,000 SUDDEN TERMINATIONS ···
          </div>
        </div>
      </div>

      {/* Main Crisis Body */}
      <div style={{ maxWidth: '900px', margin: '2rem auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Plummeting Ticker Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(20, 5, 5, 0.8)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'var(--font-mono)' }}>$SYNRG STOCK PRICE</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--red-alert)', fontFamily: 'var(--font-mono)' }}>
              ${stockPrice.toFixed(4)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#ef4444', fontFamily: 'var(--font-mono)' }}>▼ -99.94% (Today)</div>
          </div>

          <div style={{ background: 'rgba(20, 5, 5, 0.8)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'var(--font-mono)' }}>EXECUTIVE PANIC INDEX</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>
              {panicLevel.toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>▲ PEAK SWEAT DETECTED</div>
          </div>

          <div style={{ background: 'rgba(20, 5, 5, 0.8)', border: '1px solid rgba(239, 68, 68, 0.4)', padding: '1.25rem', borderRadius: '10px' }}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontFamily: 'var(--font-mono)' }}>MACRO HEADWINDS</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--red-alert)', fontFamily: 'var(--font-mono)' }}>
              +4,820%
            </div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'var(--font-mono)' }}>Conveniently responsible</div>
          </div>
        </div>

        {/* Resolution Banner if triggered */}
        {crisisResolution && (
          <div
            style={{
              background: 'rgba(0, 255, 102, 0.15)',
              border: '2px solid var(--neon-green)',
              borderRadius: '10px',
              padding: '1.5rem',
              textAlign: 'center',
              animation: 'toastIn 0.3s ease',
            }}
          >
            <h3 style={{ color: 'var(--neon-green)', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              MIRACLE IN THE BOARDROOM!
            </h3>
            <p style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.5 }}>
              {crisisResolution}
            </p>
          </div>
        )}

        {/* Emergency Corporate Actions */}
        <div style={{ background: 'rgba(25, 10, 10, 0.9)', border: '1px solid rgba(239, 68, 68, 0.5)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            🚨 Deploy Emergency Executive Mitigations:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ borderColor: 'var(--red-alert)', color: '#fca5a5', padding: '0.75rem' }}
              onClick={handleBlameHeadwinds}
            >
              🌪️ Blame Macro Headwinds
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ borderColor: 'var(--amber)', color: '#fef3c7', padding: '0.75rem' }}
              onClick={handleRebrandLayoffs}
            >
              🎓 Rebrand Layoffs as Graduation
            </button>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem', justifySelf: 'stretch' }}
              onClick={handlePizzaParty}
            >
              🍕 Order $14 Cold Pepperoni Pizza
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Action */}
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <button
          type="button"
          className="cookie-btn cookie-btn-secondary"
          style={{ borderColor: '#6b7280', color: '#9ca3af' }}
          onClick={() => {
            stopPanicSiren();
            onClose();
          }}
        >
          Close Emergency Room & Return to Unmonitored Dashboard
        </button>
      </div>
    </div>
  );
};
