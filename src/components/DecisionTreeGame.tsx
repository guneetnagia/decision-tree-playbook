import { useState } from "react";
import { TreeNode } from "./TreeNode";
import { QuestionCard } from "./QuestionCard";
import { ResultCard } from "./ResultCard";
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
    question: "Does it live in water?",
    yesNode: "water",
    noNode: "land",
  },
  water: {
    id: "water",
    question: "Does it have fins?",
    yesNode: "fish",
    noNode: "dolphin",
  },
  fish: {
    id: "fish",
    answer: "Fish 🐟",
    isLeaf: true,
  },
  dolphin: {
    id: "dolphin",
    answer: "Dolphin 🐬",
    isLeaf: true,
  },
  land: {
    id: "land",
    question: "Does it have four legs?",
    yesNode: "fourLegs",
    noNode: "bird",
  },
  fourLegs: {
    id: "fourLegs",
    question: "Does it purr?",
    yesNode: "cat",
    noNode: "dog",
  },
  cat: {
    id: "cat",
    answer: "Cat 🐱",
    isLeaf: true,
  },
  dog: {
    id: "dog",
    answer: "Dog 🐕",
    isLeaf: true,
  },
  bird: {
    id: "bird",
    answer: "Bird 🐦",
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
            Decision Tree Explorer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn how decision trees work by playing this interactive guessing game!
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
              <h3 className="font-semibold mb-2">How it works:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Each node asks a yes/no question</li>
                <li>• Your answer determines the next node</li>
                <li>• The path continues until reaching a leaf (prediction)</li>
                <li>• The tree learns patterns from training data</li>
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
      </div>
    </div>
  );
};
