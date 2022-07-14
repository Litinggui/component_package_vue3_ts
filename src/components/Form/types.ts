import {RuleItem} from "async-validator";

const FormItemKey = 'formItemKey'

interface  FormItemContext {
    handlerValueChange(value: string): void;
    handlerControBlur(value: string): void;
}

interface AntRuleItem extends RuleItem {
    trigger?: 'change' | 'blur';
}

type trigger = 'change' | 'blur'
export {FormItemKey, FormItemContext, AntRuleItem, trigger}
