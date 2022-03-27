const docEle = document.documentElement;

/**
 * 设置css变量值
 * @param prop  变量名称
 * @param val   变量值
 * @param dom
 */
export function setCssVar(prop: string, val: any, dom = docEle) {
  dom.style.setProperty(prop, val);
}

/**
 * 获取css变量值
 * @param prop  变量名称
 * @param dom
 */
export function getCssVar(prop: string, dom = docEle) {
  return getComputedStyle(dom).getPropertyValue(prop);
}
