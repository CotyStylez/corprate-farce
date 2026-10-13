import { useState, type FC } from 'react';

interface CookieBannerProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const CookieBanner: FC<CookieBannerProps> = ({ onShowToast }) => {
  const [closed, setClosed] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  if (closed) return null;

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleSurrender = () => {
    setIsShaking(false);
    // trigger reflow on next tick
    setTimeout(() => {
      setIsShaking(true);
      onShowToast('Nice try! Your device remains free, uncompromised, and unmonitored.', '🔒');
    }, 10);
  };

  const handleClose = () => {
    setClosed(true);
    onShowToast('Banner removed. Zero trackers harmed in the process.', '✨');
  };

  return (
    <aside
      className={`cookie-banner ${isShaking ? 'shake-anim' : ''}`}
      id="cookie-banner"
      onAnimationEnd={() => setIsShaking(false)}
    >
      {accepted ? (
        <>
          <div style={{ fontSize: '0.9rem', color: '#86efac', fontFamily: 'var(--font-mono)' }}>
            ✓ You clicked &apos;Agree to Everything&apos;, yet zero cookies were set and localStorage remains pristine. Sovereign victory.
          </div>
          <button
            className="cookie-btn cookie-btn-secondary"
            style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}
            onClick={handleClose}
          >
            Dismiss
          </button>
        </>
      ) : (
        <>
          <div className="cookie-text">
            <h4>🍪 Mandatory Legal Illusion</h4>
            <p>
              We do not store cookies or track you, but corporate legal precedent requires this visual interruption. What would you like to surrender?
            </p>
          </div>
          <div className="cookie-actions">
            <button className="cookie-btn cookie-btn-primary" onClick={handleAccept}>
              Agree to Everything
            </button>
            <button className="cookie-btn cookie-btn-secondary" onClick={handleSurrender}>
              Surrender My Device
            </button>
            <button className="cookie-btn cookie-btn-secondary" onClick={handleClose}>
              Close Silently
            </button>
          </div>
        </>
      )}
    </aside>
  );
};
