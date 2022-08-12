import Table from './Table'
import {App} from "vue";
import {SFCWithInstall} from "@/components/utils/types";

Table.install = (app: App) => {
  app.component(Table.name, Table)
}

// typeof把值转成 类型
export default Table as SFCWithInstall<typeof Table>
