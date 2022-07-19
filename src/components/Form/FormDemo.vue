<template>
  <div>
    <a-form :model="formValues" :rules="formRules" ref="AForm">
      <a-form-item label="姓名" prop="name" :rules="nameRules">
        <a-input v-model="formValues.name" placeholder="请输入姓名"/>
      </a-form-item>
      <a-form-item label="密码" prop="password" :rules="pwdRules">
        <a-input v-model="formValues.password" placeholder="请输入密码" type="password" />
      </a-form-item>
      <a-form-item>
        <button @click="submit">
          提交
        </button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import AFormItem from "@/components/Form/FormItem";
import AInput from "@/components/Input";
import {AntFormRules, AntRuleItem, FormContext} from "@/components/Form/types";

export default defineComponent({
  name: "FormDemo",
  components: {AInput, AFormItem},
  setup(props, {emit}) {
    const AForm = ref<FormContext | null>(null)
    const formValues = reactive({
      name: '',
      password: ''
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
    const formRules = ref<AntFormRules>({
      'name': [
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
      ],
      'password': [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 10,
          message: '最少输入10个字符',
        }
      ]
    }

    )
    const submit = () => {
      const aform = AForm.value!.validate((vaild) => {
        console.log('vaild', vaild);
      }).then(res => {
        console.log('AForm.value!.validate-res', res);
      }).catch(err => {
        console.log('AForm.value!.validate-err', err);
      })

      console.log('aform',aform)
    }
    return {
      formValues,
      nameRules,
      pwdRules,
      submit,
      AForm,
      formRules
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
