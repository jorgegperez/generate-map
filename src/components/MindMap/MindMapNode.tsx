import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface NodeData extends Record<string, unknown> {
  label: string;
  isRoot?: boolean;
}

export function MindMapNode({ data, id, selected }: NodeProps<Node<NodeData>>) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className={`relative px-4 py-2 shadow-lg rounded-lg border 
        ${selected ? "border-primary" : "border-border"} 
        bg-secondary-dark text-text-primary`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <Handle type="target" position={Position.Top} />

      <div className="font-medium">{data.label}</div>

      {selected && showMenu && (
        <div className="absolute top-0 right-0 translate-x-full pl-2">
          <div className="bg-secondary-dark shadow-lg rounded-lg border border-border p-2 flex gap-1">
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
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
