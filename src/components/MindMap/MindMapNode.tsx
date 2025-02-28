import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import { useState } from "react";
import { Plus, Trash2, Palette } from "lucide-react";

const NODE_COLORS = {
  default: "border-border",
  blue: "border-primary",
  red: "border-accent-hover",
  green: "border-chart-1",
  purple: "border-chart-2",
  orange: "border-chart-3",
} as const;

const NODE_BGS = {
  default: "bg-secondary-dark",
  blue: "bg-primary/20",
  red: "bg-accent-hover/20",
  green: "bg-chart-1/20",
  purple: "bg-chart-2/20",
  orange: "bg-chart-3/20",
} as const;

interface NodeData extends Record<string, unknown> {
  label: string;
  isRoot?: boolean;
  borderColor?: keyof typeof NODE_COLORS;
  bgColor?: keyof typeof NODE_BGS;
}

export function MindMapNode({ data, id, selected }: NodeProps<Node<NodeData>>) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const currentBorder = NODE_COLORS[data.borderColor || "default"];
  const currentBg = NODE_BGS[data.bgColor || "default"];

  return (
    <div
      className={`relative px-4 py-2 shadow-lg rounded-lg border 
        ${currentBorder} 
        ${currentBg} text-text-primary
        ${selected ? "border-4" : "border-2"}`}
      onClick={() => setShowColorPicker(false)}
    >
      {" "}
      <Handle type="target" position={Position.Top} />
      <div className="font-medium">{data.label}</div>
      {selected && (
        <div className="absolute top-0 right-0 translate-x-full pl-2">
          <div
            className="bg-secondary-dark shadow-lg rounded-lg border border-border p-2 flex gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="p-1.5 hover:bg-secondary-light rounded text-text-primary"
              onClick={(e) => {
                e.stopPropagation();
                const event = new CustomEvent("addChild", {
                  detail: { parentId: id },
                });
                window.dispatchEvent(event);
              }}
            >
              <Plus size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-secondary-light rounded text-text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
            >
              <Palette size={16} />
            </button>
            <button
              className="p-1.5 hover:bg-secondary-light rounded text-accent-hover"
              onClick={(e) => {
                e.stopPropagation();
                const event = new CustomEvent("deleteNode", {
                  detail: { nodeId: id },
                });
                window.dispatchEvent(event);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
          {showColorPicker && (
            <div
              className="absolute left-0 top-full mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-secondary-dark shadow-lg rounded-lg border border-border p-2 space-y-2">
                <div>
                  <div className="text-xs text-text-secondary mb-1">Border</div>
                  <div className="grid grid-cols-3 gap-1">
                    {Object.entries(NODE_COLORS).map(
                      ([colorName, borderColor]) => (
                        <button
                          key={colorName}
                          className={`w-6 h-6 rounded border-2 ${borderColor} bg-secondary-dark`}
                          onClick={(e) => {
                            e.stopPropagation();
                            const event = new CustomEvent("updateNodeColor", {
                              detail: {
                                nodeId: id,
                                borderColor:
                                  colorName as keyof typeof NODE_COLORS,
                              },
                            });
                            window.dispatchEvent(event);
                            setShowColorPicker(false);
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-text-secondary mb-1">
                    Background
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {Object.entries(NODE_BGS).map(([colorName, bgColor]) => (
                      <button
                        key={colorName}
                        className={`w-6 h-6 rounded border border-border ${bgColor}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          const event = new CustomEvent("updateNodeColor", {
                            detail: {
                              nodeId: id,
                              bgColor: colorName as keyof typeof NODE_BGS,
                            },
                          });
                          window.dispatchEvent(event);
                          setShowColorPicker(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
