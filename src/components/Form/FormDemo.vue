<template>
  <div>
    <a-form-item label="姓名" prop="name" :rules="nameRules">
      <a-input v-model="formValues.name" placeholder="请输入姓名"/>
    </a-form-item>
    <a-form-item label="密码" prop="password" :rules="pwdRules">
      <a-input v-model="formValues.password" placeholder="请输入密码" type="password" />
    </a-form-item>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import AFormItem from "@/components/Form/FormItem";
import AInput from "@/components/Input";
import {AntRuleItem} from "@/components/Form/types";

export default defineComponent({
  name: "FormDemo",
  components: {AInput, AFormItem},
  setup(props, {emit}) {
    const formValues = reactive({
      name: '李磊',
      password: '123456'
    })
    const nameRules = ref<AntRuleItem | AntRuleItem[]>([
      {
        required: true,
        message: '请输入姓名',
        trigger: 'blur'
      },
      {
        max: 5,
        message: '最大输入5个字符',
        trigger: 'blur'
      }
    ])
    const pwdRules = ref<AntRuleItem | AntRuleItem[]>([
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      },
      {
        min: 10,
        message: '最少输入10个字符',
      }
    ])
    return {
      formValues,
      nameRules,
      pwdRules
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
