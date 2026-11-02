<template>
  <v-app>
    <v-main class="demo-shell">
      <section class="hero-panel">
        <div>
          <p class="eyebrow">Vuetify 3.11.3 Package Demo</p>
          <h1>MCVDataTable</h1>
          <p class="subtitle">
            A packaged Vuetify data table with column visibility, resizing, drag-and-drop ordering.
          </p>
        </div>

        <div class="stat-card">
          <strong>{{ items.length }}</strong>
          <span>sample rows</span>
        </div>
      </section>

      <section class="table-card">
        <div class="table-toolbar">
          <div>
            <h2>Library Orders</h2>
            <p>Use the eye button to toggle columns, drag headers to reorder, and resize columns from the header edge.</p>
          </div>
          <v-chip color="primary" variant="tonal">Active: {{ activeItemValue }}</v-chip>
        </div>

        <MCVDataTable
          :headers="headers"
          :items="items"
          :active-item-value="activeItemValue"
          :show-expand="false"
          class="demo-table"
          resize-direction="ltr"
          menu-width="420"
          :translations="tableTranslations"
        >
          <template #item.status="{ item }">
            <v-chip :color="statusColor(item.status)" size="small" variant="flat">
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.amount="{ item }">
            <strong>{{ item.amount.toLocaleString() }}</strong>
          </template>

          <template #expanded-row="{ item }">
            <div class="expanded-content">
              <strong>{{ item.title }}</strong>
              <span>{{ item.note }}</span>
            </div>
          </template>
        </MCVDataTable>
      </section>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
type DemoHeader = {
  title: string
  key: string
  width?: number
  group?: string
  hide?: boolean
  disabled?: boolean
  resizable?: boolean
}

type DemoItem = {
  id: number
  title: string
  category: string
  status: 'Draft' | 'Review' | 'Published'
  owner: string
  amount: number
  note: string
}

const activeItemValue = 2

const tableTranslations = {
  columnSearchPlaceholder: 'Search columns...',
  resetToDefaultColumnsTitle: 'Show default columns',
}

const headers: DemoHeader[] = [
  { title: 'Title', key: 'title', group: 'main',hide:true },
  { title: 'Category', key: 'category', width: 150, group: 'main' },
  { title: 'Status', key: 'status', width: 140, group: 'workflow' },
  { title: 'Owner', key: 'owner', width: 160, group: 'workflow' },
  { title: 'Amount', key: 'amount', width: 130, group: 'finance' },
]

const items: DemoItem[] = [
  {
    id: 1,
    title: 'Digital Manuscript Archive',
    category: 'Archive',
    status: 'Published',
    owner: 'Sara',
    amount: 12800,
    note: 'Includes custom item slots and expandable row content.',
  },
  {
    id: 2,
    title: 'Rare Book Catalog',
    category: 'Catalog',
    status: 'Review',
    owner: 'Omid',
    amount: 9200,
    note: 'This row is highlighted with activeItemValue.',
  },
  {
    id: 3,
    title: 'Public Research Index',
    category: 'Research',
    status: 'Draft',
    owner: 'Nika',
    amount: 5400,
    note: 'Try hiding columns from the header menu.',
  },
]

function statusColor(status: DemoItem['status']) {
  return {
    Draft: 'grey',
    Review: 'warning',
    Published: 'success',
  }[status]
}
</script>

<style scoped>
.demo-shell {
  min-height: 100vh;
  padding: 36px;
  background:
    radial-gradient(circle at top left, rgba(36, 96, 165, 0.18), transparent 34rem),
    linear-gradient(135deg, #f7efe2 0%, #e6edf7 48%, #f9fbff 100%);
}

.hero-panel {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: end;
  max-width: 1180px;
  margin: 0 auto 24px;
  padding: 32px;
  color: #162133;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(28, 50, 78, 0.12);
  border-radius: 28px;
  box-shadow: 0 24px 70px rgba(34, 55, 89, 0.14);
}

.eyebrow {
  margin: 0 0 8px;
  color: #7b4d18;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  line-height: 0.9;
  letter-spacing: -0.08em;
}

.subtitle {
  max-width: 720px;
  margin-top: 18px;
  color: #536174;
  font-size: 1.08rem;
}

.stat-card {
  display: grid;
  min-width: 150px;
  padding: 24px;
  text-align: center;
  background: #162133;
  color: white;
  border-radius: 24px;
}

.stat-card strong {
  font-size: 3rem;
  line-height: 1;
}

.table-card {
  max-width: 1180px;
  margin: 0 auto;
  padding: 24px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(28, 50, 78, 0.12);
  border-radius: 28px;
  box-shadow: 0 24px 70px rgba(34, 55, 89, 0.12);
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 18px;
}

.table-toolbar p {
  margin-top: 6px;
  color: #627188;
}

.demo-table {
  overflow: hidden;
  border: 1px solid rgba(28, 50, 78, 0.1);
  border-radius: 18px;
}

.expanded-content {
  display: grid;
  gap: 4px;
  padding: 12px 16px;
  color: #304259;
}

.expanded-content span {
  color: #68768b;
}

@media (max-width: 720px) {
  .demo-shell {
    padding: 16px;
  }

  .hero-panel,
  .table-toolbar {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .table-toolbar {
    display: grid;
  }
}
</style>
