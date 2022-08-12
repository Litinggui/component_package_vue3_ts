import TabPane from '../Tabs/TabPane'
import {App} from "vue";
import {SFCWithInstall} from "@/components/utils/types";

TabPane.install = (app: App) => {
  app.component(TabPane.name, TabPane)
}

// typeof把值转成 类型
export default TabPane as SFCWithInstall<typeof TabPane>
