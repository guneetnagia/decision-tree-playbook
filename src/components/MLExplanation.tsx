import { Card } from "./ui/card";
import { Brain, TrendingUp, Users, Zap } from "lucide-react";

export const MLExplanation = () => {
  return (
    <div className="mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8 animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 px-4">
        How Hospitality Industry Uses Decision Trees in Production
      </h2>
      
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
        <Card className="p-4 sm:p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Guest Segmentation</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Decision trees classify millions of guests into segments based on booking patterns, 
                preferences, and behavior. This enables personalized offers, room recommendations, and 
                tailored services for each guest type.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg flex-shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Revenue Management</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Trees predict booking probability and guest lifetime value, helping hotels optimize 
                room inventory allocation, dynamic pricing strategies, and upselling opportunities 
                for maximum revenue per available room (RevPAR).
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-success/10 rounded-lg flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Loyalty & Retention</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Identify at-risk guests by analyzing booking frequency, satisfaction scores, and 
                engagement patterns. Trees trigger personalized retention campaigns and loyalty rewards 
                before guests churn to competitors.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Real-Time Recommendations</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Fast inference enables instant property and service suggestions during booking flows. 
                Trees evaluate hundreds of features in milliseconds to show the most relevant hotel 
                options, room types, and add-on services.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-primary/5 border border-primary/20 rounded-lg max-w-4xl mx-auto">
        <h3 className="font-semibold text-foreground mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
          <span className="text-primary">⚙️</span>
          Technical Implementation at Scale
        </h3>
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Training Phase:</strong>
            <ul className="mt-1 space-y-0.5 sm:space-y-1 ml-3 sm:ml-4">
              <li>• Historical booking data (millions of reservations)</li>
              <li>• Feature engineering: stay duration, seasonality, guest demographics, booking channel</li>
              <li>• Algorithms: CART, Random Forest, or Gradient Boosting Trees</li>
              <li>• Cross-validation and hyperparameter tuning to prevent overfitting</li>
              <li>• A/B testing on holdout sets before production deployment</li>
            </ul>
          </div>
          <div>
            <strong className="text-foreground">Production Deployment:</strong>
            <ul className="mt-1 space-y-0.5 sm:space-y-1 ml-3 sm:ml-4">
              <li>• Model versioning with rollback capabilities</li>
              <li>• Ultra-low latency prediction APIs (&lt;50ms response time)</li>
              <li>• Continuous monitoring of model performance metrics</li>
              <li>• Automated retraining pipelines with fresh data</li>
              <li>• Integration with CRM, booking engines, and marketing platforms</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-accent/5 border border-accent/20 rounded-lg max-w-4xl mx-auto">
        <h3 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">
          Why Decision Trees Excel in Hospitality Technology
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="p-2.5 sm:p-3 bg-card rounded-lg">
            <strong className="text-accent">Interpretability</strong>
            <p className="text-muted-foreground mt-1">
              Explain recommendations to guests and staff: "We suggest this room because you prefer 
              ocean views and extended stays"
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-card rounded-lg">
            <strong className="text-accent">Handle Mixed Data</strong>
            <p className="text-muted-foreground mt-1">
              Process numeric (price, nights), categorical (room type, destination), 
              and temporal (season, day of week) features seamlessly
            </p>
          </div>
          <div className="p-2.5 sm:p-3 bg-card rounded-lg">
            <strong className="text-accent">Non-Linear Patterns</strong>
            <p className="text-muted-foreground mt-1">
              Capture complex interactions: "Business travelers in Q4 prefer downtown hotels 
              with meeting facilities and early check-in"
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-secondary/50 rounded-lg max-w-4xl mx-auto">
        <h3 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">
          Real-World Hospitality Applications
        </h3>
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Hotels & Resorts:</strong>
            <ul className="mt-1 space-y-0.5 sm:space-y-1 ml-3 sm:ml-4">
              <li>• Room type recommendations based on guest profiles</li>
              <li>• Dynamic pricing optimization by demand forecasting</li>
              <li>• Amenity usage prediction for resource allocation</li>
              <li>• No-show prediction for overbooking strategies</li>
            </ul>
          </div>
          <div>
            <strong className="text-foreground">Booking Platforms:</strong>
            <ul className="mt-1 space-y-0.5 sm:space-y-1 ml-3 sm:ml-4">
              <li>• Property ranking and personalized search results</li>
              <li>• Cross-selling and upselling recommendations</li>
              <li>• Fraud detection for suspicious bookings</li>
              <li>• Review score prediction and sentiment analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
