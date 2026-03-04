import { MODEL_PERFORMANCE } from "./performance.js";

const MOBILE_MEDIA = window.matchMedia("(max-width: 768px)");

let overlayEl;
let panelEl;
let headerEl;
let bodyEl;
let closeButtonEl;
let currentTrigger = null;
let currentModelKey = null;
let activeTab = "track1";

document.addEventListener("DOMContentLoaded", () => {
  initPerformanceUI();
});

function initPerformanceUI() {
  const triggers = Array.from(document.querySelectorAll(".performance-trigger[data-performance-model]"));
  if (!triggers.length) {
    return;
  }

  createOverlay();

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modelKey = trigger.dataset.performanceModel;
      if (!MODEL_PERFORMANCE[modelKey]) {
        return;
      }
      openPanel(modelKey, trigger);
    });
  });

  overlayEl.addEventListener("click", (event) => {
    if (event.target.closest("[data-performance-close]")) {
      closePanel();
      return;
    }

    const anchor = event.target.closest(".perf-anchor-links a");
    if (anchor) {
      closePanel();
    }
  });

  panelEl.addEventListener("click", (event) => {
    const tabBtn = event.target.closest("button[data-perf-tab]");
    if (!tabBtn || !currentModelKey) {
      return;
    }
    activeTab = tabBtn.dataset.perfTab;
    renderPanel(MODEL_PERFORMANCE[currentModelKey]);
  });

  document.addEventListener("keydown", (event) => {
    if (!overlayOpen()) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closePanel();
      return;
    }

    if (event.key === "Tab") {
      trapFocus(event);
    }
  });

  window.addEventListener("resize", () => {
    if (overlayOpen() && currentTrigger) {
      positionPanel(currentTrigger);
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      if (overlayOpen() && currentTrigger && !MOBILE_MEDIA.matches) {
        positionPanel(currentTrigger);
      }
    },
    true
  );
}

function createOverlay() {
  overlayEl = document.createElement("div");
  overlayEl.className = "perf-overlay is-hidden";
  overlayEl.innerHTML = `
    <div class="perf-backdrop" data-performance-close="backdrop"></div>
    <section class="perf-panel" role="dialog" aria-modal="true" aria-labelledby="perf-panel-title">
      <div class="perf-scroll">
        <header class="perf-header"></header>
        <div class="perf-body"></div>
        <footer class="perf-footer">
          ↓ lower is better / ↑ higher is better.
        </footer>
      </div>
    </section>
  `;

  document.body.appendChild(overlayEl);

  panelEl = overlayEl.querySelector(".perf-panel");
  headerEl = overlayEl.querySelector(".perf-header");
  bodyEl = overlayEl.querySelector(".perf-body");
}

function openPanel(modelKey, trigger) {
  const modelData = MODEL_PERFORMANCE[modelKey];
  if (!modelData) {
    return;
  }

  currentModelKey = modelKey;
  currentTrigger = trigger;
  activeTab = chooseDefaultTab(modelData);

  document.querySelectorAll(".performance-trigger[aria-expanded='true']").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
  trigger.setAttribute("aria-expanded", "true");

  renderPanel(modelData);
  overlayEl.classList.remove("is-hidden");
  document.body.style.overflow = "hidden";
  positionPanel(trigger);

  setTimeout(() => {
    closeButtonEl?.focus();
  }, 0);
}

function closePanel() {
  if (!overlayOpen()) {
    return;
  }

  overlayEl.classList.add("is-hidden");
  document.body.style.overflow = "";
  if (currentTrigger) {
    currentTrigger.setAttribute("aria-expanded", "false");
    currentTrigger.focus();
  }
  currentModelKey = null;
  currentTrigger = null;
}

function overlayOpen() {
  return overlayEl && !overlayEl.classList.contains("is-hidden");
}

function chooseDefaultTab(modelData) {
  if (modelData.track1 && modelData.track2) {
    return "track1";
  }
  if (modelData.track1) {
    return "track1";
  }
  if (modelData.track2) {
    return "track2";
  }
  if (modelData.track3) {
    return "track3";
  }
  return "track1";
}

function renderPanel(modelData) {
  headerEl.innerHTML = buildHeader(modelData);
  bodyEl.innerHTML = buildBody(modelData);
  closeButtonEl = headerEl.querySelector(".perf-close-btn");
}

function buildHeader(modelData) {
  const coverage = (modelData.coverage || [])
    .map((label) => `<span class="perf-coverage-badge">${escapeHtml(label)}</span>`)
    .join("");

  return `
    <div class="perf-header-main">
      <div class="perf-title-group">
        <h3 id="perf-panel-title">${escapeHtml(modelData.displayName)}</h3>
        <div class="perf-coverage">${coverage}</div>
      </div>
      <div class="perf-header-actions">
        <button type="button" class="perf-close-btn" data-performance-close="button" aria-label="Close performance panel">
          Close
        </button>
      </div>
    </div>
  `;
}

function buildBody(modelData) {
  if (currentModelKey === "FireRedASR-LLM") {
    return `
      <section class="perf-section">
        <h4>Stress Tests</h4>
        ${renderStressGrid(modelData.track1?.stressors || [])}
        <div class="perf-note-block">
          <strong>Notes</strong>
          <p>ContextASR uses hotword injection for RPS (left value in paper).</p>
        </div>
      </section>
    `;
  }

  if (currentModelKey === "Kimi-Audio") {
    const tabButtons = `
      <div class="perf-tabs" role="tablist" aria-label="Kimi-Audio performance tabs">
        <button
          type="button"
          class="perf-tab ${activeTab === "track1" ? "is-active" : ""}"
          data-perf-tab="track1"
          role="tab"
          aria-selected="${activeTab === "track1" ? "true" : "false"}"
        >
          Stress Tests
        </button>
        <button
          type="button"
          class="perf-tab ${activeTab === "track2" ? "is-active" : ""}"
          data-perf-tab="track2"
          role="tab"
          aria-selected="${activeTab === "track2" ? "true" : "false"}"
        >
          Tasks
        </button>
      </div>
    `;

    const tabPanel =
      activeTab === "track1"
        ? `
            <section class="perf-section" role="tabpanel">
              ${renderStressGrid(modelData.track1?.stressors || [])}
            </section>
          `
        : `
            <section class="perf-section" role="tabpanel">
              ${renderTaskFirstList(modelData.track2?.tasks || {})}
            </section>
          `;

    return `${tabButtons}${tabPanel}`;
  }

  if (currentModelKey === "Qwen3-Omni") {
    const taskChips = Object.keys(modelData.track2?.tasks || {})
      .map((taskName) => `<span class="perf-task-chip">${escapeHtml(taskName)}</span>`)
      .join("");

    return `
      <section class="perf-section">
        <h4>Task</h4>
        <div class="perf-task-chip-strip">${taskChips}</div>
        ${renderTaskFirstList(modelData.track2?.tasks || {})}
      </section>
    `;
  }

  if (currentModelKey === "Qwen2-audio") {
    return `
      <section class="perf-section">
        <h4>Controlled Training Coverage</h4>
        ${renderTrack3Grid(modelData.track3?.metrics || {})}
      </section>
    `;
  }

  return `<section class="perf-section"><p>No performance panel configured.</p></section>`;
}

function renderStressGrid(stressors) {
  if (!stressors.length) {
    return '<p class="perf-empty">No stress-test entries available.</p>';
  }

  return `
    <div class="perf-stressor-grid">
      ${stressors
        .map((item) => {
          const highlight = item.rps === 1 ? "is-top-rps" : "";
          return `
            <article class="perf-stressor-tile ${highlight}">
              <div class="perf-stressor-head">
                <span class="perf-stressor-name">${escapeHtml(item.group)}</span>
                <span class="perf-metric-tag">${escapeHtml(item.metric)}</span>
              </div>
              <p class="perf-stressor-dataset">${escapeHtml(item.dataset)}</p>
              <div class="perf-stressor-values">
                <div class="perf-raw">
                  <span class="label">Raw</span>
                  <strong>${formatValue(item.raw)}</strong>
                </div>
                <div class="perf-rps">
                  <span class="label">RPS</span>
                  <span class="perf-rps-badge">${formatValue(item.rps)}</span>
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderTaskFirstList(tasks) {
  const order = ["ASR", "GR", "S2TT", "SER", "SLU"];
  const blocks = order
    .filter((taskKey) => tasks[taskKey])
    .map((taskKey) => {
      const task = tasks[taskKey];
      const chips = (task.datasets || [])
        .map((dataset) => {
          return `
            <div class="perf-dataset-chip">
              <span class="name">${escapeHtml(dataset.name)}</span>
              <span class="value">${formatValue(dataset.value)}</span>
            </div>
          `;
        })
        .join("");

      return `
        <article class="perf-task-block">
          <h5>${escapeHtml(taskKey)} (${escapeHtml(task.direction)})</h5>
          <div class="perf-dataset-chip-list">${chips}</div>
        </article>
      `;
    })
    .join("");

  return blocks || '<p class="perf-empty">No task metrics available.</p>';
}

function renderTrack3Grid(metrics) {
  const order = ["ASR", "GR", "S2TT", "SER", "SLU"];
  const tiles = order
    .filter((metricName) => metrics[metricName])
    .map((metricName) => {
      const metric = metrics[metricName];
      const directionClass = metric.direction === "↓" ? "down" : "up";
      const pairLabels = (metric.sublabel || "")
        .split("/")
        .map((segment) => segment.trim())
        .filter(Boolean);

      let valueArea = "";
      if (Array.isArray(metric.valuePair)) {
        valueArea = `
          <div class="perf-pair-values">
            <div class="pair-item">
              <span class="pair-label">${escapeHtml(pairLabels[0] || "A")}</span>
              <strong>${formatValue(metric.valuePair[0])}</strong>
            </div>
            <div class="pair-sep">/</div>
            <div class="pair-item">
              <span class="pair-label">${escapeHtml(pairLabels[1] || "B")}</span>
              <strong>${formatValue(metric.valuePair[1])}</strong>
            </div>
          </div>
        `;
      } else {
        valueArea = `<div class="perf-single-value"><strong>${formatValue(metric.value)}</strong></div>`;
      }

      return `
        <article class="perf-track3-tile">
          <div class="perf-track3-head">
            <span class="name">${escapeHtml(metric.label || metricName)}</span>
            <span class="perf-dir-badge ${directionClass}">${escapeHtml(metric.direction || "")}</span>
          </div>
          ${metric.sublabel ? `<p class="perf-track3-sublabel">${escapeHtml(metric.sublabel)}</p>` : ""}
          ${valueArea}
        </article>
      `;
    })
    .join("");

  return `<div class="perf-track3-grid">${tiles}</div>`;
}

function positionPanel(trigger) {
  if (!panelEl || !trigger) {
    return;
  }

  panelEl.style.removeProperty("left");
  panelEl.style.removeProperty("top");
  panelEl.style.removeProperty("width");

  if (MOBILE_MEDIA.matches) {
    return;
  }

  const rect = trigger.getBoundingClientRect();
  const width = Math.min(480, window.innerWidth - 24);
  let left = rect.left;
  if (left + width > window.innerWidth - 12) {
    left = window.innerWidth - width - 12;
  }
  if (left < 12) {
    left = 12;
  }

  const preferredTop = rect.bottom + 8;
  const panelHeightHint = Math.min(window.innerHeight * 0.7, 540);
  let top = preferredTop;
  if (top + panelHeightHint > window.innerHeight - 12) {
    top = Math.max(12, rect.top - panelHeightHint - 8);
  }

  panelEl.style.width = `${width}px`;
  panelEl.style.left = `${left}px`;
  panelEl.style.top = `${top}px`;
}

function trapFocus(event) {
  const focusable = getFocusableElements(panelEl);
  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function getFocusableElements(container) {
  if (!container) {
    return [];
  }
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => !el.hasAttribute("hidden"));
}

function formatValue(value) {
  if (value == null || Number.isNaN(value)) {
    return "—";
  }
  return Number(value).toFixed(2);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
