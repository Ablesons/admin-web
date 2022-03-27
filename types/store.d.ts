export type IAppState = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Hamburger
    isClickHamburger: boolean;
  };
  layout: string;
  language: string;
  device: string;
};

export type ISettingsState = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};
