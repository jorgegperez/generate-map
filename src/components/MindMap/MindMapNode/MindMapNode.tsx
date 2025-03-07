import { Handle, NodeProps, Position, Node } from "@xyflow/react";
import {
  useState,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
  useRef,
  useLayoutEffect,
} from "react";
import { NodeData, NODE_FONT_SIZES, NODE_FONT_COLORS } from "@/constants/nodes";
import { NodeActions } from "./NodeActions";
import { ELayoutDirection } from "@/constants/mindmap";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MindMapNodeProps extends NodeProps<Node<NodeData>> {
  onAddChild: (parentId: string) => void;
  onDeleteNode: (nodeId: string) => void;
  onUpdateNode: (nodeId: string, data: Partial<NodeData>) => void;
  layout: ELayoutDirection;
}

export function MindMapNode({
  data,
  id,
  selected,
  onAddChild,
  onDeleteNode,
  onUpdateNode,
  layout,
}: MindMapNodeProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontControls, setShowFontControls] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data.label]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
      textareaRef.current?.blur();
    }
  }, []);

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = evt.target.value;
      onUpdateNode(id, { label: newValue });
    },
    [id, onUpdateNode]
  );

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }, 0);
  }, []);

  return (
    <div
      className={`relative px-4 py-2 shadow-lg rounded-lg border 
        ${NODE_FONT_COLORS[data.fontColor || "default"]}
        ${NODE_FONT_SIZES[data.fontSize || "base"]}
        ${selected ? "border-4" : "border-2"}`}
      style={{
        color: data.fontColor || "black",
        backgroundColor: data.bgColor || "default",
        borderColor: data.borderColor || "default",
      }}
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={
          layout === ELayoutDirection.Vertical ? Position.Top : Position.Left
        }
      />
      <textarea
        ref={textareaRef}
        value={data.label}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="bg-transparent outline-none w-full font-medium resize-none overflow-hidden min-h-[1.5em] leading-normal"
        rows={1}
        readOnly={!isEditing}
      />
      {selected && (
        <NodeActions
          id={id}
          onAddChild={onAddChild}
          onDeleteNode={onDeleteNode}
          onUpdateNode={onUpdateNode}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
          showFontControls={showFontControls}
          setShowFontControls={setShowFontControls}
          data={data}
        />
      )}
      {isExpanded && data.description && (
        <div className="text-sm text-text-secondary-dark">
          {data.description}
        </div>
      )}
      <div className="absolute bottom-[-12px] left-0 right-0 flex justify-center items-center z-10">
        <Button
          variant="iconRoundOutline"
          size="mini"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>
      <Handle
        type="source"
        position={
          layout === ELayoutDirection.Vertical
            ? Position.Bottom
            : Position.Right
        }
      />
    </div>
  );
}
