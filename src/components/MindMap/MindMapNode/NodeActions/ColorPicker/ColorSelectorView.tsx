import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  onColorClick: (color: string) => void;
  colors: string[];
  selectedColor: string;
};

export const ColorSelectorView = ({
  onColorClick,
  colors,
  selectedColor,
}: Props) => {
  return (
    <Card className="p-3">
      <CardHeader className="!p-3">
        <CardTitle className="flex justify-between px-2 gap-2 items-center">
          <Input
            value={selectedColor}
            onChange={(e) => onColorClick(e.target.value)}
          />
          <div className="w-6 h-6 rounded-full flex-shrink-0 bg-white">
            <div
              className="w-6 h-6 rounded-full flex-shrink-0"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 justify-center p-3">
        {colors.map((color) => (
          <Button
            key={color}
            variant="iconRoundOutline"
            onClick={() => onColorClick(color)}
          >
            <div className="w-6 h-6 rounded-full flex-shrink-0 bg-white">
              <div
                className={`w-6 h-6 rounded-full`}
                style={{ backgroundColor: color }}
              />
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
