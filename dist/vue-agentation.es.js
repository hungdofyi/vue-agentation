import { defineComponent as ee, ref as _, computed as I, onMounted as V, nextTick as Se, onUnmounted as G, openBlock as k, createElementBlock as S, normalizeStyle as D, normalizeClass as P, createElementVNode as l, toDisplayString as E, createCommentVNode as M, withDirectives as Ae, vModelText as Ee, createTextVNode as O, createVNode as Te, Transition as Le, withCtx as Pe, withModifiers as ue, readonly as B, createBlock as R, Teleport as Ie, unref as c, Fragment as de, renderList as ce } from "vue";
const Me = ["aria-label"], Be = { class: "agentation-popup__header" }, Ne = { class: "agentation-popup__header-content" }, ze = { class: "agentation-popup__header-title" }, De = {
  key: 0,
  class: "agentation-popup__header-selected"
}, Fe = { class: "agentation-popup__body" }, je = {
  key: 0,
  style: { "margin-top": "0.5rem" }
}, He = {
  key: 0,
  class: "agentation-popup__styles-pre"
}, Ve = { class: "agentation-popup__footer" }, We = { class: "agentation-popup__actions" }, Re = /* @__PURE__ */ ee({
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
    const o = n, i = _(e.initialValue), s = _(null), f = _(!1), w = _(!1), g = _("initial"), A = I(() => {
      let b = e.x, C = e.y + 20;
      return typeof window < "u" && (b + 320 > window.innerWidth - 16 && (b = window.innerWidth - 320 - 16), b < 16 && (b = 16), C + 200 > window.innerHeight - 16 && (C = e.y - 200 - 10), C < 16 && (C = 16)), {
        left: `${b}px`,
        top: `${C}px`
      };
    });
    function u() {
      const m = i.value.trim();
      if (!m) {
        $();
        return;
      }
      o("submit", m);
    }
    function y() {
      g.value = "exit", setTimeout(() => {
        o("cancel");
      }, 150);
    }
    function $() {
      f.value = !0, setTimeout(() => {
        f.value = !1;
      }, 500);
    }
    function h(m) {
      m.key === "Enter" && (m.metaKey || m.ctrlKey) ? (m.preventDefault(), u()) : m.key === "Escape" && (m.preventDefault(), y());
    }
    V(() => {
      g.value = "enter", Se(() => {
        var m;
        g.value = "entered", (m = s.value) == null || m.focus();
      });
    });
    function v(m) {
      m.key === "Escape" && y();
    }
    return V(() => {
      document.addEventListener("keydown", v);
    }), G(() => {
      document.removeEventListener("keydown", v);
    }), t({ shake: $ }), (m, a) => (k(), S("div", {
      class: P(["agentation-popup", [
        e.dark ? "agentation-popup--dark" : "",
        f.value && "agentation-animate-shake",
        g.value === "initial" && "agentation-popup--entering",
        g.value === "enter" && "agentation-popup--entering",
        g.value === "entered" && "agentation-popup--entered",
        g.value === "exit" && "agentation-popup--exiting"
      ]]),
      style: D(A.value),
      "data-agentation-ignore": "",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": `Add annotation for ${e.element}`
    }, [
      l("div", Be, [
        l("div", Ne, [
          l("div", {
            class: "agentation-popup__header-dot",
            style: D({ backgroundColor: e.accentColor })
          }, null, 4),
          l("span", ze, E(e.element), 1)
        ]),
        e.selectedText ? (k(), S("p", De, ' "' + E(e.selectedText) + '" ', 1)) : M("", !0)
      ]),
      l("div", Fe, [
        Ae(l("textarea", {
          ref_key: "textareaRef",
          ref: s,
          "onUpdate:modelValue": a[0] || (a[0] = (p) => i.value = p),
          class: "agentation-popup__textarea",
          placeholder: "Add your comment...",
          onKeydown: h
        }, null, 544), [
          [Ee, i.value]
        ]),
        e.computedStyles ? (k(), S("div", je, [
          l("button", {
            type: "button",
            class: "agentation-popup__styles-toggle",
            onClick: a[1] || (a[1] = (p) => w.value = !w.value)
          }, [
            (k(), S("svg", {
              class: P(["agentation-popup__styles-icon", w.value && "agentation-popup__styles-icon--open"]),
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
            a[3] || (a[3] = O(" Computed styles ", -1))
          ]),
          w.value ? (k(), S("pre", He, E(e.computedStyles), 1)) : M("", !0)
        ])) : M("", !0)
      ]),
      l("div", Ve, [
        a[4] || (a[4] = l("span", { class: "agentation-popup__shortcut" }, [
          l("kbd", { class: "agentation-popup__kbd" }, "⌘"),
          O(" + "),
          l("kbd", { class: "agentation-popup__kbd" }, "Enter"),
          O(" to submit ")
        ], -1)),
        l("div", We, [
          l("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--cancel",
            onClick: y
          }, " Cancel "),
          l("button", {
            type: "button",
            class: "agentation-popup__btn agentation-popup__btn--submit",
            style: D({ backgroundColor: e.accentColor }),
            onClick: u
          }, E(e.submitLabel), 5)
        ])
      ])
    ], 14, Me));
  }
}), Oe = { class: "agentation-marker__tooltip-header" }, Ye = { style: { display: "flex", "align-items": "center", "justify-content": "space-between" } }, Ge = { class: "agentation-marker__tooltip-title" }, qe = { style: { display: "flex", gap: "0.25rem" } }, Ke = { class: "agentation-marker__tooltip-path" }, Ue = { class: "agentation-marker__tooltip-body" }, Ze = { class: "agentation-marker__tooltip-comment" }, Je = {
  key: 0,
  class: "agentation-marker__tooltip-selected-text"
}, Xe = { class: "agentation-marker__tooltip-footer" }, Qe = /* @__PURE__ */ ee({
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
    const n = t, o = _(!1), i = _("initial"), s = I(() => {
      const $ = {
        left: `${e.annotation.x}%`
      };
      return e.annotation.isFixed ? $.top = `${e.annotation.y}px` : $.top = `${e.annotation.y}px`, $;
    }), f = I(() => e.annotation.x > 70 ? "left" : "right");
    function w($) {
      $.stopPropagation(), n("click", e.annotation);
    }
    function g($) {
      $.stopPropagation(), i.value = "exit", setTimeout(() => {
        n("delete", e.annotation);
      }, 200);
    }
    function A($) {
      $.stopPropagation(), n("edit", e.annotation);
    }
    function u() {
      o.value = !0, n("mouseenter", e.annotation);
    }
    function y() {
      o.value = !1, n("mouseleave", e.annotation);
    }
    return V(() => {
      i.value = "enter", requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          i.value = "entered";
        });
      });
    }), ($, h) => (k(), S("div", {
      class: P(["agentation-marker", [
        e.annotation.isFixed ? "agentation-marker--fixed" : "agentation-marker--absolute",
        i.value === "initial" && "agentation-marker--entering",
        i.value === "enter" && "agentation-marker--entering",
        i.value === "entered" && "agentation-marker--entered",
        i.value === "exit" && "agentation-marker--exiting"
      ]]),
      style: D(s.value),
      "data-agentation-ignore": "",
      onMouseenter: u,
      onMouseleave: y,
      onClick: w
    }, [
      l("div", {
        class: P(["agentation-marker__dot", [e.isHovered && "agentation-marker__dot--hovered"]]),
        style: D({ backgroundColor: e.accentColor })
      }, [
        O(E(e.index + 1) + " ", 1),
        l("div", {
          class: "agentation-marker__ping agentation-animate-ping",
          style: D({ backgroundColor: e.accentColor })
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
          o.value ? (k(), S("div", {
            key: 0,
            class: P(["agentation-marker__tooltip", [
              e.dark ? "agentation-marker__tooltip--dark" : "",
              f.value === "left" ? "agentation-marker__tooltip--left" : "agentation-marker__tooltip--right"
            ]]),
            onClick: h[0] || (h[0] = ue(() => {
            }, ["stop"]))
          }, [
            l("div", Oe, [
              l("div", Ye, [
                l("span", Ge, E(e.annotation.element), 1),
                l("div", qe, [
                  l("button", {
                    type: "button",
                    class: "agentation-marker__tooltip-action",
                    title: "Edit annotation",
                    onClick: ue(A, ["stop"])
                  }, [...h[1] || (h[1] = [
                    l("svg", {
                      class: "agentation-marker__tooltip-action-icon",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      l("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      })
                    ], -1)
                  ])]),
                  l("button", {
                    type: "button",
                    class: "agentation-marker__tooltip-action",
                    title: "Delete annotation",
                    onClick: g
                  }, [...h[2] || (h[2] = [
                    l("svg", {
                      class: "agentation-marker__tooltip-action-icon",
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
                ])
              ]),
              l("p", Ke, E(e.annotation.elementPath), 1)
            ]),
            l("div", Ue, [
              l("p", Ze, E(e.annotation.comment), 1),
              e.annotation.selectedText ? (k(), S("p", Je, ' "' + E(e.annotation.selectedText) + '" ', 1)) : M("", !0)
            ]),
            l("div", Xe, E(new Date(e.annotation.timestamp).toLocaleString()), 1)
          ], 2)) : M("", !0)
        ]),
        _: 1
      })
    ], 38));
  }
}), et = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, i] of t)
    n[o] = i;
  return n;
}, pe = /* @__PURE__ */ et(Qe, [["__scopeId", "data-v-675bf045"]]), tt = "agentation-annotations-", he = "agentation-settings", nt = 7;
function te(e) {
  return `${tt}${e}`;
}
function Z() {
  if (typeof window > "u") return "/";
  const e = window.location.hash;
  return e && e.startsWith("#/") ? e.slice(1) : window.location.pathname;
}
function fe(e) {
  if (typeof window > "u") return [];
  try {
    const t = localStorage.getItem(te(e));
    if (!t) return [];
    const n = JSON.parse(t), o = Date.now() - nt * 24 * 60 * 60 * 1e3;
    return n.filter(
      (i) => !i.timestamp || i.timestamp > o
    );
  } catch {
    return [];
  }
}
function J(e, t) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(te(e), JSON.stringify(t));
    } catch {
    }
}
function ot(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.removeItem(te(e));
    } catch {
    }
}
function Bt() {
  if (typeof window > "u") return null;
  try {
    const e = localStorage.getItem(he);
    return e ? JSON.parse(e) : null;
  } catch {
    return null;
  }
}
function Nt(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem(he, JSON.stringify(e));
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
function me(e) {
  if (!(typeof window > "u"))
    try {
      localStorage.setItem("agentation-theme", e);
    } catch {
    }
}
let Y = null;
function at() {
  const e = _([]), t = _(null), n = _(null), o = _("");
  function i(a) {
    o.value = a, e.value = fe(a);
  }
  function s(a) {
    o.value = a, e.value = fe(a), t.value = null, n.value = null;
  }
  function f(a, p) {
    const b = {
      id: crypto.randomUUID(),
      x: a.x,
      y: a.y,
      comment: p,
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
    return e.value = [...e.value, b], J(o.value, e.value), t.value = null, b;
  }
  function w(a) {
    const p = e.value.find((b) => b.id === a);
    return p ? (e.value = e.value.filter((b) => b.id !== a), J(o.value, e.value), p) : null;
  }
  function g(a, p) {
    const b = e.value.findIndex((T) => T.id === a);
    if (b === -1) return null;
    const C = { ...e.value[b], comment: p };
    return e.value = [
      ...e.value.slice(0, b),
      C,
      ...e.value.slice(b + 1)
    ], J(o.value, e.value), n.value = null, C;
  }
  function A() {
    e.value = [], ot(o.value);
  }
  function u(a) {
    t.value = a;
  }
  function y(a) {
    n.value = a;
  }
  function $(a) {
    return e.value.find((p) => p.id === a);
  }
  function h(a) {
    return e.value.findIndex((p) => p.id === a);
  }
  const v = I(() => e.value.length), m = I(() => e.value.length === 0);
  return {
    annotations: B(e),
    pendingAnnotation: B(t),
    editingAnnotationId: B(n),
    count: v,
    isEmpty: m,
    initialize: i,
    switchPath: s,
    add: f,
    remove: w,
    update: g,
    clear: A,
    setPending: u,
    setEditing: y,
    getById: $,
    getIndex: h
  };
}
function lt() {
  return Y || (Y = at()), Y;
}
function zt() {
  Y = null;
}
function st(e, t = 3) {
  const n = [];
  let o = e, i = 0;
  for (; o && o !== document.body && i < t; ) {
    let s = o.tagName.toLowerCase();
    if (o.id)
      s += `#${o.id}`;
    else if (o.classList.length > 0) {
      const f = Array.from(o.classList).find(
        (w) => !w.match(/^_/) && !w.match(/[A-Za-z]+_[a-z0-9]{5,}/)
      );
      f && (s += `.${f}`);
    }
    n.unshift(s), o = o.parentElement, i++;
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
      const i = n.parentElement;
      if (i) {
        const s = Array.from(i.children).filter(
          (f) => f.tagName === n.tagName
        );
        if (s.length > 1) {
          const f = s.indexOf(n) + 1;
          o += `:nth-of-type(${f})`;
        }
      }
    }
    t.unshift(o), n = n.parentElement;
  }
  return t.join(" > ");
}
function ge(e) {
  var o, i, s, f, w, g, A;
  const t = st(e), n = e.tagName.toLowerCase();
  if (e instanceof SVGElement || e.closest("svg")) {
    const u = e.closest("svg"), y = (o = u == null ? void 0 : u.querySelector("title")) == null ? void 0 : o.textContent, $ = u == null ? void 0 : u.getAttribute("aria-label");
    return {
      name: y || $ || "SVG graphic",
      path: t
    };
  }
  if (n === "button" || e.getAttribute("role") === "button")
    return { name: `Button: "${((i = e.textContent) == null ? void 0 : i.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Button"}"`, path: t };
  if (n === "a")
    return { name: `Link: "${((s = e.textContent) == null ? void 0 : s.trim().slice(0, 30)) || e.getAttribute("aria-label") || "Link"}"`, path: t };
  if (n === "input" || n === "textarea" || n === "select") {
    const u = e.type || n, y = e.getAttribute("aria-label") || e.getAttribute("placeholder") || ((w = (f = document.querySelector(`label[for="${e.id}"]`)) == null ? void 0 : f.textContent) == null ? void 0 : w.trim());
    return {
      name: y ? `${u}: "${y}"` : `${u} field`,
      path: t
    };
  }
  if (/^h[1-6]$/.test(n)) {
    const u = (g = e.textContent) == null ? void 0 : g.trim().slice(0, 40);
    return { name: u ? `${n}: "${u}"` : n, path: t };
  }
  if (n === "p") {
    const u = (A = e.textContent) == null ? void 0 : A.trim();
    return u && u.length > 0 ? { name: `Paragraph: "${u.slice(0, 40) + (u.length > 40 ? "..." : "")}"`, path: t } : { name: "Paragraph", path: t };
  }
  if (n === "img") {
    const u = e.alt;
    return { name: u ? `Image: "${u}"` : "Image", path: t };
  }
  if (n === "li")
    return { name: "List item", path: t };
  if (e.classList.length > 0) {
    const u = Array.from(e.classList).filter((y) => !(y.match(/^_[a-zA-Z0-9]+$/) || y.match(/[A-Za-z]+_[a-z0-9]{5,}$/)));
    if (u.length > 0) {
      const y = u.slice(0, 3).join(".");
      return { name: `${n}.${y}`, path: t };
    }
  }
  if (["nav", "header", "footer", "main", "section", "article"].includes(n)) {
    const u = e.getAttribute("aria-label");
    if (u)
      return {
        name: `${n}: "${u}"`,
        path: t
      };
  }
  return {
    name: n,
    path: t
  };
}
function Dt(e) {
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
  var s, f, w;
  const t = [], n = e.previousElementSibling;
  if (n) {
    const g = (s = n.textContent) == null ? void 0 : s.trim();
    g && g.length < 100 && t.push(`[prev]: ${g.slice(0, 50)}`);
  }
  const o = (f = e.textContent) == null ? void 0 : f.trim();
  o && o.length < 200 && t.push(o.slice(0, 80));
  const i = e.nextElementSibling;
  if (i) {
    const g = (w = i.textContent) == null ? void 0 : w.trim();
    g && g.length < 100 && t.push(`[next]: ${g.slice(0, 50)}`);
  }
  return t.join(" | ");
}
function dt(e) {
  const t = [], n = e.parentElement;
  n && n !== document.body && t.push(`parent: ${n.tagName.toLowerCase()}`);
  const o = e.previousElementSibling;
  o && t.push(`prev: ${o.tagName.toLowerCase()}`);
  const i = e.nextElementSibling;
  i && t.push(`next: ${i.tagName.toLowerCase()}`);
  const s = e.children.length;
  return s > 0 && t.push(`children: ${s}`), t.join(", ");
}
function ct(e) {
  return !e.classList || e.classList.length === 0 ? "" : Array.from(e.classList).filter((t) => !(t.match(/^_[a-zA-Z0-9]+$/) || t.match(/[A-Za-z]+_[a-z0-9]{5,}$/))).join(" ");
}
function pt(e) {
  const t = window.getComputedStyle(e), n = e.tagName.toLowerCase(), o = [];
  return o.push(`display: ${t.display}`), o.push(`position: ${t.position}`), ["p", "span", "h1", "h2", "h3", "h4", "h5", "h6", "a", "button"].includes(
    n
  ) && (o.push(`font-size: ${t.fontSize}`), o.push(`font-weight: ${t.fontWeight}`), o.push(`color: ${t.color}`), o.push(`line-height: ${t.lineHeight}`)), ["div", "section", "article", "main", "nav", "header", "footer"].includes(
    n
  ) && (o.push(`width: ${t.width}`), o.push(`height: ${t.height}`), o.push(`padding: ${t.padding}`), o.push(`margin: ${t.margin}`), (t.display === "flex" || t.display === "inline-flex") && (o.push(`flex-direction: ${t.flexDirection}`), o.push(`justify-content: ${t.justifyContent}`), o.push(`align-items: ${t.alignItems}`), o.push(`gap: ${t.gap}`)), (t.display === "grid" || t.display === "inline-grid") && (o.push(`grid-template-columns: ${t.gridTemplateColumns}`), o.push(`grid-template-rows: ${t.gridTemplateRows}`), o.push(`gap: ${t.gap}`))), t.backgroundColor !== "rgba(0, 0, 0, 0)" && o.push(`background-color: ${t.backgroundColor}`), t.borderWidth !== "0px" && o.push(`border: ${t.border}`), t.borderRadius !== "0px" && o.push(`border-radius: ${t.borderRadius}`), o.join("; ");
}
function Ft(e) {
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
function ft(e) {
  const t = [], n = e.getAttribute("role");
  n && t.push(`role="${n}"`);
  const o = Array.from(e.attributes).filter((f) => f.name.startsWith("aria-")).map((f) => `${f.name}="${f.value}"`).join(" ");
  o && t.push(o);
  const i = e.getAttribute("tabindex");
  return i !== null && t.push(`tabindex="${i}"`), ["a", "button", "input", "textarea", "select"].includes(e.tagName.toLowerCase()) && t.push("focusable"), t.join(" ");
}
function mt(e) {
  let t = e;
  for (; t && t !== document.body; ) {
    const n = window.getComputedStyle(t).position;
    if (n === "fixed" || n === "sticky")
      return !0;
    t = t.parentElement;
  }
  return !1;
}
function gt(e) {
  const t = _(!1), n = _(null), o = _(null), i = _(null), s = "[data-agentation-ignore]";
  function f(h) {
    return !!(h.closest(s) || h === document.body || h === document.documentElement);
  }
  function w(h) {
    var m, a;
    const v = h.target;
    if (f(v)) {
      n.value = null, o.value = null, i.value = null, (m = e.onHoverChange) == null || m.call(e, null);
      return;
    }
    if (v !== n.value) {
      n.value = v;
      const p = v.getBoundingClientRect();
      o.value = p;
      const { name: b, path: C } = ge(v), T = {
        element: v,
        name: b,
        path: C,
        rect: p
      };
      i.value = T, (a = e.onHoverChange) == null || a.call(e, T);
    }
  }
  function g(h) {
    h.preventDefault(), h.stopPropagation();
    const v = h.target;
    if (f(v))
      return;
    const { name: m, path: a } = ge(v), p = v.getBoundingClientRect(), b = window.innerWidth, C = window.scrollY, T = mt(v), N = {
      x: (p.left + p.width / 2) / b * 100,
      y: T ? p.top + p.height / 2 : p.top + p.height / 2 + C,
      element: m,
      elementPath: a,
      boundingBox: {
        x: p.left,
        y: p.top,
        width: p.width,
        height: p.height
      },
      nearbyText: ut(v),
      nearbyElements: dt(v),
      cssClasses: ct(v),
      computedStyles: pt(v),
      fullPath: rt(v),
      accessibility: ft(v),
      isFixed: T
    };
    y(), e.onSelect(N, v);
  }
  function A(h) {
    h.key === "Escape" && y();
  }
  function u() {
    t.value || (t.value = !0, document.addEventListener("mousemove", w, { capture: !0 }), document.addEventListener("click", g, { capture: !0 }), document.addEventListener("keydown", A), document.body.style.cursor = "crosshair");
  }
  function y() {
    var h;
    t.value && (t.value = !1, n.value = null, o.value = null, i.value = null, document.removeEventListener("mousemove", w, {
      capture: !0
    }), document.removeEventListener("click", g, { capture: !0 }), document.removeEventListener("keydown", A), document.body.style.cursor = "", (h = e.onHoverChange) == null || h.call(e, null));
  }
  function $() {
    t.value ? y() : u();
  }
  return G(() => {
    t.value && y();
  }), {
    isActive: B(t),
    hoveredElement: B(n),
    highlightBox: B(o),
    elementInfo: B(i),
    start: u,
    stop: y,
    toggle: $
  };
}
const ht = "agentation-animation-freeze", X = "--agentation-animation-state";
function vt() {
  const e = _(!1);
  let t = null;
  function n() {
    e.value || (document.documentElement.style.setProperty(X, "paused"), t || (t = document.createElement("style"), t.id = ht, t.textContent = `
        *,
        *::before,
        *::after {
          animation-play-state: var(${X}, running) !important;
        }
      `, document.head.appendChild(t)), document.querySelectorAll("video").forEach((s) => {
      s.paused || (s.dataset.agentationWasPlaying = "true", s.pause());
    }), e.value = !0);
  }
  function o() {
    e.value && (document.documentElement.style.removeProperty(X), t && t.parentNode && (t.parentNode.removeChild(t), t = null), document.querySelectorAll("video[data-agentation-was-playing]").forEach((s) => {
      delete s.dataset.agentationWasPlaying, s.play().catch(() => {
      });
    }), e.value = !1);
  }
  function i() {
    e.value ? o() : n();
  }
  return G(() => {
    e.value && o();
  }), {
    isPaused: B(e),
    pause: n,
    resume: o,
    toggle: i
  };
}
function yt() {
  const e = _(!1);
  function t() {
    const i = it();
    i ? e.value = i === "dark" : typeof window < "u" && (e.value = window.matchMedia("(prefers-color-scheme: dark)").matches);
  }
  function n() {
    e.value = !e.value, me(e.value ? "dark" : "light");
  }
  function o(i) {
    e.value = i, me(i ? "dark" : "light");
  }
  return V(() => {
    t();
  }), {
    isDark: B(e),
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
  return e.forEach((o, i) => {
    if (n.push(`## ${i + 1}. ${o.element}`), n.push(""), n.push(`**Comment:** ${o.comment}`), n.push(""), n.push(`**Selector:** \`${o.elementPath}\``), n.push(""), n.push(
      `**Position:** x=${o.x.toFixed(1)}%, y=${o.y.toFixed(0)}px`
    ), n.push(""), o.selectedText && (n.push(`**Selected Text:** "${o.selectedText}"`), n.push("")), o.boundingBox) {
      const s = o.boundingBox;
      n.push(
        `**Bounding Box:** x=${s.x.toFixed(0)}, y=${s.y.toFixed(0)}, w=${s.width.toFixed(0)}, h=${s.height.toFixed(0)}`
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
const xt = ["aria-pressed"], wt = ["aria-pressed", "title"], kt = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, $t = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "currentColor",
  viewBox: "0 0 24 24"
}, _t = ["disabled", "title"], Ct = {
  key: 0,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, St = {
  key: 1,
  class: "agentation-toolbar__icon",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
}, At = {
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
}, Q = "#3b82f6", Ht = /* @__PURE__ */ ee({
  __name: "Agentation",
  emits: ["annotation-add", "annotation-delete", "annotation-update", "annotations-clear", "copy"],
  setup(e, { emit: t }) {
    const n = t, {
      annotations: o,
      pendingAnnotation: i,
      editingAnnotationId: s,
      count: f,
      isEmpty: w,
      initialize: g,
      switchPath: A,
      add: u,
      remove: y,
      update: $,
      clear: h,
      setPending: v,
      setEditing: m,
      getById: a
    } = lt(), { isPaused: p, toggle: b } = vt(), { isDark: C, toggle: T } = yt(), N = _(!1), F = _(null), W = _(!1), ve = I(() => {
      if (i.value)
        return i.value.x / 100 * (typeof window < "u" ? window.innerWidth : 0);
      if (s.value) {
        const d = a(s.value);
        return d ? d.x / 100 * (typeof window < "u" ? window.innerWidth : 0) : 0;
      }
      return 0;
    }), ye = I(() => {
      if (i.value) {
        const d = typeof window < "u" ? window.scrollY : 0;
        return i.value.isFixed ? i.value.y : i.value.y - d;
      } else if (s.value) {
        const d = a(s.value);
        if (!d) return 0;
        const r = typeof window < "u" ? window.scrollY : 0;
        return d.isFixed ? d.y : d.y - r;
      }
      return 0;
    }), j = I(() => {
      if (i.value)
        return {
          element: i.value.element,
          selectedText: i.value.selectedText,
          computedStyles: i.value.computedStyles,
          initialValue: "",
          submitLabel: "Add"
        };
      if (s.value) {
        const d = a(s.value);
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
    }), ne = I(() => {
      if (!L.value) return { vertical: "top", horizontal: "left" };
      const d = 32, r = 150, x = 8, z = typeof window < "u" ? window.innerWidth : 1e3, U = L.value.top < d + x, _e = L.value.left + r > z - x, Ce = L.value.left + L.value.width < r + x;
      return {
        vertical: U ? "bottom" : "top",
        horizontal: _e && !Ce ? "right" : "left"
      };
    }), {
      isActive: q,
      highlightBox: L,
      elementInfo: oe,
      toggle: ie
    } = gt({
      onSelect: (d) => {
        v(d), m(null), N.value = !0;
      },
      onHoverChange: () => {
      }
    }), K = _(Z());
    let H = null;
    function be() {
      const d = Z();
      d !== K.value && (K.value = d, A(d));
    }
    function ae() {
      be(), H = requestAnimationFrame(ae);
    }
    V(() => {
      if (typeof window < "u") {
        const d = Z();
        K.value = d, g(d), H = requestAnimationFrame(ae);
      }
    }), G(() => {
      H !== null && (cancelAnimationFrame(H), H = null);
    });
    function xe(d) {
      if (i.value) {
        const r = u(i.value, d);
        N.value = !1, n("annotation-add", r);
      } else if (s.value) {
        const r = $(s.value, d);
        N.value = !1, m(null), r && n("annotation-update", r);
      }
    }
    function we() {
      N.value = !1, v(null), m(null);
    }
    function le(d) {
      const r = y(d.id);
      r && n("annotation-delete", r);
    }
    function se(d) {
      v(null), m(d.id), N.value = !0;
    }
    function ke() {
      o.value.length !== 0 && confirm("Clear all annotations?") && (h(), n("annotations-clear"));
    }
    async function $e() {
      const d = bt([...o.value]);
      try {
        await navigator.clipboard.writeText(d), W.value = !0, setTimeout(() => {
          W.value = !1;
        }, 2e3);
      } catch {
        console.log(d);
      }
      n("copy", d);
    }
    function re(d) {
      console.log("Marker clicked:", d);
    }
    return (d, r) => (k(), R(Ie, { to: "body" }, [
      l("div", {
        class: P(["agentation-toolbar", c(C) ? "agentation-toolbar--dark" : ""]),
        "data-agentation-ignore": "",
        role: "toolbar",
        "aria-label": "Agentation annotation tools"
      }, [
        l("button", {
          type: "button",
          class: P(["agentation-toolbar__button", c(q) && "agentation-toolbar__button--active"]),
          "aria-pressed": c(q),
          title: "Select element to annotate",
          onClick: r[0] || (r[0] = //@ts-ignore
          (...x) => c(ie) && c(ie)(...x))
        }, [...r[5] || (r[5] = [
          l("svg", {
            class: "agentation-toolbar__icon",
            fill: "currentColor",
            viewBox: "0 0 24 24"
          }, [
            l("path", { d: "M4 4l7.07 17 2.51-7.39L21 11.07 4 4zm9.33 8.33l-1.62 4.79L6.27 6.27l10.85 5.06-3.79 1z" })
          ], -1)
        ])], 10, xt),
        l("button", {
          type: "button",
          class: P(["agentation-toolbar__button", c(p) && "agentation-toolbar__button--paused"]),
          "aria-pressed": c(p),
          title: c(p) ? "Resume animations" : "Pause animations",
          onClick: r[1] || (r[1] = //@ts-ignore
          (...x) => c(b) && c(b)(...x))
        }, [
          c(p) ? (k(), S("svg", kt, [...r[6] || (r[6] = [
            l("path", { d: "M8 5v14l11-7z" }, null, -1)
          ])])) : (k(), S("svg", $t, [...r[7] || (r[7] = [
            l("path", { d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z" }, null, -1)
          ])]))
        ], 10, wt),
        r[13] || (r[13] = l("div", { class: "agentation-toolbar__divider" }, null, -1)),
        l("button", {
          type: "button",
          class: P(["agentation-toolbar__button", W.value && "agentation-toolbar__button--success"]),
          disabled: c(w),
          title: `Copy ${c(f)} annotation(s) as markdown`,
          onClick: $e
        }, [
          W.value ? (k(), S("svg", Ct, [...r[8] || (r[8] = [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M5 13l4 4L19 7"
            }, null, -1)
          ])])) : (k(), S("svg", St, [...r[9] || (r[9] = [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            }, null, -1)
          ])])),
          c(f) > 0 ? (k(), S("span", At, E(c(f)), 1)) : M("", !0)
        ], 10, _t),
        l("button", {
          type: "button",
          class: "agentation-toolbar__button",
          disabled: c(w),
          title: "Clear all annotations",
          onClick: ke
        }, [...r[10] || (r[10] = [
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
        ])], 8, Et),
        r[14] || (r[14] = l("div", { class: "agentation-toolbar__divider" }, null, -1)),
        l("button", {
          type: "button",
          class: "agentation-toolbar__button",
          title: c(C) ? "Switch to light mode" : "Switch to dark mode",
          onClick: r[2] || (r[2] = //@ts-ignore
          (...x) => c(T) && c(T)(...x))
        }, [
          c(C) ? (k(), S("svg", Lt, [...r[11] || (r[11] = [
            l("path", { d: "M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" }, null, -1)
          ])])) : (k(), S("svg", Pt, [...r[12] || (r[12] = [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            }, null, -1)
          ])]))
        ], 8, Tt)
      ], 2),
      c(q) && c(L) ? (k(), S("div", {
        key: 0,
        class: "agentation-highlight",
        style: D({
          left: `${c(L).left}px`,
          top: `${c(L).top}px`,
          width: `${c(L).width}px`,
          height: `${c(L).height}px`
        }),
        "data-agentation-ignore": ""
      }, [
        c(oe) ? (k(), S("div", {
          key: 0,
          class: P(["agentation-highlight__tooltip", `agentation-highlight__tooltip--${ne.value.vertical}-${ne.value.horizontal}`])
        }, E(c(oe).name), 3)) : M("", !0)
      ], 4)) : M("", !0),
      l("div", It, [
        (k(!0), S(de, null, ce(c(o).filter((x) => !x.isFixed), (x, z) => (k(), R(pe, {
          key: x.id,
          annotation: x,
          index: z,
          dark: c(C),
          "accent-color": Q,
          "is-hovered": F.value === x.id,
          style: { "pointer-events": "auto" },
          onClick: re,
          onEdit: se,
          onDelete: le,
          onMouseenter: (U) => F.value = x.id,
          onMouseleave: r[3] || (r[3] = (U) => F.value = null)
        }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128))
      ]),
      (k(!0), S(de, null, ce(c(o).filter((x) => x.isFixed), (x) => (k(), R(pe, {
        key: x.id,
        annotation: x,
        index: c(o).findIndex((z) => z.id === x.id),
        dark: c(C),
        "accent-color": Q,
        "is-hovered": F.value === x.id,
        onClick: re,
        onEdit: se,
        onDelete: le,
        onMouseenter: (z) => F.value = x.id,
        onMouseleave: r[4] || (r[4] = (z) => F.value = null)
      }, null, 8, ["annotation", "index", "dark", "is-hovered", "onMouseenter"]))), 128)),
      N.value && j.value ? (k(), R(Re, {
        key: 1,
        element: j.value.element,
        x: ve.value,
        y: ye.value,
        "selected-text": j.value.selectedText,
        "computed-styles": j.value.computedStyles,
        "initial-value": j.value.initialValue,
        "submit-label": j.value.submitLabel,
        dark: c(C),
        "accent-color": Q,
        onSubmit: xe,
        onCancel: we
      }, null, 8, ["element", "x", "y", "selected-text", "computed-styles", "initial-value", "submit-label", "dark"])) : M("", !0)
    ]));
  }
});
export {
  Ht as Agentation,
  pe as AnnotationMarker,
  Re as AnnotationPopup,
  ot as clearAnnotations,
  jt as generateAnnotationSummary,
  bt as generateMarkdown,
  ft as getAccessibilityInfo,
  Z as getCurrentRoutePath,
  pt as getDetailedComputedStyles,
  ct as getElementClasses,
  st as getElementPath,
  Ft as getForensicComputedStyles,
  rt as getFullElementPath,
  dt as getNearbyElements,
  ut as getNearbyText,
  te as getStorageKey,
  Dt as identifyAnimationElement,
  ge as identifyElement,
  mt as isElementFixed,
  fe as loadAnnotations,
  Bt as loadSettings,
  it as loadTheme,
  zt as resetAnnotations,
  J as saveAnnotations,
  Nt as saveSettings,
  me as saveTheme,
  vt as useAnimationPause,
  lt as useAnnotations,
  gt as useElementSelection,
  yt as useTheme
};
