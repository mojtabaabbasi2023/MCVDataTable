export function moveColumn<T extends { key: string }>(
  columns: T[],
  sourceKey: string,
  targetKey: string
): void {

  if (!sourceKey || sourceKey === targetKey) {
    return
  }

  const sourceIndex = columns.findIndex(
    column => column.key === sourceKey
  )

  const targetIndex = columns.findIndex(
    column => column.key === targetKey
  )

  if (sourceIndex === -1 || targetIndex === -1) {
    return
  }

  const [draggedColumn] = columns.splice(sourceIndex, 1)

  columns.splice(targetIndex, 0, draggedColumn)
}
