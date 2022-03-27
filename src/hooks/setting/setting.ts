import {
  EnvironmentEnum,
  LanguageEnum,
  RouterModeEnum,
  RouterSourceEnum,
} from '/@/constant/setting';

interface ISetting {
  //项目中页面显示的名称
  title: string;
  // pro版本copyright可随意修改
  copyright?: string;
  // 缓存路由的最大数量
  keepAliveMaxNum?: number;
  // 路由模式，可选值为 history 或 hash
  routerMode?: RouterModeEnum;
  // fontEnd（前端导出路由）和backEnd（后端导出路由）两种方式
  routerSource?: RouterSourceEnum;
  // 不经过token校验的路由
  routesWhiteList?: string[];
  // 加载时显示文字
  loadingText?: string;
  // token失效回退到登录页时是否记录本次的路由
  recordRoute?: true;
  // 是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  logo?: string;
  // 语言类型zh、en
  i18n?: LanguageEnum;
  // 在哪些环境下显示高亮错误
  errorLog?: EnvironmentEnum;
  // 是否开启登录拦截
  loginInterception?: true;
  // 是否开启roles字段进行角色权限控制（如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段）
  rolesControl?: boolean;

  // vertical gallery comprehensive common布局时是否只保持一个子菜单的展开
  uniqueOpened?: boolean;
  // vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
  defaultOpeneds?: string[];
  // 需要加loading层的请求，防止重复提交
  debounce?: string[];
  // 代码生成机生成在view下的文件夹名称
  templateFolder?: string;
  // 画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
  openFirstMenu?: boolean;

  // 多平台模式
  isPlatform: boolean;
  // 多系统模式，登录成功后，是否跳转欢迎页
  isMulSys: boolean;
}

const setting = (): ISetting => {
  const env = import.meta.env;

  const { VITE_GLOB_APP_TITLE } = env;

  return {
    //项目中页面显示的名称
    title: VITE_GLOB_APP_TITLE,
    // pro版本copyright可随意修改
    copyright: 'twb',
    // 缓存路由的最大数量
    keepAliveMaxNum: 99,
    // 路由模式，可选值为 history 或 hash
    routerMode: RouterModeEnum.Hash,
    // fontEnd（前端导出路由）和backEnd（后端导出路由）两种方式
    routerSource: RouterSourceEnum.Backend,
    // 不经过token校验的路由
    routesWhiteList: [],
    // 加载时显示文字
    loadingText: 'loading',
    // token失效回退到登录页时是否记录本次的路由
    recordRoute: true,
    // 是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
    logo: '',
    // 语言类型zh、en
    i18n: LanguageEnum.Zh,
    // 在哪些环境下显示高亮错误
    errorLog: EnvironmentEnum.Development,
    // 是否开启登录拦截
    loginInterception: true,
    // 是否开启roles字段进行角色权限控制（如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段）
    rolesControl: true,

    // vertical gallery comprehensive common布局时是否只保持一个子菜单的展开
    uniqueOpened: false,
    // vertical布局时默认展开的菜单path，使用逗号隔开建议只展开一个
    defaultOpeneds: [],
    // 需要加loading层的请求，防止重复提交
    debounce: [],
    // 代码生成机生成在view下的文件夹名称
    templateFolder: 'project',
    // 画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
    openFirstMenu: true,

    // 多平台模式
    isPlatform: true,
    // 多系统模式，登录成功后，是否跳转欢迎页
    isMulSys: true,
  };
};

export default setting;
