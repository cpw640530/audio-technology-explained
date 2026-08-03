# Meeting Communication Practical Scenarios Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the conferencing and communication lab around four practical scenarios whose illustration, signal chain, risks, metrics, and troubleshooting guidance change together.

**Architecture:** Keep the existing `MeetingCommunicationLab` route and props, but replace its static global flow with a typed scenario configuration and one `activeScenario` state. Small presentational subcomponents render the selected scenario's SVG, chain, experience summary, and engineering guidance from the same configuration so the page cannot show mismatched content.

**Tech Stack:** React 19, TypeScript, inline responsive SVG, CSS, Vitest, Testing Library, Vite.

---

## File Structure

- Modify `src/App.test.tsx`: replace static meeting-chain assertions with scenario-switching and localization coverage.
- Rewrite `src/components/MeetingCommunicationLab.tsx`: define scenario data, selection state, four scene illustrations, contextual chains, and engineering guidance.
- Modify `src/styles.css`: replace obsolete meeting module/issue styles with practical-scenario layout and responsive rules.
- Modify `src/content/knowledge.ts`: align the topic summary, lab description, key concepts, and misconception with the practical-scene organization.

### Task 1: Lock the four-scenario behavior with tests

**Files:**
- Modify: `src/App.test.tsx:207`

- [ ] **Step 1: Replace the old static-chain assertions with a failing practical-scenario test**

Use one test to open the existing topic and laboratory, then assert the default scene and each exclusive scene transition:

```tsx
it("explores conferencing through four practical scenarios", async () => {
  const user = userEvent.setup();
  render(<App />);

  const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
  await user.click(within(categoriesRegion).getByRole("button", { name: /应用场景/ }));
  await user.click(screen.getByRole("button", { name: /会议与通信/ }));

  const details = screen.getByRole("dialog", { name: "主题详情" });
  await user.click(within(details).getByRole("button", { name: "打开会议与通信实验室" }));

  const lab = screen.getByRole("main", { name: "会议与通信实验室" });
  expect(within(lab).getByRole("button", { name: "个人终端" })).toHaveAttribute("aria-pressed", "true");
  expect(within(lab).getByRole("img", { name: "个人终端会议场景图" })).toBeInTheDocument();
  expect(within(lab).getByText("ERLE")).toBeInTheDocument();

  await user.click(within(lab).getByRole("button", { name: "多人会议室" }));
  expect(within(lab).getByRole("img", { name: "多人会议室场景图" })).toBeInTheDocument();
  expect(within(lab).getByText("麦克风阵列")).toBeInTheDocument();
  expect(within(lab).queryByText("耳机模式")).not.toBeInTheDocument();

  await user.click(within(lab).getByRole("button", { name: "弱网会议" }));
  expect(within(lab).getByRole("img", { name: "弱网会议场景图" })).toBeInTheDocument();
  expect(within(lab).getByText("Jitter Buffer")).toBeInTheDocument();
  expect(within(lab).getByText("PLC")).toBeInTheDocument();
  expect(within(lab).getByText("丢包率")).toBeInTheDocument();

  await user.click(within(lab).getByRole("button", { name: "实时字幕" }));
  expect(within(lab).getByRole("img", { name: "实时字幕会议场景图" })).toBeInTheDocument();
  expect(within(lab).getByText("流式 ASR")).toBeInTheDocument();
  expect(within(lab).getByText("首字延迟")).toBeInTheDocument();
});
```

- [ ] **Step 2: Add focused English-label coverage**

Extend the existing language-toggle path or add a compact test that opens the lab in English and checks `Personal device`, `Meeting room`, `Poor network`, and `Live captions`.

- [ ] **Step 3: Run the focused test and verify it fails for missing scenario controls**

Run:

```bash
npm test -- --run src/App.test.tsx
```

Expected: FAIL because the current laboratory has no `个人终端` scenario button or scenario-specific image.

- [ ] **Step 4: Commit the failing tests**

```bash
git add src/App.test.tsx
git commit -m "test: 补充会议通信场景切换测试"
```

### Task 2: Implement scenario-driven content and illustrations

**Files:**
- Rewrite: `src/components/MeetingCommunicationLab.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Define typed localized scenario data**

Add these stable types and IDs near the component:

```tsx
type ScenarioId = "personal" | "room" | "network" | "captions";

type Scenario = {
  id: ScenarioId;
  label: LocalizedText;
  title: LocalizedText;
  action: LocalizedText;
  expected: LocalizedText;
  risk: LocalizedText;
  modules: LocalizedText[];
  metrics: LocalizedText[];
  checks: LocalizedText[];
  chain: Array<{ label: LocalizedText; kind: "capture" | "process" | "network" | "playback" | "recognition" }>;
};
```

Create exactly four entries matching the approved design: personal terminal, meeting room, poor network, and live captions. Keep `Jitter Buffer`, `PLC`, `ERLE`, and `Opus` as standard technical labels in both languages.

- [ ] **Step 2: Add one selected-scenario state and accessible controls**

Use one source of truth:

```tsx
const [activeScenario, setActiveScenario] = useState<ScenarioId>("personal");
const scenario = scenarios.find((item) => item.id === activeScenario) ?? scenarios[0];
```

Render the four controls as `button` elements with `aria-pressed={scenario.id === activeScenario}`. Do not add sliders or audio playback.

- [ ] **Step 3: Replace the global flow SVG with four practical scenes**

Create `MeetingScenarioIllustration({ scenario, language })`. Render a shared 980 by 500 SVG frame and branch only the scene content:

- `personal`: local user, laptop/phone, internal microphone and speaker, remote participant, and a labeled speaker-to-microphone echo arc.
- `room`: meeting table, at least three participants, central microphone array, room speaker, far-end display, pickup beams, and room-reflection paths.
- `network`: local and remote endpoints separated by packet symbols with unequal spacing and one visibly missing packet; labels distinguish jitter, loss, recovery, and delay.
- `captions`: enhanced PCM branches into streaming ASR, incremental captions, optional translation, and a subtitle display; arrows make clear this is a side path rather than speaker playback.

Give each branch a localized unique accessible name such as `个人终端会议场景图` / `Personal-device meeting scene`.

- [ ] **Step 4: Render synchronized experience, chain, and engineering sections**

Below the illustration, render:

```tsx
<section className="meeting-experience-grid">...</section>
<MeetingScenarioChain scenario={scenario} language={language} />
<section className="meeting-engineering-grid">...</section>
```

The experience grid contains `用户正在做什么`, `正常体验`, and `主要风险`. The engineering grid contains `关键模块`, `可观察指标`, and an ordered `排查顺序`. Every value must come from the current `scenario`; remove `flowModules`, `issueCards`, `MeetingChainDiagram`, and their old static rendering.

- [ ] **Step 5: Run the focused test and fix semantic ambiguities**

Run:

```bash
npm test -- --run src/App.test.tsx
```

Expected: PASS. If repeated standard labels cause Testing Library ambiguity, scope assertions to the named chain or engineering region rather than weakening them to generic DOM queries.

- [ ] **Step 6: Commit the component implementation**

```bash
git add src/components/MeetingCommunicationLab.tsx src/App.test.tsx
git commit -m "feat: 重组会议通信实用场景实验室"
```

### Task 3: Build the practical-scene responsive layout

**Files:**
- Modify: `src/styles.css:2737`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Replace obsolete static meeting styles**

Remove selectors used only by the deleted module and issue grids. Add scoped styles for:

```css
.meeting-scenario-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.meeting-scene-layout { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(16rem, .75fr); }
.meeting-scene-figure { min-width: 0; overflow-x: auto; }
.meeting-scene-figure svg { display: block; width: 100%; min-width: 45rem; height: auto; }
.meeting-experience-grid,
.meeting-engineering-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.meeting-scenario-chain { display: flex; align-items: stretch; overflow-x: auto; }
```

Use existing CSS variables and meeting semantic colors. Keep card radii at or below the existing project value and set `letter-spacing: 0` for new text styles.

- [ ] **Step 2: Add mobile layout rules**

At the existing responsive breakpoints:

```css
.meeting-scenario-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.meeting-scene-layout,
.meeting-experience-grid,
.meeting-engineering-grid { grid-template-columns: 1fr; }
```

Keep the SVG's explicit horizontal scroll area so labels are not compressed or clipped. Ensure chain nodes have stable minimum widths and multi-line labels.

- [ ] **Step 3: Run tests and build**

```bash
npm test -- --run src/App.test.tsx
npm run build
git diff --check
```

Expected: all tests pass, Vite build succeeds, and `git diff --check` prints no errors. The existing bundle-size warning is acceptable unless its size materially increases.

- [ ] **Step 4: Commit the responsive styles**

```bash
git add src/styles.css
git commit -m "style: 优化会议通信场景布局"
```

### Task 4: Align the topic detail and verify the rendered experience

**Files:**
- Modify: `src/content/knowledge.ts:2010`
- Test: `src/App.test.tsx:207`

- [ ] **Step 1: Update the topic detail without duplicating adjacent labs**

Revise the meeting topic explanation and lab description to introduce the four practical scenes and the application-level relationship among environment, chain, symptom, metric, and diagnosis. Keep concise references to AEC, Jitter Buffer, PLC, and ASR, but do not add algorithm formulas or low-level driver details.

- [ ] **Step 2: Update detail assertions to match the revised copy**

Keep assertions on meaningful stable phrases, including the four-scene scope and the distinction between acoustic, network, and subtitle-path problems. Do not assert entire paragraphs.

- [ ] **Step 3: Run full automated verification**

```bash
npm test -- --run src/App.test.tsx
npm run build
git diff --check
```

Expected: all tests pass, build succeeds, and no whitespace errors are reported.

- [ ] **Step 4: Verify Vite and perform browser QA**

Check whether the current Vite server is listening; restart it on the existing project port if it is not. Use Playwright at desktop `1440x900` and mobile `390x844` to verify:

- all four controls switch to exclusive matching content;
- each SVG contains visible non-background pixels and is framed correctly;
- no page-level horizontal overflow exists;
- the named SVG scroll region works on mobile;
- labels do not overlap or leave their boxes;
- returning to the knowledge page still works;
- browser console has no errors.

- [ ] **Step 5: Commit the knowledge copy and final corrections**

```bash
git add src/content/knowledge.ts src/App.test.tsx src/components/MeetingCommunicationLab.tsx src/styles.css
git commit -m "docs: 完善会议通信场景知识说明"
```

