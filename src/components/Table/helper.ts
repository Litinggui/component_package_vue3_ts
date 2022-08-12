import {ColumnOptions} from "@/components/Table/types";
import { sumBy } from "lodash";
import {ColStyle} from './types'

function  tableRowKey (col: ColumnOptions, index: number): string | number {
  return col.key || col.title || index;
}

function getColStyle (columns: ColumnOptions[], index: number, tableWidth: number) {
  const reslut: Partial<ColStyle> = {}
  const col = columns[index]
  if(col.fixed && tableWidth) {
    if(col.fixed === 'left') {
      const sArr = columns.slice(0, index)
      reslut.left = sumBy(sArr, 'width') + 'px'
    }else if(col.fixed === 'right') {
      const sArr = columns.slice(index + 1)
      console.log('sArr',sArr, sumBy(sArr, 'width'));
      
      reslut.right = sumBy(sArr, 'width') + 'px'
    }
  }
  return reslut
}

export {tableRowKey, getColStyle}
