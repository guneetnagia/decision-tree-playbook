import { Button } from "./ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuestionCardProps {
  question: string;
  onAnswer: (answer: "yes" | "no") => void;
  stepNumber: number;
}

export const QuestionCard = ({ question, onAnswer, stepNumber }: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-2 border-primary/20">
      <div className="mb-4 sm:mb-6">
        <span className="text-xs sm:text-sm font-medium text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full">
          Step {stepNumber}
        </span>
      </div>
      
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-foreground">
        {question}
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          onClick={() => onAnswer("yes")}
          size="lg"
          className="flex-1 bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-success-foreground gap-2 text-base sm:text-lg py-4 sm:py-6"
        >
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          Yes
        </Button>
        
        <Button
          onClick={() => onAnswer("no")}
          size="lg"
          variant="destructive"
          className="flex-1 gap-2 text-base sm:text-lg py-4 sm:py-6"
        >
          <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          No
        </Button>
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-secondary/50 rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground">
          💡 <strong>ML in Action:</strong> In production, this would use guest data (booking history, 
          preferences, reviews) to automatically classify travelers. Each split maximizes information gain!
        </p>
      </div>
    </div>
  );
};
