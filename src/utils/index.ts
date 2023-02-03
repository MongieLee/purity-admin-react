/**
 * 获取当前时间文本
 * @returns {string}
 */
import {ReactNode} from "react";
import reduStore from "@/store";

function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}

function downloadFile(url: string, fileName: string) {
  const a = document.createElement('a');
  a.href = url;
  fileName && (a.download = '新闻列表.xlsx');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const childKey = 'children';

/**
 * 清除数据中无用的children字段，一般用于tree组件
 * @param data
 * @returns {*[]}
 */
function clearChildren<T>(data: any[] = []) {
  return data.map(i => {
    if (!i.children?.length) {
      Reflect.deleteProperty(i, childKey);
    } else {
      clearChildren(i.children)
    }
    return i;
  })
}

/**
 * 浅拷贝
 * @param object
 * @returns {object}
 */
function shallowCopy(object: object) {
  try {
    return JSON.parse(JSON.stringify(object));
  } catch (e) {
    console.error('拷贝失败，JSON解析异常');
    console.error(e);
  }
}

/**
 * 检查按钮颗粒度权限，如果满足全责则显示element
 * @param key
 * @param children
 */
function checkPermission(key: string, nodes: ReactNode) {
  const {permissions} = reduStore.getState().permission;
  return permissions.includes(key) ? nodes : null;
}

export {timeFix, downloadFile, clearChildren, shallowCopy, checkPermission};
