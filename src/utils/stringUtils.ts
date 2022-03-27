class StringUtils {
  /**
   * 去除空格
   * @param str
   * @param type    1-所有空格；2-前后空格；3-前空格；4-后空格
   */
  public trim(str: Nullable<string>, type: number) {
    type = type || 1;

    let rtnStr = '';

    str = str + '';

    if (type === 1) {
      rtnStr = str.replace(/\s+/g, '');
    } else if (type === 2) {
      rtnStr = str.replace(/(^\s*)|(\s*$)/g, '');
    } else if (type === 3) {
      rtnStr = str.replace(/(^\s*)/g, '');
    } else if (type === 4) {
      rtnStr = str.replace(/(\s*$)/g, '');
    } else {
      rtnStr = str;
    }

    return rtnStr;
  }

  /**
   * 判断是否为空
   * @param str
   */
  public isEmpty(str: Nullable<string>) {
    return typeof str == 'undefined' || str == null || str == '' || str == undefined;
  }

  /**
   * 判断是否不为空
   * @param str
   */
  public isNotEmpty(str: Nullable<string>) {
    return !this.isEmpty(str);
  }

  /**
   * 转换大小写
   * @param str
   * @param type    1-首字母大写；2-首字母小写；3-大小写转换；4-全部大写；5-全部小写
   */
  public changeCase(str: string, type: number) {
    type = type || 4;

    let rtnStr = '';

    if (type === 1) {
      rtnStr = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
      });
    } else if (type === 2) {
      rtnStr = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
      });
    } else if (type === 3) {
      rtnStr = str
        .split('')
        .map(function (word) {
          if (/[a-z]/.test(word)) {
            return word.toUpperCase();
          }
          return word.toLowerCase();
        })
        .join('');
    } else if (type === 4) {
      rtnStr = str.toUpperCase();
    } else if (type === 5) {
      rtnStr = str.toLowerCase();
    } else {
      rtnStr = str;
    }

    return rtnStr;
  }

  /**
   * 把字符串中的带"_"转成空字符串,"_"后面首字母大写
   * @param str
   */
  public toHump(str: string) {
    // eslint-disable-next-line no-useless-escape
    return str.replace(/\_(\w)/g, function (all, letter) {
      console.log(all);
      return letter.toUpperCase();
    });
  }

  /**
   * 驼峰转换下划线
   * @param str
   */
  public toLine(str: Nullable<string>) {
    if (str) {
      return str.replace(/([A-Z])/g, '_$1').toLowerCase();
    }
    return '';
  }
}

export const stringUtils = new StringUtils();
