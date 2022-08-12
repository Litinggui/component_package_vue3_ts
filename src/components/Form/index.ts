import Form from './Form'
import {App} from "vue";
import {SFCWithInstall} from "@/components/utils/types";

Form.install = (app: App) => {
  app.component(Form.name, Form)
}

// typeof把值转成 类型
export default Form as SFCWithInstall<typeof Form>
