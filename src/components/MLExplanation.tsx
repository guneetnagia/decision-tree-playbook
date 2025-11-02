import { Card } from "./ui/card";
import { Brain, TrendingUp, Users, Zap } from "lucide-react";

export const MLExplanation = () => {
  return (
    <div className="mt-12 mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">
        How Amadeus Uses Decision Trees in Production
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Customer Segmentation</h3>
              <p className="text-sm text-muted-foreground">
                Decision trees classify millions of travelers into segments based on booking patterns, 
                preferences, and behavior. This enables personalized offers and dynamic pricing strategies.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Revenue Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Trees predict booking probability and customer lifetime value, helping airlines and 
                hotels optimize inventory allocation and pricing for maximum revenue.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Users className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Churn Prevention</h3>
              <p className="text-sm text-muted-foreground">
                Identify at-risk customers by analyzing booking frequency, complaint history, and 
                engagement. Trees trigger retention campaigns before customers churn to competitors.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Real-Time Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Fast inference enables instant product suggestions during booking flows. Trees evaluate 
                hundreds of features in milliseconds to show the most relevant travel options.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg max-w-4xl mx-auto">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="text-primary">⚙️</span>
          Technical Implementation at Scale
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Training:</strong>
            <ul className="mt-1 space-y-1 ml-4">
              <li>• Historical booking data (millions of records)</li>
              <li>• Feature engineering: trip duration, seasonality, user demographics</li>
              <li>• Algorithm: CART, Random Forest, or Gradient Boosting</li>
              <li>• Cross-validation to prevent overfitting</li>
            </ul>
          </div>
          <div>
            <strong className="text-foreground">Production Deployment:</strong>
            <ul className="mt-1 space-y-1 ml-4">
              <li>• Model versioning and A/B testing</li>
              <li>• Low-latency prediction APIs (&lt;50ms)</li>
              <li>• Continuous monitoring and retraining</li>
              <li>• Integration with booking engines and CRM</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-accent/5 border border-accent/20 rounded-lg max-w-4xl mx-auto">
        <h3 className="font-semibold text-foreground mb-3">
          Why Decision Trees Excel in Travel Tech
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-card rounded-lg">
            <strong className="text-accent">Interpretability</strong>
            <p className="text-muted-foreground mt-1">
              Explain recommendations to users: "We suggest this because you prefer flexible bookings"
            </p>
          </div>
          <div className="p-3 bg-card rounded-lg">
            <strong className="text-accent">Handle Mixed Data</strong>
            <p className="text-muted-foreground mt-1">
              Process numeric (price), categorical (destination), and temporal (date) features seamlessly
            </p>
          </div>
          <div className="p-3 bg-card rounded-lg">
            <strong className="text-accent">Non-Linear Patterns</strong>
            <p className="text-muted-foreground mt-1">
              Capture complex interactions: "Business travelers in Q4 prefer morning flights"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
