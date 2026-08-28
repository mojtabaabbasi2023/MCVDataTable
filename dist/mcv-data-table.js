import { ref as _, computed as R, watch as U, nextTick as P, onMounted as Z, defineComponent as ee, useSlots as te, resolveComponent as k, openBlock as E, createBlock as B, unref as u, normalizeClass as I, createSlots as ne, withCtx as x, createElementVNode as W, renderSlot as A, renderList as N, createElementBlock as H, createVNode as $, Fragment as ae, createCommentVNode as q, isRef as re, mergeProps as oe, createTextVNode as le, withModifiers as se, toDisplayString as X, normalizeProps as ie, guardReactiveProps as de } from "vue";
function ue(a, t, y, c, v = 200) {
  const i = _(
    t.value.filter((o) => !o.hide).map((o) => o.key)
  ), d = R(() => {
    const o = t.value.filter(
      (m) => i.value.includes(m.key)
    );
    return [...a, ...o, ...y];
  });
  function b() {
    var m, p;
    const o = (p = (m = c == null ? void 0 : c.value) == null ? void 0 : m.$el) == null ? void 0 : p.querySelector("table");
    return Array.from(
      (o == null ? void 0 : o.querySelectorAll("thead th")) ?? []
    );
  }
  function z() {
    const o = b();
    o.length && d.value.forEach((m, p) => {
      var e;
      if (m.width != null)
        return;
      (((e = o[p]) == null ? void 0 : e.getBoundingClientRect().width) ?? v) < v && (m.width = v);
    });
  }
  return U(
    () => [...i.value],
    async () => {
      await P(), z();
    },
    { flush: "post" }
  ), {
    visibleColumns: i,
    filteredHeaders: d
  };
}
function ce({
  tableRef: a,
  headers: t,
  minWidth: y = 80,
  defaultWidth: c = 120,
  direction: v = "rtl"
}) {
  const i = _(!1), d = R(() => t.value.reduce((e, s) => {
    const w = typeof s.width == "number" ? s.width : Number.parseFloat(s.width ?? "0");
    return e + (Number.isFinite(w) ? w : 0);
  }, 0));
  function b() {
    var e, s;
    return (s = (e = a.value) == null ? void 0 : e.$el) == null ? void 0 : s.querySelector("table");
  }
  function z() {
    const e = b();
    return Array.from(
      (e == null ? void 0 : e.querySelectorAll("thead th")) ?? []
    );
  }
  function o() {
    const e = z();
    t.value.forEach((s, w) => {
      var S;
      if (s.width != null)
        return;
      const D = (S = e[w]) == null ? void 0 : S.getBoundingClientRect().width;
      s.width = Math.max(
        y,
        Math.round(D || c)
      );
    });
  }
  function m() {
    o(), i.value = !0, p();
  }
  function p() {
    const e = b();
    !e || !i.value || (e.style.width = d.value + "px");
  }
  function f(e, s) {
    e.preventDefault(), m();
    const w = e.pageX, D = t.value[s].width, S = typeof D == "number" ? D : Number.parseFloat(D ?? `${c}`);
    function M(r) {
      const T = v === "rtl" ? w - r.pageX : r.pageX - w;
      t.value[s].width = Math.max(
        y,
        S + T
      ), p();
    }
    function n() {
      document.removeEventListener(
        "mousemove",
        M
      ), document.removeEventListener(
        "mouseup",
        n
      );
    }
    document.addEventListener(
      "mousemove",
      M
    ), document.addEventListener(
      "mouseup",
      n
    );
  }
  return Z(() => {
    P(() => {
      p();
    });
  }), U(
    () => t.value.map((e) => e.key),
    () => {
      P(() => {
        i.value && o(), p();
      });
    }
  ), {
    startResize: f,
    getTable: b,
    tableWidth: d
  };
}
function fe(a, t, y) {
  if (!t || t === y)
    return;
  const c = a.findIndex(
    (d) => d.key === t
  ), v = a.findIndex(
    (d) => d.key === y
  );
  if (c === -1 || v === -1)
    return;
  const [i] = a.splice(c, 1);
  a.splice(v, 0, i);
}
const ve = {
  key: 0,
  class: "d-flex align-center justify-space-between w-100"
}, me = ["onDragstart", "onDragover", "onDragenter", "onDragleave", "onDrop"], pe = ["onMousedown"], ge = { class: "mc-vdata-table__row-number" }, he = ["colspan"], ye = /* @__PURE__ */ ee({
  __name: "MCVdataTable",
  props: {
    items: { default: () => [] },
    headers: { default: () => [] },
    pageSize: { default: 20 },
    resizeDirection: { default: "rtl" },
    loading: { type: Boolean, default: !1 },
    itemValue: { default: "id" },
    activeItemValue: {},
    fixedHeaders: { default: () => [{ key: "data-table-expand", width: 69, resizable: !1 }] },
    fixedEndHeaders: { default: () => [] },
    tableClass: { default: "elevation-1 report-table" },
    showExpand: { type: Boolean, default: !1 },
    singleExpand: { type: Boolean, default: !0 },
    rowProps: {}
  },
  setup(a) {
    const t = a, y = _([...t.headers]), c = _([...t.headers]), v = _([]), i = _(null), { visibleColumns: d, filteredHeaders: b } = ue(
      t.fixedHeaders,
      c,
      t.fixedEndHeaders,
      i
    ), z = te(), o = R(
      () => Object.keys(z).filter(
        (n) => n.startsWith("item.")
      )
    ), m = (n) => {
      var r;
      return t.rowProps ? t.rowProps(n) : {
        class: t.activeItemValue !== void 0 && ((r = n.item) == null ? void 0 : r[t.itemValue]) === t.activeItemValue ? "active" : ""
      };
    }, { startResize: p } = ce({
      tableRef: i,
      headers: b,
      minWidth: 80,
      defaultWidth: 120,
      direction: t.resizeDirection
    }), f = _(), e = _(null);
    function s(n, r, T) {
      if (f.value = r, !n.dataTransfer) return;
      n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("text/plain", r);
      const C = document.createElement("div");
      C.className = "mc-vdata-table__drag-preview", C.textContent = String(T || r), document.body.appendChild(C), n.dataTransfer.setDragImage(C, 14, 16), window.setTimeout(() => C.remove(), 0);
    }
    function w(n) {
      f.value && f.value !== n && (e.value = n);
    }
    function D(n) {
      e.value === n && (e.value = null);
    }
    function S() {
      f.value = null, e.value = null;
    }
    function M(n) {
      const r = f.value;
      if (r)
        try {
          fe(
            c.value,
            r,
            n
          );
        } finally {
          f.value = null, e.value = null;
        }
    }
    return (n, r) => {
      const T = k("v-icon"), C = k("v-btn"), j = k("v-divider"), O = k("v-checkbox"), G = k("v-list-item"), J = k("v-list"), K = k("v-menu"), Q = k("v-data-table");
      return E(), B(Q, {
        headers: u(b),
        items: a.items,
        "hide-default-footer": "",
        "items-per-page": a.pageSize,
        class: I(`mc-vdata-table ${a.tableClass}`),
        "show-expand": a.showExpand,
        "single-expand": a.singleExpand,
        expanded: u(v),
        "item-value": a.itemValue,
        "onUpdate:expanded": r[1] || (r[1] = (g) => v.value = g),
        "fixed-header": "",
        loading: a.loading,
        "row-props": m,
        ref_key: "tableRef",
        ref: i,
        "disable-sort": ""
      }, ne({
        "expanded-row": x(({ columns: g, item: V }) => [
          W("tr", null, [
            W("td", {
              colspan: g.length,
              class: "py-2 bg-surface-light"
            }, [
              A(n.$slots, "expanded-row", {
                columns: g,
                item: V
              })
            ], 8, he)
          ])
        ]),
        _: 2
      }, [
        N(u(b), (g, V) => ({
          name: `header.${g.key}`,
          fn: x(({ column: h }) => {
            var F;
            return [
              h.key === "data-table-expand" ? (E(), H("div", ve, [
                $(K, {
                  "offset-y": "",
                  "close-on-content-click": !1,
                  "scroll-strategy": "none"
                }, {
                  activator: x(({ props: l }) => [
                    $(C, oe(l, {
                      icon: "",
                      variant: "text"
                    }), {
                      default: x(() => [
                        $(T, null, {
                          default: x(() => [...r[2] || (r[2] = [
                            le("mdi-eye-settings", -1)
                          ])]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 16)
                  ]),
                  default: x(() => [
                    $(J, {
                      class: "vlist-small",
                      height: 300
                    }, {
                      default: x(() => [
                        (E(!0), H(ae, null, N(u(y), (l, L) => (E(), B(G, {
                          key: l.key
                        }, {
                          default: x(() => [
                            L > 0 && u(y)[L - 1].group !== l.group ? (E(), B(j, {
                              key: 0,
                              class: "my-2"
                            })) : q("", !0),
                            $(O, {
                              modelValue: u(d),
                              "onUpdate:modelValue": r[0] || (r[0] = (Y) => re(d) ? d.value = Y : null),
                              label: l.title,
                              value: l.key,
                              "hide-details": "",
                              density: "compact",
                              disabled: l.disabled
                            }, null, 8, ["modelValue", "label", "value", "disabled"])
                          ]),
                          _: 2
                        }, 1024))), 128))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ])) : (E(), H("div", {
                key: 1,
                class: I([
                  "header-content",
                  `header-content--indicator-${t.resizeDirection}`,
                  {
                    "header-content--dragging": u(f) === h.key,
                    "header-content--drop-target": u(f) && u(f) !== h.key,
                    "header-content--drag-over": u(e) === h.key
                  }
                ]),
                draggable: "true",
                onDragstart: (l) => s(l, String(h.key), h.title),
                onDragover: se((l) => w(String(h.key)), ["prevent"]),
                onDragenter: (l) => w(String(h.key)),
                onDragleave: (l) => D(String(h.key)),
                onDrop: (l) => M(String(h.key)),
                onDragend: S
              }, [
                W("span", null, X(h.title), 1),
                ((F = u(b)[V]) == null ? void 0 : F.resizable) !== !1 ? (E(), H("span", {
                  key: 0,
                  class: I(["resize-handle", `resize-handle--${t.resizeDirection}`]),
                  onMousedown: (l) => u(p)(l, V)
                }, null, 42, pe)) : q("", !0)
              ], 42, me))
            ];
          })
        })),
        N(u(o), (g) => ({
          name: g,
          fn: x((V) => [
            A(n.$slots, g, ie(de(V)))
          ])
        })),
        a.showExpand ? void 0 : {
          name: "item.data-table-expand",
          fn: x(({ index: g }) => [
            W("span", ge, X(g + 1), 1)
          ]),
          key: "0"
        }
      ]), 1032, ["headers", "items", "items-per-page", "class", "show-expand", "single-expand", "expanded", "item-value", "loading"]);
    };
  }
}), we = {
  install(a) {
    a.component("MCVDataTable", ye);
  }
};
export {
  ye as MCVDataTable,
  we as default
};
