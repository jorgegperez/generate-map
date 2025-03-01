import { NodeData } from "@/constants/nodes";
import { NODE_FONT_SIZES, NODE_FONT_COLORS } from "@/constants/nodes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FontControlsProps = {
  id: string;
  onUpdateNode: (id: string, data: Partial<NodeData>) => void;
  setShowFontControls: (show: boolean) => void;
  data: NodeData;
};

const FONT_SIZE_LABELS = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "30px",
} as const;

export const FontControls = ({
  id,
  onUpdateNode,
  setShowFontControls,
  data,
}: FontControlsProps) => {
  return (
    <div
      className="absolute top-12 right-0 bg-secondary-dark shadow-lg rounded-lg border border-border p-2 min-w-[200px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-secondary">Font Size</span>
          <Select
            defaultValue={data.fontSize || "base"}
            onValueChange={(value: keyof typeof NODE_FONT_SIZES) => {
              onUpdateNode(id, { fontSize: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(NODE_FONT_SIZES).map(([size]) => (
                <SelectItem key={size} value={size}>
                  {FONT_SIZE_LABELS[size as keyof typeof FONT_SIZE_LABELS]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-secondary">Font Color</span>
          <div className="flex flex-wrap gap-1">
            {Object.entries(NODE_FONT_COLORS).map(([color]) => (
              <button
                key={color}
                className={`w-6 h-6 rounded bg${
                  NODE_FONT_COLORS[color as keyof typeof NODE_FONT_COLORS]
                } hover:opacity-80`}
                onClick={() => {
                  onUpdateNode(id, {
                    fontColor: color as keyof typeof NODE_FONT_COLORS,
                  });
                  setShowFontControls(false);
                }}
              >
                A
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
