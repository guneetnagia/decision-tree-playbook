import { useState } from "react";
import { TreeNode } from "./TreeNode";
import { QuestionCard } from "./QuestionCard";
import { ResultCard } from "./ResultCard";
import { MLExplanation } from "./MLExplanation";
import { Button } from "./ui/button";
import { RotateCcw, ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

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
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 20, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 20, 60));
  };

  const handleZoomReset = () => {
    setZoom(100);
  };

  const renderTreeVisualization = (isModal = false) => (
    <div className={`bg-card rounded-xl shadow-lg p-4 sm:p-6 animate-fade-in ${!isModal && "order-2 lg:order-1"}`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold flex items-center gap-3">
          <span className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
          <span>Decision Tree Structure</span>
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 60}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-xs font-medium px-2 min-w-[3rem] text-center">
              {zoom}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomReset}
              className="h-8 px-2 text-xs"
            >
              Reset
            </Button>
          </div>
          
          {!isModal && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(true)}
              className="h-8 px-3 gap-1.5"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Fullscreen</span>
            </Button>
          )}
        </div>
      </div>
      
      <div className="bg-secondary/30 rounded-lg p-4 mb-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          <strong className="text-foreground">💡 Interactive Guide:</strong> Follow the highlighted path as you answer questions. 
          The tree shows how each decision leads to the next question or final recommendation.
        </p>
      </div>

      <div className="overflow-auto pb-6 -mx-2 sm:mx-0 bg-gradient-to-b from-secondary/10 to-transparent rounded-lg p-4 max-h-[600px]">
        <div 
          className="min-w-max px-2 sm:px-4 transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <TreeNode
            node={treeData.root}
            treeData={treeData}
            activePath={path}
            currentNodeId={currentNodeId}
          />
        </div>
      </div>
      
      <div className="mt-6 p-4 sm:p-5 bg-primary/5 border-l-4 border-primary rounded-lg">
        <h3 className="font-bold mb-3 text-foreground text-sm sm:text-base flex items-center gap-2">
          <span className="text-xl">🎓</span>
          ML Decision Tree Fundamentals
        </h3>
        <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 sm:space-y-2.5 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            <span><strong className="text-foreground">Supervised Learning:</strong> Trained on historical booking data</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            <span><strong className="text-foreground">Binary Splits:</strong> Each node creates yes/no decision boundaries</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            <span><strong className="text-foreground">Feature Selection:</strong> Algorithm chooses most informative questions</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            <span><strong className="text-foreground">Classification:</strong> Assigns travelers to product categories</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">→</span>
            <span><strong className="text-foreground">Interpretability:</strong> Clear reasoning path for recommendations</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 sm:mb-3 px-2">
            ML Decision Trees in Hospitality
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Discover how the hospitality industry uses machine learning decision trees to personalize guest experiences
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Tree Visualization */}
          {renderTreeVisualization()}

          {/* Game Interface */}
          <div className="animate-slide-in order-1 lg:order-2">
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

        <div className="mt-6 sm:mt-8 text-center">
          <Button
            onClick={handleReset}
            variant="outline"
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        </div>

        <MLExplanation />
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0">
          <div className="relative h-full overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="h-full overflow-auto p-6">
              {renderTreeVisualization(true)}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
