import { NodeData } from "@/constants/nodes";
import { NODE_FONT_SIZES, NODE_FONT_COLORS } from "@/constants/nodes";

type FontControlsProps = {
  id: string;
  onUpdateNode: (id: string, data: Partial<NodeData>) => void;
  setShowFontControls: (show: boolean) => void;
};

export const FontControls = ({
  id,
  onUpdateNode,
  setShowFontControls,
}: FontControlsProps) => {
  return (
    <div
      className="absolute top-12 right-0 bg-secondary-dark shadow-lg rounded-lg border border-border p-2 min-w-[150px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-secondary">Font Size</span>
          <div className="flex gap-1">
            {Object.entries(NODE_FONT_SIZES).map(([size]) => (
              <button
                key={size}
                className="p-1.5 hover:bg-secondary-light rounded text-text-primary"
                onClick={() => {
                  onUpdateNode(id, {
                    fontSize: size as keyof typeof NODE_FONT_SIZES,
                  });
                  setShowFontControls(false);
                }}
              >
                <span
                  className={
                    NODE_FONT_SIZES[size as keyof typeof NODE_FONT_SIZES]
                  }
                >
                  A
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-text-secondary">Font Color</span>
          <div className="flex flex-wrap gap-1">
            {Object.entries(NODE_FONT_COLORS).map(([color]) => (
              <button
                key={color}
                className={`w-6 h-6 rounded ${
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
