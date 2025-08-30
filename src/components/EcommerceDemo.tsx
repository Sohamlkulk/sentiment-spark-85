import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Star, ShoppingCart, Send, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EcommerceDemoProps {
  onBack: () => void;
}

export const EcommerceDemo = ({ onBack }: EcommerceDemoProps) => {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [sentiment, setSentiment] = useState<'positive' | 'negative' | 'neutral' | null>(null);
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: "$89.99",
      image: "🎧",
      rating: 4.2,
      reviews: 156,
      description: "Premium wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199.99",
      image: "⌚",
      rating: 4.5,
      reviews: 243,
      description: "Advanced fitness tracking with health monitoring"
    },
    {
      id: 3,
      name: "Portable Power Bank",
      price: "$34.99",
      image: "🔋",
      rating: 4.1,
      reviews: 89,
      description: "High-capacity portable charger for all devices"
    }
  ];

  const handlePurchase = (productId: number) => {
    setSelectedProduct(productId);
    toast({
      title: "Purchase Successful!",
      description: "Thank you for your purchase. Please share your feedback below.",
    });
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;

    // Simulate sentiment analysis
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'rubbish', 'poor', 'broken', 'useless'];
    const positiveWords = ['good', 'great', 'excellent', 'love', 'best', 'amazing', 'perfect', 'awesome', 'fantastic'];
    
    const lowerFeedback = feedback.toLowerCase();
    const hasNegative = negativeWords.some(word => lowerFeedback.includes(word));
    const hasPositive = positiveWords.some(word => lowerFeedback.includes(word));
    
    let detectedSentiment: 'positive' | 'negative' | 'neutral';
    if (hasNegative) detectedSentiment = 'negative';
    else if (hasPositive) detectedSentiment = 'positive';
    else detectedSentiment = 'neutral';

    setSentiment(detectedSentiment);
    setSubmitted(true);

    if (detectedSentiment === 'negative') {
      toast({
        title: "Negative Sentiment Detected",
        description: "Our support bot will reach out to help resolve your concerns.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Feedback Received",
        description: "Thank you for your positive feedback!",
      });
    }
  };

  const renderStars = (count: number, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= count 
                ? 'fill-warning text-warning' 
                : 'text-muted-foreground'
            } ${interactive ? 'cursor-pointer hover:text-warning' : ''}`}
            onClick={interactive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">TechShop Demo</h1>
                <p className="text-sm text-muted-foreground">E-commerce with Feedback Intelligence</p>
              </div>
            </div>
            <Badge variant="secondary">Demo Store</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {!selectedProduct ? (
          // Product Listing
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
              <p className="text-muted-foreground">Purchase any product to experience our feedback collection system</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="text-6xl mb-4">{product.image}</div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <div className="flex items-center space-x-2">
                        {renderStars(Math.floor(product.rating))}
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-primary hover:opacity-90"
                      onClick={() => handlePurchase(product.id)}
                    >
                      Purchase Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Feedback Form
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span>Purchase Successful!</span>
                </CardTitle>
                <CardDescription>
                  Thank you for purchasing {products.find(p => p.id === selectedProduct)?.name}. 
                  We'd love to hear about your experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!submitted ? (
                  <>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Rate your experience</Label>
                      {renderStars(rating, true)}
                    </div>

                    <div>
                      <Label htmlFor="feedback" className="text-sm font-medium mb-2 block">
                        Share your detailed feedback
                      </Label>
                      <Textarea
                        id="feedback"
                        placeholder="Tell us about your experience with this product..."
                        className="min-h-[120px]"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />
                    </div>

                    <Button 
                      onClick={handleFeedbackSubmit}
                      disabled={!feedback.trim()}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </Button>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                      sentiment === 'negative' 
                        ? 'bg-destructive/10 text-destructive' 
                        : sentiment === 'positive'
                        ? 'bg-success/10 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {sentiment === 'negative' ? (
                        <AlertTriangle className="w-8 h-8" />
                      ) : (
                        <CheckCircle className="w-8 h-8" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Sentiment Analysis Complete
                      </h3>
                      <Badge 
                        className={`px-3 py-1 ${
                          sentiment === 'negative' 
                            ? 'bg-destructive/10 text-destructive border-destructive/20' 
                            : sentiment === 'positive'
                            ? 'bg-success/10 text-success border-success/20'
                            : 'bg-muted text-muted-foreground border-muted'
                        }`}
                      >
                        {sentiment?.toUpperCase()} SENTIMENT
                      </Badge>
                    </div>

                    <p className="text-muted-foreground">
                      {sentiment === 'negative' 
                        ? "We've detected negative sentiment. Our support bot will contact you shortly to resolve any issues."
                        : sentiment === 'positive'
                        ? "Thank you for your positive feedback! Your review helps other customers."
                        : "Thank you for your feedback! We appreciate your honest review."
                      }
                    </p>

                    <div className="pt-4 space-y-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedProduct(null);
                          setSubmitted(false);
                          setFeedback("");
                          setRating(0);
                          setSentiment(null);
                        }}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};