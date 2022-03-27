export interface setType {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    isClickHamburger: boolean;
  };
  device: string;
  fixedHeader: boolean;
  classes: {
    hideSidebar: boolean;
    openSidebar: boolean;
    withoutAnimation: boolean;
    mobile: boolean;
  };
  hideTabs: boolean;
}
