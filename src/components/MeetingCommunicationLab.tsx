import { useId, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Language } from "../content/knowledge";

type MeetingCommunicationLabProps = {
  language: Language;
  onBack: () => void;
};

type ScenarioId = "personal" | "room" | "network" | "captions";
type ChainKind = "capture" | "process" | "network" | "playback" | "recognition";
type LocalizedText = Record<Language, string>;

type Scenario = {
  label: LocalizedText;
  title: LocalizedText;
  action: LocalizedText;
  expected: LocalizedText;
  risk: LocalizedText;
  sceneDescription: LocalizedText;
  modules: LocalizedText[];
  metrics: LocalizedText[];
  checks: LocalizedText[];
  chain: Array<{ kind: ChainKind; label: LocalizedText }>;
};

const t = (zh: string, en: string): LocalizedText => ({ zh, en });

const scenarios: Record<ScenarioId, Scenario> = {
  personal: {
    label: t("个人终端", "Personal device"),
    title: t("个人终端：免提通话", "Personal device: speakerphone call"),
    action: t("用户用笔记本或手机的内置麦克风和扬声器参加远程会议。", "A user joins a remote meeting on a laptop or phone using its built-in microphone and speaker."),
    expected: t("近端和远端可以自然双讲，远端不会听到自己的回声。", "Near- and far-end participants can double-talk naturally without the remote participant hearing an echo."),
    risk: t("扬声器声音经桌面和墙面反射回到麦克风；音量变化和双讲会让回声更难消除。", "Speaker audio can reflect from the desk and walls into the microphone; level changes and double-talk make cancellation harder."),
    sceneDescription: t("笔记本或手机的扬声器播放远端声音，播放参考信号进入 AEC；同时声学回声从扬声器绕回内置麦克风。", "A laptop or phone plays remote audio through its speaker. The render reference enters AEC while acoustic echo travels from speaker back to the built-in microphone."),
    modules: [t("AEC", "AEC"), t("双讲检测", "Double-talk detection"), t("NS / ANR", "NS / ANR"), t("AGC", "AGC"), t("耳机模式", "Headset mode")],
    metrics: [t("ERLE", "ERLE"), t("端到端延迟", "End-to-end latency"), t("输入峰值", "Input peak"), t("双讲保留率", "Double-talk retention")],
    checks: [t("确认扬声器回采参考进入 AEC。", "Confirm the speaker render reference reaches AEC."), t("检查参考与麦克风信号是否对齐。", "Check alignment between reference and microphone audio."), t("检查双讲保留，再核对扬声器音量和处理强度。", "Check double-talk retention, then verify speaker volume and processing strength.")],
    chain: [
      { kind: "capture", label: t("内置麦克风", "Built-in mic") },
      { kind: "process", label: t("AEC / 双讲 / NS / ANR / AGC", "AEC / double-talk / NS / ANR / AGC") },
      { kind: "network", label: t("实时传输", "Real-time transport") },
      { kind: "playback", label: t("远端参与者", "Remote participant") }
    ]
  },
  room: {
    label: t("多人会议室", "Meeting room"),
    title: t("多人会议室：远场拾音", "Meeting room: far-field pickup"),
    action: t("三名以上参会者围桌讨论，通过中央阵列与远端会场沟通。", "Three or more participants discuss around a table through a central array and far-end display."),
    expected: t("阵列持续对准当前说话人，远近座位的语音都清晰稳定。", "The array tracks the active talker and keeps speech clear from both near and distant seats."),
    risk: t("多人位置、扬声器回放和房间多次反射会扩散声源并加重混响。", "Multiple talker positions, speaker playback, and repeated room reflections spread sources and increase reverberation."),
    sceneDescription: t("三名参会者围绕会议桌，中央麦克风阵列用拾音波束跟随说话人，并接收扬声器产生的墙面和桌面反射。", "Three participants surround a conference table. A central microphone array steers pickup beams toward talkers while receiving wall and table reflections from the speaker."),
    modules: [t("麦克风阵列", "Microphone array"), t("波束拾音", "Beam pickup"), t("多人发言处理", "Multi-speaker processing"), t("AEC", "AEC"), t("去混响", "Dereverberation")],
    metrics: [t("拾音距离", "Pickup distance"), t("混响时间", "Reverberation time"), t("阵列方向", "Array direction"), t("近远端电平差", "Near/far level difference")],
    checks: [t("确认各阵元工作且通道增益一致。", "Confirm every array element works with matched channel gain."), t("观察阵列方向与多人发言切换。", "Observe array direction and multi-speaker switching."), t("最后检查 AEC 与去混响效果。", "Finally check AEC and dereverberation performance.")],
    chain: [
      { kind: "capture", label: t("中央阵列拾音", "Central array pickup") },
      { kind: "process", label: t("波束形成 / 多人发言 / 去混响", "Beamforming / multi-speaker / dereverb") },
      { kind: "process", label: t("AEC", "AEC") },
      { kind: "network", label: t("会议传输", "Conference transport") },
      { kind: "playback", label: t("远端会场", "Far-end room") }
    ]
  },
  network: {
    label: t("弱网会议", "Poor network"),
    title: t("弱网会议：连续听感", "Poor network: continuous listening"),
    action: t("本地与远端端点在延迟抖动和偶发丢包的网络上持续通话。", "Local and remote endpoints continue a call over a network with jitter and occasional packet loss."),
    expected: t("短时抖动和单个丢包不会造成明显停顿，播放延迟保持可控。", "Brief jitter and an isolated missing packet do not cause obvious gaps, while playout delay stays controlled."),
    risk: t("包间隔不均或连续丢包会造成缓冲欠载、卡顿和延迟累积。", "Uneven packet spacing or burst loss can cause buffer underruns, dropouts, and accumulated latency."),
    sceneDescription: t("接收端先接收间隔不均的 RTP 包，再由自适应抖动缓冲重排并调度播放时间，随后解码器决定使用 FEC 恢复或 PLC 补偿，最后连续播放。", "The receiver first accepts uneven RTP packets, then an adaptive jitter buffer reorders and schedules them with buffering delay. During decode, FEC recovery or PLC concealment is selected before continuous playout."),
    modules: [t("Opus", "Opus"), t("RTP", "RTP"), t("FEC", "FEC"), t("Jitter Buffer", "Jitter Buffer"), t("PLC", "PLC"), t("自适应码率", "Adaptive bitrate")],
    metrics: [t("丢包率", "Packet loss rate"), t("到达抖动", "Arrival jitter"), t("RTT", "RTT"), t("PLC 触发率", "PLC trigger rate"), t("播放缓冲深度", "Playout buffer depth")],
    checks: [t("先对比原始采集，区分采集异常与网络损伤。", "First compare raw capture to distinguish capture faults from network damage."), t("检查丢包、RTT、抖动与 PLC 触发。", "Check loss, RTT, jitter, and PLC triggers."), t("最后调整缓冲、FEC 和码率。", "Finally tune buffering, FEC, and bitrate.")],
    chain: [
      { kind: "process", label: t("Opus / 自适应码率", "Opus / adaptive bitrate") },
      { kind: "network", label: t("RTP 包", "RTP packets") },
      { kind: "process", label: t("自适应抖动缓冲", "Adaptive jitter buffer") },
      { kind: "process", label: t("FEC / PLC 解码决策", "FEC / PLC decode decision") },
      { kind: "playback", label: t("连续播放", "Continuous playout") }
    ]
  },
  captions: {
    label: t("实时字幕", "Live captions"),
    title: t("实时字幕：识别旁路", "Live captions: recognition side path"),
    action: t("参会者正常通话，同时查看增量更新的字幕，并可选开启翻译。", "Participants talk normally while reading incrementally updated captions with optional translation."),
    expected: t("首字快速出现，后续文字稳定增量更新，字幕不会阻塞主音频链路。", "The first words appear quickly, later text updates incrementally, and captions never block the main audio path."),
    risk: t("端点等待、识别推理、翻译和 UI 稳定策略会叠加字幕延迟。", "Endpointing, recognition inference, translation, and UI stabilization can add up to caption latency."),
    sceneDescription: t("增强后的 PCM 保持主会议音频路径，同时分支到流式识别、可选翻译和字幕界面，字幕处理不会阻塞音频播放。", "Enhanced PCM remains on the main meeting-audio path while a side branch feeds streaming recognition, optional translation, and the caption UI without blocking playback."),
    modules: [t("流式 ASR", "Streaming ASR"), t("端点检测", "Endpoint detection"), t("增量字幕", "Incremental captions"), t("字幕稳定", "Caption stabilization"), t("可选翻译", "Optional translation")],
    metrics: [t("首字延迟", "First-token latency"), t("最终结果延迟", "Final-result latency"), t("修订次数", "Revision count"), t("字错率", "Word error rate")],
    checks: [t("先检查增强后音频的清晰度和完整性。", "First check enhanced-audio clarity and completeness."), t("再区分网络传输延迟与模型推理延迟。", "Then distinguish network delay from inference delay."), t("最后检查端点检测和字幕稳定策略。", "Finally check endpoint detection and caption stabilization.")],
    chain: [
      { kind: "capture", label: t("增强后 PCM", "Enhanced PCM") },
      { kind: "recognition", label: t("端点检测 / 流式识别", "Endpointing / streaming recognition") },
      { kind: "recognition", label: t("增量文字 / 字幕稳定", "Incremental text / caption stabilization") },
      { kind: "process", label: t("可选翻译", "Optional translation") },
      { kind: "playback", label: t("字幕界面", "Caption UI") }
    ]
  }
};

const scenarioIds = Object.keys(scenarios) as ScenarioId[];

type SceneFrameProps = {
  name: string;
  description: string;
  arrowId: string;
  riskArrowId: string;
  children: React.ReactNode;
};

function SceneFrame({ name, description, arrowId, riskArrowId, children }: SceneFrameProps) {
  const accessibleId = useId().replace(/:/g, "");
  const titleId = `${accessibleId}-title`;
  const descriptionId = `${accessibleId}-description`;
  return (
    <figure className="meeting-diagram">
      <svg aria-labelledby={titleId} aria-describedby={descriptionId} role="img" viewBox="0 0 980 420" xmlns="http://www.w3.org/2000/svg">
        <title id={titleId}>{name}</title>
        <desc id={descriptionId}>{description}</desc>
        <defs>
          <marker id={arrowId} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4"><path d="M0 0 8 4 0 8Z" fill="#1f7569" /></marker>
          <marker id={riskArrowId} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4"><path d="M0 0 8 4 0 8Z" fill="#b44c6d" /></marker>
        </defs>
        <rect className="meeting-diagram-bg" height="420" rx="18" width="980" />
        {children}
      </svg>
    </figure>
  );
}

function ScenarioScene({ id, language }: { id: ScenarioId; language: Language }) {
  const zh = language === "zh";
  const markerId = useId().replace(/:/g, "");
  const arrowId = `${markerId}-arrow`;
  const riskArrowId = `${markerId}-risk-arrow`;
  const frameProps = { description: scenarios[id].sceneDescription[language], arrowId, riskArrowId };
  if (id === "personal") return (
    <SceneFrame {...frameProps} name={zh ? "个人终端会议场景图" : "Personal device meeting scene diagram"}>
      <text className="meeting-diagram-title" x="44" y="48">{zh ? "内置扬声器与麦克风形成声学回路" : "Built-in speaker and microphone form an acoustic loop"}</text>
      <rect className="meeting-box capture" x="90" y="120" width="250" height="178" rx="12" />
      <text className="meeting-box-title" x="215" y="150" textAnchor="middle">{zh ? "笔记本 / 手机" : "Laptop / phone"}</text>
      <circle cx="170" cy="210" r="34" className="meeting-box process" /><text className="meeting-box-sub" x="170" y="216" textAnchor="middle">{zh ? "本地用户" : "Local user"}</text>
      <rect className="meeting-box playback" x="245" y="184" width="72" height="42" rx="8" /><text className="meeting-box-sub" x="281" y="210" textAnchor="middle">{zh ? "内置扬声器" : "Speaker"}</text>
      <rect className="meeting-box capture" x="245" y="246" width="72" height="36" rx="8" /><text className="meeting-box-sub" x="281" y="269" textAnchor="middle">{zh ? "内置麦克风" : "Mic"}</text>
      <rect className="meeting-box remote" x="700" y="150" width="190" height="120" rx="12" /><text className="meeting-box-title" x="795" y="202" textAnchor="middle">{zh ? "远端参与者" : "Remote participant"}</text><text className="meeting-box-sub" x="795" y="228" textAnchor="middle">{zh ? "听到本地语音" : "Hears local speech"}</text>
      <path className="meeting-arrow" d="M340 206 H690" markerEnd={`url(#${arrowId})`} /><text className="meeting-reference-text" x="515" y="190" textAnchor="middle">{zh ? "会议网络" : "Meeting network"}</text>
      <rect className="meeting-box process" x="500" y="245" width="120" height="54" rx="8" /><text className="meeting-box-title" x="560" y="278" textAnchor="middle">AEC</text>
      <path className="meeting-arrow" d="M317 205 C390 205 415 272 490 272" fill="none" strokeDasharray="7 6" markerEnd={`url(#${arrowId})`} /><text className="meeting-reference-text" x="410" y="236" textAnchor="middle">{zh ? "播放参考 → AEC" : "Render reference → AEC"}</text>
      <path className="meeting-echo-arrow" d="M282 226 C390 350 410 350 282 282" fill="none" markerEnd={`url(#${riskArrowId})`} /><text className="meeting-reference-text" x="445" y="370" textAnchor="middle">{zh ? "扬声器到麦克风的回声路径" : "Speaker-to-mic echo path"}</text>
    </SceneFrame>
  );
  if (id === "room") return (
    <SceneFrame {...frameProps} name={zh ? "多人会议室场景图" : "Meeting room scene diagram"}>
      <text className="meeting-diagram-title" x="44" y="48">{zh ? "波束跟随说话人，反射从多个方向到达阵列" : "Beams follow talkers while reflections reach the array from many directions"}</text>
      <rect className="meeting-box process" x="150" y="105" width="560" height="230" rx="70" />
      {[230, 430, 630].map((x, i) => <g key={x}><circle className="meeting-box capture" cx={x} cy={i === 1 ? 300 : 155} r="28" /><text className="meeting-box-sub" x={x} y={i === 1 ? 305 : 160} textAnchor="middle">{zh ? `参会者 ${i + 1}` : `P${i + 1}`}</text></g>)}
      <circle className="meeting-box capture" cx="430" cy="220" r="42" /><text className="meeting-box-title" x="430" y="216" textAnchor="middle">{zh ? "中央阵列" : "Central array"}</text><text className="meeting-box-sub" x="430" y="237" textAnchor="middle">{zh ? "波束拾音" : "Beam pickup"}</text>
      <path className="meeting-arrow" d="M255 166 Q340 205 390 217" markerEnd={`url(#${arrowId})`} /><path className="meeting-arrow" d="M405 282 L425 265" markerEnd={`url(#${arrowId})`} /><path className="meeting-arrow" d="M605 166 Q520 205 470 217" markerEnd={`url(#${arrowId})`} />
      <rect className="meeting-box playback" x="760" y="105" width="150" height="92" rx="10" /><text className="meeting-box-title" x="835" y="145" textAnchor="middle">{zh ? "远端显示" : "Far-end display"}</text><text className="meeting-box-sub" x="835" y="168" textAnchor="middle">{zh ? "扬声器" : "Speaker"}</text>
      <path className="meeting-echo-arrow" d="M760 170 Q630 70 500 195" fill="none" markerEnd={`url(#${riskArrowId})`} /><path className="meeting-echo-arrow" d="M760 180 Q650 370 475 250" fill="none" strokeDasharray="8 7" markerEnd={`url(#${riskArrowId})`} /><text className="meeting-reference-text" x="735" y="350" textAnchor="middle">{zh ? "墙面与桌面反射" : "Wall and table reflections"}</text>
    </SceneFrame>
  );
  if (id === "network") return (
    <SceneFrame {...frameProps} name={zh ? "弱网会议场景图" : "Poor network meeting scene diagram"}>
      <text className="meeting-diagram-title" x="44" y="48">{zh ? "包到达间隔不均，其中一个包缺失" : "Packets arrive unevenly and one packet is missing"}</text>
      {[80, 150, 235, 340].map((x, i) => <g key={x}><rect className="meeting-box network" x={x} y={i % 2 ? 130 : 105} width="54" height="42" rx="6" /><text className="meeting-box-sub" x={x + 27} y={i % 2 ? 156 : 131} textAnchor="middle">#{i + 1}</text></g>)}
      <rect x="270" y="130" width="54" height="42" rx="6" fill="none" stroke="#b44c6d" strokeDasharray="7 6" /><text className="meeting-reference-text" x="297" y="156" textAnchor="middle">{zh ? "缺失" : "Lost"}</text>
      <text className="meeting-lane-title" x="80" y="205">{zh ? "间隔不均的 RTP 包" : "Uneven RTP packets"}</text>
      {[{ x: 80, w: 190, a: zh ? "RTP 包到达" : "RTP packet arrival", b: zh ? "乱序 / 晚到" : "Reordered / late" }, { x: 310, w: 210, a: zh ? "自适应抖动缓冲" : "Adaptive jitter buffer", b: zh ? "重排 / 调度 / 缓冲延迟" : "Reorder / schedule / delay" }, { x: 560, w: 190, a: zh ? "FEC / PLC 解码决策" : "FEC / PLC decode decision", b: zh ? "恢复或补偿" : "Recover or conceal" }, { x: 790, w: 130, a: zh ? "连续播放" : "Playout", b: zh ? "扬声器输出" : "Speaker output" }].map(({ x, w, a, b }) => <g key={x}><rect className="meeting-box process" x={x} y="245" width={w} height="76" rx="10" /><text className="meeting-box-title" x={x + w / 2} y="276" textAnchor="middle">{a}</text><text className="meeting-box-sub" x={x + w / 2} y="300" textAnchor="middle">{b}</text></g>)}
      <path className="meeting-arrow" d="M270 283 H300" markerEnd={`url(#${arrowId})`} /><path className="meeting-arrow" d="M520 283 H550" markerEnd={`url(#${arrowId})`} /><path className="meeting-arrow" d="M750 283 H780" markerEnd={`url(#${arrowId})`} />
    </SceneFrame>
  );
  return (
    <SceneFrame {...frameProps} name={zh ? "实时字幕会议场景图" : "Live captions meeting scene diagram"}>
      <text className="meeting-diagram-title" x="44" y="48">{zh ? "增强语音保持主链路，同时分支到字幕识别旁路" : "Enhanced speech stays on the main path and branches to caption recognition"}</text>
      <rect className="meeting-box capture" x="60" y="125" width="150" height="68" rx="10" /><text className="meeting-box-title" x="135" y="154" textAnchor="middle">{zh ? "增强后 PCM" : "Enhanced PCM"}</text><text className="meeting-box-sub" x="135" y="176" textAnchor="middle">{zh ? "清晰语音" : "Clean speech"}</text>
      <rect className="meeting-box playback" x="730" y="125" width="170" height="68" rx="10" /><text className="meeting-box-title" x="815" y="165" textAnchor="middle">{zh ? "主会议音频" : "Main meeting audio"}</text><path className="meeting-arrow" d="M210 159 H720" markerEnd={`url(#${arrowId})`} />
      <path className="meeting-echo-arrow" d="M250 159 V260 H315" fill="none" markerEnd={`url(#${riskArrowId})`} /><text className="meeting-reference-text" x="250" y="240">{zh ? "字幕旁路" : "Caption side path"}</text>
      {[{ x: 325, a: zh ? "流式识别" : "Streaming ASR", b: zh ? "增量结果" : "Partial results" }, { x: 515, a: zh ? "可选翻译" : "Optional translation", b: zh ? "可旁路" : "Can bypass" }, { x: 705, a: zh ? "字幕界面" : "Subtitle UI", b: zh ? "稳定出字" : "Stable text" }].map(({ x, a, b }) => <g key={x}><rect className="meeting-box caption" x={x} y="230" width="150" height="82" rx="10" /><text className="meeting-box-title" x={x + 75} y="264" textAnchor="middle">{a}</text><text className="meeting-box-sub" x={x + 75} y="288" textAnchor="middle">{b}</text></g>)}
      <path className="meeting-arrow" d="M475 271 H505" markerEnd={`url(#${arrowId})`} /><path className="meeting-arrow" d="M665 271 H695" markerEnd={`url(#${arrowId})`} />
    </SceneFrame>
  );
}

export function MeetingCommunicationLab({ language, onBack }: MeetingCommunicationLabProps) {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>("personal");
  const scenario = scenarios[activeScenario];

  return (
    <main className="meeting-lab-page" aria-label={language === "zh" ? "会议与通信实验室" : "Conferencing and Communication Lab"}>
      <section className="sound-lab-hero meeting-lab-hero">
        <button className="sound-lab-back" type="button" onClick={onBack}><ArrowLeft size={18} aria-hidden="true" />{language === "zh" ? "返回知识库" : "Back to knowledge base"}</button>
        <div><span className="details-category">{language === "zh" ? "应用场景" : "Applications"}</span><h1>{language === "zh" ? "会议与通信实验室" : "Conferencing and Communication Lab"}</h1><p>{language === "zh" ? "选择真实会议场景，观察用户体验、音频链路和工程排查重点如何同步变化。" : "Choose a real meeting scenario and see the user experience, audio chain, and engineering checks change together."}</p></div>
      </section>

      <section className="meeting-module-section" aria-label={language === "zh" ? "会议场景选择" : "Meeting scenario selection"}>
        <div className="meeting-module-grid">
          {scenarioIds.map((id) => <button className="meeting-module-card" type="button" key={id} aria-pressed={activeScenario === id} onClick={() => setActiveScenario(id)}>{scenarios[id].label[language]}</button>)}
        </div>
      </section>

      <section className="meeting-diagram-section" aria-label={scenario.title[language]}>
        <div className="meeting-section-heading"><span>{language === "zh" ? "当前场景" : "Current scenario"}</span><h2>{scenario.title[language]}</h2></div>
        <ScenarioScene id={activeScenario} language={language} />
      </section>

      <section className="meeting-issue-section" aria-label={language === "zh" ? "当前体验" : "Current experience"}>
        <div className="meeting-section-heading"><span>{language === "zh" ? "用户视角" : "User view"}</span><h2>{language === "zh" ? "当前体验" : "Current experience"}</h2></div>
        <div className="meeting-issue-grid">
          <article className="meeting-issue-card"><h3>{language === "zh" ? "用户正在做什么" : "What the user is doing"}</h3><p>{scenario.action[language]}</p></article>
          <article className="meeting-issue-card"><h3>{language === "zh" ? "正常体验" : "Expected experience"}</h3><p>{scenario.expected[language]}</p></article>
          <article className="meeting-issue-card"><h3>{language === "zh" ? "主要风险" : "Main risk"}</h3><p>{scenario.risk[language]}</p></article>
        </div>
      </section>

      <section className="meeting-module-section" aria-label={language === "zh" ? "场景链路" : "Scenario chain"}>
        <div className="meeting-section-heading"><span>{language === "zh" ? "信号流" : "Signal flow"}</span><h2>{language === "zh" ? "场景链路" : "Scenario chain"}</h2></div>
        <div className="meeting-module-grid">{scenario.chain.map((node, index) => <article className={`meeting-module-card ${node.kind}`} key={`${node.kind}-${node.label.en}`}><span>{index + 1}</span><h3>{node.label[language]}</h3></article>)}</div>
      </section>

      <section className="meeting-issue-section" aria-label={language === "zh" ? "工程信息" : "Engineering information"}>
        <div className="meeting-section-heading"><span>{language === "zh" ? "工程视角" : "Engineering view"}</span><h2>{language === "zh" ? "工程信息" : "Engineering information"}</h2></div>
        <div className="meeting-issue-grid">
          <article className="meeting-issue-card"><h3>{language === "zh" ? "关键模块" : "Key modules"}</h3><ul>{scenario.modules.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></article>
          <article className="meeting-issue-card"><h3>{language === "zh" ? "可观察指标" : "Observable metrics"}</h3><ul>{scenario.metrics.map((item) => <li key={item.en}>{item[language]}</li>)}</ul></article>
          <article className="meeting-issue-card"><h3>{language === "zh" ? "排查顺序" : "Troubleshooting order"}</h3><ol>{scenario.checks.map((item) => <li key={item.en}>{item[language]}</li>)}</ol></article>
        </div>
      </section>
    </main>
  );
}
