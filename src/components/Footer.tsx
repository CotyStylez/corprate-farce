import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer>
      <div className="seal-badge">
        100% CLIENT-SIDE • ZERO TRACKERS • ZERO TELEMETRY • NO CLOUD BLOAT
      </div>
      <p className="footer-desc">
        © 2026 Sovereign Human. Licensed under &quot;Do The Right Thing&quot; Open Source.
        <br />
        No data centers were harmed or contacted in the making of this gag. Everything runs right here on your own device.
      </p>
    </footer>
  );
};
