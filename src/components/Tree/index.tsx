import {defineComponent, PropType, ref, watch} from "vue";
import { cloneDeep } from 'lodash'
import './index.scss'
import {nodeKey, renderFncType, RequiredTreeNodeOptions, TreeNodeOptions} from "@/components/Tree/types";
import ATreeNode from './node'
import {updateDownwards, updateUpwards} from './utils'

// 扁平化数组
function flattenTree(source: TreeNodeOptions[]): RequiredTreeNodeOptions[] {
	const result: RequiredTreeNodeOptions[] = []
	const recursion = (list: TreeNodeOptions[], level = 0, parent: TreeNodeOptions | null = null )  => {
		list.forEach(item => {
			const node: RequiredTreeNodeOptions = {
				...item,
				level,
				loading: item.loading || false,
				disabled: item.disabled || false,
				expanded: item.expanded || false,
				selected: item.selected || false,
				checked: item.checked || false,
				hasChildren: item.hasChildren || false, // 是否有children
				children: item.children || [],
				parentKey: parent?.nodeKey || null
			}
			result.push(node)
			if(item.expanded && node.children.length) {
				recursion(node.children, level + 1, node)
			}
		})

	}
	recursion(source)
	return result
}
export default defineComponent({
	name: "ATree",
	props: {
		source: {
			type: Array as PropType<TreeNodeOptions[]>,
			default: () => []
		},
		// 控制是否显示可选框
		showChecked: {
			type: Boolean,
			default: false
		},
		// 控制可选框父子联动
		checkStrictly: {
			type: Boolean,
			default: false
		},
		lazyLoad: Function as PropType<(node: RequiredTreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => void>,
		render: Function as PropType<renderFncType>
	},
	emits: ['handleSelected', 'handleChange'],
	setup(props, {emit, slots}) {
		const loading = ref(false)
		const flattenList = ref<RequiredTreeNodeOptions[]>([])
		const preSelectedKey = ref<nodeKey>('')

		watch(() => props.source, newVal => {
			// 展示树列表
			flattenList.value = flattenTree(newVal)
			// immediate初始化的时候开始监听
		}, { immediate: true})

		// 节点展开处理函数
		const expandNode = (node: RequiredTreeNodeOptions, children?: TreeNodeOptions[]) => {
			const trueChildren = children ? children : cloneDeep(node.children)
			node.children = trueChildren.map(item => {
				return {
					...item,
					level: item.level || node.level + 1,
					loading: false,
					disabled: item.disabled || false,
					expanded: item.expanded || false,
					selected: item.selected || false,
					hasChildren: item.hasChildren || false, // 是否有children
					// false也是合法值，不能用||，用？？
					checked: item.checked ?? node.checked,
					children: item.children || [],
					parentKey: node.nodeKey || null
				}
			})
			const targetIndex = flattenList.value.findIndex(item => item.nodeKey === node.nodeKey);
			if(targetIndex > -1) {
				flattenList.value.splice(targetIndex + 1 , 0, ...(node.children as RequiredTreeNodeOptions[]))
			}
		}

		// 收起节点处理函数
		const collapseNode = (node: RequiredTreeNodeOptions) => {
			const delKeys: any[] = [] // 要删除的key
			const recursion = (curNode: RequiredTreeNodeOptions) => {
				if(curNode.children.length) {
					curNode.children.forEach(item => {
						delKeys.push(item.nodeKey)
						if(item.expanded && item.children?.length) {
							recursion(item as RequiredTreeNodeOptions)
						}
					})
				}
			}
			recursion(node)
			delKeys.forEach(key => {
				const delIndex = flattenList.value.findIndex(item => item.nodeKey === key)
				if(delIndex > -1) {
					flattenList.value.splice(delIndex, 1)
				}
			})
		}

		// 点击展开按钮触发事件
		const expandChildNode = (node: RequiredTreeNodeOptions) => {
			node.expanded = !node.expanded
			if(node.expanded) { // 展开
				/*
				* 首次展开，children可能是用户自带的
				* */
				if(node.children.length) {
					expandNode(node)
				}else {
					// 懒加载
					node.loading = true // 显示图标
					loading.value = true // 防止重复点击
					if(props.lazyLoad && node.hasChildren) {
						props.lazyLoad(node, (children => {
							if(children.length) {
								expandNode(node, children)
							}
							node.loading = false
							loading.value = false
						}))
					}
				}
			}else { // 收起
				collapseNode(node)
			}
		}

		// 选中节点触发事件
		const handleSelected = (node: RequiredTreeNodeOptions) => {
			const selectedKey = node.nodeKey
			node.selected = !node.selected
			// 之前点击节点去掉样式
			if(preSelectedKey.value !== selectedKey) {
				const preSelectedIndex = flattenList.value.findIndex(item => item.nodeKey === preSelectedKey.value)
				if(preSelectedIndex > -1) {
					flattenList.value[preSelectedIndex].selected = false
				}
			}
			preSelectedKey.value = selectedKey

			emit('handleSelected', node)
		}

		// 选中勾选框触发事件
		const handleChange = ([checked, node]: [boolean, RequiredTreeNodeOptions]) => {
			node.checked = checked
			emit('handleChange', node)
			// 父子联动
			if(!props.checkStrictly) {
				// 向下联动
				updateDownwards(node, checked)
				// 向上联动
				updateUpwards(node, flattenList.value)
			}
		}

		return () => {
			return (
					<div class="ant-tree-wrap">
						{
							flattenList.value.map((node) => {
								return (
										<ATreeNode
												node={node}
												iconSlots={slots.icon}
												render={props.render}
												key={node.nodeKey}
												checkStrictly={props.checkStrictly}
												showChecked={props.showChecked}
												onExpandChildNode={expandChildNode}
												onHandleSelected={handleSelected}
												onHandleChange={handleChange}
										/>
								)
							})
						}
					</div>
			)
		}
	}
})
