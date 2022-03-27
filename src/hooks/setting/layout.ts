/*
 * @Description: 布局配置
 * @Author: DHL
 * @Date: 2021-12-16 15:16:22
 * @LastEditors: DHL
 * @LastEditTime: 2021-12-16 19:18:17
 */

interface ILayoutSetting {
  showSettings: boolean; // 控制设置面板显示
  showTagsView: boolean; // 控制tagsview显示
  showSidebarLogo: boolean; // 控制侧边栏的标志显示
  fixedHeader: boolean; // 如果为真，将固定头组件
  sidebarTextTheme: boolean; // 如果为真，将根据主题改变侧边栏的活动文本颜色
}

// 您可以自定义以下设置
const layoutSetting = (): ILayoutSetting => {
  const layoutSetting: ILayoutSetting = {
    showSettings: true,
    showTagsView: true,
    fixedHeader: false,
    showSidebarLogo: true,
    sidebarTextTheme: true,
  };

  return layoutSetting;
};

export default layoutSetting;
