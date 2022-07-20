const TabsKey = 'tabsKey'

interface TabPaneContext {
  name: string;
  changeShow(visbile: boolean): void
}

interface TabContext {
  addPane(item: TabPaneContext): void;
  removePane(name: string): void;
}
export {
  TabsKey,
  TabContext,
  TabPaneContext
}
