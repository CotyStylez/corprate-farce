import { useState, useRef, useCallback, type FC, type MouseEvent } from 'react';
import { ToastItem } from './types';
import { ParticleCanvas, ParticleCanvasHandle } from './components/ParticleCanvas';
import { ToastContainer } from './components/ToastContainer';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HeroSection } from './components/HeroSection';
import { DashboardPanel } from './components/DashboardPanel';
import { ParodySuite } from './components/ParodySuite';
import { ConferenceSoundboard } from './components/ConferenceSoundboard';
import { QuarterlyPanicMode } from './components/QuarterlyPanicMode';
import { FeaturesSection } from './components/FeaturesSection';
import { PricingSection } from './components/PricingSection';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

const JARGON_OPENERS = [
  "Let's circle back",
  "We need to double-click",
  "Can we socialize this",
  "Let's pivot our bandwidth",
  "Touching base offline",
  "We should synergize",
];
const JARGON_MIDDLES = [
  "to proactively evangelize",
  "to operationalize",
  "to re-architect",
  "to unpack actionable deliverables for",
  "to streamline holistic optics on",
];
const JARGON_ENDS = [
  "the paradigm shift.",
  "the low-hanging fruit.",
  "moving the needle.",
  "the mission-critical roadmap.",
  "value-add touchpoints.",
];

const PREDICTIONS = [
  "You are thinking: 'Why is modern enterprise software so full of hot air?'",
  "You are thinking about closing tabs you have had open for 3 weeks.",
  "You predict that an ad-supported version would have crashed your phone by now.",
  "You are thinking: 'I am so glad this tool is running 100% locally.'",
];

export const App: FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const particleCanvasRef = useRef<ParticleCanvasHandle | null>(null);

  const [harvestState, setHarvestState] = useState<{
    isHarvesting: boolean;
    extracted: boolean;
  }>({
    isHarvesting: false,
    extracted: false,
  });

  const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);
  const [isQuarterlyPanic, setIsQuarterlyPanic] = useState<boolean>(false);

  const handleTriggerConfetti = useCallback(() => {
    if (particleCanvasRef.current) {
      particleCanvasRef.current.spawnParticles(window.innerWidth / 2, window.innerHeight / 2);
    }
  }, []);

  const showToast = useCallback((message: string, icon: string = '⚡') => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: ToastItem = { id, message, icon };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isLeaving: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 4200);
  }, []);

  const handleRemoveToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleMonetizeSoul = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    if (particleCanvasRef.current) {
      particleCanvasRef.current.spawnParticles(originX, originY);
    }
    showToast(
      'Error 418: Your soul is sovereign, non-fungible, and stored strictly on-device. Extraction failed.',
      '🛑'
    );
  };

  const handleScheduleMeeting = () => {
    const opener = JARGON_OPENERS[Math.floor(Math.random() * JARGON_OPENERS.length)];
    const middle = JARGON_MIDDLES[Math.floor(Math.random() * JARGON_MIDDLES.length)];
    const end = JARGON_ENDS[Math.floor(Math.random() * JARGON_ENDS.length)];
    const fullJargon = `"${opener} ${middle} ${end}"`;
    showToast(`Calendar Invite Sent: ${fullJargon}`, '👔');
  };

  const handleSimulateHarvest = () => {
    setHarvestState({ isHarvesting: true, extracted: false });

    setTimeout(() => {
      setHarvestState({ isHarvesting: false, extracted: true });
      showToast('Telemetry probe neutralized. Local-first firewall held strong.', '🛡️');
    }, 500);
  };

  const handleTriggerToggle = () => {
    if (isSwitchActive) return;
    setIsSwitchActive(true);
    setTimeout(() => {
      setIsSwitchActive(false);
      showToast(
        'Permission Denied: Local-first architecture cannot be compromised by middle-management toggles.',
        '🚫'
      );
    }, 350);
  };

  const handlePredictThought = () => {
    const pick = PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)];
    showToast(pick, '🔮');
  };

  const handleMultiplyBureaucracy = () => {
    showToast(
      "14 Calendar Invites dispatched: 'Quick Sync #1' through 'Debrief to Prep for the Sync #14'.",
      '📅'
    );
  };

  return (
    <>
      {/* Particle Canvas */}
      <ParticleCanvas ref={particleCanvasRef} />

      {/* Interactive Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={handleRemoveToast} />

      {/* Top Disclaimer Banner */}
      <DisclaimerBanner onShowToast={showToast} />

      {/* Main Content */}
      <main className="container">
        <HeroSection
          onMonetizeSoul={handleMonetizeSoul}
          onScheduleMeeting={handleScheduleMeeting}
        />

        <DashboardPanel
          harvestState={harvestState}
          onTriggerToggle={handleTriggerToggle}
          isSwitchActive={isSwitchActive}
          onShowToast={showToast}
          onEngagePanic={() => setIsQuarterlyPanic(true)}
        />

        {/* Farce 2.0: C-Suite Parody Workbench */}
        <ParodySuite onShowToast={showToast} />

        {/* Farce 2.0: Tactical Conference Call Soundboard */}
        <ConferenceSoundboard onShowToast={showToast} />

        <FeaturesSection
          onSimulateHarvest={handleSimulateHarvest}
          onPredictThought={handlePredictThought}
          onMultiplyBureaucracy={handleMultiplyBureaucracy}
        />

        <PricingSection onShowToast={showToast} />
      </main>

      {/* Emergency Quarterly Panic Overlay */}
      <QuarterlyPanicMode
        isActive={isQuarterlyPanic}
        onClose={() => setIsQuarterlyPanic(false)}
        onShowToast={showToast}
        onTriggerConfetti={handleTriggerConfetti}
      />

      {/* Cookie Banner */}
      <CookieBanner onShowToast={showToast} />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
