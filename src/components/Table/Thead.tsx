import {defineComponent, PropType} from "vue";
import {ColumnOptions, ColStyleCls} from "@/components/Table/types";
import {tableRowKey} from './helper'

export default defineComponent({
  name: "AThead",
  props: {
   columns: {
    type: Array as PropType<ColumnOptions[]>,
    default: () => []
   },
   colStyleCls: {
    type: Array as PropType<ColStyleCls[]>,
    default: () => []
   }
  },
  setup(props) {
    
    return () => {
      return (
        <thead class="table-head">
         <tr class="table-row">
          {
           props.columns?.map((col, index) => {
            const colStyleCls = props.colStyleCls[index]
            return (
              <th class={colStyleCls.cls} style={colStyleCls.style} key={tableRowKey(col, index)}>
                <span class="cell-text">
                  {col.title}
                </span>
                
              </th>
            )
           })
          }
         </tr>
        </thead>
      )
    }
  }
})
