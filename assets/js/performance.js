// data/modelPerformance.js
// Single source of truth. Do not fetch data externally.

export const MODEL_PERFORMANCE = {
  "FireRedASR-LLM": {
    displayName: "FireRedASR-LLM",
    coverage: ["Track I"],
    anchors: {
      table3: "#track1-results",
    },
    track1: {
      title: "Track I · Stress Tests (Table 3)",
      note:
        "Error rates are in % (↓ lower is better). RPS is normalized (↑ higher is better). For ContextASR, RPS uses the hotword-injection setting (left value in paper).",
      stressors: [
        { group: "Codeswitch", dataset: "CS-Dialogue", metric: "MER↓", raw: 7.44, rps: 0.94 },
        { group: "Dialect", dataset: "KeSpeech", metric: "CER↓", raw: 3.81, rps: 1.0 },
        { group: "Noise", dataset: "VoxPopuli-en", metric: "WER↓", raw: 11.87, rps: 0.57 },
        { group: "Noise/Reverb", dataset: "AISHELL-5", metric: "CER↓", raw: 24.74, rps: 1.0 },
        { group: "Context (En)", dataset: "ContextASR-En", metric: "WER↓", raw: 8.01, rps: 0.43 },
        { group: "Context (Zh)", dataset: "ContextASR-Zh", metric: "CER↓", raw: 3.44, rps: 0.73 },
      ],
    },
  },

  "Kimi-Audio": {
    displayName: "Kimi-Audio",
    coverage: ["Track I", "Track II"],
    anchors: {
      table3: "#track1-results",
      table4: "#track2-results",
    },
    track1: {
      title: "Track I · Stress Tests (Table 3)",
      note:
        "Error rates are in % (↓ lower is better). RPS is normalized (↑ higher is better). For ContextASR, RPS uses the hotword-injection setting (left value in paper).",
      stressors: [
        { group: "Codeswitch", dataset: "CS-Dialogue", metric: "MER↓", raw: 11.94, rps: 0.59 },
        { group: "Dialect", dataset: "KeSpeech", metric: "CER↓", raw: 7.8, rps: 0.49 },
        { group: "Noise", dataset: "VoxPopuli-en", metric: "WER↓", raw: 10.63, rps: 0.63 },
        { group: "Noise/Reverb", dataset: "AISHELL-5", metric: "CER↓", raw: 45.72, rps: 0.54 },
        { group: "Context (En)", dataset: "ContextASR-En", metric: "WER↓", raw: 6.66, rps: 0.52 },
        { group: "Context (Zh)", dataset: "ContextASR-Zh", metric: "CER↓", raw: 2.96, rps: 0.84 },
      ],
    },
    track2: {
      title: "Track II · Horizontal Tasks (Table 4)",
      note:
        "All scores are in %. ASR is WER/CER (↓ lower is better). GR/SER/SLU are accuracy (↑ higher is better). S2TT is character-level BLEU (↑ higher is better).",
      tasks: {
        ASR: {
          direction: "↓",
          metric: "WER/CER",
          datasets: [
            { name: "LibriSpeech (clean)", value: 2.30 },
            { name: "LibriSpeech (other)", value: 3.83 },
            { name: "AISHELL-1", value: 0.80 },
          ],
        },
        GR: {
          direction: "↑",
          metric: "Acc",
          datasets: [{ name: "LibriSpeech", value: 92.02 }],
        },
        SER: {
          direction: "↑",
          metric: "Acc",
          datasets: [{ name: "IEMOCAP", value: 69.38 }],
        },
        SLU: {
          direction: "↑",
          metric: "Acc",
          datasets: [{ name: "MMSU-Reason", value: 75.33 }],
        },
      },
    },
  },

  "Qwen3-Omni": {
    displayName: "Qwen3-Omni",
    coverage: ["Track II"],
    anchors: {
      table4: "#track2-results",
    },
    track2: {
      title: "Track II · Horizontal Tasks (Table 4)",
      note:
        "All scores are in %. ASR is WER/CER (↓ lower is better). GR/SER/SLU are accuracy (↑ higher is better). S2TT is character-level BLEU (↑ higher is better).",
      tasks: {
        ASR: {
          direction: "↓",
          metric: "WER/CER",
          datasets: [
            { name: "LibriSpeech (clean)", value: 1.70 },
            { name: "LibriSpeech (other)", value: 3.05 },
            { name: "AISHELL-1", value: 1.02 },
          ],
        },
        GR: {
          direction: "↑",
          metric: "Acc",
          datasets: [{ name: "LibriSpeech", value: 82.74 }],
        },
        S2TT: {
          direction: "↑",
          metric: "BLEU",
          datasets: [
            { name: "CoVoST2 En→Zh", value: 46.25 },
            { name: "CoVoST2 Zh→En", value: 50.61 },
          ],
        },
        SER: {
          direction: "↑",
          metric: "Acc",
          datasets: [{ name: "IEMOCAP", value: 66.16 }],
        },
        SLU: {
          direction: "↑",
          metric: "Acc",
          datasets: [{ name: "MMSU-Reason", value: 83.61 }],
        },
      },
    },
  },

  "Qwen2-audio": {
    displayName: "Qwen2-audio",
    coverage: ["Track III"],
    anchors: {
      table5: "#track3-results",
    },
    track3: {
      title: "Track III · Controlled Training Coverage (Table 5)",
      note:
        "All metrics are in %. ASR is error rate (↓ lower is better). GR/S2TT/SER/SLU are higher-is-better (↑). Values may be reported as pairs (e.g., Zh/En or En→Zh/Zh→En).",
      metrics: {
        ASR: { direction: "↓", label: "ASR", sublabel: "Zh / En", valuePair: [1.58, 2.57] },
        GR: { direction: "↑", label: "GR", value: 98.93 },
        S2TT: { direction: "↑", label: "S2TT", sublabel: "En→Zh / Zh→En", valuePair: [33.0, 43.36] },
        SER: { direction: "↑", label: "SER", value: 40.38 },
        SLU: { direction: "↑", label: "SLU", value: 47.81 },
      },
    },
  },
};
