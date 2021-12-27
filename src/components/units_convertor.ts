type ValueType = string | number | any
export const cmToL = (value: [ValueType, ValueType, ValueType]): number => {
  return value.reduce((a: ValueType, b: ValueType) => +a * +b, 1) / 1000
}
