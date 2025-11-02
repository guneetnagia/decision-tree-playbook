import { Button } from "./ui/button";
import { TreeNodeData } from "./DecisionTreeGame";
import { Sparkles, RotateCcw, TrendingDown } from "lucide-react";

interface ResultCardProps {
  result: string;
  path: string[];
  treeData: Record<string, TreeNodeData>;
  onReset: () => void;
}

export const ResultCard = ({ result, path, treeData, onReset }: ResultCardProps) => {
  return (
    <div className="bg-gradient-primary rounded-xl shadow-lg p-8 text-white">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Prediction Complete!</span>
        </div>
        
        <h2 className="text-4xl font-bold mb-2">
          Recommended Option:
        </h2>
        <div className="text-6xl mb-4 animate-fade-in">
          {result}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <TrendingDown className="w-4 h-4" />
          Decision Path:
        </h3>
        <div className="space-y-2">
          {path.map((nodeId, index) => {
            const node = treeData[nodeId];
            return (
              <div
                key={nodeId}
                className="flex items-start gap-3 text-sm animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-medium">
                  {index + 1}
                </span>
                <span className="pt-0.5">
                  {node.question || node.answer}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
        <p className="text-sm">
          <strong>🎯 ML Classification Complete!</strong> The decision tree used {path.length - 1} features
          to classify your travel needs. In production, Amadeus models evaluate 100+ features
          (demographics, booking history, seasonality, pricing data) to deliver optimal recommendations
          with 85%+ accuracy at scale!
        </p>
      </div>

      <Button
        onClick={onReset}
        size="lg"
        className="w-full bg-white text-primary hover:bg-white/90 gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Try Again
      </Button>
    </div>
  );
};
