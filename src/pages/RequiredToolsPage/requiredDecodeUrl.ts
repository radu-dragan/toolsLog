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

    setTimeout(() => {
      if (id && Object.keys(data).indexOf(id) === -1) {
        const options:any = valueArray.length > 1 ? valueArray.splice(1) : []
        console.log(options)

        dispatch({
          type: 'ADD_ITEM',
          // missing options
          item: { [id]: { id } },
        })
      }
    })
  }, 100)
}
