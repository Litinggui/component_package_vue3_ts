import FormItem from '../Form/FormItem'
import {App} from "vue";
import {SFCWithInstall} from "@/components/utils/types";

FormItem.install = (app: App) => {
  app.component(FormItem.name, FormItem)
}

// typeof把值转成 类型
export default FormItem as SFCWithInstall<typeof FormItem>
