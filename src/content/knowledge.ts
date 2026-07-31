import {
  Binary,
  BrainCircuit,
  Cpu,
  Headphones,
  RadioTower,
  SlidersHorizontal
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Language = "zh" | "en";

export type LocalizedText = Record<Language, string>;

export type TopicTerm = {
  name: LocalizedText;
  explanation: LocalizedText;
};

export type TopicDiagram = {
  type: "sound-wave";
  label: LocalizedText;
  caption: LocalizedText;
};

export type AiAudioMode = "asr" | "tts" | "generation" | "event" | "enhancement" | "codec";
export type AiAudioLabId = "overview" | AiAudioMode;

export type TopicLab = {
  type:
    | "sound-wave"
    | "audio-units"
    | "sampling-quantization"
    | "listening-metrics"
    | "microphone"
    | "codec-hardware"
    | "digital-interface"
    | "amplifier-speaker"
    | "system-audio"
    | "audio-codec"
    | "realtime-audio"
    | "core-signal-processing"
    | "speech-enhancement"
    | "spatial-audio"
    | "meeting-communication"
    | "automotive-audio"
    | "iot-content"
    | "ai-audio";
  initialMode?: AiAudioLabId;
  title: LocalizedText;
  description: LocalizedText;
  buttonLabel: LocalizedText;
};

export type TopicDetail = {
  explanation: LocalizedText;
  keyConcepts: LocalizedText[];
  termExplanations?: TopicTerm[];
  diagram?: TopicDiagram;
  lab?: TopicLab;
  misconception: LocalizedText;
  contentDirection: LocalizedText;
};

export type Topic = {
  title: LocalizedText;
  summary: LocalizedText;
  bullets: LocalizedText[];
  detail: TopicDetail;
};

export type Category = {
  id: string;
  icon: LucideIcon;
  title: LocalizedText;
  description: LocalizedText;
  accent: string;
  topics: Topic[];
};

export const interfaceCopy = {
  navGithub: { zh: "GitHub", en: "GitHub" },
  languageButton: { zh: "English", en: "中文" },
  eyebrow: { zh: "音频技术分享", en: "Audio Technology Sharing" },
  title: { zh: "音频技术分享", en: "Audio Technology Sharing" },
  subtitle: {
    zh: "一个可搜索、可筛选、带交互实验室的音频技术分享网页，覆盖音频基础、硬件、软件、传统 DSP、AI 算法和应用场景。",
    en: "A searchable, filterable audio technology sharing site with interactive labs, covering fundamentals, hardware, software, traditional DSP, AI algorithms, and applications."
  },
  searchLabel: { zh: "搜索知识点", en: "Search knowledge topics" },
  searchPlaceholder: {
    zh: "搜索 FFT、麦克风、TTS、蓝牙延迟...",
    en: "Search FFT, microphones, TTS, Bluetooth latency..."
  },
  allCategories: { zh: "全部", en: "All" },
  categoriesTitle: { zh: "知识分类", en: "Knowledge Areas" },
  categoriesSubtitle: {
    zh: "按学习路径浏览，也可以直接搜索具体概念。",
    en: "Browse by learning path, or search directly for a concept."
  },
  topicsTitle: { zh: "主题卡片", en: "Topic Cards" },
  topicsSubtitle: {
    zh: "每张卡片后续都可以扩展为独立文章、图解或交互页面。",
    en: "Each card can later become an article, diagram, or interactive page."
  },
  noResults: { zh: "没有找到匹配主题。", en: "No matching topics found." },
  detailsLabel: { zh: "主题详情", en: "Topic details" },
  closeDetails: { zh: "关闭详情", en: "Close details" },
  detailsExplanationTitle: { zh: "详细解释", en: "Detailed explanation" },
  detailsRelatedTermsTitle: { zh: "相关知识点逐条解释", en: "Related knowledge explained" },
  detailsConceptsTitle: { zh: "关键概念", en: "Key concepts" },
  detailsDiagramTitle: { zh: "交互式正弦波图解", en: "Interactive sine wave diagram" },
  detailsMisconceptionTitle: { zh: "常见误区", en: "Common misconception" },
  detailsContentDirectionTitle: { zh: "内容扩展建议", en: "Content expansion idea" },
  detailsFormatTitle: { zh: "适合内容形式", en: "Best content formats" },
  detailsFormats: {
    zh: "文章 / 图解 / 案例 / 交互说明",
    en: "Article / Diagram / Case study / Interactive explainer"
  },
  footer: {
    zh: "内容来自当前仓库的音频技术分享知识大纲。",
    en: "Content is derived from the repository's audio technology knowledge outline."
  }
} satisfies Record<string, LocalizedText>;

export const categories: Category[] = [
  {
    id: "fundamentals",
    icon: RadioTower,
    accent: "#1f9d8a",
    title: { zh: "音频基础", en: "Audio Fundamentals" },
    description: {
      zh: "理解声音、声学和数字音频的底层概念。",
      en: "Understand sound, acoustics, and the basics of digital audio."
    },
    topics: [
      {
        title: { zh: "什么是声音", en: "What Sound Is" },
        summary: {
          zh: "从振动、声波、传播介质和人耳感知建立第一层认知。",
          en: "Build first principles from vibration, waves, medium propagation, and human hearing."
        },
        bullets: [
          { zh: "频率、振幅、相位、波长", en: "Frequency, amplitude, phase, wavelength" },
          { zh: "人耳听觉范围", en: "Human hearing range" },
          { zh: "声音产生、传播和感知", en: "Generation, propagation, and perception" }
        ],
        detail: {
          explanation: {
            zh: "声音本质上是物体振动引起的压力变化。振动通过空气、水或固体传播到耳朵，耳膜和内耳把这些压力变化转换成神经信号，大脑再把它们理解成音高、响度、音色和方向。",
            en: "Sound is a pressure variation caused by vibration. The vibration travels through air, water, or solids to the ear, where the eardrum and inner ear convert it into neural signals that the brain interprets as pitch, loudness, timbre, and direction."
          },
          keyConcepts: [
            { zh: "频率决定音高，振幅通常影响响度。", en: "Frequency shapes pitch, while amplitude usually affects loudness." },
            { zh: "相位描述波形在周期中的位置，多个声音叠加时会影响抵消或增强。", en: "Phase describes position within a waveform cycle and affects cancellation or reinforcement when sounds combine." },
            { zh: "波长和传播速度相关，同一频率在不同介质中的波长不同。", en: "Wavelength depends on propagation speed, so the same frequency has different wavelengths in different media." }
          ],
          termExplanations: [
            {
              name: { zh: "频率", en: "Frequency" },
              explanation: {
                zh: "频率表示声波每秒振动的次数，单位是赫兹 Hz。频率越高，通常听起来音调越高；频率越低，通常听起来越低沉。",
                en: "Frequency is the number of waveform cycles per second, measured in hertz. Higher frequency usually sounds like a higher pitch, while lower frequency usually sounds deeper."
              }
            },
            {
              name: { zh: "振幅", en: "Amplitude" },
              explanation: {
                zh: "振幅表示压力变化的幅度，反映声波偏离平衡位置的大小。振幅越大，通常能量越强，听起来也更响，但实际响度还受频率和人耳敏感度影响。",
                en: "Amplitude is the size of the pressure change, showing how far the wave moves away from its resting level. Larger amplitude usually means more energy and louder sound, though perceived loudness also depends on frequency and hearing sensitivity."
              }
            },
            {
              name: { zh: "相位", en: "Phase" },
              explanation: {
                zh: "相位描述声波在一个周期中走到哪里。两个相同频率的声音相位接近时会增强，相位相反时可能互相抵消，这也是降噪和阵列处理的重要基础。",
                en: "Phase describes where a wave is within its cycle. Two sounds with similar frequency can reinforce each other when aligned, or cancel when opposite, which is important for noise cancellation and array processing."
              }
            },
            {
              name: { zh: "波长", en: "Wavelength" },
              explanation: {
                zh: "波长是声波完成一个周期所占的空间距离。低频声音波长更长，更容易绕过障碍物；高频声音波长更短，更容易被遮挡或吸收。",
                en: "Wavelength is the physical distance of one full cycle. Low-frequency sound has longer wavelengths and bends around obstacles more easily; high-frequency sound has shorter wavelengths and is blocked or absorbed more easily."
              }
            },
            {
              name: { zh: "人耳听觉范围", en: "Human hearing range" },
              explanation: {
                zh: "多数年轻人可听到大约 20 Hz 到 20 kHz 的声音，但年龄、环境噪声和个体差异会改变实际范围。人耳对 2 kHz 到 5 kHz 附近通常更敏感。",
                en: "Many young listeners can hear roughly 20 Hz to 20 kHz, but age, noise exposure, and individual differences change the actual range. Human hearing is often more sensitive around 2 kHz to 5 kHz."
              }
            },
            {
              name: { zh: "传播介质", en: "Propagation medium" },
              explanation: {
                zh: "声音需要介质传递压力变化。空气中的声速约为 343 m/s，水和固体中的速度通常更快，因此同样频率在不同介质中的波长也不同。",
                en: "Sound needs a medium to carry pressure changes. In air the speed of sound is about 343 m/s, while it is usually faster in water and solids, so the same frequency has different wavelengths in different media."
              }
            }
          ],
          diagram: {
            type: "sound-wave",
            label: { zh: "声波频率、振幅、相位和波长图解", en: "Diagram of sound-wave frequency, amplitude, phase, and wavelength" },
            caption: {
              zh: "同样的振幅下，高频波形周期更密；同样的频率下，振幅越大代表压力变化越强。波长对应一个完整周期在空间中的距离。",
              en: "At the same amplitude, higher frequency creates tighter cycles. At the same frequency, larger amplitude means stronger pressure variation. Wavelength is the spatial distance of one full cycle."
            }
          },
          lab: {
            type: "sound-wave",
            title: { zh: "声音波形实验室", en: "Sound Wave Lab" },
            description: {
              zh: "进入独立界面后，可以调节频率、振幅和相位，观察波形和听感如何变化。",
              en: "Open the lab to adjust frequency, amplitude, and phase while watching the waveform and sound change."
            },
            buttonLabel: { zh: "打开声音波形实验室", en: "Open sound wave lab" }
          },
          misconception: {
            zh: "声音不是只存在于空气中的东西，它需要介质传播，但介质可以是气体、液体或固体；真空中没有普通声波传播。",
            en: "Sound is not limited to air. It needs a medium, which can be gas, liquid, or solid; ordinary sound waves do not propagate through a vacuum."
          },
          contentDirection: {
            zh: "上方交互实验已经把频率、振幅、相位和播放音高连接起来；后续可以继续补充谐波、噪声和真实乐器波形对比。",
            en: "The interactive experiment above already connects frequency, amplitude, phase, and audible pitch; next it can add harmonics, noise, and real-instrument waveform comparisons."
          }
        }
      },
      {
        title: { zh: "声音与音频单位", en: "Sound and Audio Units" },
        summary: {
          zh: "区分 dBSPL、dBFS、dBu、dBV、LUFS、Hz、bit、ms 等常见单位和参考点。",
          en: "Distinguish common units and references such as dBSPL, dBFS, dBu, dBV, LUFS, Hz, bit, and ms."
        },
        bullets: [
          { zh: "dB 是比例，dBSPL / dBFS / dBu / dBV 的参考点不同", en: "dB is a ratio; dBSPL, dBFS, dBu, and dBV use different references" },
          { zh: "LUFS 描述节目响度，dBFS 描述数字满刻度余量", en: "LUFS describes program loudness, while dBFS describes digital full-scale headroom" },
          { zh: "Hz、kHz、bit、sample、ms 常用于频率、采样、位深和延迟", en: "Hz, kHz, bit, sample, and ms describe frequency, sampling, bit depth, and latency" }
        ],
        detail: {
          explanation: {
            zh: "音频里很多单位都写成 dB，但它们不是同一种东西。dB 本身只是两个量之间的对数比例；加上不同后缀后，参考点才被确定：dBSPL 参考空气声压，dBFS 参考数字满刻度，dBu 和 dBV 参考模拟电压，LUFS 则用于描述节目响度。理解这些单位的关键，是先问“相对于什么参考值”。",
            en: "Many audio units include dB, but they are not the same thing. dB itself is a logarithmic ratio between two quantities; the suffix defines the reference: dBSPL refers to acoustic pressure, dBFS to digital full scale, dBu and dBV to analog voltage, and LUFS to program loudness. The key question is always: relative to what reference?"
          },
          keyConcepts: [
            { zh: "dB 不是绝对单位，必须知道参考点。20 dB SPL、-20 dBFS 和 +20 dBu 不能直接比较大小。", en: "dB is not absolute without a reference. 20 dB SPL, -20 dBFS, and +20 dBu cannot be directly compared." },
            { zh: "dBFS 的 0 dBFS 是数字满刻度上限，正常数字音频电平通常是负数，超过 0 dBFS 往往会削波。", en: "0 dBFS is digital full scale, so normal digital levels are usually negative; exceeding 0 dBFS often clips." },
            { zh: "dBSPL 关注空气中的声压级，常用于扬声器、噪声和听力安全；94 dB SPL 常对应 1 Pa 声压。", en: "dBSPL describes acoustic sound pressure, used for speakers, noise, and hearing safety; 94 dB SPL corresponds to 1 Pa pressure." },
            { zh: "dBu 和 dBV 是模拟电压单位：0 dBu = 0.775 Vrms，0 dBV = 1 Vrms，常用于线路电平和专业/消费设备接口。", en: "dBu and dBV are analog voltage units: 0 dBu = 0.775 Vrms and 0 dBV = 1 Vrms, common for line level and pro/consumer interfaces." },
            { zh: "LUFS 加入人耳频率权重和时间积分，更适合描述一段节目整体听起来有多响。", en: "LUFS includes perceptual weighting and time integration, making it better for how loud a program feels overall." }
          ],
          termExplanations: [
            {
              name: { zh: "dB", en: "dB" },
              explanation: {
                zh: "dB 是对数比例单位，用来表示两个量的相对大小。电压、电平这类幅度比常用 20×log10，功率比常用 10×log10。没有参考点时，单独说“多少 dB”通常是不完整的。",
                en: "dB is a logarithmic ratio. Amplitude ratios such as voltage often use 20 x log10, while power ratios use 10 x log10. Saying only 'some dB' is usually incomplete without a reference."
              }
            },
            {
              name: { zh: "dBSPL", en: "dBSPL" },
              explanation: {
                zh: "dBSPL 是声压级，参考值是 20 µPa，接近人耳在 1 kHz 附近的听阈。它用来描述空气中的声音强弱，例如环境噪声、扬声器最大声压和听力安全。",
                en: "dBSPL is sound pressure level, referenced to 20 uPa, near the threshold of hearing around 1 kHz. It describes acoustic sound strength, such as environmental noise, speaker maximum SPL, and hearing safety."
              }
            },
            {
              name: { zh: "dBFS", en: "dBFS" },
              explanation: {
                zh: "dBFS 是数字音频相对于满刻度的电平。0 dBFS 是系统能表示的最大数字幅度，-6 dBFS 约表示幅度减半，录音和混音常保留一定 headroom 避免削波。",
                en: "dBFS is digital level relative to full scale. 0 dBFS is the maximum representable digital amplitude, -6 dBFS is roughly half amplitude, and recording/mixing often leaves headroom to avoid clipping."
              }
            },
            {
              name: { zh: "dBu / dBV", en: "dBu / dBV" },
              explanation: {
                zh: "dBu 和 dBV 描述模拟电压电平。0 dBu = 0.775 Vrms，0 dBV = 1 Vrms。专业线路电平常说 +4 dBu，消费设备常见 -10 dBV。",
                en: "dBu and dBV describe analog voltage level. 0 dBu = 0.775 Vrms and 0 dBV = 1 Vrms. Professional line level is often +4 dBu, while consumer gear often uses -10 dBV."
              }
            },
            {
              name: { zh: "LUFS", en: "LUFS" },
              explanation: {
                zh: "LUFS 是响度单位，常用于节目响度标准化。它不是简单峰值，而是考虑人耳频率敏感度和时间积分，适合比较歌曲、视频、播客或直播整体响度。",
                en: "LUFS is a loudness unit used for program loudness normalization. It is not a simple peak value; it uses perceptual weighting and time integration, useful for comparing music, video, podcasts, or streams."
              }
            },
            {
              name: { zh: "Hz / kHz", en: "Hz / kHz" },
              explanation: {
                zh: "Hz 表示每秒次数。20 Hz 到 20 kHz 常用来描述人耳可听频率范围；44.1 kHz 或 48 kHz 描述数字音频每秒采样次数。",
                en: "Hz means cycles or events per second. 20 Hz to 20 kHz often describes human hearing range; 44.1 kHz or 48 kHz describes digital audio samples per second."
              }
            },
            {
              name: { zh: "bit / sample / ms", en: "bit / sample / ms" },
              explanation: {
                zh: "bit 常用于位深或码率，sample 是一个采样点，ms 是毫秒，常用于延迟和 buffer 长度。例如 48 kHz 下 480 samples 对应 10 ms。",
                en: "bit is used for bit depth or bitrate, sample is one sampled point, and ms is milliseconds, often used for latency and buffer length. For example, at 48 kHz, 480 samples equal 10 ms."
              }
            }
          ],
          lab: {
            type: "audio-units",
            title: { zh: "声音与音频单位实验室", en: "Sound and Audio Units Lab" },
            description: {
              zh: "进入独立界面查看 dBSPL、dBFS、dBu、dBV、LUFS、Hz、bit、sample 和 ms 的参考点、典型范围和换算关系。",
              en: "Open an independent lab to inspect references, typical ranges, and conversion relationships for dBSPL, dBFS, dBu, dBV, LUFS, Hz, bit, sample, and ms."
            },
            buttonLabel: { zh: "打开声音与音频单位实验室", en: "Open sound and audio units lab" }
          },
          misconception: {
            zh: "看到 dB 不能默认它们能直接比较。声压、电压、数字满刻度和节目响度的参考点不同，必须先看后缀和测量场景。",
            en: "Do not assume all dB values are directly comparable. Acoustic pressure, analog voltage, digital full scale, and program loudness use different references, so check the suffix and measurement context first."
          },
          contentDirection: {
            zh: "适合扩展为单位速查表、参考点对照图、dBu/dBV 电压换算、dBFS headroom 图和 samples/ms 延迟换算工具。",
            en: "This can expand into a unit cheat sheet, reference comparison diagram, dBu/dBV voltage conversion, dBFS headroom chart, and samples/ms latency calculator."
          }
        }
      },
      {
        title: { zh: "数字音频基础", en: "Digital Audio Basics" },
        summary: {
          zh: "解释采样、量化、编码，以及采样率和位深对音质的影响。",
          en: "Explain sampling, quantization, encoding, and how sample rate and bit depth affect audio quality."
        },
        bullets: [
          { zh: "采样定理", en: "Sampling theorem" },
          { zh: "采样率、位深、动态范围", en: "Sample rate, bit depth, dynamic range" },
          { zh: "WAV、MP3、AAC、FLAC、Opus", en: "WAV, MP3, AAC, FLAC, Opus" }
        ],
        detail: {
          explanation: {
            zh: "数字音频把连续的声波转换成一串离散数字。采样率决定每秒记录多少个点，位深决定每个点能表达多细的幅度变化，编码格式则决定这些数字如何保存、压缩和传输。",
            en: "Digital audio turns a continuous waveform into discrete numbers. Sample rate controls how many points are captured per second, bit depth controls amplitude precision, and the encoding format defines how those numbers are stored, compressed, and transmitted."
          },
          keyConcepts: [
            { zh: "采样率决定时间轴上的记录密度，常见音乐和视频音频会使用 44.1 kHz 或 48 kHz。", en: "Sample rate determines density along the time axis; music and video commonly use 44.1 kHz or 48 kHz." },
            { zh: "奈奎斯特采样定理说明采样率至少要高于最高有效频率的两倍，采样前通常需要抗混叠滤波。", en: "The Nyquist theorem says the sample rate must be more than twice the highest useful frequency, so anti-alias filtering is usually needed before sampling." },
            { zh: "位深影响量化噪声和理论动态范围，16-bit 常用于发行，24-bit 常用于录音和制作。", en: "Bit depth affects quantization noise and theoretical dynamic range; 16-bit is common for delivery, while 24-bit is common for recording and production." },
            { zh: "编码把采样值组织成文件或码流，PCM 保留原始采样，FLAC 无损压缩，MP3、AAC、Opus 有损压缩。", en: "Encoding organizes samples into files or streams: PCM preserves raw samples, FLAC compresses losslessly, and MP3, AAC, and Opus compress lossily." }
          ],
          termExplanations: [
            {
              name: { zh: "采样", en: "Sampling" },
              explanation: {
                zh: "采样把连续时间中的模拟波形按固定时间间隔记录成一个个离散点。采样率越高，每秒记录的点越多，时间细节越容易保留；采样率不足时，高频内容可能被误判成低频，这叫混叠。",
                en: "Sampling records a continuous-time analog waveform as discrete points at fixed time intervals. A higher sample rate captures more points per second and preserves time detail more easily; if it is too low, high-frequency content can appear as a false lower frequency, called aliasing."
              }
            },
            {
              name: { zh: "量化", en: "Quantization" },
              explanation: {
                zh: "量化把连续幅度映射到有限个数字等级。位深越高，可用等级越多，量化误差越小，理论动态范围越大；位深较低时，波形会变成更明显的阶梯，并产生更容易听到的量化噪声。",
                en: "Quantization maps continuous amplitude to a finite set of numeric levels. Higher bit depth provides more levels, lower quantization error, and wider theoretical dynamic range; low bit depth creates more obvious stair-steps and more audible quantization noise."
              }
            },
            {
              name: { zh: "编码", en: "Encoding" },
              explanation: {
                zh: "编码决定这些采样值如何组织、封装、压缩和传输。PCM 不是压缩算法，而是把每个量化后的采样值按固定字长顺序写成二进制样本；WAV 常封装 PCM 原始采样，FLAC 做无损压缩，MP3、AAC、Opus 会进一步做感知压缩。",
                en: "Encoding defines how sample values are organized, wrapped, compressed, and transmitted. PCM is not a compression algorithm; it writes each quantized sample as a fixed-width binary word in sequence. WAV often wraps raw PCM, FLAC compresses losslessly, while MP3, AAC, and Opus add perceptual compression."
              }
            },
            {
              name: { zh: "采样率", en: "Sample rate" },
              explanation: {
                zh: "采样率是每秒采样次数，单位是 Hz。44.1 kHz 表示每秒 44100 个采样点；48 kHz 常用于视频、会议和系统音频。采样率提高会增加数据量，但不自动等于更好听。",
                en: "Sample rate is the number of samples per second, measured in Hz. 44.1 kHz means 44,100 samples per second; 48 kHz is common for video, conferencing, and system audio. Raising it increases data size but does not automatically sound better."
              }
            },
            {
              name: { zh: "位深", en: "Bit depth" },
              explanation: {
                zh: "位深表示每个采样点用多少位二进制描述幅度。n-bit 可以表示 2 的 n 次方个幅度等级。16-bit 理论动态范围约 96 dB，24-bit 理论动态范围约 144 dB。",
                en: "Bit depth is how many binary bits describe each sample's amplitude. n-bit audio can represent 2^n amplitude levels. 16-bit has about 96 dB theoretical dynamic range, while 24-bit has about 144 dB."
              }
            },
            {
              name: { zh: "码率", en: "Bitrate" },
              explanation: {
                zh: "码率表示每秒音频数据量，通常用 kbps 表示。无压缩 PCM 的码率由采样率、位深和通道数决定；有损编码的码率还受到编码器算法和内容复杂度影响。",
                en: "Bitrate is the amount of audio data per second, often shown in kbps. Uncompressed PCM bitrate comes from sample rate, bit depth, and channel count; lossy codec bitrate is also affected by codec design and content complexity."
              }
            },
            {
              name: { zh: "PCM", en: "PCM" },
              explanation: {
                zh: "PCM 的完整过程是：先采样得到时间点，再量化得到幅度等级，最后把每个等级转换成固定位数的整数样本。播放器按采样率、位深和声道顺序读取这些样本，就能还原出连续播放的数字音频流。",
                en: "PCM works by sampling time points, quantizing amplitude levels, then converting each level into a fixed-width integer sample. Playback reads those samples according to sample rate, bit depth, and channel order to reconstruct a continuous digital audio stream."
              }
            }
          ],
          lab: {
            type: "sampling-quantization",
            title: { zh: "采样、量化与编码实验室", en: "Sampling, Quantization, and Encoding Lab" },
            description: {
              zh: "进入独立界面调节采样率、位深和输入频率，观察采样点、量化阶梯、PCM 编码和常见压缩格式如何连接。",
              en: "Open an independent lab to adjust sample rate, bit depth, and input frequency while connecting samples, quantized steps, PCM encoding, and common compressed formats."
            },
            buttonLabel: { zh: "打开采样、量化与编码实验室", en: "Open sampling, quantization, and encoding lab" }
          },
          misconception: {
            zh: "采样率越高并不一定代表最终听感越好，码率相同也不代表不同编码器音质相同；录音、混音、播放链路、编码器实现和内容类型往往同样重要。",
            en: "A higher sample rate does not automatically mean better perceived quality, and equal bitrate does not mean equal quality across codecs; recording, mixing, playback hardware, codec implementation, and content type often matter just as much."
          },
          contentDirection: {
            zh: "适合做采样点可视化、量化阶梯图和不同编码格式对比表，解释音质、文件大小和延迟之间的取舍。",
            en: "This can become a sampling visualization, quantization staircase diagram, and codec comparison table explaining trade-offs among quality, file size, and latency."
          }
        }
      },
      {
        title: { zh: "听感与指标", en: "Listening Perception and Metrics" },
        summary: {
          zh: "把响度、音色、空间感等主观听感和客观指标关联起来。",
          en: "Connect loudness, timbre, clarity, and spatial perception with measurable indicators."
        },
        bullets: [
          { zh: "响度、音色、清晰度", en: "Loudness, timbre, clarity" },
          { zh: "频响、SPL、THD", en: "Frequency response, SPL, THD" },
          { zh: "主观评价与客观测量", en: "Subjective evaluation and objective measurement" }
        ],
        detail: {
          explanation: {
            zh: "听感是人对声音的综合判断，受到响度、频率分布、瞬态、失真、空间反射和个人经验影响。工程指标能帮助定位问题，但需要结合实际试听和场景目标解读。",
            en: "Listening perception is a combined judgment shaped by loudness, frequency balance, transients, distortion, spatial reflections, and personal experience. Engineering metrics help locate issues, but they must be interpreted with listening tests and product goals."
          },
          keyConcepts: [
            { zh: "响度和声压级不同，LUFS 更适合描述节目整体响度。", en: "Loudness and sound pressure level are different; LUFS is better for program loudness." },
            { zh: "频响曲线描述不同频率的能量变化，但不能单独决定音质。", en: "Frequency response describes energy variation by frequency, but it does not determine quality alone." },
            { zh: "THD、SNR、延迟、串扰等指标分别反映失真、噪声、同步和通道隔离问题。", en: "THD, SNR, latency, and crosstalk describe distortion, noise, synchronization, and channel separation issues." }
          ],
          termExplanations: [
            {
              name: { zh: "响度", en: "Loudness" },
              explanation: {
                zh: "响度是人耳主观感受到的声音大小，不等同于瞬时声压。SPL 常用于物理声压测量，LUFS 更适合描述节目整体响度，播客、视频和流媒体通常会按 LUFS 做响度归一。",
                en: "Loudness is perceived sound level, not the same as instantaneous pressure. SPL measures physical sound pressure, while LUFS is better for program loudness and is commonly used for podcasts, video, and streaming normalization."
              }
            },
            {
              name: { zh: "频响曲线", en: "Frequency response" },
              explanation: {
                zh: "频响曲线描述设备或处理链对不同频率的增强或衰减。高频偏多可能听起来明亮甚至刺耳，低中频堆积可能显得浑浊，低频不足则容易单薄。",
                en: "Frequency response shows how a device or processing chain boosts or cuts different frequencies. More treble can sound bright or harsh, low-mid buildup can sound muddy, and weak bass can feel thin."
              }
            },
            {
              name: { zh: "动态范围", en: "Dynamic range" },
              explanation: {
                zh: "动态范围描述最小可听细节和最大声音之间的跨度。压缩器会缩小动态范围，让声音更稳定、更靠前，但过度压缩会让音乐失去起伏和冲击力。",
                en: "Dynamic range is the span between quiet details and loud peaks. Compression reduces that range, making sound steadier and more forward, but too much compression removes contrast and impact."
              }
            },
            {
              name: { zh: "SNR", en: "SNR" },
              explanation: {
                zh: "SNR 是信噪比，表示有效信号与底噪之间的差距。SNR 越低，底噪、嘶声或电流声越容易被听见，语音清晰度和安静段质量会下降。",
                en: "SNR is signal-to-noise ratio, the gap between useful signal and noise floor. Lower SNR makes hiss or electrical noise easier to hear and reduces speech clarity and quiet-section quality."
              }
            },
            {
              name: { zh: "THD / THD+N", en: "THD / THD+N" },
              explanation: {
                zh: "THD 描述非线性失真产生的谐波成分，THD+N 还把噪声一起算入。少量谐波可能带来温暖感，过多会变成破音、毛刺或刺耳感。",
                en: "THD describes harmonic components caused by nonlinear distortion, while THD+N also includes noise. A little harmonic content may feel warm; too much becomes clipping, grit, or harshness."
              }
            },
            {
              name: { zh: "声像与空间感", en: "Stereo image and space" },
              explanation: {
                zh: "声像来自左右声道的电平差、时间差和频率差，空间感还受混响和早期反射影响。串扰、相位问题或过强混响都会让定位变糊。",
                en: "Stereo image comes from level, timing, and frequency differences between channels; space also depends on reverberation and early reflections. Crosstalk, phase issues, or too much reverb can blur localization."
              }
            }
          ],
          lab: {
            type: "listening-metrics",
            title: { zh: "听感与指标实验室", en: "Listening Metrics Lab" },
            description: {
              zh: "进入独立界面切换明亮、浑浊、底噪、失真、动态压缩和声像偏移，查看对应指标并播放短音效对照。",
              en: "Open an independent lab to switch between brightness, muddiness, noise floor, distortion, compression, and stereo shift while viewing metrics and hearing short examples."
            },
            buttonLabel: { zh: "打开听感与指标实验室", en: "Open listening metrics lab" }
          },
          misconception: {
            zh: "一个漂亮的指标不能代表完整听感；同样的曲线在不同房间、耳机佩戴方式和内容类型下可能听起来完全不同。",
            en: "One impressive metric cannot represent the whole listening experience; the same curve can sound different across rooms, headphone fits, and content types."
          },
          contentDirection: {
            zh: "适合扩展为指标速查卡、主观听感词典和真实测量案例，帮助读者建立“听到什么，对应可能是什么指标”的判断路径。",
            en: "This can become a metric cheat sheet, listening vocabulary guide, and measurement case study that maps perceived problems to likely indicators."
          }
        }
      }
    ]
  },
  {
    id: "hardware",
    icon: Headphones,
    accent: "#c46f2a",
    title: { zh: "音频硬件", en: "Audio Hardware" },
    description: {
      zh: "从采集、转换、放大到播放理解完整硬件链路。",
      en: "Understand the hardware chain from capture and conversion to amplification and playback."
    },
    topics: [
      {
        title: { zh: "麦克风", en: "Microphones" },
        summary: {
          zh: "从换能原理、类型、参数和使用场景理解麦克风如何把声音变成电信号。",
          en: "Understand how microphones convert sound into electrical signals through transducer principles, types, specifications, and use cases."
        },
        bullets: [
          { zh: "换能原理与常见麦克风类型", en: "Transducer principle and microphone types" },
          { zh: "灵敏度、频响、SNR、最大 SPL", en: "Sensitivity, frequency response, SNR, maximum SPL" },
          { zh: "指向性、距离、增益和阵列拾音", en: "Polar pattern, distance, gain, and array pickup" }
        ],
        detail: {
          explanation: {
            zh: "麦克风是把空气中的声压变化转换成电信号的换能器。声波推动振膜振动，振膜运动再通过线圈、电容变化、驻极体材料或 MEMS 结构变成电压或数字脉冲流，随后经过前置放大、滤波和 ADC 进入数字音频系统。",
            en: "A microphone is a transducer that converts air-pressure variation into an electrical signal. Sound moves a diaphragm; that motion is converted by a coil, capacitance change, electret material, or MEMS structure into voltage or a digital pulse stream, then passes through preamp, filtering, and ADC stages."
          },
          keyConcepts: [
            { zh: "动圈麦耐用、抗大声压，适合舞台和近讲；电容麦灵敏、细节多，常用于录音棚和播客。", en: "Dynamic microphones are durable and tolerate high SPL, useful on stage and close speech; condenser microphones are sensitive and detailed, common in studios and podcasts." },
            { zh: "驻极体和 MEMS 麦克风体积小、成本低，广泛用于手机、耳机、会议设备、IoT 和车载语音。", en: "Electret and MEMS microphones are compact and low-cost, widely used in phones, earbuds, conferencing devices, IoT, and vehicle voice systems." },
            { zh: "灵敏度、等效自噪声、SNR、最大 SPL、频响和指向性共同决定可录到的声音质量。", en: "Sensitivity, equivalent self-noise, SNR, maximum SPL, frequency response, and polar pattern together shape capture quality." },
            { zh: "距离、房间反射、安装位置和增益设置经常比麦克风价格更直接影响录音结果。", en: "Distance, room reflections, placement, and gain staging often affect the recording more directly than microphone price." }
          ],
          termExplanations: [
            {
              name: { zh: "换能过程", en: "Transduction" },
              explanation: {
                zh: "声波先推动振膜运动，振膜运动再被转换成电信号。动圈麦利用线圈在磁场中运动产生电压；电容麦利用振膜和背板之间的电容变化；MEMS 麦则把微型机械结构和电子电路集成在芯片中。",
                en: "Sound first moves a diaphragm, and that movement becomes an electrical signal. Dynamic mics generate voltage from a moving coil in a magnetic field; condenser mics use capacitance changes; MEMS mics integrate micro-mechanical structures and electronics on a chip."
              }
            },
            {
              name: { zh: "动圈麦克风", en: "Dynamic microphone" },
              explanation: {
                zh: "动圈麦结构像小型反向扬声器，耐用、抗摔、能承受很高声压，不需要幻象电源。它通常灵敏度较低，需要较多前级增益，适合舞台、人声近讲、鼓和吉他箱体。",
                en: "A dynamic mic works like a small speaker in reverse. It is rugged, handles high SPL, and needs no phantom power. It is usually less sensitive and needs more preamp gain, making it useful for stage vocals, close speech, drums, and guitar cabinets."
              }
            },
            {
              name: { zh: "电容麦克风", en: "Condenser microphone" },
              explanation: {
                zh: "电容麦利用振膜和背板组成电容，需要极化电压和内部放大电路，常通过 48V 幻象电源供电。它灵敏度高、瞬态和高频细节好，但更容易收进房间噪声和反射。",
                en: "A condenser mic uses a diaphragm and backplate as a capacitor, requiring polarization and active electronics, often powered by 48V phantom power. It is sensitive and detailed, but also captures more room noise and reflections."
              }
            },
            {
              name: { zh: "驻极体 / MEMS", en: "Electret / MEMS" },
              explanation: {
                zh: "驻极体麦把电荷固化在材料中，降低供电需求；MEMS 麦把机械振膜、前端电路和封装做成芯片级器件。它们适合小体积、多麦阵列和量产设备，数字 MEMS 常直接输出 PDM 或 I2S 数据。",
                en: "Electret mics store charge in material, reducing bias requirements; MEMS mics package diaphragm, front-end electronics, and housing as chip-scale parts. They suit compact devices, arrays, and mass production, with digital MEMS often outputting PDM or I2S."
              }
            },
            {
              name: { zh: "灵敏度", en: "Sensitivity" },
              explanation: {
                zh: "灵敏度表示在标准声压下麦克风输出多大的电平，常用 mV/Pa 或 dBV/Pa 表示。灵敏度高不等于音质更好，它只说明同样声音下输出更大，后端增益需求更低。",
                en: "Sensitivity describes output level at a standard sound pressure, often in mV/Pa or dBV/Pa. Higher sensitivity does not mean better quality; it means more output for the same sound and less required downstream gain."
              }
            },
            {
              name: { zh: "频率响应", en: "Frequency response" },
              explanation: {
                zh: "频率响应描述麦克风对不同频率的拾取差异。人声麦常会有低频近讲增强或高频存在感提升；测量麦则追求更平直，用来反映真实声场。",
                en: "Frequency response shows how a mic captures different frequencies. Vocal mics may add proximity bass or presence boost; measurement mics aim to be flatter to represent the real sound field."
              }
            },
            {
              name: { zh: "指向性", en: "Polar pattern" },
              explanation: {
                zh: "指向性描述麦克风从不同方向收声的强弱。全指向各方向接近一致，心形主要收前方并抑制后方，8 字形收前后并抑制侧面。它直接影响抗噪、离轴音色和多人拾音。",
                en: "Polar pattern describes pickup strength by direction. Omni captures nearly all directions, cardioid favors the front and rejects the rear, and figure-8 captures front/back while rejecting the sides. It affects noise rejection, off-axis tone, and multi-person capture."
              }
            },
            {
              name: { zh: "自噪声 / SNR", en: "Self-noise / SNR" },
              explanation: {
                zh: "自噪声是麦克风自身电子和热噪声造成的底噪，SNR 表示目标声和噪声之间的差距。安静录音、人声远场和会议拾音尤其依赖低自噪声和高 SNR。",
                en: "Self-noise is the mic's own electronic and thermal noise floor, while SNR is the gap between target sound and noise. Quiet recording, far-field voice, and conferencing depend strongly on low self-noise and high SNR."
              }
            },
            {
              name: { zh: "最大 SPL", en: "Maximum SPL" },
              explanation: {
                zh: "最大 SPL 表示麦克风在失真达到规定阈值前能承受多大的声压。鼓、铜管、吉他箱体和近距离喊叫需要更高最大 SPL，否则前端可能过载产生破音。",
                en: "Maximum SPL indicates how loud a source can be before distortion reaches a specified threshold. Drums, brass, guitar cabinets, and close shouting need higher maximum SPL to avoid front-end overload."
              }
            },
            {
              name: { zh: "幻象电源 48V", en: "48V phantom power" },
              explanation: {
                zh: "48V 幻象电源通过平衡线给电容麦内部电路供电。它不是音质增强开关，动圈麦通常不需要；错误接线或不兼容设备可能带来噪声或风险。",
                en: "48V phantom power feeds condenser mic electronics through balanced cables. It is not a quality boost switch, and dynamic mics usually do not need it; wrong wiring or incompatible gear can cause noise or risk."
              }
            },
            {
              name: { zh: "麦克风阵列", en: "Microphone array" },
              explanation: {
                zh: "多个麦克风可以利用到达时间差、相位差和电平差判断方向，并通过波束成形增强目标声源、抑制噪声和回声。手机、会议机、智能音箱和车载语音常用阵列。",
                en: "Multiple microphones can use time, phase, and level differences to estimate direction, then beamform toward the target while suppressing noise and echo. Phones, conference devices, smart speakers, and cars commonly use arrays."
              }
            }
          ],
          lab: {
            type: "microphone",
            title: { zh: "麦克风指向性与拾音实验室", en: "Microphone Pickup Lab" },
            description: {
              zh: "进入独立界面切换全指向、心形和 8 字形，拖动声源角度、距离和增益，观察拾音强度、噪声和削波风险。",
              en: "Open an independent lab to switch omni, cardioid, and figure-8 patterns, then adjust source angle, distance, and gain to see pickup strength, noise, and clipping risk."
            },
            buttonLabel: { zh: "打开麦克风实验室", en: "Open microphone lab" }
          },
          misconception: {
            zh: "更贵的麦克风不能自动解决糟糕声学环境；房间混响、安装位置、拾音距离、结构噪声和前级增益经常比麦克风型号更关键。",
            en: "A more expensive microphone does not automatically fix bad acoustics; room reverberation, placement, pickup distance, mechanical noise, and preamp gain are often more important than the model."
          },
          contentDirection: {
            zh: "适合继续扩展为麦克风类型对比表、指向性极坐标图、近讲效应示例、阵列拾音动画和真实录音问题排查清单。",
            en: "This can expand into microphone type comparisons, polar diagrams, proximity-effect examples, array pickup animations, and recording troubleshooting checklists."
          }
        }
      },
      {
        title: { zh: "ADC / DAC / Codec", en: "ADC / DAC / Codec" },
        summary: {
          zh: "理解模拟音频如何采样成数字、数字音频如何重建为模拟，以及音频 Codec 芯片如何整合整条链路。",
          en: "Understand how analog audio becomes digital samples, how digital audio is reconstructed to analog, and how audio codec chips integrate the whole chain."
        },
        bullets: [
          { zh: "ADC 采样、量化、抗混叠和输入范围", en: "ADC sampling, quantization, anti-aliasing, and input range" },
          { zh: "DAC 重建、保持、低通滤波和输出驱动", en: "DAC reconstruction, hold, low-pass filtering, and output drive" },
          { zh: "Codec 芯片、PGA、混音、I2S/PDM/TDM、时钟和电源噪声", en: "Codec chips, PGA, mixing, I2S/PDM/TDM, clocking, and power noise" }
        ],
        detail: {
          explanation: {
            zh: "ADC 把麦克风、线路输入等模拟电压按固定时钟采样并量化成数字样本；DAC 把数字样本转换成阶梯状或调制后的模拟信号，再经过重建滤波和输出级驱动耳机、功放或线路输出。音频 Codec 芯片通常把 ADC、DAC、PGA、耳机放大、混音、数字滤波、时钟和 I2S/PDM/TDM 接口集成在一起，是嵌入式音频链路的核心器件。",
            en: "An ADC samples and quantizes analog voltage from microphones or line inputs into digital samples. A DAC converts digital samples into stepped or modulated analog signals, then uses reconstruction filtering and output stages to drive headphones, amplifiers, or line outputs. An audio codec chip often integrates ADCs, DACs, PGA, headphone amps, mixers, digital filters, clocks, and I2S/PDM/TDM interfaces."
          },
          keyConcepts: [
            { zh: "ADC 之前的模拟前端决定输入电平、增益和抗混叠；输入过大会削波，输入太小会让底噪占比变高。", en: "The analog front end before an ADC sets input level, gain, and anti-aliasing; too much level clips, while too little level exposes noise." },
            { zh: "DAC 之后的重建滤波、输出阻抗、负载能力和耳机/功放匹配决定实际播放质量。", en: "After a DAC, reconstruction filtering, output impedance, load drive, and headphone/amplifier matching shape playback quality." },
            { zh: "Codec 芯片不是 MP3/AAC 压缩算法，而是集成音频转换、模拟通路、数字接口和控制寄存器的硬件芯片。", en: "A codec chip is not an MP3/AAC compression algorithm; it is hardware integrating conversion, analog paths, digital interfaces, and control registers." },
            { zh: "采样时钟、PLL、MCLK/BCLK/LRCLK 配置错误会造成采样率不准、变调、爆音、丢帧或左右声道错位。", en: "Wrong sample clocks, PLL, MCLK/BCLK/LRCLK settings can cause sample-rate errors, pitch shift, pops, dropouts, or channel misalignment." }
          ],
          termExplanations: [
            {
              name: { zh: "ADC", en: "ADC" },
              explanation: {
                zh: "ADC 是模数转换器，把连续的模拟电压转换成离散数字样本。音频 ADC 通常包含采样保持、量化、数字滤波和抽取，现代芯片多采用 Σ-Δ 架构以获得较高动态范围。",
                en: "An ADC converts continuous analog voltage into discrete digital samples. Audio ADCs usually include sample-and-hold, quantization, digital filtering, and decimation; modern parts often use sigma-delta architectures for high dynamic range."
              }
            },
            {
              name: { zh: "DAC", en: "DAC" },
              explanation: {
                zh: "DAC 是数模转换器，把数字样本重建为模拟电压或电流。音频 DAC 通常经过过采样、噪声整形、模拟低通滤波和输出缓冲，最后驱动线路输出、耳机或功放。",
                en: "A DAC reconstructs digital samples into analog voltage or current. Audio DACs usually use oversampling, noise shaping, analog low-pass filtering, and output buffering before driving line out, headphones, or amplifiers."
              }
            },
            {
              name: { zh: "音频 Codec 芯片", en: "Audio codec chip" },
              explanation: {
                zh: "硬件 Codec 芯片把 ADC、DAC、PGA、耳机放大、麦克风偏置、混音矩阵、音量控制和数字接口集成在一起。它负责硬件通路，不等同于 MP3、AAC、Opus 这类压缩编码算法。",
                en: "A hardware codec chip integrates ADCs, DACs, PGA, headphone amps, mic bias, mixers, volume controls, and digital interfaces. It handles hardware paths, not compression formats such as MP3, AAC, or Opus."
              }
            },
            {
              name: { zh: "PGA / 前级增益", en: "PGA / preamp gain" },
              explanation: {
                zh: "PGA 是可编程增益放大器，用来把麦克风或线路输入调整到 ADC 合适范围。增益太小会浪费动态范围，增益太大则可能削波并把噪声一起放大。",
                en: "A PGA is a programmable gain amplifier that brings mic or line input into the ADC's usable range. Too little gain wastes dynamic range; too much clips and amplifies noise."
              }
            },
            {
              name: { zh: "抗混叠滤波", en: "Anti-alias filter" },
              explanation: {
                zh: "采样前需要限制高于奈奎斯特频率的内容，否则高频会折叠成错误低频。现代音频 ADC 通常用模拟前端加过采样数字滤波共同完成抗混叠。",
                en: "Before sampling, content above the Nyquist frequency must be limited or it folds into false lower frequencies. Modern audio ADCs combine analog front-end filtering with oversampled digital filtering."
              }
            },
            {
              name: { zh: "重建滤波", en: "Reconstruction filter" },
              explanation: {
                zh: "DAC 输出后会出现采样镜像和阶梯成分，需要低通重建滤波去除超声频镜像，让输出更接近连续模拟波形。",
                en: "DAC output contains sampling images and stepped components. A low-pass reconstruction filter removes ultrasonic images and makes the output closer to a continuous analog waveform."
              }
            },
            {
              name: { zh: "动态范围 / SNR", en: "Dynamic range / SNR" },
              explanation: {
                zh: "动态范围描述最大不失真信号和噪声底之间的跨度。ADC/DAC 的 ENOB、SNR、THD+N、模拟布局和电源噪声都会影响真实可用动态范围。",
                en: "Dynamic range is the span between maximum unclipped signal and noise floor. ENOB, SNR, THD+N, analog layout, and power noise all affect usable converter range."
              }
            },
            {
              name: { zh: "时钟与抖动", en: "Clocking and jitter" },
              explanation: {
                zh: "音频采样依赖稳定时钟。抖动是采样或重建时刻的微小偏差，严重时会带来噪声、失真或声像模糊；实际系统还要正确配置 MCLK、BCLK、LRCLK 和 PLL。",
                en: "Audio conversion depends on stable clocks. Jitter is tiny timing error in sampling or reconstruction; when severe it can add noise, distortion, or image blur. Systems also need correct MCLK, BCLK, LRCLK, and PLL configuration."
              }
            },
            {
              name: { zh: "I2S / PDM / TDM", en: "I2S / PDM / TDM" },
              explanation: {
                zh: "I2S 常用于双声道 PCM 音频，PDM 常见于数字 MEMS 麦克风，TDM 可在一组时钟线上承载多路音频。接口格式、位宽、左右对齐和主从时钟必须匹配。",
                en: "I2S commonly carries stereo PCM, PDM is common for digital MEMS microphones, and TDM carries multiple channels on shared clocks. Format, word length, alignment, and clock master/slave roles must match."
              }
            },
            {
              name: { zh: "电源与模拟布局", en: "Power and analog layout" },
              explanation: {
                zh: "Codec 周围的电源纹波、地回路、模拟/数字隔离、参考电压和去耦电容会直接影响噪声、串扰和爆音。数据手册推荐布局通常非常关键。",
                en: "Power ripple, ground loops, analog/digital separation, voltage references, and decoupling near a codec directly affect noise, crosstalk, and pops. Datasheet layout guidance is often critical."
              }
            }
          ],
          lab: {
            type: "codec-hardware",
            title: { zh: "ADC / DAC / Codec 实验室", en: "ADC / DAC / Codec Lab" },
            description: {
              zh: "进入独立界面切换 ADC 采集、DAC 重建和 Codec 芯片链路，调节输入电平、采样率、位深和时钟抖动，观察削波、量化噪声、重建滤波和接口数据流。",
              en: "Open an independent lab to switch ADC capture, DAC reconstruction, and codec-chip paths, then adjust input level, sample rate, bit depth, and clock jitter to observe clipping, quantization noise, reconstruction filtering, and interface flow."
            },
            buttonLabel: { zh: "打开 ADC / DAC / Codec 实验室", en: "Open ADC / DAC / Codec lab" }
          },
          misconception: {
            zh: "硬件 Codec 芯片和 MP3、AAC 这类编解码算法不是同一个概念；前者是音频转换、模拟通路和接口芯片，后者是压缩格式算法。",
            en: "A hardware codec chip is not the same thing as an MP3 or AAC codec algorithm; the former handles conversion, analog paths, and interfaces, while the latter compresses audio data."
          },
          contentDirection: {
            zh: "适合继续扩展为从麦克风到扬声器的硬件链路图、Codec 寄存器配置示例、I2S/PDM/TDM 时序图，以及噪声、失真、爆音和时钟问题排查清单。",
            en: "This can expand into microphone-to-speaker hardware chain diagrams, codec register examples, I2S/PDM/TDM timing diagrams, and checklists for noise, distortion, pops, and clocking problems."
          }
        }
      },
      {
        title: { zh: "数字音频接口 / 传输协议", en: "Digital Audio Interfaces / Transport Protocols" },
        summary: {
          zh: "理解主控、Codec、数字麦克风、功放和外设之间如何传输音频样本、时钟和多通道数据。",
          en: "Understand how hosts, codecs, digital microphones, amplifiers, and peripherals move audio samples, clocks, and multichannel data."
        },
        bullets: [
          { zh: "I2S / IIS / I²S、TDM、PDM、SPDIF、USB Audio", en: "I2S / IIS / I²S, TDM, PDM, SPDIF, USB Audio" },
          { zh: "MCLK、BCLK、LRCLK、帧同步和主从时钟", en: "MCLK, BCLK, LRCLK, frame sync, and clock master/slave roles" },
          { zh: "声道排布、位宽、对齐方式、延迟和兼容性", en: "Channel layout, word length, alignment, latency, and compatibility" }
        ],
        detail: {
          explanation: {
            zh: "接口协议关注的是芯片和设备之间如何搬运音频样本，而不是声音如何被采样或压缩。ADC、DAC、Codec、数字 MEMS 麦克风、DSP、蓝牙芯片和主控之间通常要约定数据线、时钟线、帧同步、位宽、声道顺序和主从关系，任何一项不匹配都可能导致无声、变调、左右声道错位、噪声或爆音。",
            en: "Interface protocols are about moving audio samples between chips and devices, not about how sound is sampled or compressed. ADCs, DACs, codecs, digital MEMS microphones, DSPs, Bluetooth chips, and hosts must agree on data lines, clocks, frame sync, word length, channel order, and master/slave roles; mismatches can cause silence, pitch errors, swapped channels, noise, or pops."
          },
          keyConcepts: [
            { zh: "I2S/IIS/I²S 主要用于传输已经采样量化后的 PCM 数据，常见于主控和 Codec、DAC、功放之间。", en: "I2S/IIS/I²S carries already sampled and quantized PCM data, commonly between a host and codec, DAC, or amplifier." },
            { zh: "PDM 常见于数字 MEMS 麦克风，传的是高速 1-bit 脉冲密度流，后端需要抽取滤波变成 PCM。", en: "PDM is common for digital MEMS microphones. It carries a high-rate 1-bit pulse-density stream that must be decimated into PCM." },
            { zh: "TDM 适合多通道音频，把多个声道按时隙塞进同一条数据线和同一组时钟。", en: "TDM fits multichannel audio by packing channels into time slots on one data line and shared clocks." },
            { zh: "接口调试要同时检查采样率、位深、左右/帧同步、主从时钟、边沿采样和 DMA buffer 配置。", en: "Interface debugging checks sample rate, bit depth, left/right or frame sync, master/slave clocks, sampling edge, and DMA buffer configuration together." }
          ],
          termExplanations: [
            {
              name: { zh: "I2S / IIS / I²S", en: "I2S / IIS / I²S" },
              explanation: {
                zh: "I2S 是最常见的芯片级数字音频接口之一，也常被写成 IIS 或 I²S。它通常包含 BCLK 位时钟、LRCLK 左右声道时钟和 SD 数据线，可选 MCLK 主时钟。它主要传输 PCM 样本，常用于主控连接 Codec、DAC、ADC、DSP 或数字功放。",
                en: "I2S is one of the most common chip-level digital audio interfaces, also written as IIS or I²S. It usually has BCLK bit clock, LRCLK left/right clock, SD data, and optionally MCLK master clock. It carries PCM samples between hosts, codecs, DACs, ADCs, DSPs, or digital amplifiers."
              }
            },
            {
              name: { zh: "TDM", en: "TDM" },
              explanation: {
                zh: "TDM 是时分复用接口，可以把 4 路、8 路甚至更多声道按固定时隙放进同一条数据线上。会议设备、多麦阵列、车载音频和多通道 DSP 常用 TDM，但帧长、slot 宽度、声道顺序必须严格匹配。",
                en: "TDM uses time slots to place 4, 8, or more channels on one data line. It is common in conferencing devices, microphone arrays, automotive audio, and multichannel DSP systems, but frame length, slot width, and channel order must match exactly."
              }
            },
            {
              name: { zh: "PDM", en: "PDM" },
              explanation: {
                zh: "PDM 是脉冲密度调制，常见于数字 MEMS 麦克风。它不是普通多 bit PCM，而是高速 1-bit 数据流，密度代表瞬时幅度。主控或 Codec 需要用抽取滤波把 PDM 转换成 PCM 后再处理。",
                en: "PDM means pulse-density modulation and is common in digital MEMS microphones. It is not normal multibit PCM; it is a high-rate 1-bit stream where pulse density represents amplitude. A host or codec decimates it into PCM before processing."
              }
            },
            {
              name: { zh: "PCM 接口", en: "PCM interface" },
              explanation: {
                zh: "PCM 接口这个名字在不同芯片手册中含义不完全一致，有时指电话/语音窄带接口，有时泛指同步串行 PCM 传输。看数据手册时要确认帧同步、位宽、对齐方式和是否兼容 I2S/TDM。",
                en: "The term PCM interface varies by datasheet. It can mean a telephony voice interface or a generic synchronous serial PCM transport. Check frame sync, word length, alignment, and whether it is compatible with I2S or TDM."
              }
            },
            {
              name: { zh: "SPDIF", en: "SPDIF" },
              explanation: {
                zh: "SPDIF 常用于消费电子的数字音频输出，可通过同轴或光纤传输立体声 PCM，也可承载压缩环绕声码流。它适合设备间连接，不常用于芯片内部短距离连接。",
                en: "SPDIF is common in consumer digital audio output over coaxial or optical links. It can carry stereo PCM or compressed surround bitstreams. It is useful between devices rather than short chip-to-chip links."
              }
            },
            {
              name: { zh: "USB Audio", en: "USB Audio" },
              explanation: {
                zh: "USB Audio 是电脑、手机和声卡之间常见的外设级音频协议。它不仅传音频样本，还包含设备枚举、端点、同步方式、控制请求、采样率切换和多通道描述。",
                en: "USB Audio is a peripheral-level protocol between computers, phones, and audio interfaces. It carries samples and also handles enumeration, endpoints, synchronization, control requests, sample-rate changes, and multichannel descriptors."
              }
            },
            {
              name: { zh: "MCLK / BCLK / LRCLK", en: "MCLK / BCLK / LRCLK" },
              explanation: {
                zh: "MCLK 是主时钟，BCLK 是每一位数据的时钟，LRCLK 或 FS 用来标记左右声道或帧边界。采样率、位宽和声道数会共同决定这些时钟频率。",
                en: "MCLK is the master clock, BCLK clocks each data bit, and LRCLK or FS marks left/right channels or frame boundaries. Sample rate, word length, and channel count together determine these clock rates."
              }
            },
            {
              name: { zh: "主从时钟", en: "Clock master/slave" },
              explanation: {
                zh: "数字音频链路中必须明确谁输出时钟、谁跟随时钟。两个设备都当主机会打架，两个设备都当从机则没有时钟。复杂系统通常还要统一 PLL 和采样率域。",
                en: "A digital audio link must define who generates clocks and who follows them. Two masters conflict, while two slaves provide no clock. Complex systems also need aligned PLL and sample-rate domains."
              }
            }
          ],
          lab: {
            type: "digital-interface",
            title: { zh: "数字音频接口实验室", en: "Digital Audio Interface Lab" },
            description: {
              zh: "进入独立界面切换 I2S、TDM、PDM、SPDIF 和 USB Audio，观察时钟线、数据线、帧同步、声道 slot、PDM 抽取和 USB 包传输。",
              en: "Open an independent lab to switch I2S, TDM, PDM, SPDIF, and USB Audio while inspecting clock lines, data lines, frame sync, channel slots, PDM decimation, and USB packet transport."
            },
            buttonLabel: { zh: "打开数字音频接口实验室", en: "Open digital audio interface lab" }
          },
          misconception: {
            zh: "I2S/TDM/PDM 不是 MP3、AAC、Opus 这类压缩格式，也不是 ADC/DAC 本身；它们是芯片或设备之间搬运数字音频数据的接口协议。",
            en: "I2S/TDM/PDM are not compression formats like MP3, AAC, or Opus, and they are not ADC/DAC conversion itself; they are interface protocols for transporting digital audio data between chips or devices."
          },
          contentDirection: {
            zh: "后续适合扩展为接口时序图实验室：切换 I2S、TDM、PDM、SPDIF 和 USB Audio，观察时钟线、数据线、帧同步、声道 slot 和常见配置错误。",
            en: "This can later become an interface timing lab: switch I2S, TDM, PDM, SPDIF, and USB Audio to inspect clock lines, data lines, frame sync, channel slots, and common configuration mistakes."
          }
        }
      },
      {
        title: { zh: "功放与扬声器", en: "Amplifiers and Speakers" },
        summary: {
          zh: "覆盖功放类型、扬声器单元、T/S 参数、箱体、分频器和线阵列。",
          en: "Cover amplifier classes, speaker drivers, T/S parameters, enclosures, crossovers, and line arrays."
        },
        bullets: [
          { zh: "Class A / AB / D", en: "Class A / AB / D" },
          { zh: "Thiele-Small 参数、密闭箱和倒相箱", en: "Thiele-Small parameters, sealed and bass-reflex boxes" },
          { zh: "分频阶数、相位对齐、主动/被动分频", en: "Crossover order, phase alignment, active/passive crossovers" },
          { zh: "线阵列扬声器和覆盖控制", en: "Line arrays and coverage control" }
        ],
        detail: {
          explanation: {
            zh: "功放负责把 DAC、Codec 或前级输出的小信号变成能推动扬声器的电压、电流和功率；扬声器再把电能转换成振膜运动和空气声波。实际听感不是由某一个参数决定，而是由功放类型、输出能力、扬声器单元、Thiele-Small 参数、箱体形式、分频阶数、相位对齐、保护算法和声学结构共同决定。",
            en: "An amplifier turns the small signal from a DAC, codec, or preamp into voltage, current, and power that can drive a speaker. The speaker then turns electrical energy into diaphragm motion and air pressure. The listening result depends on amplifier class, output capability, driver design, Thiele-Small parameters, enclosure type, crossover order, phase alignment, protection, and acoustics together."
          },
          keyConcepts: [
            { zh: "功放要提供足够电压摆幅和电流能力；电源电压、负载阻抗、散热和保护策略会限制最大输出。", en: "An amplifier needs enough voltage swing and current capability; supply voltage, load impedance, heat, and protection limit maximum output." },
            { zh: "Class A 线性好但效率低，Class AB 是传统折中方案，Class D 通过开关/PWM 工作，效率高但需要关注滤波、布局和 EMI。", en: "Class A is linear but inefficient, Class AB is a traditional compromise, and Class D uses switching/PWM for high efficiency while requiring care with filtering, layout, and EMI." },
            { zh: "扬声器的音圈在磁场中受力，推动振膜往复运动；行程、热容量和机械结构决定它能承受多大声压和低频。", en: "A speaker voice coil moves in a magnetic field and drives the diaphragm; excursion, thermal capacity, and mechanics determine sound pressure and bass limits." },
            { zh: "Thiele-Small 参数描述低频小信号行为：Fs、Qts、Vas 会影响适合密闭箱还是倒相箱，以及箱体容积和调谐频率。", en: "Thiele-Small parameters describe low-frequency small-signal behavior: Fs, Qts, and Vas influence whether a driver suits sealed or bass-reflex boxes, and guide box volume and tuning frequency." },
            { zh: "密闭箱用箱内空气弹簧控制振膜，响应通常更平滑；倒相箱用导管共振增强低频效率，但调谐点以下更容易失控。", en: "A sealed box uses the trapped air as a spring and is often smoother; a bass-reflex box uses port resonance to improve bass efficiency, but below tuning the driver is less controlled." },
            { zh: "分频阶数决定斜率：一阶约 6 dB/oct，二阶约 12 dB/oct，四阶约 24 dB/oct；阶数越高越能保护单元，但相位、延迟和叠加要更小心。", en: "Crossover order sets slope: first order is about 6 dB/oct, second order 12 dB/oct, and fourth order 24 dB/oct. Higher order protects drivers better but needs more care with phase, delay, and summing." },
            { zh: "主动分频在功放之前用 DSP/有源滤波拆频，每个单元独立功放；被动分频在功放之后用电感、电容、电阻分频，结构简单但受负载阻抗影响。", en: "Active crossovers split bands before amplification with DSP/active filters and use one amp per driver; passive crossovers split after the amp with inductors, capacitors, and resistors, simpler but load-dependent." },
            { zh: "线阵列通过多个单元垂直排列和延迟/幅度控制，把能量集中到目标覆盖区域，减少不必要的垂直扩散。", en: "A line array uses vertically stacked drivers plus delay/amplitude control to focus energy into the target coverage area and reduce unwanted vertical spread." },
            { zh: "阻抗越低，同电压下电流越大，对功放输出级和散热要求越高。", en: "Lower impedance draws more current at the same voltage, increasing amplifier output-stage and thermal demands." },
            { zh: "灵敏度、功率、箱体和分频共同决定实际响度；瓦数更大不等于一定更响或更好听。", en: "Sensitivity, power, enclosure, and crossover jointly determine loudness; more watts do not guarantee louder or better sound." }
          ],
          termExplanations: [
            {
              name: { zh: "功放是什么", en: "What an amplifier does" },
              explanation: {
                zh: "功放把小信号变成可驱动负载的功率输出。它需要处理增益、电源电压、输出电流、效率、散热、削波和保护。",
                en: "An amplifier turns a small signal into power output for a load. It must handle gain, supply voltage, output current, efficiency, heat, clipping, and protection."
              }
            },
            {
              name: { zh: "Class A / AB / D", en: "Class A / AB / D" },
              explanation: {
                zh: "Class A 器件几乎一直导通，线性好但耗电；Class AB 让正负半周分担输出；Class D 把信号调制成高速开关脉冲，再由负载和滤波恢复为音频。",
                en: "Class A devices conduct most of the time, Class AB splits positive and negative halves, and Class D modulates audio into fast switching pulses before filtering through the load."
              }
            },
            {
              name: { zh: "动圈扬声器", en: "Moving-coil speaker" },
              explanation: {
                zh: "动圈单元由音圈、磁路、振膜、悬边和定心支片组成。音圈中的电流在磁场里产生力，带动振膜推动空气。",
                en: "A moving-coil driver has a voice coil, magnetic circuit, diaphragm, surround, and spider. Current in the coil creates force in the magnetic field and moves air."
              }
            },
            {
              name: { zh: "阻抗", en: "Impedance" },
              explanation: {
                zh: "阻抗不是固定电阻，而是随频率变化的交流负载。标称 4 Ω、8 Ω 只是参考值，真实曲线会影响功放电流和控制力。",
                en: "Impedance is a frequency-dependent AC load, not a fixed resistor. Nominal 4 ohm or 8 ohm values are references; the real curve affects current and control."
              }
            },
            {
              name: { zh: "灵敏度", en: "Sensitivity" },
              explanation: {
                zh: "灵敏度描述扬声器在给定输入下能产生多大声压。高灵敏度单元在同样功率下更容易响，但频响、失真和体积仍要一起看。",
                en: "Sensitivity describes sound pressure for a given input. Higher sensitivity gets louder with the same power, but frequency response, distortion, and size still matter."
              }
            },
            {
              name: { zh: "分频器", en: "Crossover" },
              explanation: {
                zh: "分频器把低频、中频和高频送给适合的单元。分频点、斜率、相位和单元摆位都会影响衔接和声像。",
                en: "A crossover sends bass, midrange, and treble to suitable drivers. Crossover point, slope, phase, and driver placement affect integration and imaging."
              }
            },
            {
              name: { zh: "Thiele-Small 参数", en: "Thiele-Small parameters" },
              explanation: {
                zh: "T/S 参数是一组描述低频小信号行为的单元参数。Fs 是自由空气谐振频率，Qts 是总 Q 值，Vas 是等效空气顺性体积；它们常用于估算箱体容积、低频下潜和是否适合倒相调谐。",
                en: "T/S parameters describe a driver's low-frequency small-signal behavior. Fs is free-air resonance, Qts is total Q, and Vas is equivalent compliance volume; they help estimate box volume, bass extension, and ported-box suitability."
              }
            },
            {
              name: { zh: "密闭箱 vs 倒相箱", en: "Sealed vs bass reflex" },
              explanation: {
                zh: "密闭箱没有导管，箱内空气像弹簧一样限制振膜，瞬态和滚降通常更可控；倒相箱通过导管和箱体形成共振，在调谐频率附近提高低频效率，但导管噪声、群延迟和调谐点以下保护要注意。",
                en: "A sealed box has no port; trapped air works like a spring and often gives controlled rolloff and transient behavior. A bass-reflex box uses a port resonance to increase efficiency near tuning, but port noise, group delay, and below-tuning protection matter."
              }
            },
            {
              name: { zh: "分频阶数与相位", en: "Crossover order and phase" },
              explanation: {
                zh: "一阶、二阶、四阶分频对应不同衰减斜率和相位旋转。真正设计时要让低音和高音在分频点附近幅度相加、相位尽量对齐，否则会出现凹陷、隆起或声像漂移。",
                en: "First-, second-, and fourth-order crossovers have different slopes and phase rotation. Real designs must make woofer and tweeter sum correctly near the crossover point, or dips, peaks, and image shifts appear."
              }
            },
            {
              name: { zh: "主动分频 vs 被动分频", en: "Active vs passive crossover" },
              explanation: {
                zh: "主动分频在功放之前完成，便于做精确延迟、EQ、限幅和单元保护；被动分频在功放之后完成，不需要多路功放，但元件会发热，且滤波结果会跟随扬声器阻抗曲线变化。",
                en: "Active crossovers happen before amplifiers and allow precise delay, EQ, limiting, and driver protection. Passive crossovers happen after the amplifier and avoid multiple amps, but components heat up and filter behavior follows the speaker impedance curve."
              }
            },
            {
              name: { zh: "线阵列扬声器", en: "Line array speaker" },
              explanation: {
                zh: "线阵列把多个单元排成一列，通过物理间距、角度、延迟和电平控制覆盖范围。它不是简单把喇叭堆多，而是用干涉和指向性控制让远近听众获得更均匀的声压。",
                en: "A line array stacks drivers vertically and controls coverage with spacing, splay angle, delay, and level. It is not just more speakers; interference and directivity are used to make SPL more even across near and far listeners."
              }
            }
          ],
          lab: {
            type: "amplifier-speaker",
            title: { zh: "功放与扬声器实验室", en: "Amplifier and Speaker Lab" },
            description: {
              zh: "进入独立界面观察小信号、功放、扬声器单元、T/S 参数、箱体、分频阶数、主动/被动分频、线阵列和空气声波之间的关系。",
              en: "Open an independent lab to inspect the relationships among small signals, amplifiers, speaker drivers, T/S parameters, enclosures, crossover order, active/passive crossovers, line arrays, and air pressure."
            },
            buttonLabel: { zh: "打开功放与扬声器实验室", en: "Open amplifier and speaker lab" }
          },
          misconception: {
            zh: "瓦数更大不等于一定更响或更好听；阻抗、灵敏度、箱体、失真、散热、保护和摆放都会影响最终声音。",
            en: "More watts do not guarantee louder or better sound; impedance, sensitivity, enclosure, distortion, heat, protection, and placement all shape the result."
          },
          contentDirection: {
            zh: "适合继续扩展为 T/S 参数选箱工具、密闭/倒相低频响应对比、分频相位对齐案例、小音箱保护算法和真实产品播放链路拆解。",
            en: "This can expand into a T/S parameter box-selection tool, sealed/ported bass-response comparison, crossover phase-alignment cases, small-speaker protection, and real product playback-chain breakdowns."
          }
        }
      }
    ]
  },
  {
    id: "software",
    icon: Cpu,
    accent: "#4f7cbd",
    title: { zh: "音频软件", en: "Audio Software" },
    description: {
      zh: "理解系统音频栈、数据流、编解码和实时处理。",
      en: "Understand system audio stacks, data flow, codecs, and real-time processing."
    },
    topics: [
      {
        title: { zh: "系统音频架构", en: "System Audio Architecture" },
        summary: {
          zh: "用系统分层看清 App、音频服务、驱动和硬件如何分工。",
          en: "Use system layers to understand how apps, audio services, drivers, and hardware divide responsibilities."
        },
        bullets: [
          { zh: "应用、服务、驱动和硬件边界", en: "App, service, driver, and hardware boundaries" },
          { zh: "播放、采集和全双工链路", en: "Playback, capture, and full-duplex paths" },
          { zh: "设备路由、权限、会话和音量", en: "Device routing, permission, session, and volume" }
        ],
        detail: {
          explanation: {
            zh: "系统音频架构回答的是：应用发起播放或录音请求后，系统如何选择设备、管理权限、处理会话和音量，并把 PCM 数据交给驱动和硬件。它是系统层总览，不展开具体 DSP 算法、接口时序或低延迟调参。",
            en: "System audio architecture answers this question: after an app requests playback or recording, how does the system choose devices, manage permission, handle sessions and volume, then hand PCM data to drivers and hardware? It is a system-level overview, not a deep dive into DSP algorithms, interface timing, or low-latency tuning."
          },
          keyConcepts: [
            { zh: "应用通常不直接控制扬声器或麦克风，而是通过系统 API 提交播放、录音或通话请求。", en: "Apps usually do not directly control speakers or microphones; they submit playback, recording, or call requests through system APIs." },
            { zh: "音频服务负责统一管理多个 App 的会话、音频焦点、音量、设备状态和路由策略。", en: "The audio service centrally manages sessions, focus, volume, device state, and routing policy across apps." },
            { zh: "播放、采集和全双工是三种链路方向；本卡只说明系统如何把模块接起来。", en: "Playback, capture, and full duplex are three path directions; this card only shows how the system connects modules." },
            { zh: "DSP 算法、接口时序、Codec 芯片和 buffer deadline 分别放在语音增强、数字接口、硬件和实时处理卡片中展开。", en: "DSP algorithms, interface timing, codec chips, and buffer deadlines are covered by the speech enhancement, digital interface, hardware, and real-time processing cards." }
          ],
          termExplanations: [
            {
              name: { zh: "应用层 API", en: "Application API" },
              explanation: {
                zh: "应用通过 AudioTrack、AAudio、Core Audio、WASAPI、WebAudio 等 API 打开播放或录音流。API 负责把格式、会话和设备请求交给系统音频栈。",
                en: "Apps open playback or capture streams through APIs such as AudioTrack, AAudio, Core Audio, WASAPI, or WebAudio. The API passes format, session, and device requests to the system audio stack."
              }
            },
            {
              name: { zh: "音频服务", en: "Audio service" },
              explanation: {
                zh: "音频服务是系统的集中管理层。在 Linux 中常见为 PipeWire、PulseAudio 或 JACK，负责连接多个客户端、维护设备状态和安排数据流向。",
                en: "The audio service is the central manager. On Linux it is commonly PipeWire, PulseAudio, or JACK, connecting clients, maintaining device state, and arranging data flow."
              }
            },
            {
              name: { zh: "音频策略与路由", en: "Audio policy and routing" },
              explanation: {
                zh: "策略层决定声音走扬声器、听筒、耳机、蓝牙、USB 声卡还是虚拟设备，也处理来电、通知、媒体和语音助手之间的优先级。",
                en: "The policy layer decides whether audio goes to speakers, earpiece, headphones, Bluetooth, USB audio, or virtual devices, and resolves priority among calls, notifications, media, and assistants."
              }
            },
            {
              name: { zh: "混音器与重采样", en: "Mixer and resampler" },
              explanation: {
                zh: "当多个应用同时播放，系统会把不同流合到目标输出路径，并在需要时统一采样率或通道格式。这里仅说明它们属于系统链路中的软件处理层。",
                en: "When multiple apps play at once, the system combines streams into the target output path and normalizes sample rate or channel format when needed. Here they are only placed as software responsibilities in the system path."
              }
            },
            {
              name: { zh: "HAL / 驱动", en: "HAL / driver" },
              explanation: {
                zh: "HAL 和驱动是系统抽象与硬件实现之间的边界。系统把音频流、控制命令和设备状态交给这一层，再由具体平台适配声卡、蓝牙或 USB 音频设备。",
                en: "HAL and drivers form the boundary between system abstractions and hardware implementation. The system hands audio streams, controls, and device state to this layer, then the platform adapts sound cards, Bluetooth, or USB audio devices."
              }
            }
          ],
          lab: {
            type: "system-audio",
            title: { zh: "系统音频架构实验室", en: "System Audio Architecture Lab" },
            description: {
              zh: "进入独立界面查看通用分层、Linux 示例，并切换播放、录音和全双工三条系统链路。",
              en: "Open an independent lab to view generic layers, a Linux example, and switch among playback, capture, and full-duplex system paths."
            },
            buttonLabel: { zh: "打开系统音频架构实验室", en: "Open system audio architecture lab" }
          },
          misconception: {
            zh: "系统音频架构不是某一个算法模块，也不是硬件接口教程；它主要解释系统如何管理请求、设备和数据流边界。",
            en: "System audio architecture is not one algorithm module or a hardware-interface tutorial; it mainly explains how the system manages requests, devices, and data-flow boundaries."
          },
          contentDirection: {
            zh: "适合后续继续补充 Android AudioFlinger、Windows WASAPI、macOS Core Audio 与 Linux 的系统级对比。",
            en: "This can later add system-level comparisons among Android AudioFlinger, Windows WASAPI, macOS Core Audio, and Linux."
          }
        }
      },
      {
        title: { zh: "实时音频处理", en: "Real-Time Audio Processing" },
        summary: {
          zh: "关注 buffer、延迟、回调线程、卡顿、爆音和丢帧。",
          en: "Focus on buffers, latency, callback threads, glitches, pops, and frame drops."
        },
        bullets: [
          { zh: "Buffer size 与 latency", en: "Buffer size and latency" },
          { zh: "实时线程与回调", en: "Real-time threads and callbacks" },
          { zh: "卡顿、爆音、杂音排查", en: "Debugging glitches, pops, and noise" }
        ],
        detail: {
          explanation: {
            zh: "实时音频处理要求每一小块音频都在截止时间前完成计算。只要回调线程被阻塞、CPU 峰值过高或 buffer 供给不连续，就可能出现卡顿、爆音、断续和延迟增加。",
            en: "Real-time audio processing requires each small audio block to be computed before its deadline. If the callback thread blocks, CPU spikes, or buffers are not supplied continuously, users may hear glitches, pops, dropouts, or increased latency."
          },
          termExplanations: [
            {
              name: { zh: "Buffer size", en: "Buffer size" },
              explanation: {
                zh: "Buffer size 表示一次回调处理多少帧音频。48 kHz 下 128 帧 buffer 约等于 2.67 ms，64 帧约等于 1.33 ms；buffer 越小，端到端延迟越低，但每次回调的可用计算时间也越短。",
                en: "Buffer size is the number of audio frames processed by one callback. At 48 kHz, a 128-frame buffer is about 2.67 ms and a 64-frame buffer is about 1.33 ms. Smaller buffers lower end-to-end latency but reduce the available compute time per callback."
              }
            },
            {
              name: { zh: "回调 deadline", en: "Callback deadline" },
              explanation: {
                zh: "deadline 由 buffer 帧数和采样率决定。实时线程必须在下一块 buffer 到来前完成 DSP、格式转换和数据交付，否则播放端会缺样本，采集端会丢样本。",
                en: "The deadline is set by buffer frames and sample rate. The real-time thread must finish DSP, format conversion, and handoff before the next buffer arrives, otherwise playback runs out of samples or capture drops samples."
              }
            },
            {
              name: { zh: "XRUN", en: "XRUN" },
              explanation: {
                zh: "XRUN 是 underrun 或 overrun 的统称。播放 underrun 表示输出端来不及拿到新数据，采集 overrun 表示输入端数据没有及时被取走，常见听感是爆音、断续或短暂静音。",
                en: "XRUN is a shared term for underrun or overrun. A playback underrun means the output side did not receive new data in time; a capture overrun means input data was not consumed in time. Users may hear pops, dropouts, or short silence."
              }
            },
            {
              name: { zh: "实时安全操作", en: "Real-time safe operations" },
              explanation: {
                zh: "实时回调中应只做可预测的计算，避免锁等待、磁盘 IO、网络请求、大量日志和运行期分配。耗时或不可预测任务应放到非实时线程，通过无锁队列或预分配 buffer 交换数据。",
                en: "A real-time callback should do predictable computation only, avoiding lock waits, disk IO, network requests, heavy logging, and runtime allocation. Slow or unpredictable work should move to non-real-time threads and exchange data through lock-free queues or preallocated buffers."
              }
            }
          ],
          keyConcepts: [
            { zh: "Buffer 越小延迟越低，但留给处理的时间也越少。", en: "Smaller buffers reduce latency but leave less time for processing." },
            { zh: "实时回调中应避免阻塞 IO、锁竞争、动态内存分配和不可预测操作。", en: "Real-time callbacks should avoid blocking IO, lock contention, dynamic allocation, and unpredictable operations." },
            { zh: "XRUN、underrun、overrun 是定位播放或采集不连续的重要线索。", en: "XRUN, underrun, and overrun events are important clues for playback or capture discontinuity." }
          ],
          lab: {
            type: "realtime-audio",
            title: { zh: "实时音频处理实验室", en: "Real-Time Audio Processing Lab" },
            description: {
              zh: "进入独立界面调节采样率、buffer 帧数、DSP 处理耗时和 CPU 抖动，观察 deadline、端到端延迟和 XRUN 风险如何变化。",
              en: "Open an independent lab to adjust sample rate, buffer frames, DSP time, and CPU jitter, then watch deadline, end-to-end latency, and XRUN risk change."
            },
            buttonLabel: { zh: "打开实时音频处理实验室", en: "Open real-time audio processing lab" }
          },
          misconception: {
            zh: "把 buffer 调到最小不一定最好；设备性能、系统调度、算法复杂度和稳定性需要一起平衡。",
            en: "The smallest buffer is not always best; device performance, scheduler behavior, algorithm cost, and stability must be balanced."
          },
          contentDirection: {
            zh: "适合做实时回调时间线、不同 buffer 大小的延迟对比，以及卡顿问题排查清单。",
            en: "This fits a real-time callback timeline, latency comparisons for buffer sizes, and a glitch debugging checklist."
          }
        }
      },
      {
        title: { zh: "音频编解码", en: "Audio Codecs" },
        summary: {
          zh: "比较无损、有损和蓝牙音频 Codec 的码率、延迟与稳定性。",
          en: "Compare lossless, lossy, and Bluetooth codecs by bitrate, latency, and stability."
        },
        bullets: [
          { zh: "MP3、AAC、Opus、LC3", en: "MP3, AAC, Opus, LC3" },
          { zh: "SBC、aptX、LDAC", en: "SBC, aptX, LDAC" },
          { zh: "编码延迟与码率", en: "Encoding latency and bitrate" }
        ],
        detail: {
          explanation: {
            zh: "这里的 Codec 指压缩编解码算法，不是前面硬件章节里的音频 Codec 芯片。它接收已经采样量化后的 PCM，把数据按帧切开，再通过无损预测、感知模型、语音模型或蓝牙传输约束进行压缩；播放或接收端再解码回 PCM 交给系统音频栈、DAC 或后续处理。",
            en: "Here codec means a compression algorithm, not the hardware audio codec chip discussed in the hardware section. It takes already sampled PCM, splits it into frames, compresses it with lossless prediction, perceptual models, speech models, or Bluetooth transport constraints, then decodes it back to PCM for the system audio stack, DAC, or later processing."
          },
          keyConcepts: [
            { zh: "码率影响文件大小和压缩余量，但不同编码器在同码率下质量不同。", en: "Bitrate affects file size and compression headroom, but different codecs have different quality at the same bitrate." },
            { zh: "帧长和算法复杂度会影响端到端延迟。", en: "Frame size and algorithmic complexity affect end-to-end latency." },
            { zh: "Opus、LC3 等更适合低延迟或通信场景，FLAC 更适合无损归档。", en: "Opus and LC3 are useful for low-latency or communication scenarios, while FLAC is better for lossless archiving." }
          ],
          termExplanations: [
            {
              name: { zh: "编码与解码", en: "Encoding and decoding" },
              explanation: {
                zh: "编码把 PCM 转成更小的码流或文件，解码把码流恢复成可播放的 PCM。压缩算法可能是无损的，也可能是有损的。",
                en: "Encoding turns PCM into a smaller bitstream or file; decoding reconstructs playable PCM. The compression may be lossless or lossy."
              }
            },
            {
              name: { zh: "封装与码流", en: "Container and bitstream" },
              explanation: {
                zh: "码流是编码后的音频数据，封装则负责文件头、时间戳、索引和多轨信息。例如 AAC 码流可以放进 MP4/M4A 容器。",
                en: "A bitstream is encoded audio data, while a container carries headers, timestamps, indexes, and tracks. For example, AAC bitstreams can be stored in MP4/M4A containers."
              }
            },
            {
              name: { zh: "帧长与算法延迟", en: "Frame size and algorithmic delay" },
              explanation: {
                zh: "多数 Codec 需要攒够一帧音频后再分析和编码。帧越长，压缩效率可能更高，但实时通话和游戏互动的延迟也会增加。",
                en: "Most codecs collect a frame before analysis and encoding. Longer frames can improve compression efficiency, but increase delay for calls and interactive audio."
              }
            },
            {
              name: { zh: "蓝牙 Codec", en: "Bluetooth codec" },
              explanation: {
                zh: "蓝牙 Codec 还要受无线带宽、丢包、耳机芯片功耗和设备兼容性限制，所以码率高不一定始终稳定。",
                en: "Bluetooth codecs are also constrained by wireless bandwidth, packet loss, headset power, and compatibility, so a higher bitrate is not always stable."
              }
            }
          ],
          lab: {
            type: "audio-codec",
            title: { zh: "音频编解码实验室", en: "Audio Codec Lab" },
            description: {
              zh: "进入独立界面查看 PCM 如何经过分帧、压缩、码流传输和解码，并按音乐、语音、会议、蓝牙和低延迟场景比较常见 Codec。",
              en: "Open an independent lab to see how PCM is framed, compressed, transmitted as a bitstream, and decoded, then compare common codecs for music, speech, conferencing, Bluetooth, and low-latency use."
            },
            buttonLabel: { zh: "打开音频编解码实验室", en: "Open audio codec lab" }
          },
          misconception: {
            zh: "相同码率不代表相同音质或相同延迟；编码器实现、内容类型和传输环境都会改变结果。",
            en: "The same bitrate does not mean the same quality or latency; encoder implementation, content type, and network conditions change the result."
          },
          contentDirection: {
            zh: "适合做格式对比表、蓝牙 Codec 延迟路径图和不同码率试听素材说明。",
            en: "This can become a codec comparison table, Bluetooth latency path diagram, and listening guide for different bitrates."
          }
        }
      }
    ]
  },
  {
    id: "dsp",
    icon: SlidersHorizontal,
    accent: "#7d6ab8",
    title: { zh: "传统算法", en: "Traditional DSP" },
    description: {
      zh: "用信号处理方法解释音频分析、增强和空间音频。",
      en: "Use signal processing methods to explain audio analysis, enhancement, and spatial audio."
    },
    topics: [
      {
        title: { zh: "基础信号处理", en: "Core Signal Processing" },
        summary: {
          zh: "理解 FFT / STFT、滤波器、EQ、动态范围压缩和限幅器。",
          en: "Understand FFT / STFT, filters, EQ, dynamic range compression, and limiters."
        },
        bullets: [
          { zh: "FFT / STFT", en: "FFT / STFT" },
          { zh: "低通、高通、带通、陷波", en: "Low-pass, high-pass, band-pass, notch filters" },
          { zh: "EQ、DRC、Limiter", en: "EQ, DRC, limiter" }
        ],
        detail: {
          explanation: {
            zh: "基础信号处理是传统 DSP 的基础入口：它把音频从时间域、频率域和能量变化三个角度分析，再用滤波、EQ、动态处理和变换域方法改变或提取声音特征。FFT/STFT 主要用于观察频谱和做分帧频域处理；滤波器和 EQ 改变不同频段的能量；压缩器和限幅器控制响度、瞬态和峰值。",
            en: "Core signal processing is the entry point for traditional DSP: it analyzes audio through time, frequency, and energy changes, then uses filtering, EQ, dynamics processing, and transform-domain methods to modify sound or extract features. FFT/STFT mainly reveal spectra and enable framed frequency-domain processing; filters and EQ reshape frequency energy; compressors and limiters control loudness, transients, and peaks."
          },
          termExplanations: [
            {
              name: { zh: "时间域", en: "Time domain" },
              explanation: {
                zh: "时间域直接看采样值随时间变化的波形，适合观察波形、周期、瞬态、包络、峰值、RMS 和是否削波。",
                en: "The time domain shows sample values changing over time. It is useful for inspecting waveform shape, cycles, transients, envelope, peak level, RMS, and clipping."
              }
            },
            {
              name: { zh: "频率域", en: "Frequency domain" },
              explanation: {
                zh: "频率域把声音拆成不同频率的能量分布。FFT 会受到窗口长度、采样率和点数影响，频率分辨率越高，通常时间定位越粗。",
                en: "The frequency domain decomposes sound into energy at different frequencies. FFT results depend on window length, sample rate, and point count; higher frequency resolution usually gives coarser time localization."
              }
            },
            {
              name: { zh: "STFT 分帧", en: "STFT framing" },
              explanation: {
                zh: "STFT 会把连续 PCM 切成短帧，每帧加窗后做 FFT。window size 和 hop size 决定时间分辨率、频率分辨率、延迟和计算量。",
                en: "STFT cuts continuous PCM into short frames, applies a window, then runs FFT per frame. Window size and hop size determine time resolution, frequency resolution, latency, and compute cost."
              }
            },
            {
              name: { zh: "滤波器", en: "Filters" },
              explanation: {
                zh: "滤波器按频率选择保留或衰减声音，可做低通、高通、带通和陷波。FIR 和 IIR 的计算方式、相位、延迟和稳定性特征不同。",
                en: "Filters keep or attenuate sound by frequency, such as low-pass, high-pass, band-pass, and notch. FIR and IIR differ in computation, phase behavior, delay, and stability."
              }
            },
            {
              name: { zh: "参数 EQ", en: "Parametric EQ" },
              explanation: {
                zh: "参数 EQ 本质上是一组可调滤波器。常见参数是 gain、frequency、Q，用来提升或削减某个中心频率附近的能量。",
                en: "Parametric EQ is essentially a set of adjustable filters. Common parameters are gain, frequency, and Q, used to boost or cut energy around a center frequency."
              }
            },
            {
              name: { zh: "动态处理", en: "Dynamics processing" },
              explanation: {
                zh: "动态处理根据电平变化改变增益。压缩器和限幅器常用 threshold、ratio、attack、release、knee 控制响度、瞬态和峰值。",
                en: "Dynamics processing changes gain according to signal level. Compressors and limiters use threshold, ratio, attack, release, and knee to control loudness, transients, and peaks."
              }
            }
          ],
          keyConcepts: [
            { zh: "基础 DSP 链路常见为：输入 PCM -> 分帧/加窗 -> FFT/STFT 分析 -> 频域处理或特征计算 -> IFFT/重叠相加 -> 输出 PCM。", en: "A common basic DSP chain is: input PCM -> framing/windowing -> FFT/STFT analysis -> frequency-domain processing or feature extraction -> IFFT/overlap-add -> output PCM." },
            { zh: "窗口长度影响时间分辨率和频率分辨率，是 STFT 的核心取舍；hop size 还会影响延迟、平滑程度和计算量。", en: "Window length trades time resolution against frequency resolution, which is central to STFT; hop size also affects latency, smoothing, and compute cost." },
            { zh: "滤波器的截止频率、斜率、Q 值决定频率响应形状；线性相位、最小相位和 IIR/FIR 选择会影响延迟和瞬态。", en: "Filter cutoff frequency, slope, and Q determine the response shape; linear-phase, minimum-phase, and IIR/FIR choices affect delay and transients." },
            { zh: "EQ 是面向听感的滤波器组合，适合修正频段能量；动态处理器则根据电平包络改变增益，适合控制响度和峰值。", en: "EQ is a listener-facing filter set for reshaping band energy; dynamics processors change gain based on level envelope to control loudness and peaks." },
            { zh: "传统 DSP 常以帧为单位工作，因此算法效果、实时延迟和 CPU 占用必须一起考虑。", en: "Traditional DSP often works frame by frame, so algorithm effect, real-time latency, and CPU load must be considered together." }
          ],
          lab: {
            type: "core-signal-processing",
            title: { zh: "基础信号处理实验室", en: "Core Signal Processing Lab" },
            description: {
              zh: "进入独立界面切换 STFT、滤波器/EQ 和动态处理视图，调节窗口、hop size、截止频率、Q、EQ 增益、阈值和 ratio，观察图形和关键指标如何变化。",
              en: "Open an independent lab to switch between STFT, filter/EQ, and dynamics views, then adjust window, hop size, cutoff, Q, EQ gain, threshold, and ratio to see diagrams and metrics change."
            },
            buttonLabel: { zh: "打开基础信号处理实验室", en: "Open core signal processing lab" }
          },
          misconception: {
            zh: "FFT 只是分析工具，不会自动让声音变好；真正改变声音还需要滤波、增益、重建或其他处理策略。压缩器不是 MP3/AAC 这类编码压缩，动态压缩改变的是电平范围；滤波器也不只是改变响度，还可能引入相位变化、延迟、振铃或削波后的失真。",
            en: "FFT is an analysis tool and does not improve sound by itself; changing sound requires filtering, gain changes, reconstruction, or another processing strategy. A compressor is not MP3/AAC-style codec compression; dynamics compression changes level range. Filters also do more than change loudness: they can introduce phase shift, delay, ringing, or distortion after clipping."
          },
          contentDirection: {
            zh: "适合继续做三个交互方向：频谱瀑布图解释 FFT/STFT，滤波器响应图调节 cutoff/Q/gain，压缩器前后对比展示 threshold、ratio、attack、release 对响度和瞬态的影响。",
            en: "Good next interactive directions are: a spectrogram view for FFT/STFT, a filter-response control for cutoff/Q/gain, and a compressor before-after comparison showing how threshold, ratio, attack, and release affect loudness and transients."
          }
        }
      },
      {
        title: { zh: "语音增强", en: "Speech Enhancement" },
        summary: {
          zh: "覆盖降噪、回声消除、自动增益、波束成形和去混响。",
          en: "Cover noise suppression, echo cancellation, AGC, beamforming, and dereverberation."
        },
        bullets: [
          { zh: "Noise Suppression", en: "Noise suppression" },
          { zh: "AEC、AGC", en: "AEC, AGC" },
          { zh: "Beamforming 与 Dereverberation", en: "Beamforming and dereverberation" }
        ],
        detail: {
          explanation: {
            zh: "语音增强的目标是在真实设备和复杂环境中，让近端人声更清楚、更稳定，同时尽量降低回声、噪声、混响和响度波动。工程上它通常不是一个单独算法，而是一条低延迟 PCM 处理链：从麦克风 AI 采集开始，多麦场景先做波束成形，再结合播放回采参考做 AEC，后面接 NS/ANR、去混响、AGC 和 EQ，最后送往 AENC 编码、ASR 唤醒识别或本地录音。瑞芯微、SigmaStar、君正等 SoC SDK 名称不同，但常见模块边界类似：AI/AO 负责音频输入输出，AENC/ADEC 负责编解码，VQE/3A/Audio Process 负责 AEC、NS、AGC 等语音增强。",
            en: "Speech enhancement makes near-end speech clearer and steadier on real devices while reducing echo, noise, reverberation, and level swings. In engineering it is usually not one algorithm but a low-latency PCM processing chain: AI capture from microphones, beamforming first in multi-mic systems, AEC using playback reference, then NS/ANR, dereverberation, AGC, and EQ before AENC encoding, ASR wake/recognition, or local recording. Rockchip, SigmaStar, Ingenic, and similar SoC SDKs use different names, but the boundaries are similar: AI/AO for audio input/output, AENC/ADEC for codecs, and VQE/3A/Audio Process for AEC, NS, AGC, and voice enhancement."
          },
          termExplanations: [
            {
              name: { zh: "AEC 回声消除", en: "AEC echo cancellation" },
              explanation: {
                zh: "AEC 需要两路信号：麦克风输入和播放回采参考。算法先做时间对齐，再用自适应滤波器估计扬声器声音经过功放、腔体、空气和房间后的回声路径，生成预测回声后从麦克风信号中相减。难点在于双讲、延迟漂移和非线性失真。",
                en: "AEC needs two signals: microphone input and playback reference. It time-aligns them, uses an adaptive filter to estimate the echo path through the amplifier, enclosure, air, and room, then subtracts the predicted echo from the mic signal. Double-talk, delay drift, and nonlinear distortion are the hard parts."
              }
            },
            {
              name: { zh: "NS / ANR 降噪", en: "NS / ANR noise suppression" },
              explanation: {
                zh: "NS 或 ANR 通常按短帧分析频谱或滤波器组，估计每个频段里噪声和语音的占比，再降低噪声占比高的频段增益。它常用于风扇、空调、车噪和底噪，但强度太大会损伤辅音和高频细节，产生金属音、抽吸声或吞字。",
                en: "NS or ANR usually analyzes short-frame spectra or filter banks, estimates how much speech and noise exist in each band, then lowers gain in noise-dominant bands. It helps with fans, HVAC, car noise, and hiss, but aggressive settings can damage consonants and high-frequency detail, causing metallic sound, pumping, or clipped words."
              }
            },
            {
              name: { zh: "AGC 自动增益", en: "AGC automatic gain control" },
              explanation: {
                zh: "AGC 先估计短时 RMS、峰值或语音包络，再用 attack/release 控制增益变化速度，把过小的语音拉高、过大的语音压住。它通常要配合 limiter，避免增益过高导致数字削波；好的 AGC 不应该让波形整体上下平移，而是改变包络和峰值。",
                en: "AGC estimates short-term RMS, peaks, or speech envelope, then uses attack/release timing to control gain, raising quiet speech and holding back loud speech. It is often paired with a limiter to avoid digital clipping; a good AGC changes envelope and peaks rather than shifting the waveform up or down."
              }
            },
            {
              name: { zh: "多麦波束成形", en: "Multi-mic beamforming" },
              explanation: {
                zh: "多麦阵列利用不同麦克风的到达时间差和相位差，增强目标方向的人声，压低旁边或后方的干扰声。它要求多路麦克风同步采集和稳定的阵列结构。",
                en: "A microphone array uses arrival-time and phase differences to enhance speech from a target direction while reducing side or rear interference. It needs synchronized mic capture and stable array geometry."
              }
            },
            {
              name: { zh: "去混响 Dereverb", en: "Dereverberation" },
              explanation: {
                zh: "去混响试图减弱房间后期反射造成的持续拖尾，让语音更近、更清楚。工程上可能结合多麦空间信息、线性预测或频域衰减，判断哪些能量是拖尾再降低它。它通常和波束成形、AEC、NS 配合使用，但过强会把自然共鸣和尾音也削掉。",
                en: "Dereverberation reduces late room-reflection tails so speech sounds closer and clearer. Engineering methods may combine array cues, linear prediction, or frequency-domain attenuation to identify and reduce sustained tails. It is often combined with beamforming, AEC, and NS, but strong processing can remove natural resonance and word endings."
              }
            }
          ],
          keyConcepts: [
            { zh: "典型采集链路是：Mic / PDM / I2S -> AI 驱动环形 buffer -> PCM 帧 -> VQE/3A -> AENC/ASR/录音。算法多数按 10 ms、16 ms 或 20 ms 帧处理，帧长会影响延迟和效果。", en: "A typical capture path is: Mic / PDM / I2S -> AI driver ring buffer -> PCM frames -> VQE/3A -> AENC/ASR/recording. Most algorithms process 10 ms, 16 ms, or 20 ms frames, and frame size affects latency and quality." },
            { zh: "AEC 需要播放侧 AO/Mixer 的 reference buffer。没有正确的回采参考、时间戳或延迟估计，AEC 很难稳定消除回声。", en: "AEC needs a playback reference buffer from AO/Mixer. Without correct reference, timestamps, or delay estimation, echo cancellation is difficult to stabilize." },
            { zh: "常见顺序不是绝对固定，但本实验室按一条典型链路组织：高通/去直流 -> 波束成形/DOA（多麦）-> AEC -> NS/ANR -> 去混响 -> AGC/Limiter -> 编码或识别。", en: "The order is not universal, but this lab uses one typical chain: high-pass/DC removal -> beamforming/DOA for multi-mic capture -> AEC -> NS/ANR -> dereverberation -> AGC/limiter -> encoding or recognition." },
            { zh: "单麦没有空间到达时间差，不能做真正的多麦波束成形；2 Mic 或 4 Mic 阵列才有空间抑制和目标方向增强的基础。", en: "A single microphone has no spatial arrival-time differences, so true beamforming requires a 2-mic or 4-mic array." },
            { zh: "SDK 名称会变化：瑞芯微常见 AI/AO/AENC/ADEC/VQE，SigmaStar 常见 AI/AO/AENC/ADEC/Audio Process，君正常见 IMP Audio + AGC/NS/AEC 接口；理解边界比记名字更重要。", en: "SDK names vary: Rockchip commonly uses AI/AO/AENC/ADEC/VQE, SigmaStar often uses AI/AO/AENC/ADEC/Audio Process, and Ingenic uses IMP Audio plus AGC/NS/AEC APIs. Understanding boundaries matters more than memorizing names." },
            { zh: "语音增强不是越强越好。降噪、AEC、AGC、波束成形都需要在清晰度、自然度、双讲、延迟、CPU 占用和功耗之间取舍。", en: "Speech enhancement is not better just because it is stronger. NS, AEC, AGC, and beamforming trade off clarity, naturalness, double-talk, latency, CPU use, and power." }
          ],
          lab: {
            type: "speech-enhancement",
            title: { zh: "语音增强实验室", en: "Speech Enhancement Lab" },
            description: {
              zh: "进入独立界面查看 AI/AO/AENC/VQE/3A 风格的采集与回采链路，按流程顺序切换波束成形、AEC、NS/ANR、去混响和 AGC，观察波形与指标如何变化。",
              en: "Open an independent lab to inspect AI/AO/AENC/VQE/3A-style capture and reference paths, switch beamforming, AEC, NS/ANR, dereverberation, and AGC in flow order, and compare waveform and metrics."
            },
            buttonLabel: { zh: "打开语音增强实验室", en: "Open speech enhancement lab" }
          },
          misconception: {
            zh: "语音增强不能无损移除所有噪声，也不能靠单个参数解决所有问题。回声大可能是 reference 路径或延迟不准，噪声残留可能是噪声估计和语音保护的取舍，声音忽大忽小可能是 AGC 和 limiter 设置不合理。",
            en: "Speech enhancement cannot remove all noise losslessly, and one parameter will not fix everything. Echo may come from wrong reference or delay, residual noise may be a tradeoff in noise estimation and speech protection, and unstable loudness may come from AGC/limiter settings."
          },
          contentDirection: {
            zh: "后续可以继续做独立语音增强实验室：切换单麦/双麦/四麦，调节噪声、回声、混响和说话距离，展示 AEC、NS、AGC、波束成形前后的波形、频谱和听感差异。",
            en: "A later standalone lab could switch among one-, two-, and four-mic setups, adjust noise, echo, reverberation, and speaker distance, and compare waveforms, spectra, and listening results before and after AEC, NS, AGC, and beamforming."
          }
        }
      },
      {
        title: { zh: "空间音频", en: "Spatial Audio" },
        summary: {
          zh: "解释双耳渲染、HRTF、环绕声、3D Audio 和头部追踪。",
          en: "Explain binaural rendering, HRTF, surround sound, 3D audio, and head tracking."
        },
        bullets: [
          { zh: "ITD / ILD / HRTF", en: "ITD / ILD / HRTF" },
          { zh: "双耳渲染、Ambisonics", en: "Binaural rendering, Ambisonics" },
          { zh: "对象音频与头部追踪", en: "Object audio and head tracking" }
        ],
        detail: {
          explanation: {
            zh: "空间音频不是单一格式，而是一套从内容制作、空间编码、渲染到播放设备的完整链路。它利用左右耳到达时间差、声级差、耳廓滤波、房间反射、距离衰减和头部运动线索，让听众觉得声音来自前后、上下、远近不同的位置。耳机里通常把每个虚拟声源经过 HRTF/HRIR 卷积，生成左右耳双耳信号；扬声器系统则按 5.1、7.1、Atmos、车载多扬声器等布局，把声道床或对象音频重新分配到实际扬声器，并结合延迟、增益、EQ 和房间校正。",
            en: "Spatial audio is not one format, but a full chain from content creation, spatial encoding, rendering, and playback. It uses interaural time differences, level differences, pinna filtering, room reflections, distance attenuation, and head-motion cues so listeners perceive sources in front, behind, above, below, near, or far away. Headphones usually convolve each virtual source with HRTF/HRIR data to create binaural left/right ear signals; speaker systems render channel beds or object audio to layouts such as 5.1, 7.1, Atmos, or in-car speaker arrays, with delay, gain, EQ, and room correction."
          },
          termExplanations: [
            {
              name: { zh: "ITD 到达时间差", en: "ITD interaural time difference" },
              explanation: {
                zh: "ITD 表示同一个声音到达左右耳的时间差。声源在左侧时通常先到左耳、再到右耳，大脑会利用这个微小时间差判断水平方向，尤其对低频和中低频定位很重要。",
                en: "ITD is the arrival-time difference between the two ears. A source on the left usually reaches the left ear first and the right ear later, and the brain uses this tiny delay to infer horizontal direction, especially at low and mid-low frequencies."
              }
            },
            {
              name: { zh: "ILD 声级差", en: "ILD interaural level difference" },
              explanation: {
                zh: "ILD 表示同一个声音到达左右耳的声级差。头部会遮挡较高频率的声音，所以右侧声源到左耳时高频会更弱，这种强弱差帮助判断左右方向。",
                en: "ILD is the level difference between the two ears. The head shadows higher frequencies, so a source on the right reaches the left ear with less high-frequency energy; this level contrast helps localize left and right."
              }
            },
            {
              name: { zh: "HRTF / HRIR", en: "HRTF / HRIR" },
              explanation: {
                zh: "HRTF 描述声音从某个方向传到耳膜前，被头部、耳廓、肩膀和躯干滤波后的频率响应；对应的时域脉冲响应常叫 HRIR。耳机空间音频会把虚拟声源和对应方向的 HRIR 做卷积，得到左耳和右耳信号。",
                en: "An HRTF describes the frequency response after sound from a direction is filtered by the head, pinna, shoulders, and torso before reaching the eardrum; the corresponding time-domain impulse response is often called an HRIR. Headphone spatial audio convolves a virtual source with direction-specific HRIRs to generate left-ear and right-ear signals."
              }
            },
            {
              name: { zh: "双耳渲染", en: "Binaural rendering" },
              explanation: {
                zh: "双耳渲染的输入可以是单个声源、多个对象、Ambisonics 声场或声道床。渲染器根据每个声源的方位、距离和房间参数，生成只能通过耳机正确还原的左右耳信号。",
                en: "Binaural rendering can take mono sources, multiple objects, an Ambisonics scene, or a channel bed. The renderer uses direction, distance, and room parameters to create left/right ear signals that reproduce correctly over headphones."
              }
            },
            {
              name: { zh: "环绕声与声道床", en: "Surround and channel beds" },
              explanation: {
                zh: "传统环绕声把内容直接混到固定声道，例如左、右、中置、环绕、低频 LFE。它适合影院和家庭影院，但声场高度依赖扬声器摆位，换到耳机或不同房间时需要重新渲染或虚拟化。",
                en: "Traditional surround mixes content directly to fixed channels such as left, right, center, surrounds, and LFE. It works well for cinema and home theater, but the image depends heavily on speaker placement and needs virtualization or re-rendering for headphones or different rooms."
              }
            },
            {
              name: { zh: "对象音频", en: "Object audio" },
              explanation: {
                zh: "对象音频把声音内容和空间元数据分开：一段声音是对象，位置、移动轨迹、大小和优先级是元数据。播放端渲染器再根据实际扬声器或耳机能力把对象放到空间里。",
                en: "Object audio separates sound content from spatial metadata: an audio signal is an object, while position, motion, size, and priority are metadata. The playback renderer maps those objects to the actual speakers or headphones."
              }
            },
            {
              name: { zh: "Ambisonics", en: "Ambisonics" },
              explanation: {
                zh: "Ambisonics 是一种声场表示方式，常用于 VR、全景视频和游戏。它不直接绑定某几个扬声器，而是用一组通道描述球面声场，播放时再解码到耳机双耳渲染或多扬声器系统。",
                en: "Ambisonics is a scene-based sound-field representation often used in VR, panoramic video, and games. It is not tied to fixed speakers; instead, a set of channels describes a spherical sound field that is decoded to binaural headphones or speaker arrays at playback."
              }
            },
            {
              name: { zh: "头部追踪", en: "Head tracking" },
              explanation: {
                zh: "头部追踪会实时读取头部朝向。当你转头时，渲染器要反向更新虚拟声源相对耳朵的方向，让外部声源听起来仍停在原来的世界位置。延迟过大会导致声像漂移、跟头转或眩晕感。",
                en: "Head tracking reads head orientation in real time. When you turn your head, the renderer updates each virtual source direction relative to the ears so external sources stay fixed in world space. Excess latency can make the image drift, rotate with the head, or feel uncomfortable."
              }
            },
            {
              name: { zh: "距离感与房间反射", en: "Distance and room reflections" },
              explanation: {
                zh: "距离不只靠音量判断，还和直达声/混响声比例、高频衰减、早期反射、空气吸收和动态变化有关。只把声音变小通常会像远处的小声源，不一定像真实远距离。",
                en: "Distance is not judged by level alone; it also depends on direct-to-reverberant ratio, high-frequency loss, early reflections, air absorption, and motion. Simply lowering volume often sounds like a quiet nearby source rather than a realistic far source."
              }
            }
          ],
          keyConcepts: [
            { zh: "人耳定位不是只靠左右音量差：水平定位常依赖 ITD 和 ILD，前后/上下定位更依赖耳廓造成的频谱凹陷和峰值，距离感还需要反射和混响线索。", en: "Localization is not just left/right volume difference: horizontal placement often relies on ITD and ILD, front/back and height rely more on pinna spectral notches and peaks, and distance needs reflection and reverberation cues." },
            { zh: "耳机空间音频的典型链路是：声源或对象 -> 方位/距离参数 -> HRTF/HRIR 卷积 -> 房间反射/混响 -> 左右耳双耳 PCM。", en: "A typical headphone chain is: source or object -> direction/distance parameters -> HRTF/HRIR convolution -> room reflections/reverb -> binaural left/right PCM." },
            { zh: "扬声器空间音频的典型链路是：声道床或对象音频 -> 渲染器 -> 扬声器布局映射 -> 延迟/增益/EQ/房间校正 -> 实际声场。", en: "A typical speaker chain is: channel bed or object audio -> renderer -> speaker-layout mapping -> delay/gain/EQ/room correction -> physical sound field." },
            { zh: "对象音频关注“声音在哪里、如何移动”，Ambisonics 关注“整个球面声场如何表示”；二者都需要在播放端解码或渲染。", en: "Object audio focuses on where sounds are and how they move, while Ambisonics represents the whole spherical sound field; both require decoding or rendering at playback." },
            { zh: "头部追踪的目标是让声源固定在外部世界，而不是粘在耳朵上。运动传感器、蓝牙链路、渲染 buffer 和系统调度都会影响端到端延迟。", en: "Head tracking aims to keep sources fixed in the outside world rather than attached to the ears. Motion sensors, Bluetooth links, render buffers, and system scheduling all affect end-to-end latency." },
            { zh: "HRTF 有个体差异。通用 HRTF 能提供基本方向感，但前后混淆、头内定位和高度感不足很常见，个性化 HRTF 或校准可以改善效果。", en: "HRTFs vary by listener. Generic HRTFs can provide basic directionality, but front/back confusion, inside-the-head localization, and weak height are common; personalized HRTFs or calibration can improve results." },
            { zh: "空间音频和语音增强里的波束成形方向相反：空间音频主要是把声音渲染到空间，波束成形主要是从空间中选择性拾取声音。", en: "Spatial audio and speech-enhancement beamforming are opposite in direction: spatial audio renders sound into space, while beamforming selectively captures sound from space." }
          ],
          lab: {
            type: "spatial-audio",
            title: { zh: "空间音频实验室", en: "Spatial Audio Lab" },
            description: {
              zh: "进入独立界面调节声源角度、距离、房间反射和头部朝向，观察 ITD、ILD、HRTF、双耳渲染和头部追踪指标如何变化。",
              en: "Open an independent lab to adjust source angle, distance, room reflections, and head yaw, then observe ITD, ILD, HRTF, binaural rendering, and head-tracking metrics."
            },
            buttonLabel: { zh: "打开空间音频实验室", en: "Open spatial audio lab" }
          },
          misconception: {
            zh: "简单把左右声道拉宽、加一点混响或做左右声道延迟，不等于真正空间音频。真实空间感需要方向、距离、耳廓滤波、反射、头部运动和播放设备校准共同成立；否则可能只是“变宽”，但定位不准、中心发虚或听久疲劳。",
            en: "Simply widening stereo, adding some reverb, or delaying one channel is not true spatial audio. Convincing space needs direction, distance, pinna filtering, reflections, head motion, and playback calibration together; otherwise it may only sound wider, with poor localization, weak center image, or listening fatigue."
          },
          contentDirection: {
            zh: "后续适合做空间音频实验室：用一个俯视头部图展示声源角度，切换 ITD、ILD、HRTF、房间反射和头部追踪；再对比耳机双耳渲染、5.1/7.1 环绕声、对象音频、Ambisonics、游戏和车载座舱空间音频的链路差异。",
            en: "A later spatial-audio lab could show a top-down head diagram with a movable source angle, toggling ITD, ILD, HRTF, room reflections, and head tracking; it could then compare headphone binaural rendering, 5.1/7.1 surround, object audio, Ambisonics, games, and in-cabin spatial audio."
          }
        }
      }
    ]
  },
  {
    id: "ai",
    icon: BrainCircuit,
    accent: "#b44c6d",
    title: { zh: "AI 音频", en: "AI Audio" },
    description: {
      zh: "把语音识别、合成、生成、事件识别、AI 增强和 AI 编码放进统一视角。",
      en: "Unify speech recognition, synthesis, generation, event detection, AI enhancement, and AI coding."
    },
    topics: [
      {
        title: { zh: "AI 音频总流程", en: "AI Audio Overall Flow" },
        summary: {
          zh: "先理解一段声音如何从麦克风采集成 PCM，再变成特征并送入 AI 模型。",
          en: "First understand how sound is captured as PCM, converted into features, and sent into AI models."
        },
        bullets: [
          { zh: "采集得到 PCM", en: "Capture PCM" },
          { zh: "FFT / STFT / Mel / MFCC", en: "FFT / STFT / Mel / MFCC" },
          { zh: "不同 AI 音频任务的输出", en: "Outputs of different AI audio tasks" }
        ],
        detail: {
          explanation: {
            zh: "AI 音频可以先按一条通用链路理解：真实声音经过麦克风、Codec/ADC 采集后得到 PCM 数字音频；PCM 不是含义，只是数字波形。模型通常不会直接理解每个采样点，而是先分帧加窗，再通过 FFT、STFT、Mel 滤波、MFCC 或 learned embedding，把连续波形变成频谱、时间频率能量图或模型内部表示。很多声音分类任务会把频谱图当作二维特征图，再用 CNN、Transformer 等模型识别哭声、玻璃破碎、狗叫声等模式；但不同任务不会都走完全相同的模型路径，ASR、AI 降噪、AI 编码和生成式音频的输出目标不同。",
            en: "AI audio can first be understood as a general chain: real sound is captured by a microphone and Codec/ADC into PCM digital audio; PCM is not meaning, only a numeric waveform. A model usually does not understand each sample directly. It first frames and windows the signal, then uses FFT, STFT, Mel filters, MFCCs, or learned embeddings to turn the waveform into spectra, time-frequency energy maps, or internal representations. Many sound-classification tasks treat spectrograms as two-dimensional feature maps and use CNNs, Transformers, or related models to recognize patterns such as baby cries, glass breaks, or dog barks. But not every task follows exactly the same path; ASR, AI denoising, AI coding, and generative audio have different output goals."
          },
          termExplanations: [
            {
              name: { zh: "PCM", en: "PCM" },
              explanation: {
                zh: "PCM 是麦克风采集和 ADC 转换后的原始数字采样值。它能还原波形，但不直接表示“说了什么”或“发生了什么声音”。",
                en: "PCM is the raw digital sample stream after microphone capture and ADC conversion. It can reconstruct a waveform, but it does not directly represent what was said or what sound happened."
              }
            },
            {
              name: { zh: "FFT / STFT / Mel / MFCC", en: "FFT / STFT / Mel / MFCC" },
              explanation: {
                zh: "FFT 把短帧信号从时间域转到频率域；STFT 是对连续短帧反复做 FFT；Mel 滤波让频率尺度更接近人耳听感；MFCC 再把谱包络压缩成更紧凑的特征。",
                en: "FFT converts a short frame from time domain to frequency domain; STFT repeatedly applies FFT over many frames; Mel filters make the frequency scale closer to human hearing; MFCCs compress the spectral envelope into compact features."
              }
            },
            {
              name: { zh: "频谱图像识别", en: "Spectrogram recognition" },
              explanation: {
                zh: "声音事件识别常把 log-mel 频谱图看成一张二维图：横轴是时间，纵轴是频率，颜色或亮度是能量。模型从中寻找事件特征，例如玻璃破碎的短促高频、狗叫声的重复脉冲、哭声的调制结构。",
                en: "Sound event recognition often treats a log-mel spectrogram as a 2D map: time on the x-axis, frequency on the y-axis, and color or brightness as energy. The model looks for event patterns such as short high-frequency glass breaks, repeated dog-bark pulses, or modulated baby-cry structure."
              }
            },
            {
              name: { zh: "任务模型", en: "Task model" },
              explanation: {
                zh: "同样的 PCM 可以送去不同任务模型：ASR 输出文字，事件识别输出类别概率，AI 降噪输出增强后的 PCM，AI 编码输出 token/latent 或低码率码流，生成式音频输出新声音。",
                en: "The same PCM can go to different task models: ASR outputs text, event detection outputs class probabilities, AI denoising outputs enhanced PCM, AI coding outputs tokens/latents or low-bitrate streams, and generative audio outputs new sound."
              }
            }
          ],
          keyConcepts: [
            { zh: "先采集得到 PCM 数字音频；PCM 是波形数字，不是语义。", en: "Capture first produces PCM digital audio; PCM is waveform data, not semantic meaning." },
            { zh: "FFT/STFT/Mel/MFCC 是把波形变成模型更容易分析的时间频率特征。", en: "FFT/STFT/Mel/MFCC turn waveforms into time-frequency features that models can analyze more easily." },
            { zh: "把频谱图当图像识别是声音事件识别的一种常见解释方式，但不是所有 AI 音频任务都等同于图像识别。", en: "Treating spectrograms like images is a common way to explain sound event detection, but not every AI audio task is simply image recognition." },
            { zh: "AI 音频的关键问题是：输入是什么、特征如何表示、模型输出什么、后处理如何变成用户可理解结果。", en: "The key AI audio questions are: what is the input, how are features represented, what does the model output, and how does post-processing turn it into a user-understandable result." }
          ],
          lab: {
            type: "ai-audio",
            initialMode: "overview",
            title: { zh: "AI 音频总流程实验室", en: "AI Audio Overall Flow Lab" },
            description: {
              zh: "进入独立文章界面，用总流程图理解 PCM、特征、模型、任务输出和后处理的关系。",
              en: "Open an independent article page with a flow diagram explaining PCM, features, models, task outputs, and post-processing."
            },
            buttonLabel: { zh: "打开 AI 音频总流程实验室", en: "Open AI audio overall flow lab" }
          },
          misconception: {
            zh: "不要把所有 AI 音频都理解成“频谱图像识别”。频谱图分类确实常见，但语音识别、降噪、编码和生成会使用不同网络结构、训练目标和输出形式。",
            en: "Do not treat all AI audio as spectrogram image recognition. Spectrogram classification is common, but speech recognition, denoising, coding, and generation use different network structures, training objectives, and outputs."
          },
          contentDirection: {
            zh: "适合先作为 AI 音频章节的入口，用流程图解释从 PCM 到特征、模型、任务输出和后处理的完整链路。",
            en: "This works as the entry point for the AI audio chapter, using a flow diagram to explain PCM, features, models, task outputs, and post-processing."
          }
        }
      },
      {
        title: { zh: "语音识别 ASR", en: "Speech Recognition ASR" },
        summary: {
          zh: "理解语音转文字、端到端识别、流式识别、唤醒词和多语言识别。",
          en: "Understand speech-to-text, end-to-end recognition, streaming ASR, wake words, and multilingual recognition."
        },
        bullets: [
          { zh: "语音转文字流程", en: "Speech-to-text pipeline" },
          { zh: "端到端与流式识别", en: "End-to-end and streaming recognition" },
          { zh: "唤醒词与多语言", en: "Wake words and multilingual ASR" }
        ],
        detail: {
          explanation: {
            zh: "语音识别把连续的语音波形转换成可编辑、可检索的文字，但 ASR 并不是把每个采样点直接翻译成文字。PCM 只是连续的压力变化数字，系统通常先把它切成 10 ms 或 20 ms 左右的短帧，再提取每帧的频率能量结构，形成 log-mel、MFCC 或神经网络 embedding。随后 Encoder 把这些连续声学变化压成更稳定的上下文表示，CTC、Attention 或 Transducer 等识别头再估计最可能的 token 序列，最后经过语言上下文、热词、标点、时间戳和说话人信息等后处理，得到最终文本。",
            en: "Speech recognition turns continuous speech waveforms into editable, searchable text, but ASR does not translate each sample directly into words. PCM is only a sequence of pressure-change numbers. A system usually slices it into short frames of about 10 ms or 20 ms, extracts frequency-energy structure from each frame, and forms log-mel features, MFCCs, or neural embeddings. An encoder then compresses those acoustic changes into more stable contextual representations; CTC, attention, or transducer heads estimate the most likely token sequence; and language context, hotwords, punctuation, timestamps, and speaker metadata produce the final text."
          },
          termExplanations: [
            {
              name: { zh: "PCM 输入", en: "PCM input" },
              explanation: {
                zh: "输入通常是麦克风采集到的 PCM 采样值，例如 16 kHz 单声道语音。PCM 能描述波形，但它本身没有“字”的概念，因此不能直接等于文本，需要先变成模型能理解的短时声学模式。",
                en: "The input is usually PCM samples captured by a microphone, such as 16 kHz mono speech. PCM describes the waveform, but it has no word-level meaning by itself, so it must be converted into short-time acoustic patterns a model can use."
              }
            },
            {
              name: { zh: "分帧加窗", en: "Framing and windowing" },
              explanation: {
                zh: "语音在很短时间内可以近似看成稳定信号，所以 ASR 会把长波形切成短帧，例如 10 ms 或 20 ms，并用窗函数减少帧边界突变。输出是一串短时分析片段，后面才能计算频谱或送入神经网络。",
                en: "Speech can be treated as roughly stable over a short interval, so ASR slices a long waveform into frames such as 10 ms or 20 ms and applies a window to reduce boundary jumps. The output is a sequence of short analysis segments ready for spectral features or neural input."
              }
            },
            {
              name: { zh: "log-mel / MFCC", en: "log-mel / MFCC" },
              explanation: {
                zh: "log-mel 和 MFCC 都是在描述每帧语音里不同频率区域的能量。log-mel 会把每帧语音变成更接近人耳听感的频率能量图，MFCC 则进一步压缩频谱包络；它们让模型更关注音素、元音、辅音等语音结构，而不是原始采样点细节。",
                en: "Log-mel and MFCC features describe how much energy each speech frame has in different frequency regions. Log-mel is like a time-varying frequency-energy map, while MFCC compresses the spectral envelope further; both help models focus on phonetic structure rather than raw sample details."
              }
            },
            {
              name: { zh: "Encoder 编码器", en: "Encoder" },
              explanation: {
                zh: "Encoder 接收连续的特征帧，结合前后上下文，把“局部频谱变化”变成更高层的语音表示。输出仍然是时间序列，但每个位置已经包含更多上下文信息，方便后续判断它像哪个音素、拼音、字或 token。",
                en: "The encoder consumes feature frames, combines surrounding context, and turns local spectral changes into higher-level speech representations. Its output is still a time sequence, but each position carries richer context for predicting phonemes, pinyin, characters, or tokens."
              }
            },
            {
              name: { zh: "CTC / Attention / Transducer", en: "CTC / Attention / Transducer" },
              explanation: {
                zh: "CTC 适合把很多帧对齐到较短 token 序列，中间允许空白符；Attention 更像看完整上下文后逐步生成文本；Transducer/RNNT 适合流式识别，把声学帧和已输出 token 一起决定下一个 token。",
                en: "CTC maps many acoustic frames to a shorter token sequence with blank symbols. Attention generates text step by step while looking at context. Transducer/RNNT is well suited to streaming ASR because it uses both acoustic frames and previously emitted tokens to decide the next token."
              }
            },
            {
              name: { zh: "解码与后处理", en: "Decoding and post-processing" },
              explanation: {
                zh: "模型输出通常是多个 token 候选和概率，解码器会结合语言约束、热词和上下文选择更合理的句子。后处理再补标点、大小写、数字格式、时间戳和说话人信息，让输出更适合字幕、会议纪要或语音控制。",
                en: "The model usually outputs token candidates and probabilities. A decoder uses language constraints, hotwords, and context to choose a more plausible sentence. Post-processing adds punctuation, casing, number formatting, timestamps, and speaker metadata for captions, meeting notes, or voice control."
              }
            },
            {
              name: { zh: "流式识别", en: "Streaming ASR" },
              explanation: {
                zh: "流式 ASR 不能等整句话结束才处理，需要边接收小块音频边输出文字。它要控制首字延迟和实时率，还要处理临时结果回滚，例如先显示“打开客”，再修正为“打开客厅灯”。",
                en: "Streaming ASR cannot wait for the full utterance; it receives small audio chunks and emits text incrementally. It must control first-token latency and real-time factor, while handling partial-result rollback such as correcting an early phrase once more context arrives."
              }
            },
            {
              name: { zh: "WER / CER / RTF", en: "WER / CER / RTF" },
              explanation: {
                zh: "WER 是词错误率，CER 是字错误率，RTF 是实时率。离线转写更看最终 WER/CER，实时交互还要看首字延迟、稳定性、端点检测和噪声鲁棒性。",
                en: "WER is word error rate, CER is character error rate, and RTF is real-time factor. Offline transcription focuses on final WER/CER, while real-time interaction also depends on first-token latency, stability, endpointing, and noise robustness."
              }
            }
          ],
          keyConcepts: [
            { zh: "ASR 的核心不是“采样点到文字”的直接映射，而是把短时声学模式逐步抽象成 token 序列。", en: "ASR is not a direct sample-to-word mapping; it gradually abstracts short-time acoustic patterns into token sequences." },
            { zh: "离线 ASR 可利用更长上下文和更复杂解码，流式 ASR 更重视首字延迟、增量稳定性和临时结果回滚。", en: "Offline ASR can use longer context and heavier decoding, while streaming ASR prioritizes first-token latency, incremental stability, and partial-result rollback." },
            { zh: "声学模型解决“听起来像什么”，语言上下文和解码器解决“这句话更可能是什么”。", en: "Acoustic models answer what the sound resembles, while language context and decoding answer what sentence is most plausible." },
            { zh: "WER、CER、RTF、首字延迟、端点检测、热词召回和噪声鲁棒性需要一起评估。", en: "WER, CER, RTF, first-token latency, endpointing, hotword recall, and noise robustness need to be evaluated together." },
            { zh: "唤醒词、标点恢复、数字格式化、时间戳和说话人分离常与 ASR 组成完整语音入口。", en: "Wake words, punctuation restoration, number formatting, timestamps, and speaker diarization often combine with ASR to form a complete voice interface." },
            { zh: "ASR 输出的是语言内容，不负责判断玻璃破碎、狗叫声这类非语音事件；这些属于声音事件识别。", en: "ASR outputs language content and does not classify non-speech events such as glass breaks or dog barks; those belong to sound event detection." }
          ],
          lab: {
            type: "ai-audio",
            initialMode: "asr",
            title: { zh: "语音识别 ASR 实验室", en: "Speech Recognition ASR Lab" },
            description: {
              zh: "进入独立文章界面，理解语音从 PCM、特征、Encoder、CTC/RNNT 到文本后处理的流程。",
              en: "Open an independent article page explaining speech from PCM, features, encoder, CTC/RNNT, and text post-processing."
            },
            buttonLabel: { zh: "打开语音识别 ASR 实验室", en: "Open speech recognition ASR lab" }
          },
          misconception: {
            zh: "识别率高不等于在所有噪声、口音和设备上都稳定；真实产品还要验证远场、多人、打断、专有名词和隐私边界。",
            en: "High recognition accuracy does not mean stable behavior across all noise, accents, and devices; real products must also validate far-field use, multiple speakers, interruptions, proper nouns, and privacy boundaries."
          },
          contentDirection: {
            zh: "适合扩展为从波形到文字的流程图，并加入流式字幕、会议纪要和车载语音三个应用案例。",
            en: "This can become a waveform-to-text pipeline diagram with examples for live captions, meeting notes, and in-car voice control."
          }
        }
      },
      {
        title: { zh: "语音合成 TTS", en: "Text-to-Speech TTS" },
        summary: {
          zh: "说明文本转语音、声学模型、声码器、多音色和情感语音。",
          en: "Explain text-to-speech, acoustic models, vocoders, multi-speaker voices, and expressive speech."
        },
        bullets: [
          { zh: "声学模型与声码器", en: "Acoustic models and vocoders" },
          { zh: "多音色、情感语音", en: "Multi-speaker and expressive speech" },
          { zh: "实时 TTS 与高保真 TTS", en: "Real-time and high-fidelity TTS" }
        ],
        detail: {
          explanation: {
            zh: "语音合成把文本转换成自然语音。现代 TTS 通常先处理文本、读音和韵律，再由声学模型生成声学表示，最后通过声码器输出波形，可用于导航、客服、播客、配音和无障碍阅读。",
            en: "Text-to-speech converts text into natural speech. Modern TTS usually normalizes text, predicts pronunciation and prosody, generates acoustic representations, and uses a vocoder to output waveforms for navigation, support, podcasts, dubbing, and accessibility."
          },
          termExplanations: [
            {
              name: { zh: "文本规范化", en: "Text normalization" },
              explanation: {
                zh: "把 2026、3.5V、USB、kg 等文本转成可朗读的形式。规范化错误会让语音听起来像读错数字或单位。",
                en: "Converts text such as 2026, 3.5V, USB, or kg into speakable forms. Errors here sound like wrong numbers or units."
              }
            },
            {
              name: { zh: "韵律预测", en: "Prosody prediction" },
              explanation: {
                zh: "预测停顿、重音、语速和语调。它决定一句话像机械朗读，还是像自然表达。",
                en: "Predicts pauses, stress, speed, and intonation. It decides whether a sentence sounds mechanical or naturally expressed."
              }
            },
            {
              name: { zh: "神经声码器", en: "Neural vocoder" },
              explanation: {
                zh: "把梅尔谱、codec token 或其他声学表示还原成波形。声码器直接影响音质、实时性和端侧算力需求。",
                en: "Turns mel spectrograms, codec tokens, or other acoustic representations into waveform audio, directly affecting quality, latency, and edge compute."
              }
            }
          ],
          keyConcepts: [
            { zh: "文本规范化负责把数字、日期、单位和缩写转换成可朗读形式。", en: "Text normalization converts numbers, dates, units, and abbreviations into speakable forms." },
            { zh: "韵律包含停顿、重音、语速和语调，决定语音是否自然。", en: "Prosody includes pauses, stress, speed, and intonation, which strongly shape naturalness." },
            { zh: "声码器把声学特征转换成最终波形，影响音质、速度和设备成本。", en: "The vocoder converts acoustic features into the final waveform and affects quality, speed, and device cost." },
            { zh: "TTS 生成的是可听语音，不等同于音乐/音效生成；它更关注可懂度、自然度、音色一致性和延迟。", en: "TTS generates intelligible speech rather than music or sound effects; it focuses more on intelligibility, naturalness, voice consistency, and latency." }
          ],
          lab: {
            type: "ai-audio",
            initialMode: "tts",
            title: { zh: "语音合成 TTS 实验室", en: "Text-to-Speech TTS Lab" },
            description: {
              zh: "进入独立文章界面，理解文本规范化、韵律预测、声学模型和神经声码器如何生成语音。",
              en: "Open an independent article page explaining how text normalization, prosody prediction, acoustic models, and neural vocoders generate speech."
            },
            buttonLabel: { zh: "打开语音合成 TTS 实验室", en: "Open text-to-speech TTS lab" }
          },
          misconception: {
            zh: "音色像真人不代表表达自然；断句、重音、情绪、上下文理解和长文本稳定性同样决定体验。",
            en: "A realistic voice timbre does not guarantee natural expression; phrasing, stress, emotion, context, and long-form stability also define the experience."
          },
          contentDirection: {
            zh: "适合做文本到波形的模块图，并用同一句话的不同语速、情绪和停顿展示韵律作用。",
            en: "This fits a text-to-waveform module diagram and examples showing how speed, emotion, and pauses change the same sentence."
          }
        }
      },
      {
        title: { zh: "音频生成", en: "Audio Generation" },
        summary: {
          zh: "覆盖音乐生成、音效生成、声音克隆、音频修复和版权风险。",
          en: "Cover music generation, sound effects, voice cloning, audio restoration, and copyright risks."
        },
        bullets: [
          { zh: "音乐与音效生成", en: "Music and sound generation" },
          { zh: "声音克隆", en: "Voice cloning" },
          { zh: "隐私、版权与安全边界", en: "Privacy, copyright, and safety boundaries" }
        ],
        detail: {
          explanation: {
            zh: "音频生成使用 AI 根据文本、旋律、参考声音或视频画面生成新的音乐、音效、人声或环境声。它能提升内容生产效率，但也需要处理可控性、版权、身份冒用和质量一致性问题。",
            en: "Audio generation uses AI to create music, sound effects, voices, or ambience from text, melody, reference audio, or video. It can speed up content creation, but it also raises control, copyright, impersonation, and consistency challenges."
          },
          termExplanations: [
            {
              name: { zh: "条件控制", en: "Conditioning" },
              explanation: {
                zh: "条件可以是文本、旋律、节拍、风格标签、参考音色或视频画面。条件越清楚，模型越容易生成符合目标的声音。",
                en: "Conditioning can be text, melody, tempo, style tags, reference timbre, or video. Clearer conditioning makes the generated audio easier to steer."
              }
            },
            {
              name: { zh: "扩散 / Transformer", en: "Diffusion / Transformer" },
              explanation: {
                zh: "扩散模型常把噪声逐步还原成音频表示；Transformer 常把音频 token 当序列生成。不同模型在质量、速度和可控性上取舍不同。",
                en: "Diffusion models often denoise audio representations step by step; Transformers often generate audio tokens as sequences. They trade quality, speed, and controllability differently."
              }
            },
            {
              name: { zh: "声音克隆", en: "Voice cloning" },
              explanation: {
                zh: "用少量参考音频学习或匹配某个音色。产品中必须处理授权、身份验证、水印和滥用检测。",
                en: "Matches a voice from a small reference sample. Products must handle consent, identity checks, watermarking, and abuse detection."
              }
            }
          ],
          keyConcepts: [
            { zh: "条件控制决定生成结果如何响应文本、风格、节奏、旋律或参考音色。", en: "Conditioning determines how generation responds to text, style, rhythm, melody, or reference timbre." },
            { zh: "扩散、Transformer、神经声码器等方法常用于不同粒度的音频生成。", en: "Diffusion models, Transformers, neural vocoders, and related methods are used at different audio granularities." },
            { zh: "水印、授权数据和滥用检测是生成式音频产品的重要安全环节。", en: "Watermarking, licensed data, and abuse detection are important safety layers for generative audio products." },
            { zh: "生成式音频的目标是创造新内容，和 ASR 的识别、TTS 的朗读、事件识别的分类目标不同。", en: "Generative audio creates new content, which differs from ASR recognition, TTS reading, and event-classification goals." }
          ],
          lab: {
            type: "ai-audio",
            initialMode: "generation",
            title: { zh: "音频生成实验室", en: "Audio Generation Lab" },
            description: {
              zh: "进入独立文章界面，理解文本、旋律、参考音色和生成模型如何产生音乐、音效、人声和环境声。",
              en: "Open an independent article page explaining how text, melody, reference timbre, and generative models create music, effects, voices, and ambience."
            },
            buttonLabel: { zh: "打开音频生成实验室", en: "Open audio generation lab" }
          },
          misconception: {
            zh: "AI 生成内容不天然等于可商用或可控；训练数据来源、相似性、声音授权和平台规则都需要确认。",
            en: "AI-generated audio is not automatically commercial-safe or controllable; training data, similarity, voice consent, and platform rules must be checked."
          },
          contentDirection: {
            zh: "适合做生成式音频应用地图，分别讲音乐、音效、声音克隆、修复和自动配乐的边界。",
            en: "This can become a generative-audio application map covering music, sound effects, voice cloning, restoration, and automatic scoring."
          }
        }
      },
      {
        title: { zh: "AI 音频事件识别", en: "AI Audio Event Detection" },
        summary: {
          zh: "识别哭声、玻璃破碎、狗叫声、警报声等非语音事件。",
          en: "Detect non-speech events such as baby cries, glass breaks, dog barks, and alarms."
        },
        bullets: [
          { zh: "声音事件分类", en: "Sound event classification" },
          { zh: "连续监听与误报控制", en: "Continuous listening and false-alarm control" },
          { zh: "安防、看护、车载与 IoT", en: "Security, care, automotive, and IoT" }
        ],
        detail: {
          explanation: {
            zh: "AI 音频事件识别关注“发生了什么声音”，而不是“说了什么话”。系统通常把 PCM 变成梅尔谱、log-mel 特征或 learned embedding，再用分类模型判断哭声、玻璃破碎、狗叫声、烟雾报警器、门铃、枪声、碰撞声等事件，并输出时间范围和置信度。",
            en: "AI audio event detection asks what sound happened, not what words were spoken. A system usually converts PCM into mel spectrograms, log-mel features, or learned embeddings, then uses a classifier to detect events such as baby cries, glass breaks, dog barks, smoke alarms, doorbells, gunshots, or impacts with timestamps and confidence."
          },
          termExplanations: [
            {
              name: { zh: "声音事件分类", en: "Sound event classification" },
              explanation: {
                zh: "给一段音频打标签，例如“哭声”“狗叫声”“玻璃破碎”。如果还要标出发生时间，就接近声音事件检测 SED。",
                en: "Assigns labels to an audio segment, such as baby cry, dog bark, or glass break. If it also marks time ranges, it becomes closer to sound event detection."
              }
            },
            {
              name: { zh: "置信度阈值", en: "Confidence threshold" },
              explanation: {
                zh: "阈值越低越容易触发，但误报更多；阈值越高误报减少，但可能漏掉较弱或被噪声遮挡的事件。",
                en: "A lower threshold triggers more easily but raises false alarms; a higher threshold reduces false alarms but may miss quiet or masked events."
              }
            },
            {
              name: { zh: "边缘监听", en: "Edge listening" },
              explanation: {
                zh: "摄像头、门铃、婴儿看护器和车机常在本地跑小模型，只有命中事件或用户授权时才上传片段，降低延迟和隐私风险。",
                en: "Cameras, doorbells, baby monitors, and vehicles often run small local models and upload clips only on events or with consent, reducing latency and privacy risk."
              }
            }
          ],
          keyConcepts: [
            { zh: "事件识别通常不是 ASR：哭声、玻璃破碎、狗叫声没有明确文字内容，但仍有可学习的频谱和时间模式。", en: "Event recognition is usually not ASR: baby cries, glass breaks, and dog barks have no clear words, but they still have learnable spectral and temporal patterns." },
            { zh: "短促事件要关注时间分辨率和触发延迟，持续事件要关注起止边界和重复告警策略。", en: "Short events need time resolution and trigger latency; sustained events need onset/offset boundaries and repeated-alert strategy." },
            { zh: "模型准确率必须和误报、漏报、场景噪声、设备麦克风位置一起评估。", en: "Model accuracy must be evaluated together with false alarms, misses, scene noise, and microphone placement." },
            { zh: "常见产品会把唤醒词、事件识别和本地隐私策略组合，而不是把所有原始音频长期上传。", en: "Products often combine wake words, event detection, and local privacy policy instead of uploading raw audio continuously." }
          ],
          lab: {
            type: "ai-audio",
            initialMode: "event",
            title: { zh: "AI 音频事件识别实验室", en: "AI Audio Event Detection Lab" },
            description: {
              zh: "进入独立文章界面，理解哭声、玻璃破碎、狗叫声等事件如何由频谱图和分类模型识别。",
              en: "Open an independent article page explaining how baby cries, glass breaks, dog barks, and related events are detected from spectrograms and classifiers."
            },
            buttonLabel: { zh: "打开 AI 音频事件识别实验室", en: "Open AI audio event detection lab" }
          },
          misconception: {
            zh: "声音事件识别不是简单比音量大小。玻璃破碎可能很短但高频能量强，哭声有调制和谐波结构，狗叫声有重复脉冲；模型要看时间和频率模式。",
            en: "Sound event detection is not simple loudness matching. Glass breaks can be short with strong high-frequency energy, baby cries have modulation and harmonic structure, and dog barks have repeated pulses; models need temporal and spectral patterns."
          },
          contentDirection: {
            zh: "适合做事件识别实验室：用频谱块展示哭声、玻璃破碎、狗叫声的不同模式，并加入阈值、误报和边缘部署说明。",
            en: "This fits an event-detection lab showing different spectrogram patterns for baby cries, glass breaks, and dog barks, with threshold, false-alarm, and edge-deployment notes."
          }
        }
      },
      {
        title: { zh: "AI 音频增强", en: "AI Audio Enhancement" },
        summary: {
          zh: "说明 AI 降噪、去混响、语音分离、神经后滤波和模型部署。",
          en: "Explain AI denoising, dereverberation, speech separation, neural post-filters, and deployment."
        },
        bullets: [
          { zh: "AI 降噪与语音保真", en: "AI denoising and speech preservation" },
          { zh: "语音分离、去混响", en: "Speech separation and dereverberation" },
          { zh: "端侧模型、延迟和算力", en: "Edge models, latency, and compute" }
        ],
        detail: {
          explanation: {
            zh: "AI 音频增强把带噪、混响或多人叠加的音频输入神经网络，让模型估计干净语音、目标声源或频谱掩蔽。它常用于会议、耳机、直播、助听、车载和短视频处理。和传统 DSP 的固定滤波不同，AI 增强依赖训练数据学习噪声、语音和房间模式，但也可能引入音乐噪声、语音发闷、断字和过度抑制。",
            en: "AI audio enhancement feeds noisy, reverberant, or overlapping audio into neural networks so the model can estimate clean speech, a target source, or a spectral mask. It is common in conferencing, headsets, live streaming, hearing assistance, cars, and short-video processing. Unlike fixed traditional DSP filters, AI enhancement learns noise, speech, and room patterns from data, but can introduce artifacts such as musical noise, muffled speech, clipped words, or over-suppression."
          },
          termExplanations: [
            {
              name: { zh: "神经降噪", en: "Neural denoising" },
              explanation: {
                zh: "模型估计每个时间频率区域中语音和噪声的占比，再保留语音、压低噪声。强降噪会降低底噪，但可能损伤辅音和空气感。",
                en: "The model estimates how much speech and noise exist in each time-frequency region, preserving speech while reducing noise. Strong denoising lowers background noise but may damage consonants and airiness."
              }
            },
            {
              name: { zh: "语音分离", en: "Speech separation" },
              explanation: {
                zh: "从重叠说话或背景人声中分离目标说话人。它比普通降噪更难，因为干扰源也是语音。",
                en: "Separates a target speaker from overlapping speech or background voices. It is harder than ordinary denoising because the interference is also speech."
              }
            },
            {
              name: { zh: "神经后滤波", en: "Neural post-filter" },
              explanation: {
                zh: "在传统 AEC/NS/AGC 之后再用小模型修补残留噪声、回声和音色损伤，是很多实时产品折中质量和算力的方式。",
                en: "A small model after traditional AEC/NS/AGC can clean residual noise, echo, and timbre damage, which is a common compromise between quality and compute."
              }
            }
          ],
          keyConcepts: [
            { zh: "AI 增强应和语音增强卡片区分：传统语音增强讲 AEC/AGC/ANR/Beamforming 的工程链路，这里重点讲学习型模型如何估计掩蔽、目标语音或残差信号。", en: "AI enhancement should be separated from the speech-enhancement card: traditional enhancement covers AEC/AGC/ANR/beamforming engineering chains, while this card focuses on learned models estimating masks, target speech, or residual signals." },
            { zh: "训练数据决定鲁棒性；模型没见过的噪声、口音、麦克风和房间会显著影响效果。", en: "Training data defines robustness; unseen noise, accents, microphones, and rooms can strongly affect results." },
            { zh: "端侧实时 AI 增强要同时满足帧长、模型大小、NPU/DSP/CPU 算力、功耗和隐私。", en: "Real-time edge AI enhancement must satisfy frame size, model size, NPU/DSP/CPU compute, power, and privacy constraints." },
            { zh: "评估不能只看降噪量，也要看语音可懂度、自然度、延迟、残留噪声和算法伪影。", en: "Evaluation cannot only measure noise reduction; it also needs intelligibility, naturalness, latency, residual noise, and artifacts." }
          ],
          lab: {
            type: "ai-audio",
            initialMode: "enhancement",
            title: { zh: "AI 音频增强实验室", en: "AI Audio Enhancement Lab" },
            description: {
              zh: "进入独立文章界面，理解 AI 降噪、语音分离、去混响和神经后滤波的基本链路。",
              en: "Open an independent article page explaining AI denoising, speech separation, dereverberation, and neural post-filtering."
            },
            buttonLabel: { zh: "打开 AI 音频增强实验室", en: "Open AI audio enhancement lab" }
          },
          misconception: {
            zh: "AI 降噪不是越强越好。过强的模型或参数可能把轻声、尾音、摩擦音当成噪声切掉，让语音听起来更干净但更不自然。",
            en: "AI denoising is not better just because it is stronger. Aggressive models or settings can remove soft speech, endings, and fricatives as if they were noise, making speech cleaner but less natural."
          },
          contentDirection: {
            zh: "适合做 AI 增强实验室：展示带噪波形、特征图、模型掩蔽、增强后波形和伪影风险，并和传统 AEC/NS 链路做边界说明。",
            en: "This fits an AI enhancement lab showing noisy waveform, feature map, model mask, enhanced waveform, and artifact risk, with clear boundaries from traditional AEC/NS pipelines."
          }
        }
      },
      {
        title: { zh: "AI 音频编码", en: "AI Audio Coding" },
        summary: {
          zh: "介绍神经音频编码、语义 token、低码率语音和生成式重建。",
          en: "Introduce neural audio coding, semantic tokens, low-bitrate speech, and generative reconstruction."
        },
        bullets: [
          { zh: "神经编码器 / 解码器", en: "Neural encoder / decoder" },
          { zh: "codec token 与 latent", en: "Codec tokens and latents" },
          { zh: "低码率语音、音乐和通信", en: "Low-bitrate speech, music, and communication" }
        ],
        detail: {
          explanation: {
            zh: "AI 音频编码用神经网络把 PCM 压缩成离散 token 或连续 latent，再由神经解码器重建波形。它和 MP3/AAC/Opus 这类传统 codec 不同：传统 codec 主要依赖听觉模型、变换和熵编码，AI codec 则让模型学习哪些声音信息最该保留，甚至可用生成模型补全细节。它适合低码率语音、实时通信、生成式语音 token、内容编辑和弱网传输，但要关注延迟、算力、跨设备一致性和失真类型。",
            en: "AI audio coding uses neural networks to compress PCM into discrete tokens or continuous latents, then reconstructs waveform audio with a neural decoder. It differs from traditional codecs such as MP3, AAC, and Opus: traditional codecs rely mainly on psychoacoustic models, transforms, and entropy coding, while AI codecs learn which sound information to preserve and may use generative reconstruction. It suits low-bitrate speech, real-time communication, generative speech tokens, content editing, and weak networks, but latency, compute, device consistency, and distortion types matter."
          },
          termExplanations: [
            {
              name: { zh: "codec token", en: "Codec token" },
              explanation: {
                zh: "模型把短帧音频映射成离散编号序列。生成式语音模型可以直接预测这些 token，再由解码器还原为语音。",
                en: "The model maps short audio frames into a sequence of discrete IDs. Generative speech models can predict these tokens directly, then a decoder turns them back into speech."
              }
            },
            {
              name: { zh: "latent", en: "Latent" },
              explanation: {
                zh: "latent 是模型内部的压缩表示，可以是连续向量或量化后的 token。它不是人能直接听到的音频，而是供解码器重建声音的表示。",
                en: "A latent is a compressed internal representation, either continuous vectors or quantized tokens. It is not directly audible audio; it is used by a decoder to reconstruct sound."
              }
            },
            {
              name: { zh: "生成式重建", en: "Generative reconstruction" },
              explanation: {
                zh: "在极低码率下，模型可能不是逐点还原所有细节，而是根据保留下来的语音/音色信息生成听起来合理的细节。",
                en: "At very low bitrates, the model may not reconstruct every detail sample by sample; it generates plausible details from preserved speech and timbre information."
              }
            }
          ],
          keyConcepts: [
            { zh: "AI codec 的基本流程是 PCM -> 神经编码器 -> token/latent -> 码流/网络 -> 神经解码器 -> PCM。", en: "The basic AI codec flow is PCM -> neural encoder -> token/latent -> bitstream/network -> neural decoder -> PCM." },
            { zh: "AI 编码和传统音频编解码卡片不冲突：传统卡片讲 PCM/WAV/MP3/AAC/Opus 的工程和原理，这里讲学习型压缩表示和神经重建。", en: "AI coding does not conflict with the traditional audio-codec card: that card explains PCM/WAV/MP3/AAC/Opus engineering and principles, while this one covers learned compressed representations and neural reconstruction." },
            { zh: "低码率并不等于无损；AI codec 可能保留语音可懂度，但改变空间感、背景声、瞬态或音色细节。", en: "Low bitrate does not mean lossless; an AI codec may preserve intelligibility while changing spatial cues, background sound, transients, or timbre details." },
            { zh: "实时通信要看算法延迟、帧长、丢包恢复和端侧算力；离线生成则更看自然度和一致性。", en: "Real-time communication depends on algorithmic latency, frame size, packet-loss recovery, and edge compute; offline generation focuses more on naturalness and consistency." }
          ],
          lab: {
            type: "ai-audio",
            initialMode: "codec",
            title: { zh: "AI 音频编码实验室", en: "AI Audio Coding Lab" },
            description: {
              zh: "进入独立文章界面，理解 PCM、神经编码器、token/latent、低码率码流和神经解码器之间的关系。",
              en: "Open an independent article page explaining PCM, neural encoders, tokens/latents, low-bitrate streams, and neural decoders."
            },
            buttonLabel: { zh: "打开 AI 音频编码实验室", en: "Open AI audio coding lab" }
          },
          misconception: {
            zh: "AI 编码不是把 MP3 再包一层 AI，也不是一定比传统 codec 更好。它在低码率和语义表示上有优势，但对算力、训练数据、延迟和兼容性更敏感。",
            en: "AI coding is not MP3 wrapped in AI, and it is not always better than traditional codecs. It can help at low bitrates and semantic representation, but is more sensitive to compute, training data, latency, and compatibility."
          },
          contentDirection: {
            zh: "适合做 AI 编码实验室：把传统 codec 的“变换/量化/熵编码”和 AI codec 的“神经编码/token/神经解码”并排对比，并展示低码率通信与生成式语音 token 两种场景。",
            en: "This fits an AI coding lab comparing traditional transform/quantization/entropy coding with neural encoding/tokens/neural decoding, plus low-bitrate communication and generative speech-token scenarios."
          }
        }
      }
    ]
  },
  {
    id: "applications",
    icon: Binary,
    accent: "#6d8c3f",
    title: { zh: "应用场景", en: "Applications" },
    description: {
      zh: "把音频技术放进产品、设备和行业场景中理解。",
      en: "Understand audio technology through products, devices, and industry scenarios."
    },
    topics: [
      {
        title: { zh: "会议与通信", en: "Conferencing and Communication" },
        summary: {
          zh: "分析视频会议音频、远场拾音、回声消除、实时字幕和翻译。",
          en: "Analyze conferencing audio, far-field capture, echo cancellation, live captions, and translation."
        },
        bullets: [
          { zh: "远场拾音", en: "Far-field capture" },
          { zh: "多人语音增强", en: "Multi-speaker enhancement" },
          { zh: "实时字幕与翻译", en: "Live captions and translation" }
        ],
        detail: {
          explanation: {
            zh: "会议与通信音频要在网络、设备和环境都不稳定的情况下保持清晰、同步和低延迟。采集端从麦克风阵列拿到近端语音，经 AEC、降噪、AGC、编码和网络发送到远端；播放端接收远端码流，经 Jitter Buffer、PLC、解码、混音和扬声器播放。AEC 需要拿到扬声器播放的远端参考信号，才能估计并抵消被麦克风再次拾取的回声。Jitter Buffer 会用少量缓存换取连续播放，但缓存过大也会让通话和字幕变慢。",
            en: "Conferencing and communication audio must stay clear, synchronized, and low-latency despite unstable networks, devices, and rooms. The capture side takes near-end speech from the microphone array, then passes AEC, noise suppression, AGC, encoding, and network transport. The playback side receives remote packets, then applies a jitter buffer, PLC, decoding, mixing, and speaker playback. AEC needs the far-end reference signal being played by the speaker so it can estimate and cancel the echo picked up again by the microphone. A jitter buffer trades a little buffering for continuous playback, but too much buffering makes calls and captions feel slow."
          },
          lab: {
            type: "meeting-communication",
            title: { zh: "会议与通信实验室", en: "Conferencing and Communication Lab" },
            description: {
              zh: "用端到端链路图理解上行采集、下行播放、回采参考、网络缓冲和字幕链路如何共同影响会议体验。",
              en: "Use an end-to-end chain diagram to understand how uplink capture, downlink playback, render reference, network buffering, and captions shape meeting quality."
            },
            buttonLabel: { zh: "打开会议与通信实验室", en: "Open conferencing and communication lab" }
          },
          keyConcepts: [
            { zh: "上行链路关注本端说话是否清楚：麦克风、AEC、NS/ANR、AGC、编码和上行网络共同决定对方听到什么。", en: "The uplink asks whether local speech is clear: microphones, AEC, NS/ANR, AGC, encoding, and upstream network together shape what the far end hears." },
            { zh: "下行链路关注远端声音是否连续：Jitter Buffer、PLC、解码、混音和扬声器共同决定本端听到什么。", en: "The downlink asks whether remote audio is continuous: jitter buffer, PLC, decoding, mixing, and speaker playback shape what the local user hears." },
            { zh: "回声消除和双讲处理决定远程会议能否自然打断；AEC 参考信号错位或缺失时，回声会明显变大。", en: "Echo cancellation and double-talk handling determine natural interruption; echo grows when the AEC reference is missing or misaligned." },
            { zh: "实时字幕和翻译通常走 ASR/翻译链路，受采集质量、端点检测、网络、模型推理和稳定出字策略共同影响。", en: "Live captions and translation usually go through ASR/translation chains and depend on capture quality, endpointing, network, inference, and partial-result stabilization." }
          ],
          misconception: {
            zh: "会议音质不是只靠一个好麦克风。房间混响、扬声器回放、回采参考、网络抖动、算法强度、编码策略和平台是否开启字幕/翻译，都会共同决定体验。",
            en: "Meeting quality does not come from a good microphone alone. Room reverb, speaker playback, render reference, network jitter, processing strength, codec policy, and whether captions or translation are enabled all shape the experience."
          },
          contentDirection: {
            zh: "重点用端到端链路图和问题诊断说明“回声大、听不清、字幕慢”分别该看哪些模块，而不是把所有算法孤立介绍。",
            en: "Focus on an end-to-end chain diagram and troubleshooting flow for echo, poor intelligibility, and delayed captions, rather than explaining every algorithm in isolation."
          }
        }
      },
      {
        title: { zh: "车载声学", en: "In-Car Acoustics" },
        summary: {
          zh: "从座舱采集与定位到语音决策、空间回放和闭环噪声控制，理解车载声学的完整链路。",
          en: "Understand the complete in-car acoustic chain, from cabin capture and localization to voice decisions, spatial playback, and closed-loop noise control."
        },
        bullets: [
          { zh: "麦克风阵列、分区定位与波束形成", en: "Microphone arrays, zone localization, and beamforming" },
          { zh: "语音理解与车辆安全策略", en: "Speech understanding and vehicle safety policy" },
          { zh: "多扬声器空间渲染与告警优先级", en: "Multi-speaker spatial rendering and alert priority" },
          { zh: "ANC / RNC 闭环低频噪声控制", en: "ANC / RNC closed-loop low-frequency noise control" }
        ],
        detail: {
          explanation: {
            zh: "车载声学把采集与定位、语音理解、回放与空间渲染、噪声控制连接成同一套座舱系统。麦克风阵列先采集乘员语音，通过通道间时间差和相位差定位说话座位，再用波束形成增强目标方向；AEC 和降噪抑制扬声器回放、路噪与空调声。随后唤醒词、ASR 和意图理解把语音变成候选动作，车辆还要结合车速、驾驶状态、座位权限和安全策略决定是否执行。播放侧通过多扬声器、功放、延迟、EQ 和相位校准渲染音乐、导航、告警与语音反馈。ANC / RNC 是闭环低频噪声控制：控制器根据参考信号预测发动机、轮胎或路面噪声，经扬声器产生反相信号，再由误差麦反馈修正。",
            en: "In-car acoustics connects capture and localization, speech understanding, playback and spatial rendering, and noise control into one cabin system. Microphone arrays first capture occupant speech, use interchannel time and phase differences to locate the speaking seat, and then apply beamforming to enhance the target direction; AEC and noise suppression reduce loudspeaker playback leakage, road noise, and HVAC noise. Wake-word detection, ASR, and intent understanding then turn speech into candidate actions, while the vehicle considers speed, driving state, seat permissions, and safety policies before deciding whether to execute them. On the playback side, multiple speakers, amplifiers, delay, EQ, and phase calibration render music, navigation, alerts, and voice feedback. ANC / RNC is closed-loop low-frequency noise control: the controller uses reference signals to predict engine, tire, or road noise, drives the speakers to produce an anti-phase signal, and then corrects its output using feedback from error microphones."
          },
          lab: {
            type: "automotive-audio",
            title: { zh: "车载声学实验室", en: "In-Car Acoustics Lab" },
            description: {
              zh: "用车内饰部件位置图理解麦克风、扬声器、声源定位、语音助手、座舱空间音频和主动降噪如何协同。",
              en: "Use a cabin component layout to understand how microphones, speakers, localization, voice assistants, spatial audio, and active noise control work together."
            },
            buttonLabel: { zh: "打开车载声学实验室", en: "Open in-car acoustics lab" }
          },
          keyConcepts: [
            { zh: "麦克风阵列利用通道间时间差和相位差估计声源方向与座位分区；定位回答“声音来自哪里”，波束形成则是朝该方向增强、抑制其他方向的空间滤波，两者不能混为同一步。", en: "A microphone array uses interchannel time and phase differences to estimate source direction and seat zone. Localization answers where the sound comes from, while beamforming spatially enhances that direction and suppresses others; they are distinct operations." },
            { zh: "语音助手用唤醒词启动交互，ASR 转写内容，意图理解生成候选动作；车速、驾驶状态、座位权限与安全策略再决定动作能否执行。", en: "A voice assistant starts interaction with a wake word, uses ASR to transcribe speech, and derives a candidate action through intent understanding; speed, driving state, seat permissions, and safety policy then determine whether that action may execute." },
            { zh: "回放系统通过多扬声器与功放分配声道，并用延迟、EQ 和相位校准塑造座位声场；导航与安全告警必须按优先级压过或避让娱乐内容。", en: "The playback system distributes channels across multiple speakers and amplifiers, then shapes each seating sound field with delay, EQ, and phase calibration. Navigation and safety alerts must override or duck entertainment content according to priority." },
            { zh: "ANC / RNC 的闭环由参考信号、控制器、扬声器和误差麦组成，反馈用于持续修正残余噪声；它适合可预测、稳定的低频成分，不适合强行抵消高频、人声或突发声。", en: "The ANC / RNC loop consists of a reference signal, controller, speakers, and error microphones, whose feedback continuously corrects residual noise. It is suited to predictable, stable low-frequency components, not aggressive cancellation of high frequencies, speech, or transients." }
          ],
          misconception: {
            zh: "把每个模块单独调通不代表整车体验已经成立：定位错误会把语音交给错误座位，回放泄漏会影响拾音，而不稳定的 ANC 参数还可能放大残余噪声。",
            en: "Making each module work in isolation does not guarantee a correct vehicle experience: localization errors can assign speech to the wrong seat, playback leakage can impair capture, and unstable ANC tuning can amplify residual noise."
          },
          contentDirection: {
            zh: "诊断时先判断问题属于拾音定位、语音决策、回放渲染还是噪声控制，再沿对应信号链检查唤醒错座、定位漂移、告警遮蔽或 ANC 轰鸣。",
            en: "When diagnosing an issue, first determine whether it belongs to capture and localization, voice decision-making, playback rendering, or noise control, then follow the corresponding signal chain to investigate wrong-seat wakeups, localization drift, masked alerts, or ANC rumble."
          }
        }
      },
      {
        title: { zh: "IoT 与内容创作", en: "IoT and Content Creation" },
        summary: {
          zh: "覆盖低功耗语音唤醒、边缘控制、播客、直播、AI 配音和自动混音。",
          en: "Cover low-power wake words, edge control, podcasts, streaming, AI dubbing, and automatic mixing."
        },
        bullets: [
          { zh: "本地语音控制", en: "Local voice control" },
          { zh: "播客与直播音频", en: "Podcast and live-stream audio" },
          { zh: "AI 配音与自动母带", en: "AI dubbing and automatic mastering" }
        ],
        detail: {
          explanation: {
            zh: "IoT 音频更像一个长期待机的边缘感知系统，核心目标是低功耗、低成本、隐私、安全和快速响应。典型链路是麦克风持续监听低功耗唤醒词，唤醒后把短语音送入本地命令识别或云端 ASR/LLM，再控制灯、门锁、家电、摄像头或机器人。内容创作音频更像一条可反复编辑和交付的生产流水线，核心目标是可听、稳定、可修改、跨平台响度一致。典型链路是录音或导入素材，经过降噪、剪辑、EQ、压缩、响度标准化、AI 配音、自动母带和多平台导出。两者都可能用 AI，但 IoT 更在意实时性和资源预算，内容创作更在意质量、可控性和最终交付。",
            en: "IoT audio is more like an always-on edge sensing system whose goals are low power, low cost, privacy, safety, and fast response. A typical chain keeps a microphone listening for a low-power wake word, then sends short speech to local command recognition or cloud ASR/LLM to control lights, locks, appliances, cameras, or robots. Content-creation audio is more like an editable production pipeline whose goals are intelligibility, consistency, editability, and platform-ready loudness. A typical chain records or imports material, then applies denoising, editing, EQ, compression, loudness normalization, AI dubbing, automatic mastering, and multi-platform export. Both may use AI, but IoT cares more about latency and resource budget, while content creation cares more about quality, control, and delivery."
          },
          lab: {
            type: "iot-content",
            title: { zh: "IoT 与内容创作实验室", en: "IoT and Content Creation Lab" },
            description: {
              zh: "用双路径流程图对比 IoT 语音控制和内容创作工具链，理解实时控制与内容生产的目标差异。",
              en: "Use a dual-path flow diagram to compare IoT voice control with creator audio workflows and understand the different goals of real-time control and production."
            },
            buttonLabel: { zh: "打开 IoT 与内容创作实验室", en: "Open IoT and content creation lab" }
          },
          keyConcepts: [
            { zh: "边缘语音唤醒需要在功耗、误唤醒、漏唤醒、模型大小、唤醒词体验和隐私之间取舍。", en: "Edge wake-word detection trades power, false accepts, false rejects, model size, wake-word UX, and privacy." },
            { zh: "IoT 的音频采集通常短、轻、实时：16 kHz 单声道 PCM、低功耗 DSP/NPU、本地关键词和少量命令词很常见。", en: "IoT capture is often short, lightweight, and real-time: 16 kHz mono PCM, low-power DSP/NPU, local keywords, and small command sets are common." },
            { zh: "播客和直播常用响度标准、降噪、压缩、限幅、去齿音和自动电平控制，目标是让听众换设备也不觉得忽大忽小。", en: "Podcasts and live streams use loudness targets, denoising, compression, limiting, de-essing, and automatic leveling so listeners do not hear large level jumps across devices." },
            { zh: "AI 配音、自动剪辑、自动母带和多语言翻译把复杂后期流程变成可重复的工具链，但仍需要人工检查情绪、语义和版权风险。", en: "AI dubbing, auto editing, automatic mastering, and multilingual translation turn post-production into repeatable toolchains, but emotion, meaning, and rights still require human review." }
          ],
          misconception: {
            zh: "边缘 AI 不代表完全不需要云端，自动母带也不代表完全不用听。很多 IoT 产品会组合本地唤醒、轻量命令和云端大模型；很多创作工具会自动处理响度和动态，但最终仍要按内容风格和发布平台检查。",
            en: "Edge AI does not mean the cloud disappears, and automatic mastering does not mean nobody listens. Many IoT products combine local wake words and lightweight commands with cloud models; many creator tools automate loudness and dynamics, but final checks still depend on content style and publishing platform."
          },
          contentDirection: {
            zh: "重点用双路径图讲清 IoT 语音控制和内容创作生产线：前者看功耗、延迟、误唤醒和隐私，后者看响度、动态、噪声、编辑效率和交付一致性。",
            en: "Use a dual-path diagram to explain IoT voice control and creator production workflows: the former focuses on power, latency, false wakes, and privacy; the latter focuses on loudness, dynamics, noise, editing speed, and delivery consistency."
          }
        }
      }
    ]
  }
];
