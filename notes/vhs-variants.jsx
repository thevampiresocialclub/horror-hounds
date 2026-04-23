// VHS variants — 4 renderings of the top-of-page cassette frame

// ── A: CURRENT ──────────────────────────────────────────────────────────────
function VariantA() {
  return (
    <div className="vhs-stage" style={{position:'relative'}}>
      <span className="vhs-stage-label">A · LIVE ON SITE</span>
      <div style={{width:'100%'}}>
        <div className="vA-frame">
          <div className="vA-cassette">
            <div className="vA-reel"><div className="vA-reel-inner"/><div className="vA-hub"/></div>
            <div className="vA-label">
              <div className="vA-stripe"/>
              <div className="vA-body">
                <div className="vA-title">The Horror Hounds</div>
                <div className="vA-sub">VOL. ∞ · REC ● · SLP</div>
              </div>
            </div>
            <div className="vA-reel"><div className="vA-reel-inner"/><div className="vA-hub"/></div>
          </div>
          <div className="vA-rec"><span className="vA-rec-dot"/><span>REC</span></div>
        </div>
      </div>
    </div>
  );
}

// ── B: ACCURATE GEOMETRY ───────────────────────────────────────────────────
function VariantB() {
  return (
    <div className="vhs-stage" style={{position:'relative'}}>
      <span className="vhs-stage-label">B · ACCURATE GEOMETRY</span>
      <div style={{width:'100%'}}>
        <div className="vB-frame">
          <div className="vB-cassette">
            <span className="vB-screw tl"/><span className="vB-screw tr"/>
            <span className="vB-screw bl"/><span className="vB-screw br"/>

            <div className="vB-label">
              <div className="vB-label-body">
                <div className="vB-label-title">The Horror Hounds</div>
                <div className="vB-label-meta">
                  <span>VOL. ∞</span>
                  <span className="sep">●</span>
                  <span>SLP · 240 MIN</span>
                  <span className="sep">●</span>
                  <span>2021–</span>
                </div>
              </div>
            </div>

            <span className="vB-tab"/>

            <div className="vB-reel left"><div className="vB-reel-inner"/><div className="vB-reel-hub"/></div>
            <div className="vB-reel right"><div className="vB-reel-inner"/><div className="vB-reel-hub"/></div>

            <div className="vB-window"/>
          </div>

          <div className="vB-rec"><span className="vB-rec-dot"/><span>REC</span></div>
        </div>
      </div>
    </div>
  );
}

// ── C: STYLIZED GRAPHIC ────────────────────────────────────────────────────
function VariantC() {
  return (
    <div className="vhs-stage" style={{position:'relative'}}>
      <span className="vhs-stage-label">C · STYLIZED / GRAPHIC</span>
      <div style={{width:'100%'}}>
        <div className="vC-frame">
          <div className="vC-reel"><div className="vC-reel-inner"/></div>
          <div className="vC-label">
            <div className="vC-label-stripe">
              <span className="vC-tag">VHS-TH-001 · SLP MODE</span>
              <span className="vC-tag">VOL. ∞</span>
            </div>
            <div className="vC-body">
              <div className="vC-title">The <b>Horror</b> Hounds</div>
              <div className="vC-meta">
                <div>HORROR FANS BY NATURE</div>
                <div>FRIENDS BY CHOICE</div>
                <div className="rec-inline"><span className="rec-dot"/><b>REC · LIVE</b></div>
              </div>
            </div>
          </div>
          <div className="vC-reel"><div className="vC-reel-inner"/></div>
        </div>
      </div>
    </div>
  );
}

// ── D: MINIMAL ICONOGRAPHIC ─────────────────────────────────────────────────
function VariantD() {
  return (
    <div className="vhs-stage" style={{position:'relative'}}>
      <span className="vhs-stage-label">D · MINIMAL CHYRON</span>
      <div style={{width:'100%'}}>
        <div className="vD-frame">
          <div className="vD-reel"/>
          <div className="vD-wordmark">The <b>Horror</b> Hounds</div>
          <div className="vD-sep"/>
          <div className="vD-meta">
            <span>EP-175</span>
            <span className="blood">●</span>
            <span>00:04:23</span>
            <span className="blood">●</span>
            <span className="rec"><span className="rec-dot"/>REC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { VariantA, VariantB, VariantC, VariantD });
