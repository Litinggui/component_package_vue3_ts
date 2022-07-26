import {defineComponent, PropType, ref, watch} from "vue";
import { cloneDeep } from 'lodash'
import './index.scss'
import {RequiredTreeNodeOptions, TreeNodeOptions} from "@/components/Tree/types";
import ATreeNode from './node'

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
		lazyLoad: Function as PropType<(node: RequiredTreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => void>
	},
	setup(props) {
		const loading = ref(false)
		const flattenList = ref<RequiredTreeNodeOptions[]>([])

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
					if(props.lazyLoad) {
						props.lazyLoad(node, (children => {
							if(children.length) {
								expandNode(node, children)
							}
							node.loading = false
							loading.value = false
							console.log('children', children);
						}))
					}
				}
			}else { // 收起
				collapseNode(node)
			}
		}

		return () => {
			return (
					<div class="ant-tree-wrap">
						{
							flattenList.value.map((node) => {
								return (
										<ATreeNode
												key={node.nodeKey}
												node={node}
												onExpandChildNode={expandChildNode}
										/>
								)
							})
						}
					</div>
			)
		}
	}
})
