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
  const columnSearch = ref('');

  // ستون‌های پیش‌فرض = ستون‌هایی که در هدرهای ورودی `hide` نشده‌اند
  function getDefaultVisibleColumnKeys(): string[] {
    return toggleHeaders.value
      .filter(header => !header.hide)
      .map(header => header.key);
  }

  const visibleColumns: Ref<string[]> = ref(getDefaultVisibleColumnKeys());

  const filteredToggleHeaders = computed<T[]>(() => {
    const query = columnSearch.value.trim().toLowerCase();

    if (!query)
      return toggleHeaders.value;

    return toggleHeaders.value.filter(column =>
      String(column.title ?? column.key).toLowerCase().includes(query)
    );
  });

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

  // بازگرداندن نمایش ستون‌ها به حالت پیش‌فرض
  function resetToDefaultColumns() {
    visibleColumns.value = getDefaultVisibleColumnKeys();
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
    columnSearch,
    filteredToggleHeaders,
    visibleColumns,
    filteredHeaders,
    allColumnsSelected,
    someColumnsSelected,
    toggleAllColumns,
    resetToDefaultColumns
  };
}
