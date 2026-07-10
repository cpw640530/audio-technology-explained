import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Language } from "../content/knowledge";

type CoreSignalProcessingLabProps = {
  language: Language;
  onBack: () => void;
};

type SignalMode = "stft" | "filter" | "dynamics";
type FilterType = "lowpass" | "highpass" | "bandpass" | "notch";
type FlowStep = {
  label: Record<Language, string>;
  detail: Record<Language, string>;
};
type ProcessingStage = {
  label: Record<Language, string>;
  detail: Record<Language, string>;
  role?: SignalMode;
};
type ProcessingRole = {
  title: Record<Language, string>;
  stage: Record<Language, string>;
  summary: Record<Language, string>;
};

const modeLabels: Record<SignalMode, Record<Language, string>> = {
  stft: { zh: "FFT / STFT", en: "FFT / STFT" },
  filter: { zh: "滤波器 / EQ", en: "Filters / EQ" },
  dynamics: { zh: "动态处理", en: "Dynamics" }
};

const filterLabels: Record<FilterType, Record<Language, string>> = {
  lowpass: { zh: "低通", en: "Low-pass" },
  highpass: { zh: "高通", en: "High-pass" },
  bandpass: { zh: "带通", en: "Band-pass" },
  notch: { zh: "陷波", en: "Notch" }
};

const flowSteps: Record<SignalMode, FlowStep[]> = {
  stft: [
    {
      label: { zh: "输入 PCM", en: "Input PCM" },
      detail: { zh: "连续采样值", en: "Continuous samples" }
    },
    {
      label: { zh: "分帧/加窗", en: "Frame/window" },
      detail: { zh: "窗口长度和 hop 决定取多少样本", en: "Window and hop decide sample grouping" }
    },
    {
      label: { zh: "FFT", en: "FFT" },
      detail: { zh: "每帧从时间域转到频率域", en: "Each frame moves from time to frequency" }
    },
    {
      label: { zh: "频谱/特征", en: "Spectrum/features" },
      detail: { zh: "得到频率格、能量和特征", en: "Frequency bins, energy, and features" }
    }
  ],
  filter: [
    {
      label: { zh: "输入频谱", en: "Input spectrum" },
      detail: { zh: "原始各频段能量", en: "Original band energy" }
    },
    {
      label: { zh: "选择滤波器", en: "Select filter" },
      detail: { zh: "低通、高通、带通或陷波", en: "Low-pass, high-pass, band-pass, or notch" }
    },
    {
      label: { zh: "频率响应", en: "Response" },
      detail: { zh: "cutoff、Q、gain 决定曲线", en: "Cutoff, Q, and gain shape the curve" }
    },
    {
      label: { zh: "输出频谱", en: "Output spectrum" },
      detail: { zh: "频段能量被保留或削弱", en: "Band energy is kept or reduced" }
    }
  ],
  dynamics: [
    {
      label: { zh: "输入数字电平", en: "Digital input level" },
      detail: { zh: "PCM 样本包络换算成 dBFS", en: "PCM envelope mapped to dBFS" }
    },
    {
      label: { zh: "电平检测", en: "Level detector" },
      detail: { zh: "和 threshold 比较", en: "Compare with threshold" }
    },
    {
      label: { zh: "增益计算", en: "Gain computer" },
      detail: { zh: "超过阈值后按 ratio 降增益", en: "Reduce gain above threshold by ratio" }
    },
    {
      label: { zh: "输出电平", en: "Output level" },
      detail: { zh: "峰值和动态范围变小", en: "Peaks and dynamic range shrink" }
    }
  ]
};

const processingStages: ProcessingStage[] = [
  {
    label: { zh: "输入源", en: "Source" },
    detail: { zh: "麦克风采集或文件/网络解码", en: "Mic capture or file/network decode" }
  },
  {
    label: { zh: "PCM 音频", en: "PCM audio" },
    detail: { zh: "已采样、量化的时域数据", en: "Sampled time-domain data" }
  },
  {
    label: { zh: "FFT / STFT", en: "FFT / STFT" },
    detail: { zh: "分析频谱、做特征或频域处理", en: "Spectrum analysis, features, or frequency-domain processing" },
    role: "stft"
  },
  {
    label: { zh: "EQ / 滤波", en: "EQ / filter" },
    detail: { zh: "改变不同频段能量", en: "Reshape energy by frequency band" },
    role: "filter"
  },
  {
    label: { zh: "动态处理", en: "Dynamics" },
    detail: { zh: "根据电平包络改变增益", en: "Change gain from the level envelope" },
    role: "dynamics"
  },
  {
    label: { zh: "输出去向", en: "Output" },
    detail: { zh: "编码、混音、DAC 或播放", en: "Encode, mix, DAC, or playback" }
  }
];

const processingRoles: Record<SignalMode, ProcessingRole> = {
  stft: {
    title: { zh: "FFT / STFT：主要是分析和变换域入口", en: "FFT / STFT: analysis and transform-domain entry" },
    stage: {
      zh: "常放在 PCM 之后：实时语音里用于语音增强、降噪、回声消除特征；音乐/工具里用于频谱显示、频域滤波或特征提取。",
      en: "Usually after PCM exists: in real-time voice it feeds enhancement, denoise, and AEC features; in tools it powers spectrum displays, frequency-domain filtering, or feature extraction."
    },
    summary: {
      zh: "FFT 把一帧 PCM 从时间域转成频率能量；STFT 是连续分帧后反复做 FFT，得到随时间变化的能量图。它本身通常不直接改善声音，后面接滤波、估计、增强或特征算法才会改变结果。",
      en: "FFT converts one PCM frame from time to frequency energy; STFT repeats FFT over frames to show energy over time. By itself it mostly analyzes; filtering, estimation, enhancement, or feature algorithms change the result."
    }
  },
  filter: {
    title: { zh: "EQ / 滤波：主要是频段能量塑形", en: "EQ / filtering: frequency-band shaping" },
    stage: {
      zh: "通常放在 PCM 处理链中间：可以在录音后修正人声和设备频响，也可以在播放前做音色、响度或扬声器校正。",
      en: "Usually in the middle of a PCM chain: after capture for voice/device correction, or before playback for tone, loudness, or speaker correction."
    },
    summary: {
      zh: "滤波器按频率保留或削弱信号；参数 EQ 用中心频率、增益和 Q 控制某一段频率。它改变的是频段能量，也可能带来相位、延迟或振铃等副作用。",
      en: "Filters keep or attenuate signal by frequency; parametric EQ uses center frequency, gain, and Q to control a band. It reshapes frequency energy and can also introduce phase shift, delay, or ringing."
    }
  },
  dynamics: {
    title: { zh: "动态处理：主要是电平和峰值控制", en: "Dynamics: level and peak control" },
    stage: {
      zh: "通常放在降噪/EQ 之后、编码或 DAC 之前；语音链路里常见 AGC/压缩，播放链路里常见 DRC、limiter 和扬声器保护。",
      en: "Usually after denoise/EQ and before encoding or DAC; voice chains often use AGC/compression, while playback chains use DRC, limiting, and speaker protection."
    },
    summary: {
      zh: "动态处理先检测电平包络，再按 threshold、ratio、attack、release 改变增益。它不是 MP3/AAC 这类编码压缩，而是把忽大忽小、瞬态峰值或过载风险控制住。",
      en: "Dynamics first detects the level envelope, then changes gain using threshold, ratio, attack, and release. It is not MP3/AAC codec compression; it controls level swings, transient peaks, or overload risk."
    }
  }
};

const sampleRate = 16000;
const stftInputComponents = [
  { amplitude: 0.62, cycles: 2.2, phase: 0 },
  { amplitude: 0.28, cycles: 7.4, phase: 0.55 },
  { amplitude: 0.16, cycles: 17.6, phase: 1.15 }
] as const;
const filterWaveComponents = [
  { amplitude: 0.72, cycles: 2.2, frequency: 300, phase: 0 },
  { amplitude: 0.34, cycles: 7.5, frequency: 1600, phase: 0.45 },
  { amplitude: 0.22, cycles: 22, frequency: 5200, phase: 1.1 }
] as const;
const filterOutputBands = [
  { baseHeight: 42, frequency: 250 },
  { baseHeight: 66, frequency: 700 },
  { baseHeight: 82, frequency: 1600 },
  { baseHeight: 70, frequency: null },
  { baseHeight: 58, frequency: 3600 },
  { baseHeight: 36, frequency: 6500 }
] as const;

function formatDb(value: number) {
  return `${value > 0 ? "+" : ""}${value} dB`;
}

function formatDbValue(value: number) {
  const rounded = Math.round(value * 10) / 10;
  const text = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);

  return `${rounded > 0 ? "+" : ""}${text} dB`;
}

function formatDbfs(value: number) {
  const rounded = Math.round(value * 10) / 10;
  const text = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);

  return `${text} dBFS`;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function createFrameEnvelopePath(windowSize: number, originX = 84, originY = 158, maxWidth = 230, amplitude = 44) {
  const frameWidth = Math.max(maxWidth * 0.45, Math.min(maxWidth, (windowSize / 1024) * maxWidth));
  const points = Array.from({ length: 80 }, (_, index) => {
    const ratio = index / 79;
    const x = originX + ratio * frameWidth;
    const envelope = 0.5 - 0.5 * Math.cos(2 * Math.PI * ratio);
    const carrier = Math.sin(ratio * Math.PI * 10);
    const y = originY - carrier * envelope * amplitude;
    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  });

  return points.join(" ");
}

function createStftInputValue(ratio: number) {
  return stftInputComponents.reduce(
    (sum, component) =>
      sum + Math.sin(ratio * Math.PI * component.cycles + component.phase) * component.amplitude,
    0
  );
}

function createPcmSamples(originX = 44, originY = 226, width = 152, amplitude = 40) {
  return Array.from({ length: 25 }, (_, index) => {
    const ratio = index / 24;
    const x = originX + ratio * width;
    const value = createStftInputValue(ratio);
    const y = originY - value * amplitude;

    return { x, y };
  });
}

function createSpectrumBars(windowSize: number) {
  const windowFactor = Math.min(1, Math.max(0, (windowSize - 256) / 768));
  const count = Math.round(10 + windowFactor * 12);

  return Array.from({ length: count }, (_, index) => {
    const ratio = count === 1 ? 0 : index / (count - 1);
    const peakWidth = 0.018 + (1 - windowFactor) * 0.035;
    const lowBand = Math.exp(-((ratio - 0.24) ** 2) / peakWidth) * 94;
    const midBand = Math.exp(-((ratio - 0.55) ** 2) / (peakWidth * 1.25)) * 54;
    const highBand = Math.exp(-((ratio - 0.78) ** 2) / (peakWidth * 0.9)) * 32;
    const floor = 10 + Math.sin(index * 1.7) * 4;
    const height = Math.max(9, Math.min(104, lowBand + midBand + highBand + floor));

    return { height };
  });
}

function createFeatureVectorBars(windowSize: number) {
  const windowFactor = Math.min(1, Math.max(0, (windowSize - 256) / 768));
  const baseValues = [0.72, 0.92, 0.66, 0.48, 0.58, 0.76, 0.42, 0.34, 0.28];

  return baseValues.map((value, index) => ({
    height: 10 + value * 38 + Math.sin(index * 1.4 + windowFactor * 2.2) * 5
  }));
}

function getStftGridShape(windowSize: number, hopSize: number) {
  const windowFactor = Math.min(1, Math.max(0, (windowSize - 256) / 768));
  const hopDensity = Math.min(1, Math.max(0, (512 - hopSize) / 384));

  return {
    columns: Math.round(10 + hopDensity * 26),
    rows: Math.round(8 + windowFactor * 8)
  };
}

function mixColor(start: [number, number, number], end: [number, number, number], ratio: number) {
  const clamped = Math.max(0, Math.min(1, ratio));

  return start.map((value, index) => Math.round(value + (end[index] - value) * clamped));
}

function energyColor(value: number) {
  const clamped = Math.max(0, Math.min(1, value));
  const stops: Array<{ color: [number, number, number]; stop: number }> = [
    { stop: 0, color: [19, 29, 50] },
    { stop: 0.28, color: [31, 88, 125] },
    { stop: 0.52, color: [43, 171, 147] },
    { stop: 0.76, color: [246, 197, 87] },
    { stop: 1, color: [235, 92, 72] }
  ];
  const nextIndex = Math.max(1, stops.findIndex((item) => clamped <= item.stop));
  const previous = stops[nextIndex - 1];
  const next = stops[nextIndex];
  const ratio = (clamped - previous.stop) / (next.stop - previous.stop);
  const [red, green, blue] = mixColor(previous.color, next.color, ratio);

  return `rgb(${red}, ${green}, ${blue})`;
}

function createSpectrogramCells(windowSize: number, hopSize: number) {
  const { columns, rows } = getStftGridShape(windowSize, hopSize);
  const windowFactor = Math.min(1, Math.max(0, (windowSize - 512) / 512));
  const spectralSpread = 0.02 + (1 - windowFactor) * 0.02;

  return Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const time = column / (columns - 1);
    const freq = 1 - row / (rows - 1);
    const fundamental = Math.exp(-((freq - (0.22 + Math.sin(time * Math.PI * 1.5) * 0.04)) ** 2) / spectralSpread);
    const harmonic = Math.exp(-((freq - (0.48 + Math.cos(time * Math.PI * 1.8) * 0.08)) ** 2) / (spectralSpread * 1.18));
    const transient = Math.exp(-((time - 0.66) ** 2) / 0.006) * Math.exp(-((freq - 0.72) ** 2) / (spectralSpread * 2.4));
    const noiseFloor = 0.1 + Math.sin((column + row) * 1.9) * 0.035;
    const timeTexture = 0.78 + Math.sin(time * Math.PI * 4.2) * 0.16;
    const resolutionBoost = windowFactor * (row % 2 === 0 ? 0.08 : -0.02);
    const energy = Math.max(
      0.05,
      Math.min(1, (fundamental * 0.82 + harmonic * 0.5 + transient * 0.7 + noiseFloor + resolutionBoost) * timeTexture)
    );

    return {
      color: energyColor(energy),
      column,
      energy,
      row
    };
  });
}

function logFrequencyPosition(frequency: number, min = 80, max = 8000) {
  return (Math.log10(frequency) - Math.log10(min)) / (Math.log10(max) - Math.log10(min));
}

function getEffectiveQ(q: number) {
  return Math.max(0.25, q);
}

function getBandwidthOctaves(q: number) {
  return clamp(2.6 / getEffectiveQ(q), 0.16, 3.2);
}

function getBellInfluence(frequency: number, centerFrequency: number, q: number) {
  const distanceOctaves = Math.log2(frequency / centerFrequency);
  const bandwidthOctaves = getBandwidthOctaves(q);

  return Math.exp(-0.5 * (distanceOctaves / bandwidthOctaves) ** 2);
}

function getFilterMagnitude(filterType: FilterType, frequency: number, cutoff: number, q: number) {
  const slope = 1.45 + clamp(q / 20, 0, 1) * 2.6;

  if (filterType === "lowpass") {
    return 1 / Math.sqrt(1 + (frequency / cutoff) ** (2 * slope));
  }

  if (filterType === "highpass") {
    return 1 / Math.sqrt(1 + (cutoff / frequency) ** (2 * slope));
  }

  const bell = getBellInfluence(frequency, cutoff, q);

  if (filterType === "bandpass") {
    return clamp(0.06 + bell * 0.94, 0.06, 1);
  }

  return clamp(1 - bell * 0.88, 0.08, 1);
}

function getEqMagnitude(frequency: number, centerFrequency: number, q: number, eqGain: number) {
  if (eqGain === 0) {
    return 1;
  }

  const linearGain = 10 ** (eqGain / 20);
  const bell = getBellInfluence(frequency, centerFrequency, Math.max(0.8, q));

  return 1 + (linearGain - 1) * bell;
}

function getCombinedFilterGain(
  filterType: FilterType,
  frequency: number,
  cutoff: number,
  q: number,
  eqGain: number
) {
  return getFilterMagnitude(filterType, frequency, cutoff, q) * getEqMagnitude(frequency, cutoff, q, eqGain);
}

function createFilterWavePath(
  filterType: FilterType,
  cutoff: number,
  q: number,
  eqGain: number,
  x: number,
  y: number,
  width: number,
  amplitude: number,
  filtered: boolean
) {
  const gains = filterWaveComponents.map((component) =>
    filtered ? getCombinedFilterGain(filterType, component.frequency, cutoff, q, eqGain) : 1
  );
  const peakEstimate = filterWaveComponents.reduce(
    (sum, component, index) => sum + component.amplitude * gains[index],
    0
  );
  const displayScale = Math.min(1, 1.18 / peakEstimate);
  const points = Array.from({ length: 96 }, (_, index) => {
    const ratio = index / 95;
    const value = filterWaveComponents.reduce((sum, component, componentIndex) => {
      const partial =
        Math.sin(ratio * Math.PI * component.cycles + component.phase) *
        component.amplitude *
        gains[componentIndex];

      return sum + partial;
    }, 0) * displayScale;

    const pointX = x + ratio * width;
    const pointY = y - clamp(value, -1.35, 1.35) * amplitude;
    return `${index === 0 ? "M" : "L"} ${pointX.toFixed(1)} ${pointY.toFixed(1)}`;
  });

  return points.join(" ");
}

function createFilterResponsePath(
  filterType: FilterType,
  cutoff: number,
  q: number,
  eqGain: number,
  x = 70,
  y = 248,
  width = 620,
  height = 176
) {
  const points = Array.from({ length: 72 }, (_, index) => {
    const ratio = index / 71;
    const frequency = 80 * (8000 / 80) ** ratio;
    const gain = getCombinedFilterGain(filterType, frequency, cutoff, q, eqGain);
    const gainDb = 20 * Math.log10(Math.max(0.06, gain));
    const normalizedGain = clamp((gainDb + 24) / 36, 0, 1);
    const pointX = x + ratio * width;
    const pointY = y - normalizedGain * height;

    return `${index === 0 ? "M" : "L"} ${pointX.toFixed(1)} ${pointY.toFixed(1)}`;
  });

  return points.join(" ");
}

function createDynamicsCurvePath(threshold: number, ratio: number, x = 92, y = 258, width = 598, height = 196) {
  const thresholdX = x + ((threshold + 48) / 48) * width;
  const thresholdY = y - ((threshold + 48) / 48) * height;
  const endY = thresholdY - ((x + width - thresholdX) / ratio) * (height / width);

  return `M ${x} ${y} L ${thresholdX.toFixed(1)} ${thresholdY.toFixed(1)} L ${x + width} ${Math.max(y - height, endY).toFixed(1)}`;
}

function calculateCompressedOutputDb(inputDb: number, threshold: number, ratio: number) {
  return inputDb <= threshold ? inputDb : threshold + (inputDb - threshold) / ratio;
}

function createEnvelopeLevel(ratio: number) {
  return Math.max(
    0.02,
    Math.abs(Math.sin(ratio * Math.PI * 4.5)) * (0.45 + 0.55 * Math.sin(ratio * Math.PI))
  );
}

function levelToDb(level: number) {
  return 20 * Math.log10(Math.max(0.02, level));
}

function dbToDisplayY(db: number, bottomY: number, height: number) {
  const normalized = (clamp(db, -48, 0) + 48) / 48;

  return bottomY - normalized * height;
}

function createInputEnvelopePath(x = 92, bottomY = 330, width = 598, height = 70) {
  const points = Array.from({ length: 80 }, (_, index) => {
    const ratio = index / 79;
    const pointX = x + ratio * width;
    const pointY = dbToDisplayY(levelToDb(createEnvelopeLevel(ratio)), bottomY, height);

    return `${index === 0 ? "M" : "L"} ${pointX.toFixed(1)} ${pointY.toFixed(1)}`;
  });

  return points.join(" ");
}

function createOutputEnvelopePath(threshold: number, ratio: number, x = 92, bottomY = 330, width = 598, height = 70) {
  const points = Array.from({ length: 80 }, (_, index) => {
    const ratioPosition = index / 79;
    const pointX = x + ratioPosition * width;
    const inputDb = levelToDb(createEnvelopeLevel(ratioPosition));
    const outputDb = inputDb <= threshold ? inputDb : threshold + (inputDb - threshold) / ratio;
    const pointY = dbToDisplayY(outputDb, bottomY, height);

    return `${index === 0 ? "M" : "L"} ${pointX.toFixed(1)} ${pointY.toFixed(1)}`;
  });

  return points.join(" ");
}

function flowAriaLabel(mode: SignalMode, language: Language) {
  const labels: Record<SignalMode, Record<Language, string>> = {
    stft: { zh: "STFT 流程节点", en: "STFT flow steps" },
    filter: { zh: "滤波器流程节点", en: "Filter flow steps" },
    dynamics: { zh: "动态处理流程节点", en: "Dynamics flow steps" }
  };

  return labels[mode][language];
}

function FlowSteps({ language, mode }: { language: Language; mode: SignalMode }) {
  return (
    <ol aria-label={flowAriaLabel(mode, language)} className="core-flow-steps">
      {flowSteps[mode].map((step, index) => (
        <li className="core-flow-step" key={step.label.en}>
          <span>{index + 1}</span>
          <div>
            <strong>{step.label[language]}</strong>
            <p>{step.detail[language]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProcessingStageOverview({ language, mode }: { language: Language; mode: SignalMode }) {
  const activeRole = processingRoles[mode];

  return (
    <section className="core-stage-overview" aria-labelledby="core-stage-overview-title">
      <div className="codec-mode-concepts-header">
        <span>{language === "zh" ? "处理阶段" : "Processing stage"}</span>
        <strong id="core-stage-overview-title">
          {language === "zh" ? "FFT/STFT、EQ 和动态处理通常在音频链路哪里做" : "Where FFT/STFT, EQ, and dynamics usually sit"}
        </strong>
      </div>
      <div className="core-stage-flow" role="list" aria-label={language === "zh" ? "音频处理阶段流程图" : "Audio processing stage flow"}>
        {processingStages.map((stage, index) => (
          <div
            className={stage.role === mode ? "core-stage-node active" : "core-stage-node"}
            key={stage.label.en}
            role="listitem"
          >
            <span>{index + 1}</span>
            <strong>{stage.label[language]}</strong>
            <p>{stage.detail[language]}</p>
          </div>
        ))}
      </div>
      <div className="core-stage-explain">
        <article>
          <h2>{activeRole.title[language]}</h2>
          <p>{activeRole.stage[language]}</p>
          <p>{activeRole.summary[language]}</p>
        </article>
      </div>
    </section>
  );
}

function FlowNode({
  detail,
  index,
  label,
  x,
  y
}: {
  detail: string;
  index: number;
  label: string;
  x: number;
  y: number;
}) {
  const detailLines = detail.length > 14
    ? [detail.slice(0, 14), detail.slice(14, 26)]
    : [detail];

  return (
    <g className="core-flow-node">
      <rect height="72" rx="12" width="142" x={x} y={y} />
      <circle cx={x + 20} cy={y + 21} r="12" />
      <text className="core-flow-node-index" x={x + 20} y={y + 25}>{index + 1}</text>
      <text className="core-flow-node-title" x={x + 72} y={y + 25}>{label}</text>
      <text className="core-flow-node-detail" x={x + 72} y={y + 47}>
        {detailLines.map((line, lineIndex) => (
          <tspan key={line} x={x + 72} dy={lineIndex === 0 ? 0 : 13}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function FlowArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <path className="core-flow-arrow" d={`M ${x1} ${y} L ${x2} ${y}`} />;
}

function SliderControl({
  label,
  max,
  min,
  onChange,
  step = 1,
  value
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step?: number;
  value: number;
}) {
  return (
    <label className="sound-lab-control">
      <span>{label}</span>
      <input
        aria-label={label}
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function StftChart({
  hopSize,
  language,
  windowSize
}: {
  hopSize: number;
  language: Language;
  windowSize: number;
}) {
  const pcmSamples = createPcmSamples();
  const framePath = createFrameEnvelopePath(windowSize, 226, 228, 150, 32);
  const bars = createSpectrumBars(windowSize);
  const featureBars = createFeatureVectorBars(windowSize);
  const hopOffset = Math.max(18, Math.min(74, (hopSize / 512) * 74));
  const windowBlockWidth = Math.max(56, Math.min(118, (windowSize / 1024) * 118));
  const spectrogramCells = createSpectrogramCells(windowSize, hopSize);
  const heatmapX = 116;
  const heatmapY = 404;
  const { columns: heatmapColumns, rows: heatmapRows } = getStftGridShape(windowSize, hopSize);
  const heatmapGap = 3;
  const heatmapWidth = 460;
  const heatmapCellWidth = (heatmapWidth - (heatmapColumns - 1) * heatmapGap) / heatmapColumns;
  const heatmapHeight = 165;
  const heatmapCellHeight = (heatmapHeight - (heatmapRows - 1) * heatmapGap) / heatmapRows;
  const hopFrameMs = (hopSize / sampleRate) * 1000;
  const steps = flowSteps.stft;

  return (
    <svg
      aria-label={language === "zh" ? "STFT 流程对应图" : "STFT flow-linked diagram"}
      className="core-signal-chart"
      role="img"
      viewBox="0 0 760 680"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="coreSignalLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#7ee7d8" />
          <stop offset="100%" stopColor="#f0b46a" />
        </linearGradient>
      </defs>
      <rect className="lab-diagram-bg" height="680" rx="16" width="760" />
      {steps.map((step, index) => {
        const x = 44 + index * 184;
        return (
          <g key={step.label.en}>
            <FlowNode
              detail={step.detail[language]}
              index={index}
              label={step.label[language]}
              x={x}
              y={34}
            />
            {index < steps.length - 1 ? <FlowArrow x1={x + 148} x2={x + 174} y={70} /> : null}
          </g>
        );
      })}
      <line className="lab-axis" x1="44" x2="196" y1="226" y2="226" />
      <path
        className="core-mini-wave"
        d={`M ${pcmSamples.map((sample) => `${sample.x.toFixed(1)} ${sample.y.toFixed(1)}`).join(" L ")}`}
      />
      {pcmSamples.map((sample, index) => (
        <g key={`pcm-${index}`}>
          <line className="core-pcm-stem" x1={sample.x} x2={sample.x} y1="226" y2={sample.y} />
          <circle className="core-sample-dot" cx={sample.x} cy={sample.y} data-testid="stft-pcm-sample" r="3.6" />
        </g>
      ))}
      <text className="core-diagram-caption small" x="118" y="154">
        {language === "zh" ? "低/中/高频成分叠加" : "Low/mid/high components mixed"}
      </text>
      <text className="core-diagram-caption small" x="118" y="286">{language === "zh" ? "离散采样点" : "Discrete samples"}</text>
      <text className="core-diagram-caption" x="90" y="318">{steps[0].label[language]}</text>
      <rect
        className="core-signal-window"
        data-testid="stft-window-block"
        height="104"
        rx="12"
        width={windowBlockWidth}
        x="226"
        y="174"
      />
      <rect
        className="core-overlap-window"
        data-testid="stft-overlap-frame"
        height="104"
        rx="12"
        width={windowBlockWidth}
        x={226 + hopOffset}
        y="184"
      />
      <line className="lab-axis" x1="218" x2="396" y1="228" y2="228" />
      <path className="lab-wave-path" d={framePath} />
      <path className="core-hann-window" d="M 226 276 C 246 176 306 176 376 276" />
      <path className="core-signal-hop" d={`M 226 304 H ${226 + hopOffset}`} />
      <text className="interface-tdm-note" x="226" y="320">hop</text>
      <text className="core-diagram-caption small" x="278" y="294">
        {language === "zh" ? `窗口 ${windowSize} 点` : `${windowSize}-point window`}
      </text>
      <text className="core-diagram-caption" x="278" y="350">{steps[1].label[language]}</text>
      <text className="core-diagram-caption small" x="350" y="314">{language === "zh" ? "Hann 窗" : "Hann window"}</text>
      <text className="core-diagram-caption small" x="310" y="334">{language === "zh" ? "重叠帧" : "Overlap frame"}</text>
      <rect className="core-fft-box" height="104" rx="12" width="116" x="424" y="174" />
      <path className="core-fft-symbol" d="M 448 248 L 478 190 L 508 248" />
      <text className="core-diagram-caption" x="482" y="318">{steps[2].label[language]}</text>
      <text className="core-diagram-caption small" x="482" y="342">{language === "zh" ? "频率格 / bin" : "Frequency bins"}</text>
      <line className="lab-axis" x1="574" x2="720" y1="286" y2="286" />
      <line className="lab-axis faint" x1="574" x2="720" y1="188" y2="188" />
      <text className="core-axis-label" x="580" y="170">{language === "zh" ? "纵轴：能量" : "Y: energy"}</text>
      <text className="core-axis-label" x="642" y="306">{language === "zh" ? "横轴：频率格" : "X: frequency bin"}</text>
      {bars.map((bar, index) => (
        <rect
          className="core-spectrum-bar"
          height={bar.height * 0.55}
          key={`bar-${index}`}
          rx="4"
          width={Math.max(3, 116 / bars.length - 2)}
          x={582 + index * (124 / bars.length)}
          y={286 - bar.height * 0.55}
        />
      ))}
      <text className="core-diagram-caption small" x="642" y="324">
        {language === "zh" ? `图中示意：${bars.length} 个频率格` : `Diagram: ${bars.length} bins shown`}
      </text>
      <text className="core-diagram-caption small" x="642" y="350">
        {language === "zh" ? "峰值来自同一段 PCM 的频率成分" : "Peaks come from the same PCM segment"}
      </text>
      <text className="core-diagram-caption small" x="642" y="154">
        {language === "zh" ? "hop 不改变单帧频谱" : "Hop does not change one-frame spectrum"}
      </text>
      <text className="core-diagram-caption" x="644" y="366">{steps[3].label[language]}</text>

      <text className="core-diagram-caption" x={heatmapX + heatmapWidth / 2} y="376">
        {language === "zh" ? "STFT 频谱图" : "STFT spectrogram"}
      </text>
      <text className="core-hop-note" x={heatmapX + heatmapWidth / 2} y="394">
        {language === "zh" ? `hop ${hopSize} 点 = ${hopFrameMs.toFixed(1)} ms/帧；只改变横向时间帧` : `hop ${hopSize} = ${hopFrameMs.toFixed(1)} ms/frame; changes time-frame density only`}
      </text>
      <rect
        className="core-spectrogram-panel"
        data-testid="stft-energy-plot"
        height={heatmapHeight + 24}
        rx="12"
        width={heatmapWidth + 24}
        x={heatmapX - 12}
        y={heatmapY - 12}
      />
      <line className="lab-axis" x1={heatmapX - 8} x2={heatmapX - 8} y1={heatmapY} y2={heatmapY + heatmapHeight} />
      <line className="lab-axis" x1={heatmapX} x2={heatmapX + heatmapWidth} y1={heatmapY + heatmapHeight + 8} y2={heatmapY + heatmapHeight + 8} />
      <text
        className="core-axis-label"
        transform={`rotate(-90 ${heatmapX - 72} ${heatmapY + heatmapHeight / 2})`}
        x={heatmapX - 72}
        y={heatmapY + heatmapHeight / 2}
      >
        {language === "zh" ? "纵轴：频率" : "Y: frequency"}
      </text>
      <text className="core-axis-label" x={heatmapX + heatmapWidth / 2} y={heatmapY + heatmapHeight + 30}>
        {language === "zh" ? "横轴：时间帧" : "X: time frame"}
      </text>
      <text className="core-axis-tick" x={heatmapX - 52} y={heatmapY + 8}>{language === "zh" ? "高频" : "High"}</text>
      <text className="core-axis-tick" x={heatmapX - 52} y={heatmapY + heatmapHeight}>{language === "zh" ? "低频" : "Low"}</text>
      {Array.from({ length: heatmapColumns }, (_, index) => (
        <line
          className="core-spectrogram-guide vertical"
          key={`time-guide-${index}`}
          x1={heatmapX + index * (heatmapCellWidth + heatmapGap) + heatmapCellWidth / 2}
          x2={heatmapX + index * (heatmapCellWidth + heatmapGap) + heatmapCellWidth / 2}
          y1={heatmapY}
          y2={heatmapY + heatmapHeight}
        />
      ))}
      {Array.from({ length: heatmapRows }, (_, index) => (
        <line
          className="core-spectrogram-guide horizontal"
          key={`freq-guide-${index}`}
          x1={heatmapX}
          x2={heatmapX + heatmapWidth}
          y1={heatmapY + index * (heatmapCellHeight + heatmapGap) + heatmapCellHeight / 2}
          y2={heatmapY + index * (heatmapCellHeight + heatmapGap) + heatmapCellHeight / 2}
        />
      ))}
      <g className="core-spectrogram-grid">
        {spectrogramCells.map((cell) => (
          <rect
            className="core-spectrogram-cell"
            data-testid="stft-energy-cell"
            fill={cell.color}
            height={heatmapCellHeight}
            key={`${cell.column}-${cell.row}`}
            rx="2"
            width={heatmapCellWidth}
            x={heatmapX + cell.column * (heatmapCellWidth + heatmapGap)}
            y={heatmapY + cell.row * (heatmapCellHeight + heatmapGap)}
          />
        ))}
      </g>
      <text className="core-diagram-caption small" x={heatmapX + heatmapWidth / 2} y={heatmapY + heatmapHeight + 48}>
        {language === "zh" ? `图中示意：${heatmapColumns} 个时间帧；${heatmapRows} 个频率格` : `Diagram: ${heatmapColumns} time frames; ${heatmapRows} frequency bins`}
      </text>
      <g className="core-energy-legend">
        <text className="core-axis-label" x="620" y="440">{language === "zh" ? "颜色：能量" : "Color: energy"}</text>
        <rect fill={energyColor(1)} height="16" rx="3" width="26" x="622" y="456" />
        <text className="interface-tdm-note" x="656" y="468">{language === "zh" ? "亮 = 能量高" : "Bright = high energy"}</text>
        <rect fill={energyColor(0.55)} height="16" rx="3" width="26" x="622" y="486" />
        <text className="interface-tdm-note" x="656" y="498">{language === "zh" ? "中等能量" : "Mid energy"}</text>
        <rect fill={energyColor(0.12)} height="16" rx="3" width="26" x="622" y="516" />
        <text className="interface-tdm-note" x="656" y="528">{language === "zh" ? "暗 = 能量低" : "Dark = low energy"}</text>
      </g>
      <g className="core-feature-vector" aria-label={language === "zh" ? "频谱特征向量示意" : "Spectrum feature vector"}>
        <text className="core-axis-label" x="620" y="568">{language === "zh" ? "特征向量" : "Feature vector"}</text>
        {featureBars.map((bar, index) => (
          <rect
            className="core-feature-bar"
            data-testid="stft-feature-bar"
            height={bar.height}
            key={`feature-${index}`}
            rx="3"
            width="8"
            x={622 + index * 11}
            y={626 - bar.height}
          />
        ))}
        <text className="interface-tdm-note" x="622" y="646">
          {language === "zh" ? "Mel / MFCC / embedding" : "Mel / MFCC / embedding"}
        </text>
        <text className="interface-tdm-note" x="622" y="664">
          {language === "zh" ? "由频谱压缩或重排得到" : "Compressed or remapped from spectra"}
        </text>
      </g>
    </svg>
  );
}

function StftKeyConcepts({ language }: { language: Language }) {
  return (
    <section className="core-key-concepts" aria-labelledby="stft-key-concepts-title">
      <div className="codec-mode-concepts-header">
        <span>{language === "zh" ? "关键知识点" : "Key concepts"}</span>
        <strong id="stft-key-concepts-title">
          {language === "zh" ? "窗口长度、hop size 和能量图怎么理解" : "How to read window size, hop size, and energy maps"}
        </strong>
      </div>
      <div className="core-key-concept-grid">
        <article>
          <h3>{language === "zh" ? "FFT 和 STFT 是什么" : "What FFT and STFT are"}</h3>
          <p>
            {language === "zh"
              ? "FFT 是 Fast Fourier Transform，中文叫快速傅里叶变换。它是快速计算 DFT 的算法：输入一段时间域 PCM 样本，输出这段声音里各个频率成分的大致强弱。"
              : "FFT quickly computes a spectrum: it takes a block of time-domain PCM samples and estimates how strong each frequency component is in that block."}
          </p>
          <p>
            {language === "zh"
              ? "可以把声音理解成很多个正弦波叠加：低频决定慢起伏，中高频决定细节和边缘。复杂波形可以看成很多个正弦波叠加，FFT 就是在估计这些正弦波各自有多强。"
              : "A sound can be treated as many sine waves added together: low frequencies create slow movement, while mid and high frequencies create detail. FFT estimates how strong those sine-like components are."}
          </p>
          <p>
            {language === "zh"
              ? "FFT 的输入是一帧 PCM 采样点，输出不是新的声音，而是一组频率格的幅度或能量。横轴从低频到高频，纵轴表示对应频率成分的强弱。"
              : "The input to FFT is one frame of PCM samples. The output is not new audio; it is magnitudes or energy values across frequency bins."}
          </p>
          <p>
            {language === "zh"
              ? "STFT 是 Short-Time Fourier Transform，中文叫短时傅里叶变换。它不是快速傅里叶变换，而是把长音频切成短帧，每帧通常用 FFT 算频谱，再按时间排成能量图。"
              : "STFT repeats FFT over time: it cuts long audio into short windowed frames, runs FFT per frame, then arranges the spectra over time to form a spectrogram."}
          </p>
          <p>
            {language === "zh"
              ? "完整流程可以理解为：PCM 音频 -> 分帧 -> 加窗 -> 每帧 FFT -> 时间-频率能量图。FFT 只能描述这一小段里有哪些频率；STFT 把很多小段排起来，才看到频率随时间怎么变化。"
              : "The full flow is: PCM audio -> framing -> windowing -> FFT per frame -> time-frequency energy map. FFT describes one short block; STFT lines up many blocks to show how frequency changes over time."}
          </p>
        </article>
        <article>
          <h3>{language === "zh" ? "窗口长度为什么影响频谱" : "Why window size changes the spectrum"}</h3>
          <p>
            {language === "zh"
              ? "STFT 会先截取一小段 PCM 样本，再对这一段做 FFT。窗口越长，参与分析的样本越多，频率格越细；这不是“更能表现高频”，而是相邻频率格的间隔更小，更容易区分接近的频率。"
              : "STFT cuts a short PCM segment and runs FFT on that segment. A longer window uses more samples, so frequency bins are finer, but it covers more time and smears transients across the frame."}
          </p>
          <p>
            {language === "zh"
              ? "频率格更细指 Δf = 采样率 Fs / FFT 点数 N 更小。16 kHz 下，512 点约 31.25 Hz/bin，1024 点约 15.63 Hz/bin。能看到的最高频率主要由采样率决定，16 kHz 采样最高约到 8 kHz。"
              : "Frequency resolution: Delta f = sample rate Fs / FFT size N. At 16 kHz, 512 points are about 31.25 Hz/bin, while 1024 points are about 15.63 Hz/bin."}
          </p>
          <p>
            {language === "zh"
              ? "第 k 个 bin 近似对应 k × Fs / N Hz。比如 Fs=16 kHz、N=512 时，第 10 个 bin 大约是 312.5 Hz。窗口越长，频率分辨率越细，但时间定位越粗，瞬态会被摊到更长的一帧里。"
              : "Bin k roughly maps to k x Fs / N Hz. With Fs=16 kHz and N=512, bin 10 is about 312.5 Hz. A longer window gives finer frequency resolution but coarser time localization."}
          </p>
        </article>
        <article>
          <h3>{language === "zh" ? "hop size 表示什么" : "What hop size means"}</h3>
          <p>
            {language === "zh"
              ? "hop size 是相邻两帧起点之间相隔多少个采样点。hop 越小，相同时间内帧数越多，能量图横向更密，时间变化看起来更平滑；但单帧 FFT 的频率格和频率范围不变。"
              : "Hop size is the sample distance between the start of adjacent frames. Smaller hop means more overlap and smoother time changes, but it also produces more frames and higher compute cost."}
          </p>
          <p>
            {language === "zh"
              ? "重叠率可以理解为：1 - hop size / 窗口长度。比如 512 点窗口、256 点 hop，就是 50% 重叠。hop 改变会影响特征序列的帧率，而不是让某个频率本身变强。"
              : "Overlap can be read as 1 - hop size / window size. For example, a 512-point window with a 256-point hop has 50% overlap."}
          </p>
          <p>
            {language === "zh"
              ? "采样率决定最高可分析频率，理论上最高到 Fs/2。16 kHz 采样最高约 8 kHz；如果要分析 12 kHz 高频，采样率至少要高于 24 kHz。"
              : "Sample rate sets the highest analyzable frequency, ideally up to Fs/2. A 16 kHz sample rate reaches about 8 kHz; analyzing 12 kHz needs more than 24 kHz sampling."}
          </p>
        </article>
        <article>
          <h3>{language === "zh" ? "能量高低表示什么" : "What energy level means"}</h3>
          <p>
            {language === "zh"
              ? "STFT 能量图里的每个格子，对应一个时间帧和一个频率范围。颜色越亮，表示这个时间点附近、这个频率范围里的声音成分越强。"
              : "Each spectrogram cell maps to one time frame and one frequency range. Brighter color means that frequency component is stronger around that time."}
          </p>
          <p>
            {language === "zh"
              ? "它不是新的音频信号，而是把原始波形拆成“什么时候有什么频率、强度有多大”的可视化。"
              : "It is not a new audio signal; it visualizes the original waveform as what frequencies exist at what times and how strong they are."}
          </p>
          <p>
            {language === "zh"
              ? "后续算法常会把频谱进一步压缩、重排或学习成特征向量，例如 Mel 能量、MFCC 或 embedding；这些特征更适合识别、分类、增强或编码模型使用。"
              : "Later algorithms often compress, remap, or learn spectra into feature vectors such as Mel energy, MFCCs, or embeddings for recognition, classification, enhancement, or coding models."}
          </p>
        </article>
      </div>
    </section>
  );
}

function FilterChart({
  cutoff,
  eqGain,
  filterType,
  language,
  q
}: {
  cutoff: number;
  eqGain: number;
  filterType: FilterType;
  language: Language;
  q: number;
}) {
  const responsePath = createFilterResponsePath(filterType, cutoff, q, eqGain, 414, 282, 164, 110);
  const originalWavePath = createFilterWavePath(filterType, cutoff, q, eqGain, 48, 374, 300, 26, false);
  const filteredWavePath = createFilterWavePath(filterType, cutoff, q, eqGain, 410, 374, 300, 26, true);
  const cutoffX = 90 + logFrequencyPosition(cutoff) * 560;
  const visibleCutoffX = Math.max(414, Math.min(578, 414 + (cutoffX - 90) * (164 / 560)));
  const qBandWidth = Math.max(10, 118 - getEffectiveQ(q) * 5);
  const eqGainLineY = Math.max(172, Math.min(282, 238 - eqGain * 4.5));
  const outputBars = filterOutputBands.map((band) => {
    const frequency = band.frequency ?? cutoff;

    return {
      frequency,
      height: clamp(
        band.baseHeight * getCombinedFilterGain(filterType, frequency, cutoff, q, eqGain),
        7,
        106
      )
    };
  });
  const steps = flowSteps.filter;

  return (
    <svg
      aria-label={language === "zh" ? "滤波器流程对应图" : "Filter flow-linked diagram"}
      className="core-signal-chart"
      role="img"
      viewBox="0 0 760 480"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="lab-diagram-bg" height="480" rx="16" width="760" />
      {steps.map((step, index) => {
        const x = 44 + index * 184;
        return (
          <g key={step.label.en}>
            <FlowNode
              detail={step.detail[language]}
              index={index}
              label={step.label[language]}
              x={x}
              y={34}
            />
            {index < steps.length - 1 ? <FlowArrow x1={x + 148} x2={x + 174} y={70} /> : null}
          </g>
        );
      })}
      <line className="lab-axis" x1="54" x2="206" y1="282" y2="282" />
      {[28, 58, 88, 118].map((height, index) => (
        <rect className="core-spectrum-bar muted" height={height} key={`input-${index}`} rx="4" width="14" x={76 + index * 28} y={282 - height} />
      ))}
      <text className="core-diagram-caption" x="64" y="332">{steps[0].label[language]}</text>
      <rect className="core-filter-type-box" height="112" rx="12" width="138" x="240" y="174" />
      <text className="core-filter-type-label" x="309" y="224">{filterLabels[filterType][language]}</text>
      <text className="core-diagram-caption" x="246" y="332">{steps[1].label[language]}</text>
      <line className="lab-axis" x1="414" x2="578" y1="282" y2="282" />
      <line className="lab-axis faint" x1="414" x2="578" y1="194" y2="194" />
      <line
        className="core-eq-gain-line"
        data-testid="filter-eq-gain-line"
        x1="414"
        x2="578"
        y1={eqGainLineY}
        y2={eqGainLineY}
      />
      <text className="interface-tdm-note" x="418" y={eqGainLineY - 8}>
        {language === "zh" ? `EQ ${formatDb(eqGain)}` : `EQ ${formatDb(eqGain)}`}
      </text>
      <rect
        className="core-q-band"
        data-testid="filter-q-band"
        height="112"
        rx="8"
        width={qBandWidth}
        x={Math.max(414, Math.min(578 - qBandWidth, visibleCutoffX - qBandWidth / 2))}
        y="170"
      />
      <path className="core-filter-fill" d={`${responsePath} L 578 282 L 414 282 Z`} />
      <path className="lab-wave-path" d={responsePath} />
      <line
        className="core-cutoff-marker"
        data-testid="filter-cutoff-marker"
        x1={visibleCutoffX}
        x2={visibleCutoffX}
        y1="170"
        y2="292"
      />
      <text className="core-diagram-caption" x="420" y="332">{steps[2].label[language]}</text>
      <line className="lab-axis" x1="624" x2="716" y1="282" y2="282" />
      {outputBars.map((band, index) => (
        <rect
          className="core-spectrum-bar"
          data-frequency={band.frequency}
          data-testid="filter-output-bar"
          height={band.height}
          key={`output-${index}`}
          rx="4"
          width="11"
          x={626 + index * 15}
          y={282 - band.height}
        />
      ))}
      <text className="core-diagram-caption" x="626" y="332">{steps[3].label[language]}</text>
      <line className="lab-axis faint" x1="48" x2="348" y1="374" y2="374" />
      <path className="core-original-wave" d={originalWavePath} />
      <text className="core-diagram-caption small" x="112" y="428">{language === "zh" ? "原始波形" : "Original waveform"}</text>
      <line className="lab-axis faint" x1="410" x2="710" y1="374" y2="374" />
      <path className="core-filtered-wave" data-testid="filtered-wave-path" d={filteredWavePath} />
      <text className="core-diagram-caption small" x="490" y="428">{language === "zh" ? "滤波后波形" : "Filtered waveform"}</text>
      <text className="interface-tdm-note" x="52" y="454">{language === "zh" ? "波形对比：低通会让高频纹理变少；高通会削弱低频起伏；EQ 增益会改变滤波后振幅。" : "Waveform comparison: low-pass removes high-frequency texture, high-pass reduces slow movement, and EQ gain changes filtered amplitude."}</text>
    </svg>
  );
}

function DynamicsChart({
  language,
  ratio,
  threshold
}: {
  language: Language;
  ratio: number;
  threshold: number;
}) {
  const curvePath = createDynamicsCurvePath(threshold, ratio, 430, 286, 136, 108);
  const envelopeBottomY = 286;
  const envelopeHeight = 92;
  const inputEnvelope = createInputEnvelopePath(54, envelopeBottomY, 140, envelopeHeight);
  const detectorEnvelope = createInputEnvelopePath(250, envelopeBottomY, 132, envelopeHeight);
  const outputEnvelope = createOutputEnvelopePath(threshold, ratio, 620, envelopeBottomY, 92, envelopeHeight);
  const thresholdLineY = dbToDisplayY(threshold, envelopeBottomY, envelopeHeight);
  const exampleInputDb = -6;
  const exampleOverThresholdDb = Math.max(0, exampleInputDb - threshold);
  const exampleKeptOverDb = exampleOverThresholdDb / ratio;
  const exampleOutputDb = calculateCompressedOutputDb(exampleInputDb, threshold, ratio);
  const exampleGainDb = exampleOutputDb - exampleInputDb;
  const curveX = 430;
  const curveY = 286;
  const curveWidth = 136;
  const curveHeight = 108;
  const gainMarkerX = curveX + ((exampleInputDb + 48) / 48) * curveWidth;
  const inputReferenceY = dbToDisplayY(exampleInputDb, curveY, curveHeight);
  const compressedOutputY = dbToDisplayY(exampleOutputDb, curveY, curveHeight);
  const steps = flowSteps.dynamics;

  return (
    <svg
      aria-label={language === "zh" ? "动态处理流程对应图" : "Dynamics flow-linked diagram"}
      className="core-signal-chart"
      role="img"
      viewBox="0 0 760 460"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="lab-diagram-bg" height="460" rx="16" width="760" />
      {steps.map((step, index) => {
        const x = 44 + index * 184;
        return (
          <g key={step.label.en}>
            <FlowNode
              detail={step.detail[language]}
              index={index}
              label={step.label[language]}
              x={x}
              y={34}
            />
            {index < steps.length - 1 ? <FlowArrow x1={x + 148} x2={x + 174} y={70} /> : null}
          </g>
        );
      })}
      <path className="core-dynamics-input" d={inputEnvelope} />
      <text className="core-diagram-caption" x="58" y="332">{steps[0].label[language]}</text>
      <text className="interface-tdm-note" x="58" y="354">{language === "zh" ? "数字样本幅度 -> dBFS" : "PCM amplitude -> dBFS"}</text>
      <line
        className="lab-axis faint"
        data-testid="dynamics-threshold-line"
        x1="238"
        x2="382"
        y1={thresholdLineY}
        y2={thresholdLineY}
      />
      <text className="interface-tdm-note" x="246" y={Math.max(186, thresholdLineY - 8)}>Threshold {threshold} dBFS</text>
      <path className="core-dynamics-input" d={detectorEnvelope} />
      <text className="core-diagram-caption" x="238" y="332">{steps[1].label[language]}</text>
      <line className="lab-axis" x1="430" x2="566" y1="286" y2="286" />
      <line className="lab-axis" x1="430" x2="430" y1="176" y2="286" />
      <path className="core-dynamics-guide" d="M 430 286 L 566 178" />
      <path className="lab-wave-path" d={curvePath} />
      <line
        className="core-gain-reference"
        x1="430"
        x2={gainMarkerX}
        y1={inputReferenceY}
        y2={inputReferenceY}
      />
      <line
        className="core-gain-reference"
        x1="430"
        x2={gainMarkerX}
        y1={compressedOutputY}
        y2={compressedOutputY}
      />
      <line
        className="core-gain-reduction-marker"
        data-testid="dynamics-gain-reduction"
        x1={gainMarkerX}
        x2={gainMarkerX}
        y1={inputReferenceY}
        y2={compressedOutputY}
      />
      <circle className="core-gain-point" cx={gainMarkerX} cy={compressedOutputY} r="4" />
      <text className="core-axis-label" x="490" y="308">{language === "zh" ? "横轴：输入电平 dBFS" : "X: input level dBFS"}</text>
      <text
        className="core-axis-label"
        transform="rotate(-90 414 242)"
        x="414"
        y="242"
      >
        {language === "zh" ? "纵轴：输出电平 dBFS" : "Y: output level dBFS"}
      </text>
      <text className="interface-tdm-note" x={gainMarkerX + 8} y={inputReferenceY - 5}>
        {language === "zh" ? "未压缩输出=输入" : "Unity output"}
      </text>
      <text className="interface-tdm-note" x={gainMarkerX + 8} y={compressedOutputY + 13}>
        {language === "zh" ? `增益衰减 ${formatDbValue(exampleGainDb)}` : `Gain reduction ${formatDbValue(exampleGainDb)}`}
      </text>
      <text className="core-diagram-caption" x="430" y="332">{steps[2].label[language]}</text>
      <g className="core-gain-formula">
        <rect height="76" rx="8" width="318" x="402" y="342" />
        <text x="420" y="365">{language === "zh" ? "超过阈值：输出 = T + (输入 - T) / Ratio" : "Above threshold: output = T + (input - T) / Ratio"}</text>
        <text data-testid="dynamics-over-threshold" x="420" y="384">
          {language === "zh"
            ? `超出量：${formatDbfs(exampleInputDb)} - ${formatDbfs(threshold)} = ${formatDbValue(exampleOverThresholdDb)}`
            : `Above: ${formatDbfs(exampleInputDb)} - ${formatDbfs(threshold)} = ${formatDbValue(exampleOverThresholdDb)}`}
        </text>
        <text data-testid="dynamics-ratio-kept" x="420" y="401">
          {language === "zh"
            ? `Ratio：${formatDbValue(exampleOverThresholdDb)} / ${ratio} = ${formatDbValue(exampleKeptOverDb)}`
            : `Ratio: ${formatDbValue(exampleOverThresholdDb)} / ${ratio} = ${formatDbValue(exampleKeptOverDb)}`}
        </text>
        <text data-testid="dynamics-gain-db" x="420" y="418">
          {language === "zh"
            ? `输出：${formatDbfs(exampleOutputDb)}；增益变化 ${formatDbValue(exampleGainDb)}`
            : `Output: ${formatDbfs(exampleOutputDb)}; gain change ${formatDbValue(exampleGainDb)}`}
        </text>
      </g>
      <path className="core-dynamics-output" d={outputEnvelope} />
      <text className="core-diagram-caption" x="618" y="332">{steps[3].label[language]}</text>
      <text className="interface-tdm-note" x="52" y="430">{language === "zh" ? "Threshold 改变超出量；ratio 改变超出阈值部分保留多少，二者共同决定增益衰减。" : "Threshold changes how far above the line the signal is; ratio decides how much of that excess remains."}</text>
      <text className="interface-tdm-note" x="52" y="448">{language === "zh" ? "这里的压缩是动态范围压缩，不是 MP3/AAC 这类编码压缩。" : "This is dynamic range compression, not MP3/AAC-style codec compression."}</text>
    </svg>
  );
}

export function CoreSignalProcessingLab({ language, onBack }: CoreSignalProcessingLabProps) {
  const [mode, setMode] = useState<SignalMode>("stft");
  const [windowSize, setWindowSize] = useState(512);
  const [hopSize, setHopSize] = useState(256);
  const [filterType, setFilterType] = useState<FilterType>("lowpass");
  const [cutoff, setCutoff] = useState(2400);
  const [q, setQ] = useState(1.2);
  const [eqGain, setEqGain] = useState(0);
  const [threshold, setThreshold] = useState(-18);
  const [ratio, setRatio] = useState(3);

  const stftMetrics = useMemo(() => {
    const frequencyResolution = sampleRate / windowSize;
    const frameDuration = (windowSize / sampleRate) * 1000;
    const overlap = Math.max(0, 1 - hopSize / windowSize) * 100;

    return { frameDuration, frequencyResolution, overlap };
  }, [hopSize, windowSize]);

  const filterSummary = {
    lowpass: {
      zh: "低通：削弱截止频率以上的高频",
      en: "Low-pass: attenuates high frequencies above cutoff"
    },
    highpass: {
      zh: "高通：削弱截止频率以下的低频",
      en: "High-pass: attenuates low frequencies below cutoff"
    },
    bandpass: {
      zh: "带通：只保留中心频段附近能量",
      en: "Band-pass: keeps energy around the center band"
    },
    notch: {
      zh: "陷波：压低某个窄频段的干扰",
      en: "Notch: suppresses a narrow interference band"
    }
  }[filterType];
  const activeChangeNote = {
    stft: {
      zh: "这一步变化：窗口长度改变频率格间隔；hop size 改变横向时间帧密度，不改变单帧 FFT 频谱。",
      en: "Current change: the frame/window block changes width, and FFT frequency bins become finer."
    },
    filter: {
      zh: "这一步变化：截止频率、Q 和 EQ 增益共同改变频率响应，输出频谱会随各频段保留比例变化。",
      en: "Current change: cutoff, Q, and EQ gain shape the response together, so the output spectrum follows the retained energy in each band."
    },
    dynamics: {
      zh: "这一步变化：阈值线下移，更早进入压缩，输出包络更平。",
      en: "Current change: the threshold line moves lower, compression starts earlier, and the output envelope becomes flatter."
    }
  }[mode];

  return (
    <main className="sound-lab-page core-signal-page">
      <section className="sound-lab-hero" aria-labelledby="core-signal-lab-title">
        <button className="sound-lab-back" type="button" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" />
          {language === "zh" ? "返回知识库" : "Back to knowledge base"}
        </button>
        <div>
          <span className="section-kicker">{language === "zh" ? "传统 DSP 实验" : "Traditional DSP lab"}</span>
          <h1 id="core-signal-lab-title">
            {language === "zh" ? "基础信号处理实验室" : "Core Signal Processing Lab"}
          </h1>
          <p>
            {language === "zh"
              ? "把 STFT 分帧、滤波器/EQ 和动态处理放在一个实验台里，观察参数变化如何影响图形、分辨率、频率响应和动态范围。"
              : "Explore STFT framing, filters/EQ, and dynamics processing in one workbench, watching how parameters change diagrams, resolution, response, and dynamic range."}
          </p>
        </div>
      </section>

      <section
        aria-label={language === "zh" ? "基础信号处理实验台" : "Core signal processing workbench"}
        className="core-signal-workbench"
      >
        <div className="waveform-tabs core-signal-tabs" role="group" aria-label={language === "zh" ? "信号处理视图" : "Signal processing views"}>
          {(Object.keys(modeLabels) as SignalMode[]).map((item) => (
            <button
              className={mode === item ? "active" : ""}
              key={item}
              type="button"
              onClick={() => setMode(item)}
            >
              {modeLabels[item][language]}
            </button>
          ))}
        </div>

        <ProcessingStageOverview language={language} mode={mode} />

        <FlowSteps language={language} mode={mode} />

        <div className="core-signal-layout">
          <div className="sound-lab-visual core-signal-visual">
            {mode === "stft" ? (
              <StftChart hopSize={hopSize} language={language} windowSize={windowSize} />
            ) : null}
            {mode === "filter" ? (
              <FilterChart
                cutoff={cutoff}
                eqGain={eqGain}
                filterType={filterType}
                language={language}
                q={q}
              />
            ) : null}
            {mode === "dynamics" ? (
              <DynamicsChart language={language} ratio={ratio} threshold={threshold} />
            ) : null}
          </div>

          <aside className="sound-lab-controls core-signal-controls">
            {mode === "stft" ? (
              <>
                <div className="codec-mode-concepts-header">
                  <span>STFT</span>
                  <strong>{language === "zh" ? "分帧和频谱分辨率" : "Framing and spectral resolution"}</strong>
                </div>
                <SliderControl
                  label={language === "zh" ? "窗口长度" : "Window size"}
                  max={1024}
                  min={256}
                  step={256}
                  value={windowSize}
                  onChange={setWindowSize}
                />
                <SliderControl
                  label="Hop size"
                  max={512}
                  min={128}
                  step={128}
                  value={hopSize}
                  onChange={setHopSize}
                />
                <div className="core-signal-metrics">
                  <strong>{language === "zh" ? `频率分辨率：${stftMetrics.frequencyResolution.toFixed(2)} Hz/bin` : `Frequency resolution: ${stftMetrics.frequencyResolution.toFixed(2)} Hz/bin`}</strong>
                  <strong>{language === "zh" ? `每帧时长：${stftMetrics.frameDuration.toFixed(1)} ms` : `Frame duration: ${stftMetrics.frameDuration.toFixed(1)} ms`}</strong>
                  <strong>{language === "zh" ? `重叠率：${stftMetrics.overlap.toFixed(1)}%` : `Overlap: ${stftMetrics.overlap.toFixed(1)}%`}</strong>
                </div>
                <p className="core-signal-change-note">{activeChangeNote[language]}</p>
              </>
            ) : null}

            {mode === "filter" ? (
              <>
                <div className="codec-mode-concepts-header">
                  <span>{language === "zh" ? "频率响应" : "Frequency response"}</span>
                  <strong>{filterSummary[language]}</strong>
                </div>
                <div className="waveform-tabs core-filter-tabs" role="group" aria-label={language === "zh" ? "滤波器类型" : "Filter type"}>
                  {(Object.keys(filterLabels) as FilterType[]).map((item) => (
                    <button
                      className={filterType === item ? "active" : ""}
                      key={item}
                      type="button"
                      onClick={() => setFilterType(item)}
                    >
                      {filterLabels[item][language]}
                    </button>
                  ))}
                </div>
                <SliderControl
                  label={language === "zh" ? "截止频率" : "Cutoff frequency"}
                  max={8000}
                  min={200}
                  step={100}
                  value={cutoff}
                  onChange={setCutoff}
                />
                <SliderControl label="Q" max={20} min={0} step={0.1} value={q} onChange={setQ} />
                <SliderControl
                  label={language === "zh" ? "EQ 增益" : "EQ gain"}
                  max={12}
                  min={-12}
                  value={eqGain}
                  onChange={setEqGain}
                />
                <div className="core-signal-metrics">
                  <strong>{language === "zh" ? `截止频率：${cutoff} Hz` : `Cutoff: ${cutoff} Hz`}</strong>
                  <strong>Q：{q.toFixed(1)}</strong>
                  <strong>{language === "zh" ? `EQ 增益：${formatDb(eqGain)}` : `EQ gain: ${formatDb(eqGain)}`}</strong>
                </div>
                <p className="core-signal-change-note">{activeChangeNote[language]}</p>
              </>
            ) : null}

            {mode === "dynamics" ? (
              <>
                <div className="codec-mode-concepts-header">
                  <span>{language === "zh" ? "压缩器 / 限幅器" : "Compressor / limiter"}</span>
                  <strong>{language === "zh" ? "超过阈值后按 ratio 收缩，峰值被压低" : "Above threshold, ratio reduces peaks"}</strong>
                </div>
                <SliderControl
                  label="Threshold"
                  max={-6}
                  min={-36}
                  value={threshold}
                  onChange={setThreshold}
                />
                <SliderControl label="Ratio" max={12} min={1} value={ratio} onChange={setRatio} />
                <div className="core-signal-metrics">
                  <strong>Threshold：{threshold} dBFS</strong>
                  <strong>Ratio：{ratio}:1</strong>
                  <strong>{language === "zh" ? "Attack / release 决定增益变化速度" : "Attack / release set gain-change speed"}</strong>
                </div>
                <p className="core-signal-change-note">{activeChangeNote[language]}</p>
              </>
            ) : null}
          </aside>
        </div>

        {mode === "stft" ? <StftKeyConcepts language={language} /> : null}
      </section>
    </main>
  );
}
