import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Star, TrendingUp, TrendingDown, AlertCircle, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";

interface CustomerDashboardProps {
  onBack: () => void;
}

export const CustomerDashboard = ({ onBack }: CustomerDashboardProps) => {
  const productData = {
    name: "Wireless Bluetooth Headphones",
    overallRating: 4.2,
    totalReviews: 1247,
    aspects: {
      battery: { rating: 4.5, count: 892 },
      design: { rating: 4.3, count: 756 },
      sound: { rating: 4.1, count: 943 },
      comfort: { rating: 3.9, count: 834 },
      price: { rating: 4.0, count: 678 }
    }
  };

  const sentimentData = [
    { name: 'Positive', value: 68, fill: 'hsl(var(--chart-positive))' },
    { name: 'Neutral', value: 22, fill: 'hsl(var(--chart-neutral))' },
    { name: 'Negative', value: 10, fill: 'hsl(var(--chart-negative))' }
  ];

  const timeData = [
    { month: 'Jan', positive: 65, negative: 15, neutral: 20 },
    { month: 'Feb', positive: 70, negative: 12, neutral: 18 },
    { month: 'Mar', positive: 68, negative: 10, neutral: 22 },
    { month: 'Apr', positive: 72, negative: 8, neutral: 20 },
    { month: 'May', positive: 75, negative: 10, neutral: 15 },
    { month: 'Jun', positive: 68, negative: 10, neutral: 22 }
  ];

  const aspectData = [
    { aspect: 'Battery', positive: 85, negative: 8, neutral: 7 },
    { aspect: 'Design', positive: 78, negative: 12, neutral: 10 },
    { aspect: 'Sound', positive: 72, negative: 15, neutral: 13 },
    { aspect: 'Comfort', positive: 65, negative: 20, neutral: 15 },
    { aspect: 'Price', positive: 60, negative: 25, neutral: 15 }
  ];

  const recentReviews = [
    {
      id: 1,
      rating: 5,
      text: "Amazing battery life! Lasts the whole day without charging.",
      sentiment: "positive",
      aspects: ["battery", "value"],
      date: "2 days ago"
    },
    {
      id: 2,
      rating: 2,
      text: "Sound quality is poor for the price. Expected much better.",
      sentiment: "negative",
      aspects: ["sound", "price"],
      date: "3 days ago"
    },
    {
      id: 3,
      rating: 4,
      text: "Great design and comfortable to wear for long periods.",
      sentiment: "positive",
      aspects: ["design", "comfort"],
      date: "5 days ago"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating) 
                ? 'fill-warning text-warning' 
                : 'text-muted-foreground'
            }`}
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
              <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Customer Review Dashboard</h1>
                <p className="text-sm text-muted-foreground">Pre-purchase insights & analysis</p>
              </div>
            </div>
            <Badge variant="secondary">Customer View</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Product Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{productData.name}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      {renderStars(productData.overallRating)}
                      <span className="font-medium">{productData.overallRating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{productData.totalReviews.toLocaleString()} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="text-6xl">🎧</div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <span>Overall Sentiment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Positive</span>
                  <span className="font-medium text-success">68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Most customers are satisfied with this product
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Star className="w-5 h-5 text-warning" />
                <span>Top Rated Aspect</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Battery Life</span>
                  <span className="font-medium">{productData.aspects.battery.rating}/5</span>
                </div>
                <Progress value={(productData.aspects.battery.rating / 5) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Consistently praised by customers
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span>Common Concern</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Comfort</span>
                  <span className="font-medium">{productData.aspects.comfort.rating}/5</span>
                </div>
                <Progress value={(productData.aspects.comfort.rating / 5) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Some users report discomfort during long use
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Sentiment Distribution</CardTitle>
              <CardDescription>Overall customer sentiment breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {sentimentData.map((entry) => (
                  <div key={entry.name} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: entry.fill }}></div>
                    <span className="text-sm">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sentiment Trend Over Time</CardTitle>
              <CardDescription>6-month sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area type="monotone" dataKey="positive" stackId="1" stroke="hsl(var(--chart-positive))" fill="hsl(var(--chart-positive))" />
                  <Area type="monotone" dataKey="neutral" stackId="1" stroke="hsl(var(--chart-neutral))" fill="hsl(var(--chart-neutral))" />
                  <Area type="monotone" dataKey="negative" stackId="1" stroke="hsl(var(--chart-negative))" fill="hsl(var(--chart-negative))" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Aspect Analysis */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Aspect-Based Analysis</CardTitle>
              <CardDescription>Detailed breakdown by product features</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aspectData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="aspect" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="positive" stackId="a" fill="hsl(var(--chart-positive))" />
                  <Bar dataKey="neutral" stackId="a" fill="hsl(var(--chart-neutral))" />
                  <Bar dataKey="negative" stackId="a" fill="hsl(var(--chart-negative))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>Latest customer feedback with sentiment analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border border-border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <Badge 
                          className={`text-xs ${
                            review.sentiment === 'positive' 
                              ? 'bg-success/10 text-success border-success/20'
                              : 'bg-destructive/10 text-destructive border-destructive/20'
                          }`}
                        >
                          {review.sentiment}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm">{review.text}</p>
                    <div className="flex flex-wrap gap-1">
                      {review.aspects.map((aspect) => (
                        <Badge key={aspect} variant="secondary" className="text-xs">
                          {aspect}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Decision Helper */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Purchase Recommendation</CardTitle>
            <CardDescription>Based on sentiment analysis and your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-6 border border-success/20">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Recommended Purchase</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on 68% positive sentiment and strong ratings for battery life and design, 
                    this product is recommended for users prioritizing long battery life and style. 
                    Consider comfort needs if planning extended use.
                  </p>
                  <div className="flex space-x-2">
                    <Badge className="bg-success/10 text-success border-success/20">
                      Strong Battery Life
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Good Design
                    </Badge>
                    <Badge className="bg-warning/10 text-warning border-warning/20">
                      Consider Comfort
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};