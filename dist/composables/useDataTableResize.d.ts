import { DataTableHeader } from 'vuetify';
interface UseDataTableResizeOptions {
    tableRef: Ref;
    headers: Ref<DataTableHeader[]>;
    minWidth?: number;
    defaultWidth?: number;
    direction?: 'rtl' | 'ltr';
}
export declare function useDataTableResize({ tableRef, headers, minWidth, defaultWidth, direction }: UseDataTableResizeOptions): {
    startResize: (event: MouseEvent, index: number) => void;
    getTable: () => any;
    tableWidth: import('vue').ComputedRef<number>;
};
export {};
