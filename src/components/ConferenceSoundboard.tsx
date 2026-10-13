import { useState, type FC } from 'react';
import {
  playSlackPing,
  playMuteBuzz,
  playKeyboardClack,
  playMicFeedback,
  playPacketLoss,
  playPoliteApplause,
  playHeavySigh,
  playTardyJoinChime,
  setMasterVolume,
} from '../utils/audioSynthesizer';

interface SoundboardProps {
  onShowToast: (message: string, icon?: string) => void;
}

interface SoundCard {
  id: string;
  name: string;
  triggerSound: () => void;
  emoji: string;
  badge: string;
  description: string;
  toastMsg: string;
}

export const ConferenceSoundboard: FC<SoundboardProps> = ({ onShowToast }) => {
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(0.75);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setMasterVolume(val);
  };

  const handlePlay = (card: SoundCard) => {
    setActiveSoundId(card.id);
    card.triggerSound();
    onShowToast(card.toastMsg, card.emoji);

    setTimeout(() => {
      setActiveSoundId(null);
    }, 600);
  };

  const soundList: SoundCard[] = [
    {
      id: 'ping',
      name: 'Ping of Dread',
      triggerSound: playSlackPing,
      emoji: '🔔',
      badge: 'High Cortisol',
      description: 'The inescapable chime that ruins Friday evenings and breaks focused thoughts.',
      toastMsg: 'Slack Notification simulated: "Hey, got a quick 5 seconds?"',
    },
    {
      id: 'mute',
      name: "You're On Mute",
      triggerSound: playMuteBuzz,
      emoji: '🔇',
      badge: 'Classic 2020s',
      description: 'Delivered after 4 solid minutes of impassioned strategic monologue.',
      toastMsg: 'Audio anomaly: You presented 18 slides on total mute.',
    },
    {
      id: 'clack',
      name: 'Unmuted Mechanical Keyboard',
      triggerSound: playKeyboardClack,
      emoji: '⌨️',
      badge: 'Blue Switches',
      description: 'A deafening barrage of furious typing right next to an unmuted Blue Yeti microphone.',
      toastMsg: 'Tactile clatter dispatched: Someone is clearly drafting an email right now.',
    },
    {
      id: 'feedback',
      name: 'Microphone Feedback Squeal',
      triggerSound: playMicFeedback,
      emoji: '📢',
      badge: 'Acoustic Chaos',
      description: 'Occurs when two people join the hybrid meeting from the same glass phone booth.',
      toastMsg: 'Acoustic loop activated: Both laptop mics feeding into each other.',
    },
    {
      id: 'packet',
      name: 'Robotic Packet Loss Stutter',
      triggerSound: playPacketLoss,
      emoji: '📶',
      badge: 'Wi-Fi Struggle',
      description: 'Transforms clear English into an extraterrestrial vocoder transmission.',
      toastMsg: 'Stutter detected: "Yo-- br--king --p, can y-u r-peat th-t?"',
    },
    {
      id: 'applause',
      name: 'Unenthusiastic Polite Clapping',
      triggerSound: playPoliteApplause,
      emoji: '👏',
      badge: 'Hollow Praise',
      description: 'Sparse golf applause following a 60-page slide deck with zero action items.',
      toastMsg: 'Polite applause generated: 3 cameras turned on solely to clap awkwardly.',
    },
    {
      id: 'sigh',
      name: 'The Exhausted Slurp & Sigh',
      triggerSound: playHeavySigh,
      emoji: '☕',
      badge: 'Peak Burnout',
      description: 'Heavy exhalation directly into the headset followed by lukewarm coffee ingestion.',
      toastMsg: 'Collective exhaustion registered across 4 time zones.',
    },
    {
      id: 'join',
      name: 'Tardy Join at 12:47 PM',
      triggerSound: playTardyJoinChime,
      emoji: '🚪',
      badge: 'Double Booked',
      description: 'The jovial doorbell chime of someone joining with 3 minutes left to ask for a recap.',
      toastMsg: '"Sorry guys, having audio issues! Can someone recap the first 45 mins?"',
    },
  ];

  return (
    <section className="dashboard-panel" style={{ marginTop: '2.5rem' }}>
      <div className="dash-header">
        <div>
          <div className="dash-title">
            <span className="live-dot"></span>
            Remote Sync Tactical Soundboard
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '0.2rem' }}>
            Built with Web Audio API. 100% synthesized in-browser. Zero audio files downloaded.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#86efac', fontFamily: 'var(--font-mono)' }}>
            VOLUME: {Math.round(volume * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Master volume control"
            style={{
              accentColor: 'var(--neon-green)',
              cursor: 'pointer',
              width: '110px',
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
        }}
      >
        {soundList.map((card) => {
          const isPlaying = activeSoundId === card.id;
          return (
            <div
              key={card.id}
              onClick={() => handlePlay(card)}
              style={{
                background: isPlaying ? 'rgba(0, 255, 102, 0.12)' : 'var(--bg-card)',
                border: isPlaying ? '1px solid var(--neon-green)' : '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '10px',
                padding: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isPlaying ? '0 0 15px rgba(0, 255, 102, 0.25)' : 'none',
                transform: isPlaying ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.6rem',
                  }}
                >
                  <span style={{ fontSize: '1.6rem' }}>{card.emoji}</span>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      color: isPlaying ? '#000' : 'var(--neon-green)',
                      background: isPlaying ? 'var(--neon-green)' : 'rgba(0, 255, 102, 0.1)',
                      border: '1px solid rgba(0, 255, 102, 0.3)',
                      padding: '0.15rem 0.55rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                    }}
                  >
                    {card.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff', marginBottom: '0.35rem' }}>
                  {card.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', lineHeight: 1.45 }}>
                  {card.description}
                </p>
              </div>

              <button
                type="button"
                className="feature-interactive-btn"
                style={{
                  marginTop: '1rem',
                  background: isPlaying ? 'var(--neon-green)' : undefined,
                  color: isPlaying ? '#000' : undefined,
                }}
              >
                {isPlaying ? '⚡ Broadcasting Audio...' : '▶ Play Effect'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
