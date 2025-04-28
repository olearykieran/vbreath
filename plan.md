Below is a clean, step-by-step implementation plan you can drop into plan.md (or split into Cursor/Windsurf epics).
It covers the two upgrades you asked for: 1. Precise second-based timing (7 s in / 9 s out, etc.) 2. 3-D "Breathe In / Breathe Out" text synced to the geometry

⸻

🗺️ High-Level Roadmap

Phase Goal (ship when ✅) Core Files Touched / Added
P1 – Timing Controls User can set exact inhale / exhale seconds; mesh animates in perfect sync breathStore, useBreathAnimation.ts, TempoControl.tsx → SecondsControl.tsx
P2 – 3-D Text Cues TextGeometry appears above mesh, toggling "Breathe In" / "Breathe Out" at phase change BreathScene.tsx, MeshObject.tsx, NEW PhaseText.tsx
P3 – Polish & QA Smooth easing, edge-case tests, responsiveness tests, minor CSS

Ship Phase 1 before starting Phase 2 to avoid scope bleed.

⸻

🔑 Phase 1 — Second-Based Timing

Epic 1: Data / State

Task Details

- [x] 1.1 Extend breathStore ts // before: { tempoMultiplier } -> after: { inhaleSec: number; exhaleSec: number; } • default { inhaleSec: 4, exhaleSec: 6 } (Done)
- [x] 1.2 Migrate legacy multiplier If tempoMultiplier still exists, derive seconds = base × multiplier, then deprecate. (Handled in store initialization)

Epic 2: UI Control

Task Details

- [x] 2.1 TempoControl.tsx → SecondsControl.tsx • Replace slider with two numeric steppers (1–20 s)• Update store on change.• Show total cycle length. (SecondsControl implemented and integrated)
      2.2 Validation • Disable "0 s" edge cases.• Toast if cycle > 30 s (warn user).

Epic 3: Animation Hook

Task Details
3.1 Rewrite useBreathAnimation.ts core loop • Derive cycleMs = (inhaleSec + exhaleSec) \* 1000.• Use clock.getElapsedTime() to compute phase.• Map t from 0→inhaleSec to expand easing; inhaleSec→cycle to contract easing.
3.2 Unit test • Jest test: for 7 s / 9 s expect phase toggle at 7 000 ms & 16 000 ms.

⸻

📐 Easing Reference

const easeInOut = (t: number) =>
t < 0.5 ? 2 _ t _ t : -1 + (4 - 2 _ t) _ t; // smooth-step
scale = THREE.MathUtils.lerp(minScale, maxScale, easeInOut(progress));

(Progress is 0→1 during inhale, 1→0 during exhale.)

⸻

🔤 Phase 2 — 3-D Text Cues

Epic 4: Text Component

Task Details
4.1 Create PhaseText.tsx • Reusable Three.js TextGeometry (drei <Text>)• Props: `text: 'Breathe In'

Epic 5: Scene Integration

Task Details
5.1 Modify BreathScene.tsx • Import PhaseText.• Place PhaseText slightly above main mesh (y = meshHeight + 0.5).
5.2 Sync Visibility • In useBreathAnimation expose isInhaling boolean via context or return tuple.• Render Breathe In when isInhaling, else Breathe Out.
5.3 Fade Animation (optional) • Animate text opacity with same easing for smooth switch.

⸻

⚙️ Phase 3 — Polish

Task Details
6.1 Accessibility • Add fallback screen-reader text (ARIA live region) mirroring phase.
6.2 Responsive Store Defaults • If viewport < 400 px, reduce default font size / mesh scale.
6.3 Cypress e2e • Test: set 3 s / 3 s → verify phase toggles six times in 18 s.

⸻

📂 File-Level Changes Quick View

src/
├─ components/
│ ├─ SecondsControl.tsx # new UI for timing
│ ├─ PhaseText.tsx # 3-D text mesh
│ └─ … existing files
├─ hooks/
│ └─ useBreathAnimation.ts # updated timing logic
├─ store/
│ └─ breathStore.ts # inhaleSec / exhaleSec

⸻
