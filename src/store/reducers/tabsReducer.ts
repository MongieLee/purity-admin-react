import {__cache_tabs_key__} from "@/utils/token.js";
import {REMOVE_TAB} from "@/store/const/tabsConst";

const defaultActiveKey = '/dashboard';

const cache_tabs_key = 'cache_tabs';
const defaultActivityKey = 'defaultActiveKey'

/**
 * 缓存tabs信息
 * @param tabs
 */
const cacheTabs = (tabs: []) => {
  localStorage.setItem(cache_tabs_key, JSON.stringify(tabs));
};


type CacheTab = {
  label: string,
  key: string,
  loading: boolean,
  closable: boolean
}
const defaultTabs: CacheTab[] = [
  {
    label: "首页",
    key: defaultActivityKey,
    loading: false,
    closable: false
  }
];

/**
 * 加载默认tabs
 * @returns {[{closable: boolean, label: string, loading: boolean, key: string},{closable: boolean, label: string, loading: boolean, key: string}]|any}
 */
const getCacheTabs = (): CacheTab[] => {
  const tabs = window.localStorage.getItem(__cache_tabs_key__);
  try {
    if (tabs) {
      return JSON.parse(tabs);
    }
    return defaultTabs
  } catch {
    window.localStorage.removeItem(__cache_tabs_key__);
    return defaultTabs
  }
};

const initializationValue: { tabs: any[], activityKey: string } = {
  tabs: getCacheTabs(),
  activityKey: defaultActivityKey
}

export default (state = initializationValue, action: any) => {
  switch (action.type) {
    case REMOVE_TAB:
      const {tabKey} = action.payload;
      const index = state.tabs.findIndex((i) => i.key === tabKey)
      if (index != -1) {
        state.tabs.splice(index, 1)
        return [...state.tabs]
      }
      return state;
    default:
      return state;
  }
}
