import { useState, type FC } from 'react';

interface ParodySuiteProps {
  onShowToast: (message: string, icon?: string) => void;
}

type TabType = 'matrix' | 'review' | 'translator' | 'excuses';

interface DecisionPivot {
  directive: string;
  rationale: string;
  impactScore: string;
}

const EXECUTIVE_DECISIONS: DecisionPivot[] = [
  {
    directive: 'Pivot company roadmap to AI-powered ergonomic paperclips.',
    rationale: 'Our competitors mentioned neural nets 41 times in their Q2 transcript.',
    impactScore: '+340% Projected Buzzword Density',
  },
  {
    directive: 'Mandate 6 days in-office; rebrand Sunday as "Synergy Sabbath".',
    rationale: 'Physical proximity in open-plan desks statistically increases overheard sighing by 800%.',
    impactScore: '-42% Retention / +100% Executive Comfort',
  },
  {
    directive: 'Replace Q4 financial bonuses with commemorative NFT commemorative badges.',
    rationale: 'Financial capital is fleeting; immutable blockchain pride is eternal.',
    impactScore: '0.00 USD Financial Outlay',
  },
  {
    directive: 'Reorganize all squads into cross-functional pods of exactly 0.5 engineers.',
    rationale: 'Fractional resource utilization fosters agile emotional resilience.',
    impactScore: '14 Additional Standups Scheduled Daily',
  },
  {
    directive: 'Acquire bankrupt dog-walking startup solely to obtain their Slack emoji pack.',
    rationale: 'Our custom reaction culture requires urgent tactical expansion.',
    impactScore: '4.8M Goodwill Write-Off',
  },
  {
    directive: 'Ban all written emails; mandate 15-second TikTok video updates to leadership.',
    rationale: 'Aligning communication protocols with modern short-form cognitive bandwidth.',
    impactScore: 'Zero Meaningful Deliverables Recorded',
  },
  {
    directive: 'Replace human QA department with automated LinkedIn inspirational quotes generator.',
    rationale: 'Bugs are simply unexpected learning opportunities for our enterprise consumers.',
    impactScore: '100% Philosophical Alignment',
  },
];

interface ReviewArchetype {
  title: string;
  rating: string;
  strengths: string;
  developmentArea: string;
  growthGoal: string;
}

const REVIEW_DATA: Record<string, ReviewArchetype[]> = {
  engineer: [
    {
      title: 'Senior 10x Staff Architect',
      rating: '2.9 / 5.0 (Meets Expectations But Lacks Radical Urgency)',
      strengths: 'Consistently fixes critical production outages in under 3 minutes; built entire backend from scratch single-handedly.',
      developmentArea: 'Failed to react with celebratory fire emojis during Friday evening executive announcement thread.',
      growthGoal: 'Attend 12 mandatory seminars on "Authentic Asynchronous Synergy" during personal weekend hours.',
    },
    {
      title: 'Full-Stack Developer',
      rating: '3.1 / 5.0 (Adequate Optics)',
      strengths: 'Writes clean, tested, documented code that never breaks.',
      developmentArea: 'Leaves desk at 5:01 PM; demonstrates concerning lack of emotional dedication to shareholder sentiment.',
      growthGoal: 'Practice lingering in the kitchen until 7:30 PM discussing roadmap paradigm shifts.',
    },
  ],
  manager: [
    {
      title: 'Director of Agile Velocity',
      rating: '4.95 / 5.0 (Exceeds Executive Synergy)',
      strengths: 'Successfully scheduled 38 hours of syncs into a 40-hour work week without producing any tangible output.',
      developmentArea: 'One 15-minute slot remained open on a Tuesday afternoon.',
      growthGoal: 'Introduce "Pre-Standup Alignment Huddle" to eliminate all remaining unbroken focus time.',
    },
    {
      title: 'VP of Holistic Alignment',
      rating: '4.8 / 5.0 (Venture Legend)',
      strengths: 'Introduced 6 new project management tools that do not speak to one another; generated 200 Jira boards.',
      developmentArea: 'Occasionally answered a direct question with a yes or no instead of a multi-part metaphor.',
      growthGoal: 'Learn 14 new botanical metaphors for organizational restructure.',
    },
  ],
  remote: [
    {
      title: 'Remote Senior Specialist',
      rating: '2.4 / 5.0 (Insubordinate Sovereignty)',
      strengths: 'Completes 100% of quarterly deliverables while living 2,000 miles from the nearest whiteboard.',
      developmentArea: 'Refuses to commute 2.5 hours each way to sit alone on a Zoom call in an open-concept office.',
      growthGoal: 'Pledge allegiance to corporate cubicle culture; attend mandatory pizza lunch via hologram.',
    },
  ],
};

const TRANSLATOR_PRESETS: { raw: string; corporate: string }[] = [
  {
    raw: "I don't know what you're talking about.",
    corporate: "Let's ensure we are collectively aligned on the underlying taxonomy before double-clicking.",
  },
  {
    raw: 'This is a terrible idea and will fail.',
    corporate: 'I want to be mindful of potential headwinds and stress-test these baseline hypotheses.',
  },
  {
    raw: 'Stop messaging me after 6:00 PM.',
    corporate: 'I am proactively recalibrating my cognitive bandwidth to maximize high-leverage morning ROI.',
  },
  {
    raw: 'We ran out of money.',
    corporate: 'We are strategically optimizing capital expenditure to preserve a sustainable operational runway.',
  },
  {
    raw: 'Everyone is quitting.',
    corporate: 'We are experiencing healthy, voluntary organizational rightsizing and talent cross-pollination.',
  },
  {
    raw: 'I have no idea who is responsible for this.',
    corporate: 'Ownership on this deliverable remains beautifully matrixed across our collaborative ecosystem.',
  },
  {
    raw: 'Just do your job.',
    corporate: 'I encourage you to lean into personal accountability across your tactical swimlane.',
  },
];

const EXCUSES: { category: string; excuse: string; effect: string }[] = [
  {
    category: 'Missed Deadline',
    excuse: 'Our timeline encountered unanticipated systemic friction during cross-functional discovery loops.',
    effect: '+3 Weeks Added to Delivery Schedule',
  },
  {
    category: 'Crashed Production',
    excuse: 'The cluster gracefully conducted an unprompted resilience drill in strict adherence to chaos philosophy.',
    effect: 'Outage Rebranded as "Proactive Stress Test"',
  },
  {
    category: 'Zero Revenue',
    excuse: 'We deliberately prioritized ecosystem mindshare over premature monetary extraction.',
    effect: 'Losses Recategorized as "Mindshare Investment"',
  },
  {
    category: 'RTO Policy Backlash',
    excuse: 'The mandate was designed to honor spontaneous organic hall encounters and serendipitous ideation.',
    effect: 'Employees Reminded that Free Apples are Provided on Tuesdays',
  },
  {
    category: 'Product Has No Features',
    excuse: 'Our philosophy is radical minimalism: allowing our enterprise partners to project their own desires onto the whitespace.',
    effect: 'Sold at Enterprise Tier for $140,000/seat',
  },
];

export const ParodySuite: FC<ParodySuiteProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<TabType>('matrix');

  // Decision Matrix State
  const [selectedDecision, setSelectedDecision] = useState<DecisionPivot>(EXECUTIVE_DECISIONS[0]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Review Generator State
  const [roleCategory, setRoleCategory] = useState<'engineer' | 'manager' | 'remote'>('engineer');
  const [reviewIndex, setReviewIndex] = useState<number>(0);

  // Translator State
  const [customInput, setCustomInput] = useState<string>('');
  const [translatedOutput, setTranslatedOutput] = useState<string>(TRANSLATOR_PRESETS[0].corporate);

  // Excuse State
  const [excuseFilter, setExcuseFilter] = useState<string>('All');

  const spinDecision = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const rand = Math.floor(Math.random() * EXECUTIVE_DECISIONS.length);
      setSelectedDecision(EXECUTIVE_DECISIONS[rand]);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        setIsSpinning(false);
        onShowToast('New Strategic Mandate Dispatched to 14,000 Employees!', '👔');
      }
    }, 90);
  };

  const handleTranslateCustom = (text: string) => {
    setCustomInput(text);
    if (!text.trim()) {
      setTranslatedOutput('Awaiting unvarnished human truth...');
      return;
    }
    // Corporate buzzword filter generator
    const buzzwords = [
      'holistic value-stream alignment',
      'actionable deliverables',
      'mission-critical cadence',
      'proactive paradigm synergy',
      'cross-functional optics',
      'bandwidth optimization',
    ];
    const picked = buzzwords[Math.floor(Math.random() * buzzwords.length)];
    setTranslatedOutput(
      `In regards to "${text.trim()}": We must double-click on ${picked} to seamlessly de-risk our forward-facing vector.`
    );
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    onShowToast(`${label} copied to clipboard! Ready to paste into Slack.`, '📋');
  };

  const currentReview = REVIEW_DATA[roleCategory][reviewIndex % REVIEW_DATA[roleCategory].length];

  const filteredExcuses = excuseFilter === 'All'
    ? EXCUSES
    : EXCUSES.filter((e) => e.category === excuseFilter);

  return (
    <section className="dashboard-panel" style={{ marginTop: '3rem' }}>
      <div className="dash-header">
        <div>
          <div className="dash-title">
            <span className="live-dot"></span>
            C-Suite Parody Workbench // Farce 2.0
          </div>
          <div style={{ color: '#9ca3af', fontSize: '0.82rem', marginTop: '0.2rem' }}>
            Interactive absurdity suite designed to expose middle-management theater.
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="feature-interactive-btn"
            style={{
              width: 'auto',
              padding: '0.4rem 0.8rem',
              background: activeTab === 'matrix' ? 'var(--neon-green)' : 'rgba(0, 255, 102, 0.08)',
              color: activeTab === 'matrix' ? '#000' : 'var(--neon-green)',
            }}
            onClick={() => setActiveTab('matrix')}
          >
            🎯 Decision Matrix
          </button>
          <button
            type="button"
            className="feature-interactive-btn"
            style={{
              width: 'auto',
              padding: '0.4rem 0.8rem',
              background: activeTab === 'review' ? 'var(--neon-green)' : 'rgba(0, 255, 102, 0.08)',
              color: activeTab === 'review' ? '#000' : 'var(--neon-green)',
            }}
            onClick={() => setActiveTab('review')}
          >
            ⭐ Review Generator
          </button>
          <button
            type="button"
            className="feature-interactive-btn"
            style={{
              width: 'auto',
              padding: '0.4rem 0.8rem',
              background: activeTab === 'translator' ? 'var(--neon-green)' : 'rgba(0, 255, 102, 0.08)',
              color: activeTab === 'translator' ? '#000' : 'var(--neon-green)',
            }}
            onClick={() => setActiveTab('translator')}
          >
            🔄 Jargon Translator
          </button>
          <button
            type="button"
            className="feature-interactive-btn"
            style={{
              width: 'auto',
              padding: '0.4rem 0.8rem',
              background: activeTab === 'excuses' ? 'var(--neon-green)' : 'rgba(0, 255, 102, 0.08)',
              color: activeTab === 'excuses' ? '#000' : 'var(--neon-green)',
            }}
            onClick={() => setActiveTab('excuses')}
          >
            🛡️ Ironclad Excuses
          </button>
        </div>
      </div>

      {/* TAB 1: EXECUTIVE DECISION MATRIX */}
      {activeTab === 'matrix' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(0, 255, 102, 0.25)',
              borderRadius: '10px',
              padding: '1.5rem',
              boxShadow: isSpinning ? '0 0 25px rgba(0, 255, 102, 0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#86efac', textTransform: 'uppercase' }}>
                DIRECTIVE STATUS: {isSpinning ? 'CALCULATING EXECUTIVE WHIM...' : 'ACTIVE PIVOT'}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {selectedDecision.impactScore}
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 800, marginBottom: '0.6rem' }}>
              &quot;{selectedDecision.directive}&quot;
            </h3>

            <p style={{ color: '#9ca3af', fontSize: '0.88rem', fontStyle: 'italic', marginBottom: '1.2rem' }}>
              Executive Justification: &quot;{selectedDecision.rationale}&quot;
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}
                onClick={spinDecision}
                disabled={isSpinning}
              >
                <span>🎲</span>
                <span>{isSpinning ? 'Spinning Executive Wheel...' : 'Spin Executive Decision Wheel'}</span>
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '0.65rem 1.25rem' }}
                onClick={() => copyToClipboard(selectedDecision.directive, 'Executive Directive')}
              >
                <span>📋</span>
                <span>Copy Directive for Town Hall</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERFORMANCE REVIEW GENERATOR */}
      {activeTab === 'review' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: '#9ca3af', fontFamily: 'var(--font-mono)' }}>ROLE ARCHETYPE:</span>
            <button
              type="button"
              className="cookie-btn cookie-btn-secondary"
              style={{
                borderColor: roleCategory === 'engineer' ? 'var(--neon-green)' : undefined,
                color: roleCategory === 'engineer' ? 'var(--neon-green)' : undefined,
              }}
              onClick={() => { setRoleCategory('engineer'); setReviewIndex(0); }}
            >
              Staff Engineer
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-secondary"
              style={{
                borderColor: roleCategory === 'manager' ? 'var(--neon-green)' : undefined,
                color: roleCategory === 'manager' ? 'var(--neon-green)' : undefined,
              }}
              onClick={() => { setRoleCategory('manager'); setReviewIndex(0); }}
            >
              Middle Manager
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-secondary"
              style={{
                borderColor: roleCategory === 'remote' ? 'var(--neon-green)' : undefined,
                color: roleCategory === 'remote' ? 'var(--neon-green)' : undefined,
              }}
              onClick={() => { setRoleCategory('remote'); setReviewIndex(0); }}
            >
              Remote Worker
            </button>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 700 }}>
                {currentReview.title}
              </h4>
              <span style={{ color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700 }}>
                {currentReview.rating}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem' }}>
              <div>
                <strong style={{ color: '#86efac' }}>Demonstrated Accomplishment: </strong>
                <span style={{ color: '#d1d5db' }}>{currentReview.strengths}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--red-alert)' }}>Arbitrary Criticism: </strong>
                <span style={{ color: '#d1d5db' }}>{currentReview.developmentArea}</span>
              </div>
              <div>
                <strong style={{ color: '#38bdf8' }}>Prescribed Growth Homework: </strong>
                <span style={{ color: '#d1d5db' }}>{currentReview.growthGoal}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.65rem' }}>
              <button
                type="button"
                className="feature-interactive-btn"
                style={{ width: 'auto' }}
                onClick={() => setReviewIndex((prev) => prev + 1)}
              >
                🔄 Cycle Alternate Review
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-secondary"
                onClick={() => copyToClipboard(`Title: ${currentReview.title}\nRating: ${currentReview.rating}\nStrengths: ${currentReview.strengths}\nGrowth Area: ${currentReview.developmentArea}`, 'Performance Review')}
              >
                📋 Copy 360 Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: JARGON TRANSLATOR */}
      {activeTab === 'translator' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
              QUICK TRUTH PRESETS:
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {TRANSLATOR_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="cookie-btn cookie-btn-secondary"
                  style={{ fontSize: '0.75rem' }}
                  onClick={() => {
                    setCustomInput(p.raw);
                    setTranslatedOutput(p.corporate);
                  }}
                >
                  &quot;{p.raw}&quot;
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#9ca3af', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>
                RAW HUMAN EMOTION / HONESTY:
              </label>
              <textarea
                value={customInput}
                onChange={(e) => handleTranslateCustom(e.target.value)}
                placeholder="Type honest frustration (e.g., 'This meeting is pointless', 'Nobody tested this')..."
                rows={4}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '0.75rem',
                  fontSize: '0.88rem',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                }}
              />
            </div>

            <div style={{ background: 'rgba(0, 255, 102, 0.04)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0, 255, 102, 0.25)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--neon-green)', fontFamily: 'var(--font-mono)' }}>
                    C-SUITE DOUBLESPEAK OUTPUT:
                  </span>
                  <span style={{ fontSize: '0.68rem', background: 'rgba(0, 255, 102, 0.1)', color: 'var(--neon-green)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                    100% HR-Compliant
                  </span>
                </div>
                <p style={{ color: '#f0fdf4', fontSize: '0.92rem', lineHeight: 1.5, fontFamily: 'var(--font-mono)' }}>
                  &quot;{translatedOutput}&quot;
                </p>
              </div>

              <button
                type="button"
                className="feature-interactive-btn"
                style={{ marginTop: '0.8rem' }}
                onClick={() => copyToClipboard(translatedOutput, 'Polished Jargon')}
              >
                📋 Copy for Slack / Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: IRONCLAD EXCUSES */}
      {activeTab === 'excuses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontFamily: 'var(--font-mono)' }}>CRISIS TOPIC:</span>
            {['All', 'Missed Deadline', 'Crashed Production', 'Zero Revenue', 'RTO Policy Backlash', 'Product Has No Features'].map((cat) => (
              <button
                key={cat}
                type="button"
                className="cookie-btn cookie-btn-secondary"
                style={{
                  fontSize: '0.75rem',
                  borderColor: excuseFilter === cat ? 'var(--neon-green)' : undefined,
                  color: excuseFilter === cat ? 'var(--neon-green)' : undefined,
                }}
                onClick={() => setExcuseFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {filteredExcuses.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--amber)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {item.category.toUpperCase()}
                  </span>
                  <p style={{ color: '#fff', fontSize: '0.9rem', margin: '0.5rem 0 0.75rem', lineHeight: 1.45 }}>
                    &quot;{item.excuse}&quot;
                  </p>
                  <div style={{ fontSize: '0.76rem', color: '#86efac', fontFamily: 'var(--font-mono)' }}>
                    Outcome: {item.effect}
                  </div>
                </div>

                <button
                  type="button"
                  className="cookie-btn cookie-btn-secondary"
                  style={{ marginTop: '0.9rem', width: '100%' }}
                  onClick={() => copyToClipboard(item.excuse, 'Executive Excuse')}
                >
                  📋 Deploy This Excuse
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
