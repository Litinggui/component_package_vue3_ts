import Tabs from './Tabs'
import {App} from "vue";
import {SFCWithInstall} from "@/components/utils/types";

Tabs.install = (app: App) => {
  app.component(Tabs.name, Tabs)
}

// typeof把值转成 类型
export default Tabs as SFCWithInstall<typeof Tabs>
