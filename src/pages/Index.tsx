import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Bot, ShoppingCart, TrendingUp, Users, Zap } from "lucide-react";
import { EcommerceDemo } from "@/components/EcommerceDemo";
import { CustomerDashboard } from "@/components/CustomerDashboard";
import { RetailerDashboard } from "@/components/RetailerDashboard";
import { BotInterface } from "@/components/BotInterface";

const Index = () => {
  const [activeView, setActiveView] = useState<'overview' | 'ecommerce' | 'customer' | 'retailer' | 'bot'>('overview');

  const features = [
    {
      icon: ShoppingCart,
      title: "E-commerce Integration",
      description: "Seamless feedback collection from product purchases with real-time sentiment detection.",
      badge: "Live Collection"
    },
    {
      icon: BarChart3,
      title: "Sentiment Analysis",
      description: "Advanced NLP powered by BERT framework for accurate emotion and aspect detection.",
      badge: "AI Powered"
    },
    {
      icon: TrendingUp,
      title: "Customer Insights",
      description: "Pre-purchase review visualization helping customers make informed decisions.",
      badge: "Data Driven"
    },
    {
      icon: Bot,
      title: "Smart Recovery Bot",
      description: "Automated engagement for negative feedback with conversation-driven sentiment recovery.",
      badge: "Auto Response"
    }
  ];

  const stats = [
    { label: "Sentiment Accuracy", value: "94.3%", trend: "+2.1%" },
    { label: "Recovery Rate", value: "78.5%", trend: "+12.4%" },
    { label: "Response Time", value: "< 30s", trend: "Real-time" },
    { label: "Customer Satisfaction", value: "4.8/5", trend: "+0.3" }
  ];

  if (activeView === 'ecommerce') {
    return <EcommerceDemo onBack={() => setActiveView('overview')} />;
  }

  if (activeView === 'customer') {
    return <CustomerDashboard onBack={() => setActiveView('overview')} />;
  }

  if (activeView === 'retailer') {
    return <RetailerDashboard onBack={() => setActiveView('overview')} />;
  }

  if (activeView === 'bot') {
    return <BotInterface onBack={() => setActiveView('overview')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SentimentSpark</h1>
                <p className="text-sm text-muted-foreground">Customer Feedback Intelligence</p>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              Demo Platform
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-secondary/20 to-accent/10 py-20">
        <div className="container mx-auto px-6 text-center">
          <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Users className="w-4 h-4 mr-2" />
            Enterprise-Ready AI Solution
          </Badge>
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Transform Customer Feedback<br />Into Actionable Intelligence
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Complete sentiment analysis pipeline with automated recovery bots, 
            real-time dashboards, and aspect-based insights for product teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
              onClick={() => setActiveView('ecommerce')}
            >
              Try Demo Store
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg"
              onClick={() => setActiveView('retailer')}
            >
              View Analytics Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground mb-1">{stat.label}</div>
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Complete Feedback Intelligence Platform
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From collection to recovery - our end-to-end solution transforms every customer interaction 
              into valuable business insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-shadow duration-200 group cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className="text-xs bg-accent/10 text-accent-foreground border-accent/20">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Navigation */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Explore the Platform
            </h3>
            <p className="text-lg text-muted-foreground">
              Experience each component of our sentiment analysis pipeline
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setActiveView('ecommerce')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle>E-commerce Demo</CardTitle>
                <CardDescription>Experience feedback collection flow</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setActiveView('customer')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-success-foreground" />
                </div>
                <CardTitle>Customer Dashboard</CardTitle>
                <CardDescription>Pre-purchase review insights</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setActiveView('retailer')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/20 border-2 border-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <CardTitle>Retailer Analytics</CardTitle>
                <CardDescription>Sentiment analysis dashboard</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={() => setActiveView('bot')}>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-warning/20 border-2 border-warning rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Bot className="w-8 h-8 text-warning" />
                </div>
                <CardTitle>Recovery Bot</CardTitle>
                <CardDescription>AI-powered conversation flow</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">SentimentSpark</span>
          </div>
          <p className="text-muted-foreground">
            Transforming customer feedback into business intelligence through AI-powered sentiment analysis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;