import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { MeetingCommunicationLab } from "./components/MeetingCommunicationLab";

describe("Audio knowledge app", () => {
  beforeEach(() => {
    window.localStorage.setItem("audio-technology-language", "zh");
  });

  it("defaults to English when no language preference is stored", () => {
    window.localStorage.removeItem("audio-technology-language");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Audio Technology Sharing" })).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Knowledge Outline" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Topic Cards" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "中文" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "音频技术分享" })).not.toBeInTheDocument();
  });

  it("switches between Chinese and English interface copy", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    expect(screen.getByRole("heading", { name: "音频技术分享" })).toBeInTheDocument();
    const backgroundWave = container.querySelector(".background-wave");
    expect(backgroundWave).toBeInstanceOf(HTMLCanvasElement);
    expect(backgroundWave).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("heading", { name: "内容路线图" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "写作原则" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "文档" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "查看 Markdown 大纲" })).not.toBeInTheDocument();
    const outline = screen.getByRole("complementary", { name: "知识分类大纲" });
    expect(within(outline).getByRole("heading", { name: "知识分类大纲" })).toBeInTheDocument();
    expect(within(outline).getByText("音频基础")).toBeInTheDocument();
    expect(within(outline).getByText("什么是声音")).toBeInTheDocument();
    expect(within(outline).getByText("IoT 与内容创作")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "主题卡片" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "English" }));

    expect(screen.getByRole("heading", { name: "Audio Technology Sharing" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Content Roadmap" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Writing Principles" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Docs" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Open Markdown outline" })).not.toBeInTheDocument();
    const englishOutline = screen.getByRole("complementary", { name: "Knowledge Outline" });
    expect(within(englishOutline).getByRole("heading", { name: "Knowledge Outline" })).toBeInTheDocument();
    expect(within(englishOutline).getByText("Audio Fundamentals")).toBeInTheDocument();
    expect(within(englishOutline).getByText("What Sound Is")).toBeInTheDocument();
    expect(within(englishOutline).getByText("IoT and Content Creation")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Topic Cards" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "中文" })).toBeInTheDocument();
  });

  it("filters topics by category", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /AI 音频/ }));

    const topicGrid = screen.getByTestId("topic-grid");
    expect(within(topicGrid).getByText("AI 音频总流程")).toBeInTheDocument();
    expect(within(topicGrid).getByText("语音识别 ASR")).toBeInTheDocument();
    expect(within(topicGrid).getByText("音频生成")).toBeInTheDocument();
    expect(within(topicGrid).getByText("AI 音频事件识别")).toBeInTheDocument();
    expect(within(topicGrid).getByText("AI 音频增强")).toBeInTheDocument();
    expect(within(topicGrid).getByText("AI 音频编码")).toBeInTheDocument();
    expect(within(topicGrid).queryByText("麦克风")).not.toBeInTheDocument();
  });

  it("opens AI topic cards as separate article-style labs", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /AI 音频/ }));
    await user.click(screen.getByRole("button", { name: /AI 音频事件识别/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(
      within(details).getByText("识别哭声、玻璃破碎、狗叫声、警报声等非语音事件。")
    ).toBeInTheDocument();
    await user.click(within(details).getByRole("button", { name: "打开 AI 音频事件识别实验室" }));

    const lab = screen.getByRole("main", { name: "AI 音频事件识别实验室" });
    expect(within(lab).getByRole("heading", { name: "AI 音频事件识别实验室" })).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "全面概述" })).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "基本原理" })).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "核心技术" })).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "应用场景" })).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "挑战" })).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "未来趋势" })).toBeInTheDocument();
    expect(within(lab).getByRole("list", { name: "AI 音频事件识别图解流程" })).toBeInTheDocument();
    expect(within(lab).getByText("环境 PCM 片段")).toBeInTheDocument();
    expect(within(lab).getByText("log-mel 频谱图")).toBeInTheDocument();
    expect(within(lab).getByText("分类模型")).toBeInTheDocument();
    const modelSection = within(lab).getByRole("region", { name: "常用模型与前沿落地模型" });
    expect(within(modelSection).getByRole("heading", { name: "常用模型与前沿落地模型" })).toBeInTheDocument();
    expect(within(modelSection).getByText("YAMNet")).toBeInTheDocument();
    expect(within(modelSection).getByText("PANNs")).toBeInTheDocument();
    expect(within(modelSection).getByText("AST")).toBeInTheDocument();
    expect(within(modelSection).getByText("BEATs")).toBeInTheDocument();
    expect(within(modelSection).getByText("CLAP")).toBeInTheDocument();
    expect(within(lab).getByText("哭声")).toBeInTheDocument();
    expect(within(lab).getByText("玻璃破碎")).toBeInTheDocument();
    expect(within(lab).getByText("狗叫声")).toBeInTheDocument();
    expect(within(lab).queryByRole("img", { name: "AI 音频处理可视化" })).not.toBeInTheDocument();
    expect(within(lab).queryByRole("button", { name: "AI 编码" })).not.toBeInTheDocument();
    expect(within(lab).queryByRole("slider")).not.toBeInTheDocument();
  });

  it("explains ASR modules with concrete inputs, processing, outputs, and lab scenarios", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /AI 音频/ }));
    await user.click(screen.getByRole("button", { name: /语音识别 ASR/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/PCM 只是连续的压力变化数字/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "分帧加窗" })).toBeInTheDocument();
    expect(within(details).getByText(/例如 10 ms 或 20 ms/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "log-mel / MFCC" })).toBeInTheDocument();
    expect(within(details).getByText(/把每帧语音变成更接近人耳听感的频率能量图/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "Encoder 编码器" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "CTC / Attention / Transducer" })).toBeInTheDocument();
    expect(within(details).getByText(/CTC 适合把很多帧对齐到较短 token 序列/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "解码与后处理" })).toBeInTheDocument();
    expect(within(details).getByText(/热词、标点、时间戳和说话人信息/)).toBeInTheDocument();

    await user.click(within(details).getByRole("button", { name: "打开语音识别 ASR 实验室" }));
    const lab = screen.getByRole("main", { name: "语音识别 ASR 实验室" });
    expect(within(lab).getByRole("list", { name: "语音识别 ASR 图解流程" })).toBeInTheDocument();
    expect(within(lab).getByText("PCM 输入")).toBeInTheDocument();
    expect(within(lab).getByText("分帧加窗")).toBeInTheDocument();
    expect(within(lab).getByText("log-mel / MFCC")).toBeInTheDocument();
    expect(within(lab).getByText("Encoder 编码器")).toBeInTheDocument();
    expect(within(lab).getByText("CTC / RNNT")).toBeInTheDocument();
    expect(within(lab).getByText("文本后处理")).toBeInTheDocument();
    const modelSection = within(lab).getByRole("region", { name: "常用模型与前沿落地模型" });
    expect(within(modelSection).getByText("Conformer / RNNT")).toBeInTheDocument();
    expect(within(modelSection).getByText("wav2vec 2.0")).toBeInTheDocument();
    expect(within(modelSection).getByText("Whisper")).toBeInTheDocument();
    expect(within(modelSection).getByText("Paraformer / FunASR")).toBeInTheDocument();
    expect(within(modelSection).getByText("GPT-4o transcribe")).toBeInTheDocument();
    expect(within(lab).getByText(/离线转写适合会议纪要和录音整理/)).toBeInTheDocument();
    expect(within(lab).getByText(/流式字幕强调首字延迟和增量稳定性/)).toBeInTheDocument();
    expect(within(lab).queryByRole("button", { name: "流式字幕" })).not.toBeInTheDocument();
  });

  it("introduces the overall AI audio technical flow before specific AI tasks", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /AI 音频/ }));
    await user.click(screen.getByRole("button", { name: /AI 音频总流程/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/先采集得到 PCM 数字音频/)).toBeInTheDocument();
    expect(within(details).getByText(/PCM 不是含义，只是数字波形/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "FFT / STFT / Mel / MFCC" })).toBeInTheDocument();
    expect(within(details).getByText(/很多声音分类任务会把频谱图当作二维特征图/)).toBeInTheDocument();
    expect(within(details).getByText(/不同任务不会都走完全相同的模型路径/)).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开 AI 音频总流程实验室" })).toBeInTheDocument();

    await user.click(within(details).getByRole("button", { name: "打开 AI 音频总流程实验室" }));
    const lab = screen.getByRole("main", { name: "AI 音频总流程实验室" });
    expect(within(lab).getByRole("heading", { name: "AI 音频总流程实验室" })).toBeInTheDocument();
    expect(within(lab).getByRole("list", { name: "AI 音频总流程图解流程" })).toBeInTheDocument();
    expect(within(lab).getByText("麦克风 / Codec / ADC")).toBeInTheDocument();
    expect(within(lab).getByText("PCM 数字音频")).toBeInTheDocument();
    expect(within(lab).getByText("任务模型")).toBeInTheDocument();
    const modelSection = within(lab).getByRole("region", { name: "常用模型与前沿落地模型" });
    expect(within(modelSection).getByText("Whisper")).toBeInTheDocument();
    expect(within(modelSection).getByText("CLAP")).toBeInTheDocument();
    expect(within(modelSection).getByText("EnCodec")).toBeInTheDocument();
    expect(within(modelSection).getByText("SoundStream")).toBeInTheDocument();
    expect(within(lab).getByText(/AI 音频不是单一算法/)).toBeInTheDocument();
  });

  it("explains neural audio coding models separately from traditional codecs", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /AI 音频/ }));
    await user.click(screen.getByRole("button", { name: /AI 音频编码/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    await user.click(within(details).getByRole("button", { name: "打开 AI 音频编码实验室" }));

    const lab = screen.getByRole("main", { name: "AI 音频编码实验室" });
    const modelSection = within(lab).getByRole("region", { name: "常用模型与前沿落地模型" });
    expect(within(modelSection).getByText("SoundStream")).toBeInTheDocument();
    expect(within(modelSection).getByText("EnCodec")).toBeInTheDocument();
    expect(within(modelSection).getByText("Lyra")).toBeInTheDocument();
    expect(within(modelSection).getByText("codec token / neural codec language model")).toBeInTheDocument();
    expect(within(modelSection).getByText(/不是 MP3\/AAC 的手工变换编码路线/)).toBeInTheDocument();
  });

  it("switches conferencing and communication between practical scenarios", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /应用场景/ }));
    await user.click(screen.getByRole("button", { name: /会议与通信/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    const openLabButton = within(details).getByRole("button", { name: "打开会议与通信实验室" });
    expect(details).toBeInTheDocument();
    expect(within(details).getByText(/个人终端、多人会议室、弱网会议和实时字幕/)).toBeInTheDocument();
    expect(within(details).getByText(/环境、信号链、症状、可观察指标/)).toBeInTheDocument();
    expect(within(details).getByText(/声学问题、网络问题和字幕旁路延迟/)).toBeInTheDocument();
    expect(openLabButton).toBeInTheDocument();

    await user.click(openLabButton);

    const lab = screen.getByRole("main", { name: "会议与通信实验室" });
    expect(within(lab).getByRole("heading", { name: "会议与通信实验室" })).toBeInTheDocument();
    const personalDevice = within(lab).getByRole("button", { name: "个人终端" });
    const meetingRoom = within(lab).getByRole("button", { name: "多人会议室" });
    const poorNetwork = within(lab).getByRole("button", { name: "弱网会议" });
    const liveCaptions = within(lab).getByRole("button", { name: "实时字幕" });

    expect(personalDevice).toHaveAttribute("aria-pressed", "true");
    expect(meetingRoom).toHaveAttribute("aria-pressed", "false");
    expect(poorNetwork).toHaveAttribute("aria-pressed", "false");
    expect(liveCaptions).toHaveAttribute("aria-pressed", "false");
    expect(within(lab).getByRole("region", { name: "会议场景图滚动区域" })).toBeInTheDocument();
    const personalScene = within(lab).getByRole("img", { name: "个人终端会议场景图" });
    expect(personalScene).toBeInTheDocument();
    expect(personalScene).toHaveAccessibleDescription(/播放参考信号进入 AEC/);
    expect(within(lab).getByText("ERLE")).toBeInTheDocument();
    expect(within(lab).getByText("端到端延迟")).toBeInTheDocument();

    await user.click(meetingRoom);
    expect(meetingRoom).toHaveAttribute("aria-pressed", "true");
    expect(personalDevice).toHaveAttribute("aria-pressed", "false");
    expect(within(lab).getByRole("img", { name: "多人会议室场景图" })).toBeInTheDocument();
    expect(within(lab).queryByRole("img", { name: "个人终端会议场景图" })).not.toBeInTheDocument();
    expect(within(lab).getByText("麦克风阵列")).toBeInTheDocument();
    expect(within(lab).getByText("多人发言处理")).toBeInTheDocument();
    expect(within(lab).getByText("混响时间")).toBeInTheDocument();
    expect(within(lab).queryByText("耳机模式")).not.toBeInTheDocument();

    await user.click(poorNetwork);
    expect(poorNetwork).toHaveAttribute("aria-pressed", "true");
    expect(meetingRoom).toHaveAttribute("aria-pressed", "false");
    const networkScene = within(lab).getByRole("img", { name: "弱网会议场景图" });
    expect(networkScene).toHaveAccessibleDescription(/RTP 包.*自适应抖动缓冲.*FEC.*PLC.*播放/);
    expect(within(lab).queryByRole("img", { name: "多人会议室场景图" })).not.toBeInTheDocument();
    expect(within(lab).getByText("Jitter Buffer")).toBeInTheDocument();
    expect(within(lab).getByText("PLC")).toBeInTheDocument();
    expect(within(lab).getByText("丢包率")).toBeInTheDocument();
    expect(within(lab).getByText("自适应码率")).toBeInTheDocument();
    expect(within(lab).getByText("RTT")).toBeInTheDocument();
    expect(within(lab).getByText("播放缓冲深度")).toBeInTheDocument();
    const scenarioChain = within(lab).getByRole("region", { name: "场景链路" });
    expect(within(scenarioChain).getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent)).toEqual([
      "Opus / 自适应码率",
      "RTP 包",
      "自适应抖动缓冲",
      "FEC / PLC 解码决策",
      "连续播放"
    ]);

    await user.click(liveCaptions);
    expect(liveCaptions).toHaveAttribute("aria-pressed", "true");
    expect(poorNetwork).toHaveAttribute("aria-pressed", "false");
    expect(within(lab).getByRole("img", { name: "实时字幕会议场景图" })).toBeInTheDocument();
    expect(within(lab).queryByRole("img", { name: "弱网会议场景图" })).not.toBeInTheDocument();
    expect(within(lab).getByText("流式 ASR")).toBeInTheDocument();
    expect(within(lab).getByText("首字延迟")).toBeInTheDocument();
    expect(within(lab).getByText("端点检测")).toBeInTheDocument();
    expect(within(lab).getByText("最终结果延迟")).toBeInTheDocument();
  });

  it("labels conferencing and communication scenarios in English", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "English" }));
    const categoriesRegion = screen.getByRole("region", { name: "Knowledge Areas" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /Applications/ }));
    await user.click(screen.getByRole("button", { name: /Conferencing and Communication/ }));

    const details = screen.getByRole("dialog", { name: "Topic details" });
    await user.click(within(details).getByRole("button", { name: "Open conferencing and communication lab" }));

    const lab = screen.getByRole("main", { name: "Conferencing and Communication Lab" });
    expect(within(lab).getByRole("button", { name: "Personal device" })).toBeInTheDocument();
    expect(within(lab).getByRole("button", { name: "Meeting room" })).toBeInTheDocument();
    expect(within(lab).getByRole("button", { name: "Poor network" })).toBeInTheDocument();
    expect(within(lab).getByRole("button", { name: "Live captions" })).toBeInTheDocument();

    render(<MeetingCommunicationLab language="en" onBack={vi.fn()} />);
    const personalScenes = screen.getAllByRole("img", { name: "Personal device meeting scene diagram" });
    expect(personalScenes).toHaveLength(2);
    expect(personalScenes[0]).toHaveAccessibleDescription(/render reference enters AEC/i);
    const markerIds = personalScenes.map((scene) => scene.querySelector("marker")?.id);
    expect(new Set(markerIds).size).toBe(2);
    personalScenes.forEach((scene, index) => {
      expect(scene.querySelector("[marker-end]")).toHaveAttribute("marker-end", `url(#${markerIds[index]})`);
    });
  });

  it("expands in-car acoustics with cabin component layout and acoustic processing lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /应用场景/ }));
    await user.click(screen.getByRole("button", { name: /车载声学/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/采集与定位、语音理解、回放与空间渲染、噪声控制/)).toBeInTheDocument();
    expect(within(details).getByText(/ANC \/ RNC 是闭环低频噪声控制/)).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开车载声学实验室" })).toBeInTheDocument();

    await user.click(within(details).getByRole("button", { name: "打开车载声学实验室" }));

    const lab = screen.getByRole("main", { name: "车载声学实验室" });
    expect(within(lab).getByRole("heading", { name: "车载声学实验室" })).toBeInTheDocument();
    const layoutModule = within(lab).getByRole("button", { name: "整车布局" });
    const voiceModule = within(lab).getByRole("button", { name: "语音交互" });
    const localizationModule = within(lab).getByRole("button", { name: "声源定位" });
    const spatialAudioModule = within(lab).getByRole("button", { name: "空间音频" });
    const noiseCancellationModule = within(lab).getByRole("button", { name: "ANC / RNC" });

    expect(layoutModule).toHaveAttribute("aria-pressed", "true");
    expect(voiceModule).toHaveAttribute("aria-pressed", "false");
    expect(localizationModule).toBeInTheDocument();
    expect(spatialAudioModule).toBeInTheDocument();
    expect(noiseCancellationModule).toBeInTheDocument();

    const cabinImage = within(lab).getByRole("img", { name: "车载声学座舱部件位置图" });
    expect(cabinImage).toBeInTheDocument();
    const figure = cabinImage.closest("figure");
    expect(figure).not.toBeNull();
    const scrollRegion = within(figure!).getByRole("region", { name: "可水平滚动的座舱部件图" });
    const diagramCaption = figure!.querySelector("figcaption");
    expect(scrollRegion).toContainElement(cabinImage);
    expect(scrollRegion).not.toContainElement(diagramCaption);
    expect(diagramCaption?.parentElement).toBe(figure);
    expect(scrollRegion).toHaveAttribute("tabindex", "0");
    type OverlayModule = "layout" | "voice" | "localization" | "spatial" | "anc";
    const expectActiveOverlay = (activeModule: OverlayModule) => {
      const overlays = cabinImage.querySelectorAll("[data-module]");
      expect(cabinImage).toHaveAttribute("data-active-module", activeModule);
      expect(overlays).toHaveLength(1);
      expect(overlays[0]).toHaveAttribute("data-module", activeModule);
    };
    expectActiveOverlay("layout");
    expect(within(cabinImage).getByText("顶灯麦克风阵列")).toBeInTheDocument();
    expect(within(cabinImage).getByText("门板扬声器")).toBeInTheDocument();
    expect(within(cabinImage).getByText("中置扬声器")).toBeInTheDocument();
    expect(within(cabinImage).getByText("ANC 误差麦")).toBeInTheDocument();
    expect(within(cabinImage).getByText("车头")).toBeInTheDocument();
    expect(within(cabinImage).getByText("车尾")).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "整车声学布局" })).toBeInTheDocument();
    const legend = within(lab).getByRole("region", { name: "车载声学图例" });
    expect(within(legend).getByText("语音麦克风")).toBeInTheDocument();
    expect(within(legend).getByText("ANC 误差麦")).toBeInTheDocument();
    expect(within(legend).getByText("扬声器")).toBeInTheDocument();
    expect(within(legend).getByText("外部噪声源")).toBeInTheDocument();
    const legendLabels = ["语音麦克风", "ANC 误差麦", "扬声器", "外部噪声源"] as const;
    const expectLegendRelevance = (relevantLabels: readonly (typeof legendLabels)[number][]) => {
      const relevantItems = within(legend).getAllByRole("listitem", { name: / - 当前模块相关$/ });
      expect(relevantItems).toHaveLength(relevantLabels.length);

      for (const label of legendLabels) {
        const isRelevant = relevantLabels.includes(label);
        const status = isRelevant ? "当前模块相关" : "当前模块不相关";
        const item = within(legend).getByRole("listitem", { name: `${label} - ${status}` });
        expect(within(item).getByText(label)).toBeInTheDocument();
      }
    };
    expectLegendRelevance(legendLabels);

    await user.click(voiceModule);
    expectActiveOverlay("voice");
    expect(voiceModule).toHaveAttribute("aria-pressed", "true");
    expect(layoutModule).toHaveAttribute("aria-pressed", "false");
    expect(within(lab).queryByRole("heading", { name: "整车声学布局" })).not.toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "从一句话到车辆动作" })).toBeInTheDocument();
    expect(within(lab).getByText(/AEC.*降噪.*波束形成/)).toBeInTheDocument();
    expect(
      within(lab).getByText("驾驶员可以调节空调；后排乘客通常只能控制自己的娱乐区域。"),
    ).toBeInTheDocument();
    expectLegendRelevance(["语音麦克风", "扬声器"]);

    await user.click(localizationModule);
    expectActiveOverlay("localization");
    expect(localizationModule).toHaveAttribute("aria-pressed", "true");
    expect(voiceModule).toHaveAttribute("aria-pressed", "false");
    expect(within(lab).queryByRole("heading", { name: "从一句话到车辆动作" })).not.toBeInTheDocument();
    expect(within(lab).getByText("Δt = d sin(θ) / c")).toBeInTheDocument();
    expect(within(lab).getByText(/定位负责判断方向/)).toBeInTheDocument();
    expect(within(lab).getByText(/波束形成负责增强目标方向/)).toBeInTheDocument();
    expectLegendRelevance(["语音麦克风"]);

    await user.click(spatialAudioModule);
    expectActiveOverlay("spatial");
    expect(spatialAudioModule).toHaveAttribute("aria-pressed", "true");
    expect(localizationModule).toHaveAttribute("aria-pressed", "false");
    expect(within(lab).queryByText("Δt = d sin(θ) / c")).not.toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "让每类声音出现在合适方向" })).toBeInTheDocument();
    expect(within(lab).getByText(/安全告警优先于娱乐声场/)).toBeInTheDocument();
    expectLegendRelevance(["扬声器"]);

    await user.click(noiseCancellationModule);
    expectActiveOverlay("anc");
    expect(noiseCancellationModule).toHaveAttribute("aria-pressed", "true");
    expect(spatialAudioModule).toHaveAttribute("aria-pressed", "false");
    expect(within(lab).queryByRole("heading", { name: "让每类声音出现在合适方向" })).not.toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "用闭环控制削弱稳定低频噪声" })).toBeInTheDocument();
    expect(
      within(lab).getByText("参考信号 -> ANC 控制器 -> 扬声器反相信号 -> 座舱残余噪声 -> 误差麦反馈"),
    ).toBeInTheDocument();
    expectLegendRelevance(["ANC 误差麦", "扬声器", "外部噪声源"]);
  });

  it("keeps the English in-car acoustics legend and module explanations complete", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "English" }));
    const categoriesRegion = screen.getByRole("region", { name: "Knowledge Areas" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /Applications/ }));
    await user.click(screen.getByRole("button", { name: /In-Car Acoustics/ }));

    const details = screen.getByRole("dialog", { name: "Topic details" });
    await user.click(within(details).getByRole("button", { name: "Open in-car acoustics lab" }));

    const lab = screen.getByRole("main", { name: "In-Car Acoustics Lab" });
    const legend = within(lab).getByRole("region", { name: "Automotive acoustics legend" });
    expect(within(legend).getByText("Voice mic")).toBeInTheDocument();
    expect(within(legend).getByText("ANC error mic")).toBeInTheDocument();
    expect(within(legend).getByText("Speaker")).toBeInTheDocument();
    expect(within(legend).getByText("External noise source")).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "Whole-vehicle acoustic layout" })).toBeInTheDocument();

    const expectedModules = [
      ["Whole-car layout", "Whole-vehicle acoustic layout"],
      ["Voice interaction", "From speech to a permitted vehicle action"],
      ["Source localization", "Use time differences to identify the speaking seat"],
      ["Spatial audio", "Place each sound in a useful direction"],
      ["ANC / RNC", "Reduce steady low-frequency noise with closed-loop control"],
    ] as const;

    for (const [control, heading] of expectedModules) {
      await user.click(within(lab).getByRole("button", { name: control }));
      expect(within(lab).getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    await user.click(within(lab).getByRole("button", { name: "Voice interaction" }));
    expect(
      within(lab).getByText(
        "The driver may adjust climate controls, while rear passengers are usually limited to their own entertainment zone.",
      ),
    ).toBeInTheDocument();
  });

  it("expands IoT and content creation with a dual-path audio workflow lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /应用场景/ }));
    await user.click(screen.getByRole("button", { name: /IoT 与内容创作/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/IoT 音频更像一个长期待机的边缘感知系统/)).toBeInTheDocument();
    expect(within(details).getByText(/内容创作音频更像一条可反复编辑和交付的生产流水线/)).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开 IoT 与内容创作实验室" })).toBeInTheDocument();

    await user.click(within(details).getByRole("button", { name: "打开 IoT 与内容创作实验室" }));

    const lab = screen.getByRole("main", { name: "IoT 与内容创作实验室" });
    expect(within(lab).getByRole("heading", { name: "IoT 与内容创作实验室" })).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "IoT 与内容创作双路径音频流程图" })).toBeInTheDocument();
    expect(within(lab).getByText("IoT 语音控制路径")).toBeInTheDocument();
    expect(within(lab).getByText("内容创作生产路径")).toBeInTheDocument();
    expect(within(lab).getByText("低功耗监听")).toBeInTheDocument();
    expect(within(lab).getByText("本地唤醒词")).toBeInTheDocument();
    expect(within(lab).getByText("录音 / 导入")).toBeInTheDocument();
    expect(within(lab).getByText("剪辑 / 修音")).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "每个模块解决什么问题" })).toBeInTheDocument();
    expect(within(lab).getByText("边缘语音唤醒")).toBeInTheDocument();
    expect(within(lab).getByText("内容响度与动态")).toBeInTheDocument();
    expect(within(lab).getByText("AI 配音与自动母带")).toBeInTheDocument();
    expect(within(lab).getByRole("heading", { name: "典型问题诊断" })).toBeInTheDocument();
    expect(within(lab).getByText("误唤醒")).toBeInTheDocument();
    expect(within(lab).getByText("直播声音忽大忽小")).toBeInTheDocument();
    expect(within(lab).getByText("AI 配音不自然")).toBeInTheDocument();
  });

  it("searches across visible knowledge topics", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("searchbox", { name: "搜索知识点" }), "FFT");

    const topicGrid = screen.getByTestId("topic-grid");
    expect(within(topicGrid).getByText("基础信号处理")).toBeInTheDocument();
    expect(within(topicGrid).getAllByText(/FFT \/ STFT/).length).toBeGreaterThan(0);
    expect(within(topicGrid).queryByText("语音识别 ASR")).not.toBeInTheDocument();
  });

  it("adds sound and audio units as a fundamentals card with a lab entry", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频基础/ }));

    const topicGrid = screen.getByTestId("topic-grid");
    expect(within(topicGrid).getByText("声音与音频单位")).toBeInTheDocument();
    expect(within(topicGrid).getByText(/dBSPL、dBFS、dBu、dBV、LUFS/)).toBeInTheDocument();

    await user.click(within(topicGrid).getByRole("button", { name: /声音与音频单位/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/dB 本身只是两个量之间的对数比例/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "dBSPL" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "dBFS" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "dBu / dBV" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "LUFS" })).toBeInTheDocument();
    expect(
      within(details).getByRole("button", { name: "打开声音与音频单位实验室" })
    ).toBeInTheDocument();
  });

  it("opens the sound and audio units lab with reference points and conversions", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频基础/ }));
    await user.click(screen.getByRole("button", { name: /声音与音频单位/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开声音与音频单位实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "声音与音频单位实验室" })).toBeInTheDocument();
    const diagram = screen.getByRole("img", { name: "声音与音频单位参考关系图" });
    expect(within(diagram).getAllByText("dBSPL").length).toBeGreaterThan(0);
    expect(within(diagram).getByText("20 uPa")).toBeInTheDocument();
    expect(within(diagram).getAllByText("dBFS").length).toBeGreaterThan(0);
    expect(within(diagram).getByText("0 dBFS 满刻度")).toBeInTheDocument();
    expect(screen.getByText("参考：20 uPa 声压")).toBeInTheDocument();
    expect(screen.getByText("+4 dBu 约等于 1.228 Vrms")).toBeInTheDocument();
    expect(screen.getByText("48 kHz 下 480 samples = 10 ms")).toBeInTheDocument();
    expect(screen.getByText(/不能把 -6 dBFS 直接换成 94 dBSPL/)).toBeInTheDocument();
  });

  it("calculates audio unit conversions and distance SPL loss from user input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频基础/ }));
    await user.click(screen.getByRole("button", { name: /声音与音频单位/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开声音与音频单位实验室"
      })
    );

    const converter = screen.getByRole("region", { name: "自动换算器" });
    const valueInput = within(converter).getByRole("spinbutton", { name: "输入数值" });
    const unitSelect = within(converter).getByRole("combobox", { name: "源单位" });

    await user.clear(valueInput);
    await user.type(valueInput, "94");
    await user.selectOptions(unitSelect, "dBSPL");

    expect(within(converter).getByText("dBSPL：94.00 dBSPL")).toBeInTheDocument();
    expect(within(converter).getByText("Pa：1.002 Pa")).toBeInTheDocument();
    expect(within(converter).getByText("uPa：1,002,374 uPa")).toBeInTheDocument();
    expect(within(converter).getByText(/dBSPL 与 dBFS\/dBu\/dBV 不能无校准直接互转/)).toBeInTheDocument();

    await user.selectOptions(unitSelect, "dBu");
    await user.clear(valueInput);
    await user.type(valueInput, "4");

    expect(within(converter).getByText("dBu：4.00 dBu")).toBeInTheDocument();
    expect(within(converter).getByText("dBV：1.79 dBV")).toBeInTheDocument();
    expect(within(converter).getByText("Vrms：1.228 Vrms")).toBeInTheDocument();
    expect(within(converter).getByText("mVrms：1,228 mVrms")).toBeInTheDocument();

    await user.clear(valueInput);
    await user.type(valueInput, "abc");
    expect(within(converter).getByText("请输入有效数字。")).toBeInTheDocument();

    const distanceCalculator = screen.getByRole("region", { name: "距离声压衰减计算器" });
    expect(within(distanceCalculator).getByText("1 m：94.0 dBSPL")).toBeInTheDocument();
    expect(within(distanceCalculator).getByText("2 m：88.0 dBSPL")).toBeInTheDocument();
    expect(within(distanceCalculator).getByText("4 m：82.0 dBSPL")).toBeInTheDocument();
    expect(within(distanceCalculator).getByText(/距离翻倍约 -6 dB/)).toBeInTheDocument();
    expect(within(distanceCalculator).getByText(/理想自由场、点声源、无墙面反射/)).toBeInTheDocument();

    const startSpl = within(distanceCalculator).getByRole("spinbutton", { name: "初始声压级" });
    const startDistance = within(distanceCalculator).getByRole("spinbutton", { name: "初始距离" });
    await user.clear(startSpl);
    await user.type(startSpl, "100");
    await user.clear(startDistance);
    await user.type(startDistance, "2");

    expect(within(distanceCalculator).getByText("1 m：106.0 dBSPL")).toBeInTheDocument();
    expect(within(distanceCalculator).getByText("2 m：100.0 dBSPL")).toBeInTheDocument();
    expect(within(distanceCalculator).getByText("4 m：94.0 dBSPL")).toBeInTheDocument();
  });

  it("expands core signal processing knowledge with traditional DSP fundamentals", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /传统算法/ }));
    await user.click(screen.getByRole("button", { name: /基础信号处理/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/传统 DSP 的基础入口/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "时间域" })).toBeInTheDocument();
    expect(within(details).getByText(/波形、周期、瞬态、包络/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "频率域" })).toBeInTheDocument();
    expect(within(details).getAllByText(/频率分辨率/).length).toBeGreaterThan(0);
    expect(within(details).getByRole("heading", { name: "STFT 分帧" })).toBeInTheDocument();
    expect(within(details).getByText(/window size 和 hop size/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "滤波器" })).toBeInTheDocument();
    expect(within(details).getByText(/FIR 和 IIR/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "参数 EQ" })).toBeInTheDocument();
    expect(within(details).getByText(/gain、frequency、Q/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "动态处理" })).toBeInTheDocument();
    expect(within(details).getAllByText(/threshold、ratio、attack、release/).length).toBeGreaterThan(0);
    expect(within(details).getByText(/输入 PCM -> 分帧\/加窗 -> FFT\/STFT 分析/)).toBeInTheDocument();
    expect(within(details).getByText(/压缩器不是 MP3\/AAC 这类编码压缩/)).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开基础信号处理实验室" })).toBeInTheDocument();
  });

  it("expands speech enhancement with SoC SDK style processing flow", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /传统算法/ }));
    await user.click(screen.getByRole("button", { name: /语音增强/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/低延迟 PCM 处理链/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "AEC 回声消除" })).toBeInTheDocument();
    expect(within(details).getAllByText(/播放回采参考/).length).toBeGreaterThan(0);
    expect(within(details).getByRole("heading", { name: "NS / ANR 降噪" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "AGC 自动增益" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "多麦波束成形" })).toBeInTheDocument();
    expect(within(details).getByText(/Mic \/ PDM \/ I2S -> AI 驱动环形 buffer/)).toBeInTheDocument();
    expect(within(details).getByText(/AEC 需要播放侧 AO\/Mixer 的 reference buffer/)).toBeInTheDocument();
    expect(within(details).getByText(/波束成形\/DOA（多麦）-> AEC -> NS\/ANR -> 去混响 -> AGC\/Limiter/)).toBeInTheDocument();
    expect(within(details).getByText(/瑞芯微常见 AI\/AO\/AENC\/ADEC\/VQE/)).toBeInTheDocument();
    expect(within(details).queryByRole("heading", { name: "处理流程图" })).not.toBeInTheDocument();
    expect(within(details).queryByRole("img", { name: "语音增强 SDK 处理流程图" })).not.toBeInTheDocument();
    expect(within(details).queryByText(/VAD/)).not.toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开语音增强实验室" })).toBeInTheDocument();
  });

  it("does not show the removed audio programming and plugin topic", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频软件/ }));

    expect(screen.queryByRole("button", { name: /音频编程与插件开发/ })).not.toBeInTheDocument();
    expect(screen.queryByText(/Audio Programming and Plugin Development/)).not.toBeInTheDocument();
  });

  it("expands spatial audio with localization cues and rendering concepts", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /传统算法/ }));
    await user.click(screen.getByRole("button", { name: /空间音频/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/不是单一格式，而是一套从内容制作、空间编码、渲染到播放设备的完整链路/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "ITD 到达时间差" })).toBeInTheDocument();
    expect(within(details).getByText(/声源在左侧时通常先到左耳/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "ILD 声级差" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "HRTF / HRIR" })).toBeInTheDocument();
    expect(within(details).getByText(/方向的 HRIR 做卷积/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "双耳渲染" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "环绕声与声道床" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "对象音频" })).toBeInTheDocument();
    expect(within(details).getByText(/声音内容和空间元数据分开/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "Ambisonics" })).toBeInTheDocument();
    expect(within(details).getAllByText(/球面声场/).length).toBeGreaterThan(0);
    expect(within(details).getByRole("heading", { name: "头部追踪" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "距离感与房间反射" })).toBeInTheDocument();
    expect(within(details).getByText(/声源固定在外部世界/)).toBeInTheDocument();
    expect(within(details).getByText(/空间音频和语音增强里的波束成形方向相反/)).toBeInTheDocument();
    expect(within(details).getByText(/简单把左右声道拉宽、加一点混响或做左右声道延迟/)).toBeInTheDocument();
    expect(within(details).getByText(/后续适合做空间音频实验室/)).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开空间音频实验室" })).toBeInTheDocument();
  });

  it("opens the spatial audio lab with interactive source and head tracking controls", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /传统算法/ }));
    await user.click(screen.getByRole("button", { name: /空间音频/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开空间音频实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "空间音频实验室" })).toBeInTheDocument();
    const lab = screen.getByRole("region", { name: "空间音频实验台" });
    expect(within(lab).getByRole("img", { name: "空间音频声源定位图" })).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "房间反射时间响应图" })).toBeInTheDocument();
    expect(within(lab).getByRole("list", { name: "空间音频渲染流程" })).toBeInTheDocument();
    expect(within(lab).getAllByText("ITD / ILD").length).toBeGreaterThan(0);
    expect(within(lab).getByRole("heading", { name: "HRTF / HRIR" })).toBeInTheDocument();
    expect(within(lab).getByText(/对象音频保存每个声音的位置元数据/)).toBeInTheDocument();
    expect(within(lab).getByText("直达声")).toBeInTheDocument();
    expect(within(lab).getByText("早期反射")).toBeInTheDocument();
    expect(within(lab).getByText("混响尾巴")).toBeInTheDocument();
    expect(within(lab).getByText(/这是简化脉冲响应/)).toBeInTheDocument();
    expect(within(lab).getByText("相对角度：-35°")).toBeInTheDocument();
    expect(within(lab).getByText(/ITD：0\.36 ms，左耳先到/)).toBeInTheDocument();
    expect(within(lab).getByText(/当前双耳线索：左耳先到 \/ 左侧更强/)).toBeInTheDocument();

    fireEvent.change(within(lab).getByRole("slider", { name: "声源角度" }), {
      target: { value: "60" }
    });
    expect(within(lab).getByText("声源角度：+60°")).toBeInTheDocument();
    expect(within(lab).getByText("相对角度：+60°")).toBeInTheDocument();
    expect(within(lab).getByText(/当前双耳线索：右耳先到 \/ 右侧更强/)).toBeInTheDocument();

    fireEvent.change(within(lab).getByRole("slider", { name: "头部朝向" }), {
      target: { value: "30" }
    });
    expect(within(lab).getByText("头部朝向：+30°")).toBeInTheDocument();
    expect(within(lab).getByText("相对角度：+30°")).toBeInTheDocument();
    expect(within(lab).getByText(/当前双耳线索：右耳先到 \/ 右侧更强/)).toBeInTheDocument();

    await user.click(within(lab).getByRole("button", { name: "头部追踪" }));
    expect(within(lab).getByText(/头部追踪让声源固定在外部世界/)).toBeInTheDocument();
    expect(within(lab).getByText("坐标变换")).toBeInTheDocument();
    expect(within(lab).getByText("外部化声像")).toBeInTheDocument();
  });

  it("opens the speech enhancement lab with SDK flow and enhancement controls", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /传统算法/ }));
    await user.click(screen.getByRole("button", { name: /语音增强/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开语音增强实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "语音增强实验室" })).toBeInTheDocument();
    const lab = screen.getByRole("region", { name: "语音增强实验台" });
    const flowDiagram = within(lab).getByRole("img", { name: "语音增强处理流程图" });
    expect(flowDiagram).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "语音增强前后波形对比" })).toBeInTheDocument();
    expect(within(lab).getByText(/Rockchip VQE \/ SigmaStar Audio Process \/ Ingenic IMP Audio/)).toBeInTheDocument();
    expect(within(lab).getAllByText("VQE / 3A").length).toBeGreaterThan(0);
    expect(within(lab).getByText(/语音增强模块，常包含波束成形、AEC、NS\/ANR、去混响和 AGC/)).toBeInTheDocument();
    const moduleTabs = within(lab).getByRole("group", { name: "语音增强模块" });
    const flowArea = lab.querySelector(".speech-enhancement-flow-area");
    expect(flowArea).not.toBeNull();
    expect(within(flowArea as HTMLElement).getByRole("group", { name: "语音增强模块" })).toBe(moduleTabs);
    expect((flowDiagram.compareDocumentPosition(moduleTabs) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).toBe(true);
    expect(within(moduleTabs).getAllByRole("button").map((button) => button.textContent)).toEqual([
      "多麦波束成形",
      "AEC 回声消除",
      "NS / ANR 降噪",
      "去混响",
      "AGC 自动增益"
    ]);
    expect(within(flowDiagram).getAllByText("2 Mic 阵列").length).toBeGreaterThan(0);
    expect(within(lab).getByText(/多麦阵列要求至少两路同步麦克风/)).toBeInTheDocument();
    expect(within(lab).getAllByText(/DOA 声源定位/).length).toBeGreaterThan(0);
    expect(within(lab).getAllByText(/定向拾音/).length).toBeGreaterThan(0);
    expect(within(lab).getByText(/当前模块强度：只保存到选中的算法/)).toBeInTheDocument();
    const visualArea = lab.querySelector(".speech-enhancement-visuals");
    const controlPanel = lab.querySelector(".speech-enhancement-panel");
    expect(visualArea).not.toBeNull();
    expect(controlPanel).not.toBeNull();
    expect(within(visualArea as HTMLElement).getByText(/波形如何变化/)).toBeInTheDocument();
    expect(within(controlPanel as HTMLElement).queryByText(/波形如何变化/)).not.toBeInTheDocument();
    expect(
      (within(controlPanel as HTMLElement).getByRole("group", { name: "麦克风数量" }).compareDocumentPosition(
        within(controlPanel as HTMLElement).getByRole("slider", { name: "处理强度" })
      ) &
        Node.DOCUMENT_POSITION_FOLLOWING) !==
        0
    ).toBe(true);
    expect(within(visualArea as HTMLElement).getByRole("region", { name: "当前算法基本原理" })).toBeInTheDocument();
    expect(within(controlPanel as HTMLElement).queryByRole("region", { name: "当前算法基本原理" })).not.toBeInTheDocument();
    expect(within(lab).queryByRole("region", { name: "核心算法数学形式" })).not.toBeInTheDocument();
    expect(within(lab).queryByRole("region", { name: "滑块和波形关系说明" })).not.toBeInTheDocument();
    expect(within(lab).getByText(/演示输入固定包含噪声、回声和混响/)).toBeInTheDocument();
    expect(within(lab).getByText(/前级算法强度会传递到后级波形/)).toBeInTheDocument();
    expect(within(lab).queryByRole("slider", { name: "噪声强度" })).not.toBeInTheDocument();
    expect(within(lab).queryByRole("slider", { name: "回声强度" })).not.toBeInTheDocument();
    expect(within(lab).queryByRole("slider", { name: "混响拖尾" })).not.toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "语音增强算法链路波形变化图" })).toBeInTheDocument();
    expect(within(lab).getByTestId("speech-stage-raw")).toBeInTheDocument();
    expect(within(lab).getByTestId("speech-stage-aec")).toBeInTheDocument();
    expect(within(lab).getByTestId("speech-stage-ns")).toBeInTheDocument();
    expect(within(lab).getByTestId("speech-stage-dereverb")).toBeInTheDocument();
    expect(within(lab).getByTestId("speech-stage-agc")).toBeInTheDocument();
    expect(within(lab).getByText(/累计示意：AEC 压低延迟回声/)).toBeInTheDocument();
    const stageRaw = within(lab).getByTestId("speech-stage-raw").getAttribute("d");
    const stageAec = within(lab).getByTestId("speech-stage-aec").getAttribute("d");
    const stageNs = within(lab).getByTestId("speech-stage-ns").getAttribute("d");
    const stageDereverb = within(lab).getByTestId("speech-stage-dereverb").getAttribute("d");
    const stageAgc = within(lab).getByTestId("speech-stage-agc").getAttribute("d");
    expect(stageAec).not.toEqual(stageRaw);
    expect(stageNs).not.toEqual(stageAec);
    expect(stageDereverb).not.toEqual(stageNs);
    expect(stageAgc).not.toEqual(stageDereverb);
    expect(within(lab).getByRole("region", { name: "算法源码参考" })).toBeInTheDocument();
    expect(within(lab).getByText(/AEC 源码关键词：NLMS adaptive filter/)).toBeInTheDocument();
    expect(within(lab).getByText(/NS \/ ANR 源码关键词：STFT spectral subtraction/)).toBeInTheDocument();
    expect(within(lab).getByText("Rockchip RK Media / VQE")).toBeInTheDocument();
    expect(within(lab).getByText("SigmaStar MI Audio")).toBeInTheDocument();
    expect(within(lab).getByText("Ingenic IMP Audio")).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "Rockchip RK Media / VQE 音频处理流程图" })).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "SigmaStar MI Audio 音频处理流程图" })).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "Ingenic IMP Audio 音频处理流程图" })).toBeInTheDocument();
    expect(within(lab).getByText("RV1103B / RV1106B")).toBeInTheDocument();
    expect(within(lab).getByText("SSC338Q / SSC338G")).toBeInTheDocument();
    expect(within(lab).getByText("T41")).toBeInTheDocument();
    expect(within(lab).queryByText(/VAD/)).not.toBeInTheDocument();
    const rawWave = within(lab).getByTestId("speech-raw-wave").getAttribute("d");
    const enhancedWave = within(lab).getByTestId("speech-enhanced-wave").getAttribute("d");
    expect(rawWave).not.toEqual(enhancedWave);

    const getStagePath = (id: string) => within(lab).getByTestId(`speech-stage-${id}`).getAttribute("d");
    const stageBeforeNs = {
      raw: getStagePath("raw"),
      aec: getStagePath("aec"),
      ns: getStagePath("ns"),
      dereverb: getStagePath("dereverb"),
      agc: getStagePath("agc")
    };
    await user.click(screen.getByRole("button", { name: "NS / ANR 降噪" }));
    expect(screen.getByText(/NS\/ANR 估计背景噪声频谱/)).toBeInTheDocument();
    fireEvent.change(screen.getByRole("slider", { name: "处理强度" }), {
      target: { value: "100" }
    });
    expect(screen.getByText("当前模块强度：100%")).toBeInTheDocument();
    expect(getStagePath("raw")).toEqual(stageBeforeNs.raw);
    expect(getStagePath("aec")).toEqual(stageBeforeNs.aec);
    expect(getStagePath("ns")).not.toEqual(stageBeforeNs.ns);
    expect(getStagePath("dereverb")).not.toEqual(stageBeforeNs.dereverb);
    expect(getStagePath("agc")).not.toEqual(stageBeforeNs.agc);

    const stageBeforeAec = {
      raw: getStagePath("raw"),
      aec: getStagePath("aec"),
      ns: getStagePath("ns"),
      dereverb: getStagePath("dereverb"),
      agc: getStagePath("agc")
    };
    await user.click(screen.getByRole("button", { name: "AEC 回声消除" }));
    fireEvent.change(screen.getByRole("slider", { name: "处理强度" }), {
      target: { value: "30" }
    });
    expect(screen.getByText("当前模块强度：30%")).toBeInTheDocument();
    expect(getStagePath("raw")).toEqual(stageBeforeAec.raw);
    expect(getStagePath("aec")).not.toEqual(stageBeforeAec.aec);
    expect(getStagePath("ns")).not.toEqual(stageBeforeAec.ns);
    expect(getStagePath("dereverb")).not.toEqual(stageBeforeAec.dereverb);
    expect(getStagePath("agc")).not.toEqual(stageBeforeAec.agc);

    const stageBeforeDereverb = {
      raw: getStagePath("raw"),
      aec: getStagePath("aec"),
      ns: getStagePath("ns"),
      dereverb: getStagePath("dereverb"),
      agc: getStagePath("agc")
    };
    await user.click(screen.getByRole("button", { name: "去混响" }));
    fireEvent.change(screen.getByRole("slider", { name: "处理强度" }), {
      target: { value: "80" }
    });
    expect(screen.getByText("当前模块强度：80%")).toBeInTheDocument();
    expect(getStagePath("raw")).toEqual(stageBeforeDereverb.raw);
    expect(getStagePath("aec")).toEqual(stageBeforeDereverb.aec);
    expect(getStagePath("ns")).toEqual(stageBeforeDereverb.ns);
    expect(getStagePath("dereverb")).not.toEqual(stageBeforeDereverb.dereverb);
    expect(getStagePath("agc")).not.toEqual(stageBeforeDereverb.agc);

    await user.click(screen.getByRole("button", { name: "AGC 自动增益" }));
    const stageBeforeAgc = {
      raw: getStagePath("raw"),
      aec: getStagePath("aec"),
      ns: getStagePath("ns"),
      dereverb: getStagePath("dereverb"),
      agc: getStagePath("agc")
    };
    const agcEnhancedWave = within(lab).getByTestId("speech-enhanced-wave").getAttribute("d");
    fireEvent.change(screen.getByRole("slider", { name: "处理强度" }), {
      target: { value: "20" }
    });
    expect(screen.getByText("当前模块强度：20%")).toBeInTheDocument();
    expect(getStagePath("raw")).toEqual(stageBeforeAgc.raw);
    expect(getStagePath("aec")).toEqual(stageBeforeAgc.aec);
    expect(getStagePath("ns")).toEqual(stageBeforeAgc.ns);
    expect(getStagePath("dereverb")).toEqual(stageBeforeAgc.dereverb);
    expect(getStagePath("agc")).not.toEqual(stageBeforeAgc.agc);
    expect(within(lab).getByTestId("speech-enhanced-wave").getAttribute("d")).not.toEqual(agcEnhancedWave);
    await user.click(screen.getByRole("button", { name: "4 Mic" }));
    expect(within(flowDiagram).getAllByText("4 Mic 阵列").length).toBeGreaterThan(0);
    expect(screen.getByText(/算法延迟：约/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "1 Mic" }));
    expect(within(moduleTabs).getAllByRole("button").map((button) => button.textContent)).toEqual([
      "AEC 回声消除",
      "NS / ANR 降噪",
      "去混响",
      "AGC 自动增益"
    ]);
    expect(within(flowDiagram).getAllByText("1 Mic 单麦").length).toBeGreaterThan(0);
    expect(within(flowDiagram).getByText("单麦跳过")).toBeInTheDocument();
    expect(within(flowDiagram).getByText("单麦无空间信息，跳过多麦增强")).toBeInTheDocument();
  });

  it("opens the core signal processing lab with FFT filters and dynamics views", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /传统算法/ }));
    await user.click(screen.getByRole("button", { name: /基础信号处理/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开基础信号处理实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "基础信号处理实验室" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "返回知识库" })).toBeInTheDocument();
    const lab = screen.getByRole("region", { name: "基础信号处理实验台" });
    const stageFlow = within(lab).getByRole("list", { name: "音频处理阶段流程图" });
    expect(within(stageFlow).getByText("输入源")).toBeInTheDocument();
    expect(within(stageFlow).getByText("PCM 音频")).toBeInTheDocument();
    expect(within(stageFlow).getByText("FFT / STFT")).toBeInTheDocument();
    expect(within(stageFlow).getByText("EQ / 滤波")).toBeInTheDocument();
    expect(within(stageFlow).getByText("动态处理")).toBeInTheDocument();
    expect(within(stageFlow).getByText("输出去向")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "FFT / STFT：主要是分析和变换域入口" })).toBeInTheDocument();
    expect(screen.getByText(/常放在 PCM 之后/)).toBeInTheDocument();
    expect(screen.getByText(/FFT 把一帧 PCM 从时间域转成频率能量/)).toBeInTheDocument();
    const stftFlow = within(lab).getByRole("list", { name: "STFT 流程节点" });
    const stftChart = within(lab).getByRole("img", { name: "STFT 流程对应图" });
    expect(within(stftFlow).getByText("输入 PCM")).toBeInTheDocument();
    expect(within(stftFlow).getByText("分帧/加窗")).toBeInTheDocument();
    expect(within(stftFlow).getByText("FFT")).toBeInTheDocument();
    expect(within(stftFlow).getByText("频谱/特征")).toBeInTheDocument();
    expect(within(stftChart).getAllByText("输入 PCM").length).toBeGreaterThan(0);
    expect(within(stftChart).getAllByText("分帧/加窗").length).toBeGreaterThan(0);
    expect(within(stftChart).getAllByText("FFT").length).toBeGreaterThan(0);
    expect(within(stftChart).getAllByText("频谱/特征").length).toBeGreaterThan(0);
    expect(within(stftChart).getByText("Hann 窗")).toBeInTheDocument();
    expect(within(stftChart).getByText("重叠帧")).toBeInTheDocument();
    expect(within(stftChart).getByText("频率格 / bin")).toBeInTheDocument();
    expect(within(stftChart).getByText("STFT 频谱图")).toBeInTheDocument();
    expect(within(stftChart).getByText("横轴：时间帧")).toBeInTheDocument();
    expect(within(stftChart).getByText("纵轴：频率")).toBeInTheDocument();
    expect(within(stftChart).getByText("横轴：频率格")).toBeInTheDocument();
    expect(within(stftChart).getByText("纵轴：能量")).toBeInTheDocument();
    expect(within(stftChart).getByText("亮 = 能量高")).toBeInTheDocument();
    expect(within(stftChart).getByText("暗 = 能量低")).toBeInTheDocument();
    expect(within(stftChart).getByTestId("stft-energy-plot")).toBeInTheDocument();
    expect(within(stftChart).getByText("高频")).toBeInTheDocument();
    expect(within(stftChart).getByText("低频")).toBeInTheDocument();
    expect(within(stftChart).getAllByTestId("stft-pcm-sample")).toHaveLength(25);
    expect(within(stftChart).getByText("低/中/高频成分叠加")).toBeInTheDocument();
    expect(within(stftChart).getByText("离散采样点")).toBeInTheDocument();
    expect(within(stftChart).getByText("图中示意：14 个频率格")).toBeInTheDocument();
    expect(within(stftChart).getByText("峰值来自同一段 PCM 的频率成分")).toBeInTheDocument();
    expect(within(stftChart).getAllByTestId("stft-feature-bar")).toHaveLength(9);
    expect(within(stftChart).getByText("Mel / MFCC / embedding")).toBeInTheDocument();
    expect(within(stftChart).getByText("由频谱压缩或重排得到")).toBeInTheDocument();
    expect(within(stftChart).getByText("hop 不改变单帧频谱")).toBeInTheDocument();
    expect(within(stftChart).getByText("hop 256 点 = 16.0 ms/帧；只改变横向时间帧")).toBeInTheDocument();
    expect(within(stftChart).getByText("图中示意：27 个时间帧；11 个频率格")).toBeInTheDocument();
    const energyColors = new Set(
      within(stftChart)
        .getAllByTestId("stft-energy-cell")
        .map((cell) => cell.getAttribute("fill"))
    );
    expect(energyColors.size).toBeGreaterThan(8);
    const stftKeyConcepts = screen.getByRole("region", { name: "窗口长度、hop size 和能量图怎么理解" });
    expect(within(stftKeyConcepts).getByRole("heading", { name: "FFT 和 STFT 是什么" })).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/FFT 是 Fast Fourier Transform，中文叫快速傅里叶变换/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/复杂波形可以看成很多个正弦波叠加/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/FFT 的输入是一帧 PCM 采样点，输出不是新的声音/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/STFT 是 Short-Time Fourier Transform，中文叫短时傅里叶变换/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/完整流程可以理解为：PCM 音频 -> 分帧 -> 加窗 -> 每帧 FFT -> 时间-频率能量图/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/FFT 只能描述这一小段里有哪些频率/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByRole("heading", { name: "窗口长度为什么影响频谱" })).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/这不是“更能表现高频”/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/频率格更细指 Δf = 采样率 Fs \/ FFT 点数 N 更小/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/第 k 个 bin 近似对应 k × Fs \/ N Hz/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/窗口越长，频率分辨率越细，但时间定位越粗/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByRole("heading", { name: "hop size 表示什么" })).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/相邻两帧起点之间相隔多少个采样点/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/单帧 FFT 的频率格和频率范围不变/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/采样率决定最高可分析频率/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByRole("heading", { name: "能量高低表示什么" })).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/颜色越亮/)).toBeInTheDocument();
    expect(within(stftKeyConcepts).getByText(/频谱进一步压缩、重排或学习成特征向量/)).toBeInTheDocument();
    expect(screen.getByText("频率分辨率：31.25 Hz/bin")).toBeInTheDocument();
    expect(screen.getByText("每帧时长：32.0 ms")).toBeInTheDocument();
    const initialWindowWidth = Number(screen.getByTestId("stft-window-block").getAttribute("width"));
    const initialHopOffset = Number(screen.getByTestId("stft-overlap-frame").getAttribute("x"));
    const initialEnergyPlotHeight = Number(screen.getByTestId("stft-energy-plot").getAttribute("height"));
    const initialEnergyPlotWidth = Number(screen.getByTestId("stft-energy-plot").getAttribute("width"));
    const initialEnergyCellHeight = Number(screen.getAllByTestId("stft-energy-cell")[0].getAttribute("height"));
    const initialEnergyCellCount = screen.getAllByTestId("stft-energy-cell").length;
    const initialSpectrumBarCount = document.querySelectorAll(".core-spectrum-bar:not(.muted)").length;

    fireEvent.change(screen.getByRole("slider", { name: "Hop size" }), {
      target: { value: "128" }
    });
    expect(screen.getByText("hop 128 点 = 8.0 ms/帧；只改变横向时间帧")).toBeInTheDocument();
    expect(screen.getByText("图中示意：36 个时间帧；11 个频率格")).toBeInTheDocument();
    expect(screen.getAllByTestId("stft-energy-cell").length).toBeGreaterThan(initialEnergyCellCount);
    expect(document.querySelectorAll(".core-spectrum-bar:not(.muted)").length).toBe(initialSpectrumBarCount);
    expect(Number(screen.getByTestId("stft-energy-plot").getAttribute("height"))).toBe(initialEnergyPlotHeight);
    expect(Number(screen.getByTestId("stft-energy-plot").getAttribute("width"))).toBe(initialEnergyPlotWidth);
    expect(Number(screen.getByTestId("stft-overlap-frame").getAttribute("x"))).toBeLessThan(initialHopOffset);

    const hopOnlyEnergyCellHeight = Number(screen.getAllByTestId("stft-energy-cell")[0].getAttribute("height"));
    const hopOnlyEnergyCellCount = screen.getAllByTestId("stft-energy-cell").length;
    fireEvent.change(screen.getByRole("slider", { name: "窗口长度" }), {
      target: { value: "1024" }
    });
    expect(screen.getByText("频率分辨率：15.63 Hz/bin")).toBeInTheDocument();
    expect(screen.getByText("重叠率：87.5%")).toBeInTheDocument();
    expect(Number(screen.getByTestId("stft-window-block").getAttribute("width"))).toBeGreaterThan(initialWindowWidth);
    expect(screen.getByText("图中示意：22 个频率格")).toBeInTheDocument();
    expect(screen.getByText("图中示意：36 个时间帧；16 个频率格")).toBeInTheDocument();
    expect(Number(screen.getByTestId("stft-energy-plot").getAttribute("height"))).toBe(initialEnergyPlotHeight);
    expect(Number(screen.getByTestId("stft-energy-plot").getAttribute("width"))).toBe(initialEnergyPlotWidth);
    expect(Number(screen.getAllByTestId("stft-energy-cell")[0].getAttribute("height"))).toBeLessThan(hopOnlyEnergyCellHeight);
    expect(screen.getAllByTestId("stft-energy-cell").length).toBeGreaterThan(hopOnlyEnergyCellCount);
    expect(document.querySelectorAll(".core-spectrum-bar:not(.muted)").length).toBeGreaterThan(initialSpectrumBarCount);
    expect(Number(screen.getAllByTestId("stft-energy-cell")[0].getAttribute("height"))).toBeLessThan(initialEnergyCellHeight);
    expect(screen.getByText("这一步变化：窗口长度改变频率格间隔；hop size 改变横向时间帧密度，不改变单帧 FFT 频谱。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "滤波器 / EQ" }));
    expect(screen.getByRole("heading", { name: "EQ / 滤波：主要是频段能量塑形" })).toBeInTheDocument();
    expect(screen.getByText(/通常放在 PCM 处理链中间/)).toBeInTheDocument();
    expect(screen.getByText(/参数 EQ 用中心频率、增益和 Q 控制某一段频率/)).toBeInTheDocument();
    const filterFlow = screen.getByRole("list", { name: "滤波器流程节点" });
    const filterChart = screen.getByRole("img", { name: "滤波器流程对应图" });
    expect(within(filterFlow).getByText("输入频谱")).toBeInTheDocument();
    expect(within(filterFlow).getByText("选择滤波器")).toBeInTheDocument();
    expect(within(filterFlow).getByText("频率响应")).toBeInTheDocument();
    expect(within(filterFlow).getByText("输出频谱")).toBeInTheDocument();
    expect(within(filterChart).getAllByText("输入频谱").length).toBeGreaterThan(0);
    expect(within(filterChart).getAllByText("选择滤波器").length).toBeGreaterThan(0);
    expect(within(filterChart).getAllByText("频率响应").length).toBeGreaterThan(0);
    expect(within(filterChart).getAllByText("输出频谱").length).toBeGreaterThan(0);
    expect(within(filterChart).getByText("原始波形")).toBeInTheDocument();
    expect(within(filterChart).getByText("滤波后波形")).toBeInTheDocument();
    const initialFilteredWave = screen.getByTestId("filtered-wave-path").getAttribute("d");
    expect(screen.getByText("低通：削弱截止频率以上的高频")).toBeInTheDocument();
    expect(screen.getByText("截止频率：2400 Hz")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Q" })).toHaveAttribute("min", "0");
    expect(screen.getByRole("slider", { name: "Q" })).toHaveAttribute("max", "20");
    const getOutputBarHeights = () =>
      screen.getAllByTestId("filter-output-bar").map((bar) => Number(bar.getAttribute("height")));
    const initialQWidth = Number(screen.getByTestId("filter-q-band").getAttribute("width"));
    fireEvent.change(screen.getByRole("slider", { name: "Q" }), {
      target: { value: "20" }
    });
    expect(screen.getByText("Q：20.0")).toBeInTheDocument();
    expect(Number(screen.getByTestId("filter-q-band").getAttribute("width"))).toBeLessThan(initialQWidth);
    const lowpassOutputBarsBeforeCutoff = getOutputBarHeights();
    const initialCutoffX = Number(screen.getByTestId("filter-cutoff-marker").getAttribute("x1"));
    fireEvent.change(screen.getByRole("slider", { name: "截止频率" }), {
      target: { value: "4800" }
    });
    expect(Number(screen.getByTestId("filter-cutoff-marker").getAttribute("x1"))).toBeGreaterThan(initialCutoffX);
    expect(getOutputBarHeights()).not.toEqual(lowpassOutputBarsBeforeCutoff);
    expect(screen.getByTestId("filtered-wave-path").getAttribute("d")).not.toEqual(initialFilteredWave);
    await user.click(screen.getByRole("button", { name: "高通" }));
    const highpassOutputBars = getOutputBarHeights();
    expect(highpassOutputBars[0]).toBeLessThan(highpassOutputBars[highpassOutputBars.length - 1]);

    await user.click(screen.getByRole("button", { name: "带通" }));
    fireEvent.change(screen.getByRole("slider", { name: "Q" }), {
      target: { value: "1" }
    });
    const wideBandpassOutputBars = getOutputBarHeights();
    const wideBandpassWave = screen.getByTestId("filtered-wave-path").getAttribute("d");
    fireEvent.change(screen.getByRole("slider", { name: "Q" }), {
      target: { value: "20" }
    });
    expect(getOutputBarHeights()).not.toEqual(wideBandpassOutputBars);
    expect(screen.getByTestId("filtered-wave-path").getAttribute("d")).not.toEqual(wideBandpassWave);

    const initialEqGainY = Number(screen.getByTestId("filter-eq-gain-line").getAttribute("y1"));
    const initialOutputBarMaxHeight = Math.max(...getOutputBarHeights());
    fireEvent.change(screen.getByRole("slider", { name: "EQ 增益" }), {
      target: { value: "9" }
    });
    expect(screen.getByText("EQ 增益：+9 dB")).toBeInTheDocument();
    expect(Number(screen.getByTestId("filter-eq-gain-line").getAttribute("y1"))).toBeLessThan(initialEqGainY);
    expect(Math.max(...getOutputBarHeights())).toBeGreaterThan(initialOutputBarMaxHeight);
    expect(screen.getByText("这一步变化：截止频率、Q 和 EQ 增益共同改变频率响应，输出频谱会随各频段保留比例变化。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "动态处理" }));
    expect(screen.getByRole("heading", { name: "动态处理：主要是电平和峰值控制" })).toBeInTheDocument();
    expect(screen.getByText(/通常放在降噪\/EQ 之后、编码或 DAC 之前/)).toBeInTheDocument();
    expect(screen.getByText(/它不是 MP3\/AAC 这类编码压缩/)).toBeInTheDocument();
    const dynamicsFlow = screen.getByRole("list", { name: "动态处理流程节点" });
    const dynamicsChart = screen.getByRole("img", { name: "动态处理流程对应图" });
    expect(within(dynamicsFlow).getByText("输入数字电平")).toBeInTheDocument();
    expect(within(dynamicsFlow).getByText("电平检测")).toBeInTheDocument();
    expect(within(dynamicsFlow).getByText("增益计算")).toBeInTheDocument();
    expect(within(dynamicsFlow).getByText("输出电平")).toBeInTheDocument();
    expect(within(dynamicsChart).getAllByText("输入数字电平").length).toBeGreaterThan(0);
    expect(within(dynamicsChart).getAllByText("电平检测").length).toBeGreaterThan(0);
    expect(within(dynamicsChart).getAllByText("增益计算").length).toBeGreaterThan(0);
    expect(within(dynamicsChart).getAllByText("输出电平").length).toBeGreaterThan(0);
    expect(within(dynamicsChart).getByText("数字样本幅度 -> dBFS")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("超过阈值：输出 = T + (输入 - T) / Ratio")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("超出量：-6 dBFS - -18 dBFS = +12 dB")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("Ratio：+12 dB / 3 = +4 dB")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("输出：-14 dBFS；增益变化 -8 dB")).toBeInTheDocument();
    expect(within(dynamicsChart).getByTestId("dynamics-gain-reduction")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("横轴：输入电平 dBFS")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("纵轴：输出电平 dBFS")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("未压缩输出=输入")).toBeInTheDocument();
    expect(within(dynamicsChart).getByText("增益衰减 -8 dB")).toBeInTheDocument();
    expect(screen.getByText("超过阈值后按 ratio 收缩，峰值被压低")).toBeInTheDocument();
    expect(screen.getByText("Threshold：-18 dBFS")).toBeInTheDocument();
    const initialThresholdY = Number(screen.getByTestId("dynamics-threshold-line").getAttribute("y1"));
    const initialOverThreshold = screen.getByTestId("dynamics-over-threshold").textContent;
    const initialRatioKept = screen.getByTestId("dynamics-ratio-kept").textContent;
    const initialGainDb = screen.getByTestId("dynamics-gain-db").textContent;
    fireEvent.change(screen.getByRole("slider", { name: "Threshold" }), {
      target: { value: "-30" }
    });
    expect(Number(screen.getByTestId("dynamics-threshold-line").getAttribute("y1"))).toBeGreaterThan(initialThresholdY);
    expect(screen.getByTestId("dynamics-over-threshold").textContent).not.toEqual(initialOverThreshold);
    fireEvent.change(screen.getByRole("slider", { name: "Ratio" }), {
      target: { value: "6" }
    });
    expect(screen.getByText("Ratio：6:1")).toBeInTheDocument();
    expect(screen.getByTestId("dynamics-ratio-kept").textContent).not.toEqual(initialRatioKept);
    expect(screen.getByTestId("dynamics-gain-db").textContent).not.toEqual(initialGainDb);
    expect(screen.getByText("Threshold 改变超出量；ratio 改变超出阈值部分保留多少，二者共同决定增益衰减。")).toBeInTheDocument();
  });

  it("renders the animated signal visualization on the homepage", () => {
    render(<App />);

    expect(screen.getByTestId("animated-signal-panel")).toBeInTheDocument();
    expect(screen.getByTestId("signal-scanline")).toBeInTheDocument();
    expect(screen.getAllByTestId("animated-wave-bar")).toHaveLength(32);
  });

  it("opens and closes topic details from a topic card", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.queryByRole("dialog", { name: "主题详情" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /语音识别 ASR/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(details).toHaveClass("topic-details-modal");
    expect(screen.getByTestId("topic-details-backdrop")).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "语音识别 ASR" })).toBeInTheDocument();
    expect(within(details).getByText("内容扩展建议")).toBeInTheDocument();

    await user.click(within(details).getByRole("button", { name: "关闭详情" }));

    expect(screen.queryByRole("dialog", { name: "主题详情" })).not.toBeInTheDocument();
  });

  it("shows detailed topic-specific explanations in the details panel", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /语音识别 ASR/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByRole("heading", { name: "详细解释" })).toBeInTheDocument();
    expect(within(details).getByText(/把连续的语音波形转换成可编辑、可检索的文字/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "常见误区" })).toBeInTheDocument();
    expect(within(details).getByText(/识别率高不等于在所有噪声、口音和设备上都稳定/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "内容扩展建议" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "English" }));

    const englishDetails = screen.getByRole("dialog", { name: "Topic details" });
    expect(
      within(englishDetails).getByRole("heading", { name: "Detailed explanation" })
    ).toBeInTheDocument();
    expect(
      within(englishDetails).getByText(/turns continuous speech waveforms into editable/)
    ).toBeInTheDocument();
    expect(within(englishDetails).getByRole("heading", { name: "Common misconception" })).toBeInTheDocument();
  });

  it("explains sound topic bullets one by one with a diagram", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /什么是声音/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByRole("heading", { name: "相关知识点逐条解释" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "频率" })).toBeInTheDocument();
    expect(within(details).getByText(/频率表示声波每秒振动的次数/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "振幅" })).toBeInTheDocument();
    expect(within(details).getByText(/振幅表示压力变化的幅度/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "相位" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "波长" })).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开声音波形实验室" })).toBeInTheDocument();
    expect(within(details).getByText(/进入独立界面后，可以调节频率、振幅和相位/)).toBeInTheDocument();
    expect(within(details).getByRole("img", { name: "声波频率、振幅、相位和波长图解" })).toBeInTheDocument();
    const soundDiagram = within(details).getByRole("img", { name: "声波频率、振幅、相位和波长图解" });
    expect(soundDiagram.querySelector('[data-testid="sound-wave-low"]')).toBeInTheDocument();
    expect(soundDiagram.querySelector('[data-testid="sound-wave-mid"]')).toBeInTheDocument();
    expect(soundDiagram.querySelector('[data-testid="sound-wave-high"]')).toBeInTheDocument();
    expect(within(details).getAllByText("高频").length).toBeGreaterThan(0);
    expect(within(details).getAllByText("低频").length).toBeGreaterThan(0);

    const lowWave = soundDiagram.querySelector('[data-testid="sound-wave-low"]');
    const highWave = soundDiagram.querySelector('[data-testid="sound-wave-high"]');
    expect(Number(highWave?.getAttribute("data-cycles"))).toBeGreaterThan(
      Number(lowWave?.getAttribute("data-cycles"))
    );
    expect(Number(highWave?.getAttribute("data-amplitude"))).toBeGreaterThan(
      Number(lowWave?.getAttribute("data-amplitude"))
    );
  });

  it("places lab entries directly after detailed explanations in topic details", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /什么是声音/ }));
    let details = screen.getByRole("dialog", { name: "主题详情" });
    let explanationHeading = within(details).getByRole("heading", { name: "详细解释" });
    let keyPointsHeading = within(details).getByRole("heading", { name: "关键知识点" });
    let labButton = within(details).getByRole("button", { name: "打开声音波形实验室" });
    expect(explanationHeading.compareDocumentPosition(labButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(labButton.compareDocumentPosition(keyPointsHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    await user.click(within(details).getByRole("button", { name: "关闭详情" }));
    await user.click(screen.getByRole("button", { name: /数字音频基础/ }));
    details = screen.getByRole("dialog", { name: "主题详情" });
    explanationHeading = within(details).getByRole("heading", { name: "详细解释" });
    keyPointsHeading = within(details).getByRole("heading", { name: "关键知识点" });
    labButton = within(details).getByRole("button", { name: "打开采样、量化与编码实验室" });
    expect(explanationHeading.compareDocumentPosition(labButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(labButton.compareDocumentPosition(keyPointsHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    await user.click(within(details).getByRole("button", { name: "关闭详情" }));
    await user.click(screen.getByRole("button", { name: /听感与指标/ }));
    details = screen.getByRole("dialog", { name: "主题详情" });
    explanationHeading = within(details).getByRole("heading", { name: "详细解释" });
    keyPointsHeading = within(details).getByRole("heading", { name: "关键知识点" });
    labButton = within(details).getByRole("button", { name: "打开听感与指标实验室" });
    expect(explanationHeading.compareDocumentPosition(labButton) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(labButton.compareDocumentPosition(keyPointsHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("lets readers adjust parameters in the independent sound wave lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /什么是声音/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开声音波形实验室"
      })
    );

    expect(screen.getByRole("img", { name: "当前声音波形图" })).toBeInTheDocument();
    expect(screen.getByText(/y\(t\) = 0.60 · sin\(2π · 440t \+ 0.00π\)/)).toBeInTheDocument();

    fireEvent.change(screen.getByRole("slider", { name: "频率" }), {
      target: { value: "880" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "振幅" }), {
      target: { value: "0.8" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "相位" }), {
      target: { value: "0.5" }
    });

    expect(screen.getByText(/y\(t\) = 0.80 · sin\(2π · 880t \+ 0.50π\)/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "三角波" }));

    expect(screen.getByText("当前波形：三角波")).toBeInTheDocument();
  });

  it("replaces the active sound when switching waveforms during playback", async () => {
    const createdOscillators: Array<{
      connect: ReturnType<typeof vi.fn>;
      disconnect: ReturnType<typeof vi.fn>;
      start: ReturnType<typeof vi.fn>;
      stop: ReturnType<typeof vi.fn>;
      frequency: { setValueAtTime: ReturnType<typeof vi.fn> };
      type: OscillatorType;
    }> = [];
    const createdGains: Array<{
      connect: ReturnType<typeof vi.fn>;
      disconnect: ReturnType<typeof vi.fn>;
      gain: {
        cancelScheduledValues: ReturnType<typeof vi.fn>;
        setValueAtTime: ReturnType<typeof vi.fn>;
      };
    }> = [];
    const createdContexts: Array<{
      currentTime: number;
      destination: object;
      createOscillator: ReturnType<typeof vi.fn>;
      createGain: ReturnType<typeof vi.fn>;
      close: ReturnType<typeof vi.fn>;
    }> = [];

    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: vi.fn(() => {
        const context = {
          currentTime: 0,
          destination: {},
          createOscillator: vi.fn(() => {
            const oscillator = {
              connect: vi.fn(),
              disconnect: vi.fn(),
              start: vi.fn(),
              stop: vi.fn(),
              frequency: { setValueAtTime: vi.fn() },
              type: "sine" as OscillatorType
            };
            createdOscillators.push(oscillator);
            return oscillator;
          }),
          createGain: vi.fn(() => {
            const gain = {
              connect: vi.fn(),
              disconnect: vi.fn(),
              gain: {
                cancelScheduledValues: vi.fn(),
                setValueAtTime: vi.fn()
              }
            };
            createdGains.push(gain);
            return gain;
          }),
          close: vi.fn()
        };
        createdContexts.push(context);
        return context;
      })
    });

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /什么是声音/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开声音波形实验室"
      })
    );

    await user.click(screen.getByRole("button", { name: "播放" }));
    expect(createdOscillators).toHaveLength(1);
    expect(createdOscillators[0].type).toBe("sine");

    await user.click(screen.getByRole("button", { name: "方波" }));

    expect(createdOscillators).toHaveLength(2);
    expect(createdOscillators[0].stop).toHaveBeenCalledWith(0);
    expect(createdOscillators[0].disconnect).toHaveBeenCalled();
    expect(createdGains[0].gain.setValueAtTime).toHaveBeenLastCalledWith(0, 0);
    expect(createdGains[0].disconnect).toHaveBeenCalled();
    expect(createdContexts[0].close).toHaveBeenCalled();
    expect(createdOscillators[1].type).toBe("square");

    await user.click(screen.getByRole("button", { name: "三角波" }));

    expect(createdOscillators).toHaveLength(3);
    expect(createdOscillators[1].stop).toHaveBeenCalledWith(0);
    expect(createdContexts[1].close).toHaveBeenCalled();
    expect(createdOscillators[2].type).toBe("triangle");
    expect(screen.getByText("播放中")).toBeInTheDocument();
  });

  it("opens the independent sound wave lab from the sound details panel", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /什么是声音/ }));
    const details = screen.getByRole("dialog", { name: "主题详情" });

    await user.click(within(details).getByRole("button", { name: "打开声音波形实验室" }));

    expect(screen.queryByRole("dialog", { name: "主题详情" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "声音波形实验室" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "当前声音波形图" })).toBeInTheDocument();
    expect(screen.getByText("一个周期 / 周期更短")).toBeInTheDocument();

    const lowFrequencyPath = screen.getByRole("img", { name: "当前声音波形图" }).querySelector(".lab-wave-path")?.getAttribute("d") ?? "";

    fireEvent.change(screen.getByRole("slider", { name: "频率" }), {
      target: { value: "880" }
    });

    const highFrequencyPath = screen.getByRole("img", { name: "当前声音波形图" }).querySelector(".lab-wave-path")?.getAttribute("d") ?? "";
    expect(highFrequencyPath).not.toEqual(lowFrequencyPath);
    const countCenterCrossings = (path = "") => {
      const values = Array.from(path.matchAll(/[ML]\s+[-\d.]+\s+([-\d.]+)/g), (match) => Number(match[1]) - 160);

      return values.slice(1).reduce((crossings, value, index) => {
        const previous = values[index];
        return previous * value < 0 ? crossings + 1 : crossings;
      }, 0);
    };
    expect(countCenterCrossings(highFrequencyPath)).toBeGreaterThan(countCenterCrossings(lowFrequencyPath));

    await user.click(screen.getByRole("button", { name: "返回知识库" }));

    expect(screen.getByRole("heading", { name: "音频技术分享" })).toBeInTheDocument();
  });

  it("explains digital audio basics and links to the sampling lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /数字音频基础/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByRole("heading", { name: "采样" })).toBeInTheDocument();
    expect(within(details).getByText(/采样把连续时间中的模拟波形/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "量化" })).toBeInTheDocument();
    expect(within(details).getByText(/量化把连续幅度映射到有限个数字等级/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "编码" })).toBeInTheDocument();
    expect(within(details).getByText(/编码决定这些采样值如何组织/)).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开采样、量化与编码实验室" })).toBeInTheDocument();
  });

  it("lets readers compare sampling rate and bit depth in the digital audio lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /数字音频基础/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开采样、量化与编码实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "采样、量化与编码实验室" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "采样与量化可视化图" })).toBeInTheDocument();
    expect(screen.getByText("当前采样点：24 个")).toBeInTheDocument();
    expect(screen.getByText("当前量化等级：16 级")).toBeInTheDocument();
    expect(screen.getByTestId("digital-bit-depth-guide")).toBeInTheDocument();
    expect(screen.getAllByTestId("digital-bit-depth-level")).toHaveLength(16);

    fireEvent.change(screen.getByRole("slider", { name: "采样率" }), {
      target: { value: "12" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "位深" }), {
      target: { value: "3" }
    });

    expect(screen.getByText("当前采样点：12 个")).toBeInTheDocument();
    expect(screen.getByText("当前量化等级：8 级")).toBeInTheDocument();
    expect(screen.getAllByTestId("digital-bit-depth-level")).toHaveLength(8);
    expect(screen.getByText(/位深决定纵向幅度等级/)).toBeInTheDocument();

    const quantizedPathBeforeFrequencyChange = screen.getByTestId("digital-step-path").getAttribute("d");
    fireEvent.change(screen.getByRole("slider", { name: "输入频率" }), {
      target: { value: "5" }
    });

    expect(screen.getByText("输入频率：5 个周期")).toBeInTheDocument();
    expect(screen.getByTestId("digital-step-path").getAttribute("d")).not.toBe(quantizedPathBeforeFrequencyChange);

    await user.click(screen.getByRole("button", { name: "误差曲线" }));

    expect(screen.getByText("显示模式：误差曲线")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "返回知识库" }));

    expect(screen.getByRole("heading", { name: "音频技术分享" })).toBeInTheDocument();
  });

  it("shows how quantized samples become PCM words", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /数字音频基础/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/PCM 不是压缩算法/)).toBeInTheDocument();

    await user.click(within(details).getByRole("button", { name: "打开采样、量化与编码实验室" }));
    await user.click(screen.getByRole("button", { name: "PCM 编码" }));

    expect(screen.getByText("显示模式：PCM 编码")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "如何变成 PCM" })).toBeInTheDocument();
    expect(screen.getByText("模拟值 → 量化值 → 整数样本值 → 二进制 PCM")).toBeInTheDocument();
    expect(screen.getByText("PCM 码率 = 采样率 × 位深 × 声道数")).toBeInTheDocument();
    expect(screen.getByText("48 kHz × 16-bit × 2 声道 = 1536 kbps")).toBeInTheDocument();
    expect(screen.getByText(/采样 #1/)).toBeInTheDocument();
  });

  it("summarizes common codec principles and compression ratios in the digital audio lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /数字音频基础/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开采样、量化与编码实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "如何变成 PCM" })).toBeInTheDocument();
    expect(screen.getByText("模拟值 → 量化值 → 整数样本值 → 二进制 PCM")).toBeInTheDocument();
    expect(screen.getByText("PCM 码率 = 采样率 × 位深 × 声道数")).toBeInTheDocument();
    expect(screen.getByText(/采样 #1/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PCM 如何变成 WAV" })).toBeInTheDocument();
    expect(screen.getAllByText(/给 PCM 加上 RIFF\/WAVE 文件头/).length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "编码格式原理速览" })).toBeInTheDocument();
    expect(screen.getByText("MP3")).toBeInTheDocument();
    expect(screen.getByText("约 6:1 到 12:1")).toBeInTheDocument();
    expect(screen.getByText("AAC")).toBeInTheDocument();
    expect(screen.getByText("约 8:1 到 16:1")).toBeInTheDocument();
    expect(screen.getByText("AMR")).toBeInTheDocument();
    expect(screen.getByText("约 10:1 到 30:1")).toBeInTheDocument();
    expect(screen.getByText("Opus")).toBeInTheDocument();
    expect(screen.getByText("ADPCM")).toBeInTheDocument();
    expect(screen.getByText(/保存当前采样与预测值之间的差分/)).toBeInTheDocument();
  });

  it("expands ADC DAC Codec hardware knowledge with detailed terms and a lab entry", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /ADC \/ DAC \/ Codec/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/ADC 把麦克风、线路输入等模拟电压/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "ADC" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "DAC" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "音频 Codec 芯片" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "PGA / 前级增益" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "I2S / PDM / TDM" })).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开 ADC / DAC / Codec 实验室" })).toBeInTheDocument();
  });

  it("expands amplifier speaker knowledge with detailed terms and a lab entry", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /功放与扬声器/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/功放负责把 DAC、Codec 或前级输出的小信号/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "功放是什么" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "Class A / AB / D" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "动圈扬声器" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "阻抗" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "灵敏度" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "分频器" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "Thiele-Small 参数" })).toBeInTheDocument();
    expect(within(details).getByText(/Fs 是自由空气谐振频率/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "密闭箱 vs 倒相箱" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "分频阶数与相位" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "主动分频 vs 被动分频" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "线阵列扬声器" })).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开功放与扬声器实验室" })).toBeInTheDocument();
  });

  it("expands system audio architecture knowledge as a concise system boundary overview", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频软件/ }));
    await user.click(screen.getByRole("button", { name: /系统音频架构/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/系统音频架构回答的是/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "应用层 API" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "音频服务" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "音频策略与路由" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "混音器与重采样" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "HAL / 驱动" })).toBeInTheDocument();
    expect(within(details).queryByRole("heading", { name: "低延迟通路入口" })).not.toBeInTheDocument();
    expect(within(details).getByText(/不展开具体 DSP 算法、接口时序或低延迟调参/)).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开系统音频架构实验室" })).toBeInTheDocument();
  });

  it("expands real-time audio processing knowledge with detailed buffer and xrun terms", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频软件/ }));
    await user.click(screen.getByRole("button", { name: /实时音频处理/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/每一小块音频都在截止时间前完成计算/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "Buffer size" })).toBeInTheDocument();
    expect(within(details).getByText(/48 kHz 下 128 帧 buffer 约等于 2\.67 ms/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "回调 deadline" })).toBeInTheDocument();
    expect(within(details).getByText(/deadline 由 buffer 帧数和采样率决定/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "XRUN" })).toBeInTheDocument();
    expect(within(details).getByText(/XRUN 是 underrun 或 overrun 的统称/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "实时安全操作" })).toBeInTheDocument();
    expect(within(details).getByText(/避免锁等待、磁盘 IO、网络请求、大量日志和运行期分配/)).toBeInTheDocument();
    expect(within(details).getByText(/实时回调时间线/)).toBeInTheDocument();
    expect(within(details).queryByRole("button", { name: "打开系统音频架构实验室" })).not.toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开实时音频处理实验室" })).toBeInTheDocument();
  });

  it("opens the real-time audio processing lab and simulates deadline xruns", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频软件/ }));
    await user.click(screen.getByRole("button", { name: /实时音频处理/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开实时音频处理实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "实时音频处理实验室" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "返回知识库" })).toBeInTheDocument();
    const lab = screen.getByRole("region", { name: "实时音频处理实验台" });
    expect(within(lab).getByRole("img", { name: "基础音频处理流程图" })).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "ALSA 采集 PCM 到编码流程图" })).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "MP3 解码到 PCM 播放流程图" })).toBeInTheDocument();
    expect(within(lab).getByRole("img", { name: "典型 SoC AEC 和 3A 处理框图" })).toBeInTheDocument();
    const basicFlow = within(lab).getByRole("img", { name: "基础音频处理流程图" });
    expect(basicFlow).toHaveAttribute("data-layout", "horizontal");
    expect(within(basicFlow).getByText("编码")).toBeInTheDocument();
    expect(within(basicFlow).getByText("传输 / 缓存")).toBeInTheDocument();
    expect(within(basicFlow).getByText("解码")).toBeInTheDocument();
    expect(basicFlow).toHaveTextContent("播放侧 filter / DSP");
    expect(within(basicFlow).getByText("播放驱动")).toBeInTheDocument();
    expect(within(basicFlow).getByText("D/A 转换")).toBeInTheDocument();
    expect(within(basicFlow).getByText("功放")).toBeInTheDocument();
    expect(within(basicFlow).getByText("声音输出")).toBeInTheDocument();
    expect(within(basicFlow).queryByText("编码 / 传输 / 播放")).not.toBeInTheDocument();
    const concreteExamples = lab.querySelector(".realtime-example-flow-pair");
    expect(concreteExamples).toBeInTheDocument();
    const captureFlow = within(lab).getByRole("img", { name: "ALSA 采集 PCM 到编码流程图" });
    expect(within(captureFlow).getByText("麦克风")).toBeInTheDocument();
    expect(captureFlow).toHaveTextContent("模拟前端 / Codec ADC");
    expect(captureFlow).toHaveTextContent("I2S / PDM / USB Audio");
    expect(captureFlow.querySelectorAll(".realtime-flow-node-detail tspan").length).toBeGreaterThan(0);
    expect(screen.getByText("默认格式：16 kHz / mono / 16-bit PCM")).toBeInTheDocument();
    expect(screen.getByText("32 ms 处理帧：512 samples / 1024 bytes")).toBeInTheDocument();
    expect(screen.getByText("采集 period：32.00 ms")).toBeInTheDocument();
    expect(screen.getByText("Deadline：32.00 ms")).toBeInTheDocument();
    expect(screen.getByText("估算采集到编码延迟：96.00 ms")).toBeInTheDocument();
    expect(screen.getByText("状态：稳定")).toBeInTheDocument();
    expect(screen.getByText("最坏处理耗时：1.80 ms")).toBeInTheDocument();
    expect(captureFlow).toHaveTextContent("ALSA ring buffer");
    expect(captureFlow).toHaveTextContent("copy_to_user / mmap");
    expect(captureFlow).toHaveTextContent("32ms filter frame");
    expect(captureFlow).toHaveTextContent("MP3 frame");
    const playbackFlow = within(lab).getByRole("img", { name: "MP3 解码到 PCM 播放流程图" });
    expect(concreteExamples).toContainElement(captureFlow);
    expect(concreteExamples).toContainElement(playbackFlow);
    expect(playbackFlow.querySelectorAll(".realtime-flow-node-detail tspan").length).toBeGreaterThan(0);
    expect(within(playbackFlow).getByText("网络包 / 文件码流")).toBeInTheDocument();
    expect(playbackFlow).toHaveTextContent("接收 buffer / jitter buffer");
    expect(within(playbackFlow).getByText("解码器输入 buffer")).toBeInTheDocument();
    expect(playbackFlow).toHaveTextContent("PCM playback buffer");
    expect(playbackFlow).toHaveTextContent("ALSA playback ring buffer");
    expect(playbackFlow).toHaveTextContent("I2S / TDM / USB Audio");
    expect(playbackFlow).toHaveTextContent("Codec DAC / 模拟处理");
    expect(within(playbackFlow).getByText("功放")).toBeInTheDocument();
    expect(within(playbackFlow).getAllByText("扬声器").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "jitter buffer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "解码器输入 buffer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PCM playback buffer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "ALSA playback ring buffer" })).toBeInTheDocument();
    const socAecDiagram = within(lab).getByRole("img", { name: "典型 SoC AEC 和 3A 处理框图" });
    expect(within(socAecDiagram).getByText("远端音频")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("ADEC")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("AO / Mixer")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("AEC reference buffer")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("回采信号用于 AEC")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("AI / DMA")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("AEC")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("NS / ANR")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("AGC")).toBeInTheDocument();
    expect(within(socAecDiagram).getByText("AENC")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AEC reference buffer" })).toBeInTheDocument();
    expect(screen.getByText(/播放参考通常取自 AO\/Mixer 输出/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "典型 SoC 命名差异" })).toBeInTheDocument();
    expect(screen.getByText(/瑞芯微、君正、SigmaStar/)).toBeInTheDocument();

    expect(within(lab).queryByRole("slider")).not.toBeInTheDocument();
    expect(screen.getByText("DSP 耗时：1.40 ms")).toBeInTheDocument();
    expect(screen.getByText(/当前示例留有充足处理余量/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "实时安全规则" })).toBeInTheDocument();
    expect(screen.getByText(/不要在采集回调或低延迟线程里做磁盘 IO/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "排查方向" })).toBeInTheDocument();
    expect(screen.getByText(/CPU 峰值过高/)).toBeInTheDocument();
  });

  it("keeps real-time audio flow diagrams separated from static metrics", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频软件/ }));
    await user.click(screen.getByRole("button", { name: /实时音频处理/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开实时音频处理实验室"
      })
    );

    const lab = screen.getByRole("region", { name: "实时音频处理实验台" });
    const visual = within(lab).getByRole("region", { name: "实时音频调度图" });
    const metrics = lab.querySelector(".realtime-audio-metrics");
    const flowGrid = lab.querySelector(".realtime-flow-grid");

    expect(lab).toHaveClass("realtime-audio-workbench");
    expect(metrics).toHaveClass("realtime-audio-metrics");
    expect(flowGrid).toBeInTheDocument();
    expect(visual).toContainElement(flowGrid as HTMLElement);
    expect(flowGrid?.querySelector(".realtime-example-flow-pair")).toBeInTheDocument();
    expect(within(lab).queryByRole("slider")).not.toBeInTheDocument();
    expect(within(visual).getByRole("img", { name: "基础音频处理流程图" })).toHaveAttribute(
      "viewBox",
      expect.stringMatching(/^0 0 1480 /)
    );
    expect(within(visual).getByRole("img", { name: "ALSA 采集 PCM 到编码流程图" })).toHaveAttribute(
      "viewBox",
      expect.stringMatching(/^0 0 1480 /)
    );
    expect(within(visual).getByRole("img", { name: "MP3 解码到 PCM 播放流程图" })).toHaveAttribute(
      "viewBox",
      expect.stringMatching(/^0 0 1480 /)
    );
    expect(within(visual).getByRole("img", { name: "典型 SoC AEC 和 3A 处理框图" })).toHaveAttribute("viewBox", "0 0 1180 620");
  });

  it("opens the system audio architecture lab from the software topic", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /系统音频架构/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开系统音频架构实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "系统音频架构实验室" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "返回知识库" })).toBeInTheDocument();
    const overview = screen.getByRole("region", { name: "系统音频架构总览" });
    expect(overview).toBeInTheDocument();
    const genericDiagram = within(overview).getByRole("img", { name: "通用系统音频架构框图" });
    const linuxDiagram = within(overview).getByRole("img", { name: "Linux 音频架构示例框图" });
    expect(genericDiagram).toBeInTheDocument();
    expect(linuxDiagram).toBeInTheDocument();
    expect(within(genericDiagram).getByText("应用程序")).toBeInTheDocument();
    expect(within(genericDiagram).getByText("应用")).toBeInTheDocument();
    expect(within(genericDiagram).getByText("音频 API / 音频服务")).toBeInTheDocument();
    expect(within(genericDiagram).getAllByText("中间件").length).toBeGreaterThan(0);
    expect(within(genericDiagram).getByText("软件")).toBeInTheDocument();
    expect(within(genericDiagram).getByText("驱动")).toBeInTheDocument();
    expect(within(genericDiagram).getByText("硬件")).toBeInTheDocument();
    expect(within(linuxDiagram).getByText("PipeWire / PulseAudio / JACK")).toBeInTheDocument();
    expect(within(linuxDiagram).getByText("中间件")).toBeInTheDocument();
    expect(within(linuxDiagram).getByText("ALSA 用户态接口")).toBeInTheDocument();
    expect(within(linuxDiagram).getByText("Linux Kernel ALSA 驱动")).toBeInTheDocument();
    expect(within(linuxDiagram).getAllByText("驱动").length).toBeGreaterThan(1);
    expect(within(linuxDiagram).getByText("硬件")).toBeInTheDocument();
    expect(within(overview).queryByRole("img", { name: "播放和采集数据流方向图" })).not.toBeInTheDocument();
    expect(within(overview).getByRole("heading", { name: "桌面 Linux" })).toBeInTheDocument();
    expect(within(overview).getByRole("heading", { name: "嵌入式 Linux" })).toBeInTheDocument();
    expect(within(overview).getByText(/ASoC 描述主控、Codec、接口和功放之间的声卡关系/)).toBeInTheDocument();
  });

  it("expands audio codec knowledge with a dedicated compression lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /音频编解码/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/这里的 Codec 指压缩编解码算法/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "编码与解码" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "帧长与算法延迟" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "蓝牙 Codec" })).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开音频编解码实验室" })).toBeInTheDocument();

    await user.click(within(details).getByRole("button", { name: "打开音频编解码实验室" }));

    expect(screen.getByRole("heading", { name: "音频编解码实验室" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "返回知识库" })).toBeInTheDocument();
    const flowSection = screen.getByRole("region", { name: "音频编码和解码流程图" });
    expect(flowSection.querySelector(".audio-codec-flow-grid")).toHaveClass("stacked");
    const encodeFlow = within(flowSection).getByRole("img", { name: "音频编码流程图" });
    const decodeFlow = within(flowSection).getByRole("img", { name: "音频解码流程图" });
    expect(within(encodeFlow).getByText("PCM 输入")).toBeInTheDocument();
    expect(within(encodeFlow).getByText("分帧")).toBeInTheDocument();
    expect(within(encodeFlow).getByText("分析 / 建模")).toBeInTheDocument();
    expect(within(encodeFlow).getByText("量化 / 码率控制")).toBeInTheDocument();
    expect(within(encodeFlow).getByText("码流 / 封装")).toBeInTheDocument();
    expect(within(decodeFlow).getByText("码流 / 文件 / 网络包")).toBeInTheDocument();
    expect(within(decodeFlow).getByText("解包 / 纠错")).toBeInTheDocument();
    expect(within(decodeFlow).getByText("反量化 / 合成")).toBeInTheDocument();
    expect(within(decodeFlow).getByText("PCM 输出")).toBeInTheDocument();
    expect(within(decodeFlow).getByText("播放 / 后处理")).toBeInTheDocument();
    const scenarioSection = screen.getByRole("region", { name: "音频编解码应用场景" });
    expect(flowSection.compareDocumentPosition(scenarioSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("heading", { name: "格式对比" })).toBeInTheDocument();
    expect(screen.getAllByText("FLAC").length).toBeGreaterThan(0);
    expect(screen.getByText("LDAC")).toBeInTheDocument();
    expect(screen.getByText("LC3")).toBeInTheDocument();
    expect(screen.getByText(/通俗理解：像把原始录音直接逐点记下来/)).toBeInTheDocument();
    expect(screen.getByText(/16 kHz 采样率的 PCM 最高只到 8 kHz/)).toBeInTheDocument();
    expect(screen.getByText(/MP3 不会固定砍掉某个频率/)).toBeInTheDocument();
    expect(screen.getByText(/例子：FLAC 像把重复规律写成公式/)).toBeInTheDocument();
    expect(screen.getByText(/例子：Opus 在网络变差时可以降低码率/)).toBeInTheDocument();
    expect(screen.getByText(/例子：LDAC 990 kbps 更像走更宽的无线通道/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "编码压缩率对比" })).toBeInTheDocument();
    expect(screen.getByText("PCM / WAV")).toBeInTheDocument();
    expect(screen.getByText("约 1:1")).toBeInTheDocument();
    expect(screen.getByText("MP3 / AAC")).toBeInTheDocument();
    expect(screen.getByText("约 6:1 到 16:1")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "采样率音质差异对比" })).toBeInTheDocument();
    expect(screen.getByText("8 kHz")).toBeInTheDocument();
    expect(screen.getByText("最高约 4 kHz")).toBeInTheDocument();
    expect(screen.getByText("48 kHz")).toBeInTheDocument();
    expect(screen.getByText("最高约 24 kHz")).toBeInTheDocument();
    expect(screen.getByText("音乐存储")).toBeInTheDocument();
    expect(screen.getByText("蓝牙耳机")).toBeInTheDocument();
    expect(screen.getByText("低延迟互动")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "语音通话" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "语音通话" }));

    expect(screen.getByText("语音通话：清晰度、抗丢包和低码率更关键。")).toBeInTheDocument();
    expect(screen.getByText("推荐：Opus / AMR / LC3")).toBeInTheDocument();
  });

  it("switches system audio architecture lab flows", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /系统音频架构/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开系统音频架构实验室"
      })
    );

    expect(screen.getByRole("button", { name: "播放链路" })).toHaveAttribute("aria-pressed", "true");
    let flowChart = screen.getByRole("img", { name: "播放链路流程图" });
    expect(flowChart).toHaveAttribute("viewBox", "0 0 1240 680");
    const playbackNodes = flowChart.querySelectorAll(".system-audio-node");
    expect(playbackNodes[0]).toHaveAttribute("width", "252");
    expect(playbackNodes[0]).toHaveAttribute("height", "152");
    expect(new Set(Array.from(playbackNodes).map((node) => node.getAttribute("y"))).size).toBeGreaterThan(1);
    expect(within(flowChart).getByText("App 播放请求")).toBeInTheDocument();
    expect(within(flowChart).getByText("混音 / 重采样")).toBeInTheDocument();
    expect(screen.getAllByText("播放链路重点：系统把应用输出映射到当前可用的输出设备。").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "录音链路" }));
    flowChart = screen.getByRole("img", { name: "录音链路流程图" });
    const captureNodes = flowChart.querySelectorAll(".system-audio-node");
    expect(captureNodes[0]).toHaveAttribute("width", "252");
    expect(captureNodes[0]).toHaveAttribute("height", "152");
    expect(new Set(Array.from(captureNodes).map((node) => node.getAttribute("y"))).size).toBeGreaterThan(1);
    expect(within(flowChart).getByText("麦克风 / ADC")).toBeInTheDocument();
    expect(within(flowChart).getByText("权限 / 隐私指示")).toBeInTheDocument();
    expect(screen.getAllByText("录音链路重点：系统在应用拿到数据前完成权限、输入选择和格式交付。").length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "全双工语音" }));
    flowChart = screen.getByRole("img", { name: "全双工语音流程图" });
    const duplexNodes = flowChart.querySelectorAll(".system-audio-node");
    expect(duplexNodes[0]).toHaveAttribute("width", "252");
    expect(duplexNodes[0]).toHaveAttribute("height", "152");
    expect(within(flowChart).getByText("采集流")).toBeInTheDocument();
    expect(within(flowChart).getByText("AEC / NS / AGC")).toBeInTheDocument();
    expect(within(flowChart).getByText("回放参考")).toBeInTheDocument();
    expect(screen.getAllByText("全双工重点：系统只说明回放参考和采集流怎样接入语音链路。").length).toBeGreaterThan(0);
  });

  it("opens the amplifier speaker lab from the hardware topic", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /功放与扬声器/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开功放与扬声器实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "功放与扬声器实验室" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "返回知识库" })).toBeInTheDocument();
    const signalChain = screen.getByRole("region", { name: "功放与扬声器信号链" });
    expect(signalChain).toBeInTheDocument();
    expect(within(signalChain).getByText("DAC / Codec 输出")).toBeInTheDocument();
    expect(within(signalChain).getByText("功放")).toBeInTheDocument();
    expect(within(signalChain).getByText("分频 / 保护")).toBeInTheDocument();
    expect(within(signalChain).getByText("扬声器单元")).toBeInTheDocument();
    expect(within(signalChain).getByText("空气声波")).toBeInTheDocument();
  });

  it("switches amplifier speaker lab diagram modes and amplifier classes", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /功放与扬声器/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开功放与扬声器实验室"
      })
    );

    expect(screen.getByRole("button", { name: "功放类型" })).toHaveAttribute("aria-pressed", "true");
    const classDChart = screen.getByRole("img", { name: "Class D 功放图解" });
    expect(classDChart).toBeInTheDocument();
    expect(within(classDChart).getByText("从左到右：输入小信号 → 功放工作方式 → 功率输出 → 扬声器负载")).toBeInTheDocument();
    expect(within(classDChart).getByText("同一条中线表示同一个时间基准，方便比较波形如何变化")).toBeInTheDocument();
    expect(within(classDChart).getByText("输入小信号")).toBeInTheDocument();
    expect(within(classDChart).getByText("功放工作方式")).toBeInTheDocument();
    expect(within(classDChart).getByText("功率输出")).toBeInTheDocument();
    expect(within(classDChart).getByText("扬声器负载")).toBeInTheDocument();
    expect(within(classDChart).getByText("PWM 开关输出")).toBeInTheDocument();
    expect(within(classDChart).getByText("滤波后推动扬声器")).toBeInTheDocument();
    let ampPrinciple = screen.getByRole("region", { name: "Class D 基本原理" });
    expect(within(ampPrinciple).getByRole("heading", { name: "Class D 基本原理" })).toBeInTheDocument();
    expect(within(ampPrinciple).getByText(/音频信号先变成 PWM 或类似的高速开关脉冲/)).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("优势：效率高、发热低，适合电池供电和小体积设备。")).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("注意：需要输出滤波，并关注 EMI、电源和 PCB 布局。")).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("常见：蓝牙音箱、手机、电视、便携设备和高效率大功率功放。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Class A" }));
    const classAChart = screen.getByRole("img", { name: "Class A 功放图解" });
    expect(classAChart).toBeInTheDocument();
    expect(within(classAChart).getByText("线性连续输出")).toBeInTheDocument();
    expect(screen.getByText("Class A：器件几乎一直导通，线性好但效率低")).toBeInTheDocument();
    ampPrinciple = screen.getByRole("region", { name: "Class A 基本原理" });
    expect(within(ampPrinciple).getByText(/输出器件始终处在导通区/)).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("优势：线性好，交越失真少，声音细节容易保持。")).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("注意：静态电流大，效率低，发热明显。")).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("常见：小功率高保真、耳放、前级或偏重音质的线性电路。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Class AB" }));
    const classAbChart = screen.getByRole("img", { name: "Class AB 功放图解" });
    expect(classAbChart).toBeInTheDocument();
    expect(within(classAbChart).getByText("正负半周交替输出")).toBeInTheDocument();
    expect(screen.getByText("Class AB：正负半周分担输出，效率和失真折中")).toBeInTheDocument();
    ampPrinciple = screen.getByRole("region", { name: "Class AB 基本原理" });
    expect(within(ampPrinciple).getByText(/正半周和负半周主要由上下两组输出器件分担/)).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("优势：比 Class A 效率高，又比纯 B 类更容易控制交越失真。")).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("注意：偏置设置不好会有交越失真，仍有一定发热。")).toBeInTheDocument();
    expect(within(ampPrinciple).getByText("常见：传统音箱功放、车载功放和较多线性功放。")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "扬声器单元" }));
    const speakerChart = screen.getByRole("img", { name: "动圈扬声器结构图" });
    expect(speakerChart).toBeInTheDocument();
    expect(within(speakerChart).getByText("从左到右：电流输入 → 音圈受力 → 振膜运动 → 空气声波")).toBeInTheDocument();
    expect(within(speakerChart).getByText("这张图看的是电能如何变成机械运动和声波")).toBeInTheDocument();
    expect(within(speakerChart).getByText("电流输入")).toBeInTheDocument();
    expect(within(speakerChart).getByText("音圈受力")).toBeInTheDocument();
    expect(within(speakerChart).getByText("振膜运动")).toBeInTheDocument();
    expect(within(speakerChart).getByText("空气声波")).toBeInTheDocument();
    expect(Number(within(speakerChart).getByText("电流在磁场中产生推/拉力").getAttribute("y"))).toBeGreaterThan(320);
    expect(Number(within(speakerChart).getByText("振膜前后运动，压缩/稀疏空气").getAttribute("y"))).toBeGreaterThan(344);

    await user.click(screen.getByRole("button", { name: "箱体与分频" }));
    const enclosureChart = screen.getByRole("img", { name: "箱体与分频图解" });
    expect(enclosureChart).toBeInTheDocument();
    expect(within(enclosureChart).getByText("从左到右：全频信号 → 分频器 → 低音/高音单元 → 箱体声学")).toBeInTheDocument();
    expect(within(enclosureChart).getByText("分频器决定谁负责低频、谁负责高频")).toBeInTheDocument();
    expect(within(enclosureChart).getByText("全频信号")).toBeInTheDocument();
    expect(within(enclosureChart).getByText("分频器")).toBeInTheDocument();
    expect(within(enclosureChart).getByText("低频通路")).toBeInTheDocument();
    expect(within(enclosureChart).getByText("高频通路")).toBeInTheDocument();
    expect(within(enclosureChart).getByText("箱体低频响应")).toBeInTheDocument();
    expect(Number(within(enclosureChart).getByText("箱体低频响应").getAttribute("x"))).toBeLessThan(646);
    expect(Number(within(enclosureChart).getByText("密闭 / 倒相会影响低频").getAttribute("y"))).toBeGreaterThan(346);
    expect(Number(within(enclosureChart).getByText("腔体容积会改变共振").getAttribute("y"))).toBeGreaterThan(
      Number(within(enclosureChart).getByText("密闭 / 倒相会影响低频").getAttribute("y")) + 16
    );

    await user.click(screen.getByRole("button", { name: "T/S 参数" }));
    const tsChart = screen.getByRole("img", { name: "Thiele-Small 参数与箱体关系图" });
    expect(tsChart).toBeInTheDocument();
    expect(within(tsChart).getByText("Fs")).toBeInTheDocument();
    expect(within(tsChart).getByText("Qts")).toBeInTheDocument();
    expect(within(tsChart).getByText("Vas")).toBeInTheDocument();
    expect(within(tsChart).getByText("箱体计算")).toBeInTheDocument();
    expect(within(tsChart).getByText("密闭箱")).toBeInTheDocument();
    expect(within(tsChart).getByText("倒相箱")).toBeInTheDocument();
    expect(screen.getByText(/Qts 较低的单元更常用于倒相箱/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "分频阶数" }));
    const crossoverChart = screen.getByRole("img", { name: "分频阶数与相位对齐图" });
    expect(crossoverChart).toBeInTheDocument();
    expect(within(crossoverChart).getByText("一阶")).toBeInTheDocument();
    expect(within(crossoverChart).getByText("6 dB/oct")).toBeInTheDocument();
    expect(within(crossoverChart).getByText("二阶")).toBeInTheDocument();
    expect(within(crossoverChart).getByText("12 dB/oct")).toBeInTheDocument();
    expect(within(crossoverChart).getByText("四阶")).toBeInTheDocument();
    expect(within(crossoverChart).getByText("24 dB/oct")).toBeInTheDocument();
    expect(within(crossoverChart).getByText("相位对齐")).toBeInTheDocument();
    expect(screen.getByText(/分频不是简单切一刀/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "主动 / 被动分频" }));
    const activePassiveChart = screen.getByRole("img", { name: "主动分频与被动分频对比图" });
    expect(activePassiveChart).toBeInTheDocument();
    expect(within(activePassiveChart).getByText("主动分频：先分频，再分别功放")).toBeInTheDocument();
    expect(within(activePassiveChart).getByText("被动分频：先功放，再用 L/C/R 分给单元")).toBeInTheDocument();
    expect(within(activePassiveChart).getByText("优点：延迟/EQ/限幅/保护精确")).toBeInTheDocument();
    expect(within(activePassiveChart).getByText("优点：结构简单，一路功放即可")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "线阵列" }));
    const lineArrayChart = screen.getByRole("img", { name: "线阵列扬声器覆盖控制图" });
    expect(lineArrayChart).toBeInTheDocument();
    expect(within(lineArrayChart).getByText("线阵列通过多个单元的叠加控制垂直覆盖")).toBeInTheDocument();
    expect(within(lineArrayChart).getByText("目标覆盖区")).toBeInTheDocument();
    expect(within(lineArrayChart).getByText("减少垂直扩散")).toBeInTheDocument();
    expect(within(lineArrayChart).getByText("延迟 / 电平 / 角度")).toBeInTheDocument();
    expect(screen.getByText(/线阵列常用于大型扩声/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "匹配关系" }));
    const matchingChart = screen.getByRole("img", { name: "功放扬声器匹配图" });
    expect(matchingChart).toBeInTheDocument();
    expect(within(matchingChart).getByText("不是信号流，而是三个参数共同决定结果")).toBeInTheDocument();
    expect(within(matchingChart).getByText("功率")).toBeInTheDocument();
    expect(within(matchingChart).getByText("阻抗")).toBeInTheDocument();
    expect(within(matchingChart).getByText("灵敏度")).toBeInTheDocument();
    expect(within(matchingChart).getByText("功率").getAttribute("x")).toBe(
      within(matchingChart).getByText("阻抗").getAttribute("x")
    );
    expect(within(matchingChart).getByText("功率").getAttribute("x")).toBe(
      within(matchingChart).getByText("灵敏度").getAttribute("x")
    );
    expect(within(matchingChart).getByText("实际声压")).toBeInTheDocument();
    expect(within(matchingChart).getByText("失真 / 保护风险")).toBeInTheDocument();
    expect(Number(within(matchingChart).getByText("失真 / 保护风险").getAttribute("y"))).toBeLessThan(244);
    expect(Number(within(matchingChart).getByText("功率过小会削波，阻抗过低会过流").getAttribute("y"))).toBeLessThan(286);
    expect(Number(within(matchingChart).getByText("目标：够响、不破音、不过热").getAttribute("y"))).toBeGreaterThan(348);
  });

  it("does not render audible amplifier speaker effect demos", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /功放与扬声器/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开功放与扬声器实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "功放与扬声器实验室" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Class D 功放图解" })).toBeInTheDocument();
    expect(screen.queryByRole("complementary", { name: "功放扬声器音效演示" })).not.toBeInTheDocument();
    expect(screen.queryByText("可听音效演示")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "播放音效" })).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "效果强度" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "削波失真" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "查看削波失真说明" })).not.toBeInTheDocument();
  });

  it("places digital audio interfaces as a separate hardware topic", async () => {
    const user = userEvent.setup();
    render(<App />);

    const categoriesRegion = screen.getByRole("region", { name: "知识分类" });
    await user.click(within(categoriesRegion).getByRole("button", { name: /音频硬件/ }));

    const topicGrid = screen.getByTestId("topic-grid");
    expect(within(topicGrid).getByText("数字音频接口 / 传输协议")).toBeInTheDocument();
    expect(within(topicGrid).getByText(/I2S \/ IIS \/ I²S、TDM、PDM、SPDIF、USB Audio/)).toBeInTheDocument();

    await user.click(within(topicGrid).getByRole("button", { name: /数字音频接口 \/ 传输协议/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/接口协议关注的是芯片和设备之间如何搬运音频样本/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "I2S / IIS / I²S" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "TDM" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "PDM" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "SPDIF" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "USB Audio" })).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开数字音频接口实验室" })).toBeInTheDocument();
  });

  it("lets readers compare digital audio interfaces and timing relationships", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /数字音频接口 \/ 传输协议/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开数字音频接口实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "数字音频接口实验室" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "接口速览" })).toBeInTheDocument();
    expect(screen.getByText("I2S / IIS / I²S：常见 3-4 根信号线")).toBeInTheDocument();
    expect(screen.getByText("BCLK 位时钟、LRCLK 左右声道时钟、SD 数据线、可选 MCLK 主时钟")).toBeInTheDocument();
    expect(screen.getByText("TDM：常见 3-4 根信号线")).toBeInTheDocument();
    expect(screen.getByText("PDM：常见 2-3 根信号线")).toBeInTheDocument();
    expect(screen.getByText("SPDIF：常见 1 根同轴或 1 路光纤")).toBeInTheDocument();
    expect(screen.getByText("USB Audio：常见 USB D+ / D- 差分线加电源地")).toBeInTheDocument();
    const i2sChart = screen.getByRole("img", { name: "I2S 时序图" });
    expect(i2sChart).toBeInTheDocument();
    expect(within(i2sChart).getByText("L: bit23 → bit0")).toBeInTheDocument();
    expect(within(i2sChart).getByText("R: bit23 → bit0")).toBeInTheDocument();
    expect(within(i2sChart).getAllByText("b22")).toHaveLength(2);
    expect(within(i2sChart).getAllByText("b21")).toHaveLength(2);
    expect(screen.getByText("协议：I2S / IIS / I²S")).toBeInTheDocument();
    expect(screen.getByText("BCLK = 48 kHz × 1000 × 24 bit × 2 ch ÷ 1,000,000 = 2.304 MHz")).toBeInTheDocument();
    expect(screen.getByText("BCLK：48,000 Hz × 24 bit × 2 ch = 2.304 MHz")).toBeInTheDocument();
    expect(screen.getByText("MCLK 常见 256fs：48 kHz × 1000 × 256 ÷ 1,000,000 = 12.288 MHz")).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "采样率" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "位深" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "通道数" })).toBeInTheDocument();

    fireEvent.change(screen.getByRole("slider", { name: "位深" }), {
      target: { value: "16" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "通道数" }), {
      target: { value: "8" }
    });
    expect(screen.getByText("BCLK = 48 kHz × 1000 × 16 bit × 8 ch ÷ 1,000,000 = 6.144 MHz")).toBeInTheDocument();
    expect(screen.getByText("BCLK：48,000 Hz × 16 bit × 8 ch = 6.144 MHz")).toBeInTheDocument();
    const multichannelI2sChart = screen.getByRole("img", { name: "I2S 时序图" });
    expect(within(multichannelI2sChart).getByText("SD0")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("SD1")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("SD2")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("SD3")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("SD0: CH1 / CH2")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("SD3: CH7 / CH8")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("左半帧同时采集 CH1 / CH3 / CH5 / CH7")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("右半帧同时采集 CH2 / CH4 / CH6 / CH8")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("每条 SD 仍只传一对 L / R；LRCLK 只负责左右半帧")).toBeInTheDocument();
    expect(within(multichannelI2sChart).getByText("如果只用一条 SD 放多声道，那是 TDM 的 slot 思路")).toBeInTheDocument();
    expect(
      Math.abs(
        Number(within(multichannelI2sChart).getByText("SD 数据线").getAttribute("y")) -
          Number(within(multichannelI2sChart).getByText("SD0").getAttribute("y"))
      )
    ).toBeGreaterThan(24);
    expect(
      Number(within(multichannelI2sChart).getByText(/多通道 I2S/).getAttribute("y"))
    ).toBeGreaterThan(Number(within(multichannelI2sChart).getByText("SD3").getAttribute("y")) + 42);
    expect(Number(within(multichannelI2sChart).getByText("MCLK").getAttribute("y"))).toBeGreaterThan(
      Number(within(multichannelI2sChart).getByText("如果只用一条 SD 放多声道，那是 TDM 的 slot 思路").getAttribute("y")) + 32
    );

    await user.click(screen.getByRole("button", { name: "TDM" }));
    expect(screen.getByRole("img", { name: "TDM 时隙图" })).toBeInTheDocument();
    expect(screen.getByText("协议：TDM 多通道时分复用")).toBeInTheDocument();
    expect(screen.getByText("8 个 slot 共用一条 SD 数据线")).toBeInTheDocument();
    expect(screen.getByText("FS 帧同步：新一帧从这里开始")).toBeInTheDocument();
    expect(screen.getByText("一帧 = 8 个 slot")).toBeInTheDocument();
    expect(screen.getByText("每个 slot 内仍按 MSB → LSB 传一个采样字")).toBeInTheDocument();
    expect(screen.getByText("SD 串行数据拆回多声道")).toBeInTheDocument();
    expect(screen.getByText("slot 宽度可以大于有效位深，多余 bit 通常补 0")).toBeInTheDocument();
    expect(screen.getByText("slot 顺序两端必须一致，否则 CH1/CH2 会错位")).toBeInTheDocument();
    expect(screen.getByText(/Slot 1/)).toBeInTheDocument();
    expect(screen.getByText(/Slot 8/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "PDM" }));
    expect(screen.getByRole("img", { name: "PDM 到 PCM 转换图" })).toBeInTheDocument();
    expect(screen.getByText("协议：PDM 数字麦克风")).toBeInTheDocument();
    expect(screen.getByText("模拟声音电压")).toBeInTheDocument();
    expect(screen.getByText("Σ-Δ 调制器")).toBeInTheDocument();
    expect(screen.getByText("脉冲密度表示幅度")).toBeInTheDocument();
    expect(screen.getByText("1 更密 = 幅度更高")).toBeInTheDocument();
    expect(screen.getByText("1-bit 高速脉冲密度流")).toBeInTheDocument();
    expect(screen.getByText("低通滤波 + 抽取降采样")).toBeInTheDocument();
    expect(screen.getByText("PDM 高速 1-bit 流 → PCM 多 bit 采样值")).toBeInTheDocument();
    expect(screen.getByText("抽取滤波后变成 PCM")).toBeInTheDocument();
    expect(screen.getByText("PDM 时钟 ≈ 目标采样率 × 抽取倍数")).toBeInTheDocument();
    expect(screen.getByText("48 kHz PCM 常见：3.072 MHz PDM = 48 kHz × 64")).toBeInTheDocument();
    expect(screen.getByText("PDM 时钟由麦克风/Codec/外设时钟提供，不等于 CPU 主频")).toBeInTheDocument();
    const pdmChart = screen.getByRole("img", { name: "PDM 到 PCM 转换图" });
    expect(
      Number(within(pdmChart).getByText("抽取滤波后变成 PCM").getAttribute("y"))
    ).toBeGreaterThan(Number(within(pdmChart).getByText("PDM 高速 1-bit 流 → PCM 多 bit 采样值").getAttribute("y")) + 16);
    expect(screen.queryByRole("slider", { name: "采样率" })).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "位深" })).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "通道数" })).not.toBeInTheDocument();
    expect(screen.queryByText(/BCLK =/)).not.toBeInTheDocument();
    expect(screen.queryByText(/BCLK 6\.144 MHz/)).not.toBeInTheDocument();
    expect(screen.queryByText(/MCLK 常见/)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "SPDIF" }));
    expect(screen.getByRole("img", { name: "SPDIF 设备链路图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "SPDIF 同轴光纤线示例图" })).toHaveAttribute(
      "href",
      "/audio-technology-sharing/images/spdif-line.png"
    );
    expect(screen.getByText("SPDIF 线缆示例")).toBeInTheDocument();
    expect(screen.getByText("同轴或光纤用于设备之间传数字音频")).toBeInTheDocument();
    expect(screen.getByText("嵌入式时钟 + 双相标记编码")).toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "采样率" })).not.toBeInTheDocument();
    expect(screen.queryByText(/BCLK =/)).not.toBeInTheDocument();
    expect(screen.queryByText(/MCLK 常见/)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "USB Audio" }));
    expect(screen.getByRole("img", { name: "USB Audio 包传输图" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "USB 外置声卡示例图" })).toHaveAttribute(
      "href",
      "/audio-technology-sharing/images/usb-audio-card.png.png"
    );
    expect(screen.getByText("USB 外置声卡示例")).toBeInTheDocument();
    expect(screen.getByText("USB 连接主机，设备提供耳机、麦克风和耳麦一体接口")).toBeInTheDocument();
    expect(screen.getByText("音频样本被装入 USB 等时包")).toBeInTheDocument();
    expect(screen.getByText("主机 / 设备用缓冲和反馈端点校准速率")).toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "采样率" })).not.toBeInTheDocument();
    expect(screen.queryByText(/BCLK =/)).not.toBeInTheDocument();
    expect(screen.queryByText(/MCLK 常见/)).not.toBeInTheDocument();
  });

  it("lets readers explore ADC DAC Codec conversion and interface behavior", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /ADC \/ DAC \/ Codec/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开 ADC / DAC / Codec 实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "ADC / DAC / Codec 实验室" })).toBeInTheDocument();
    const conversionChart = screen.getByRole("img", { name: "ADC 采集图" });
    const modeConcepts = screen.getByRole("region", { name: "当前模式关键知识点" });
    expect(conversionChart).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "DAC 重建图" })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Codec 芯片链路图" })).not.toBeInTheDocument();
    expect(conversionChart.querySelector(".codec-diagram-chain")).not.toBeInTheDocument();
    expect(conversionChart.querySelector(".codec-analog-path")).toBeInTheDocument();
    expect(conversionChart.querySelector(".codec-quant-grid")).toBeInTheDocument();
    expect(conversionChart.querySelector(".codec-reconstruction-path")).not.toBeInTheDocument();
    expect(conversionChart.querySelector(".codec-playback-path")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("ADC 采集流程图")).not.toBeInTheDocument();
    expect(document.querySelector(".codec-chain")).not.toBeInTheDocument();
    expect(screen.getByText("ADC：模拟电压变成数字样本")).toBeInTheDocument();
    expect(within(modeConcepts).getByRole("heading", { name: "输入范围" })).toBeInTheDocument();
    expect(within(modeConcepts).getByRole("heading", { name: "PGA / 前级增益" })).toBeInTheDocument();
    expect(within(modeConcepts).queryByRole("heading", { name: "重建滤波" })).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("slider", { name: "输入电平" }), {
      target: { value: "120" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "采样点数" }), {
      target: { value: "40" }
    });
    const lowBitDepthGridCount = conversionChart.querySelectorAll(".codec-quant-grid").length;
    fireEvent.change(screen.getByRole("slider", { name: "位深" }), {
      target: { value: "7" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "时钟抖动" }), {
      target: { value: "32" }
    });

    expect(screen.getByRole("img", { name: "ADC 采集图" }).querySelectorAll(".codec-quant-grid").length).toBeGreaterThan(lowBitDepthGridCount);
    expect(screen.getByText("量化等级：128 级 · 采样点：40")).toBeInTheDocument();
    expect(screen.getByText("削波风险 36%")).toBeInTheDocument();
    expect(screen.getByText("抖动风险 27%")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "DAC 重建" }));
    expect(screen.getByText("DAC：数字样本重建成模拟输出")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "ADC 采集图" })).not.toBeInTheDocument();
    const dacChart = screen.getByRole("img", { name: "DAC 重建图" });
    expect(screen.queryByRole("img", { name: "Codec 芯片链路图" })).not.toBeInTheDocument();
    expect(dacChart.querySelector(".codec-analog-path")).not.toBeInTheDocument();
    expect(dacChart.querySelector(".codec-quant-grid")).not.toBeInTheDocument();
    expect(dacChart.querySelectorAll(".codec-sub-axis")).toHaveLength(2);
    expect(dacChart.querySelector(".codec-step-path")).toBeInTheDocument();
    expect(dacChart.querySelector(".codec-reconstruction-path")).toBeInTheDocument();
    expect(screen.queryByLabelText("DAC 重建流程图")).not.toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "输入电平" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "采样点数" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "位深" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "时钟抖动" })).toBeInTheDocument();
    expect(screen.getAllByText("重建滤波").length).toBeGreaterThan(0);
    expect(within(modeConcepts).getByRole("heading", { name: "重建滤波" })).toBeInTheDocument();
    expect(within(modeConcepts).getByRole("heading", { name: "输出驱动" })).toBeInTheDocument();
    expect(within(modeConcepts).queryByRole("heading", { name: "PGA / 前级增益" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Codec 芯片链路" }));
    expect(screen.getByText("Codec 芯片：采集、播放和路由集成")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "ADC 采集图" })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "DAC 重建图" })).not.toBeInTheDocument();
    const codecChart = screen.getByRole("img", { name: "Codec 芯片链路图" });
    expect(codecChart.querySelector(".codec-capture-path")).not.toBeInTheDocument();
    expect(codecChart.querySelector(".codec-playback-path")).not.toBeInTheDocument();
    expect(codecChart.querySelectorAll(".codec-block-node")).toHaveLength(10);
    expect(within(codecChart).getByText("ADC")).toBeInTheDocument();
    expect(within(codecChart).getByText("DAC")).toBeInTheDocument();
    expect(within(codecChart).getAllByText("I2S/TDM")).toHaveLength(2);
    expect(within(codecChart).getByText("寄存器控制")).toBeInTheDocument();
    expect(screen.queryByLabelText("Codec 芯片链路流程图")).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "输入电平" })).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "采样点数" })).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "位深" })).not.toBeInTheDocument();
    expect(screen.queryByRole("slider", { name: "时钟抖动" })).not.toBeInTheDocument();
    expect(within(modeConcepts).getByRole("heading", { name: "路由矩阵" })).toBeInTheDocument();
    expect(within(modeConcepts).getByRole("heading", { name: "寄存器配置" })).toBeInTheDocument();
    expect(within(modeConcepts).queryByRole("heading", { name: "输出驱动" })).not.toBeInTheDocument();
  });

  it("expands microphone knowledge with detailed hardware concepts and a lab entry", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^音频硬件 麦克风/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByText(/声波推动振膜振动/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "动圈麦克风" })).toBeInTheDocument();
    expect(within(details).getByText(/不需要幻象电源/)).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "电容麦克风" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "驻极体 \/ MEMS" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "最大 SPL" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "麦克风阵列" })).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开麦克风实验室" })).toBeInTheDocument();
  });

  it("lets readers explore microphone polar pattern, distance, gain, and pickup examples", async () => {
    type MockAudioParam = {
      cancelScheduledValues: ReturnType<typeof vi.fn>;
      linearRampToValueAtTime: ReturnType<typeof vi.fn>;
      setTargetAtTime: ReturnType<typeof vi.fn>;
      setValueAtTime: ReturnType<typeof vi.fn>;
    };
    type MockGainNode = {
      connect: ReturnType<typeof vi.fn>;
      gain: MockAudioParam;
    };
    type MockFilterNode = {
      connect: ReturnType<typeof vi.fn>;
      frequency: MockAudioParam;
      Q: MockAudioParam;
      type: BiquadFilterType;
    };
    const createAudioParam = (): MockAudioParam => ({
      cancelScheduledValues: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
      setTargetAtTime: vi.fn(),
      setValueAtTime: vi.fn()
    });
    const createdOscillators: Array<{
      connect: ReturnType<typeof vi.fn>;
      start: ReturnType<typeof vi.fn>;
      stop: ReturnType<typeof vi.fn>;
      frequency: { setValueAtTime: ReturnType<typeof vi.fn> };
      type: OscillatorType;
    }> = [];
    const createdGains: MockGainNode[] = [];
    const createdFilters: MockFilterNode[] = [];
    const bufferData = new Float32Array(4410);
    const audioContext = {
      currentTime: 0,
      destination: {},
      sampleRate: 44100,
      createOscillator: vi.fn(() => {
        const oscillator = {
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn(),
          frequency: { setValueAtTime: vi.fn() },
          type: "sine" as OscillatorType
        };
        createdOscillators.push(oscillator);
        return oscillator;
      }),
      createGain: vi.fn(() => {
        const gain = {
          connect: vi.fn(),
          gain: createAudioParam()
        };
        createdGains.push(gain);
        return gain;
      }),
      createBiquadFilter: vi.fn(() => {
        const filter = {
          connect: vi.fn(),
          frequency: createAudioParam(),
          Q: createAudioParam(),
          type: "bandpass" as BiquadFilterType
        };
        createdFilters.push(filter);
        return filter;
      }),
      createWaveShaper: vi.fn(() => ({
        connect: vi.fn(),
        curve: null as Float32Array | null,
        oversample: "none" as OverSampleType
      })),
      createBuffer: vi.fn(() => ({
        getChannelData: vi.fn(() => bufferData)
      })),
      createBufferSource: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        buffer: null as AudioBuffer | null,
        loop: false
      })),
      close: vi.fn()
    };
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: vi.fn(() => audioContext)
    });

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^音频硬件 麦克风/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开麦克风实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "麦克风指向性与拾音实验室" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "麦克风指向性极坐标图" })).toBeInTheDocument();
    expect(screen.getByText("指向性：心形")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "8 字形" }));
    fireEvent.change(screen.getByRole("slider", { name: "声源角度" }), {
      target: { value: "90" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "拾音距离" }), {
      target: { value: "2.5" }
    });
    fireEvent.change(screen.getByRole("slider", { name: "前级增益" }), {
      target: { value: "82" }
    });

    expect(screen.getByText("指向性：8 字形")).toBeInTheDocument();
    expect(screen.getByText("角度 90°")).toBeInTheDocument();
    expect(screen.getByText("距离 2.5 m")).toBeInTheDocument();
    expect(screen.getByText("前级增益 82%")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "削波失真" }));
    await user.click(screen.getByRole("button", { name: "播放拾音示例" }));

    expect(audioContext.createWaveShaper).toHaveBeenCalled();
    expect(createdOscillators[createdOscillators.length - 1]?.start).toHaveBeenCalledWith(0);
    const directGain = createdGains[0];
    const firstDirectPickup = directGain.gain.linearRampToValueAtTime.mock.calls.find(([, time]) => time === 0.04)?.[0];
    expect(firstDirectPickup).toBeLessThan(0.005);

    fireEvent.change(screen.getByRole("slider", { name: "声源角度" }), {
      target: { value: "0" }
    });

    const liveDirectValues = directGain.gain.setTargetAtTime.mock.calls.map(([value]) => Number(value));
    expect(Math.max(...liveDirectValues)).toBeGreaterThan(0.05);
    expect(createdFilters[0].frequency.setTargetAtTime).toHaveBeenCalledWith(expect.any(Number), 0, 0.025);
    expect(screen.getByText("播放中")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "环境底噪" }));
    await user.click(screen.getByRole("button", { name: "播放拾音示例" }));

    expect(audioContext.createBufferSource).toHaveBeenCalled();
    expect(bufferData.some((sample) => sample !== 0)).toBe(true);
  });

  it("visualizes analog, digital, vocal, and array microphone working principles", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /^音频硬件 麦克风/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开麦克风实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "麦克风工作原理" })).toBeInTheDocument();
    const electretDiagram = screen.getByRole("img", { name: "模拟驻极体咪头工作原理图" });
    expect(electretDiagram).toBeInTheDocument();
    expect(screen.getByText(/驻极体材料预先带电/)).toBeInTheDocument();
    expect(screen.getAllByText("输出：模拟电压").length).toBeGreaterThan(0);
    const numericFlow = screen.getByRole("region", { name: "麦克风数值链路" });
    expect(numericFlow.closest(".mic-principle-visual")).toBeTruthy();
    expect(electretDiagram.compareDocumentPosition(numericFlow) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(numericFlow).getByText("教学近似：-44 dBV/Pa，20 dB 前级，1 Vrms ADC 满量程")).toBeInTheDocument();
    expect(within(numericFlow).getByText("输入声压：94 dBSPL")).toBeInTheDocument();
    expect(within(numericFlow).getByText("声压：1.000 Pa")).toBeInTheDocument();
    expect(within(numericFlow).getByText("JFET 输出")).toBeInTheDocument();
    expect(within(numericFlow).getByText("6.31 mVrms")).toBeInTheDocument();
    expect(within(numericFlow).getByText("20 dB 前级后")).toBeInTheDocument();
    expect(within(numericFlow).getByText("63.10 mVrms")).toBeInTheDocument();
    expect(within(numericFlow).getByText("约 -24.0 dBFS")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("slider", { name: "工作原理输入声压" }), {
      target: { value: "114" }
    });

    expect(within(numericFlow).getByText("输入声压：114 dBSPL")).toBeInTheDocument();
    expect(within(numericFlow).getByText("声压：10.000 Pa")).toBeInTheDocument();
    expect(within(numericFlow).getByText("63.10 mVrms")).toBeInTheDocument();
    expect(within(numericFlow).getByText("631.00 mVrms")).toBeInTheDocument();
    expect(within(numericFlow).getByText("约 -4.0 dBFS")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "数字 MEMS 麦" }));
    expect(screen.getByRole("img", { name: "数字 MEMS 麦工作原理图" })).toBeInTheDocument();
    expect(screen.getByText(/Σ-Δ 调制输出 PDM/)).toBeInTheDocument();
    expect(screen.getAllByText("输出：PDM / I2S").length).toBeGreaterThan(0);
    expect(within(numericFlow).getByText(/数字 MEMS 约 -26 dBFS\/Pa/)).toBeInTheDocument();
    expect(within(numericFlow).getByText("PDM 1-bit 流")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "动圈话筒" }));
    expect(screen.getByRole("img", { name: "动圈话筒工作原理图" })).toBeInTheDocument();
    expect(screen.getByText(/线圈在磁场中随声音运动/)).toBeInTheDocument();
    expect(within(numericFlow).getByText(/动圈约 -54 dBV\/Pa/)).toBeInTheDocument();
    expect(within(numericFlow).getByText("音圈感应")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "多麦阵列" }));
    const arrayDiagram = screen.getByRole("img", { name: "多麦阵列工作原理图" });
    expect(arrayDiagram).toBeInTheDocument();
    expect(arrayDiagram.querySelectorAll(".mic-array-capsule")).toHaveLength(4);
    expect(arrayDiagram.querySelectorAll("path.mic-signal-line[d*='404']")).toHaveLength(4);
    expect(screen.getByText(/延时对齐并加权求和/)).toBeInTheDocument();
    expect(screen.getAllByText("输出：增强后的目标声").length).toBeGreaterThan(0);
    expect(within(numericFlow).getByText(/4 Mic 目标方向延时对齐后/)).toBeInTheDocument();
    expect(within(numericFlow).getByText("延时对齐求和")).toBeInTheDocument();
  });

  it("expands listening perception with metrics and an audio effects lab", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /听感与指标/ }));

    const details = screen.getByRole("dialog", { name: "主题详情" });
    expect(within(details).getByRole("heading", { name: "响度" })).toBeInTheDocument();
    expect(within(details).getAllByText(/LUFS 更适合描述节目整体响度/).length).toBeGreaterThan(0);
    expect(within(details).getByRole("heading", { name: "频响曲线" })).toBeInTheDocument();
    expect(within(details).getByRole("heading", { name: "THD / THD+N" })).toBeInTheDocument();
    expect(within(details).getByRole("button", { name: "打开听感与指标实验室" })).toBeInTheDocument();
  });

  it("lets readers compare listening effects with generated audio examples", async () => {
    const oscillator = {
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: { setValueAtTime: vi.fn() },
      type: "sine"
    };
    const gain = {
      connect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn()
      }
    };
    const biquadFilter = {
      connect: vi.fn(),
      frequency: { setValueAtTime: vi.fn() },
      gain: { setValueAtTime: vi.fn() },
      Q: { setValueAtTime: vi.fn() },
      type: "peaking"
    };
    const stereoPanner = {
      connect: vi.fn(),
      pan: { setValueAtTime: vi.fn() }
    };
    const audioContext = {
      currentTime: 0,
      destination: {},
      createOscillator: vi.fn(() => oscillator),
      createGain: vi.fn(() => gain),
      createBiquadFilter: vi.fn(() => biquadFilter),
      createStereoPanner: vi.fn(() => stereoPanner),
      close: vi.fn()
    };
    const AudioContextMock = vi.fn(() => audioContext);
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: AudioContextMock
    });

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /听感与指标/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开听感与指标实验室"
      })
    );

    expect(screen.getByRole("heading", { name: "听感与指标实验室" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "听感与指标效果图" })).toBeInTheDocument();
    expect(screen.getByText("指标：频响曲线")).toBeInTheDocument();
    expect(screen.getByText(/明亮：提升高频能量/)).toBeInTheDocument();
    expect(screen.getByTestId("listening-metric-response")).toBeInTheDocument();
    expect(screen.getByTestId("listening-clean-wave")).toHaveClass("listening-clean-wave");
    expect(screen.getByTestId("listening-processed-wave")).toHaveClass("listening-processed-wave");
    expect(screen.getByTestId("listening-frequency-x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("listening-level-y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("listening-clean-time-axis")).toBeInTheDocument();
    expect(screen.getByTestId("listening-clean-amplitude-axis")).toBeInTheDocument();
    expect(screen.getByTestId("listening-processed-time-axis")).toBeInTheDocument();
    expect(screen.getByTestId("listening-processed-amplitude-axis")).toBeInTheDocument();
    expect(screen.getByText("横轴：频率")).toBeInTheDocument();
    expect(screen.getByText("纵轴：增益 dB")).toBeInTheDocument();
    expect(screen.getAllByText("横轴：时间")).toHaveLength(2);
    expect(screen.getAllByText("纵轴：幅度")).toHaveLength(2);
    expect(screen.getByText("低频")).toBeInTheDocument();
    expect(screen.getByText("中频")).toBeInTheDocument();
    expect(screen.getByText("高频")).toBeInTheDocument();
    expect(screen.getByText("+12 dB")).toBeInTheDocument();
    expect(screen.getByText("0 dB")).toBeInTheDocument();
    expect(screen.getByText("-12 dB")).toBeInTheDocument();
    expect(screen.getByText("高频提升区")).toBeInTheDocument();
    expect(screen.getByTestId("listening-tone-emphasis-band")).toHaveClass("listening-tone-emphasis-band");
    const brightMetricPath = screen.getByTestId("listening-metric-response").getAttribute("d");
    const brightProcessedWave = screen.getByTestId("listening-processed-wave").getAttribute("d");

    await user.click(screen.getByRole("button", { name: "浑浊低中频" }));
    expect(screen.getByTestId("listening-metric-response")).toBeInTheDocument();
    expect(screen.getByTestId("listening-clean-wave")).toBeInTheDocument();
    expect(screen.getByText("低中频堆积区")).toBeInTheDocument();
    expect(screen.getByTestId("listening-metric-response").getAttribute("d")).not.toEqual(brightMetricPath);
    expect(screen.getByTestId("listening-processed-wave").getAttribute("d")).not.toEqual(brightProcessedWave);

    await user.click(screen.getByRole("button", { name: "明亮高频" }));

    await user.click(screen.getByRole("button", { name: "播放对照音效" }));

    expect(AudioContextMock).toHaveBeenCalled();
    expect(screen.getByText("播放中")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "噪声底噪" }));
    expect(screen.getByText("指标：SNR")).toBeInTheDocument();
    expect(screen.getByText(/底噪：在信号下方加入持续噪声/)).toBeInTheDocument();
    expect(screen.getByTestId("listening-noise-band")).toHaveClass("listening-noise-band");
    expect(screen.getByTestId("listening-noise-signal")).toHaveClass("listening-metric-path");
    expect(screen.getByTestId("listening-noisy-signal")).toHaveClass("listening-noisy-signal");
    expect(screen.getByRole("img", { name: "SNR 良好与较差波形对比图" })).toBeInTheDocument();
    expect(screen.getByTestId("snr-good-wave")).toHaveClass("listening-snr-good-wave");
    expect(screen.getByTestId("snr-poor-wave")).toHaveClass("listening-snr-poor-wave");
    expect(screen.getByText("SNR 良好：信号明显高于噪声底")).toBeInTheDocument();
    expect(screen.getByText("SNR 较差：噪声底接近有效信号")).toBeInTheDocument();
    expect(Number(screen.getByTestId("listening-noise-floor-label").getAttribute("y"))).toBeGreaterThan(
      Number(screen.getByTestId("listening-axis-guide-label").getAttribute("y")) + 20
    );
    const noiseBandBefore = screen.getByTestId("listening-noise-band").getAttribute("d");
    const noiseSignalBefore = screen.getByTestId("listening-noise-signal").getAttribute("d");
    const noisySignalBefore = screen.getByTestId("listening-noisy-signal").getAttribute("d");

    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "75" }
    });

    expect(screen.getByText("效果强度：75%")).toBeInTheDocument();
    expect(screen.getByTestId("listening-noise-band").getAttribute("d")).not.toEqual(noiseBandBefore);
    expect(screen.getByTestId("listening-noise-signal").getAttribute("d")).toEqual(noiseSignalBefore);
    expect(screen.getByTestId("listening-noisy-signal").getAttribute("d")).not.toEqual(noisySignalBefore);

    await user.click(screen.getByRole("button", { name: "谐波失真" }));
    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "45" }
    });
    expect(screen.getByText("纯净基波输入")).toBeInTheDocument();
    expect(screen.getByText("基波 + 谐波叠加输出")).toBeInTheDocument();
    expect(screen.getByTestId("listening-clean-wave")).toHaveClass("listening-clean-wave");
    expect(screen.getByTestId("listening-harmonic-sum")).toHaveClass("listening-processed-wave");
    expect(screen.getByTestId("listening-harmonic-2")).toHaveClass("listening-harmonic-component");
    expect(screen.getByTestId("listening-harmonic-3")).toHaveClass("listening-harmonic-component");
    expect(screen.getByTestId("listening-harmonic-5")).toHaveClass("listening-harmonic-component");
    expect(screen.queryByTestId("listening-harmonic-7")).not.toBeInTheDocument();
    const harmonicSumBefore = screen.getByTestId("listening-harmonic-sum").getAttribute("d");

    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "95" }
    });
    expect(screen.getByText("1f + 2f + 3f + 5f + 7f")).toBeInTheDocument();
    expect(screen.getByTestId("listening-harmonic-7")).toHaveClass("listening-harmonic-component");
    expect(screen.getByTestId("listening-harmonic-sum").getAttribute("d")).not.toEqual(harmonicSumBefore);

    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "55" }
    });

    await user.click(screen.getByRole("button", { name: "动态压缩" }));
    expect(screen.getByText("Input waveform")).toBeInTheDocument();
    expect(screen.getByText("Compressed waveform")).toBeInTheDocument();
    expect(screen.getByText("Threshold")).toBeInTheDocument();
    expect(screen.getByText("Gain reduction")).toBeInTheDocument();
    expect(screen.getByTestId("listening-compression-threshold-positive")).toBeInTheDocument();
    expect(screen.getByTestId("listening-compression-threshold-negative")).toBeInTheDocument();
    const compressedEnvelopeBefore = screen.getByTestId("listening-compressed-envelope").getAttribute("d");
    const inputWaveformBefore = screen.getByTestId("listening-input-envelope").getAttribute("d");
    const thresholdBefore = screen.getByTestId("listening-compression-threshold-positive").getAttribute("y1");
    expect(screen.getByTestId("listening-input-envelope")).toBeInTheDocument();
    expect(screen.getByTestId("listening-compressed-envelope")).toBeInTheDocument();
    expect(screen.getByTestId("listening-input-envelope")).toHaveClass("listening-envelope-input");
    expect(screen.getByTestId("listening-compressed-envelope")).toHaveClass("listening-envelope-output");
    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "95" }
    });
    expect(screen.getByTestId("listening-input-envelope").getAttribute("d")).toEqual(inputWaveformBefore);
    expect(screen.getByTestId("listening-compressed-envelope").getAttribute("d")).not.toEqual(compressedEnvelopeBefore);
    expect(screen.getByTestId("listening-compression-threshold-positive").getAttribute("y1")).not.toEqual(thresholdBefore);

    await user.click(screen.getByRole("button", { name: "声像偏移" }));
    expect(screen.getByTestId("listening-stereo-left")).toHaveClass("listening-stereo-left");
    expect(screen.getByTestId("listening-stereo-right")).toHaveClass("listening-stereo-right");
    expect(screen.getByTestId("listening-stereo-pan-label")).toHaveAttribute("y", "284");
    const leftChannelBefore = screen.getByTestId("listening-stereo-left").getAttribute("d");
    const rightChannelBefore = screen.getByTestId("listening-stereo-right").getAttribute("d");
    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "20" }
    });
    expect(screen.getByTestId("listening-stereo-left").getAttribute("d")).not.toEqual(leftChannelBefore);
    expect(screen.getByTestId("listening-stereo-right").getAttribute("d")).not.toEqual(rightChannelBefore);
    expect(screen.getByTestId("listening-stereo-left").getAttribute("d")).not.toEqual(
      screen.getByTestId("listening-stereo-right").getAttribute("d")
    );
  });

  it("opens metric detail modals from the listening metrics cards", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /听感与指标/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开听感与指标实验室"
      })
    );

    await user.click(screen.getByRole("button", { name: /LUFS/ }));

    const modal = screen.getByRole("dialog", { name: "LUFS 详细介绍" });
    expect(within(modal).getByRole("heading", { name: "LUFS 详细介绍" })).toBeInTheDocument();
    expect(within(modal).getByText(/面向人耳感知的节目响度指标/)).toBeInTheDocument();
    expect(within(modal).getByText(/不是瞬时峰值/)).toBeInTheDocument();

    await user.click(within(modal).getByRole("button", { name: "关闭指标详情" }));

    expect(screen.queryByRole("dialog", { name: "LUFS 详细介绍" })).not.toBeInTheDocument();
  });

  it("configures distinct audio processing for every listening effect", async () => {
    const createdOscillators: Array<{
      connect: ReturnType<typeof vi.fn>;
      start: ReturnType<typeof vi.fn>;
      stop: ReturnType<typeof vi.fn>;
      frequency: { setValueAtTime: ReturnType<typeof vi.fn> };
      type: OscillatorType;
    }> = [];
    const createdFilters: Array<{
      connect: ReturnType<typeof vi.fn>;
      frequency: { setValueAtTime: ReturnType<typeof vi.fn> };
      gain: { setValueAtTime: ReturnType<typeof vi.fn> };
      Q: { setValueAtTime: ReturnType<typeof vi.fn> };
      type: BiquadFilterType;
    }> = [];
    const createdPanners: Array<{
      connect: ReturnType<typeof vi.fn>;
      pan: { setValueAtTime: ReturnType<typeof vi.fn> };
    }> = [];
    const createdWaveShapers: Array<{
      connect: ReturnType<typeof vi.fn>;
      curve: Float32Array | null;
      oversample: OverSampleType;
    }> = [];
    const createdCompressors: Array<{
      connect: ReturnType<typeof vi.fn>;
      threshold: { setValueAtTime: ReturnType<typeof vi.fn> };
      knee: { setValueAtTime: ReturnType<typeof vi.fn> };
      ratio: { setValueAtTime: ReturnType<typeof vi.fn> };
      attack: { setValueAtTime: ReturnType<typeof vi.fn> };
      release: { setValueAtTime: ReturnType<typeof vi.fn> };
    }> = [];
    const createdGains: Array<{
      connect: ReturnType<typeof vi.fn>;
      gain: {
        setValueAtTime: ReturnType<typeof vi.fn>;
        linearRampToValueAtTime: ReturnType<typeof vi.fn>;
      };
    }> = [];
    const bufferData = new Float32Array(4410);
    const bufferSource = {
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      buffer: null as AudioBuffer | null,
      loop: false
    };
    const audioContext = {
      currentTime: 0,
      destination: {},
      createOscillator: vi.fn(() => {
        const oscillator = {
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn(),
          frequency: { setValueAtTime: vi.fn() },
          type: "sine" as OscillatorType
        };
        createdOscillators.push(oscillator);
        return oscillator;
      }),
      createGain: vi.fn(() => {
        const gain = {
          connect: vi.fn(),
          gain: {
            setValueAtTime: vi.fn(),
            linearRampToValueAtTime: vi.fn()
          }
        };
        createdGains.push(gain);
        return gain;
      }),
      createBiquadFilter: vi.fn(() => {
        const filter = {
          connect: vi.fn(),
          frequency: { setValueAtTime: vi.fn() },
          gain: { setValueAtTime: vi.fn() },
          Q: { setValueAtTime: vi.fn() },
          type: "peaking" as BiquadFilterType
        };
        createdFilters.push(filter);
        return filter;
      }),
      createStereoPanner: vi.fn(() => {
        const panner = {
          connect: vi.fn(),
          pan: { setValueAtTime: vi.fn() }
        };
        createdPanners.push(panner);
        return panner;
      }),
      createWaveShaper: vi.fn(() => {
        const waveShaper = {
          connect: vi.fn(),
          curve: null as Float32Array | null,
          oversample: "none" as OverSampleType
        };
        createdWaveShapers.push(waveShaper);
        return waveShaper;
      }),
      createDynamicsCompressor: vi.fn(() => {
        const compressor = {
          connect: vi.fn(),
          threshold: { setValueAtTime: vi.fn() },
          knee: { setValueAtTime: vi.fn() },
          ratio: { setValueAtTime: vi.fn() },
          attack: { setValueAtTime: vi.fn() },
          release: { setValueAtTime: vi.fn() }
        };
        createdCompressors.push(compressor);
        return compressor;
      }),
      createBuffer: vi.fn(() => ({
        getChannelData: vi.fn(() => bufferData)
      })),
      createBufferSource: vi.fn(() => bufferSource),
      close: vi.fn()
    };
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: vi.fn(() => audioContext)
    });

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /听感与指标/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开听感与指标实验室"
      })
    );

    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    expect(createdFilters[createdFilters.length - 1]?.type).toBe("highshelf");
    expect(createdFilters[createdFilters.length - 1]?.frequency.setValueAtTime).toHaveBeenLastCalledWith(3600, 0);

    await user.click(screen.getByRole("button", { name: "浑浊低中频" }));
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    expect(createdFilters[createdFilters.length - 1]?.type).toBe("lowshelf");
    expect(createdFilters[createdFilters.length - 1]?.frequency.setValueAtTime).toHaveBeenLastCalledWith(260, 0);

    await user.click(screen.getByRole("button", { name: "噪声底噪" }));
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    expect(audioContext.createBufferSource).toHaveBeenCalled();
    expect(audioContext.createBuffer).toHaveBeenCalledWith(1, 4410, 44100);
    expect(bufferData.some((sample) => sample !== 0)).toBe(true);

    await user.click(screen.getByRole("button", { name: "谐波失真" }));
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    expect(audioContext.createWaveShaper).toHaveBeenCalled();
    expect(createdWaveShapers[createdWaveShapers.length - 1]?.curve).toBeInstanceOf(Float32Array);
    expect(createdWaveShapers[createdWaveShapers.length - 1]?.oversample).toBe("4x");

    await user.click(screen.getByRole("button", { name: "动态压缩" }));
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    expect(audioContext.createDynamicsCompressor).toHaveBeenCalled();
    expect(createdCompressors[createdCompressors.length - 1]?.ratio.setValueAtTime).toHaveBeenLastCalledWith(expect.any(Number), 0);
    const compressionInputGain = createdGains[createdGains.length - 2];
    const compressionOutputGain = createdGains[createdGains.length - 1];
    expect(compressionInputGain?.gain.linearRampToValueAtTime).toHaveBeenCalledWith(expect.any(Number), 0.08);
    expect(compressionInputGain?.gain.linearRampToValueAtTime).toHaveBeenCalledWith(expect.any(Number), 0.4);
    expect(compressionInputGain?.gain.linearRampToValueAtTime).toHaveBeenCalledWith(expect.any(Number), 0.72);
    expect(compressionInputGain?.gain.linearRampToValueAtTime).toHaveBeenCalledWith(expect.any(Number), 1.04);
    expect(compressionInputGain?.gain.linearRampToValueAtTime).toHaveBeenCalledWith(expect.any(Number), 1.22);
    expect(compressionInputGain?.gain.linearRampToValueAtTime).toHaveBeenCalledWith(0.0001, 1.5);
    expect(compressionOutputGain?.gain.setValueAtTime).toHaveBeenCalledWith(expect.any(Number), 0);

    await user.click(screen.getByRole("button", { name: "声像偏移" }));
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    expect(createdPanners[createdPanners.length - 1]?.pan.setValueAtTime).toHaveBeenLastCalledWith(expect.any(Number), 0);
  });

  it("changes distortion and compression processing when effect intensity changes", async () => {
    const createdWaveShapers: Array<{
      connect: ReturnType<typeof vi.fn>;
      curve: Float32Array | null;
      oversample: OverSampleType;
    }> = [];
    const createdCompressors: Array<{
      connect: ReturnType<typeof vi.fn>;
      threshold: { setValueAtTime: ReturnType<typeof vi.fn> };
      knee: { setValueAtTime: ReturnType<typeof vi.fn> };
      ratio: { setValueAtTime: ReturnType<typeof vi.fn> };
      attack: { setValueAtTime: ReturnType<typeof vi.fn> };
      release: { setValueAtTime: ReturnType<typeof vi.fn> };
    }> = [];
    const audioContext = {
      currentTime: 0,
      destination: {},
      sampleRate: 44100,
      createOscillator: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        frequency: { setValueAtTime: vi.fn() },
        type: "sine" as OscillatorType
      })),
      createGain: vi.fn(() => ({
        connect: vi.fn(),
        gain: {
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn()
        }
      })),
      createBiquadFilter: vi.fn(() => ({
        connect: vi.fn(),
        frequency: { setValueAtTime: vi.fn() },
        gain: { setValueAtTime: vi.fn() },
        Q: { setValueAtTime: vi.fn() },
        type: "peaking" as BiquadFilterType
      })),
      createStereoPanner: vi.fn(() => ({
        connect: vi.fn(),
        pan: { setValueAtTime: vi.fn() }
      })),
      createWaveShaper: vi.fn(() => {
        const waveShaper = {
          connect: vi.fn(),
          curve: null as Float32Array | null,
          oversample: "none" as OverSampleType
        };
        createdWaveShapers.push(waveShaper);
        return waveShaper;
      }),
      createDynamicsCompressor: vi.fn(() => {
        const compressor = {
          connect: vi.fn(),
          threshold: { setValueAtTime: vi.fn() },
          knee: { setValueAtTime: vi.fn() },
          ratio: { setValueAtTime: vi.fn() },
          attack: { setValueAtTime: vi.fn() },
          release: { setValueAtTime: vi.fn() }
        };
        createdCompressors.push(compressor);
        return compressor;
      }),
      createBuffer: vi.fn(() => ({
        getChannelData: vi.fn(() => new Float32Array(4410))
      })),
      createBufferSource: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        buffer: null as AudioBuffer | null,
        loop: false
      })),
      close: vi.fn()
    };
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: vi.fn(() => audioContext)
    });

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /听感与指标/ }));
    await user.click(
      within(screen.getByRole("dialog", { name: "主题详情" })).getByRole("button", {
        name: "打开听感与指标实验室"
      })
    );
    await user.click(screen.getByRole("button", { name: "谐波失真" }));

    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "5" }
    });
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    const lowDistortionCurve = createdWaveShapers[createdWaveShapers.length - 1]?.curve;

    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "100" }
    });
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    const highDistortionCurve = createdWaveShapers[createdWaveShapers.length - 1]?.curve;

    expect(lowDistortionCurve?.[384]).toBeGreaterThan(0.45);
    expect(highDistortionCurve?.[384]).toBeGreaterThan(lowDistortionCurve?.[384] ?? 0);

    await user.click(screen.getByRole("button", { name: "动态压缩" }));
    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "5" }
    });
    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    const lowCompressor = createdCompressors[createdCompressors.length - 1];

    expect(lowCompressor?.threshold.setValueAtTime).toHaveBeenLastCalledWith(-11.4, 0);
    expect(lowCompressor?.ratio.setValueAtTime).toHaveBeenLastCalledWith(1.7000000000000002, 0);

    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "100" }
    });

    expect(lowCompressor?.threshold.setValueAtTime).toHaveBeenLastCalledWith(-38, 0);
    expect(lowCompressor?.ratio.setValueAtTime).toHaveBeenLastCalledWith(15, 0);

    await user.click(screen.getByRole("button", { name: "播放对照音效" }));
    const highCompressor = createdCompressors[createdCompressors.length - 1];

    expect(highCompressor?.threshold.setValueAtTime).toHaveBeenLastCalledWith(-38, 0);
    expect(highCompressor?.ratio.setValueAtTime).toHaveBeenLastCalledWith(15, 0);

    fireEvent.change(screen.getByRole("slider", { name: "效果强度" }), {
      target: { value: "30" }
    });

    expect(highCompressor?.threshold.setValueAtTime).toHaveBeenLastCalledWith(-18.4, 0);
    expect(highCompressor?.ratio.setValueAtTime).toHaveBeenLastCalledWith(5.2, 0);
  });
});
