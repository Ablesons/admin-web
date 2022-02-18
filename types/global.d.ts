/**
 * @Description: 公共声明文件
 * @Author: Ableson
 * @Date: 2022/2/18 11:04
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/18 11:04
 */
import { ComponentRenderProxy, VNode } from 'vue';

declare global {
  declare type Recordable<T = any> = Record<string, T>;

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
