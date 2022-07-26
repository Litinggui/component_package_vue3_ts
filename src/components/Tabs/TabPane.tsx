import {defineComponent, inject, onMounted, ref} from "vue";
import {TabContext, TabsKey} from "@/components/Tabs/types";

export default defineComponent({
  name: "ATabPane",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props, {slots}) {
    const show = ref(false)
    const parent = inject<TabContext>(TabsKey);
    const changeShow = (visbile: boolean) => {
      show.value = visbile
    }
    onMounted(() => {
      parent?.addPane({
        name:props.name,
        changeShow,
        slotsTitle: slots.title
      })
      console.log('slots', slots);
    })
    return () => {
      return (
          <div class="pane" v-show={ show.value }>
           { slots.default!() }
          </div>
      )
    }
  }
})
