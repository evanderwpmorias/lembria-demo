
export interface menuItems {
  url: string;
  displayText: string;
  icon: string;
  type: string;
  sortOrder: number | undefined;
  menuItems: menuItems[];
}
