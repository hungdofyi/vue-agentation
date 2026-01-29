import { defineComponent as be, computed as V, ref as k, onMounted as ue, nextTick as ze, onUnmounted as he, openBlock as E, createElementBlock as D, normalizeStyle as Q, normalizeClass as te, createElementVNode as m, toDisplayString as ee, createCommentVNode as X, withDirectives as He, vModelText as qe, createTextVNode as pe, createVNode as je, Transition as Ye, withCtx as Ve, withModifiers as Se, readonly as G, createBlock as ce, Teleport as We, unref as g, Fragment as _e, renderList as Ee } from "vue";
const Le = {
  single: {
    primary: "#3b82f6",
    // blue-500
    primaryHover: "#2563eb",
    // blue-600
    markerShape: "circle",
    borderStyle: "solid"
  },
  group: {
    primary: "#f97316",
    // orange-500
    primaryHover: "#ea580c",
    // orange-600
    markerShape: "diamond",
    borderStyle: "dashed"
  }
}, Oe = ["aria-label"], Re = { class: "agentation-popup__header" }, Ue = { class: "agentation-popup__header-content" }, Xe = { class: "agentation-popup__header-title" }, Ge = {
  key: 0,
  class: "agentation-popup__header-selected"
}, Ke = { class: "agentation-popup__body" }, Ze = {
  key: 0,
  style: { "margin-top": "0.5rem" }
}, Je = {
  key: 0,
  class: "agentation-popup__styles-pre"
}, Qe = { class: "agentation-popup__footer" }, et = { class: "agentation-popup__actions" }, tt = /* @__PURE__ */ be({
  __name: "AnnotationPopup",
  props: {
    element: {},
    x: {},
    y: {},
    selectedText: {},
    initialValue: { default: "" },
    submitLabel: { default: "Add" },
    accentColor: { default: "#3b82f6" },
    dark: { type: Boolean, default: !1 },
    computedStyles: {},
    isMultiSelect: { type: Boolean, default: !1 }
  },
  emits: ["submit", "cancel"],
  setup(e, { expose: t, emit: n }) {
    const o = V(() => e.isMultiSelect ? Le.group.primary : e.accentColor), l = n, u = k(e.initialValue), h = k(null), S = k(!1), b = k(!1), B = k("initial"), W = V(() => {
      let F = e.x, q = e.y + 20;
      return typeof window < "u" && (F + 320 > window.innerWidth - 16 && (F = window.innerWidth - 320 - 16), F < 16 && (F = 16), q + 200 > window.innerHeight - 16 && (q = e.y - 200 - 10), q < 16 && (q = 16)), {
        left: `${F}px`,
        top: `${q}px`
      };
    });
    function O() {
      const s = u.value.trim();
      if (!s) {
        z();
        return;
      }
      l("submit", s);
    }
    function R() {
      B.value = "exit", setTimeout(() => {
        l("cancel");
      }, 150);
    }
    function z() {
      S.value = !0, setTimeout(() => {
        S.value = !1;
      }, 500);
    }
    function M(s) {
      s.key === "Enter" && (s.metaKey || s.ctrlKey) ? (s.preventDefault(), O()) : s.key === "Escape" && (s.preventDefault(), R());
    }
    ue(() => {
      B.value = "enter", ze(() => {
        var s;
        B.value = "entered", (s = h.value) == null || s.focus();
      });
    });
    function I(s) {
      s.key === "Escape" && R();
    }
    return ue(() => {
      document.addEventListener("keydown", I);
    }), he(() => {
      document.removeEventListener("keydown", I);
    }), t({ shake: z }), (s, $) => (E(), D("div", {
      class: te(["agentation-popup", [
        e.dark ? "agentation-popup--dark" : "",
        S.value && "agentation-animate-shake",
        B.value === "initial" && "agentation-popup--entering",
        B.value === "enter" && "agentation-popup--entering",
        B.value === "entered" && "agentation-popup--entered",
        B.value === "exit" && "agentation-popup--exiting"
      ]]),
      style: Q(W.value),
      "data-agentation-ignore": "",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": `Add annotation for ${e.element}`
    }, [
      m("div", Re, [
        m("div", Ue, [
          m("div", {
            class: te(["agentation-popup__header-dot", e.isMultiSelect && "agentation-popup__header-dot--diamond"]),
            style: Q({ backgroundColor: o.value })
          }, null, 6),
          m("span", Xe, ee(e.element), 1)
        ]),
        e.selectedText ? (E(), D("p", Ge, ' "' + ee(e.selectedText) + '" ', 1)) : X("", !0)
      ]),
      m("div", Ke, [
        He(m("textarea", {
          ref_key: "textareaRef",
          ref: h,
          "onUpdate:modelValue": $[0] || ($[0] = (P) => u.value = P),
          class: "agentation-popup__textarea",
          placeholder: "Add your comment...",
          onKeydown: M
        }, null, 544), [
          [qe, u.value]
        ]),
        e.computedStyles ? (E(), D("div", Ze, [
          m("button", {
            type: "button",
            class: "agentation-popup__styles-toggle",
            onClick: $[1] || ($[1] = (P) => b.value = !b.value)
          }, [
            (E(), D("svg", {
              class: te(["agentation-popup__styles-icon", b.value && "agentation-popup__styles-icon--open"]),
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [...$[2] || ($[2] = [
              m("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M9 5l7 7-7 7"
              }, null, -1)
            ])], 2)),
            $[3] || ($[3] = pe(" Computed styles ", -1))
          ]),
          b.value ? (E(), D("pre", Je, ee(e.computedStyles), 1)) : X("", !0)
        ])) : X("", !0)
      ]),
      m("div", Qe, [
        $[4] || ($[4] = m("span", { class: "agentation-popup__shortcut" }, [
          m("kbd", { class: "agentation-popup__kbd" }, "⌘"),
          pe(" + "),
          m("kbd", { class: "agentation-popup__kbd" }, "Enter"),
          pe(" to submit ")
        ], -1)),
        m("div", et, [
          m("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--cancel",
            onClick: R
          }, " Cancel "),
          m("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--submit",
            style: Q({ backgroundColor: o.value }),
            onClick: O
          }, ee(e.submitLabel), 5)
        ])
      ])
    ], 14, Oe));
  }
}), nt = { class: "agentation-marker__tooltip-header" }, ot = { class: "agentation-marker__tooltip-content" }, it = { class: "agentation-marker__tooltip-title" }, at = { class: "agentation-marker__tooltip-path" }, lt = { class: "agentation-marker__tooltip-actions" }, st = { class: "agentation-marker__tooltip-body" }, rt = { class: "agentation-marker__tooltip-comment" }, ut = {
  key: 0,
  class: "agentation-marker__tooltip-selected-text"
}, ct = { class: "agentation-marker__tooltip-footer" }, dt = /* @__PURE__ */ be({
  __name: "AnnotationMarker",
  props: {
    annotation: {},
    index: {},
    dark: { type: Boolean, default: !1 },
    accentColor: { default: "#3b82f6" },
    isHovered: { type: Boolean, default: !1 }
  },
  emits: ["click", "delete", "edit", "mouseenter", "mouseleave"],
  setup(e, { emit: t }) {
    const n = V(() => e.annotation.isMultiSelect === !0), o = V(() => n.value ? Le.group.primary : e.accentColor), l = t, u = k(!1), h = k("initial"), S = V(() => {
      const M = {
        left: `${e.annotation.x}%`
      };
      return e.annotation.isFixed ? M.top = `${e.annotation.y}px` : M.top = `${e.annotation.y}px`, M;
    }), b = V(() => e.annotation.x > 70 ? "left" : "right");
    function B(M) {
      M.stopPropagation(), l("click", e.annotation);
    }
    function W(M) {
      M.stopPropagation(), h.value = "exit", setTimeout(() => {
        l("delete", e.annotation);
      }, 200);
    }
    function O(M) {
      M.stopPropagation(), l("edit", e.annotation);
    }
    function R() {
      u.value = !0, l("mouseenter", e.annotation);
    }
    function z() {
      u.value = !1, l("mouseleave", e.annotation);
    }
    return ue(() => {
      h.value = "enter", requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          h.value = "entered";
        });
      });
    }), (M, I) => (E(), D("div", {
      class: te(["agentation-marker", [
        e.annotation.isFixed ? "agentation-marker--fixed" : "agentation-marker--absolute",
        n.value && "agentation-marker--diamond",
        h.value === "initial" && "agentation-marker--entering",
        h.value === "enter" && "agentation-marker--entering",
        h.value === "entered" && "agentation-marker--entered",
        h.value === "exit" && "agentation-marker--exiting"
      ]]),
      style: Q(S.value),
      "data-agentation-ignore": "",
      onMouseenter: R,
      onMouseleave: z,
      onClick: B
    }, [
      m("div", {
        class: te(["agentation-marker__dot", [e.isHovered && "agentation-marker__dot--hovered"]]),
        style: Q({ backgroundColor: o.value })
      }, [
        m("span", {
          class: te(n.value && "agentation-marker__dot-content")
        }, ee(e.index + 1), 3),
        m("div", {
          class: "agentation-marker__ping agentation-animate-ping",
          style: Q({ backgroundColor: o.value })
        }, null, 4)
      ], 6),
      je(Ye, {
        "enter-active-class": "agentation-transition-enter-active",
        "enter-from-class": "agentation-transition-enter",
        "enter-to-class": "agentation-transition-enter-to",
        "leave-active-class": "agentation-transition-leave-active",
        "leave-from-class": "agentation-transition-leave",
        "leave-to-class": "agentation-transition-leave-to"
      }, {
        default: Ve(() => [
          u.value ? (E(), D("div", {
            key: 0,
            class: te(["agentation-marker__tooltip", [
              e.dark ? "agentation-marker__tooltip--dark" : "",
              b.value === "left" ? "agentation-marker__tooltip--left" : "agentation-marker__tooltip--right"
            ]]),
            onClick: I[0] || (I[0] = Se(() => {
            }, ["stop"]))
          }, [
            m("div", nt, [
              m("div", ot, [
                m("span", it, ee(e.annotation.element), 1),
                m("p", at, ee(e.annotation.elementPath), 1)
              ]),
              m("div", lt, [
                m("button", {
                  type: "button",
                  class: "agentation-marker__tooltip-action",
                  title: "Edit annotation",
                  onClick: Se(O, ["stop"])
                }, [...I[1] || (I[1] = [
                  m("svg", {
                    class: "agentation-marker__tooltip-action-icon",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    m("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    })
                  ], -1)
                ])]),
                m("button", {
                  type: "button",
                  class: "agentation-marker__tooltip-action",
                  title: "Delete annotation",
                  onClick: W
                }, [...I[2] || (I[2] = [
                  m("svg", {
                    class: "agentation-marker__tooltip-action-icon",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    m("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ], -1)
                ])])
              ])
            ]),
            m("div", st, [
              m("p", rt, ee(e.annotation.comment), 1),
              e.annotation.selectedText ? (E(), D("p", ut, ' "' + ee(e.annotation.selectedText) + '" ', 1)) : X("", !0)
            ]),
            m("div", ct, ee(new Date(e.annotation.timestamp).toLocaleString()), 1)
          ], 2)) : X("", !0)
        ]),
        _: 1
      })
    ], 38));
  }
}), mt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, l] of t)
    n[o] = l;
  return n;
}, Ae = /* @__PURE__ */ mt(dt, [["__scopeId", "data-v-fcfdd06d"]]), ft = "agentation-annotations-", Be = "agentation-settings", ht = 7;
function we(e) {
  return `${ft}${e}`;
}
function ge() {
  if (typeof window > "u") return "/";
  const e = window.location.hash;
  return e && e.startsWith("#/") ? e.slice(1) : window.location.pathname;
}
function Me(e) {
  if (typeof window > "u") return [];
  try {
    const t = localStorage.getItem(we(e));
    if (!t) return [];
    const n = JSON.parse(t), o = Date.now() - ht * 24 * 60 * 60 * 1e3;
    return n.filter(
      (l) => !l.timestamp || l.timestamp > o
    );
  } catch {
    return [];
  }
}
function ve(e, t) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(we(e), JSON.stringify(t));
    } catch {
    }
}
function pt(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.removeItem(we(e));
    } catch {
    }
}
function Rt() {
  if (typeof window > "u") return null;
  try {
    const e = localStorage.getItem(Be);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
}
function Ut(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(Be, JSON.stringify(e));
    } catch {
    }
}
function gt() {
  if (typeof window > "u") return null;
  try {
    const e = localStorage.getItem("agentation-theme");
    return e === "light" || e === "dark" ? e : null;
  } catch {
    return null;
  }
}
function Te(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem("agentation-theme", e);
    } catch {
    }
}
let fe = null;
function vt() {
  const e = k([]), t = k(null), n = k(null), o = k("");
  function l(s) {
    o.value = s, e.value = Me(s);
  }
  function u(s) {
    o.value = s, e.value = Me(s), t.value = null, n.value = null;
  }
  function h(s, $) {
    const P = {
      id: crypto.randomUUID(),
      x: s.x,
      y: s.y,
      comment: $,
      element: s.element,
      elementPath: s.elementPath,
      timestamp: Date.now(),
      selectedText: s.selectedText,
      boundingBox: s.boundingBox,
      nearbyText: s.nearbyText,
      cssClasses: s.cssClasses,
      nearbyElements: s.nearbyElements,
      computedStyles: s.computedStyles,
      fullPath: s.fullPath,
      accessibility: s.accessibility,
      isFixed: s.isFixed,
      // Group selection fields
      isMultiSelect: s.isMultiSelect,
      elements: s.elements,
      groupBoundingBox: s.groupBoundingBox,
      totalElementCount: s.totalElementCount
    };
    return e.value = [...e.value, P], ve(o.value, e.value), t.value = null, P;
  }
  function S(s) {
    const $ = e.value.find((P) => P.id === s);
    return $ ? (e.value = e.value.filter((P) => P.id !== s), ve(o.value, e.value), $) : null;
  }
  function b(s, $) {
    const P = e.value.findIndex((q) => q.id === s);
    if (P === -1) return null;
    const F = { ...e.value[P], comment: $ };
    return e.value = [
      ...e.value.slice(0, P),
      F,
      ...e.value.slice(P + 1)
    ], ve(o.value, e.value), n.value = null, F;
  }
  function B() {
    e.value = [], pt(o.value);
  }
  function W(s) {
    t.value = s;
  }
  function O(s) {
    n.value = s;
  }
  function R(s) {
    return e.value.find(($) => $.id === s);
  }
  function z(s) {
    return e.value.findIndex(($) => $.id === s);
  }
  const M = V(() => e.value.length), I = V(() => e.value.length === 0);
  return {
    annotations: G(e),
    pendingAnnotation: G(t),
    editingAnnotationId: G(n),
    count: M,
    isEmpty: I,
    initialize: l,
    switchPath: u,
    add: h,
    remove: S,
    update: b,
    clear: B,
    setPending: W,
    setEditing: O,
    getById: R,
    getIndex: z
  };
}
function yt() {
  return fe || (fe = vt()), fe;
}
function Xt() {
  fe = null;
}
function xt(e, t = 3) {
  const n = [];
  let o = e, l = 0;
  for (; o && o !== document.body && l < t; ) {
    let u = o.tagName.toLowerCase();
    if (o.id)
      u += `#${o.id}`;
    else if (o.classList.length > 0) {
      const h = Array.from(o.classList).find(
        (S) => !S.match(/^_/) && !S.match(/[A-Za-z]+_[a-z0-9]{5,}/)
      );
      h && (u += `.${h}`);
    }
    n.unshift(u), o = o.parentElement, l++;
  }
  return n.join(" > ");
}
function bt(e) {
  const t = [];
  let n = e;
  for (; n && n !== document.documentElement; ) {
    let o = n.tagName.toLowerCase();
    if (n.id)
      o += `#${n.id}`;
    else {
      const l = n.parentElement;
      if (l) {
        const u = Array.from(l.children).filter(
          (h) => h.tagName === n.tagName
        );
        if (u.length > 1) {
          const h = u.indexOf(n) + 1;
          o += `:nth-of-type(${h})`;
        }
      }
    }
    t.unshift(o), n = n.parentElement;
  }
  return t.join(" > ");
}
function de(e) {
  var o, l, u, h, S, b, B, W, O, R, z, M, I, s, $, P, F, q, K, U, oe, Z, J, ae, H, ne;
  const t = xt(e), n = e.tagName.toLowerCase();
  if (e instanceof SVGElement || e.closest("svg")) {
    const i = e.closest("svg"), v = (o = i == null ? void 0 : i.querySelector("title")) == null ? void 0 : o.textContent, N = i == null ? void 0 : i.getAttribute("aria-label");
    return {
      name: v || N || "SVG graphic",
      path: t
    };
  }
  if (n === "button" || e.getAttribute("role") === "button")
    return { name: `Button: "${((l = e.textContent) == null ? void 0 : l.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Button"}"`, path: t };
  if (n === "a")
    return { name: `Link: "${((u = e.textContent) == null ? void 0 : u.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Link"}"`, path: t };
  if (n === "input" || n === "textarea" || n === "select") {
    if (e.id)
      return { name: `${n}#${e.id}`, path: t };
    if (e.classList.length > 0) {
      const f = Array.from(e.classList).filter((y) => !(y.match(/^_[a-zA-Z0-9]+$/) || y.match(/[A-Za-z]+_[a-z0-9]{5,}$/)));
      if (f.length > 0) {
        const y = f.slice(0, 2).join(".");
        return { name: `${n}.${y}`, path: t };
      }
    }
    const i = e.id ? document.querySelector(`label[for="${e.id}"]`) : null, v = (h = i == null ? void 0 : i.textContent) == null ? void 0 : h.trim(), N = e.getAttribute("aria-label"), a = e.getAttribute("placeholder"), r = e.getAttribute("name"), p = n === "select" ? "select" : n === "textarea" ? "textarea" : e.type || "text", x = v || N || a || r;
    return x ? { name: `${n}[${p}]: "${x.slice(0, 30)}"`, path: t } : { name: n === "input" ? `${n}[${p}]` : n, path: t };
  }
  if (/^h[1-6]$/.test(n)) {
    const i = (S = e.textContent) == null ? void 0 : S.trim().slice(0, 40);
    return { name: i ? `${n}: "${i}"` : n, path: t };
  }
  if (n === "p") {
    const i = (b = e.textContent) == null ? void 0 : b.trim();
    return i && i.length > 0 ? { name: `Paragraph: "${i.slice(0, 40) + (i.length > 40 ? "..." : "")}"`, path: t } : { name: "Paragraph", path: t };
  }
  if (n === "img") {
    const i = e.alt;
    return { name: i ? `Image: "${i}"` : "Image", path: t };
  }
  if (n === "label") {
    const i = e.getAttribute("for"), v = (B = e.textContent) == null ? void 0 : B.trim().slice(0, 30);
    return i ? { name: `Label[for="${i}"]: "${v || ""}"`, path: t } : { name: v ? `Label: "${v}"` : "Label", path: t };
  }
  if (n === "table") {
    const i = (O = (W = e.querySelector("caption")) == null ? void 0 : W.textContent) == null ? void 0 : O.trim().slice(0, 30), v = e.getAttribute("aria-label");
    return { name: i || v ? `Table: "${i || v}"` : "Table", path: t };
  }
  if (n === "thead") return { name: "Table header", path: t };
  if (n === "tbody") return { name: "Table body", path: t };
  if (n === "tfoot") return { name: "Table footer", path: t };
  if (n === "tr") {
    const i = e.rowIndex;
    return { name: `Table row ${i >= 0 ? `#${i + 1}` : ""}`, path: t };
  }
  if (n === "th") {
    const i = (R = e.textContent) == null ? void 0 : R.trim().slice(0, 25);
    return { name: i ? `Table header: "${i}"` : "Table header cell", path: t };
  }
  if (n === "td") {
    const i = (z = e.textContent) == null ? void 0 : z.trim().slice(0, 25);
    return { name: i ? `Table cell: "${i}"` : "Table cell", path: t };
  }
  if (n === "form") {
    const i = e.getAttribute("name") || e.getAttribute("id"), v = e.getAttribute("action");
    return i ? { name: `Form: "${i}"`, path: t } : v ? { name: `Form → ${v.slice(0, 30)}`, path: t } : { name: "Form", path: t };
  }
  if (n === "fieldset") {
    const i = (I = (M = e.querySelector("legend")) == null ? void 0 : M.textContent) == null ? void 0 : I.trim().slice(0, 30);
    return { name: i ? `Fieldset: "${i}"` : "Fieldset", path: t };
  }
  if (n === "legend") {
    const i = (s = e.textContent) == null ? void 0 : s.trim().slice(0, 30);
    return { name: i ? `Legend: "${i}"` : "Legend", path: t };
  }
  if (n === "video") {
    const i = e.src || (($ = e.querySelector("source")) == null ? void 0 : $.src);
    return { name: i ? `Video: ${((P = i.split("/").pop()) == null ? void 0 : P.slice(0, 25)) || "video"}` : "Video", path: t };
  }
  if (n === "audio") {
    const i = e.src || ((F = e.querySelector("source")) == null ? void 0 : F.src);
    return { name: i ? `Audio: ${((q = i.split("/").pop()) == null ? void 0 : q.slice(0, 25)) || "audio"}` : "Audio", path: t };
  }
  if (n === "iframe") {
    const i = e.getAttribute("title"), v = e.src;
    if (i) return { name: `Iframe: "${i}"`, path: t };
    if (v)
      try {
        return { name: `Iframe: ${new URL(v).hostname}`, path: t };
      } catch {
        return { name: "Iframe", path: t };
      }
    return { name: "Iframe", path: t };
  }
  if (n === "code") {
    const i = e.parentElement, v = (i == null ? void 0 : i.tagName.toLowerCase()) === "pre", N = (K = e.textContent) == null ? void 0 : K.trim().slice(0, 30);
    return { name: v ? "Code block" : N ? `Code: "${N}"` : "Inline code", path: t };
  }
  if (n === "pre")
    return { name: e.querySelector("code") ? "Code block" : "Preformatted text", path: t };
  if (n === "dialog") {
    const i = e.getAttribute("aria-label") || e.getAttribute("aria-labelledby"), N = e.open ? " (open)" : "";
    return { name: i ? `Dialog: "${i}"${N}` : `Dialog${N}`, path: t };
  }
  if (n === "progress") {
    const i = e.value, v = e.max;
    return { name: `Progress: ${Math.round(i / v * 100)}%`, path: t };
  }
  if (n === "meter")
    return { name: `Meter: ${e.value}`, path: t };
  if (n === "canvas") {
    const i = e.getAttribute("aria-label");
    return { name: i ? `Canvas: "${i}"` : "Canvas", path: t };
  }
  if (n === "figure") {
    const i = (oe = (U = e.querySelector("figcaption")) == null ? void 0 : U.textContent) == null ? void 0 : oe.trim().slice(0, 30);
    return { name: i ? `Figure: "${i}"` : "Figure", path: t };
  }
  if (n === "figcaption") {
    const i = (Z = e.textContent) == null ? void 0 : Z.trim().slice(0, 30);
    return { name: i ? `Caption: "${i}"` : "Figure caption", path: t };
  }
  if (n === "blockquote") {
    const i = e.getAttribute("cite"), v = (J = e.textContent) == null ? void 0 : J.trim().slice(0, 30);
    return i ? { name: `Blockquote from ${i}`, path: t } : { name: v ? `Blockquote: "${v}..."` : "Blockquote", path: t };
  }
  if (n === "ul")
    return { name: `Unordered list (${e.querySelectorAll(":scope > li").length} items)`, path: t };
  if (n === "ol") {
    const i = e.querySelectorAll(":scope > li").length, v = e.start || 1;
    return { name: `Ordered list (${i} items, starts at ${v})`, path: t };
  }
  if (n === "li") {
    const i = (ae = e.textContent) == null ? void 0 : ae.trim().slice(0, 25);
    return { name: i ? `List item: "${i}"` : "List item", path: t };
  }
  if (n === "dl")
    return { name: "Definition list", path: t };
  if (n === "dt") {
    const i = (H = e.textContent) == null ? void 0 : H.trim().slice(0, 25);
    return { name: i ? `Term: "${i}"` : "Definition term", path: t };
  }
  if (n === "dd") {
    const i = (ne = e.textContent) == null ? void 0 : ne.trim().slice(0, 25);
    return { name: i ? `Definition: "${i}"` : "Definition", path: t };
  }
  if (e.classList.length > 0) {
    const i = Array.from(e.classList).filter((v) => !(v.match(/^_[a-zA-Z0-9]+$/) || v.match(/[A-Za-z]+_[a-z0-9]{5,}$/)));
    if (i.length > 0) {
      const v = i.slice(0, 3).join(".");
      return { name: `${n}.${v}`, path: t };
    }
  }
  if (["nav", "header", "footer", "main", "section", "article"].includes(n)) {
    const i = e.getAttribute("aria-label");
    if (i)
      return {
        name: `${n}: "${i}"`,
        path: t
      };
  }
  return {
    name: n,
    path: t
  };
}
function Gt(e) {
  var o;
  const t = e.tagName.toLowerCase();
  if (e instanceof SVGElement || e.closest("svg"))
    return "icon";
  if (t === "button" || e.getAttribute("role") === "button")
    return "button";
  const n = ((o = e.className) == null ? void 0 : o.toString()) || "";
  return n.includes("spinner") || n.includes("loader") || n.includes("loading") ? "spinner" : t;
}
function wt(e) {
  var u, h, S;
  const t = [], n = e.previousElementSibling;
  if (n) {
    const b = (u = n.textContent) == null ? void 0 : u.trim();
    b && b.length < 100 && t.push(`[prev]: ${b.slice(0, 50)}`);
  }
  const o = (h = e.textContent) == null ? void 0 : h.trim();
  o && o.length < 200 && t.push(o.slice(0, 80));
  const l = e.nextElementSibling;
  if (l) {
    const b = (S = l.textContent) == null ? void 0 : S.trim();
    b && b.length < 100 && t.push(`[next]: ${b.slice(0, 50)}`);
  }
  return t.join(" | ");
}
function $t(e) {
  const t = [], n = e.parentElement;
  n && n !== document.body && t.push(`parent: ${n.tagName.toLowerCase()}`);
  const o = e.previousElementSibling;
  o && t.push(`prev: ${o.tagName.toLowerCase()}`);
  const l = e.nextElementSibling;
  l && t.push(`next: ${l.tagName.toLowerCase()}`);
  const u = e.children.length;
  return u > 0 && t.push(`children: ${u}`), t.join(", ");
}
function Ct(e) {
  return !e.classList || e.classList.length === 0 ? "" : Array.from(e.classList).filter((t) => !(t.match(/^_[a-zA-Z0-9]+$/) || t.match(/[A-Za-z]+_[a-z0-9]{5,}$/))).join(" ");
}
function kt(e) {
  const t = window.getComputedStyle(e), n = e.tagName.toLowerCase(), o = [];
  return o.push(`display: ${t.display}`), o.push(`position: ${t.position}`), ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "a", "button"].includes(
    n
  ) && (o.push(`font-size: ${t.fontSize}`), o.push(`font-weight: ${t.fontWeight}`), o.push(`color: ${t.color}`), o.push(`line-height: ${t.lineHeight}`)), ["div", "section", "article", "main", "nav", "header", "footer"].includes(
    n
  ) && (o.push(`width: ${t.width}`), o.push(`height: ${t.height}`), o.push(`padding: ${t.padding}`), o.push(`margin: ${t.margin}`), (t.display === "flex" || t.display === "inline-flex") && (o.push(`flex-direction: ${t.flexDirection}`), o.push(`justify-content: ${t.justifyContent}`), o.push(`align-items: ${t.alignItems}`), o.push(`gap: ${t.gap}`)), (t.display === "grid" || t.display === "inline-grid") && (o.push(`grid-template-columns: ${t.gridTemplateColumns}`), o.push(`grid-template-rows: ${t.gridTemplateRows}`), o.push(`gap: ${t.gap}`))), t.backgroundColor !== "rgba(0, 0, 0, 0)" && o.push(`background-color: ${t.backgroundColor}`), t.borderWidth !== "0px" && o.push(`border: ${t.border}`), t.borderRadius !== "0px" && o.push(`border-radius: ${t.borderRadius}`), o.join("; ");
}
function Kt(e) {
  const t = window.getComputedStyle(e);
  return [
    "display",
    "position",
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "min-width",
    "min-height",
    "max-width",
    "max-height",
    "padding",
    "margin",
    "border",
    "border-radius",
    "background",
    "background-color",
    "color",
    "font-family",
    "font-size",
    "font-weight",
    "line-height",
    "text-align",
    "flex-direction",
    "justify-content",
    "align-items",
    "gap",
    "grid-template-columns",
    "grid-template-rows",
    "overflow",
    "z-index",
    "opacity",
    "transform",
    "transition",
    "animation"
  ].map((o) => {
    const l = t.getPropertyValue(o);
    return l && l !== "none" && l !== "normal" && l !== "auto" ? `${o}: ${l}` : null;
  }).filter(Boolean).join("; ");
}
function St(e) {
  const t = [], n = e.getAttribute("role");
  n && t.push(`role="${n}"`);
  const o = Array.from(e.attributes).filter((h) => h.name.startsWith("aria-")).map((h) => `${h.name}="${h.value}"`).join(" ");
  o && t.push(o);
  const l = e.getAttribute("tabindex");
  return l !== null && t.push(`tabindex="${l}"`), ["a", "button", "input", "textarea", "select"].includes(e.tagName.toLowerCase()) && t.push("focusable"), t.join(" ");
}
function _t(e) {
  let t = e;
  for (; t && t !== document.body; ) {
    const n = window.getComputedStyle(t).position;
    if (n === "fixed" || n === "sticky")
      return !0;
    t = t.parentElement;
  }
  return !1;
}
function Et(e) {
  const t = k(!1), n = k(null), o = k(null), l = k(null), u = k(null), h = k(null), S = k(!1), b = k(null), B = k([]), W = k(null), O = V(() => S.value && b.value !== null), R = "[data-agentation-ignore]";
  function z(a) {
    return !!(a.closest(R) || a === document.body || a === document.documentElement);
  }
  function M(a, r) {
    return !(a.x + a.width < r.x || r.x + r.width < a.x || a.y + a.height < r.y || r.y + r.height < a.y);
  }
  function I(a) {
    return ["HTML", "BODY", "HEAD", "SCRIPT", "STYLE", "LINK", "META", "NOSCRIPT"].includes(a.tagName);
  }
  function s(a) {
    const r = window.innerWidth, p = window.innerHeight;
    return a.width >= r * 0.8 && a.height >= p * 0.8;
  }
  function $(a, r) {
    const p = Math.max(a.x, r.x), x = Math.max(a.y, r.y), f = Math.min(a.x + a.width, r.x + r.width), y = Math.min(a.y + a.height, r.y + r.height);
    if (f <= p || y <= x)
      return 0;
    const w = (f - p) * (y - x), _ = r.width * r.height;
    return _ > 0 ? w / _ : 0;
  }
  function P(a, r) {
    const p = $(a, r), x = r.width * r.height, f = a.width * a.height;
    return x <= f * 2 ? p > 0.1 : p >= 0.3;
  }
  function F(a) {
    return a.querySelectorAll("*").length + 1;
  }
  function q(a, r) {
    const p = r ? document.elementFromPoint(r.x, r.y) : null;
    if (p && !z(p) && !I(p)) {
      const x = K(p, a);
      if (x) {
        const f = x.getBoundingClientRect(), { name: y, path: w } = de(x), _ = F(x);
        return {
          elements: [{ name: y, path: w }],
          boundingBox: {
            x: f.left,
            y: f.top,
            width: f.width,
            height: f.height
          },
          totalElementCount: _
        };
      }
    }
    return U(a);
  }
  function K(a, r) {
    let p = a, x = null;
    for (; p && !I(p); ) {
      if (z(p)) {
        p = p.parentElement;
        continue;
      }
      const f = p.getBoundingClientRect();
      if (f.width < 2 || f.height < 2) {
        p = p.parentElement;
        continue;
      }
      if (s(f))
        break;
      const y = {
        x: f.left,
        y: f.top,
        width: f.width,
        height: f.height
      };
      if (P(r, y))
        x = p;
      else if (x !== null)
        break;
      p = p.parentElement;
    }
    return x;
  }
  function U(a) {
    const r = /* @__PURE__ */ new Set(), p = document.querySelectorAll("*"), x = [];
    p.forEach((C) => {
      const T = C;
      if (z(T) || I(T)) return;
      const A = T.getBoundingClientRect();
      A.width < 2 || A.height < 2 || s(A) || M(a, {
        x: A.left,
        y: A.top,
        width: A.width,
        height: A.height
      }) && x.push({ element: T, rect: A });
    });
    const f = new Set(x.map((C) => C.element)), y = [];
    x.forEach(({ element: C, rect: T }) => {
      let A = !1;
      if (f.forEach((le) => {
        C.contains(le) && C !== le && (A = !0);
      }), A) return;
      const { name: j, path: Y } = de(C);
      r.has(Y) || (r.add(Y), y.push({ element: { name: j, path: Y }, rect: T, htmlElement: C }));
    });
    let w = null;
    if (y.length > 0) {
      let C = 1 / 0, T = 1 / 0, A = -1 / 0, j = -1 / 0;
      y.forEach(({ rect: Y }) => {
        C = Math.min(C, Y.left), T = Math.min(T, Y.top), A = Math.max(A, Y.right), j = Math.max(j, Y.bottom);
      }), w = {
        x: C,
        y: T,
        width: A - C,
        height: j - T
      };
    }
    let _ = 0;
    return y.forEach(({ htmlElement: C }) => {
      _ += F(C);
    }), {
      elements: y.map((C) => C.element),
      boundingBox: w,
      totalElementCount: _
    };
  }
  function oe(a, r) {
    const p = Math.min(a.x, r.x), x = Math.min(a.y, r.y), f = Math.abs(r.x - a.x), y = Math.abs(r.y - a.y);
    return { x: p, y: x, width: f, height: y };
  }
  function Z(a) {
    if (a.button !== 0) return;
    const r = a.target;
    z(r) || (a.preventDefault(), h.value = { x: a.clientX, y: a.clientY }, S.value = !1, b.value = null, B.value = []);
  }
  function J(a) {
    var p, x, f, y;
    const r = { x: a.clientX, y: a.clientY };
    if (u.value = r, h.value) {
      const w = oe(h.value, r);
      if (!S.value) {
        const _ = document.querySelectorAll("*");
        let C = !1;
        _.forEach((T) => {
          if (C) return;
          const A = T;
          if (z(A)) return;
          const j = A.getBoundingClientRect();
          M(w, {
            x: j.left,
            y: j.top,
            width: j.width,
            height: j.height
          }) && (w.width > 5 || w.height > 5) && (C = !0);
        }), C && (S.value = !0, n.value = null, o.value = null, l.value = null, (p = e.onHoverChange) == null || p.call(e, null));
      }
      if (S.value) {
        a.preventDefault(), b.value = w;
        const _ = q(w, r);
        B.value = _.elements, W.value = _.boundingBox, (x = e.onMarqueeChange) == null || x.call(e, w, _.boundingBox, _.elements);
        return;
      }
    }
    if (!S.value) {
      const w = a.target;
      if (z(w)) {
        n.value = null, o.value = null, l.value = null, (f = e.onHoverChange) == null || f.call(e, null);
        return;
      }
      if (w !== n.value) {
        n.value = w;
        const _ = w.getBoundingClientRect();
        o.value = _;
        const { name: C, path: T } = de(w), A = {
          element: w,
          name: C,
          path: T,
          rect: _
        };
        l.value = A, (y = e.onHoverChange) == null || y.call(e, A);
      }
    }
  }
  function ae(a) {
    if (a.button !== 0) return;
    const r = a.target;
    if (S.value && b.value) {
      a.preventDefault(), a.stopPropagation();
      const p = { x: a.clientX, y: a.clientY }, x = q(b.value, p);
      if (x.elements.length === 0) {
        H();
        return;
      }
      const f = x.elements, y = x.boundingBox || b.value, w = x.totalElementCount, _ = window.innerWidth, C = window.scrollY, T = a.clientX, A = a.clientY, j = f.length === 1 ? w : f.length, Y = f.length === 1 ? w > 1 ? `${f[0].name} (${w} elements)` : f[0].name : `${j} elements: ${f.slice(0, 3).map((se) => se.name).join(", ")}${f.length > 3 ? ` +${f.length - 3} more` : ""}`, le = {
        x: T / _ * 100,
        y: A + C,
        element: Y,
        elementPath: f.map((se) => se.path).join(", "),
        isMultiSelect: !0,
        elements: f,
        totalElementCount: w,
        // Store bounding box in document coordinates (add scrollY to convert from viewport)
        groupBoundingBox: {
          x: y.x,
          y: y.y + C,
          width: y.width,
          height: y.height
        },
        boundingBox: {
          x: y.x,
          y: y.y + C,
          width: y.width,
          height: y.height
        }
      };
      v(), e.onSelect(le, null);
    } else if (h.value && !S.value) {
      if (z(r)) {
        H();
        return;
      }
      a.preventDefault(), a.stopPropagation();
      const { name: p, path: x } = de(r), f = r.getBoundingClientRect(), y = window.innerWidth, w = window.scrollY, _ = _t(r), C = {
        x: a.clientX / y * 100,
        y: _ ? a.clientY : a.clientY + w,
        element: p,
        elementPath: x,
        // Store bounding box in document coordinates (add scrollY for non-fixed elements)
        boundingBox: {
          x: f.left,
          y: _ ? f.top : f.top + w,
          width: f.width,
          height: f.height
        },
        nearbyText: wt(r),
        nearbyElements: $t(r),
        cssClasses: Ct(r),
        computedStyles: kt(r),
        fullPath: bt(r),
        accessibility: St(r),
        isFixed: _,
        isMultiSelect: !1
      };
      v(), e.onSelect(C, r);
    }
    H();
  }
  function H() {
    var a;
    h.value = null, S.value = !1, b.value = null, B.value = [], W.value = null, (a = e.onMarqueeChange) == null || a.call(e, null, null, []);
  }
  function ne(a) {
    a.key === "Escape" && v();
  }
  function i() {
    t.value || (t.value = !0, document.addEventListener("mousedown", Z, { capture: !0 }), document.addEventListener("mousemove", J, { capture: !0 }), document.addEventListener("mouseup", ae, { capture: !0 }), document.addEventListener("keydown", ne), document.body.style.cursor = "crosshair");
  }
  function v() {
    var a;
    t.value && (t.value = !1, n.value = null, o.value = null, l.value = null, u.value = null, H(), document.removeEventListener("mousedown", Z, {
      capture: !0
    }), document.removeEventListener("mousemove", J, {
      capture: !0
    }), document.removeEventListener("mouseup", ae, { capture: !0 }), document.removeEventListener("keydown", ne), document.body.style.cursor = "", (a = e.onHoverChange) == null || a.call(e, null));
  }
  function N() {
    t.value ? v() : i();
  }
  return he(() => {
    t.value && v();
  }), {
    isActive: G(t),
    isMarqueeMode: G(O),
    hoveredElement: G(n),
    highlightBox: G(o),
    elementInfo: G(l),
    cursorPosition: G(u),
    marqueeBox: G(b),
    selectedElements: G(B),
    start: i,
    stop: v,
    toggle: N
  };
}
const At = "agentation-animation-freeze", ye = "--agentation-animation-state";
function Mt() {
  const e = k(!1);
  let t = null;
  function n() {
    e.value || (document.documentElement.style.setProperty(ye, "paused"), t || (t = document.createElement("style"), t.id = At, t.textContent = `
        *,
        *::before,
        *::after {
          animation-play-state: var(${ye}, running) !important;
        }
      `, document.head.appendChild(t)), document.querySelectorAll("video").forEach((u) => {
      u.paused || (u.dataset.agentationWasPlaying = "true", u.pause());
    }), e.value = !0);
  }
  function o() {
    e.value && (document.documentElement.style.removeProperty(ye), t && t.parentNode && (t.parentNode.removeChild(t), t = null), document.querySelectorAll("video[data-agentation-was-playing]").forEach((u) => {
      delete u.dataset.agentationWasPlaying, u.play().catch(() => {
      });
    }), e.value = !1);
  }
  function l() {
    e.value ? o() : n();
  }
  return he(() => {
    e.value && o();
  }), {
    isPaused: G(e),
    pause: n,
    resume: o,
    toggle: l
  };
}
function Tt() {
  const e = k(!1);
  function t() {
    const l = gt();
    l ? e.value = l === "dark" : typeof window < "u" && (e.value = window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function n() {
    e.value = !e.value, Te(e.value ? "dark" : "light");
  }
  function o(l) {
    e.value = l, Te(l ? "dark" : "light");
  }
  return ue(() => {
    t();
  }), {
    isDark: G(e),
    toggle: n,
    set: o,
    initialize: t
  };
}
function Lt(e, t = "standard") {
  if (e.length === 0)
    return "No annotations to display.";
  const n = [
    "# Page Annotations",
    "",
    `Generated: ${(/* @__PURE__ */ new Date()).toISOString()}`,
    `URL: ${typeof window < "u" ? window.location.href : "N/A"}`,
    "",
    "---",
    ""
  ];
  return e.forEach((o, l) => {
    if (o.isMultiSelect && o.elements && o.elements.length > 0) {
      const u = o.totalElementCount ?? o.elements.length, h = 4, S = o.elements.slice(0, h), b = o.elements.length - h, B = S.map((O) => O.name).join(", "), W = b > 0 ? ` +${b} more` : "";
      n.push(`## ${l + 1}. ${u} elements: ${B}${W}`), n.push(""), n.push("**Location:** multi-select"), n.push(""), n.push(`**Feedback:** ${o.comment}`), n.push(""), n.push("---"), n.push("");
      return;
    }
    if (n.push(`## ${l + 1}. ${o.element}`), n.push(""), n.push(`**Comment:** ${o.comment}`), n.push(""), n.push(`**Selector:** \`${o.elementPath}\``), n.push(""), n.push(
      `**Position:** x=${o.x.toFixed(1)}%, y=${o.y.toFixed(0)}px`
    ), n.push(""), o.selectedText && (n.push(`**Selected Text:** "${o.selectedText}"`), n.push("")), o.boundingBox) {
      const u = o.boundingBox;
      n.push(
        `**Bounding Box:** x=${u.x.toFixed(0)}, y=${u.y.toFixed(0)}, w=${u.width.toFixed(0)}, h=${u.height.toFixed(0)}`
      ), n.push("");
    }
    t !== "compact" && (o.nearbyText && (n.push(`**Nearby Text:** ${o.nearbyText}`), n.push("")), o.cssClasses && (n.push(`**CSS Classes:** \`${o.cssClasses}\``), n.push(""))), (t === "detailed" || t === "forensic") && (o.nearbyElements && (n.push(`**Nearby Elements:** ${o.nearbyElements}`), n.push("")), o.accessibility && (n.push(`**Accessibility:** ${o.accessibility}`), n.push(""))), t === "forensic" && (o.fullPath && (n.push(`**Full Path:** \`${o.fullPath}\``), n.push("")), o.computedStyles && (n.push("**Computed Styles:**"), n.push("```css"), n.push(o.computedStyles), n.push("```"), n.push(""))), n.push("---"), n.push("");
  }), n.join(`
`);
}
function Zt(e) {
  return [
    `[${e.element}]`,
    e.comment,
    `(${e.elementPath})`
  ].join(" ");
}
const Bt = ["aria-pressed"], It = ["aria-pressed", "title"], Pt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, Dt = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, Ft = ["disabled", "title"], Nt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, zt = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, Ht = {
  key: 2,
  class: "agentation-toolbar__badge"
}, qt = ["disabled"], jt = ["title"], Yt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, Vt = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, Wt = {
  style: { position: "absolute", inset: "0", "z-index": "99998", "pointer-events": "none" },
  "data-agentation-ignore": ""
}, xe = "#3b82f6", me = 4, Jt = /* @__PURE__ */ be({
  __name: "Agentation",
  emits: ["annotation-add", "annotation-delete", "annotation-update", "annotations-clear", "copy"],
  setup(e, { emit: t }) {
    const n = t, {
      annotations: o,
      pendingAnnotation: l,
      editingAnnotationId: u,
      count: h,
      isEmpty: S,
      initialize: b,
      switchPath: B,
      add: W,
      remove: O,
      update: R,
      clear: z,
      setPending: M,
      setEditing: I,
      getById: s
    } = yt(), { isPaused: $, toggle: P } = Mt(), { isDark: F, toggle: q } = Tt(), K = k(!1), U = k(null), oe = k(!1), Z = k(null), J = k(null), ae = k([]), H = k(null), ne = k(0), i = V(() => {
      if (l.value)
        return l.value.x / 100 * (typeof window < "u" ? window.innerWidth : 0);
      if (u.value) {
        const c = s(u.value);
        return c ? c.x / 100 * (typeof window < "u" ? window.innerWidth : 0) : 0;
      }
      return 0;
    }), v = V(() => {
      if (l.value) {
        const c = typeof window < "u" ? window.scrollY : 0;
        return l.value.isFixed ? l.value.y : l.value.y - c;
      } else if (u.value) {
        const c = s(u.value);
        if (!c) return 0;
        const d = typeof window < "u" ? window.scrollY : 0;
        return c.isFixed ? c.y : c.y - d;
      }
      return 0;
    }), N = V(() => {
      if (l.value)
        return {
          element: l.value.element,
          selectedText: l.value.selectedText,
          computedStyles: l.value.computedStyles,
          initialValue: "",
          submitLabel: "Add",
          isMultiSelect: l.value.isMultiSelect || !1
        };
      if (u.value) {
        const c = s(u.value);
        if (c)
          return {
            element: c.element,
            selectedText: c.selectedText,
            computedStyles: c.computedStyles,
            initialValue: c.comment,
            submitLabel: "Update",
            isMultiSelect: c.isMultiSelect || !1
          };
      }
      return null;
    }), a = V(() => H.value ? {
      left: `${H.value.x}px`,
      top: `${H.value.y - ne.value}px`,
      width: `${H.value.width}px`,
      height: `${H.value.height}px`
    } : null);
    function r() {
      ne.value = window.scrollY;
    }
    const p = V(() => U.value ? s(U.value) : null), x = V(() => {
      if (!p.value) return null;
      const c = p.value, d = c.isMultiSelect && c.groupBoundingBox ? c.groupBoundingBox : c.boundingBox;
      return d ? {
        left: `${d.x}px`,
        top: `${d.y - (c.isFixed ? 0 : ne.value)}px`,
        width: `${d.width}px`,
        height: `${d.height}px`
      } : null;
    }), f = V(() => {
      if (!T.value) return {};
      const c = typeof window < "u" ? window.innerWidth : 1e3, d = 150, re = 32;
      let L = T.value.x + me, ie = T.value.y - re - me;
      return L + d > c && (L = T.value.x - d - me), ie < 0 && (ie = T.value.y + me), {
        left: `${L}px`,
        top: `${ie}px`
      };
    }), {
      isActive: y,
      isMarqueeMode: w,
      highlightBox: _,
      elementInfo: C,
      cursorPosition: T,
      toggle: A
    } = Et({
      onSelect: (c) => {
        M(c), I(null), c.isMultiSelect && c.groupBoundingBox ? H.value = c.groupBoundingBox : H.value = null, K.value = !0;
      },
      onHoverChange: () => {
      },
      onMarqueeChange: (c, d, re) => {
        Z.value = c, J.value = d, ae.value = re;
      }
    }), j = k(ge());
    let Y = null;
    function le() {
      const c = ge();
      c !== j.value && (j.value = c, B(c));
    }
    function se() {
      le(), Y = requestAnimationFrame(se);
    }
    ue(() => {
      if (typeof window < "u") {
        const c = ge();
        j.value = c, b(c), Y = requestAnimationFrame(se), ne.value = window.scrollY, window.addEventListener("scroll", r, { passive: !0 });
      }
    }), he(() => {
      Y !== null && (cancelAnimationFrame(Y), Y = null), typeof window < "u" && window.removeEventListener("scroll", r);
    });
    function Ie(c) {
      if (l.value) {
        const d = W(l.value, c);
        K.value = !1, H.value = null, n("annotation-add", d);
      } else if (u.value) {
        const d = R(u.value, c);
        K.value = !1, I(null), H.value = null, d && n("annotation-update", d);
      }
    }
    function Pe() {
      K.value = !1, M(null), I(null), H.value = null;
    }
    function $e(c) {
      const d = O(c.id);
      d && n("annotation-delete", d);
    }
    function Ce(c) {
      M(null), I(c.id), K.value = !0;
    }
    function De() {
      o.value.length !== 0 && confirm("Clear all annotations?") && (z(), n("annotations-clear"));
    }
    async function Fe() {
      const c = Lt([...o.value]);
      try {
        await navigator.clipboard.writeText(c), oe.value = !0, setTimeout(() => {
          oe.value = !1;
        }, 2e3);
      } catch {
        console.log(c);
      }
      n("copy", c);
    }
    function ke(c) {
      console.log("Marker clicked:", c);
    }
    return (c, d) => {
      var re;
      return E(), ce(We, { to: "body" }, [
        m("div", {
          class: te(["agentation-toolbar", g(F) ? "agentation-toolbar--dark" : ""]),
          "data-agentation-ignore": "",
          role: "toolbar",
          "aria-label": "Agentation annotation tools"
        }, [
          m("button", {
            type: "button",
            class: te(["agentation-toolbar__button", g(y) && "agentation-toolbar__button--active"]),
            "aria-pressed": g(y),
            title: "Select element to annotate",
            onClick: d[0] || (d[0] = //@ts-ignore
            (...L) => g(A) && g(A)(...L))
          }, [...d[5] || (d[5] = [
            m("svg", {
              class: "agentation-toolbar__icon",
              fill: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              m("path", { d: "M4 4l7.07 17 2.51-7.39L21 11.07 4 4zm9.33 8.33l-1.62 4.79L6.27 6.27l10.85 5.06-3.79 1z" })
            ], -1)
          ])], 10, Bt),
          m("button", {
            type: "button",
            class: te(["agentation-toolbar__button", g($) && "agentation-toolbar__button--paused"]),
            "aria-pressed": g($),
            title: g($) ? "Resume animations" : "Pause animations",
            onClick: d[1] || (d[1] = //@ts-ignore
            (...L) => g(P) && g(P)(...L))
          }, [
            g($) ? (E(), D("svg", Pt, [...d[6] || (d[6] = [
              m("path", { d: "M8 5v14l11-7z" }, null, -1)
            ])])) : (E(), D("svg", Dt, [...d[7] || (d[7] = [
              m("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" }, null, -1)
            ])]))
          ], 10, It),
          d[13] || (d[13] = m("div", { class: "agentation-toolbar__divider" }, null, -1)),
          m("button", {
            type: "button",
            class: te(["agentation-toolbar__button", oe.value && "agentation-toolbar__button--success"]),
            disabled: g(S),
            title: `Copy ${g(h)} annotation(s) as markdown`,
            onClick: Fe
          }, [
            oe.value ? (E(), D("svg", Nt, [...d[8] || (d[8] = [
              m("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M5 13l4 4L19 7"
              }, null, -1)
            ])])) : (E(), D("svg", zt, [...d[9] || (d[9] = [
              m("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              }, null, -1)
            ])])),
            g(h) > 0 ? (E(), D("span", Ht, ee(g(h)), 1)) : X("", !0)
          ], 10, Ft),
          m("button", {
            type: "button",
            class: "agentation-toolbar__button",
            disabled: g(S),
            title: "Clear all annotations",
            onClick: De
          }, [...d[10] || (d[10] = [
            m("svg", {
              class: "agentation-toolbar__icon",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [
              m("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              })
            ], -1)
          ])], 8, qt),
          d[14] || (d[14] = m("div", { class: "agentation-toolbar__divider" }, null, -1)),
          m("button", {
            type: "button",
            class: "agentation-toolbar__button",
            title: g(F) ? "Switch to light mode" : "Switch to dark mode",
            onClick: d[2] || (d[2] = //@ts-ignore
            (...L) => g(q) && g(q)(...L))
          }, [
            g(F) ? (E(), D("svg", Yt, [...d[11] || (d[11] = [
              m("path", { d: "M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" }, null, -1)
            ])])) : (E(), D("svg", Vt, [...d[12] || (d[12] = [
              m("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              }, null, -1)
            ])]))
          ], 8, jt)
        ], 2),
        g(y) && g(_) && !g(w) ? (E(), D("div", {
          key: 0,
          class: "agentation-highlight",
          style: Q({
            left: `${g(_).left}px`,
            top: `${g(_).top}px`,
            width: `${g(_).width}px`,
            height: `${g(_).height}px`
          }),
          "data-agentation-ignore": ""
        }, null, 4)) : X("", !0),
        g(y) && g(C) && g(T) && !g(w) ? (E(), D("div", {
          key: 1,
          class: "agentation-highlight__tooltip",
          style: Q(f.value),
          "data-agentation-ignore": ""
        }, ee(g(C).name), 5)) : X("", !0),
        g(y) && g(w) && Z.value ? (E(), D("div", {
          key: 2,
          class: "agentation-marquee",
          style: Q({
            left: `${Z.value.x}px`,
            top: `${Z.value.y}px`,
            width: `${Z.value.width}px`,
            height: `${Z.value.height}px`
          }),
          "data-agentation-ignore": ""
        }, null, 4)) : X("", !0),
        g(y) && g(w) && J.value ? (E(), D("div", {
          key: 3,
          class: "agentation-marquee",
          style: Q({
            left: `${J.value.x}px`,
            top: `${J.value.y}px`,
            width: `${J.value.width}px`,
            height: `${J.value.height}px`
          }),
          "data-agentation-ignore": ""
        }, null, 4)) : X("", !0),
        H.value && K.value && a.value ? (E(), D("div", {
          key: 4,
          class: "agentation-group-highlight",
          style: Q(a.value),
          "data-agentation-ignore": ""
        }, null, 4)) : X("", !0),
        U.value && x.value ? (E(), D("div", {
          key: 5,
          class: te(["agentation-element-highlight", (re = p.value) != null && re.isMultiSelect ? "agentation-element-highlight--group" : "agentation-element-highlight--single"]),
          style: Q(x.value),
          "data-agentation-ignore": ""
        }, null, 6)) : X("", !0),
        m("div", Wt, [
          (E(!0), D(_e, null, Ee(g(o).filter((L) => !L.isFixed), (L, ie) => (E(), ce(Ae, {
            key: L.id,
            annotation: L,
            index: ie,
            dark: g(F),
            "accent-color": xe,
            "is-hovered": U.value === L.id,
            style: { "pointer-events": "auto" },
            onClick: ke,
            onEdit: Ce,
            onDelete: $e,
            onMouseenter: (Ne) => U.value = L.id,
            onMouseleave: d[3] || (d[3] = (Ne) => U.value = null)
          }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128))
        ]),
        (E(!0), D(_e, null, Ee(g(o).filter((L) => L.isFixed), (L) => (E(), ce(Ae, {
          key: L.id,
          annotation: L,
          index: g(o).findIndex((ie) => ie.id === L.id),
          dark: g(F),
          "accent-color": xe,
          "is-hovered": U.value === L.id,
          onClick: ke,
          onEdit: Ce,
          onDelete: $e,
          onMouseenter: (ie) => U.value = L.id,
          onMouseleave: d[4] || (d[4] = (ie) => U.value = null)
        }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128)),
        K.value && N.value ? (E(), ce(tt, {
          key: 6,
          element: N.value.element,
          x: i.value,
          y: v.value,
          "selected-text": N.value.selectedText,
          "computed-styles": N.value.computedStyles,
          "initial-value": N.value.initialValue,
          "submit-label": N.value.submitLabel,
          dark: g(F),
          "accent-color": xe,
          "is-multi-select": N.value.isMultiSelect,
          onSubmit: Ie,
          onCancel: Pe
        }, null, 8, ["element", "x", "y", "selected-text", "computed-styles", "initial-value", "submit-label", "dark", "is-multi-select"])) : X("", !0)
      ]);
    };
  }
});
export {
  Jt as Agentation,
  Ae as AnnotationMarker,
  tt as AnnotationPopup,
  pt as clearAnnotations,
  Zt as generateAnnotationSummary,
  Lt as generateMarkdown,
  St as getAccessibilityInfo,
  ge as getCurrentRoutePath,
  kt as getDetailedComputedStyles,
  Ct as getElementClasses,
  xt as getElementPath,
  Kt as getForensicComputedStyles,
  bt as getFullElementPath,
  $t as getNearbyElements,
  wt as getNearbyText,
  we as getStorageKey,
  Gt as identifyAnimationElement,
  de as identifyElement,
  _t as isElementFixed,
  Me as loadAnnotations,
  Rt as loadSettings,
  gt as loadTheme,
  Xt as resetAnnotations,
  ve as saveAnnotations,
  Ut as saveSettings,
  Te as saveTheme,
  Le as selectionThemes,
  Mt as useAnimationPause,
  yt as useAnnotations,
  Et as useElementSelection,
  Tt as useTheme
};
