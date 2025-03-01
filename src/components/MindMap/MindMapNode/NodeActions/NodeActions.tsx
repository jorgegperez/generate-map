import { Palette, Trash2, Plus, Type } from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import { NodeData } from "@/constants/nodes";
import { FontControls } from "./FontControls";

type Props = {
  id: string;
  onAddChild: (id: string) => void;
  onDeleteNode: (id: string) => void;
  onUpdateNode: (id: string, data: Partial<NodeData>) => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
  showFontControls: boolean;
  setShowFontControls: (show: boolean) => void;
};

export const NodeActions = ({
  id,
  onAddChild,
  onDeleteNode,
  onUpdateNode,
  showColorPicker,
  setShowColorPicker,
  showFontControls,
  setShowFontControls,
}: Props) => {
  return (
    <div className="absolute top-0 right-0 translate-x-full pl-2">
      <div
        className="bg-secondary-dark shadow-lg rounded-lg border border-border p-2 flex gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="p-1.5 hover:bg-secondary-light rounded text-text-primary"
          onClick={(e) => {
            e.stopPropagation();
            onAddChild(id);
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
          className="p-1.5 hover:bg-secondary-light rounded text-text-primary"
          onClick={(e) => {
            e.stopPropagation();
            setShowFontControls(!showFontControls);
            setShowColorPicker(false);
          }}
        >
          <Type size={16} />
        </button>
        <button
          className="p-1.5 hover:bg-secondary-light rounded text-accent-hover"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteNode(id);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
      {showColorPicker && (
        <ColorPicker
          id={id}
          onUpdateNode={onUpdateNode}
          setShowColorPicker={setShowColorPicker}
        />
      )}
      {showFontControls && (
        <FontControls
          id={id}
          onUpdateNode={onUpdateNode}
          setShowFontControls={setShowFontControls}
        />
      )}
    </div>
  );
};
