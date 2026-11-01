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

  // انتخاب / عدم انتخاب همه ستون‌ها
  const allColumnsSelected = computed(() =>
    toggleHeaders.value.every(col => visibleColumns.value.includes(col.key))
  );

  const someColumnsSelected = computed(() =>
    !allColumnsSelected.value &&
    toggleHeaders.value.some(col => visibleColumns.value.includes(col.key))
  );

  function toggleAllColumns() {
    if (allColumnsSelected.value) {
      visibleColumns.value = [];
    } else {
      const allKeys = toggleHeaders.value.map(col => col.key);
      visibleColumns.value = [...new Set([...visibleColumns.value, ...allKeys])];
    }
  }

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
    filteredHeaders,
    allColumnsSelected,
    someColumnsSelected,
    toggleAllColumns
  };
}
