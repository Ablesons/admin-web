/**
 * @Description: 公共声明文件
 * @Author: Ableson
 * @Date: 2022/2/18 11:04
 * @LastEditors: Ableson
 * @LastEditTime: 2022/2/18 11:04
 */
import { VNode } from "vue";

declare global {
  declare type Recordable<T = any> = Record<string, T>;

  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
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
