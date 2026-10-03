const rtlLanguages = new Set([
  "ar", "ckb", "dv", "fa", "he", "ks", "ku", "nqo", "ps", "sd", "ug", "ur", "yi"
]);
const rtlScripts = new Set(["adlm", "arab", "hebr", "nkoo", "rohg", "syrc", "thaa"]);
const documentElement = document.documentElement;
const bootstrapStylesheet = document.getElementById("bootstrap-stylesheet");

function isRightToLeft(language) {
  const subtags = language.toLowerCase().split("-");
  const script = subtags.find((subtag) => /^[a-z]{4}$/.test(subtag));

  if (script) {
    return rtlScripts.has(script);
  }

  return rtlLanguages.has(subtags[0]);
}

function applyLanguageDirection(language) {
  const isRtl = isRightToLeft(language);
  documentElement.dir = isRtl ? "rtl" : "ltr";
  bootstrapStylesheet.href = isRtl
    ? bootstrapStylesheet.dataset.rtlHref
    : bootstrapStylesheet.dataset.ltrHref;
}

applyLanguageDirection(navigator.language || documentElement.lang);

new MutationObserver(() => {
  applyLanguageDirection(documentElement.lang || navigator.language);
}).observe(documentElement, {
  attributes: true,
  attributeFilter: ["lang"]
});

window.addEventListener("languagechange", () => {
  applyLanguageDirection(navigator.language || documentElement.lang);
});
