export enum ELayoutDirection {
  Vertical = "Vertical",
  Horizontal = "Horizontal",
}

export interface ISection {
  title: string;
  content: string;
  children: ISection[];
  level: number;
}
