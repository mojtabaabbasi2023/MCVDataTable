import { Ref } from 'vue';
import { DataTableHeader } from 'vuetify';
type TableColumnWithVisibility = DataTableHeader & {
    key: string;
    hide?: boolean;
};
export declare function useTableColumns<T extends TableColumnWithVisibility = TableColumnWithVisibility>(fixedHeaders: T[], toggleHeaders: Ref<T[]>, fixedEndHeaders: T[], tableRef?: Ref, defaultWidth?: number): {
    visibleColumns: Ref<string[], string[]>;
    filteredHeaders: import('vue').ComputedRef<T[]>;
};
export {};
