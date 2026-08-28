<template>

  <v-data-table :headers="filteredHeaders" :items="items" hide-default-footer :items-per-page="pageSize"
    :class="`mc-vdata-table ${tableClass}`" :show-expand="showExpand" :single-expand="singleExpand" :expanded="expanded"
    :item-value="itemValue" @update:expanded="expanded = $event" fixed-header :loading="loading"
    :row-props="resolvedRowProps" ref="tableRef" disable-sort>
    <!-- Header Slot -->

    <template v-for="(header, index) in filteredHeaders" :key="header.key" #[`header.${header.key}`]="{ column }">
      <template v-if="column.key === 'data-table-expand'">

        <div class="d-flex align-center justify-space-between w-100">

          <!-- دکمه تنظیم ستون‌ها -->
          <v-menu offset-y :close-on-content-click="false" :scroll-strategy="'none'">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon variant="text">
                <v-icon>mdi-eye-settings</v-icon>
              </v-btn>
            </template>

            <!-- لیست ستون‌ها -->
            <v-list class="vlist-small" :height="300">
              <v-list-item v-for="(col, index) in toggleHeaders" :key="col.key">
                <v-divider v-if="index > 0 && toggleHeaders[index - 1].group !== col.group" class="my-2" />
                <v-checkbox v-model="visibleColumns" :label="col.title" :value="col.key" hide-details density="compact"
                  :disabled="col.disabled" />
              </v-list-item>
            </v-list>


          </v-menu>

        </div>
      </template>

      <!-- Normal columns -->
      <template v-else>

        <div :class="[
          'header-content',
          `header-content--indicator-${props.resizeDirection}`,
          {
            'header-content--dragging': draggedColumnKey === column.key,
            'header-content--drop-target': draggedColumnKey && draggedColumnKey !== column.key,
            'header-content--drag-over': dragOverColumnKey === column.key,
          }
        ]" draggable="true" @dragstart="onDragStart($event, String(column.key), column.title)" @dragover.prevent="onDragEnter(String(column.key))"
          @dragenter="onDragEnter(String(column.key))" @dragleave="onDragLeave(String(column.key))"
          @drop="onDrop(String(column.key))" @dragend="onDragEnd">
          <span>
            {{ column.title }}
          </span>

          <span v-if="
            filteredHeaders[index]?.resizable !== false
          " :class="['resize-handle', `resize-handle--${props.resizeDirection}`]" @mousedown="
              startResize($event, index)
              " />
        </div>


      </template>
    </template>

    <template v-for="slotName in itemSlotNames" :key="slotName" v-slot:[slotName]="slotScope">
      <slot :name="slotName" v-bind="slotScope" />
    </template>

    <template v-if="!showExpand" #item.data-table-expand="{ index }">
      <span class="mc-vdata-table__row-number">{{ index + 1 }}</span>
    </template>

    <template #expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="py-2 bg-surface-light">
          <slot name="expanded-row" :columns="columns" :item="item" />
        </td>
      </tr>
    </template>

  </v-data-table>
</template>


<script setup lang="ts">
import { useTableColumns } from "../composables/useTableColumns";
import {
  useDataTableResize,
  // type TableColumn
} from '../composables/useDataTableResize'
import { moveColumn } from '../utils/moveColumn'
import type { DataTableHeader } from 'vuetify'

type DataTableItem = Record<string, any>

interface GenericTableColumn extends DataTableHeader {
  key: string
  group?: string | number
  disabled?: boolean
  hide?: boolean
  resizable?: boolean
}

type RowPropsContext = {
  item: DataTableItem
  index: number
}

interface Props {
  items: DataTableItem[]
  headers: GenericTableColumn[]
  pageSize?: number
  resizeDirection?: 'rtl' | 'ltr'
  loading?: boolean
  itemValue?: string
  activeItemValue?: string | number
  fixedHeaders?: GenericTableColumn[]
  fixedEndHeaders?: GenericTableColumn[]
  tableClass?: string
  showExpand?: boolean
  singleExpand?: boolean
  rowProps?: (context: RowPropsContext) => Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 20,
  resizeDirection: 'rtl',
  items: () => [],
  headers: () => [],
  loading: false,
  itemValue: 'id',
  fixedHeaders: () => [{ key: 'data-table-expand', width: 69, resizable: false }],
  fixedEndHeaders: () => [],
  tableClass: 'elevation-1 report-table',
  showExpand: false,
  singleExpand: true,
})

const toggleHeaders = ref<GenericTableColumn[]>([...props.headers]);
const tableHeaders = ref<GenericTableColumn[]>([...props.headers]);

const expanded = ref([])
const tableRef = ref<any>(null)
// 👇 استفاده از کامپوزیبل
const { visibleColumns, filteredHeaders } = useTableColumns(
  props.fixedHeaders,
  tableHeaders,
  props.fixedEndHeaders,
  tableRef
);

const slots = useSlots()

const itemSlotNames = computed(() =>
  Object.keys(slots).filter(slotName =>
    slotName.startsWith('item.')
  )
)

const resolvedRowProps = (context: RowPropsContext) => {
  if (props.rowProps)
    return props.rowProps(context)

  return {
    class: props.activeItemValue !== undefined && context.item?.[props.itemValue] === props.activeItemValue ? 'active' : ''
  }
}

const { startResize, tableWidth } = useDataTableResize({
  tableRef,
  headers: filteredHeaders,
  minWidth: 80,
  defaultWidth: 120,
  direction: props.resizeDirection
})

const draggedColumnKey = ref()
const dragOverColumnKey = ref<string | null>(null)

function onDragStart(event: DragEvent, key: string, title?: unknown) {
  draggedColumnKey.value = key

  if (!event.dataTransfer) return

  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', key)

  const dragPreview = document.createElement('div')
  dragPreview.className = 'mc-vdata-table__drag-preview'
  dragPreview.textContent = String(title || key)
  document.body.appendChild(dragPreview)
  event.dataTransfer.setDragImage(dragPreview, 14, 16)
  window.setTimeout(() => dragPreview.remove(), 0)
}

function onDragEnter(key: string) {
  if (draggedColumnKey.value && draggedColumnKey.value !== key)
    dragOverColumnKey.value = key
}

function onDragLeave(key: string) {
  if (dragOverColumnKey.value === key)
    dragOverColumnKey.value = null
}

function onDragEnd() {
  draggedColumnKey.value = null
  dragOverColumnKey.value = null
}

function onDrop(targetKey: string) {
  const sourceKey = draggedColumnKey.value

  if (!sourceKey) return

  try {
    moveColumn(
      tableHeaders.value,
      sourceKey,
      targetKey
    )
  } finally {
    draggedColumnKey.value = null
    dragOverColumnKey.value = null
  }
}
</script>
