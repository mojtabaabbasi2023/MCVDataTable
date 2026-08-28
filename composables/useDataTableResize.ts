// useDataTableResize.ts
import type { DataTableHeader } from 'vuetify'
// export interface TableColumn {
//   title?: string
//   key: string
//   width?: number
//   resizable?: boolean
// }

interface UseDataTableResizeOptions {
  tableRef: Ref
  headers: Ref<DataTableHeader[]>
  minWidth?: number
  defaultWidth?: number
  direction?: 'rtl' | 'ltr'
}

export function useDataTableResize({
  tableRef,
  headers,
  minWidth = 80,
  defaultWidth = 120,
  direction = 'rtl'
}: UseDataTableResizeOptions) {

  const hasExplicitTableWidth = ref(false)

  const tableWidth = computed(() => {
    return headers.value.reduce((sum, h) => {
      const width =
        typeof h.width === 'number'
          ? h.width
          : Number.parseFloat(h.width ?? '0')

      return sum + (Number.isFinite(width) ? width : 0)
    }, 0)
  })

  function getTable() {
    return tableRef.value?.$el?.querySelector('table')
  }

  function getHeaderCells() {
    const table = getTable()

    return Array.from(
      table?.querySelectorAll('thead th') ?? []
    ) as HTMLElement[]
  }

  function setMissingWidthsFromRenderedCells() {
    const cells = getHeaderCells()

    headers.value.forEach((header, index) => {
      if (header.width != null)
        return

      const renderedWidth = cells[index]?.getBoundingClientRect().width

      header.width = Math.max(
        minWidth,
        Math.round(renderedWidth || defaultWidth)
      )
    })
  }

  function ensureExplicitWidths() {
    setMissingWidthsFromRenderedCells()

    hasExplicitTableWidth.value = true
    updateTableWidth()
  }

  function updateTableWidth() {
    const table = getTable()

    if (!table || !hasExplicitTableWidth.value)
      return

    table.style.width =
      tableWidth.value + 'px'
  }

  function startResize(
    event: MouseEvent,
    index: number
  ) {
    event.preventDefault()

    ensureExplicitWidths()

    const startX = event.pageX

    const rawStartWidth = headers.value[index].width

    const startWidth =
      typeof rawStartWidth === 'number'
        ? rawStartWidth
        : Number.parseFloat(rawStartWidth ?? `${defaultWidth}`)

    function mouseMove(ev: MouseEvent) {

      const diff =
        direction === 'rtl'
          ? startX - ev.pageX
          : ev.pageX - startX

      headers.value[index].width =
        Math.max(
          minWidth,
          startWidth + diff
        )

      updateTableWidth()
    }

    function mouseUp() {

      document.removeEventListener(
        'mousemove',
        mouseMove
      )

      document.removeEventListener(
        'mouseup',
        mouseUp
      )
    }

    document.addEventListener(
      'mousemove',
      mouseMove
    )

    document.addEventListener(
      'mouseup',
      mouseUp
    )
  }

  onMounted(() => {
    nextTick(() => {
      updateTableWidth()
    })
  })

  watch(
    () => headers.value.map(h => h.key),
    () => {
      nextTick(() => {
        if (hasExplicitTableWidth.value)
          setMissingWidthsFromRenderedCells()

        updateTableWidth()
      })
    }
  )

  return {
    startResize,
    getTable,
    tableWidth
  }
}

