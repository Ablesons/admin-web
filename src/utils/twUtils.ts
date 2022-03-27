/**
 * 判断是外链
 * @param path
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

//////////////////////////////////////////////////
// 数组
//////////////////////////////////////////////////

/**
 * 序列化数组中指定属性
 * @param arr 数组
 * @param key 对象属性名
 * @returns
 */
export function serializeArray<T>(arr: Array<any>, key: string): Array<T> {
  const rtn: any[] = [];
  for (const item of arr) {
    const val = item[key];
    if (val && !rtn.includes(rtn)) {
      rtn.push(val);
    }
  }
  return rtn;
}

/**
 * 序列化数组中指定属性为字符串
 * @param arr 数组
 * @param key 对象属性名
 * @returns
 */
export function serializeArrayToStr(arr: Array<any>, key: string): string {
  return serializeArray(arr, key).join(',');
}

/**
 * 根据对象属性值，过滤数组
 * @param arr 数组
 * @param propertyName  属性名称
 * @param propertyValue 属性值
 * @param isLike 模糊匹配
 * @returns
 */
export function filterArray<T>(
  arr: Array<any>,
  propertyName: string,
  propertyValue: any,
  isLike = false
): Array<T> {
  const rtn: any[] = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (isLike) {
      if (arr[i][propertyName].indexOf(propertyValue) > -1) {
        rtn.push(arr[i]);
      }
    } else {
      if (arr[i][propertyName] == propertyValue) {
        rtn.push(arr[i]);
      }
    }
  }
  return rtn;
}

/**
 * 根据对象属性值，删除数组
 * @param arr 数组
 * @param propertyName 属性名称
 * @param propertyValue 属性值
 */
export function arrayRemoveByPropertyValue(arr: any[], propertyName: string, propertyValue: any) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][propertyName] == propertyValue) {
      arr.splice(i, 1);
    }
  }
}
