import {RuleItem} from "async-validator";
import {ValidateError} from "async-validator/dist-types/interface";

// formItem
const FormItemKey = 'formItemKey'

interface  FormItemContext {
    id: string;
    prop: string;
    validate: (value: string) => Promise<boolean | ValidateError[]>;
    handlerValueChange(value: string): void;
    handlerControBlur(value: string): void;
}

interface AntRuleItem extends RuleItem {
    trigger?: 'change' | 'blur';
}

type trigger = 'change' | 'blur'

// form
const FormKey = 'formKey'

interface AntFormRules {
    [key: string]: AntRuleItem | AntRuleItem[]
}
// ValidateError[] 校验错误列表数组
type validateFun = (callback: (valid: boolean) => void) => Promise<boolean | ValidateError[]>

interface FormContext {
    model: Record<string, any>;
    rules: AntFormRules;
    validate: validateFun;
    addItem(item: Partial<FormItemContext>): void;
    removeItem(id: string): void;
}

export {
    FormItemKey,
    FormItemContext,
    AntRuleItem,
    trigger,
    FormKey,
    AntFormRules,
    FormContext,
    validateFun
}
