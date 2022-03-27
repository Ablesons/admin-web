/**
 * 数据字典
 */
export interface DataDicModel {
  id: string;

  /**
   * 类别编码
   */
  typeCode: string;

  /**
   * 类别名称
   */
  typeName: string;

  /**
   * 字典值
   */
  dataValue: string;

  /**
   * 字典值名称
   */
  dataName: string;

  /**
   * 字典英文名称
   */
  dataNameEn: string;

  /**
   * 助记码
   */
  smartCode: string;

  /**
   * 扩展1
   */
  tag1: string;

  /**
   * 扩展2
   */
  tag2: string;

  /**
   * 扩展3
   */
  tag3: string;

  /**
   * 描述
   */
  remark: string;
}

/**
 * 系统配置
 */
export interface SysConfigModel {
  id: string;

  /**
   * 配置项
   */
  name: string;

  /**
   * 配置规则
   */
  sysrule: string;

  /**
   * 配置描述
   */
  description: string;
}
