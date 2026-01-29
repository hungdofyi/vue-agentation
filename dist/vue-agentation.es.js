import { defineComponent as ce, ref as C, computed as z, onMounted as K, nextTick as Ae, onUnmounted as ae, openBlock as $, createElementBlock as _, normalizeStyle as H, normalizeClass as j, createElementVNode as s, toDisplayString as I, createCommentVNode as V, withDirectives as Se, vModelText as Ee, createTextVNode as oe, createVNode as Te, Transition as Le, withCtx as Pe, withModifiers as he, readonly as F, createBlock as te, Teleport as Ie, unref as m, Fragment as ge, renderList as ve } from "vue";
const Me = ["aria-label"], Be = { class: "agentation-popup__header" }, Fe = { class: "agentation-popup__header-content" }, De = { class: "agentation-popup__header-title" }, Ne = {
  key: 0,
  class: "agentation-popup__header-selected"
}, ze = { class: "agentation-popup__body" }, je = {
  key: 0,
  style: { "margin-top": "0.5rem" }
}, Ve = {
  key: 0,
  class: "agentation-popup__styles-pre"
}, qe = { class: "agentation-popup__footer" }, He = { class: "agentation-popup__actions" }, Oe = /* @__PURE__ */ ce({
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
    computedStyles: {}
  },
  emits: ["submit", "cancel"],
  setup(e, { expose: t, emit: n }) {
    const o = n, a = C(e.initialValue), r = C(null), h = C(!1), x = C(!1), v = C("initial"), P = z(() => {
      let f = e.x, w = e.y + 20;
      return typeof window < "u" && (f + 320 > window.innerWidth - 16 && (f = window.innerWidth - 320 - 16), f < 16 && (f = 16), w + 200 > window.innerHeight - 16 && (w = e.y - 200 - 10), w < 16 && (w = 16)), {
        left: `${f}px`,
        top: `${w}px`
      };
    });
    function L() {
      const u = a.value.trim();
      if (!u) {
        y();
        return;
      }
      o("submit", u);
    }
    function E() {
      v.value = "exit", setTimeout(() => {
        o("cancel");
      }, 150);
    }
    function y() {
      h.value = !0, setTimeout(() => {
        h.value = !1;
      }, 500);
    }
    function A(u) {
      u.key === "Enter" && (u.metaKey || u.ctrlKey) ? (u.preventDefault(), L()) : u.key === "Escape" && (u.preventDefault(), E());
    }
    K(() => {
      v.value = "enter", Ae(() => {
        var u;
        v.value = "entered", (u = r.value) == null || u.focus();
      });
    });
    function g(u) {
      u.key === "Escape" && E();
    }
    return K(() => {
      document.addEventListener("keydown", g);
    }), ae(() => {
      document.removeEventListener("keydown", g);
    }), t({ shake: y }), (u, l) => ($(), _("div", {
      class: j(["agentation-popup", [
        e.dark ? "agentation-popup--dark" : "",
        h.value && "agentation-animate-shake",
        v.value === "initial" && "agentation-popup--entering",
        v.value === "enter" && "agentation-popup--entering",
        v.value === "entered" && "agentation-popup--entered",
        v.value === "exit" && "agentation-popup--exiting"
      ]]),
      style: H(P.value),
      "data-agentation-ignore": "",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": `Add annotation for ${e.element}`
    }, [
      s("div", Be, [
        s("div", Fe, [
          s("div", {
            class: "agentation-popup__header-dot",
            style: H({ backgroundColor: e.accentColor })
          }, null, 4),
          s("span", De, I(e.element), 1)
        ]),
        e.selectedText ? ($(), _("p", Ne, ' "' + I(e.selectedText) + '" ', 1)) : V("", !0)
      ]),
      s("div", ze, [
        Se(s("textarea", {
          ref_key: "textareaRef",
          ref: r,
          "onUpdate:modelValue": l[0] || (l[0] = (b) => a.value = b),
          class: "agentation-popup__textarea",
          placeholder: "Add your comment...",
          onKeydown: A
        }, null, 544), [
          [Ee, a.value]
        ]),
        e.computedStyles ? ($(), _("div", je, [
          s("button", {
            type: "button",
            class: "agentation-popup__styles-toggle",
            onClick: l[1] || (l[1] = (b) => x.value = !x.value)
          }, [
            ($(), _("svg", {
              class: j(["agentation-popup__styles-icon", x.value && "agentation-popup__styles-icon--open"]),
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [...l[2] || (l[2] = [
              s("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M9 5l7 7-7 7"
              }, null, -1)
            ])], 2)),
            l[3] || (l[3] = oe(" Computed styles ", -1))
          ]),
          x.value ? ($(), _("pre", Ve, I(e.computedStyles), 1)) : V("", !0)
        ])) : V("", !0)
      ]),
      s("div", qe, [
        l[4] || (l[4] = s("span", { class: "agentation-popup__shortcut" }, [
          s("kbd", { class: "agentation-popup__kbd" }, "⌘"),
          oe(" + "),
          s("kbd", { class: "agentation-popup__kbd" }, "Enter"),
          oe(" to submit ")
        ], -1)),
        s("div", He, [
          s("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--cancel",
            onClick: E
          }, " Cancel "),
          s("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--submit",
            style: H({ backgroundColor: e.accentColor }),
            onClick: L
          }, I(e.submitLabel), 5)
        ])
      ])
    ], 14, Me));
  }
}), We = { class: "agentation-marker__tooltip-header" }, Re = { class: "agentation-marker__tooltip-content" }, Ye = { class: "agentation-marker__tooltip-title" }, Ue = { class: "agentation-marker__tooltip-path" }, Ge = { class: "agentation-marker__tooltip-actions" }, Ke = { class: "agentation-marker__tooltip-body" }, Ze = { class: "agentation-marker__tooltip-comment" }, Je = {
  key: 0,
  class: "agentation-marker__tooltip-selected-text"
}, Xe = { class: "agentation-marker__tooltip-footer" }, Qe = /* @__PURE__ */ ce({
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
    const n = t, o = C(!1), a = C("initial"), r = z(() => {
      const y = {
        left: `${e.annotation.x}%`
      };
      return e.annotation.isFixed ? y.top = `${e.annotation.y}px` : y.top = `${e.annotation.y}px`, y;
    }), h = z(() => e.annotation.x > 70 ? "left" : "right");
    function x(y) {
      y.stopPropagation(), n("click", e.annotation);
    }
    function v(y) {
      y.stopPropagation(), a.value = "exit", setTimeout(() => {
        n("delete", e.annotation);
      }, 200);
    }
    function P(y) {
      y.stopPropagation(), n("edit", e.annotation);
    }
    function L() {
      o.value = !0, n("mouseenter", e.annotation);
    }
    function E() {
      o.value = !1, n("mouseleave", e.annotation);
    }
    return K(() => {
      a.value = "enter", requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          a.value = "entered";
        });
      });
    }), (y, A) => ($(), _("div", {
      class: j(["agentation-marker", [
        e.annotation.isFixed ? "agentation-marker--fixed" : "agentation-marker--absolute",
        a.value === "initial" && "agentation-marker--entering",
        a.value === "enter" && "agentation-marker--entering",
        a.value === "entered" && "agentation-marker--entered",
        a.value === "exit" && "agentation-marker--exiting"
      ]]),
      style: H(r.value),
      "data-agentation-ignore": "",
      onMouseenter: L,
      onMouseleave: E,
      onClick: x
    }, [
      s("div", {
        class: j(["agentation-marker__dot", [e.isHovered && "agentation-marker__dot--hovered"]]),
        style: H({ backgroundColor: e.accentColor })
      }, [
        oe(I(e.index + 1) + " ", 1),
        s("div", {
          class: "agentation-marker__ping agentation-animate-ping",
          style: H({ backgroundColor: e.accentColor })
        }, null, 4)
      ], 6),
      Te(Le, {
        "enter-active-class": "agentation-transition-enter-active",
        "enter-from-class": "agentation-transition-enter",
        "enter-to-class": "agentation-transition-enter-to",
        "leave-active-class": "agentation-transition-leave-active",
        "leave-from-class": "agentation-transition-leave",
        "leave-to-class": "agentation-transition-leave-to"
      }, {
        default: Pe(() => [
          o.value ? ($(), _("div", {
            key: 0,
            class: j(["agentation-marker__tooltip", [
              e.dark ? "agentation-marker__tooltip--dark" : "",
              h.value === "left" ? "agentation-marker__tooltip--left" : "agentation-marker__tooltip--right"
            ]]),
            onClick: A[0] || (A[0] = he(() => {
            }, ["stop"]))
          }, [
            s("div", We, [
              s("div", Re, [
                s("span", Ye, I(e.annotation.element), 1),
                s("p", Ue, I(e.annotation.elementPath), 1)
              ]),
              s("div", Ge, [
                s("button", {
                  type: "button",
                  class: "agentation-marker__tooltip-action",
                  title: "Edit annotation",
                  onClick: he(P, ["stop"])
                }, [...A[1] || (A[1] = [
                  s("svg", {
                    class: "agentation-marker__tooltip-action-icon",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    })
                  ], -1)
                ])]),
                s("button", {
                  type: "button",
                  class: "agentation-marker__tooltip-action",
                  title: "Delete annotation",
                  onClick: v
                }, [...A[2] || (A[2] = [
                  s("svg", {
                    class: "agentation-marker__tooltip-action-icon",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    s("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ], -1)
                ])])
              ])
            ]),
            s("div", Ke, [
              s("p", Ze, I(e.annotation.comment), 1),
              e.annotation.selectedText ? ($(), _("p", Je, ' "' + I(e.annotation.selectedText) + '" ', 1)) : V("", !0)
            ]),
            s("div", Xe, I(new Date(e.annotation.timestamp).toLocaleString()), 1)
          ], 2)) : V("", !0)
        ]),
        _: 1
      })
    ], 38));
  }
}), et = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, a] of t)
    n[o] = a;
  return n;
}, ye = /* @__PURE__ */ et(Qe, [["__scopeId", "data-v-8b7a5f10"]]), tt = "agentation-annotations-", we = "agentation-settings", nt = 7;
function de(e) {
  return `${tt}${e}`;
}
function le() {
  if (typeof window > "u") return "/";
  const e = window.location.hash;
  return e && e.startsWith("#/") ? e.slice(1) : window.location.pathname;
}
function be(e) {
  if (typeof window > "u") return [];
  try {
    const t = localStorage.getItem(de(e));
    if (!t) return [];
    const n = JSON.parse(t), o = Date.now() - nt * 24 * 60 * 60 * 1e3;
    return n.filter(
      (a) => !a.timestamp || a.timestamp > o
    );
  } catch {
    return [];
  }
}
function se(e, t) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(de(e), JSON.stringify(t));
    } catch {
    }
}
function ot(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.removeItem(de(e));
    } catch {
    }
}
function Bt() {
  if (typeof window > "u") return null;
  try {
    const e = localStorage.getItem(we);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
}
function Ft(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(we, JSON.stringify(e));
    } catch {
    }
}
function it() {
  if (typeof window > "u") return null;
  try {
    const e = localStorage.getItem("agentation-theme");
    return e === "light" || e === "dark" ? e : null;
  } catch {
    return null;
  }
}
function xe(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem("agentation-theme", e);
    } catch {
    }
}
let ie = null;
function at() {
  const e = C([]), t = C(null), n = C(null), o = C("");
  function a(l) {
    o.value = l, e.value = be(l);
  }
  function r(l) {
    o.value = l, e.value = be(l), t.value = null, n.value = null;
  }
  function h(l, b) {
    const f = {
      id: crypto.randomUUID(),
      x: l.x,
      y: l.y,
      comment: b,
      element: l.element,
      elementPath: l.elementPath,
      timestamp: Date.now(),
      selectedText: l.selectedText,
      boundingBox: l.boundingBox,
      nearbyText: l.nearbyText,
      cssClasses: l.cssClasses,
      nearbyElements: l.nearbyElements,
      computedStyles: l.computedStyles,
      fullPath: l.fullPath,
      accessibility: l.accessibility,
      isFixed: l.isFixed
    };
    return e.value = [...e.value, f], se(o.value, e.value), t.value = null, f;
  }
  function x(l) {
    const b = e.value.find((f) => f.id === l);
    return b ? (e.value = e.value.filter((f) => f.id !== l), se(o.value, e.value), b) : null;
  }
  function v(l, b) {
    const f = e.value.findIndex((M) => M.id === l);
    if (f === -1) return null;
    const w = { ...e.value[f], comment: b };
    return e.value = [
      ...e.value.slice(0, f),
      w,
      ...e.value.slice(f + 1)
    ], se(o.value, e.value), n.value = null, w;
  }
  function P() {
    e.value = [], ot(o.value);
  }
  function L(l) {
    t.value = l;
  }
  function E(l) {
    n.value = l;
  }
  function y(l) {
    return e.value.find((b) => b.id === l);
  }
  function A(l) {
    return e.value.findIndex((b) => b.id === l);
  }
  const g = z(() => e.value.length), u = z(() => e.value.length === 0);
  return {
    annotations: F(e),
    pendingAnnotation: F(t),
    editingAnnotationId: F(n),
    count: g,
    isEmpty: u,
    initialize: a,
    switchPath: r,
    add: h,
    remove: x,
    update: v,
    clear: P,
    setPending: L,
    setEditing: E,
    getById: y,
    getIndex: A
  };
}
function lt() {
  return ie || (ie = at()), ie;
}
function Dt() {
  ie = null;
}
function st(e, t = 3) {
  const n = [];
  let o = e, a = 0;
  for (; o && o !== document.body && a < t; ) {
    let r = o.tagName.toLowerCase();
    if (o.id)
      r += `#${o.id}`;
    else if (o.classList.length > 0) {
      const h = Array.from(o.classList).find(
        (x) => !x.match(/^_/) && !x.match(/[A-Za-z]+_[a-z0-9]{5,}/)
      );
      h && (r += `.${h}`);
    }
    n.unshift(r), o = o.parentElement, a++;
  }
  return n.join(" > ");
}
function rt(e) {
  const t = [];
  let n = e;
  for (; n && n !== document.documentElement; ) {
    let o = n.tagName.toLowerCase();
    if (n.id)
      o += `#${n.id}`;
    else {
      const a = n.parentElement;
      if (a) {
        const r = Array.from(a.children).filter(
          (h) => h.tagName === n.tagName
        );
        if (r.length > 1) {
          const h = r.indexOf(n) + 1;
          o += `:nth-of-type(${h})`;
        }
      }
    }
    t.unshift(o), n = n.parentElement;
  }
  return t.join(" > ");
}
function $e(e) {
  var o, a, r, h, x, v, P, L, E, y, A, g, u, l, b, f, w, M, T, B, O, Z, J, D, X, W;
  const t = st(e), n = e.tagName.toLowerCase();
  if (e instanceof SVGElement || e.closest("svg")) {
    const i = e.closest("svg"), p = (o = i == null ? void 0 : i.querySelector("title")) == null ? void 0 : o.textContent, S = i == null ? void 0 : i.getAttribute("aria-label");
    return {
      name: p || S || "SVG graphic",
      path: t
    };
  }
  if (n === "button" || e.getAttribute("role") === "button")
    return { name: `Button: "${((a = e.textContent) == null ? void 0 : a.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Button"}"`, path: t };
  if (n === "a")
    return { name: `Link: "${((r = e.textContent) == null ? void 0 : r.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Link"}"`, path: t };
  if (n === "input" || n === "textarea" || n === "select") {
    if (e.id)
      return { name: `${n}#${e.id}`, path: t };
    if (e.classList.length > 0) {
      const U = Array.from(e.classList).filter((R) => !(R.match(/^_[a-zA-Z0-9]+$/) || R.match(/[A-Za-z]+_[a-z0-9]{5,}$/)));
      if (U.length > 0) {
        const R = U.slice(0, 2).join(".");
        return { name: `${n}.${R}`, path: t };
      }
    }
    const i = e.id ? document.querySelector(`label[for="${e.id}"]`) : null, p = (h = i == null ? void 0 : i.textContent) == null ? void 0 : h.trim(), S = e.getAttribute("aria-label"), Q = e.getAttribute("placeholder"), Y = e.getAttribute("name"), q = n === "select" ? "select" : n === "textarea" ? "textarea" : e.type || "text", ee = p || S || Q || Y;
    return ee ? { name: `${n}[${q}]: "${ee.slice(0, 30)}"`, path: t } : { name: n === "input" ? `${n}[${q}]` : n, path: t };
  }
  if (/^h[1-6]$/.test(n)) {
    const i = (x = e.textContent) == null ? void 0 : x.trim().slice(0, 40);
    return { name: i ? `${n}: "${i}"` : n, path: t };
  }
  if (n === "p") {
    const i = (v = e.textContent) == null ? void 0 : v.trim();
    return i && i.length > 0 ? { name: `Paragraph: "${i.slice(0, 40) + (i.length > 40 ? "..." : "")}"`, path: t } : { name: "Paragraph", path: t };
  }
  if (n === "img") {
    const i = e.alt;
    return { name: i ? `Image: "${i}"` : "Image", path: t };
  }
  if (n === "label") {
    const i = e.getAttribute("for"), p = (P = e.textContent) == null ? void 0 : P.trim().slice(0, 30);
    return i ? { name: `Label[for="${i}"]: "${p || ""}"`, path: t } : { name: p ? `Label: "${p}"` : "Label", path: t };
  }
  if (n === "table") {
    const i = (E = (L = e.querySelector("caption")) == null ? void 0 : L.textContent) == null ? void 0 : E.trim().slice(0, 30), p = e.getAttribute("aria-label");
    return { name: i || p ? `Table: "${i || p}"` : "Table", path: t };
  }
  if (n === "thead") return { name: "Table header", path: t };
  if (n === "tbody") return { name: "Table body", path: t };
  if (n === "tfoot") return { name: "Table footer", path: t };
  if (n === "tr") {
    const i = e.rowIndex;
    return { name: `Table row ${i >= 0 ? `#${i + 1}` : ""}`, path: t };
  }
  if (n === "th") {
    const i = (y = e.textContent) == null ? void 0 : y.trim().slice(0, 25);
    return { name: i ? `Table header: "${i}"` : "Table header cell", path: t };
  }
  if (n === "td") {
    const i = (A = e.textContent) == null ? void 0 : A.trim().slice(0, 25);
    return { name: i ? `Table cell: "${i}"` : "Table cell", path: t };
  }
  if (n === "form") {
    const i = e.getAttribute("name") || e.getAttribute("id"), p = e.getAttribute("action");
    return i ? { name: `Form: "${i}"`, path: t } : p ? { name: `Form → ${p.slice(0, 30)}`, path: t } : { name: "Form", path: t };
  }
  if (n === "fieldset") {
    const i = (u = (g = e.querySelector("legend")) == null ? void 0 : g.textContent) == null ? void 0 : u.trim().slice(0, 30);
    return { name: i ? `Fieldset: "${i}"` : "Fieldset", path: t };
  }
  if (n === "legend") {
    const i = (l = e.textContent) == null ? void 0 : l.trim().slice(0, 30);
    return { name: i ? `Legend: "${i}"` : "Legend", path: t };
  }
  if (n === "video") {
    const i = e.src || ((b = e.querySelector("source")) == null ? void 0 : b.src);
    return { name: i ? `Video: ${((f = i.split("/").pop()) == null ? void 0 : f.slice(0, 25)) || "video"}` : "Video", path: t };
  }
  if (n === "audio") {
    const i = e.src || ((w = e.querySelector("source")) == null ? void 0 : w.src);
    return { name: i ? `Audio: ${((M = i.split("/").pop()) == null ? void 0 : M.slice(0, 25)) || "audio"}` : "Audio", path: t };
  }
  if (n === "iframe") {
    const i = e.getAttribute("title"), p = e.src;
    if (i) return { name: `Iframe: "${i}"`, path: t };
    if (p)
      try {
        return { name: `Iframe: ${new URL(p).hostname}`, path: t };
      } catch {
        return { name: "Iframe", path: t };
      }
    return { name: "Iframe", path: t };
  }
  if (n === "code") {
    const i = e.parentElement, p = (i == null ? void 0 : i.tagName.toLowerCase()) === "pre", S = (T = e.textContent) == null ? void 0 : T.trim().slice(0, 30);
    return { name: p ? "Code block" : S ? `Code: "${S}"` : "Inline code", path: t };
  }
  if (n === "pre")
    return { name: e.querySelector("code") ? "Code block" : "Preformatted text", path: t };
  if (n === "dialog") {
    const i = e.getAttribute("aria-label") || e.getAttribute("aria-labelledby"), S = e.open ? " (open)" : "";
    return { name: i ? `Dialog: "${i}"${S}` : `Dialog${S}`, path: t };
  }
  if (n === "progress") {
    const i = e.value, p = e.max;
    return { name: `Progress: ${Math.round(i / p * 100)}%`, path: t };
  }
  if (n === "meter")
    return { name: `Meter: ${e.value}`, path: t };
  if (n === "canvas") {
    const i = e.getAttribute("aria-label");
    return { name: i ? `Canvas: "${i}"` : "Canvas", path: t };
  }
  if (n === "figure") {
    const i = (O = (B = e.querySelector("figcaption")) == null ? void 0 : B.textContent) == null ? void 0 : O.trim().slice(0, 30);
    return { name: i ? `Figure: "${i}"` : "Figure", path: t };
  }
  if (n === "figcaption") {
    const i = (Z = e.textContent) == null ? void 0 : Z.trim().slice(0, 30);
    return { name: i ? `Caption: "${i}"` : "Figure caption", path: t };
  }
  if (n === "blockquote") {
    const i = e.getAttribute("cite"), p = (J = e.textContent) == null ? void 0 : J.trim().slice(0, 30);
    return i ? { name: `Blockquote from ${i}`, path: t } : { name: p ? `Blockquote: "${p}..."` : "Blockquote", path: t };
  }
  if (n === "ul")
    return { name: `Unordered list (${e.querySelectorAll(":scope > li").length} items)`, path: t };
  if (n === "ol") {
    const i = e.querySelectorAll(":scope > li").length, p = e.start || 1;
    return { name: `Ordered list (${i} items, starts at ${p})`, path: t };
  }
  if (n === "li") {
    const i = (D = e.textContent) == null ? void 0 : D.trim().slice(0, 25);
    return { name: i ? `List item: "${i}"` : "List item", path: t };
  }
  if (n === "dl")
    return { name: "Definition list", path: t };
  if (n === "dt") {
    const i = (X = e.textContent) == null ? void 0 : X.trim().slice(0, 25);
    return { name: i ? `Term: "${i}"` : "Definition term", path: t };
  }
  if (n === "dd") {
    const i = (W = e.textContent) == null ? void 0 : W.trim().slice(0, 25);
    return { name: i ? `Definition: "${i}"` : "Definition", path: t };
  }
  if (e.classList.length > 0) {
    const i = Array.from(e.classList).filter((p) => !(p.match(/^_[a-zA-Z0-9]+$/) || p.match(/[A-Za-z]+_[a-z0-9]{5,}$/)));
    if (i.length > 0) {
      const p = i.slice(0, 3).join(".");
      return { name: `${n}.${p}`, path: t };
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
function Nt(e) {
  var o;
  const t = e.tagName.toLowerCase();
  if (e instanceof SVGElement || e.closest("svg"))
    return "icon";
  if (t === "button" || e.getAttribute("role") === "button")
    return "button";
  const n = ((o = e.className) == null ? void 0 : o.toString()) || "";
  return n.includes("spinner") || n.includes("loader") || n.includes("loading") ? "spinner" : t;
}
function ut(e) {
  var r, h, x;
  const t = [], n = e.previousElementSibling;
  if (n) {
    const v = (r = n.textContent) == null ? void 0 : r.trim();
    v && v.length < 100 && t.push(`[prev]: ${v.slice(0, 50)}`);
  }
  const o = (h = e.textContent) == null ? void 0 : h.trim();
  o && o.length < 200 && t.push(o.slice(0, 80));
  const a = e.nextElementSibling;
  if (a) {
    const v = (x = a.textContent) == null ? void 0 : x.trim();
    v && v.length < 100 && t.push(`[next]: ${v.slice(0, 50)}`);
  }
  return t.join(" | ");
}
function ct(e) {
  const t = [], n = e.parentElement;
  n && n !== document.body && t.push(`parent: ${n.tagName.toLowerCase()}`);
  const o = e.previousElementSibling;
  o && t.push(`prev: ${o.tagName.toLowerCase()}`);
  const a = e.nextElementSibling;
  a && t.push(`next: ${a.tagName.toLowerCase()}`);
  const r = e.children.length;
  return r > 0 && t.push(`children: ${r}`), t.join(", ");
}
function dt(e) {
  return !e.classList || e.classList.length === 0 ? "" : Array.from(e.classList).filter((t) => !(t.match(/^_[a-zA-Z0-9]+$/) || t.match(/[A-Za-z]+_[a-z0-9]{5,}$/))).join(" ");
}
function ft(e) {
  const t = window.getComputedStyle(e), n = e.tagName.toLowerCase(), o = [];
  return o.push(`display: ${t.display}`), o.push(`position: ${t.position}`), ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "a", "button"].includes(
    n
  ) && (o.push(`font-size: ${t.fontSize}`), o.push(`font-weight: ${t.fontWeight}`), o.push(`color: ${t.color}`), o.push(`line-height: ${t.lineHeight}`)), ["div", "section", "article", "main", "nav", "header", "footer"].includes(
    n
  ) && (o.push(`width: ${t.width}`), o.push(`height: ${t.height}`), o.push(`padding: ${t.padding}`), o.push(`margin: ${t.margin}`), (t.display === "flex" || t.display === "inline-flex") && (o.push(`flex-direction: ${t.flexDirection}`), o.push(`justify-content: ${t.justifyContent}`), o.push(`align-items: ${t.alignItems}`), o.push(`gap: ${t.gap}`)), (t.display === "grid" || t.display === "inline-grid") && (o.push(`grid-template-columns: ${t.gridTemplateColumns}`), o.push(`grid-template-rows: ${t.gridTemplateRows}`), o.push(`gap: ${t.gap}`))), t.backgroundColor !== "rgba(0, 0, 0, 0)" && o.push(`background-color: ${t.backgroundColor}`), t.borderWidth !== "0px" && o.push(`border: ${t.border}`), t.borderRadius !== "0px" && o.push(`border-radius: ${t.borderRadius}`), o.join("; ");
}
function zt(e) {
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
    const a = t.getPropertyValue(o);
    return a && a !== "none" && a !== "normal" && a !== "auto" ? `${o}: ${a}` : null;
  }).filter(Boolean).join("; ");
}
function mt(e) {
  const t = [], n = e.getAttribute("role");
  n && t.push(`role="${n}"`);
  const o = Array.from(e.attributes).filter((h) => h.name.startsWith("aria-")).map((h) => `${h.name}="${h.value}"`).join(" ");
  o && t.push(o);
  const a = e.getAttribute("tabindex");
  return a !== null && t.push(`tabindex="${a}"`), ["a", "button", "input", "textarea", "select"].includes(e.tagName.toLowerCase()) && t.push("focusable"), t.join(" ");
}
function pt(e) {
  let t = e;
  for (; t && t !== document.body; ) {
    const n = window.getComputedStyle(t).position;
    if (n === "fixed" || n === "sticky")
      return !0;
    t = t.parentElement;
  }
  return !1;
}
function ht(e) {
  const t = C(!1), n = C(null), o = C(null), a = C(null), r = C(null), h = "[data-agentation-ignore]";
  function x(g) {
    return !!(g.closest(h) || g === document.body || g === document.documentElement);
  }
  function v(g) {
    var l, b;
    const u = g.target;
    if (r.value = { x: g.clientX, y: g.clientY }, x(u)) {
      n.value = null, o.value = null, a.value = null, (l = e.onHoverChange) == null || l.call(e, null);
      return;
    }
    if (u !== n.value) {
      n.value = u;
      const f = u.getBoundingClientRect();
      o.value = f;
      const { name: w, path: M } = $e(u), T = {
        element: u,
        name: w,
        path: M,
        rect: f
      };
      a.value = T, (b = e.onHoverChange) == null || b.call(e, T);
    }
  }
  function P(g) {
    g.preventDefault(), g.stopPropagation();
    const u = g.target;
    if (x(u))
      return;
    const { name: l, path: b } = $e(u), f = u.getBoundingClientRect(), w = window.innerWidth, M = window.scrollY, T = pt(u), B = {
      x: (f.left + f.width / 2) / w * 100,
      y: T ? f.top + f.height / 2 : f.top + f.height / 2 + M,
      element: l,
      elementPath: b,
      boundingBox: {
        x: f.left,
        y: f.top,
        width: f.width,
        height: f.height
      },
      nearbyText: ut(u),
      nearbyElements: ct(u),
      cssClasses: dt(u),
      computedStyles: ft(u),
      fullPath: rt(u),
      accessibility: mt(u),
      isFixed: T
    };
    y(), e.onSelect(B, u);
  }
  function L(g) {
    g.key === "Escape" && y();
  }
  function E() {
    t.value || (t.value = !0, document.addEventListener("mousemove", v, { capture: !0 }), document.addEventListener("click", P, { capture: !0 }), document.addEventListener("keydown", L), document.body.style.cursor = "crosshair");
  }
  function y() {
    var g;
    t.value && (t.value = !1, n.value = null, o.value = null, a.value = null, r.value = null, document.removeEventListener("mousemove", v, {
      capture: !0
    }), document.removeEventListener("click", P, { capture: !0 }), document.removeEventListener("keydown", L), document.body.style.cursor = "", (g = e.onHoverChange) == null || g.call(e, null));
  }
  function A() {
    t.value ? y() : E();
  }
  return ae(() => {
    t.value && y();
  }), {
    isActive: F(t),
    hoveredElement: F(n),
    highlightBox: F(o),
    elementInfo: F(a),
    cursorPosition: F(r),
    start: E,
    stop: y,
    toggle: A
  };
}
const gt = "agentation-animation-freeze", re = "--agentation-animation-state";
function vt() {
  const e = C(!1);
  let t = null;
  function n() {
    e.value || (document.documentElement.style.setProperty(re, "paused"), t || (t = document.createElement("style"), t.id = gt, t.textContent = `
        *,
        *::before,
        *::after {
          animation-play-state: var(${re}, running) !important;
        }
      `, document.head.appendChild(t)), document.querySelectorAll("video").forEach((r) => {
      r.paused || (r.dataset.agentationWasPlaying = "true", r.pause());
    }), e.value = !0);
  }
  function o() {
    e.value && (document.documentElement.style.removeProperty(re), t && t.parentNode && (t.parentNode.removeChild(t), t = null), document.querySelectorAll("video[data-agentation-was-playing]").forEach((r) => {
      delete r.dataset.agentationWasPlaying, r.play().catch(() => {
      });
    }), e.value = !1);
  }
  function a() {
    e.value ? o() : n();
  }
  return ae(() => {
    e.value && o();
  }), {
    isPaused: F(e),
    pause: n,
    resume: o,
    toggle: a
  };
}
function yt() {
  const e = C(!1);
  function t() {
    const a = it();
    a ? e.value = a === "dark" : typeof window < "u" && (e.value = window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function n() {
    e.value = !e.value, xe(e.value ? "dark" : "light");
  }
  function o(a) {
    e.value = a, xe(a ? "dark" : "light");
  }
  return K(() => {
    t();
  }), {
    isDark: F(e),
    toggle: n,
    set: o,
    initialize: t
  };
}
function bt(e, t = "standard") {
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
  return e.forEach((o, a) => {
    if (n.push(`## ${a + 1}. ${o.element}`), n.push(""), n.push(`**Comment:** ${o.comment}`), n.push(""), n.push(`**Selector:** \`${o.elementPath}\``), n.push(""), n.push(
      `**Position:** x=${o.x.toFixed(1)}%, y=${o.y.toFixed(0)}px`
    ), n.push(""), o.selectedText && (n.push(`**Selected Text:** "${o.selectedText}"`), n.push("")), o.boundingBox) {
      const r = o.boundingBox;
      n.push(
        `**Bounding Box:** x=${r.x.toFixed(0)}, y=${r.y.toFixed(0)}, w=${r.width.toFixed(0)}, h=${r.height.toFixed(0)}`
      ), n.push("");
    }
    t !== "compact" && (o.nearbyText && (n.push(`**Nearby Text:** ${o.nearbyText}`), n.push("")), o.cssClasses && (n.push(`**CSS Classes:** \`${o.cssClasses}\``), n.push(""))), (t === "detailed" || t === "forensic") && (o.nearbyElements && (n.push(`**Nearby Elements:** ${o.nearbyElements}`), n.push("")), o.accessibility && (n.push(`**Accessibility:** ${o.accessibility}`), n.push(""))), t === "forensic" && (o.fullPath && (n.push(`**Full Path:** \`${o.fullPath}\``), n.push("")), o.computedStyles && (n.push("**Computed Styles:**"), n.push("```css"), n.push(o.computedStyles), n.push("```"), n.push(""))), n.push("---"), n.push("");
  }), n.join(`
`);
}
function jt(e) {
  return [
    `[${e.element}]`,
    e.comment,
    `(${e.elementPath})`
  ].join(" ");
}
const xt = ["aria-pressed"], $t = ["aria-pressed", "title"], wt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, kt = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, Ct = ["disabled", "title"], _t = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, At = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, St = {
  key: 2,
  class: "agentation-toolbar__badge"
}, Et = ["disabled"], Tt = ["title"], Lt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, Pt = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, It = {
  style: { position: "absolute", inset: "0", "z-index": "99998", "pointer-events": "none" },
  "data-agentation-ignore": ""
}, ue = "#3b82f6", ne = 4, Vt = /* @__PURE__ */ ce({
  __name: "Agentation",
  emits: ["annotation-add", "annotation-delete", "annotation-update", "annotations-clear", "copy"],
  setup(e, { emit: t }) {
    const n = t, {
      annotations: o,
      pendingAnnotation: a,
      editingAnnotationId: r,
      count: h,
      isEmpty: x,
      initialize: v,
      switchPath: P,
      add: L,
      remove: E,
      update: y,
      clear: A,
      setPending: g,
      setEditing: u,
      getById: l
    } = lt(), { isPaused: b, toggle: f } = vt(), { isDark: w, toggle: M } = yt(), T = C(!1), B = C(null), O = C(!1), Z = z(() => {
      if (a.value)
        return a.value.x / 100 * (typeof window < "u" ? window.innerWidth : 0);
      if (r.value) {
        const d = l(r.value);
        return d ? d.x / 100 * (typeof window < "u" ? window.innerWidth : 0) : 0;
      }
      return 0;
    }), J = z(() => {
      if (a.value) {
        const d = typeof window < "u" ? window.scrollY : 0;
        return a.value.isFixed ? a.value.y : a.value.y - d;
      } else if (r.value) {
        const d = l(r.value);
        if (!d) return 0;
        const c = typeof window < "u" ? window.scrollY : 0;
        return d.isFixed ? d.y : d.y - c;
      }
      return 0;
    }), D = z(() => {
      if (a.value)
        return {
          element: a.value.element,
          selectedText: a.value.selectedText,
          computedStyles: a.value.computedStyles,
          initialValue: "",
          submitLabel: "Add"
        };
      if (r.value) {
        const d = l(r.value);
        if (d)
          return {
            element: d.element,
            selectedText: d.selectedText,
            computedStyles: d.computedStyles,
            initialValue: d.comment,
            submitLabel: "Update"
          };
      }
      return null;
    }), X = z(() => {
      if (!S.value) return {};
      const d = typeof window < "u" ? window.innerWidth : 1e3, c = 150, k = 32;
      let N = S.value.x + ne, G = S.value.y - k - ne;
      return N + c > d && (N = S.value.x - c - ne), G < 0 && (G = S.value.y + ne), {
        left: `${N}px`,
        top: `${G}px`
      };
    }), {
      isActive: W,
      highlightBox: i,
      elementInfo: p,
      cursorPosition: S,
      toggle: Q
    } = ht({
      onSelect: (d) => {
        g(d), u(null), T.value = !0;
      },
      onHoverChange: () => {
      }
    }), Y = C(le());
    let q = null;
    function ee() {
      const d = le();
      d !== Y.value && (Y.value = d, P(d));
    }
    function U() {
      ee(), q = requestAnimationFrame(U);
    }
    K(() => {
      if (typeof window < "u") {
        const d = le();
        Y.value = d, v(d), q = requestAnimationFrame(U);
      }
    }), ae(() => {
      q !== null && (cancelAnimationFrame(q), q = null);
    });
    function R(d) {
      if (a.value) {
        const c = L(a.value, d);
        T.value = !1, n("annotation-add", c);
      } else if (r.value) {
        const c = y(r.value, d);
        T.value = !1, u(null), c && n("annotation-update", c);
      }
    }
    function ke() {
      T.value = !1, g(null), u(null);
    }
    function fe(d) {
      const c = E(d.id);
      c && n("annotation-delete", c);
    }
    function me(d) {
      g(null), u(d.id), T.value = !0;
    }
    function Ce() {
      o.value.length !== 0 && confirm("Clear all annotations?") && (A(), n("annotations-clear"));
    }
    async function _e() {
      const d = bt([...o.value]);
      try {
        await navigator.clipboard.writeText(d), O.value = !0, setTimeout(() => {
          O.value = !1;
        }, 2e3);
      } catch {
        console.log(d);
      }
      n("copy", d);
    }
    function pe(d) {
      console.log("Marker clicked:", d);
    }
    return (d, c) => ($(), te(Ie, { to: "body" }, [
      s("div", {
        class: j(["agentation-toolbar", m(w) ? "agentation-toolbar--dark" : ""]),
        "data-agentation-ignore": "",
        role: "toolbar",
        "aria-label": "Agentation annotation tools"
      }, [
        s("button", {
          type: "button",
          class: j(["agentation-toolbar__button", m(W) && "agentation-toolbar__button--active"]),
          "aria-pressed": m(W),
          title: "Select element to annotate",
          onClick: c[0] || (c[0] = //@ts-ignore
          (...k) => m(Q) && m(Q)(...k))
        }, [...c[5] || (c[5] = [
          s("svg", {
            class: "agentation-toolbar__icon",
            fill: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            s("path", { d: "M4 4l7.07 17 2.51-7.39L21 11.07 4 4zm9.33 8.33l-1.62 4.79L6.27 6.27l10.85 5.06-3.79 1z" })
          ], -1)
        ])], 10, xt),
        s("button", {
          type: "button",
          class: j(["agentation-toolbar__button", m(b) && "agentation-toolbar__button--paused"]),
          "aria-pressed": m(b),
          title: m(b) ? "Resume animations" : "Pause animations",
          onClick: c[1] || (c[1] = //@ts-ignore
          (...k) => m(f) && m(f)(...k))
        }, [
          m(b) ? ($(), _("svg", wt, [...c[6] || (c[6] = [
            s("path", { d: "M8 5v14l11-7z" }, null, -1)
          ])])) : ($(), _("svg", kt, [...c[7] || (c[7] = [
            s("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" }, null, -1)
          ])]))
        ], 10, $t),
        c[13] || (c[13] = s("div", { class: "agentation-toolbar__divider" }, null, -1)),
        s("button", {
          type: "button",
          class: j(["agentation-toolbar__button", O.value && "agentation-toolbar__button--success"]),
          disabled: m(x),
          title: `Copy ${m(h)} annotation(s) as markdown`,
          onClick: _e
        }, [
          O.value ? ($(), _("svg", _t, [...c[8] || (c[8] = [
            s("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M5 13l4 4L19 7"
            }, null, -1)
          ])])) : ($(), _("svg", At, [...c[9] || (c[9] = [
            s("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            }, null, -1)
          ])])),
          m(h) > 0 ? ($(), _("span", St, I(m(h)), 1)) : V("", !0)
        ], 10, Ct),
        s("button", {
          type: "button",
          class: "agentation-toolbar__button",
          disabled: m(x),
          title: "Clear all annotations",
          onClick: Ce
        }, [...c[10] || (c[10] = [
          s("svg", {
            class: "agentation-toolbar__icon",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            s("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            })
          ], -1)
        ])], 8, Et),
        c[14] || (c[14] = s("div", { class: "agentation-toolbar__divider" }, null, -1)),
        s("button", {
          type: "button",
          class: "agentation-toolbar__button",
          title: m(w) ? "Switch to light mode" : "Switch to dark mode",
          onClick: c[2] || (c[2] = //@ts-ignore
          (...k) => m(M) && m(M)(...k))
        }, [
          m(w) ? ($(), _("svg", Lt, [...c[11] || (c[11] = [
            s("path", { d: "M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" }, null, -1)
          ])])) : ($(), _("svg", Pt, [...c[12] || (c[12] = [
            s("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            }, null, -1)
          ])]))
        ], 8, Tt)
      ], 2),
      m(W) && m(i) ? ($(), _("div", {
        key: 0,
        class: "agentation-highlight",
        style: H({
          left: `${m(i).left}px`,
          top: `${m(i).top}px`,
          width: `${m(i).width}px`,
          height: `${m(i).height}px`
        }),
        "data-agentation-ignore": ""
      }, null, 4)) : V("", !0),
      m(W) && m(p) && m(S) ? ($(), _("div", {
        key: 1,
        class: "agentation-highlight__tooltip",
        style: H(X.value),
        "data-agentation-ignore": ""
      }, I(m(p).name), 5)) : V("", !0),
      s("div", It, [
        ($(!0), _(ge, null, ve(m(o).filter((k) => !k.isFixed), (k, N) => ($(), te(ye, {
          key: k.id,
          annotation: k,
          index: N,
          dark: m(w),
          "accent-color": ue,
          "is-hovered": B.value === k.id,
          style: { "pointer-events": "auto" },
          onClick: pe,
          onEdit: me,
          onDelete: fe,
          onMouseenter: (G) => B.value = k.id,
          onMouseleave: c[3] || (c[3] = (G) => B.value = null)
        }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128))
      ]),
      ($(!0), _(ge, null, ve(m(o).filter((k) => k.isFixed), (k) => ($(), te(ye, {
        key: k.id,
        annotation: k,
        index: m(o).findIndex((N) => N.id === k.id),
        dark: m(w),
        "accent-color": ue,
        "is-hovered": B.value === k.id,
        onClick: pe,
        onEdit: me,
        onDelete: fe,
        onMouseenter: (N) => B.value = k.id,
        onMouseleave: c[4] || (c[4] = (N) => B.value = null)
      }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128)),
      T.value && D.value ? ($(), te(Oe, {
        key: 2,
        element: D.value.element,
        x: Z.value,
        y: J.value,
        "selected-text": D.value.selectedText,
        "computed-styles": D.value.computedStyles,
        "initial-value": D.value.initialValue,
        "submit-label": D.value.submitLabel,
        dark: m(w),
        "accent-color": ue,
        onSubmit: R,
        onCancel: ke
      }, null, 8, ["element", "x", "y", "selected-text", "computed-styles", "initial-value", "submit-label", "dark"])) : V("", !0)
    ]));
  }
});
export {
  Vt as Agentation,
  ye as AnnotationMarker,
  Oe as AnnotationPopup,
  ot as clearAnnotations,
  jt as generateAnnotationSummary,
  bt as generateMarkdown,
  mt as getAccessibilityInfo,
  le as getCurrentRoutePath,
  ft as getDetailedComputedStyles,
  dt as getElementClasses,
  st as getElementPath,
  zt as getForensicComputedStyles,
  rt as getFullElementPath,
  ct as getNearbyElements,
  ut as getNearbyText,
  de as getStorageKey,
  Nt as identifyAnimationElement,
  $e as identifyElement,
  pt as isElementFixed,
  be as loadAnnotations,
  Bt as loadSettings,
  it as loadTheme,
  Dt as resetAnnotations,
  se as saveAnnotations,
  Ft as saveSettings,
  xe as saveTheme,
  vt as useAnimationPause,
  lt as useAnnotations,
  ht as useElementSelection,
  yt as useTheme
};
