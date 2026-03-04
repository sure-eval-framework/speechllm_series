(() => {
  const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const track1Columns = [
    {
      key: "codeswitch",
      label: "Codeswitch",
      dataset: "CS-Dialogue",
      metric: "MER",
      group: "Linguistic",
      contextRps: false,
    },
    {
      key: "contextEn",
      label: "Context (EN)",
      dataset: "ContextASR-En",
      metric: "WER",
      group: "Linguistic",
      contextRps: true,
    },
    {
      key: "contextZh",
      label: "Context (ZH)",
      dataset: "ContextASR-Zh",
      metric: "CER",
      group: "Linguistic",
      contextRps: true,
    },
    {
      key: "dialect",
      label: "Dialect",
      dataset: "KeSpeech",
      metric: "CER",
      group: "Acoustic",
      contextRps: false,
    },
    {
      key: "noise",
      label: "Noise",
      dataset: "VoxPopuli-en",
      metric: "WER",
      group: "Acoustic",
      contextRps: false,
    },
    {
      key: "noiseReverb",
      label: "Noise/Reverb",
      dataset: "AISHELL-5",
      metric: "CER",
      group: "Acoustic",
      contextRps: false,
    },
  ];

  const track1Rows = [
    {
      model: "SenseVoice-Small",
      codeswitch: { raw: 7.52, rps: 0.93 },
      contextEn: { raw: 14.52, rps: 0.24 },
      contextZh: { raw: 6.44, rps: 0.39 },
      dialect: { raw: 12.46, rps: 0.31 },
      noise: { raw: 12.5, rps: 0.54 },
      noiseReverb: { raw: 38.63, rps: 0.64 },
    },
    {
      model: "Whisper-large-v3",
      codeswitch: { raw: 15.91, rps: 0.44 },
      contextEn: { raw: 8.37, rps: 0.41 },
      contextZh: { raw: 8.29, rps: 0.3 },
      dialect: { raw: 30.65, rps: 0.12 },
      noise: { raw: 12.62, rps: 0.53 },
      noiseReverb: { raw: 45.11, rps: 0.55 },
    },
    {
      model: "Parakeet-en",
      codeswitch: { raw: null, rps: null },
      contextEn: { raw: 8.67, rps: 0.4 },
      contextZh: { raw: null, rps: null },
      dialect: { raw: null, rps: null },
      noise: { raw: 6.72, rps: 1.0 },
      noiseReverb: { raw: null, rps: null },
    },
    {
      model: "Gemini-2.5pro",
      codeswitch: { raw: 17.96, rps: 0.39 },
      contextEn: { raw: 3.47, rps: 1.0 },
      contextZh: { raw: 2.78, rps: 0.9 },
      dialect: { raw: 31.82, rps: 0.12 },
      noise: { raw: 9.03, rps: 0.74 },
      noiseReverb: { raw: 64.49, rps: 0.38 },
    },
    {
      model: "Qwen3-ASR-1.7B",
      codeswitch: { raw: 7.0, rps: 1.0 },
      contextEn: { raw: 5.58, rps: 0.62 },
      contextZh: { raw: 2.5, rps: 1.0 },
      dialect: { raw: 5.12, rps: 0.74 },
      noise: { raw: 7.41, rps: 0.91 },
      noiseReverb: { raw: 25.46, rps: 0.97 },
    },
    {
      model: "FireRedLLM-L-7B",
      codeswitch: { raw: 7.44, rps: 0.94 },
      contextEn: { raw: 8.01, rps: 0.43 },
      contextZh: { raw: 3.44, rps: 0.73 },
      dialect: { raw: 3.81, rps: 1.0 },
      noise: { raw: 11.87, rps: 0.57 },
      noiseReverb: { raw: 24.74, rps: 1.0 },
    },
    {
      model: "Kimi-Audio",
      codeswitch: { raw: 11.94, rps: 0.59 },
      contextEn: { raw: 6.66, rps: 0.52 },
      contextZh: { raw: 2.96, rps: 0.84 },
      dialect: { raw: 7.8, rps: 0.49 },
      noise: { raw: 10.63, rps: 0.63 },
      noiseReverb: { raw: 45.72, rps: 0.54 },
    },
  ];

  const track2Models = [
    { key: "pipeline", label: "Pipeline" },
    { key: "gemini30", label: "Gemini 3.0-pro" },
    { key: "qwen3Omni", label: "Qwen3 Omni" },
    { key: "kimiAudio", label: "Kimi Audio" },
    { key: "gemini25", label: "Gemini 2.5pro" },
  ];

  const track2Tasks = [
    {
      key: "ASR",
      direction: "down",
      directionLabel: "↓",
      datasets: [
        {
          name: "LibriSpeech (clean)",
          values: { pipeline: 2.9, gemini30: 2.78, qwen3Omni: 1.7, kimiAudio: 2.3, gemini25: 3.07 },
        },
        {
          name: "LibriSpeech (other)",
          values: { pipeline: 5.1, gemini30: 4.4, qwen3Omni: 3.05, kimiAudio: 3.83, gemini25: 4.93 },
        },
        {
          name: "AISHELL-1",
          values: { pipeline: 5.93, gemini30: 3.6, qwen3Omni: 1.02, kimiAudio: 0.8, gemini25: 4.49 },
        },
      ],
    },
    {
      key: "GR",
      direction: "up",
      directionLabel: "↑",
      datasets: [
        {
          name: "LibriSpeech GR",
          values: {
            pipeline: 53.69,
            gemini30: 78.5,
            qwen3Omni: 82.74,
            kimiAudio: 92.02,
            gemini25: 59.64,
          },
        },
      ],
    },
    {
      key: "S2TT",
      direction: "up",
      directionLabel: "↑",
      datasets: [
        {
          name: "CoVoST2 EN→ZH",
          values: {
            pipeline: 18.12,
            gemini30: 15.92,
            qwen3Omni: 46.25,
            kimiAudio: null,
            gemini25: 41.44,
          },
        },
        {
          name: "CoVoST2 ZH→EN",
          values: {
            pipeline: 53.37,
            gemini30: 15.5,
            qwen3Omni: 50.61,
            kimiAudio: null,
            gemini25: 60.14,
          },
        },
      ],
    },
    {
      key: "SER",
      direction: "up",
      directionLabel: "↑",
      datasets: [
        {
          name: "IEMOCAP",
          values: {
            pipeline: 52.62,
            gemini30: 66.56,
            qwen3Omni: 66.16,
            kimiAudio: 69.38,
            gemini25: 63.01,
          },
        },
      ],
    },
    {
      key: "SLU",
      direction: "up",
      directionLabel: "↑",
      datasets: [
        {
          name: "MMSU-Reason",
          values: {
            pipeline: 76.45,
            gemini30: 89.07,
            qwen3Omni: 83.61,
            kimiAudio: 75.33,
            gemini25: 84.64,
          },
        },
      ],
    },
  ];

  const state = {
    track1: {
      metricMode: "both",
      highlightBest: true,
      renderedRows: [],
      activeModels: new Set(track1Rows.map((row) => row.model)),
      activeDatasets: new Set(track1Columns.map((column) => column.key)),
    },
    track2: {
      viewMode: "cards",
      activeTasks: new Set(track2Tasks.map((task) => task.key)),
      activeModels: new Set(track2Models.map((model) => model.key)),
    },
  };

  document.addEventListener("DOMContentLoaded", () => {
    initFrameworkOverview();
    initFrameworkLightbox();
    initTrack1();
    initTrack2();
  });

  function initFrameworkOverview() {
    const chips = document.getElementById("framework-legend-chips");
    const explainer = document.getElementById("framework-legend-text");
    if (!chips || !explainer) {
      return;
    }

    const explanations = {
      perception:
        "Perception captures signal-level understanding, including robustness to acoustic quality and speaker variability.",
      recognition:
        "Recognition targets semantic extraction and context-sensitive decoding behavior under realistic user prompts.",
      track1:
        "System-level evaluation using scenario suites curated from open data to approximate real-world conditions, covering acoustic stressors and linguistic stressors",
      track2:
        "A unified evaluation spanning shallow perception, shallow cognition, deep cognition, covering representative Speech LLMs as well as cascaded pipelines.",
    };

    const setActive = (key) => {
      chips.querySelectorAll(".legend-chip").forEach((chip) => {
        const isActive = chip.dataset.key === key;
        chip.classList.toggle("is-active", isActive);
        chip.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      explainer.textContent = explanations[key] || "";
    };

    chips.addEventListener("click", (event) => {
      const button = event.target.closest("button.legend-chip");
      if (!button) {
        return;
      }
      setActive(button.dataset.key);
    });

    const defaultKey = chips.querySelector(".legend-chip.is-active")?.dataset.key || "perception";
    setActive(defaultKey);
  }

  function initFrameworkLightbox() {
    const modal = document.getElementById("framework-lightbox");
    const modalImage = document.getElementById("framework-lightbox-image");
    const triggers = document.querySelectorAll(".framework-lightbox-trigger");
    if (!modal || !modalImage || !triggers.length) {
      return;
    }

    const closeLightbox = () => {
      modal.classList.add("is-hidden");
      modalImage.src = "";
      modalImage.alt = "";
      document.body.style.overflow = "";
    };

    const openLightbox = (src, alt) => {
      modalImage.src = src;
      modalImage.alt = alt || "";
      modal.classList.remove("is-hidden");
      document.body.style.overflow = "hidden";
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        openLightbox(trigger.dataset.src, trigger.dataset.alt);
      });
    });

    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-lightbox]")) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.classList.contains("is-hidden")) {
        closeLightbox();
      }
    });
  }

  function initTrack1() {
    const table = document.getElementById("track1-table");
    const metricSelect = document.getElementById("track1-metric-select");
    const datasetSelect = document.getElementById("track1-dataset-select");
    const modelSelect = document.getElementById("track1-model-select");
    const highlightCheckbox = document.getElementById("track1-highlight-best");
    const downloadButton = document.getElementById("track1-download");

    if (!table || !metricSelect || !datasetSelect || !modelSelect || !highlightCheckbox || !downloadButton) {
      return;
    }

    // Metric multi-select: Raw / RPS, mapping to raw/rps/both（默认同时选中 Raw 和 RPS）
    metricSelect.innerHTML = "";
    [
      { value: "raw", label: "Raw" },
      { value: "rps", label: "RPS" },
    ].forEach((optionDef) => {
      const option = document.createElement("option");
      option.value = optionDef.value;
      option.textContent = optionDef.label;
      option.selected = true;
      metricSelect.appendChild(option);
    });

    let metricChoices = null;
    let datasetChoices = null;
    let modelChoices = null;

    if (window.Choices) {
      metricChoices = new window.Choices(metricSelect, {
        removeItemButton: true,
        searchPlaceholderValue: "Search metric...",
        shouldSort: false,
      });
    }

    // 初始化时 Raw 与 RPS 都被选中，因此同步 state 为 "both"，保证首屏就展示 Raw+RPS 两行
    state.track1.metricMode = "both";

    metricSelect.addEventListener("change", () => {
      const selected = new Set(Array.from(metricSelect.selectedOptions).map((o) => o.value));
      if (selected.has("raw") && selected.has("rps")) {
        state.track1.metricMode = "both";
      } else if (selected.has("rps")) {
        state.track1.metricMode = "rps";
      } else {
        state.track1.metricMode = "raw";
      }
      renderTrack1();
    });

    // Dataset multi-select
    datasetSelect.innerHTML = "";
    track1Columns.forEach((column) => {
      const option = document.createElement("option");
      option.value = column.key;
      option.textContent = column.dataset;
      option.selected = true;
      datasetSelect.appendChild(option);
    });

    if (window.Choices) {
      datasetChoices = new window.Choices(datasetSelect, {
        removeItemButton: true,
        searchPlaceholderValue: "Search dataset...",
        shouldSort: false,
      });
    }

    datasetSelect.addEventListener("change", () => {
      const selected = Array.from(datasetSelect.selectedOptions).map((o) => o.value);
      // 与 leaderboard 一致：当全部取消选择时，不再自动回退为“全部”，而是视为空集合
      state.track1.activeDatasets = new Set(selected);
      renderTrack1();
    });

    // Model multi-select
    modelSelect.innerHTML = "";
    track1Rows.forEach((row) => {
      const option = document.createElement("option");
      option.value = row.model;
      option.textContent = row.model;
      option.selected = true;
      modelSelect.appendChild(option);
    });

    if (window.Choices) {
      modelChoices = new window.Choices(modelSelect, {
        removeItemButton: true,
        searchPlaceholderValue: "Search model...",
        shouldSort: false,
      });
    }

    if (metricChoices) attachSelectDecorators(metricSelect, metricChoices);
    if (datasetChoices) attachSelectDecorators(datasetSelect, datasetChoices);
    if (modelChoices) attachSelectDecorators(modelSelect, modelChoices);

    modelSelect.addEventListener("change", () => {
      const selected = Array.from(modelSelect.selectedOptions).map((o) => o.value);
      // 与 leaderboard 一致：全部取消选择时，视为不选中任何模型
      state.track1.activeModels = new Set(selected);
      renderTrack1();
    });

    highlightCheckbox.addEventListener("change", () => {
      state.track1.highlightBest = highlightCheckbox.checked;
      renderTrack1();
    });

    downloadButton.addEventListener("click", () => {
      const csv = buildTrack1Csv(state.track1.renderedRows);
      triggerCsvDownload(csv, "track1_scenario_stress_tests.csv");
    });

    renderTrack1();
  }

  function buildTrack1SortOptions() {
    const optionHtml = ['<option value="avgRps">Average RPS</option>'];
    track1Columns.forEach((column) => {
      optionHtml.push(`<option value="${column.key}__raw">${escapeHtml(column.label)} (Raw)</option>`);
      optionHtml.push(`<option value="${column.key}__rps">${escapeHtml(column.label)} (RPS)</option>`);
    });
    return optionHtml.join("");
  }

  function renderTrack1() {
    const table = document.getElementById("track1-table");
    if (!table) {
      return;
    }

    const mode = state.track1.metricMode;
    const activeDatasets = state.track1.activeDatasets || new Set(track1Columns.map((column) => column.key));
    const displayColumns = getTrack1DisplayColumns(mode);
    const rows = getFilteredAndSortedTrack1Rows();
    state.track1.renderedRows = rows;

    // 如果没有选中任何数据集，直接展示提示语
    if (!displayColumns.length) {
      table.innerHTML = `
        <thead>
          <tr>
            <th class="sticky-col">Model</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="sticky-col value-missing">No datasets selected. Enable one or more datasets above.</td>
          </tr>
        </tbody>
      `;
      return;
    }

    const bestMap = state.track1.highlightBest ? computeBestPerTrack1Column(rows, displayColumns) : {};

    const linguisticColspan = track1Columns
      .filter((column) => activeDatasets.has(column.key) && column.group === "Linguistic")
      .reduce((sum) => sum + (mode === "both" ? 2 : 1), 0);
    const acousticColspan = track1Columns
      .filter((column) => activeDatasets.has(column.key) && column.group === "Acoustic")
      .reduce((sum) => sum + (mode === "both" ? 2 : 1), 0);

    const scenarioHeaders = track1Columns
      .filter((column) => activeDatasets.has(column.key))
      .map((column) => {
        const contextTooltip = column.contextRps
          ? '<span class="results-tooltip" tabindex="0" role="note" aria-label="RPS computed using hotword-injection." data-tooltip="RPS computed using hotword-injection.">i</span>'
          : "";
        const colspan = mode === "both" ? 2 : 1;
        return `
          <th colspan="${colspan}">
            ${escapeHtml(column.label)}${contextTooltip}
            <span class="col-dataset">${escapeHtml(column.dataset)}
              <span class="metric-badge down">${escapeHtml(column.metric)}↓</span>
            </span>
          </th>
        `;
      })
      .join("");

    const visibleTrack1Columns = track1Columns.filter((column) => activeDatasets.has(column.key));

    const metricHeaders =
      mode === "both"
        ? visibleTrack1Columns
            .map(
              () =>
                '<th>Raw <span class="metric-badge down">↓</span></th><th>RPS <span class="metric-badge up">↑</span></th>'
            )
            .join("")
        : visibleTrack1Columns
            .map(() =>
              mode === "raw"
                ? '<th>Raw <span class="metric-badge down">↓</span></th>'
                : '<th>RPS <span class="metric-badge up">↑</span></th>'
            )
            .join("");

    const bodyRows = rows.length
      ? rows
          .map((row) => {
            const valueCells = displayColumns
              .map((column) => {
                const value = row[column.key][column.type];
                if (value == null) {
                  return '<td class="value-missing">—</td>';
                }

                const isBest = bestMap[column.id] != null && value === bestMap[column.id];
                return `<td class="${isBest ? "best-cell" : ""}">${formatNumber(value)}</td>`;
              })
              .join("");

            return `<tr><td class="sticky-col">${escapeHtml(row.model)}</td>${valueCells}</tr>`;
          })
            .join("")
          : `<tr><td class="sticky-col">No matching models</td><td colspan="${displayColumns.length}" class="value-missing">Adjust filters above.</td></tr>`;

    table.innerHTML = `
      <thead>
        <tr>
          <th class="sticky-col" rowspan="3">Model</th>
          <th colspan="${linguisticColspan}">Linguistic</th>
          <th colspan="${acousticColspan}">Acoustic</th>
        </tr>
        <tr>${scenarioHeaders}</tr>
        <tr>${metricHeaders}</tr>
      </thead>
      <tbody>${bodyRows}</tbody>
    `;

    initSortableTable(table, 1, 0);
  }

  function getTrack1DisplayColumns(mode) {
    const columns = [];
    const activeDatasets = state.track1.activeDatasets || new Set(track1Columns.map((column) => column.key));
    track1Columns.forEach((column) => {
      if (!activeDatasets.has(column.key)) {
        return;
      }
      if (mode === "both" || mode === "raw") {
        columns.push({ id: `${column.key}__raw`, key: column.key, type: "raw" });
      }
      if (mode === "both" || mode === "rps") {
        columns.push({ id: `${column.key}__rps`, key: column.key, type: "rps" });
      }
    });
    return columns;
  }

  function getFilteredAndSortedTrack1Rows() {
    const activeModels = state.track1.activeModels || new Set(track1Rows.map((row) => row.model));
    return track1Rows.filter((row) => activeModels.has(row.model));
  }

  function computeAverageRps(row) {
    const activeDatasets = state.track1.activeDatasets || new Set(track1Columns.map((column) => column.key));
    const values = track1Columns
      .filter((column) => activeDatasets.has(column.key))
      .map((column) => row[column.key].rps)
      .filter((value) => value != null && Number.isFinite(value));
    if (!values.length) {
      return null;
    }
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function computeBestPerTrack1Column(rows, displayColumns) {
    const bestMap = {};
    displayColumns.forEach((column) => {
      const values = rows
        .map((row) => row[column.key][column.type])
        .filter((value) => value != null && Number.isFinite(value));
      if (!values.length) {
        return;
      }
      bestMap[column.id] = column.type === "raw" ? Math.min(...values) : Math.max(...values);
    });
    return bestMap;
  }

  function buildTrack1Csv(rows) {
    const header = ["Model"];
    const activeDatasets = state.track1.activeDatasets || new Set(track1Columns.map((column) => column.key));
    const visibleTrack1Columns = track1Columns.filter((column) => activeDatasets.has(column.key));

    visibleTrack1Columns.forEach((column) => {
      header.push(`${column.label} Raw`);
      header.push(`${column.label} RPS`);
    });
    header.push("Average RPS");

    const lines = [header.join(",")];
    rows.forEach((row) => {
      const parts = [csvEscape(row.model)];
      visibleTrack1Columns.forEach((column) => {
        const point = row[column.key];
        parts.push(csvValue(point.raw));
        parts.push(csvValue(point.rps));
      });
      parts.push(csvValue(computeAverageRps(row)));
      lines.push(parts.join(","));
    });

    return lines.join("\n");
  }

  function initTrack2() {
    const taskSelect = document.getElementById("track2-task-select");
    const modelSelect = document.getElementById("track2-model-select");
    const viewToggle = document.getElementById("track2-view-toggle");
    const downloadButton = document.getElementById("track2-download");

    if (!taskSelect || !modelSelect || !viewToggle || !downloadButton) {
      return;
    }

    // Task multi-select
    taskSelect.innerHTML = "";
    track2Tasks.forEach((task) => {
      const option = document.createElement("option");
      option.value = task.key;
      option.textContent = task.key;
      option.selected = true;
      taskSelect.appendChild(option);
    });

    // Model multi-select
    modelSelect.innerHTML = "";
    track2Models.forEach((model) => {
      const option = document.createElement("option");
      option.value = model.key;
      option.textContent = model.label;
      option.selected = true;
      modelSelect.appendChild(option);
    });

    let taskChoices = null;
    let modelChoices = null;

    if (window.Choices) {
      taskChoices = new window.Choices(taskSelect, {
        removeItemButton: true,
        searchPlaceholderValue: "Search task...",
        shouldSort: false,
      });

      modelChoices = new window.Choices(modelSelect, {
        removeItemButton: true,
        searchPlaceholderValue: "Search model...",
        shouldSort: false,
      });
    }

    if (taskChoices) attachSelectDecorators(taskSelect, taskChoices);
    if (modelChoices) attachSelectDecorators(modelSelect, modelChoices);

    taskSelect.addEventListener("change", () => {
      const selected = Array.from(taskSelect.selectedOptions).map((o) => o.value);
      // 与 leaderboard 一致：全部取消选择时，不再回退为“全部任务”
      state.track2.activeTasks = new Set(selected);
      renderTrack2();
    });

    modelSelect.addEventListener("change", () => {
      const selected = Array.from(modelSelect.selectedOptions).map((o) => o.value);
      // 与 leaderboard 一致：全部取消选择时，视为不选中任何模型
      state.track2.activeModels = new Set(selected);
      renderTrack2();
    });

    viewToggle.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-view]");
      if (!button) {
        return;
      }
      state.track2.viewMode = button.dataset.view;
      viewToggle.querySelectorAll("button").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      renderTrack2();
    });

    downloadButton.addEventListener("click", () => {
      const csv = buildTrack2Csv(getSelectedTrack2Tasks());
      triggerCsvDownload(csv, "track2_full_stack_tasks.csv");
    });

    renderTrack2();
  }

  function renderTrack2() {
    const cardsContainer = document.getElementById("track2-task-cards");
    const unifiedContainer = document.getElementById("track2-unified-view");
    const unifiedTable = document.getElementById("track2-unified-table");
    if (!cardsContainer || !unifiedContainer || !unifiedTable) {
      return;
    }

    const selectedTasks = getSelectedTrack2Tasks();

    if (state.track2.viewMode === "cards") {
      unifiedContainer.classList.add("is-hidden");
      cardsContainer.classList.remove("is-hidden");
    } else {
      unifiedContainer.classList.remove("is-hidden");
      cardsContainer.classList.add("is-hidden");
    }

    renderTrack2Cards(cardsContainer, selectedTasks);
    renderTrack2Unified(unifiedTable, selectedTasks);
  }

  function getSelectedTrack2Tasks() {
    return track2Tasks.filter((task) => state.track2.activeTasks.has(task.key));
  }

  function renderTrack2Cards(container, tasks) {
    const activeModels = state.track2.activeModels || new Set(track2Models.map((model) => model.key));
    const visibleModels = track2Models.filter((model) => activeModels.has(model.key));

    if (!tasks.length) {
      container.innerHTML = '<div class="no-results">No tasks selected. Enable one or more tasks above.</div>';
      return;
    }

    container.innerHTML = tasks
      .map((task) => {
        const headerColumns = visibleModels.map((model) => `<th>${escapeHtml(model.label)}</th>`).join("");
        const rows = task.datasets
          .map((dataset) => {
            const bestValue = getBestValue(dataset.values, task.direction, activeModels);
            const valueCells = visibleModels
              .map((model) => {
                const value = dataset.values[model.key];
                if (value == null) {
                  return '<td class="value-missing">—</td>';
                }
                const isBest = value === bestValue;
                return `<td class="${isBest ? "best-cell" : ""}">${formatNumber(value)}</td>`;
              })
              .join("");
            return `<tr><td>${escapeHtml(dataset.name)}</td>${valueCells}</tr>`;
          })
          .join("");

        return `
          <section class="task-card">
            <div class="task-card-header">
              <div class="task-card-title-row">
                <h4>${escapeHtml(task.key)}</h4>
                <span class="task-direction">${escapeHtml(task.directionLabel)}</span>
              </div>
            </div>
            <table class="task-card-table">
              <thead>
                <tr>
                  <th>Dataset</th>
                  ${headerColumns}
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </section>
        `;
      })
      .join("");

    // 为 Track2 Task cards 表格启用“按行表头排序列”的功能
    const tables = container.querySelectorAll(".task-card-table");
    tables.forEach((table) => {
      initRowHeaderColumnSorter(table, {
        rowHeaderColIndex: 0, // 第 0 列是每行的 Dataset 名称
        firstModelColIndex: 1, // 从第 1 列开始是各个模型
      });
    });
  }

  function renderTrack2Unified(table, tasks) {
    const activeModels = state.track2.activeModels || new Set(track2Models.map((model) => model.key));
    const visibleModels = track2Models.filter((model) => activeModels.has(model.key));

    if (!tasks.length) {
      table.innerHTML =
        '<tbody><tr><td class="value-missing">No tasks selected. Enable one or more tasks above.</td></tr></tbody>';
      return;
    }

    const headerColumns = visibleModels.map((model) => `<th>${escapeHtml(model.label)}</th>`).join("");
    const bodyRows = [];

    tasks.forEach((task) => {
      task.datasets.forEach((dataset) => {
        const ranks = rankDataset(dataset.values, task.direction, activeModels);
        const rankCells = visibleModels
          .map((model) => {
            const value = dataset.values[model.key];
            if (value == null) {
              return '<td class="value-missing">—</td>';
            }
            const rank = ranks[model.key];
            const rankClass = `rank-cell rank-${Math.min(rank, 5)}`;
            const title = `Original: ${formatNumber(value)}`;
            return `<td class="${rankClass}" title="${escapeHtml(title)}">${rank}</td>`;
          })
          .join("");

        bodyRows.push(`
          <tr>
            <td>${escapeHtml(task.key)} <span class="task-direction-inline">${escapeHtml(
              task.directionLabel
            )}</span></td>
            <td>${escapeHtml(dataset.name)}</td>
            ${rankCells}
          </tr>
        `);
      });
    });

    table.innerHTML = `
      <thead>
        <tr>
          <th>Task</th>
          <th>Dataset</th>
          ${headerColumns}
        </tr>
      </thead>
      <tbody>${bodyRows.join("")}</tbody>
    `;
    // 为 Track2 Unified 视图启用“按行表头排序列”的功能
    initRowHeaderColumnSorter(table, {
      rowHeaderColIndex: 1, // 第 1 列是 Dataset 名称
      firstModelColIndex: 2, // 从第 2 列开始是各个模型（rank）
    });
  }

  function rankDataset(valuesByModel, direction, activeModels) {
    const values = track2Models
      .map((model) => ({ key: model.key, value: valuesByModel[model.key] }))
      .filter((entry) => activeModels.has(entry.key))
      .filter((entry) => entry.value != null && Number.isFinite(entry.value))
      .sort((a, b) => (direction === "down" ? a.value - b.value : b.value - a.value));

    const ranks = {};
    values.forEach((entry, index) => {
      ranks[entry.key] = index + 1;
    });
    return ranks;
  }

  function getBestValue(valuesByModel, direction, activeModels) {
    const values = track2Models
      .filter((model) => activeModels.has(model.key))
      .map((model) => valuesByModel[model.key])
      .filter((value) => value != null && Number.isFinite(value));
    if (!values.length) {
      return null;
    }
    return direction === "down" ? Math.min(...values) : Math.max(...values);
  }

  function buildTrack2Csv(tasks) {
    const activeModels = state.track2.activeModels || new Set(track2Models.map((model) => model.key));
    const visibleModels = track2Models.filter((model) => activeModels.has(model.key));

    const header = ["Task", "Dataset", "Direction", ...visibleModels.map((model) => model.label)];
    const lines = [header.map(csvEscape).join(",")];

    tasks.forEach((task) => {
      task.datasets.forEach((dataset) => {
        const row = [task.key, dataset.name, task.directionLabel];
        visibleModels.forEach((model) => {
          row.push(csvValue(dataset.values[model.key]));
        });
        lines.push(row.map(csvEscape).join(","));
      });
    });

    return lines.join("\n");
  }

  function compareNullableNumbers(valueA, valueB, ascending) {
    if (valueA == null && valueB == null) {
      return 0;
    }
    if (valueA == null) {
      return 1;
    }
    if (valueB == null) {
      return -1;
    }

    return ascending ? valueA - valueB : valueB - valueA;
  }

  function csvValue(value) {
    return value == null ? "" : String(Number(value.toFixed(4)));
  }

  function formatNumber(value) {
    return value == null ? "—" : numberFormatter.format(value);
  }

  function triggerCsvDownload(content, fileName) {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function csvEscape(value) {
    const raw = value == null ? "" : String(value);
    if (raw.includes(",") || raw.includes('"') || raw.includes("\n")) {
      return `"${raw.replace(/"/g, '""')}"`;
    }
    return raw;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function attachSelectDecorators(selectElement, choicesInstance) {
    if (!selectElement) return;
    const container = selectElement.closest(".choices");
    if (!container || container.dataset.hasDecorators === "true") {
      return;
    }
    container.dataset.hasDecorators = "true";

    const caret = document.createElement("span");
    caret.className = "select-caret-indicator";
    caret.setAttribute("aria-hidden", "true");
    caret.textContent = "▾";

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "select-clear-button";
    clearButton.setAttribute("aria-label", "Clear selection");
    clearButton.textContent = "✕";

    clearButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (choicesInstance && typeof choicesInstance.removeActiveItems === "function") {
        choicesInstance.removeActiveItems();
      } else if (selectElement.options) {
        Array.from(selectElement.options).forEach((option) => {
          option.selected = false;
        });
      }
      selectElement.dispatchEvent(new Event("change", { bubbles: true }));
    });

    container.appendChild(caret);
    container.appendChild(clearButton);
  }

  function initSortableTable(table, firstDataColIndex, headerOffset) {
    const tbody = table.querySelector("tbody");
    if (!tbody) {
      return;
    }

    const originalRows = Array.from(tbody.querySelectorAll("tr"));
    let currentSort = { colIndex: null, direction: "none" };

    function restoreOriginalOrder() {
      originalRows.forEach((row) => tbody.appendChild(row));
    }

    function getCellValue(row, colIndex) {
      const cell = row.children[colIndex];
      if (!cell) return "";
      return cell.textContent.trim();
    }

    function sortByColumn(colIndex, direction) {
      const rows = Array.from(tbody.querySelectorAll("tr"));
      const sorted = rows.slice().sort((a, b) => {
        const aText = getCellValue(a, colIndex);
        const bText = getCellValue(b, colIndex);
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        const aIsNum = !Number.isNaN(aNum);
        const bIsNum = !Number.isNaN(bNum);
        let cmp = 0;
        if (aIsNum && bIsNum) {
          cmp = aNum - bNum;
        } else {
          cmp = aText.localeCompare(bText, undefined, { numeric: true, sensitivity: "base" });
        }
        return direction === "asc" ? cmp : -cmp;
      });

      sorted.forEach((row) => tbody.appendChild(row));
    }

    function clearSortIndicators() {
      const headers = table.querySelectorAll("thead th[data-sort-state]");
      headers.forEach((th) => {
        th.removeAttribute("data-sort-state");
        th.classList.remove("sort-asc", "sort-desc");
      });
    }

    const headerRows = table.querySelectorAll("thead tr");
    if (!headerRows.length) {
      return;
    }
    const metricHeaderRow = headerRows[headerRows.length - 1];
    const headerCells = metricHeaderRow.querySelectorAll("th");
    const metricHeaders = Array.from(headerCells).slice(headerOffset);

    metricHeaders.forEach((th, index) => {
      const colIndex = firstDataColIndex + index;
      th.style.cursor = "pointer";
      th.setAttribute("data-col-index", String(colIndex));
      th.setAttribute("data-sort-state", "none");

      th.addEventListener("click", () => {
        const currentCol = currentSort.colIndex;
        const currentDir = currentSort.direction;
        let nextDir;

        if (currentCol !== colIndex || currentDir === "none") {
          nextDir = "asc";
        } else if (currentDir === "asc") {
          nextDir = "desc";
        } else {
          nextDir = "none";
        }

        currentSort.colIndex = colIndex;
        currentSort.direction = nextDir;

        clearSortIndicators();

        if (nextDir === "none") {
          restoreOriginalOrder();
        } else {
          sortByColumn(colIndex, nextDir);
          th.setAttribute("data-sort-state", nextDir);
          th.classList.add(nextDir === "asc" ? "sort-asc" : "sort-desc");
        }
      });
    });
  }

  // 通用：点击“行表头”（某一列的单元格，如 Dataset），按该行的值对所有模型列进行排序
  function initRowHeaderColumnSorter(table, options) {
    const { rowHeaderColIndex, firstModelColIndex } = options;
    const tbody = table.querySelector("tbody");
    const thead = table.querySelector("thead");
    if (!tbody || !thead) {
      return;
    }

    const headerRow = thead.querySelector("tr:last-child");
    if (!headerRow) {
      return;
    }

    const modelCount = headerRow.children.length - firstModelColIndex;
    if (modelCount <= 0) {
      return;
    }

    // 记录初始列顺序的“模型标识”（这里用表头文本作为标识）
    const initialHeaderCells = Array.from(headerRow.children).slice(firstModelColIndex);
    const originalModelIds = initialHeaderCells.map((cell) => cell.textContent.trim());

    let currentSort = { rowIndex: null, direction: "none" };

    const bodyRows = Array.from(tbody.querySelectorAll("tr"));

    function applyColumnOrder(order) {
      // 重排表头中模型列
      const headerRows = thead.querySelectorAll("tr");
      headerRows.forEach((row) => {
        const cells = Array.from(row.children);
        if (cells.length <= firstModelColIndex) {
          return;
        }
        const modelCells = cells.slice(firstModelColIndex);
        order.forEach((idx) => {
          const cell = modelCells[idx];
          if (cell) {
            row.appendChild(cell);
          }
        });
      });

      // 重排每一行中模型列
      bodyRows.forEach((row) => {
        const cells = Array.from(row.children);
        if (cells.length <= firstModelColIndex) {
          return;
        }
        const rowHeaderCell = cells[rowHeaderColIndex];
        const modelCells = cells.slice(firstModelColIndex);
        order.forEach((idx) => {
          const cell = modelCells[idx];
          if (cell) {
            row.appendChild(cell);
          }
        });
        // 确保行表头仍在原位置
        if (rowHeaderCell && row.children[rowHeaderColIndex] !== rowHeaderCell) {
          row.insertBefore(rowHeaderCell, row.children[rowHeaderColIndex]);
        }
      });
    }

    function clearRowSortIndicators() {
      bodyRows.forEach((row) => {
        const cell = row.children[rowHeaderColIndex];
        if (cell) {
          cell.removeAttribute("data-sort-state");
        }
      });
    }

    bodyRows.forEach((row, rowIndex) => {
      const headerCell = row.children[rowHeaderColIndex];
      if (!headerCell) {
        return;
      }

      headerCell.style.cursor = "pointer";
      headerCell.setAttribute("data-sort-state", "none");

      headerCell.addEventListener("click", () => {
        const isSameRow = currentSort.rowIndex === rowIndex;
        const currentDir = currentSort.direction;
        let nextDir;

        if (!isSameRow || currentDir === "none") {
          nextDir = "asc";
        } else if (currentDir === "asc") {
          nextDir = "desc";
        } else {
          nextDir = "none";
        }

        currentSort = { rowIndex, direction: nextDir };

        clearRowSortIndicators();

        if (nextDir === "none") {
          // 还原：根据初始的模型标识顺序，重新计算当前列顺序的索引映射
          const headerModelCells = Array.from(headerRow.children).slice(firstModelColIndex);
          const idToCurrentIndex = new Map();
          headerModelCells.forEach((cell, index) => {
            idToCurrentIndex.set(cell.textContent.trim(), index);
          });

          const restoreOrder = originalModelIds
            .map((id) => idToCurrentIndex.get(id))
            .filter((index) => index != null);

          applyColumnOrder(restoreOrder);
        } else {
          const modelCellsInRow = Array.from(row.children).slice(firstModelColIndex);
          const values = modelCellsInRow.map((cell, index) => {
            const text = cell.textContent.trim();
            const num = parseFloat(text);
            return {
              index,
              text,
              value: Number.isNaN(num) ? null : num,
            };
          });

          const sorted = values.slice().sort((a, b) => {
            const aVal = a.value;
            const bVal = b.value;
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;
            const cmp = aVal - bVal;
            return nextDir === "asc" ? cmp : -cmp;
          });

          const order = sorted.map((entry) => entry.index);
          applyColumnOrder(order);
        }

        if (nextDir !== "none") {
          headerCell.setAttribute("data-sort-state", nextDir);
        }
      });
    });
  }
})();
