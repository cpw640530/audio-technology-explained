import { useId, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Language } from "../content/knowledge";

type AutomotiveAudioLabProps = {
  language: Language;
  onBack: () => void;
};

type LocalizedText = Record<Language, string>;

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
    label: { zh: "整车布局", en: "Whole-car layout" },
    heading: { zh: "整车声学布局", en: "Whole-vehicle acoustic layout" },
    goal: {
      zh: "在拾音距离、声像方向、控制稳定性和成本之间安排麦克风、扬声器与传感器。",
      en: "Place microphones, speakers, and sensors to balance pickup distance, image direction, control stability, and cost."
    },
    chain: {
      zh: "乘员 / 噪声源 -> 麦克风与传感器 -> DSP / 功放 -> 扬声器 -> 乘员耳位",
      en: "Occupants / noise sources -> microphones and sensors -> DSP / amplifier -> speakers -> occupant listening positions"
    },
    limit: {
      zh: "实际数量和位置受车身反射、内饰、座位、功耗与车型成本约束。",
      en: "Actual counts and positions are constrained by body reflections, trim, seating, power, and vehicle cost."
    },
    example: {
      zh: "顶灯阵列负责远场拾音，A 柱高音与门板扬声器塑造前方声像，后备厢低音炮补充低频。",
      en: "A roof array captures far-field speech, A-pillar tweeters and door speakers shape the front image, and a rear subwoofer extends bass."
    }
  },
  voice: {
    label: { zh: "语音交互", en: "Voice interaction" },
    heading: { zh: "从一句话到车辆动作", en: "From an utterance to a vehicle action" },
    goal: {
      zh: "在音乐、路噪和多人说话中可靠识别驾驶员指令，并给出可感知的车辆反馈。",
      en: "Reliably recognize the driver's command amid playback, road noise, and competing talkers, then provide perceptible vehicle feedback."
    },
    chain: {
      zh: "说话人 -> 顶灯麦阵 -> AEC / 降噪 / 波束形成 -> 唤醒 / ASR -> 意图理解与安全策略 -> 获准的车辆控制 / 语音反馈",
      en: "Talker -> roof array -> AEC / denoising / beamforming -> wake / ASR -> intent understanding and safety policy -> permitted vehicle control / voice response"
    },
    limit: {
      zh: "必须结合车速、驾驶状态、座位权限和安全策略，避免乘客或回放声音触发不安全或未授权控制。",
      en: "Vehicle speed, driving state, seat permission, and safety policy must be considered so passengers or playback cannot trigger unsafe or unauthorized control."
    },
    example: {
      zh: "驾驶员说“打开主驾车窗”，系统确认声源在主驾后执行动作并播报结果。",
      en: "When the driver says “open my window,” the system confirms the driver seat, performs the action, and announces the result."
    }
  },
  localization: {
    label: { zh: "声源定位", en: "Source localization" },
    heading: { zh: "用到达时间差判断说话座位", en: "Use time differences to identify the speaking seat" },
    goal: {
      zh: "利用同步多麦估计声源方向和座位，为唤醒、分区识别与车辆控制提供归属信息。",
      en: "Use synchronized microphones to estimate source direction and seat ownership for wake-up, zoned recognition, and vehicle control."
    },
    chain: { zh: "Δt = d sin(θ) / c", en: "Δt = d sin(θ) / c" },
    limit: {
      zh: "定位负责判断方向，波束形成负责增强目标方向；强反射、通道延迟和多人重叠会降低稳定性。",
      en: "Localization estimates direction, while beamforming enhances the target direction; strong reflections, channel delay, and overlapping talkers reduce stability."
    },
    example: {
      zh: "同一句“调高温度”来自主驾或副驾时，系统只调整对应温区。",
      en: "The same “raise the temperature” request adjusts the corresponding climate zone depending on whether it came from the driver or passenger."
    }
  },
  spatial: {
    label: { zh: "空间音频", en: "Spatial audio" },
    heading: { zh: "让每类声音出现在合适方向", en: "Place each sound in an appropriate direction" },
    goal: {
      zh: "通过扬声器布局、延迟、EQ、相位和座位补偿，把音乐、导航、告警与助手反馈放到清晰方向。",
      en: "Use speaker layout, delay, EQ, phase, and seat compensation to place music, navigation, alerts, and assistant feedback clearly."
    },
    chain: {
      zh: "音源分类 -> 安全优先级 -> 声像与座位渲染 -> 多扬声器回放",
      en: "Source classification -> safety priority -> image and seat rendering -> multi-speaker playback"
    },
    limit: {
      zh: "安全告警优先于娱乐声场，导航提示也不应被音乐声像掩蔽。",
      en: "Safety alerts take priority over entertainment imaging, and navigation prompts must not be masked by music."
    },
    example: {
      zh: "右转导航提示偏向右前方，碰撞告警保持强可辨识度，音乐维持宽阔前方声场。",
      en: "A right-turn prompt appears front-right, a collision alert remains unmistakable, and music retains a broad frontal stage."
    }
  },
  anc: {
    label: { zh: "ANC / RNC", en: "ANC / RNC" },
    heading: { zh: "用闭环控制削弱稳定低频噪声", en: "Reduce steady low-frequency noise with closed-loop control" },
    goal: {
      zh: "利用路面或动力系统参考信号预测稳定低频噪声，并在乘员耳位附近减小残余声压。",
      en: "Use road or powertrain reference signals to predict steady low-frequency noise and reduce residual pressure near occupant ears."
    },
    chain: {
      zh: "参考信号 -> ANC 控制器 -> 扬声器反相信号 -> 座舱残余噪声 -> 误差麦反馈",
      en: "Reference signal -> ANC controller -> anti-noise from speakers -> residual cabin noise -> error-microphone feedback"
    },
    limit: {
      zh: "适用于稳定、可预测的低频噪声，不应以人声、安全告警或高频瞬态声为消除目标；相位或延迟错误可能放大噪声。",
      en: "It suits stable, predictable low-frequency noise and must not target speech, safety alerts, or high-frequency transients; phase or delay errors can amplify noise."
    },
    example: {
      zh: "轮速或悬架传感器提供路噪参考，门板扬声器输出反相信号，误差麦持续修正控制器。",
      en: "Wheel-speed or suspension sensors provide a road-noise reference, door speakers emit anti-noise, and error microphones continuously adapt the controller."
    }
  }
};

const moduleOrder = Object.keys(automotiveModules) as AutomotiveModule[];

function AutomotiveCabinDiagram({ activeModule, language }: { activeModule: AutomotiveModule; language: Language }) {
  const arrowMarkerId = useId();
  const voiceArrowMarkerId = useId();
  const t = (zh: string, en: string) => (language === "zh" ? zh : en);

  return (
    <figure className="automotive-diagram">
      <div
        aria-label={t("可水平滚动的座舱部件图", "Horizontally scrollable cabin component diagram")}
        className="automotive-diagram-scroll"
        role="region"
        tabIndex={0}
      >
        <svg
          aria-label={t("车载声学座舱部件位置图", "In-car acoustics cabin component layout diagram")}
          data-active-module={activeModule}
          role="img"
          viewBox="0 0 980 600"
          xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
          <marker id={arrowMarkerId} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
            <path d="M0 0 8 4 0 8Z" fill="#1f7569" />
          </marker>
          <marker id={voiceArrowMarkerId} markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
            <path d="M0 0 8 4 0 8Z" fill="#b44c6d" />
          </marker>
        </defs>
        <rect className="auto-diagram-bg" height="600" rx="18" width="980" />

        <g className="auto-car">
          <text className="auto-orientation-label" x="490" y="28" textAnchor="middle">{t("车头", "Front")}</text>
          <text className="auto-orientation-label" x="490" y="584" textAnchor="middle">{t("车尾", "Rear")}</text>
          <rect className="auto-external-wheel" height="102" rx="16" width="28" x="260" y="126" />
          <rect className="auto-external-wheel" height="102" rx="16" width="28" x="692" y="126" />
          <rect className="auto-external-wheel" height="102" rx="16" width="28" x="260" y="404" />
          <rect className="auto-external-wheel" height="102" rx="16" width="28" x="692" y="404" />
          <path className="auto-body" d="M350 48 C314 60 294 96 294 152 L294 472 C294 528 328 558 382 566 L598 566 C652 558 686 528 686 472 L686 152 C686 96 666 60 630 48 C570 30 410 30 350 48Z" />
          <path className="auto-window auto-windshield-front" d="M350 96 Q490 62 630 96 L610 168 Q490 146 370 168Z" />
          <path className="auto-window auto-windshield-rear" d="M370 474 Q490 496 610 474 L626 526 Q490 550 354 526Z" />
          <path className="auto-door-seam" d="M304 188 H676 M304 356 H676 M490 180 V478" />
          <rect className="auto-console" height="212" rx="16" width="42" x="469" y="214" />
          <circle className="auto-steering-wheel" cx="386" cy="192" r="25" />
          <circle className="auto-steering-hub" cx="386" cy="192" r="7" />

          {[
            { x: 344, y: 228, label: t("主驾", "Driver") },
            { x: 536, y: 228, label: t("副驾", "Passenger") },
            { x: 344, y: 380, label: t("后左", "Rear left") },
            { x: 536, y: 380, label: t("后右", "Rear right") }
          ].map((seat) => (
            <g className="auto-seat" key={seat.label}>
              <rect className="auto-seat-back" height="68" rx="16" width="94" x={seat.x} y={seat.y} />
              <rect className="auto-seat-base" height="38" rx="14" width="108" x={seat.x - 7} y={seat.y + 58} />
              <text className="auto-seat-label" textAnchor="middle" x={seat.x + 47} y={seat.y + 83}>{seat.label}</text>
            </g>
          ))}

          <g aria-label={t("顶灯麦克风阵列", "Roof microphone array")}>
            {[466, 482, 498, 514].map((x) => <circle className="auto-mic roof" cx={x} cy="186" key={x} r="6" />)}
          </g>
          <text className="auto-component-text" x="490" y="177" textAnchor="middle">{t("顶灯麦克风阵列", "Roof mic array")}</text>
          <circle className="auto-error-mic" cx="414" cy="330" r="7" />
          <circle className="auto-error-mic" cx="566" cy="330" r="7" />
          <text className="auto-component-text" x="490" y="346" textAnchor="middle">{t("ANC 误差麦", "ANC error mics")}</text>
          <circle className="auto-speaker pillar" cx="326" cy="176" r="10" />
          <circle className="auto-speaker pillar" cx="654" cy="176" r="10" />
          <circle className="auto-speaker dash" cx="490" cy="156" r="12" />
          <text className="auto-component-text" x="490" y="145" textAnchor="middle">{t("中置扬声器", "Center speaker")}</text>
          {[242, 420].flatMap((y) => [318, 662].map((x) => <circle className="auto-speaker door" cx={x} cy={y} key={`${x}-${y}`} r="12" />))}
          <text className="auto-component-text" x="735" y="248">{t("门板扬声器", "Door speakers")}</text>
          <path className="auto-component-line speaker-line" d="M724 244 L674 242" />
          <circle className="auto-subwoofer" cx="490" cy="520" r="18" />
          <text className="auto-component-text" x="518" y="526">{t("后置低音炮", "Rear subwoofer")}</text>
        </g>

        {activeModule === "layout" && (
          <g data-module="layout">
            <rect className="auto-chip" height="48" rx="12" width="174" x="30" y="74" />
            <text className="auto-chip-text" x="117" y="95" textAnchor="middle">{t("前方扬声器区", "Front speaker zone")}</text>
            <text className="auto-panel-copy" x="117" y="115" textAnchor="middle">{t("A 柱 + 中置 + 前门", "A-pillars + center + front doors")}</text>
            <rect className="auto-chip" height="34" rx="12" width="174" x="30" y="148" />
            <text className="auto-chip-text" x="117" y="171" textAnchor="middle">{t("拾音：顶灯麦阵", "Pickup: roof mic array")}</text>
            <path className="auto-component-line mic-line" d="M204 165 L458 184" />
            <rect className="auto-chip" height="48" rx="12" width="174" x="776" y="474" />
            <text className="auto-chip-text" x="863" y="495" textAnchor="middle">{t("后方扬声器区", "Rear speaker zone")}</text>
            <text className="auto-panel-copy" x="863" y="515" textAnchor="middle">{t("后门 + 低音炮", "Rear doors + subwoofer")}</text>
            <rect className="auto-chip" height="34" rx="12" width="174" x="776" y="390" />
            <text className="auto-chip-text" x="863" y="413" textAnchor="middle">{t("反馈：ANC 误差麦", "Feedback: ANC error mics")}</text>
            <path className="auto-component-line anc-line" d="M776 407 L578 336" />
            <rect className="auto-noise-chip" height="34" rx="12" width="108" x="58" y="246" />
            <text className="auto-noise-text" x="112" y="269" textAnchor="middle">{t("路噪 / 胎噪", "Road / tire")}</text>
            <rect className="auto-noise-chip" height="34" rx="12" width="108" x="814" y="246" />
            <text className="auto-noise-text" x="868" y="269" textAnchor="middle">{t("空调噪声", "HVAC noise")}</text>
            <rect className="auto-noise-chip" height="34" rx="12" width="108" x="814" y="302" />
            <text className="auto-noise-text" x="868" y="325" textAnchor="middle">{t("音乐回放", "Music playback")}</text>
          </g>
        )}

        {activeModule === "voice" && (
          <g data-module="voice">
          <circle className="auto-talker" cx="386" cy="250" r="16" />
          <path className="auto-voice-arrow" d="M402 244 Q438 204 466 190" markerEnd={`url(#${voiceArrowMarkerId})`} />
          <rect className="auto-assistant-panel" height="116" rx="12" width="224" x="24" y="72" />
          <text className="auto-panel-title" x="136" y="101" textAnchor="middle">{t("助手处理", "Assistant processing")}</text>
          <text className="auto-panel-copy" x="136" y="127" textAnchor="middle">{t("回声与噪声预处理", "Echo and noise preprocessing")}</text>
          <text className="auto-panel-copy" x="136" y="152" textAnchor="middle">{t("唤醒 / ASR -> 意图 / 安全策略", "Wake / ASR -> intent / safety policy")}</text>
          <path className="auto-voice-arrow" d="M466 186 Q330 108 248 126" markerEnd={`url(#${voiceArrowMarkerId})`} />
          <rect className="auto-chip" height="54" rx="12" width="190" x="766" y="88" />
          <text className="auto-chip-text" x="861" y="111" textAnchor="middle">{t("车辆响应", "Vehicle response")}</text>
          <text className="auto-panel-copy" x="861" y="132" textAnchor="middle">{t("获准控制 + 语音反馈", "Permitted control + voice reply")}</text>
          <path className="auto-voice-arrow" d="M248 146 Q566 54 766 112" markerEnd={`url(#${voiceArrowMarkerId})`} />
          </g>
        )}

        {activeModule === "localization" && (
          <g data-module="localization">
          {[466, 482, 498, 514].map((x, index) => (
            <path className="auto-localization-beam" d={`M386 250 Q${420 + index * 14} ${210 - index * 4} ${x} 186`} key={x} markerEnd={`url(#${arrowMarkerId})`} />
          ))}
          <circle className="auto-target-seat" cx="391" cy="272" r="62" />
          <rect className="auto-chip localization" height="104" rx="12" width="220" x="24" y="254" />
          <text className="auto-panel-title" x="134" y="284" textAnchor="middle">{t("多麦时间差", "Multi-mic time differences")}</text>
          <text className="auto-panel-copy" x="134" y="312" textAnchor="middle">Δt1 · Δt2 · Δt3</text>
          <text className="auto-panel-copy" x="134" y="340" textAnchor="middle">{t("TDOA 阵列几何", "TDOA array geometry")}</text>
          <path className="auto-arrow" d="M244 306 Q302 286 330 276" markerEnd={`url(#${arrowMarkerId})`} />
          </g>
        )}

        {activeModule === "spatial" && (
          <g data-module="spatial">
          <path className="auto-spatial-ring" d="M326 176 Q490 84 654 176" />
          <path className="auto-spatial-ring" d="M318 242 Q490 330 662 242" />
          <path className="auto-spatial-ring" d="M318 420 Q490 514 662 420" />
          <path className="auto-spatial-ring" d="M490 156 Q610 206 662 242" markerEnd={`url(#${arrowMarkerId})`} />
          <rect className="auto-spatial-panel" height="132" rx="12" width="224" x="732" y="294" />
          <text className="auto-panel-title" x="844" y="324" textAnchor="middle">{t("声源方向", "Source directions")}</text>
          <text className="auto-panel-copy" x="844" y="352" textAnchor="middle">{t("音乐：前方宽声场", "Music: wide front stage")}</text>
          <text className="auto-panel-copy" x="844" y="378" textAnchor="middle">{t("导航：右前方", "Navigation: front-right")}</text>
          <text className="auto-panel-copy" x="844" y="404" textAnchor="middle">{t("告警：最高优先级", "Alert: highest priority")}</text>
          </g>
        )}

        {activeModule === "anc" && (
          <g data-module="anc">
          <rect className="auto-noise-chip" height="52" rx="12" width="184" x="22" y="442" />
          <text className="auto-panel-title" x="114" y="464" textAnchor="middle">{t("轮胎 / 路面参考", "Tire / road reference")}</text>
          <text className="auto-panel-copy" x="114" y="484" textAnchor="middle">{t("轮速 · 悬架传感器", "wheel · suspension sensors")}</text>
          <rect className="auto-anc-panel" height="58" rx="12" width="182" x="24" y="512" />
          <text className="auto-panel-title" x="115" y="547" textAnchor="middle">{t("ANC 控制器", "ANC controller")}</text>
          <path className="auto-anc-wave" d="M206 468 Q250 452 270 432" markerEnd={`url(#${arrowMarkerId})`} />
          <path className="auto-anc-wave inverse" d="M206 540 Q282 548 318 420" markerEnd={`url(#${arrowMarkerId})`} />
          <path className="auto-anc-wave inverse" d="M206 540 Q566 584 662 420" markerEnd={`url(#${arrowMarkerId})`} />
          <rect className="auto-anc-panel" height="82" rx="12" width="220" x="736" y="476" />
          <text className="auto-panel-title" x="846" y="506" textAnchor="middle">{t("闭环反馈", "Closed-loop feedback")}</text>
          <text className="auto-panel-copy" x="846" y="532" textAnchor="middle">{t("残余噪声 -> 误差麦", "Residual noise -> error mics")}</text>
          <path className="auto-anc-wave" d="M736 518 Q628 392 566 330" markerEnd={`url(#${arrowMarkerId})`} />
          <path className="auto-anc-wave" d="M566 330 Q660 410 736 540" markerEnd={`url(#${arrowMarkerId})`} />
          </g>
        )}
        </svg>
      </div>
      <figcaption>
        {t(
          "选择模块，观察麦克风、扬声器与控制链路如何在同一座舱中协同。",
          "Select a module to see how microphones, speakers, and control paths work together in one cabin."
        )}
      </figcaption>
    </figure>
  );
}

export function AutomotiveAudioLab({ language, onBack }: AutomotiveAudioLabProps) {
  const [activeModule, setActiveModule] = useState<AutomotiveModule>("layout");
  const activeContent = automotiveModules[activeModule];

  return (
    <main className="automotive-lab-page" aria-label={language === "zh" ? "车载声学实验室" : "In-Car Acoustics Lab"}>
      <section className="sound-lab-hero automotive-lab-hero">
        <button className="sound-lab-back" type="button" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" />
          {language === "zh" ? "返回知识库" : "Back to knowledge base"}
        </button>
        <div>
          <span className="details-category">{language === "zh" ? "应用场景" : "Applications"}</span>
          <h1>{language === "zh" ? "车载声学实验室" : "In-Car Acoustics Lab"}</h1>
          <p>
            {language === "zh"
              ? "用一张俯视整车图理解麦克风与扬声器布局，以及语音、定位、空间音频和主动降噪之间的协作。"
              : "Use one top-down vehicle diagram to understand microphone and speaker placement and how voice, localization, spatial audio, and active noise control work together."}
          </p>
        </div>
      </section>

      <section className="automotive-diagram-section" aria-label={language === "zh" ? "车载声学座舱部件位置" : "In-car acoustics cabin component layout"}>
        <div className="automotive-module-controls" aria-label={language === "zh" ? "座舱模块" : "Cabin modules"} role="group">
          {moduleOrder.map((module) => (
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

        <article className="automotive-module-panel" aria-live="polite">
          <h2>{activeContent.heading[language]}</h2>
          <dl>
            {[
              { label: { zh: "工作目标", en: "Goal" }, value: activeContent.goal },
              { label: { zh: "处理链路", en: "Processing chain" }, value: activeContent.chain },
              { label: { zh: "关键限制", en: "Key limit" }, value: activeContent.limit },
              { label: { zh: "实际例子", en: "Example" }, value: activeContent.example }
            ].map((row) => (
              <div key={row.label.en}>
                <dt>{row.label[language]}</dt>
                <dd>{row.value[language]}</dd>
              </div>
            ))}
          </dl>
        </article>
      </section>
    </main>
  );
}
