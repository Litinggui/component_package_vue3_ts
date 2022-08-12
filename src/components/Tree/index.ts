import Tree from './Tree'
import {App} from "vue";
import {SFCWithInstall} from "@/components/utils/types";

Tree.install = (app: App) => {
  app.component(Tree.name, Tree)
}

// typeof把值转成 类型
export default Tree as SFCWithInstall<typeof Tree>
