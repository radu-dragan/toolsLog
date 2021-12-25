export const decodeUrl = ({
  data,
  toolId,
  dispatch,
}: {
  data: any
  toolId: any
  dispatch: any
}) => {
  toolId.forEach((value: any) => {
    const valueArray = value.split(',')
    const id =
      valueArray[0] && valueArray[0] !== 'undefined' ? valueArray[0] : false

    const decodeItem = (items: String[]) => {
      const temp: any = {}
      if (items && items.length > 0) {
        items.forEach((x) => {
          if (x.indexOf('Buc') > -1) {
            temp.count = +x.replace('Buc', '')
          }
        })
      }
      return temp
    }

    setTimeout(() => {
      if (id && Object.keys(data).indexOf(id) === -1) {
        const options: any = valueArray.length > 1 ? valueArray.splice(1) : []

        dispatch({
          type: 'ADD_ITEM',
          // missing options
          item: { [id]: { ...decodeItem(options), id } },
        })
      }
    })
  }, 100)
}
