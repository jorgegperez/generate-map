export interface NodeData extends Record<string, unknown> {
  label: string;
  isRoot?: boolean;
  borderColor?: string;
  bgColor?: string;
  fontSize?: keyof typeof NODE_FONT_SIZES;
  fontColor?: keyof typeof NODE_FONT_COLORS;
}

export const NODE_FONT_SIZES = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
} as const;

export const NODE_FONT_COLORS = {
  default: "text-text-primary",
  red: "text-red-500",
  blue: "text-blue-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  purple: "text-purple-500",
} as const;
