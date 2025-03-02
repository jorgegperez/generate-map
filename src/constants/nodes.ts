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

export const BORDER_COLORS = [
  "#FF3B3B", // Vibrant red
  "#FF8800", // Orange
  "#FFCC00", // Golden yellow
  "#00CC44", // Green
  "#0088FF", // Blue
  "#9933FF", // Purple
  "#FF2D6C", // Hot pink
  "#00CCCC", // Teal
  "#FF4400", // Coral red,
  "#000000", // Black
];

export const BG_COLORS = [
  "#FF3B3B60", // Vibrant red
  "#FF880060", // Orange
  "#FFCC0060", // Golden yellow
  "#00CC4460", // Green
  "#0088FF60", // Blue
  "#9933FF60", // Purple
  "#FF2D6C60", // Hot pink
  "#00CCCC60", // Teal
  "#FF440060", // Coral red,
  "#00000060", // Black
];
