import { NODE_BGS, NodeData } from "@/constants/nodes";

import { NODE_COLORS } from "@/constants/nodes";

type Props = {
  id: string;
  onUpdateNode: (nodeId: string, data: Partial<NodeData>) => void;
  setShowColorPicker: (show: boolean) => void;
};

export const ColorPicker = ({
  id,
  onUpdateNode,
  setShowColorPicker,
}: Props) => {
  return (
    <div
      className="absolute left-0 top-full mt-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-secondary-dark shadow-lg rounded-lg border border-border p-2 space-y-2">
        <div>
          <div className="text-xs text-text-secondary mb-1">Border</div>
          <div className="grid grid-cols-3 gap-1">
            {Object.entries(NODE_COLORS).map(([colorName, borderColor]) => (
              <button
                key={colorName}
                className={`w-6 h-6 rounded border-2 ${borderColor} bg-secondary-dark`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateNode(id, {
                    borderColor: colorName as keyof typeof NODE_COLORS,
                  });
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-text-secondary mb-1">Background</div>
          <div className="grid grid-cols-3 gap-1">
            {Object.entries(NODE_BGS).map(([colorName, bgColor]) => (
              <button
                key={colorName}
                className={`w-6 h-6 rounded border border-border ${bgColor}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateNode(id, {
                    bgColor: colorName as keyof typeof NODE_BGS,
                  });
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
