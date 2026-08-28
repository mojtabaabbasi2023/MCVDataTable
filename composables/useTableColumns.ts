import { computed, nextTick, ref, Ref, watch } from "vue";
import type { DataTableHeader } from 'vuetify'

type TableColumnWithVisibility = DataTableHeader & {
  key: string
  hide?: boolean
}

export function useTableColumns<T extends TableColumnWithVisibility = TableColumnWithVisibility>(
  fixedHeaders: T[],
  toggleHeaders: Ref<T[]>,
  fixedEndHeaders: T[],
  tableRef?: Ref,
  defaultWidth = 200,
) {
  const visibleColumns: Ref<string[]> = ref(
    toggleHeaders.value
      .filter(header => !header.hide)
      .map(header => header.key)
  );

  const filteredHeaders = computed<T[]>(() => {
    const visible = toggleHeaders.value.filter((h) =>
      visibleColumns.value.includes(h.key)
    );

    return [...fixedHeaders, ...visible, ...fixedEndHeaders];
  });

  function getHeaderCells() {
    const table = tableRef?.value?.$el?.querySelector('table')

    return Array.from(
      table?.querySelectorAll('thead th') ?? []
    ) as HTMLElement[]
  }

  function setWidthForShrunkColumns() {
    const cells = getHeaderCells()

    if (!cells.length)
      return

    filteredHeaders.value.forEach((header, index) => {
      if (header.width != null)
        return

      const renderedWidth = cells[index]?.getBoundingClientRect().width ?? defaultWidth

      if (renderedWidth < defaultWidth)
        header.width = defaultWidth
    })
  }

  watch(
    () => [...visibleColumns.value],
    async () => {
      await nextTick()

      setWidthForShrunkColumns()
    },
    { flush: "post" }
  );

  return {
    visibleColumns,
    filteredHeaders
  };
}
