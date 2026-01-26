import { defineComponent as J, ref as $, computed as D, onMounted as j, nextTick as ge, onUnmounted as W, openBlock as k, createElementBlock as C, normalizeStyle as N, normalizeClass as P, createElementVNode as l, toDisplayString as _, createCommentVNode as M, withDirectives as he, vModelText as ve, createTextVNode as V, createVNode as ye, Transition as be, withCtx as xe, withModifiers as we, readonly as B, createBlock as H, Teleport as ke, unref as d, Fragment as oe, renderList as ie } from "vue";
const $e = ["aria-label"], Ce = { class: "agentation-popup__header" }, Ae = { class: "agentation-popup__header-content" }, Se = { class: "agentation-popup__header-title" }, Ee = {
  key: 0,
  class: "agentation-popup__header-selected"
}, _e = { class: "agentation-popup__body" }, Te = {
  key: 0,
  style: { "margin-top": "0.5rem" }
}, Le = {
  key: 0,
  class: "agentation-popup__styles-pre"
}, Pe = { class: "agentation-popup__footer" }, Me = { class: "agentation-popup__actions" }, Be = /* @__PURE__ */ J({
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
    const o = n, i = $(e.initialValue), r = $(null), p = $(!1), x = $(!1), y = $("initial"), E = D(() => {
      let w = e.x, S = e.y + 20;
      return typeof window < "u" && (w + 320 > window.innerWidth - 16 && (w = window.innerWidth - 320 - 16), w < 16 && (w = 16), S + 200 > window.innerHeight - 16 && (S = e.y - 200 - 10), S < 16 && (S = 16)), {
        left: `${w}px`,
        top: `${S}px`
      };
    });
    function A() {
      const v = i.value.trim();
      if (!v) {
        u();
        return;
      }
      o("submit", v);
    }
    function g() {
      y.value = "exit", setTimeout(() => {
        o("cancel");
      }, 150);
    }
    function u() {
      p.value = !0, setTimeout(() => {
        p.value = !1;
      }, 500);
    }
    function m(v) {
      v.key === "Enter" && (v.metaKey || v.ctrlKey) ? (v.preventDefault(), A()) : v.key === "Escape" && (v.preventDefault(), g());
    }
    j(() => {
      y.value = "enter", ge(() => {
        var v;
        y.value = "entered", (v = r.value) == null || v.focus();
      });
    });
    function h(v) {
      v.key === "Escape" && g();
    }
    return j(() => {
      document.addEventListener("keydown", h);
    }), W(() => {
      document.removeEventListener("keydown", h);
    }), t({ shake: u }), (v, a) => (k(), C("div", {
      class: P(["agentation-popup", [
        e.dark ? "agentation-popup--dark" : "",
        p.value && "agentation-animate-shake",
        y.value === "initial" && "agentation-popup--entering",
        y.value === "enter" && "agentation-popup--entering",
        y.value === "entered" && "agentation-popup--entered",
        y.value === "exit" && "agentation-popup--exiting"
      ]]),
      style: N(E.value),
      "data-agentation-ignore": "",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": `Add annotation for ${e.element}`
    }, [
      l("div", Ce, [
        l("div", Ae, [
          l("div", {
            class: "agentation-popup__header-dot",
            style: N({ backgroundColor: e.accentColor })
          }, null, 4),
          l("span", Se, _(e.element), 1)
        ]),
        e.selectedText ? (k(), C("p", Ee, ' "' + _(e.selectedText) + '" ', 1)) : M("", !0)
      ]),
      l("div", _e, [
        he(l("textarea", {
          ref_key: "textareaRef",
          ref: r,
          "onUpdate:modelValue": a[0] || (a[0] = (c) => i.value = c),
          class: "agentation-popup__textarea",
          placeholder: "Add your comment...",
          onKeydown: m
        }, null, 544), [
          [ve, i.value]
        ]),
        e.computedStyles ? (k(), C("div", Te, [
          l("button", {
            type: "button",
            class: "agentation-popup__styles-toggle",
            onClick: a[1] || (a[1] = (c) => x.value = !x.value)
          }, [
            (k(), C("svg", {
              class: P(["agentation-popup__styles-icon", x.value && "agentation-popup__styles-icon--open"]),
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24"
            }, [...a[2] || (a[2] = [
              l("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M9 5l7 7-7 7"
              }, null, -1)
            ])], 2)),
            a[3] || (a[3] = V(" Computed styles ", -1))
          ]),
          x.value ? (k(), C("pre", Le, _(e.computedStyles), 1)) : M("", !0)
        ])) : M("", !0)
      ]),
      l("div", Pe, [
        a[4] || (a[4] = l("span", { class: "agentation-popup__shortcut" }, [
          l("kbd", { class: "agentation-popup__kbd" }, "⌘"),
          V(" + "),
          l("kbd", { class: "agentation-popup__kbd" }, "Enter"),
          V(" to submit ")
        ], -1)),
        l("div", Me, [
          l("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--cancel",
            onClick: g
          }, " Cancel "),
          l("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--submit",
            style: N({ backgroundColor: e.accentColor }),
            onClick: A
          }, _(e.submitLabel), 5)
        ])
      ])
    ], 14, $e));
  }
}), Ie = { class: "agentation-marker__tooltip-header" }, De = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, Ne = { class: "agentation-marker__tooltip-title" }, Fe = { class: "agentation-marker__tooltip-path" }, ze = { class: "agentation-marker__tooltip-body" }, je = { class: "agentation-marker__tooltip-comment" }, He = {
  key: 0,
  class: "agentation-marker__tooltip-selected-text"
}, Ve = { class: "agentation-marker__tooltip-footer" }, Re = /* @__PURE__ */ J({
  __name: "AnnotationMarker",
  props: {
    annotation: {},
    index: {},
    dark: { type: Boolean, default: !1 },
    accentColor: { default: "#3b82f6" },
    isHovered: { type: Boolean, default: !1 }
  },
  emits: ["click", "delete", "mouseenter", "mouseleave"],
  setup(e, { emit: t }) {
    const n = t, o = $(!1), i = $("initial"), r = D(() => {
      const g = {
        left: `${e.annotation.x}%`
      };
      return e.annotation.isFixed ? g.top = `${e.annotation.y}px` : g.top = `${e.annotation.y}px`, g;
    }), p = D(() => e.annotation.x > 70 ? "left" : "right");
    function x(g) {
      g.stopPropagation(), n("click", e.annotation);
    }
    function y(g) {
      g.stopPropagation(), i.value = "exit", setTimeout(() => {
        n("delete", e.annotation);
      }, 200);
    }
    function E() {
      o.value = !0, n("mouseenter", e.annotation);
    }
    function A() {
      o.value = !1, n("mouseleave", e.annotation);
    }
    return j(() => {
      i.value = "enter", requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          i.value = "entered";
        });
      });
    }), (g, u) => (k(), C("div", {
      class: P(["agentation-marker", [
        e.annotation.isFixed ? "agentation-marker--fixed" : "agentation-marker--absolute",
        i.value === "initial" && "agentation-marker--entering",
        i.value === "enter" && "agentation-marker--entering",
        i.value === "entered" && "agentation-marker--entered",
        i.value === "exit" && "agentation-marker--exiting"
      ]]),
      style: N(r.value),
      "data-agentation-ignore": "",
      onMouseenter: E,
      onMouseleave: A,
      onClick: x
    }, [
      l("div", {
        class: P(["agentation-marker__dot", [e.isHovered && "agentation-marker__dot--hovered"]]),
        style: N({ backgroundColor: e.accentColor })
      }, [
        V(_(e.index + 1) + " ", 1),
        l("div", {
          class: "agentation-marker__ping agentation-animate-ping",
          style: N({ backgroundColor: e.accentColor })
        }, null, 4)
      ], 6),
      ye(be, {
        "enter-active-class": "agentation-transition-enter-active",
        "enter-from-class": "agentation-transition-enter",
        "enter-to-class": "agentation-transition-enter-to",
        "leave-active-class": "agentation-transition-leave-active",
        "leave-from-class": "agentation-transition-leave",
        "leave-to-class": "agentation-transition-leave-to"
      }, {
        default: xe(() => [
          o.value ? (k(), C("div", {
            key: 0,
            class: P(["agentation-marker__tooltip", [
              e.dark ? "agentation-marker__tooltip--dark" : "",
              p.value === "left" ? "agentation-marker__tooltip--left" : "agentation-marker__tooltip--right"
            ]]),
            onClick: u[0] || (u[0] = we(() => {
            }, ["stop"]))
          }, [
            l("div", Ie, [
              l("div", De, [
                l("span", Ne, _(e.annotation.element), 1),
                l("button", {
                  type: "button",
                  class: "agentation-marker__tooltip-delete",
                  title: "Delete annotation",
                  onClick: y
                }, [...u[1] || (u[1] = [
                  l("svg", {
                    class: "agentation-marker__tooltip-delete-icon",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    })
                  ], -1)
                ])])
              ]),
              l("p", Fe, _(e.annotation.elementPath), 1)
            ]),
            l("div", ze, [
              l("p", je, _(e.annotation.comment), 1),
              e.annotation.selectedText ? (k(), C("p", He, ' "' + _(e.annotation.selectedText) + '" ', 1)) : M("", !0)
            ]),
            l("div", Ve, _(new Date(e.annotation.timestamp).toLocaleString()), 1)
          ], 2)) : M("", !0)
        ]),
        _: 1
      })
    ], 38));
  }
}), We = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
}, ae = /* @__PURE__ */ We(Re, [["__scopeId", "data-v-28a8338d"]]), Oe = "agentation-annotations-", ue = "agentation-settings", Ge = 7;
function Z(e) {
  return `${Oe}${e}`;
}
function q() {
  if (typeof window > "u") return "/";
  const e = window.location.hash;
  return e && e.startsWith("#/") ? e.slice(1) : window.location.pathname;
}
function le(e) {
  if (typeof window > "u") return [];
  try {
    const t = localStorage.getItem(Z(e));
    if (!t) return [];
    const n = JSON.parse(t), o = Date.now() - Ge * 24 * 60 * 60 * 1e3;
    return n.filter(
      (i) => !i.timestamp || i.timestamp > o
    );
  } catch {
    return [];
  }
}
function K(e, t) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(Z(e), JSON.stringify(t));
    } catch {
    }
}
function qe(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.removeItem(Z(e));
    } catch {
    }
}
function $t() {
  if (typeof window > "u") return null;
  try {
    const e = localStorage.getItem(ue);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
}
function Ct(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(ue, JSON.stringify(e));
    } catch {
    }
}
function Ke() {
  if (typeof window > "u") return null;
  try {
    const e = localStorage.getItem("agentation-theme");
    return e === "light" || e === "dark" ? e : null;
  } catch {
    return null;
  }
}
function se(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem("agentation-theme", e);
    } catch {
    }
}
let R = null;
function Ye() {
  const e = $([]), t = $(null), n = $(null), o = $("");
  function i(a) {
    o.value = a, e.value = le(a);
  }
  function r(a) {
    o.value = a, e.value = le(a), t.value = null, n.value = null;
  }
  function p(a, c) {
    const w = {
      id: crypto.randomUUID(),
      x: a.x,
      y: a.y,
      comment: c,
      element: a.element,
      elementPath: a.elementPath,
      timestamp: Date.now(),
      selectedText: a.selectedText,
      boundingBox: a.boundingBox,
      nearbyText: a.nearbyText,
      cssClasses: a.cssClasses,
      nearbyElements: a.nearbyElements,
      computedStyles: a.computedStyles,
      fullPath: a.fullPath,
      accessibility: a.accessibility,
      isFixed: a.isFixed
    };
    return e.value = [...e.value, w], K(o.value, e.value), t.value = null, w;
  }
  function x(a) {
    const c = e.value.find((w) => w.id === a);
    return c ? (e.value = e.value.filter((w) => w.id !== a), K(o.value, e.value), c) : null;
  }
  function y(a, c) {
    const w = e.value.findIndex((T) => T.id === a);
    if (w === -1) return null;
    const S = { ...e.value[w], comment: c };
    return e.value = [
      ...e.value.slice(0, w),
      S,
      ...e.value.slice(w + 1)
    ], K(o.value, e.value), n.value = null, S;
  }
  function E() {
    e.value = [], qe(o.value);
  }
  function A(a) {
    t.value = a;
  }
  function g(a) {
    n.value = a;
  }
  function u(a) {
    return e.value.find((c) => c.id === a);
  }
  function m(a) {
    return e.value.findIndex((c) => c.id === a);
  }
  const h = D(() => e.value.length), v = D(() => e.value.length === 0);
  return {
    annotations: B(e),
    pendingAnnotation: B(t),
    editingAnnotationId: B(n),
    count: h,
    isEmpty: v,
    initialize: i,
    switchPath: r,
    add: p,
    remove: x,
    update: y,
    clear: E,
    setPending: A,
    setEditing: g,
    getById: u,
    getIndex: m
  };
}
function Ue() {
  return R || (R = Ye()), R;
}
function At() {
  R = null;
}
function Je(e, t = 3) {
  const n = [];
  let o = e, i = 0;
  for (; o && o !== document.body && i < t; ) {
    let r = o.tagName.toLowerCase();
    if (o.id)
      r += `#${o.id}`;
    else if (o.classList.length > 0) {
      const p = Array.from(o.classList).find(
        (x) => !x.match(/^_/) && !x.match(/[A-Za-z]+_[a-z0-9]{5,}/)
      );
      p && (r += `.${p}`);
    }
    n.unshift(r), o = o.parentElement, i++;
  }
  return n.join(" > ");
}
function Ze(e) {
  const t = [];
  let n = e;
  for (; n && n !== document.documentElement; ) {
    let o = n.tagName.toLowerCase();
    if (n.id)
      o += `#${n.id}`;
    else {
      const i = n.parentElement;
      if (i) {
        const r = Array.from(i.children).filter(
          (p) => p.tagName === n.tagName
        );
        if (r.length > 1) {
          const p = r.indexOf(n) + 1;
          o += `:nth-of-type(${p})`;
        }
      }
    }
    t.unshift(o), n = n.parentElement;
  }
  return t.join(" > ");
}
function re(e) {
  var i, r, p, x, y, E, A, g;
  const t = Je(e), n = e.tagName.toLowerCase();
  if (e instanceof SVGElement || e.closest("svg")) {
    const u = e.closest("svg"), m = (i = u == null ? void 0 : u.querySelector("title")) == null ? void 0 : i.textContent, h = u == null ? void 0 : u.getAttribute("aria-label");
    return {
      name: m || h || "SVG graphic",
      path: t
    };
  }
  if (n === "button" || e.getAttribute("role") === "button")
    return { name: `Button: "${((r = e.textContent) == null ? void 0 : r.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Button"}"`, path: t };
  if (n === "a")
    return { name: `Link: "${((p = e.textContent) == null ? void 0 : p.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Link"}"`, path: t };
  if (n === "input" || n === "textarea" || n === "select") {
    const u = e.type || n, m = e.getAttribute("aria-label") || e.getAttribute("placeholder") || ((y = (x = document.querySelector(`label[for="${e.id}"]`)) == null ? void 0 : x.textContent) == null ? void 0 : y.trim());
    return {
      name: m ? `${u}: "${m}"` : `${u} field`,
      path: t
    };
  }
  if (/^h[1-6]$/.test(n))
    return { name: `Heading: "${((E = e.textContent) == null ? void 0 : E.trim().slice(0, 40)) || "Heading"}"`, path: t };
  if (n === "img") {
    const u = e.alt;
    return { name: u ? `Image: "${u}"` : "Image", path: t };
  }
  if (n === "p" || n === "span" || n === "div") {
    const u = (A = e.textContent) == null ? void 0 : A.trim();
    if (u && u.length > 0)
      return { name: `Text: "${u.slice(0, 40) + (u.length > 40 ? "..." : "")}"`, path: t };
  }
  if (n === "li")
    return { name: `List item: "${((g = e.textContent) == null ? void 0 : g.trim().slice(0, 40)) || "List item"}"`, path: t };
  if (["nav", "header", "footer", "main", "section", "article"].includes(n)) {
    const u = e.getAttribute("aria-label");
    return {
      name: u ? `${n}: "${u}"` : n,
      path: t
    };
  }
  const o = e.classList[0];
  return {
    name: o ? `${n}.${o}` : n,
    path: t
  };
}
function St(e) {
  var o;
  const t = e.tagName.toLowerCase();
  if (e instanceof SVGElement || e.closest("svg"))
    return "icon";
  if (t === "button" || e.getAttribute("role") === "button")
    return "button";
  const n = ((o = e.className) == null ? void 0 : o.toString()) || "";
  return n.includes("spinner") || n.includes("loader") || n.includes("loading") ? "spinner" : t;
}
function Xe(e) {
  var r, p, x;
  const t = [], n = e.previousElementSibling;
  if (n) {
    const y = (r = n.textContent) == null ? void 0 : r.trim();
    y && y.length < 100 && t.push(`[prev]: ${y.slice(0, 50)}`);
  }
  const o = (p = e.textContent) == null ? void 0 : p.trim();
  o && o.length < 200 && t.push(o.slice(0, 80));
  const i = e.nextElementSibling;
  if (i) {
    const y = (x = i.textContent) == null ? void 0 : x.trim();
    y && y.length < 100 && t.push(`[next]: ${y.slice(0, 50)}`);
  }
  return t.join(" | ");
}
function Qe(e) {
  const t = [], n = e.parentElement;
  n && n !== document.body && t.push(`parent: ${n.tagName.toLowerCase()}`);
  const o = e.previousElementSibling;
  o && t.push(`prev: ${o.tagName.toLowerCase()}`);
  const i = e.nextElementSibling;
  i && t.push(`next: ${i.tagName.toLowerCase()}`);
  const r = e.children.length;
  return r > 0 && t.push(`children: ${r}`), t.join(", ");
}
function et(e) {
  return !e.classList || e.classList.length === 0 ? "" : Array.from(e.classList).filter((t) => !(t.match(/^_[a-zA-Z0-9]+$/) || t.match(/[A-Za-z]+_[a-z0-9]{5,}$/))).join(" ");
}
function tt(e) {
  const t = window.getComputedStyle(e), n = e.tagName.toLowerCase(), o = [];
  return o.push(`display: ${t.display}`), o.push(`position: ${t.position}`), ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "a", "button"].includes(
    n
  ) && (o.push(`font-size: ${t.fontSize}`), o.push(`font-weight: ${t.fontWeight}`), o.push(`color: ${t.color}`), o.push(`line-height: ${t.lineHeight}`)), ["div", "section", "article", "main", "nav", "header", "footer"].includes(
    n
  ) && (o.push(`width: ${t.width}`), o.push(`height: ${t.height}`), o.push(`padding: ${t.padding}`), o.push(`margin: ${t.margin}`), (t.display === "flex" || t.display === "inline-flex") && (o.push(`flex-direction: ${t.flexDirection}`), o.push(`justify-content: ${t.justifyContent}`), o.push(`align-items: ${t.alignItems}`), o.push(`gap: ${t.gap}`)), (t.display === "grid" || t.display === "inline-grid") && (o.push(`grid-template-columns: ${t.gridTemplateColumns}`), o.push(`grid-template-rows: ${t.gridTemplateRows}`), o.push(`gap: ${t.gap}`))), t.backgroundColor !== "rgba(0, 0, 0, 0)" && o.push(`background-color: ${t.backgroundColor}`), t.borderWidth !== "0px" && o.push(`border: ${t.border}`), t.borderRadius !== "0px" && o.push(`border-radius: ${t.borderRadius}`), o.join("; ");
}
function Et(e) {
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
    const i = t.getPropertyValue(o);
    return i && i !== "none" && i !== "normal" && i !== "auto" ? `${o}: ${i}` : null;
  }).filter(Boolean).join("; ");
}
function nt(e) {
  const t = [], n = e.getAttribute("role");
  n && t.push(`role="${n}"`);
  const o = Array.from(e.attributes).filter((p) => p.name.startsWith("aria-")).map((p) => `${p.name}="${p.value}"`).join(" ");
  o && t.push(o);
  const i = e.getAttribute("tabindex");
  return i !== null && t.push(`tabindex="${i}"`), ["a", "button", "input", "textarea", "select"].includes(e.tagName.toLowerCase()) && t.push("focusable"), t.join(" ");
}
function ot(e) {
  let t = e;
  for (; t && t !== document.body; ) {
    const n = window.getComputedStyle(t).position;
    if (n === "fixed" || n === "sticky")
      return !0;
    t = t.parentElement;
  }
  return !1;
}
function it(e) {
  const t = $(!1), n = $(null), o = $(null), i = $(null), r = "[data-agentation-ignore]";
  function p(m) {
    return !!(m.closest(r) || m === document.body || m === document.documentElement);
  }
  function x(m) {
    var v, a;
    const h = m.target;
    if (p(h)) {
      n.value = null, o.value = null, i.value = null, (v = e.onHoverChange) == null || v.call(e, null);
      return;
    }
    if (h !== n.value) {
      n.value = h;
      const c = h.getBoundingClientRect();
      o.value = c;
      const { name: w, path: S } = re(h), T = {
        element: h,
        name: w,
        path: S,
        rect: c
      };
      i.value = T, (a = e.onHoverChange) == null || a.call(e, T);
    }
  }
  function y(m) {
    m.preventDefault(), m.stopPropagation();
    const h = m.target;
    if (p(h))
      return;
    const { name: v, path: a } = re(h), c = h.getBoundingClientRect(), w = window.innerWidth, S = window.scrollY, T = ot(h), F = {
      x: (c.left + c.width / 2) / w * 100,
      y: T ? c.top + c.height / 2 : c.top + c.height / 2 + S,
      element: v,
      elementPath: a,
      boundingBox: {
        x: c.left,
        y: c.top,
        width: c.width,
        height: c.height
      },
      nearbyText: Xe(h),
      nearbyElements: Qe(h),
      cssClasses: et(h),
      computedStyles: tt(h),
      fullPath: Ze(h),
      accessibility: nt(h),
      isFixed: T
    };
    g(), e.onSelect(F, h);
  }
  function E(m) {
    m.key === "Escape" && g();
  }
  function A() {
    t.value || (t.value = !0, document.addEventListener("mousemove", x, { capture: !0 }), document.addEventListener("click", y, { capture: !0 }), document.addEventListener("keydown", E), document.body.style.cursor = "crosshair");
  }
  function g() {
    var m;
    t.value && (t.value = !1, n.value = null, o.value = null, i.value = null, document.removeEventListener("mousemove", x, {
      capture: !0
    }), document.removeEventListener("click", y, { capture: !0 }), document.removeEventListener("keydown", E), document.body.style.cursor = "", (m = e.onHoverChange) == null || m.call(e, null));
  }
  function u() {
    t.value ? g() : A();
  }
  return W(() => {
    t.value && g();
  }), {
    isActive: B(t),
    hoveredElement: B(n),
    highlightBox: B(o),
    elementInfo: B(i),
    start: A,
    stop: g,
    toggle: u
  };
}
const at = "agentation-animation-freeze", Y = "--agentation-animation-state";
function lt() {
  const e = $(!1);
  let t = null;
  function n() {
    e.value || (document.documentElement.style.setProperty(Y, "paused"), t || (t = document.createElement("style"), t.id = at, t.textContent = `
        *,
        *::before,
        *::after {
          animation-play-state: var(${Y}, running) !important;
        }
      `, document.head.appendChild(t)), document.querySelectorAll("video").forEach((r) => {
      r.paused || (r.dataset.agentationWasPlaying = "true", r.pause());
    }), e.value = !0);
  }
  function o() {
    e.value && (document.documentElement.style.removeProperty(Y), t && t.parentNode && (t.parentNode.removeChild(t), t = null), document.querySelectorAll("video[data-agentation-was-playing]").forEach((r) => {
      delete r.dataset.agentationWasPlaying, r.play().catch(() => {
      });
    }), e.value = !1);
  }
  function i() {
    e.value ? o() : n();
  }
  return W(() => {
    e.value && o();
  }), {
    isPaused: B(e),
    pause: n,
    resume: o,
    toggle: i
  };
}
function st() {
  const e = $(!1);
  function t() {
    const i = Ke();
    i ? e.value = i === "dark" : typeof window < "u" && (e.value = window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function n() {
    e.value = !e.value, se(e.value ? "dark" : "light");
  }
  function o(i) {
    e.value = i, se(i ? "dark" : "light");
  }
  return j(() => {
    t();
  }), {
    isDark: B(e),
    toggle: n,
    set: o,
    initialize: t
  };
}
function rt(e, t = "standard") {
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
  return e.forEach((o, i) => {
    if (n.push(`## ${i + 1}. ${o.element}`), n.push(""), n.push(`**Comment:** ${o.comment}`), n.push(""), n.push(`**Selector:** \`${o.elementPath}\``), n.push(""), n.push(
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
function _t(e) {
  return [
    `[${e.element}]`,
    e.comment,
    `(${e.elementPath})`
  ].join(" ");
}
const ut = ["aria-pressed"], dt = ["aria-pressed", "title"], ct = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, ft = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, mt = ["disabled", "title"], pt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, gt = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, ht = {
  key: 2,
  class: "agentation-toolbar__badge"
}, vt = ["disabled"], yt = ["title"], bt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, xt = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, wt = {
  style: { position: "absolute", inset: "0", "z-index": "99998", "pointer-events": "none" },
  "data-agentation-ignore": ""
}, U = "#3b82f6", Tt = /* @__PURE__ */ J({
  __name: "Agentation",
  props: {
    demoAnnotations: {},
    demoDelay: { default: 1e3 },
    enableDemoMode: { type: Boolean, default: !1 },
    copyToClipboard: { type: Boolean, default: !0 },
    onAnnotationAdd: { type: Function },
    onAnnotationDelete: { type: Function },
    onAnnotationUpdate: { type: Function },
    onAnnotationsClear: { type: Function },
    onCopy: { type: Function }
  },
  setup(e) {
    const {
      annotations: t,
      pendingAnnotation: n,
      count: o,
      isEmpty: i,
      initialize: r,
      switchPath: p,
      add: x,
      remove: y,
      clear: E,
      setPending: A
    } = Ue(), { isPaused: g, toggle: u } = lt(), { isDark: m, toggle: h } = st(), v = $(!1), a = $(null), c = $(!1), w = D(() => n.value ? n.value.x / 100 * (typeof window < "u" ? window.innerWidth : 0) : 0), S = D(() => {
      if (!n.value) return 0;
      const b = typeof window < "u" ? window.scrollY : 0;
      return n.value.isFixed ? n.value.y : n.value.y - b;
    }), T = D(() => {
      if (!I.value) return { showBelow: !1, showLeft: !1 };
      const b = 32, s = 8, f = typeof window < "u" ? window.innerWidth : 1e3, L = I.value.top < b + s, G = I.value.left > f - 200;
      return { showBelow: L, showLeft: G };
    }), {
      isActive: F,
      highlightBox: I,
      elementInfo: X,
      toggle: Q
    } = it({
      onSelect: (b) => {
        A(b), v.value = !0;
      },
      onHoverChange: () => {
      }
    }), O = $(q());
    let z = null;
    function de() {
      const b = q();
      b !== O.value && (O.value = b, p(b));
    }
    function ee() {
      de(), z = requestAnimationFrame(ee);
    }
    j(() => {
      var b;
      if (typeof window < "u") {
        const s = q();
        O.value = s, r(s), z = requestAnimationFrame(ee), e.enableDemoMode && ((b = e.demoAnnotations) != null && b.length) && setTimeout(() => {
          e.demoAnnotations.forEach((f, L) => {
            setTimeout(() => {
              x(
                {
                  x: f.x,
                  y: f.y,
                  element: f.element,
                  elementPath: f.elementPath
                },
                `Demo annotation ${L + 1}`
              );
            }, L * 300);
          });
        }, e.demoDelay);
      }
    }), W(() => {
      z !== null && (cancelAnimationFrame(z), z = null);
    });
    function ce(b) {
      var f;
      if (!n.value) return;
      const s = x(n.value, b);
      v.value = !1, (f = e.onAnnotationAdd) == null || f.call(e, s);
    }
    function fe() {
      v.value = !1, A(null);
    }
    function te(b) {
      var f;
      const s = y(b.id);
      s && ((f = e.onAnnotationDelete) == null || f.call(e, s));
    }
    function me() {
      var b;
      t.value.length !== 0 && confirm("Clear all annotations?") && (E(), (b = e.onAnnotationsClear) == null || b.call(e));
    }
    async function pe() {
      var s;
      const b = rt([...t.value]);
      if (e.copyToClipboard)
        try {
          await navigator.clipboard.writeText(b), c.value = !0, setTimeout(() => {
            c.value = !1;
          }, 2e3);
        } catch {
          console.log(b);
        }
      (s = e.onCopy) == null || s.call(e, b);
    }
    function ne(b) {
      console.log("Marker clicked:", b);
    }
    return (b, s) => (k(), H(ke, { to: "body" }, [
      l("div", {
        class: P(["agentation-toolbar", d(m) ? "agentation-toolbar--dark" : ""]),
        "data-agentation-ignore": "",
        role: "toolbar",
        "aria-label": "Agentation annotation tools"
      }, [
        l("button", {
          type: "button",
          class: P(["agentation-toolbar__button", d(F) && "agentation-toolbar__button--active"]),
          "aria-pressed": d(F),
          title: "Select element to annotate",
          onClick: s[0] || (s[0] = //@ts-ignore
          (...f) => d(Q) && d(Q)(...f))
        }, [...s[5] || (s[5] = [
          l("svg", {
            class: "agentation-toolbar__icon",
            fill: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            l("path", { d: "M4 4l7.07 17 2.51-7.39L21 11.07 4 4zm9.33 8.33l-1.62 4.79L6.27 6.27l10.85 5.06-3.79 1z" })
          ], -1)
        ])], 10, ut),
        l("button", {
          type: "button",
          class: P(["agentation-toolbar__button", d(g) && "agentation-toolbar__button--paused"]),
          "aria-pressed": d(g),
          title: d(g) ? "Resume animations" : "Pause animations",
          onClick: s[1] || (s[1] = //@ts-ignore
          (...f) => d(u) && d(u)(...f))
        }, [
          d(g) ? (k(), C("svg", ct, [...s[6] || (s[6] = [
            l("path", { d: "M8 5v14l11-7z" }, null, -1)
          ])])) : (k(), C("svg", ft, [...s[7] || (s[7] = [
            l("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" }, null, -1)
          ])]))
        ], 10, dt),
        s[13] || (s[13] = l("div", { class: "agentation-toolbar__divider" }, null, -1)),
        l("button", {
          type: "button",
          class: P(["agentation-toolbar__button", c.value && "agentation-toolbar__button--success"]),
          disabled: d(i),
          title: `Copy ${d(o)} annotation(s) as markdown`,
          onClick: pe
        }, [
          c.value ? (k(), C("svg", pt, [...s[8] || (s[8] = [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M5 13l4 4L19 7"
            }, null, -1)
          ])])) : (k(), C("svg", gt, [...s[9] || (s[9] = [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            }, null, -1)
          ])])),
          d(o) > 0 ? (k(), C("span", ht, _(d(o)), 1)) : M("", !0)
        ], 10, mt),
        l("button", {
          type: "button",
          class: "agentation-toolbar__button",
          disabled: d(i),
          title: "Clear all annotations",
          onClick: me
        }, [...s[10] || (s[10] = [
          l("svg", {
            class: "agentation-toolbar__icon",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            })
          ], -1)
        ])], 8, vt),
        s[14] || (s[14] = l("div", { class: "agentation-toolbar__divider" }, null, -1)),
        l("button", {
          type: "button",
          class: "agentation-toolbar__button",
          title: d(m) ? "Switch to light mode" : "Switch to dark mode",
          onClick: s[2] || (s[2] = //@ts-ignore
          (...f) => d(h) && d(h)(...f))
        }, [
          d(m) ? (k(), C("svg", bt, [...s[11] || (s[11] = [
            l("path", { d: "M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" }, null, -1)
          ])])) : (k(), C("svg", xt, [...s[12] || (s[12] = [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            }, null, -1)
          ])]))
        ], 8, yt)
      ], 2),
      d(F) && d(I) ? (k(), C("div", {
        key: 0,
        class: "agentation-highlight",
        style: N({
          left: `${d(I).left}px`,
          top: `${d(I).top}px`,
          width: `${d(I).width}px`,
          height: `${d(I).height}px`
        }),
        "data-agentation-ignore": ""
      }, [
        d(X) ? (k(), C("div", {
          key: 0,
          class: P(["agentation-highlight__tooltip", [
            T.value.showBelow ? "agentation-highlight__tooltip--bottom" : "agentation-highlight__tooltip--top",
            T.value.showLeft ? "agentation-highlight__tooltip--top-right" : ""
          ]])
        }, _(d(X).name), 3)) : M("", !0)
      ], 4)) : M("", !0),
      l("div", wt, [
        (k(!0), C(oe, null, ie(d(t).filter((f) => !f.isFixed), (f, L) => (k(), H(ae, {
          key: f.id,
          annotation: f,
          index: L,
          dark: d(m),
          "accent-color": U,
          "is-hovered": a.value === f.id,
          style: { "pointer-events": "auto" },
          onClick: ne,
          onDelete: te,
          onMouseenter: (G) => a.value = f.id,
          onMouseleave: s[3] || (s[3] = (G) => a.value = null)
        }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128))
      ]),
      (k(!0), C(oe, null, ie(d(t).filter((f) => f.isFixed), (f) => (k(), H(ae, {
        key: f.id,
        annotation: f,
        index: d(t).findIndex((L) => L.id === f.id),
        dark: d(m),
        "accent-color": U,
        "is-hovered": a.value === f.id,
        onClick: ne,
        onDelete: te,
        onMouseenter: (L) => a.value = f.id,
        onMouseleave: s[4] || (s[4] = (L) => a.value = null)
      }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128)),
      v.value && d(n) ? (k(), H(Be, {
        key: 1,
        element: d(n).element,
        x: w.value,
        y: S.value,
        "selected-text": d(n).selectedText,
        "computed-styles": d(n).computedStyles,
        dark: d(m),
        "accent-color": U,
        onSubmit: ce,
        onCancel: fe
      }, null, 8, ["element", "x", "y", "selected-text", "computed-styles", "dark"])) : M("", !0)
    ]));
  }
});
export {
  Tt as Agentation,
  ae as AnnotationMarker,
  Be as AnnotationPopup,
  qe as clearAnnotations,
  _t as generateAnnotationSummary,
  rt as generateMarkdown,
  nt as getAccessibilityInfo,
  q as getCurrentRoutePath,
  tt as getDetailedComputedStyles,
  et as getElementClasses,
  Je as getElementPath,
  Et as getForensicComputedStyles,
  Ze as getFullElementPath,
  Qe as getNearbyElements,
  Xe as getNearbyText,
  Z as getStorageKey,
  St as identifyAnimationElement,
  re as identifyElement,
  ot as isElementFixed,
  le as loadAnnotations,
  $t as loadSettings,
  Ke as loadTheme,
  At as resetAnnotations,
  K as saveAnnotations,
  Ct as saveSettings,
  se as saveTheme,
  lt as useAnimationPause,
  Ue as useAnnotations,
  it as useElementSelection,
  st as useTheme
};
