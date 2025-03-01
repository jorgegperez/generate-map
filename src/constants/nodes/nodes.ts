export interface NodeData extends Record<string, unknown> {
  label: string;
  isRoot?: boolean;
  borderColor?: keyof typeof NODE_COLORS;
  bgColor?: keyof typeof NODE_BGS;
}

export const NODE_COLORS = {
  default: "border-border",
  blue: "border-primary",
  red: "border-accent-hover",
  green: "border-chart-1",
  purple: "border-chart-2",
  orange: "border-chart-3",
} as const;

export const NODE_BGS = {
  default: "bg-secondary-dark",
  blue: "bg-primary/20",
  red: "bg-accent-hover/20",
  green: "bg-chart-1/20",
  purple: "bg-chart-2/20",
  orange: "bg-chart-3/20",
} as const;
