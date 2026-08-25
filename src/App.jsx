import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import StaticNetwork from './components/StaticNetwork.jsx'
import { ecosystemLanes, worldLanes } from './data/lanes.js'
import { useAdaptiveProfile } from './lib/adaptive.js'
import { useWorldNavigation } from './lib/useWorldNavigation.js'

const AdaptiveWorld = lazy(() => import('./components/AdaptiveWorld.jsx'))

function WorldSurface({ activeLane, profile }) {
  return (
    <Suspense fallback={<StaticNetwork activeLane={activeLane} fallbackReason="adaptive-module-loading" />}>
      <AdaptiveWorld activeLane={activeLane} profile={profile} />
    </Suspense>
  )
}

function useInstallPrompt() {
  const [prompt, setPrompt] = useState(null)

  useEffect(() => {
    const capture = (event) => {
      event.preventDefault()
      setPrompt(event)
    }

    window.addEventListener('beforeinstallprompt', capture)
    return () => window.removeEventListener('beforeinstallprompt', capture)
  }, [])

  const install = async () => {
    if (!prompt) return
    await prompt.prompt()
    setPrompt(null)
  }

  return { canInstall: Boolean(prompt), install }
}

function LaneButton({ lane, active, onSelect, compact = false }) {
  return (
    <button
      type="button"
      className={`lane-button ${active ? 'is-active' : ''} ${compact ? 'is-compact' : ''}`}
      onClick={() => onSelect(lane.id)}
      aria-pressed={active}
      data-world-lane={lane.id}
    >
      <span>{lane.index}</span>
      <strong>{lane.label}</strong>
    </button>
  )
}

function PartnerRail() {
  return (
    <div className="partner-rail" role="list" aria-label="Learning and community lanes">
      {ecosystemLanes.map((lane) => (
        <article className="partner-row" key={lane.name} role="listitem">
          <div>
            <span className="eyebrow">{lane.status}</span>
            <h3>{lane.name}</h3>
          </div>
          <p>{lane.detail}</p>
          <span className="partner-role">{lane.role}</span>
        </article>
      ))}
    </div>
  )
}

export default function App() {
  const profile = useAdaptiveProfile()
  const { activeLane, selectLane } = useWorldNavigation()
  const { canInstall, install } = useInstallPrompt()

  const active = useMemo(
    () => worldLanes.find((lane) => lane.id === activeLane) || worldLanes[0],
    [activeLane],
  )

  return (
    <div className="app" data-tier={profile.tier} data-active-lane={activeLane}>
      <header className="topbar">
        <a href="#top" className="brand" aria-label="Kopano Labs Learning Network home">
          <img src="/kopano-learning-mark.svg" alt="" />
          <span>
            <strong>Kopano Labs</strong>
            <small>Learning Network</small>
          </span>
        </a>

        <div className="topbar-actions">
          <span className={`network-state ${profile.online ? 'is-online' : 'is-offline'}`}>
            {profile.online ? 'online' : 'offline'}
          </span>
          <span className="tier-badge" title="Adaptive rendering tier">
            {profile.tier}
          </span>
          {canInstall && (
            <button type="button" className="install-button" onClick={install}>
              Install
            </button>
          )}
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <WorldSurface activeLane={activeLane} profile={profile} />
          <div className="hero-vignette" />

          <div className="hero-copy">
            <span className="eyebrow">Education before opportunity</span>
            <h1 id="hero-title">Learn enough to move.</h1>
            <p>
              Technology should not feel like a locked room. Start with knowledge, turn it into proof,
              learn with a community, then move into real opportunities.
            </p>

            <div className="hero-actions">
              <a className="primary-action" href="#pathways">Enter the learning world</a>
              <a className="text-action" href="#watch">Find lessons →</a>
            </div>
          </div>

          <div className="world-caption" aria-live="polite">
            <span>{active.index} / {active.label}</span>
            <strong>{active.title}</strong>
            <p>{active.description}</p>
            <small>{active.proof}</small>
          </div>

          <nav className="lane-switcher" aria-label="Learning world">
            {worldLanes.map((lane) => (
              <LaneButton key={lane.id} lane={lane} active={lane.id === activeLane} onSelect={selectLane} />
            ))}
          </nav>
        </section>

        <section className="proof-strip" aria-label="Platform contract">
          <span>Public core</span>
          <span>Offline-aware</span>
          <span>Adaptive 3D</span>
          <span>Proof before claims</span>
          <span>Mobile-first</span>
        </section>

        <section className="pathways section-shell" id="pathways">
          <div className="section-heading">
            <span className="eyebrow">One path, four states</span>
            <h2>Knowledge must become capability.</h2>
            <p>
              The platform does not drop people directly into jobs, GPUs, cloud consoles or AI tooling.
              It prepares them to use those systems without wasting time, data or money.
            </p>
          </div>

          <div className="pathway-list">
            {worldLanes.map((lane) => (
              <button
                type="button"
                className={`pathway-row ${lane.id === activeLane ? 'is-active' : ''}`}
                key={lane.id}
                onClick={() => selectLane(lane.id)}
              >
                <span className="pathway-index">{lane.index}</span>
                <span className="pathway-main">
                  <strong>{lane.label}</strong>
                  <em>{lane.title}</em>
                </span>
                <span className="pathway-proof">{lane.proof}</span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="watch section-shell" id="watch">
          <div className="video-stage">
            <div className="video-orbit" aria-hidden="true"><span>PLAY</span></div>
            <div className="video-copy">
              <span className="eyebrow">YouTube + workshop library</span>
              <h2>Watch. Try. Return with proof.</h2>
              <p>
                PR2 wires the governed lesson/video data model. Until a real feed is connected, this surface stays explicit
                instead of inventing videos, views or completion numbers.
              </p>
              <span className="pending-state">Lesson feed · wiring next</span>
            </div>
          </div>
        </section>

        <section className="ecosystem section-shell" id="community">
          <div className="section-heading split-heading">
            <div>
              <span className="eyebrow">Community infrastructure</span>
              <h2>Different doors. One learning network.</h2>
            </div>
            <p>
              These lanes help route learners toward communities, programmes and hardware opportunities.
              Their names do not imply endorsement; published claims must stay attached to evidence.
            </p>
          </div>
          <PartnerRail />
        </section>

        <section className="hardware section-shell" id="opportunity">
          <div className="hardware-grid">
            <div className="hardware-visual" aria-hidden="true">
              <span className="chip chip-a" />
              <span className="chip chip-b" />
              <span className="trace trace-a" />
              <span className="trace trace-b" />
              <strong>AI<br />COMPUTE</strong>
            </div>
            <div className="hardware-copy">
              <span className="eyebrow">Opportunity after education</span>
              <h2>Hardware access should arrive with context.</h2>
              <p>
                AI CPUs and GPUs are useful only when people know what they are trying to build. This platform will pair
                eligible hardware pathways with prerequisite learning, project intent and auditable access receipts.
              </p>
              <div className="receipt-line"><span>Access state</span><strong>Evidence required</strong></div>
            </div>
          </div>
        </section>

        <section className="adaptive section-shell">
          <div className="adaptive-copy">
            <span className="eyebrow">APWA telemetry</span>
            <h2>The experience adapts before the learner has to.</h2>
          </div>
          <dl className="telemetry-grid">
            <div><dt>render tier</dt><dd>{profile.tier}</dd></div>
            <div><dt>save data</dt><dd>{profile.saveData ? 'on' : 'off'}</dd></div>
            <div><dt>reduced motion</dt><dd>{profile.reducedMotion ? 'on' : 'off'}</dd></div>
            <div><dt>memory</dt><dd>{profile.memory ? `${profile.memory} GB hint` : 'unknown'}</dd></div>
            <div><dt>CPU</dt><dd>{profile.cores ? `${profile.cores} logical cores` : 'unknown'}</dd></div>
            <div><dt>network</dt><dd>{profile.effectiveType || (profile.online ? 'connected' : 'offline')}</dd></div>
          </dl>
        </section>
      </main>

      <footer>
        <div><strong>Kopano Labs Learning Network</strong><p>Learn → Build → Community → Opportunity</p></div>
        <p className="footer-note">Partner/community names identify learning lanes only. Evidence governs every affiliation claim.</p>
      </footer>

      <nav className="thumb-dock" aria-label="Mobile learning world">
        {worldLanes.map((lane) => (
          <LaneButton compact key={lane.id} lane={lane} active={lane.id === activeLane} onSelect={selectLane} />
        ))}
      </nav>
    </div>
  )
}
