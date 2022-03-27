/**
 * 类型转换
 */
export class Convert {
  /**
   * json转model
   * @param json
   * @returns
   */
  public static jsonToModel<T>(json: string): T {
    return JSON.parse(json) as T;
  }

  /**
   * model转json
   * @param model
   * @returns
   */
  public static modelToJson(model: any): string {
    return JSON.stringify(model);
  }
}
