import {defineComponent, onMounted, PropType, Slot} from "vue";
import {ColStyleCls, ColumnOptions, TableData} from "@/components/Table/types";
import {tableRowKey} from './helper'

export default defineComponent({
  name: "ATbody",
  props: {
   columns: {
    type: Array as PropType<ColumnOptions[]>,
    default: () => []
   },
   data: {
    type: Array as PropType<TableData[]>,
    default: () => []
   },
   rowKey: {
    type: String,
    require: true,
    default: 'key'
   },
   colStyleCls: {
    type: Array as PropType<ColStyleCls[]>,
    default: () => []
   },
   slots: {
    type: Object,
    default: () => ({})
   }
  },
  setup(props) {
    const hasSlot = (row: TableData, col: ColumnOptions): JSX.Element => {
      if(col.scopedSlots) {
        console.log('props.slots', props.slots)
        return props.slots[col.scopedSlots.customRender]('aaaaaaa') as JSX.Element
      }
      return (
        <span class="cell-text">
          {row[col.key]}
        </span>
      )
    }

    return () => {
      return (
        <tbody class="table-body">
          {
           props.data?.map((row, index) => {
            return (
              <tr class="table-row" key={row[props.rowKey]}>
                {
                  props.columns.map((col, index) => {
                    const colStyleCls = props.colStyleCls[index]
                    return (
                      <td class={colStyleCls.cls} style={colStyleCls.style} key={tableRowKey(col, index)}>
                        <span class="cell-text">
                          {hasSlot(row, col)}
                        </span>
                      </td>
                    )
                  })
                }
              </tr>
            )
           })
          }
        </tbody>
      )
    }
  }
})
