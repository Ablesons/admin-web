import { VxeGridInstance, VxeGridListeners, VxeGridProps } from 'vxe-table';

// 表格实例
type ITwTableInstance = VxeGridInstance;

/**
 * 表格实例
 */
export type TwTableInstance = ITwTableInstance;

// 表格配置
interface ITwTableOptions extends VxeGridProps {
  /**
   * 唯一标识
   */
  id: string;

  /**
   * 是否自动加载查询数据
   * 默认自动加载
   */
  autoLoad?: boolean;
}

/**
 * 表格配置
 */
export type TwTableOptions = ITwTableOptions;

// 表格事件
type ITwTableEvents = VxeGridListeners;

/**
 * 表格事件
 */
export type TwTableEvents = ITwTableEvents;
