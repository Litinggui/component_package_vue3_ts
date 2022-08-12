import {computed, defineComponent,CSSProperties, nextTick, onMounted, PropType, ref, watch} from "vue";
import { ColumnOptions, TableData, TableScrollType, TableSectionEls, ColStyleCls } from "./types";
import './index.scss'
import AThead from './Thead'
import ATbody from './Tbody'
import { partial, partition, sumBy } from "lodash";
import ScrollServer, {IsReachBoundary} from './scroll'
import { getColStyle } from './helper'

export default defineComponent({
  name: "ATable",
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
      require: true
    },
    scroll: {
      type: Object as PropType<TableScrollType>
    },
    maxHeight: Number
  },
  components: {
    AThead,
    ATbody
  },
  setup(props, {slots}) {
    console.log('Table-slots', slots);
    const tableData = ref<TableData[]>([])
    const separateHeight = ref(false) // 头尾是否分离
    const rootHtml = ref<HTMLElement | undefined>()
    const tableWidth = ref(0);
    const init = () => {
      console.log('mounted');
      tableData.value = props.data
    }
    const bodyHeadDom = (): Partial<TableSectionEls> => {
      if(rootHtml.value instanceof HTMLElement) {
        const head: HTMLElement | undefined  = rootHtml.value.querySelector('.table-head') as HTMLElement || undefined;
        const body: HTMLElement | undefined = rootHtml.value.querySelector('.sec-body .table-body') as HTMLElement || undefined
        return {
          head,
          body
        }
      }
      return {}
    }
    // 计算表头是否需要分离
    const setSeparateHeight = () => {
      const {head ,body} = bodyHeadDom()
      if(head && body) {
        separateHeight.value = props.maxHeight ? props.maxHeight > 0 && body.clientHeight > props.maxHeight : false
        console.log(separateHeight.value);

      }
    }
    const bodyStyle = computed<CSSProperties>(() => {
      const result: {
        overflowY?: any;
        maxHeight?: string;
      } = {overflowY: 'auto'};
      if (separateHeight.value) {
        result.maxHeight = props.maxHeight + 'px';
        result.overflowY = 'scroll'
      }
      return result;
    });
    // 设置每一列宽度,计算table总宽度
    const setColumnsWidth = () => {
      const {head ,body} = bodyHeadDom()
      if(head && body) {
        const containerWidth = body.clientWidth
        console.log('containerWidth', containerWidth);
        // 按是否有width分离
        const [hasWidthColumns, noWidthColumns] = partition(props.columns, 'width')
        // 用户有设置宽度的col总宽度
        const colCountWidth = sumBy(hasWidthColumns, 'width')
        // 剩余宽度
        const restWidth = Math.max(0, containerWidth - colCountWidth)
        // 没设置宽度的col的宽度
        const restAverageWidth = restWidth / (noWidthColumns.length || 1)

        props.columns.forEach(col => {
          let width = col.width || 0
          if(typeof col.width !== 'number') {
            width = restAverageWidth
            if(col.maxWidth) {
              width = Math.min(width, col.maxWidth)
            }
            if(col.minWidth) {
              console.log('col.minWidth', col.minWidth)
              width = Math.max(width, col.minWidth)
            }
            col.width = width
          }
        })
        tableWidth.value = sumBy(props.columns, 'width')
        console.log('props.columns', props.columns);
      }
    }

    // 设置表头滚动
    const handleBodyScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      const direction = ScrollServer.getDirection(target)
      if(direction === 'horizontal') {
        const headSec = rootHtml.value?.querySelector('.sec-head')
        ScrollServer.setScroll(headSec as HTMLElement, target.scrollLeft, false)
      }
    }

    // 设置左右浮动样式
    const colStyleCls = computed<Partial<ColStyleCls>[]>(() => {
      const base = 'table-cell'
      console.log('props.columns', props.columns);
      
      return props.columns.map((col, index) => {
        let style = {}
        let cls = base
        if(col.fixed) {
          cls += ' fixed'
          cls += ' fixed-' + col.fixed
          style = getColStyle(props.columns, index, tableWidth.value)
          if(col.fixed === 'left') {
            cls += ''
          }
        }
        return { style, cls }
      })
    })

    onMounted(async () => {
      init()
      await nextTick()
      setSeparateHeight()
      setColumnsWidth()
    })
    watch(() => props.data, () => {
      init()
    })
    return () => {
      return (
        <div class="ant-table-wrap" ref={rootHtml}>
          <div class="ant-tables">
            {
              separateHeight.value ?
              <div class="ant-table-section sec-head" style={bodyStyle.value}>
                <table class="ant-table" cellspacing="0" style={{width: tableWidth.value + 'px'}}>
                <colgroup>
                  {
                    props.columns.map(col => <col  width={col.width} />)
                  }
                </colgroup>
                  <a-thead columns={props.columns} col-style-cls={colStyleCls.value}/>
                </table>
              </div> : ''
            }
            <div class="ant-table-section sec-body" style={bodyStyle.value} onScroll={handleBodyScroll}>
              <table class="ant-table" cellspacing="0" style={{width: tableWidth.value + 'px'}}>
                <colgroup>
                  {
                    props.columns.map(col => <col  width={col.width} />)
                  }
                </colgroup>
                {
                  !separateHeight.value ?
                  <a-thead columns={props.columns} col-style-cls={colStyleCls.value} /> : ''
                }

                <a-tbody
                  columns={props.columns} 
                  data={props.data} 
                  rowKey={props.rowKey} 
                  col-style-cls={colStyleCls.value}
                  slots={slots}
                />
              </table>
            </div>
          </div>

        </div>
      )
    }
  }
})

