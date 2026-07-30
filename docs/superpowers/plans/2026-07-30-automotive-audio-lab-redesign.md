# Automotive Audio Lab Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the ambiguous cabin shape with a recognizable interactive top-down car and synchronize each selected automotive-acoustics module with scientifically bounded bilingual explanations.

**Architecture:** Keep the existing `automotiveAudioLab` route and contain the feature in `AutomotiveAudioLab.tsx`. Add a typed module configuration that drives the tab state, SVG layer visibility, legend, and explanation panel from one source of truth; update the topic detail separately in `knowledge.ts` so the card remains useful before the lab opens.

**Tech Stack:** React 18, TypeScript, inline SVG, CSS, Vitest, Testing Library, Vite

---

## File Map

- Modify `src/components/AutomotiveAudioLab.tsx`: module types/configuration, interactive controls, recognizable vehicle SVG, synchronized explanation panel.
- Modify `src/content/knowledge.ts`: concise end-to-end automotive-acoustics overview and corrected key concepts.
- Modify `src/styles.css`: module controls, SVG states, responsive layout, non-overlapping labels.
- Modify `src/App.test.tsx`: topic-detail assertions and user-visible module-switching behavior.

### Task 1: Lock the interactive contract with failing tests

**Files:**
- Modify: `src/App.test.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Extend the existing automotive lab test with the new controls and default state**

Add assertions after opening the lab:

```tsx
expect(within(lab).getByRole("button", { name: "整车布局" })).toHaveAttribute("aria-pressed", "true");
expect(within(lab).getByRole("button", { name: "语音交互" })).toHaveAttribute("aria-pressed", "false");
expect(within(lab).getByRole("button", { name: "声源定位" })).toBeInTheDocument();
expect(within(lab).getByRole("button", { name: "空间音频" })).toBeInTheDocument();
expect(within(lab).getByRole("button", { name: "ANC / RNC" })).toBeInTheDocument();
expect(within(cabinImage).getByText("车头")).toBeInTheDocument();
expect(within(cabinImage).getByText("车尾")).toBeInTheDocument();
expect(within(lab).getByRole("heading", { name: "整车声学布局" })).toBeInTheDocument();
```

- [ ] **Step 2: Add switching assertions for every module**

Use the same `user` and `lab` objects:

```tsx
await user.click(within(lab).getByRole("button", { name: "语音交互" }));
expect(within(lab).getByRole("heading", { name: "从一句话到车辆动作" })).toBeInTheDocument();
expect(within(lab).getByText(/AEC \/ 降噪 \/ 波束形成/)).toBeInTheDocument();

await user.click(within(lab).getByRole("button", { name: "声源定位" }));
expect(within(lab).getByText("Δt = d sin(θ) / c")).toBeInTheDocument();
expect(within(lab).getByText(/定位负责判断方向.*波束形成负责增强目标方向/)).toBeInTheDocument();

await user.click(within(lab).getByRole("button", { name: "空间音频" }));
expect(within(lab).getByRole("heading", { name: "让每类声音出现在合适方向" })).toBeInTheDocument();
expect(within(lab).getByText(/安全告警优先于娱乐声场/)).toBeInTheDocument();

await user.click(within(lab).getByRole("button", { name: "ANC / RNC" }));
expect(within(lab).getByRole("heading", { name: "用闭环控制削弱稳定低频噪声" })).toBeInTheDocument();
expect(within(lab).getByText(/参考信号.*ANC 控制器.*误差麦反馈/)).toBeInTheDocument();
```

- [ ] **Step 3: Run the focused test and verify the new contract fails**

Run: `npm test -- --run src/App.test.tsx -t "expands in-car acoustics"`

Expected: FAIL because the module buttons and synchronized headings do not exist yet.

- [ ] **Step 4: Commit the test contract**

```bash
git add src/App.test.tsx
git commit -m "test: 补充车载声学交互测试"
```

### Task 2: Build the typed module model and interactive vehicle diagram

**Files:**
- Modify: `src/components/AutomotiveAudioLab.tsx`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Define the module key and explanation model above the component**

Use one configuration as the source for controls and content:

```tsx
type AutomotiveModule = "layout" | "voice" | "localization" | "spatial" | "anc";

type ModuleContent = {
  label: LocalizedText;
  heading: LocalizedText;
  goal: LocalizedText;
  chain: LocalizedText;
  limit: LocalizedText;
  example: LocalizedText;
};

const automotiveModules: Record<AutomotiveModule, ModuleContent> = {
  layout: {
    label: { zh: "整车布局", en: "Cabin layout" },
    heading: { zh: "整车声学布局", en: "Whole-vehicle acoustic layout" },
    goal: { zh: "先看麦克风、扬声器、座位和噪声源的相对位置。", en: "Start with the relative positions of microphones, speakers, seats, and noise sources." },
    chain: { zh: "乘员 / 噪声源 -> 麦克风与传感器 -> DSP / 功放 -> 扬声器", en: "Occupants / noise sources -> microphones and sensors -> DSP / amplifiers -> speakers" },
    limit: { zh: "位置会同时影响拾音距离、声像、布线、校准空间和成本。", en: "Placement affects pickup distance, imaging, wiring, calibration headroom, and cost." },
    example: { zh: "顶灯阵列覆盖前后排，A 柱和门板扬声器负责不同频段，低音炮常放在后部。", en: "An overhead array covers front and rear seats, pillar and door speakers cover different bands, and the subwoofer is often rear-mounted." }
  },
  voice: {
    label: { zh: "语音交互", en: "Voice interaction" },
    heading: { zh: "从一句话到车辆动作", en: "From speech to vehicle action" },
    goal: { zh: "在噪声和音乐中可靠识别说话人意图，并安全执行允许的车辆动作。", en: "Recognize intent through noise and playback, then safely execute an allowed vehicle action." },
    chain: { zh: "说话人 -> 麦克风阵列 -> AEC / 降噪 / 波束形成 -> 唤醒词 / ASR -> 意图与安全策略 -> 车辆控制 / 语音反馈", en: "Talker -> mic array -> AEC / denoising / beamforming -> wake / ASR -> intent and safety policy -> control / voice response" },
    limit: { zh: "车速、驾驶状态、座位权限和安全策略决定动作是否允许。", en: "Speed, driving state, seat permission, and safety policy determine whether an action is allowed." },
    example: { zh: "驾驶员可以调节空调；后排乘客通常只能控制自己的娱乐区域。", en: "The driver may adjust climate controls, while a rear passenger is usually limited to their entertainment zone." }
  },
  localization: {
    label: { zh: "声源定位", en: "Localization" },
    heading: { zh: "用到达时间差判断说话座位", en: "Locate a speaking seat from arrival-time differences" },
    goal: { zh: "比较同一声音到达多个同步麦克风的时间差和相位差，估计说话方向。", en: "Compare arrival-time and phase differences across synchronized microphones to estimate talker direction." },
    chain: { zh: "Δt = d sin(θ) / c", en: "Δt = d sin(θ) / c" },
    limit: { zh: "定位负责判断方向；波束形成负责增强目标方向。强反射、通道延迟和多人重叠会造成漂移。", en: "Localization estimates direction; beamforming enhances it. Reflections, channel delay, and overlapping talkers cause drift." },
    example: { zh: "系统先判断声音来自副驾，再只允许副驾控制其座椅或娱乐区域。", en: "The system first assigns speech to the passenger seat, then limits control to that seat or entertainment zone." }
  },
  spatial: {
    label: { zh: "空间音频", en: "Spatial audio" },
    heading: { zh: "让每类声音出现在合适方向", en: "Place each sound in a useful direction" },
    goal: { zh: "利用多扬声器、延迟、EQ、相位和座位补偿建立稳定声像。", en: "Use multiple speakers, delay, EQ, phase, and seat compensation to create stable imaging." },
    chain: { zh: "音源分类 -> 声道映射 -> 延迟 / EQ / 相位 -> 功放 -> 多扬声器声场", en: "Source class -> channel mapping -> delay / EQ / phase -> amplifiers -> multi-speaker field" },
    limit: { zh: "安全告警优先于娱乐声场，导航提示应来自与转向一致的方向。", en: "Safety alerts override entertainment imaging, and navigation prompts should agree with the turn direction." },
    example: { zh: "左转提示偏向驾驶员左前方，音乐保持宽声场，告警覆盖娱乐声音。", en: "A left-turn prompt appears front-left, music keeps a wide stage, and alerts override entertainment." }
  },
  anc: {
    label: { zh: "ANC / RNC", en: "ANC / RNC" },
    heading: { zh: "用闭环控制削弱稳定低频噪声", en: "Reduce stable low-frequency noise with closed-loop control" },
    goal: { zh: "预测发动机、轮胎和路面低频噪声，并让扬声器产生幅度与相位受控的反相信号。", en: "Predict low-frequency engine, tire, and road noise and emit an amplitude- and phase-controlled anti-noise signal." },
    chain: { zh: "参考信号 -> ANC 控制器 -> 扬声器反相信号 -> 座舱残余噪声 -> 误差麦反馈", en: "Reference -> ANC controller -> anti-noise speaker output -> residual cabin noise -> error-mic feedback" },
    limit: { zh: "它适合稳定低频，不应抵消人声、告警或突发高频；相位和延迟错误会放大噪声。", en: "It suits stable low frequencies, not speech, alerts, or high-frequency transients; phase or delay error can amplify noise." },
    example: { zh: "控制器根据轮速或悬架参考预测路噪，再用误差麦持续修正残余声压。", en: "The controller predicts road noise from wheel or suspension references, then corrects residual pressure with error microphones." }
  }
};
```

- [ ] **Step 2: Replace the fixed diagram signature with a module-driven signature**

```tsx
function AutomotiveCabinDiagram({ language, activeModule }: { language: Language; activeModule: AutomotiveModule }) {
```

Add `data-active-module={activeModule}` to the SVG and group relevant SVG layers with `data-module="voice"`, `data-module="localization"`, `data-module="spatial"`, or `data-module="anc"`.

- [ ] **Step 3: Replace the rounded cabin shell with a recognizable top-down car**

Build the SVG from stable groups:

```tsx
<g className="auto-vehicle-shell">
  <text className="auto-orientation-label" x="490" y="78" textAnchor="middle">{language === "zh" ? "车头" : "Front"}</text>
  <path className="auto-body" d="M318 92 Q490 42 662 92 L724 178 L744 398 L676 500 Q490 536 304 500 L236 398 L256 178Z" />
  <path className="auto-front-glass" d="M332 118 Q490 82 648 118 L682 184 H298Z" />
  <path className="auto-rear-glass" d="M306 414 H674 L640 478 Q490 506 340 478Z" />
  <g className="auto-wheel-set" aria-hidden="true">
    <rect x="220" y="156" width="42" height="92" rx="18" />
    <rect x="718" y="156" width="42" height="92" rx="18" />
    <rect x="220" y="356" width="42" height="92" rx="18" />
    <rect x="718" y="356" width="42" height="92" rx="18" />
  </g>
  <text className="auto-orientation-label" x="490" y="526" textAnchor="middle">{language === "zh" ? "车尾" : "Rear"}</text>
</g>
```

Place four independent seats, steering wheel, console, door seams, microphones, speakers, subwoofer, and error microphones inside the body. Keep external panels outside the car so labels do not cover seats.

- [ ] **Step 4: Add the controlled module buttons and synchronized explanation panel**

Inside `AutomotiveAudioLab`:

```tsx
const [activeModule, setActiveModule] = useState<AutomotiveModule>("layout");
const activeContent = automotiveModules[activeModule];
```

Render controls and content:

```tsx
<div className="automotive-module-tabs" aria-label={language === "zh" ? "车载声学模块" : "Automotive acoustic modules"}>
  {(Object.keys(automotiveModules) as AutomotiveModule[]).map((module) => (
    <button
      aria-pressed={activeModule === module}
      key={module}
      onClick={() => setActiveModule(module)}
      type="button"
    >
      {automotiveModules[module].label[language]}
    </button>
  ))}
</div>
<AutomotiveCabinDiagram activeModule={activeModule} language={language} />
<article className="automotive-active-explanation" aria-live="polite">
  <h2>{activeContent.heading[language]}</h2>
  <dl>
    <div><dt>{language === "zh" ? "工作目标" : "Goal"}</dt><dd>{activeContent.goal[language]}</dd></div>
    <div><dt>{language === "zh" ? "处理链路" : "Signal chain"}</dt><dd>{activeContent.chain[language]}</dd></div>
    <div><dt>{language === "zh" ? "关键限制" : "Key limits"}</dt><dd>{activeContent.limit[language]}</dd></div>
    <div><dt>{language === "zh" ? "实际例子" : "Example"}</dt><dd>{activeContent.example[language]}</dd></div>
  </dl>
</article>
```

Remove the old `vehicleModules`, `vehicleIssues`, module grid, and separate issue grid after their non-duplicated information has moved into `automotiveModules`.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- --run src/App.test.tsx -t "expands in-car acoustics"`

Expected: PASS.

- [ ] **Step 6: Commit the interactive component**

```bash
git add src/components/AutomotiveAudioLab.tsx src/App.test.tsx
git commit -m "feat: 重画交互式车载声学座舱"
```

### Task 3: Style module states and responsive vehicle labels

**Files:**
- Modify: `src/styles.css`
- Test: `src/App.test.tsx`

- [ ] **Step 1: Add stable module-control and explanation layouts**

```css
.automotive-module-tabs {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.automotive-module-tabs button {
  background: #f7faf8;
  border: 1px solid rgba(31, 117, 105, 0.2);
  border-radius: 6px;
  color: #3f4d49;
  min-height: 42px;
  padding: 8px 10px;
}

.automotive-module-tabs button[aria-pressed="true"] {
  background: #1f7569;
  border-color: #1f7569;
  color: #ffffff;
}

.automotive-active-explanation dl {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
}
```

- [ ] **Step 2: Add visual hierarchy for active and inactive SVG layers**

Use the SVG `data-active-module` attribute so the shell remains stable while module overlays change:

```css
.automotive-diagram [data-module] {
  opacity: 0.16;
  transition: opacity 180ms ease;
}

.automotive-diagram [data-active-module="layout"] [data-module],
.automotive-diagram [data-active-module="voice"] [data-module="voice"],
.automotive-diagram [data-active-module="localization"] [data-module="localization"],
.automotive-diagram [data-active-module="spatial"] [data-module="spatial"],
.automotive-diagram [data-active-module="anc"] [data-module="anc"] {
  opacity: 1;
}

.auto-wheel-set rect {
  fill: #2f3937;
}

.auto-orientation-label {
  fill: #51615d;
  font-size: 13px;
  font-weight: 800;
}
```

- [ ] **Step 3: Add small-screen rules that prevent overlap**

```css
@media (max-width: 720px) {
  .automotive-module-tabs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .automotive-active-explanation dl {
    grid-template-columns: 1fr;
  }

  .automotive-diagram {
    overflow-x: auto;
  }

  .automotive-diagram svg {
    min-width: 720px;
  }
}
```

- [ ] **Step 4: Run focused test and build**

Run: `npm test -- --run src/App.test.tsx -t "expands in-car acoustics"`

Expected: PASS.

Run: `npm run build`

Expected: TypeScript and Vite build complete successfully; the existing chunk-size warning is acceptable.

- [ ] **Step 5: Commit the styling**

```bash
git add src/styles.css
git commit -m "style: 优化车载声学实验室布局"
```

### Task 4: Update the topic knowledge and complete verification

**Files:**
- Modify: `src/content/knowledge.ts`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Update the topic-detail test before content**

Replace broad legacy assertions with specific system boundaries:

```tsx
expect(within(details).getByText(/采集与定位、语音理解、回放与空间渲染、噪声控制/)).toBeInTheDocument();
expect(within(details).getByText(/ANC \/ RNC 是闭环低频噪声控制/)).toBeInTheDocument();
```

- [ ] **Step 2: Run the topic test and verify it fails**

Run: `npm test -- --run src/App.test.tsx -t "expands in-car acoustics"`

Expected: FAIL because the revised topic copy is not present.

- [ ] **Step 3: Rewrite the automotive topic detail around four system boundaries**

Set the Chinese explanation to this concise structure and provide an equivalent English translation:

```ts
zh: "车载声学把采集与定位、语音理解、回放与空间渲染、噪声控制连接成同一套座舱系统。麦克风阵列先采集乘员语音，并通过时间差、相位差和波束形成判断说话座位、增强目标方向；AEC 和降噪抑制扬声器回放、路噪与空调声。随后唤醒词、ASR 和意图理解把语音变成候选动作，车辆还要结合车速、驾驶状态、座位权限和安全策略决定是否执行。播放侧通过多扬声器、功放、延迟、EQ 和相位校准渲染音乐、导航、告警与语音反馈。ANC / RNC 是闭环低频噪声控制：控制器根据参考信号预测发动机、轮胎或路面噪声，经扬声器产生反相信号，再由误差麦反馈修正。"
```

Update key concepts so each item owns one boundary: microphone array and zone pickup; voice and safety policy; speaker rendering and priority; ANC/RNC closed-loop control. Remove sentences duplicated verbatim in the lab.

- [ ] **Step 4: Run all project verification**

Run: `npm test -- --run src/App.test.tsx`

Expected: all `src/App.test.tsx` tests PASS.

Run: `npm run build`

Expected: build succeeds; the existing chunk-size warning is acceptable.

Run: `git diff --check`

Expected: no output.

- [ ] **Step 5: Check or restart Vite and inspect desktop/mobile rendering**

Check: `curl -I http://127.0.0.1:5178/audio-technology-sharing/`

Expected: HTTP 200. If unavailable, run `npm run dev -- --host 127.0.0.1 --port 5178` and keep the returned session running.

Use Playwright at approximately 1440x900 and 390x844 to verify:

- the car is recognizable from its shell, wheels, glass, seats, and orientation labels;
- each module changes the visible overlay and explanation;
- no SVG or explanation text overlaps;
- mobile keeps the SVG scrollable instead of shrinking labels below readability.

- [ ] **Step 6: Commit the knowledge update**

```bash
git add src/content/knowledge.ts src/App.test.tsx
git commit -m "docs: 完善车载声学知识链路"
```
