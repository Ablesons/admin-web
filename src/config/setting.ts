interface ISetting {
  Version: string;
  Title: string;
  FixedHeader: boolean;
  HiddenSideBar: boolean;
  MultiTagsCache: boolean;
  KeepAlive: boolean;
  Locale: string;
  Layout: string;
  Theme: string;
  DarkMode: boolean;
  Grey: boolean;
  Weak: boolean;
  HideTabs: boolean;
  SidebarStatus: boolean;
  EpThemeColor: string;
  ShowLogo: boolean;
  ShowModel: string;
}

const setting = (): ISetting => {
  return {
    Version: '3.2.0',
    Title: 'Vue3.x - Admin',
    FixedHeader: true,
    HiddenSideBar: false,
    MultiTagsCache: false,
    KeepAlive: true,
    Locale: 'zh',
    Layout: 'vertical',
    Theme: 'default',
    DarkMode: false,
    Grey: false,
    Weak: false,
    HideTabs: false,
    SidebarStatus: true,
    EpThemeColor: '#409EFF',
    ShowLogo: true,
    ShowModel: 'smart',
  };
};

export default setting;
