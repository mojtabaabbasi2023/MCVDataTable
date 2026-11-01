import { Ref } from 'vue';
import { DataTableHeader } from 'vuetify';
type TableColumnWithVisibility = DataTableHeader & {
    key: string;
    hide?: boolean;
};
export declare function useTableColumns<T extends TableColumnWithVisibility = TableColumnWithVisibility>(fixedHeaders: T[], toggleHeaders: Ref<T[]>, fixedEndHeaders: T[], tableRef?: Ref, defaultWidth?: number): {
    columnSearch: Ref<string, string>;
    filteredToggleHeaders: import('vue').ComputedRef<T[]>;
    visibleColumns: Ref<string[], string[]>;
    filteredHeaders: import('vue').ComputedRef<T[]>;
    allColumnsSelected: import('vue').ComputedRef<boolean>;
    someColumnsSelected: import('vue').ComputedRef<boolean>;
    toggleAllColumns: () => void;
};
export {};
