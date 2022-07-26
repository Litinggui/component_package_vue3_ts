import {defineComponent, onMounted, provide, reactive, ref, watch} from "vue";
import './index.scss'
import {TabsKey, TabContext, TabPaneContext} from "@/components/Tabs/types";

export default defineComponent({
	name: "ATabs",
	props: {
		modelValue: {
			type: String,
			required: true
		}
	},
	emits: ['update:ModelValue'],
	setup(props, {slots, emit}) {
		const paneList: TabPaneContext[] = reactive([]) // 存放子组件TabPane
		const currentTabName = ref(props.modelValue)
		const addPane = (item: TabPaneContext) => {
			paneList.push(Object.assign({},item))
		}
		const removePane = (name: string) => {
			const index = paneList.findIndex(item => item.name === name)
			if (index > -1) {
				paneList.splice(index, 1)
			}
		}
		provide<TabContext>(TabsKey, {
			addPane,
			removePane
		})
		// 更新对应content内容
		const updatePaneVisible = () => {
			const index = paneList.findIndex(item => item.name === currentTabName.value)
			if(index > -1) {
				// 显示选中，隐藏其他
				paneList[index].changeShow(true)
				paneList.forEach((item, inx) => {
					if(inx !== index) {
						item.changeShow(false)
					}
				})
			}
		}
    onMounted(() => {
			console.log('onMounted');
			if(!currentTabName.value && paneList.length) {
				currentTabName.value = paneList[0].name
			}
			updatePaneVisible()
			setTimeout(() => {
				currentTabName.value = 'TabOne'
			}, 2000)
    })
		// 渲染ant-tab-pane Dom
		const renderNavs = () => {
			console.log('renderNavs');
			return paneList.map(item => {
				const activeFlg = item.name === currentTabName.value ? 'active' : ''
				return (
					<div class={`ant-tab-pane ${activeFlg}`} onClick={() => changePane(item.name) }>
						{item.slotsTitle ? item.slotsTitle(item.name) : item.name}
					</div>
				)
			})
		}
		// 监听modelValue
		watch(() => props.modelValue, (newValue) => {
			currentTabName.value = newValue
			updatePaneVisible()
		})
		const changePane = (name: string) => {
			emit('update:ModelValue', name)
		}
		return () => {
			return (
					<div class="ant-tabs">
						<div class="navs">
							{renderNavs()}
						</div>
						{slots.default!()}
					</div>
			)
		}
	}
})
