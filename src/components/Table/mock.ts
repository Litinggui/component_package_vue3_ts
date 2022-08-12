import { TableData  } from "./types";

const genTableData = (count = 10) => {
  return Array(count).fill('').map((item, index) => ({
    id: index,
    name: '李磊-' + index,
    age: 18 + index,
    address: '北京市昌平区沙河',
    ctiy: '北京市'
  }))
}

export { genTableData }