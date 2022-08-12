<template>
  <div class="demo">
    <a-table :columns="columns" :data="data" rowKey="key" :maxHeight="200"> 
      <template #action="res"> 
        <button style="margin-right: 10px">编辑&nbsp;&nbsp;</button>
        <button style="margin-right: 10px">详情&nbsp;&nbsp; </button>
        <button>{{res}}</button>
      </template>
    </a-table>
  </div>
</template>
<script lang="tsx">
import { defineComponent, onMounted, ref } from "vue"
import { genTableData } from "./mock"
import { TableData } from "./types"

export default defineComponent({
  name: "TableDemo",
  setup() {
    const data = ref<TableData[]>([])
    onMounted(() => {
      data.value = genTableData()
    })
    return {
      columns: [
        {
          title: '用户名',
          key: 'name',
          width: 200
        },
        {
          title: '年龄',
          key: 'age',
          width: 200
        },
        {
          title: '城市',
          key: 'ctiy',
          width: 300
        },
        {
          title: '收件地址',
          key: 'address',
          minWidth: '200',
        },
        {
          title: '操作',
          key: 'action',
          minWidth: '200',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        }
      ],
      data,
      scroll: { y: 300, x: 100 }
    }
  }
})
</script>

<style lang="scss" scoped>
.demo {
  width: 800px;
  margin: 0 auto;
}
</style>
