import { useState } from "react";
import { TreeNode } from "./TreeNode";
import { QuestionCard } from "./QuestionCard";
import { ResultCard } from "./ResultCard";
import { MLExplanation } from "./MLExplanation";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

export interface TreeNodeData {
  id: string;
  question?: string;
  answer?: string;
  yesNode?: string;
  noNode?: string;
  isLeaf?: boolean;
}

const treeData: Record<string, TreeNodeData> = {
  root: {
    id: "root",
    question: "Is the travel duration more than 6 hours?",
    yesNode: "longDistance",
    noNode: "shortDistance",
  },
  longDistance: {
    id: "longDistance",
    question: "Does the customer prioritize comfort over cost?",
    yesNode: "premium",
    noNode: "economy",
  },
  premium: {
    id: "premium",
    answer: "Business Class Flight ✈️ - Premium experience with lounge access",
    isLeaf: true,
  },
  economy: {
    id: "economy",
    answer: "Economy Class Flight 🎫 - Cost-effective long-haul option",
    isLeaf: true,
  },
  shortDistance: {
    id: "shortDistance",
    question: "Is flexibility important (cancellations/changes)?",
    yesNode: "flexible",
    noNode: "fixed",
  },
  flexible: {
    id: "flexible",
    question: "Traveling for business purposes?",
    yesNode: "businessFlexible",
    noNode: "leisureFlexible",
  },
  businessFlexible: {
    id: "businessFlexible",
    answer: "Flexible Business Fare 💼 - Fully refundable with schedule changes",
    isLeaf: true,
  },
  leisureFlexible: {
    id: "leisureFlexible",
    answer: "Flexible Economy Fare 🎒 - Moderate flexibility for leisure travel",
    isLeaf: true,
  },
  fixed: {
    id: "fixed",
    answer: "Budget Fixed Fare 💰 - Best price with fixed schedule",
    isLeaf: true,
  },
};

export const DecisionTreeGame = () => {
  const [currentNodeId, setCurrentNodeId] = useState<string>("root");
  const [path, setPath] = useState<string[]>(["root"]);
  const [isComplete, setIsComplete] = useState(false);

  const currentNode = treeData[currentNodeId];

  const handleAnswer = (answer: "yes" | "no") => {
    const nextNodeId = answer === "yes" ? currentNode.yesNode : currentNode.noNode;
    
    if (!nextNodeId) return;

    const nextNode = treeData[nextNodeId];
    setPath([...path, nextNodeId]);
    setCurrentNodeId(nextNodeId);

    if (nextNode.isLeaf) {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentNodeId("root");
    setPath(["root"]);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3">
            ML Decision Trees in Travel
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how Amadeus uses machine learning decision trees to personalize travel recommendations
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Tree Visualization */}
          <div className="bg-card rounded-xl shadow-lg p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
              Decision Tree Structure
            </h2>
            <div className="overflow-x-auto pb-4">
              <TreeNode
                node={treeData.root}
                treeData={treeData}
                activePath={path}
                currentNodeId={currentNodeId}
              />
            </div>
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <h3 className="font-semibold mb-2 text-foreground">ML Decision Tree Fundamentals:</h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• <strong>Supervised Learning:</strong> Trained on historical booking data</li>
                <li>• <strong>Binary Splits:</strong> Each node creates yes/no decision boundaries</li>
                <li>• <strong>Feature Selection:</strong> Algorithm chooses most informative questions</li>
                <li>• <strong>Classification:</strong> Assigns travelers to product categories</li>
                <li>• <strong>Interpretability:</strong> Clear reasoning path for recommendations</li>
              </ul>
            </div>
          </div>

          {/* Game Interface */}
          <div className="animate-slide-in">
            {!isComplete ? (
              <QuestionCard
                question={currentNode.question || ""}
                onAnswer={handleAnswer}
                stepNumber={path.length}
              />
            ) : (
              <ResultCard
                result={currentNode.answer || ""}
                path={path}
                treeData={treeData}
                onReset={handleReset}
              />
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        </div>

        <MLExplanation />
      </div>
    </div>
  );
};
