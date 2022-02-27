export const constructGrid = ({
  structure,
  gridWidth,
  gridHeight,
  getDepth,
}: {
  structure: any[]
  gridWidth: number
  gridHeight: number
  getDepth: number
}) => {
  return structure.map((itemRow: any, indexRow: number) => {
    return itemRow.map((itemCol: any, indexCol: number) => {
      const temp = { ...itemCol }
      temp.w = Math.floor(gridWidth / itemRow.length)
      temp.x = Math.floor(temp.w * indexCol)

      temp.h = Math.floor(gridHeight / structure.length)
      temp.y = Math.floor(temp.h * indexRow)

      temp.planks = []
      temp.planks.push([temp.w, temp.h, 'back']) // back
      temp.planks.push([temp.w, getDepth, 'top']) // top-plank
      temp.planks.push([temp.h, getDepth, 'left']) // left-plank

      if (itemRow.length === indexCol + 1) {
        temp.planks.push([temp.h, getDepth, 'right']) // right-plank
      }

      if (structure.length === indexRow + 1) {
        temp.planks.push([temp.w, getDepth, 'bottom']) // bottom-plank
      }

      return temp
    })
  })
}
