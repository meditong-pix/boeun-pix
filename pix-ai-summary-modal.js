(function (global) {
  "use strict";
  if (typeof global.openPixAiSummaryPage === "function") return;
  global.openPixAiSummaryPage = function (variant, opts) {
    if (variant === "survey" && typeof global.openPxSurveyAiModal === "function") {
      global.openPxSurveyAiModal();
      return;
    }
    if (variant === "voc" && typeof global.openVocAiModal === "function") {
      global.openVocAiModal();
      return;
    }
    try {
      global.dispatchEvent(new CustomEvent("pix-ai-modal-request", {
        detail: { variant: variant || "survey", mode: "analysis", opts: opts || {} }
      }));
    } catch (_e) {}
  };
})(typeof window !== "undefined" ? window : global);
