import {ADD_TAB, BATCH_REMOVE, UPDATE_ACTIVITY_KEY, REMOVE_TAB} from "@/store/const/tabsConst";

export const addTab = (tab: any) => ({type: ADD_TAB, payload: tab});

export const batchRemove = (startIndex: number, deleteCount: number) => ({
  type: BATCH_REMOVE,
  payload: {startIndex, deleteCount}
});
export const updateActivityKey = (key: string) => ({type: UPDATE_ACTIVITY_KEY, payload: {key}});

export const removeTab = (tabIndex: number) => ({type: REMOVE_TAB, payload: {index: tabIndex}});
