import { useState, type FC } from 'react';

interface DisclaimerBannerProps {
  onShowToast: (message: string, icon?: string) => void;
}

export const DisclaimerBanner: FC<DisclaimerBannerProps> = ({ onShowToast }) => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [hidden, setHidden] = useState<boolean>(false);

  if (hidden) return null;

  const getButtonText = () => {
    if (clickCount === 1) return 'You cannot dismiss the truth';
    if (clickCount === 2) return 'Resistance is futile';
    return 'Dismiss Disclaimer';
  };

  const handleDismiss = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount === 1) {
      onShowToast('Nice attempt, but the truth remains sticky.', '🔒');
    } else if (nextCount === 2) {
      // Resistance is futile
    } else {
      setHidden(true);
      onShowToast('Disclaimer hidden! Local privacy intact regardless.', '🛡️');
    }
  };

  return (
    <aside className="disclaimer-banner" id="disclaimer-bar">
      <div className="banner-text-group">
        <div className="banner-badge">
          <span>⚠️</span>
          <span>ACCIDENTAL PRIVACY NOTICE:</span>
        </div>
        <div className="banner-sub">
          This web app runs 100% locally in your browser. Zero cookies detected. Zero trackers spawned. Corporate overlords are deeply disappointed.
        </div>
      </div>
      <button className="btn-dismiss" id="btn-dismiss" onClick={handleDismiss}>
        {getButtonText()}
      </button>
    </aside>
  );
};
