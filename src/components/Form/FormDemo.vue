<template>
  <div>
    <a-form :model="formValues" :rules="formRules" ref="AForm" @validate="handleValidate">
      <a-form-item label="姓名" prop="name" :rules="nameRules">
        <a-input v-model="formValues.name" placeholder="请输入姓名"/>
      </a-form-item>
      <a-form-item label="密码" prop="password" :rules="pwdRules">
        <a-input v-model="formValues.password" placeholder="请输入密码" type="password" />
      </a-form-item>
      <a-form-item>
        <button type="submit" @click="submit">
          提交
        </button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import AFormItem from "@/components/Form/FormItem";
import AInput from "@/components/Input/Input";
import {AntFormRules, AntRuleItem, FormContext} from "@/components/Form/types";
import {ValidateError} from "async-validator/dist-types/interface";

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
    // 通过AForm组件实例上暴露的方法调用提交校验
    const submit = () => {
      const aform = AForm.value!.validate((vaild) => {
        console.log('vaild', vaild);
      }).then(res => {
        console.log('AForm.value!.validate-res', res);
      }).catch(err => {
        console.log('AForm.value!.validate-err', err);
      })
      // return false
    }
    // 通过submit事件处理，派发validate事件
    const handleValidate = (res: boolean | ValidateError[]) => {
      console.log('handleValidate', res)
      if(typeof res === 'boolean' && res) {
        alert('校验通过')
      }else if(Array.isArray(res)) {
        if(res.length) {
          alert(res[0].message)
        }
      }
    }
    return {
      formValues,
      nameRules,
      pwdRules,
      submit,
      AForm,
      formRules,
      handleValidate
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
