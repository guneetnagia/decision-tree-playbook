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
    question: "Is this a leisure or business trip?",
    yesNode: "business",
    noNode: "leisure",
  },
  business: {
    id: "business",
    question: "Will you need meeting facilities?",
    yesNode: "businessMeetings",
    noNode: "businessNoMeetings",
  },
  businessMeetings: {
    id: "businessMeetings",
    question: "Is location in city center important?",
    yesNode: "businessCityCenter",
    noNode: "businessSuburban",
  },
  businessCityCenter: {
    id: "businessCityCenter",
    question: "Do you need executive lounge access?",
    yesNode: "businessCityCenterPremium",
    noNode: "businessCityCenterStandard",
  },
  businessCityCenterPremium: {
    id: "businessCityCenterPremium",
    answer: "🏢 Premium Business Hotel - City center with executive lounge, meeting rooms, and concierge service",
    isLeaf: true,
  },
  businessCityCenterStandard: {
    id: "businessCityCenterStandard",
    answer: "🏨 Business Hotel - City center with meeting facilities and fast WiFi",
    isLeaf: true,
  },
  businessSuburban: {
    id: "businessSuburban",
    question: "Is free parking important?",
    yesNode: "businessSuburbanParking",
    noNode: "businessSuburbanNoParking",
  },
  businessSuburbanParking: {
    id: "businessSuburbanParking",
    answer: "🚗 Conference Center Hotel - Suburban location with free parking, meeting spaces, and shuttle service",
    isLeaf: true,
  },
  businessSuburbanNoParking: {
    id: "businessSuburbanNoParking",
    answer: "🏢 Business Park Hotel - Near business districts with meeting facilities and restaurant",
    isLeaf: true,
  },
  businessNoMeetings: {
    id: "businessNoMeetings",
    question: "Is the trip longer than 3 nights?",
    yesNode: "businessLongStay",
    noNode: "businessShortStay",
  },
  businessLongStay: {
    id: "businessLongStay",
    question: "Do you need kitchen facilities?",
    yesNode: "businessApartment",
    noNode: "businessExtendedStay",
  },
  businessApartment: {
    id: "businessApartment",
    answer: "🏠 Serviced Apartment - Full kitchen, workspace, and weekly housekeeping for extended stays",
    isLeaf: true,
  },
  businessExtendedStay: {
    id: "businessExtendedStay",
    answer: "🏨 Extended Stay Hotel - Comfortable rooms with workspace and complimentary breakfast",
    isLeaf: true,
  },
  businessShortStay: {
    id: "businessShortStay",
    question: "Is budget a primary concern?",
    yesNode: "businessBudget",
    noNode: "businessComfort",
  },
  businessBudget: {
    id: "businessBudget",
    answer: "💼 Economy Business Hotel - Clean, efficient, with basic amenities and good WiFi",
    isLeaf: true,
  },
  businessComfort: {
    id: "businessComfort",
    answer: "⭐ Boutique Business Hotel - Stylish rooms with premium amenities and personalized service",
    isLeaf: true,
  },
  leisure: {
    id: "leisure",
    question: "Are you traveling with family?",
    yesNode: "family",
    noNode: "couple",
  },
  family: {
    id: "family",
    question: "Do you need kids' activities and entertainment?",
    yesNode: "familyActivities",
    noNode: "familyRelax",
  },
  familyActivities: {
    id: "familyActivities",
    question: "Is beach access important?",
    yesNode: "familyBeachResort",
    noNode: "familyCityEntertainment",
  },
  familyBeachResort: {
    id: "familyBeachResort",
    question: "All-inclusive preferred?",
    yesNode: "familyBeachAllInclusive",
    noNode: "familyBeachFlexible",
  },
  familyBeachAllInclusive: {
    id: "familyBeachAllInclusive",
    answer: "🏖️ All-Inclusive Beach Resort - Kids club, water sports, unlimited dining, and family activities",
    isLeaf: true,
  },
  familyBeachFlexible: {
    id: "familyBeachFlexible",
    answer: "🌊 Family Beach Hotel - Beachfront location with pool, kids' amenities, and dining options",
    isLeaf: true,
  },
  familyCityEntertainment: {
    id: "familyCityEntertainment",
    question: "Near theme parks or attractions?",
    yesNode: "familyThemePark",
    noNode: "familyCitySuite",
  },
  familyThemePark: {
    id: "familyThemePark",
    answer: "🎢 Theme Park Resort Hotel - Adjacent to attractions with character dining and park shuttles",
    isLeaf: true,
  },
  familyCitySuite: {
    id: "familyCitySuite",
    answer: "🏙️ Family Suite Hotel - Spacious suites near city attractions with pool and breakfast",
    isLeaf: true,
  },
  familyRelax: {
    id: "familyRelax",
    question: "Looking for outdoor activities?",
    yesNode: "familyOutdoor",
    noNode: "familyComfort",
  },
  familyOutdoor: {
    id: "familyOutdoor",
    question: "Mountain or countryside preferred?",
    yesNode: "familyMountain",
    noNode: "familyCountryside",
  },
  familyMountain: {
    id: "familyMountain",
    answer: "⛰️ Mountain Lodge - Hiking trails, nature activities, family rooms with scenic views",
    isLeaf: true,
  },
  familyCountryside: {
    id: "familyCountryside",
    answer: "🌾 Countryside Resort - Farm activities, nature walks, and family cottages",
    isLeaf: true,
  },
  familyComfort: {
    id: "familyComfort",
    question: "Multi-bedroom suites needed?",
    yesNode: "familyVilla",
    noNode: "familyStandard",
  },
  familyVilla: {
    id: "familyVilla",
    answer: "🏡 Family Villa Resort - Private villas with kitchens, pools, and childcare services",
    isLeaf: true,
  },
  familyStandard: {
    id: "familyStandard",
    answer: "👨‍👩‍👧‍👦 Family-Friendly Hotel - Connecting rooms, kids' menu, and recreational facilities",
    isLeaf: true,
  },
  couple: {
    id: "couple",
    question: "Looking for a romantic experience?",
    yesNode: "romantic",
    noNode: "adventure",
  },
  romantic: {
    id: "romantic",
    question: "Do you want spa and wellness facilities?",
    yesNode: "romanticSpa",
    noNode: "romanticDining",
  },
  romanticSpa: {
    id: "romanticSpa",
    question: "Secluded location preferred?",
    yesNode: "romanticSecluded",
    noNode: "romanticUrban",
  },
  romanticSecluded: {
    id: "romanticSecluded",
    answer: "💑 Luxury Spa Resort - Private villas, couples' spa, infinity pool, and gourmet dining",
    isLeaf: true,
  },
  romanticUrban: {
    id: "romanticUrban",
    answer: "🌆 Urban Spa Hotel - Rooftop spa, couples' treatments, city views, and fine dining",
    isLeaf: true,
  },
  romanticDining: {
    id: "romanticDining",
    question: "Beach or mountain views?",
    yesNode: "romanticBeach",
    noNode: "romanticMountain",
  },
  romanticBeach: {
    id: "romanticBeach",
    answer: "🌅 Beachfront Romantic Resort - Private beach dinners, sunset views, and intimate settings",
    isLeaf: true,
  },
  romanticMountain: {
    id: "romanticMountain",
    answer: "🏔️ Mountain Romantic Retreat - Cozy fireplaces, mountain views, wine tasting, and stargazing",
    isLeaf: true,
  },
  adventure: {
    id: "adventure",
    question: "What type of adventure interests you?",
    yesNode: "adventureActive",
    noNode: "adventureCultural",
  },
  adventureActive: {
    id: "adventureActive",
    question: "Water sports or land activities?",
    yesNode: "adventureWater",
    noNode: "adventureLand",
  },
  adventureWater: {
    id: "adventureWater",
    question: "Diving or surfing focus?",
    yesNode: "adventureDiving",
    noNode: "adventureSurfing",
  },
  adventureDiving: {
    id: "adventureDiving",
    answer: "🤿 Dive Resort - PADI center, boat trips, dive packages, and beachfront access",
    isLeaf: true,
  },
  adventureSurfing: {
    id: "adventureSurfing",
    answer: "🏄 Surf Camp Hotel - Surf lessons, board rentals, beach location, and active community",
    isLeaf: true,
  },
  adventureLand: {
    id: "adventureLand",
    question: "Mountain climbing or cycling tours?",
    yesNode: "adventureClimbing",
    noNode: "adventureCycling",
  },
  adventureClimbing: {
    id: "adventureClimbing",
    answer: "🧗 Mountain Adventure Lodge - Climbing guides, gear rental, base camp location, and trail access",
    isLeaf: true,
  },
  adventureCycling: {
    id: "adventureCycling",
    answer: "🚴 Cycling Tour Hotel - Bike rentals, guided tours, scenic routes, and bike storage",
    isLeaf: true,
  },
  adventureCultural: {
    id: "adventureCultural",
    question: "Historic sites or local experiences?",
    yesNode: "adventureHistoric",
    noNode: "adventureLocal",
  },
  adventureHistoric: {
    id: "adventureHistoric",
    question: "Stay in historic building?",
    yesNode: "adventureHistoricHotel",
    noNode: "adventureHistoricModern",
  },
  adventureHistoricHotel: {
    id: "adventureHistoricHotel",
    answer: "🏰 Historic Heritage Hotel - Restored castle/manor with modern amenities and cultural tours",
    isLeaf: true,
  },
  adventureHistoricModern: {
    id: "adventureHistoricModern",
    answer: "🏛️ Boutique Hotel Near Historic Sites - Modern comfort with walking distance to landmarks",
    isLeaf: true,
  },
  adventureLocal: {
    id: "adventureLocal",
    question: "Prefer urban or rural experience?",
    yesNode: "adventureUrban",
    noNode: "adventureRural",
  },
  adventureUrban: {
    id: "adventureUrban",
    answer: "🌃 Urban Cultural Hotel - Local neighborhood, street food tours, and authentic experiences",
    isLeaf: true,
  },
  adventureRural: {
    id: "adventureRural",
    answer: "🌿 Eco-Lodge Experience - Village homestays, local guides, cultural immersion, and nature",
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
            ML Decision Trees in Hospitality
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover how the hospitality industry uses machine learning decision trees to personalize guest experiences
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
