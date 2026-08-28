import { DataTableHeader } from 'vuetify';
type DataTableItem = Record<string, any>;
interface GenericTableColumn extends DataTableHeader {
    key: string;
    group?: string | number;
    disabled?: boolean;
    hide?: boolean;
    resizable?: boolean;
}
type RowPropsContext = {
    item: DataTableItem;
    index: number;
};
interface Props {
    items: DataTableItem[];
    headers: GenericTableColumn[];
    pageSize?: number;
    resizeDirection?: 'rtl' | 'ltr';
    loading?: boolean;
    itemValue?: string;
    activeItemValue?: string | number;
    fixedHeaders?: GenericTableColumn[];
    fixedEndHeaders?: GenericTableColumn[];
    tableClass?: string;
    showExpand?: boolean;
    singleExpand?: boolean;
    rowProps?: (context: RowPropsContext) => Record<string, any>;
}
declare function __VLS_template(): any;
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    headers: GenericTableColumn[];
    items: DataTableItem[];
    pageSize: number;
    resizeDirection: "rtl" | "ltr";
    loading: boolean;
    itemValue: string;
    fixedHeaders: GenericTableColumn[];
    fixedEndHeaders: GenericTableColumn[];
    tableClass: string;
    showExpand: boolean;
    singleExpand: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, any, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
