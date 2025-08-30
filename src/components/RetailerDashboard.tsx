import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, AlertTriangle, TrendingUp, Bot, Bell, MessageSquare, Users, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

interface RetailerDashboardProps {
  onBack: () => void;
}

export const RetailerDashboard = ({ onBack }: RetailerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const sentimentTrend = [
    { date: '2024-01-01', positive: 65, negative: 15, neutral: 20, total: 127 },
    { date: '2024-01-08', positive: 70, negative: 12, neutral: 18, total: 145 },
    { date: '2024-01-15', positive: 68, negative: 18, neutral: 14, total: 132 },
    { date: '2024-01-22', positive: 72, negative: 10, neutral: 18, total: 156 },
    { date: '2024-01-29', positive: 75, negative: 8, neutral: 17, total: 189 },
    { date: '2024-02-05', positive: 68, negative: 15, neutral: 17, total: 167 }
  ];

  const productComplaints = [
    { product: 'Bluetooth Headphones', complaints: 45, resolved: 38, pending: 7 },
    { product: 'Fitness Watch', complaints: 23, resolved: 20, pending: 3 },
    { product: 'Power Bank', complaints: 12, resolved: 10, pending: 2 },
    { product: 'Wireless Charger', complaints: 8, resolved: 7, pending: 1 },
    { product: 'Phone Case', complaints: 5, resolved: 5, pending: 0 }
  ];

  const aspectBreakdown = [
    { name: 'Battery', positive: 78, negative: 22, fill: 'hsl(var(--chart-1))' },
    { name: 'Design', positive: 72, negative: 28, fill: 'hsl(var(--chart-2))' },
    { name: 'Sound Quality', positive: 65, negative: 35, fill: 'hsl(var(--chart-3))' },
    { name: 'Comfort', positive: 58, negative: 42, fill: 'hsl(var(--chart-4))' },
    { name: 'Price', positive: 55, negative: 45, fill: 'hsl(var(--chart-5))' }
  ];

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High Volume of Negative Feedback',
      description: 'Bluetooth Headphones received 15 negative reviews in the last 24 hours',
      time: '2 hours ago',
      actions: ['Deploy Recovery Bot', 'Alert Product Team']
    },
    {
      id: 2,
      type: 'warning',
      title: 'Unresolved Customer Issues',
      description: '7 customers haven\'t responded to bot outreach for Bluetooth Headphones',
      time: '4 hours ago',
      actions: ['Manual Intervention', 'Escalate to Support']
    },
    {
      id: 3,
      type: 'info',
      title: 'Positive Sentiment Spike',
      description: 'Fitness Watch sentiment improved by 12% after firmware update',
      time: '6 hours ago',
      actions: ['Document Success', 'Share Insights']
    }
  ];

  const botConversations = [
    {
      id: 1,
      customer: 'Sarah M.',
      product: 'Bluetooth Headphones',
      sentiment: 'negative',
      status: 'recovered',
      issue: 'Battery draining too fast',
      resolution: 'Firmware update provided',
      time: '30 min ago'
    },
    {
      id: 2,
      customer: 'John D.',
      product: 'Fitness Watch',
      sentiment: 'negative',
      status: 'in-progress',
      issue: 'Inaccurate heart rate readings',
      resolution: 'Troubleshooting steps shared',
      time: '1 hour ago'
    },
    {
      id: 3,
      customer: 'Emily R.',
      product: 'Power Bank',
      sentiment: 'negative',
      status: 'unresolved',
      issue: 'Device not charging properly',
      resolution: 'Replacement process initiated',
      time: '2 hours ago'
    }
  ];

  const metrics = {
    totalFeedback: 1247,
    positiveRate: 68.3,
    negativeRate: 10.2,
    neutralRate: 21.5,
    botRecoveryRate: 78.5,
    averageResponseTime: 28,
    unresolvedIssues: 13
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
              <div className="w-8 h-8 bg-primary/20 border-2 border-primary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Retailer Analytics Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time sentiment analysis & recovery tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                3 Alerts
              </Button>
              <Badge variant="secondary">Live Dashboard</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="col-span-2 md:col-span-1">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Feedback</p>
                  <p className="text-2xl font-bold">{metrics.totalFeedback.toLocaleString()}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Positive Rate</p>
                  <p className="text-2xl font-bold text-success">{metrics.positiveRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recovery Rate</p>
                  <p className="text-2xl font-bold text-primary">{metrics.botRecoveryRate}%</p>
                </div>
                <Bot className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                  <p className="text-2xl font-bold">{metrics.averageResponseTime}s</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unresolved</p>
                  <p className="text-2xl font-bold text-warning">{metrics.unresolvedIssues}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Negative Rate</p>
                  <p className="text-2xl font-bold text-destructive">{metrics.negativeRate}%</p>
                </div>
                <Star className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Neutral Rate</p>
                  <p className="text-2xl font-bold text-muted-foreground">{metrics.neutralRate}%</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Actions</TabsTrigger>
            <TabsTrigger value="bot-activity">Bot Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Trends</CardTitle>
                  <CardDescription>Weekly sentiment analysis over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sentimentTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Line type="monotone" dataKey="positive" stroke="hsl(var(--chart-positive))" strokeWidth={2} />
                      <Line type="monotone" dataKey="negative" stroke="hsl(var(--chart-negative))" strokeWidth={2} />
                      <Line type="monotone" dataKey="neutral" stroke="hsl(var(--chart-neutral))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Complaints</CardTitle>
                  <CardDescription>Breakdown by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productComplaints}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="product" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="resolved" fill="hsl(var(--chart-positive))" />
                      <Bar dataKey="pending" fill="hsl(var(--chart-negative))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Aspect-Based Sentiment Analysis</CardTitle>
                <CardDescription>Detailed breakdown by product features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {aspectBreakdown.map((aspect) => (
                    <div key={aspect.name} className="text-center space-y-3">
                      <h4 className="font-medium text-foreground">{aspect.name}</h4>
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Positive', value: aspect.positive, fill: 'hsl(var(--chart-positive))' },
                              { name: 'Negative', value: aspect.negative, fill: 'hsl(var(--chart-negative))' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={60}
                            dataKey="value"
                          >
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="text-sm text-muted-foreground">
                        <div className="text-success font-medium">{aspect.positive}% Positive</div>
                        <div className="text-destructive">{aspect.negative}% Negative</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Card key={alert.id} className={`border-l-4 ${
                  alert.type === 'critical' ? 'border-l-destructive' :
                  alert.type === 'warning' ? 'border-l-warning' : 'border-l-primary'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className={`w-5 h-5 ${
                          alert.type === 'critical' ? 'text-destructive' :
                          alert.type === 'warning' ? 'text-warning' : 'text-primary'
                        }`} />
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                      </div>
                      <Badge className={`${
                        alert.type === 'critical' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                        alert.type === 'warning' ? 'bg-warning/10 text-warning border-warning/20' : 
                        'bg-primary/10 text-primary border-primary/20'
                      }`}>
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{alert.description}</p>
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {alert.actions.map((action, index) => (
                        <Button key={index} size="sm" variant="outline">
                          {action}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bot-activity" className="space-y-6">
            <div className="space-y-4">
              {botConversations.map((conversation) => (
                <Card key={conversation.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center space-x-2">
                          <Bot className="w-5 h-5 text-primary" />
                          <span>Conversation with {conversation.customer}</span>
                        </CardTitle>
                        <CardDescription>
                          Product: {conversation.product} • Issue: {conversation.issue}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={`${
                          conversation.status === 'recovered' ? 'bg-success/10 text-success border-success/20' :
                          conversation.status === 'in-progress' ? 'bg-warning/10 text-warning border-warning/20' :
                          'bg-destructive/10 text-destructive border-destructive/20'
                        }`}>
                          {conversation.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{conversation.time}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Initial Sentiment:</span>
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                          NEGATIVE
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Resolution:</span>
                        <span className="text-sm text-muted-foreground">{conversation.resolution}</span>
                      </div>
                      {conversation.status === 'recovered' && (
                        <div className="bg-success/10 border border-success/20 rounded-lg p-3 mt-3">
                          <p className="text-sm text-success font-medium">✓ Successfully recovered customer sentiment</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>AI-generated business insights from sentiment data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <h4 className="font-medium text-success mb-2">Positive Trend</h4>
                    <p className="text-sm text-muted-foreground">
                      Battery life complaints decreased by 35% after firmware update deployment. 
                      Consider similar proactive approaches for other product aspects.
                    </p>
                  </div>
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <h4 className="font-medium text-warning mb-2">Attention Required</h4>
                    <p className="text-sm text-muted-foreground">
                      Comfort-related complaints increasing for extended use scenarios. 
                      Product design team should evaluate ergonomic improvements.
                    </p>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-medium text-primary mb-2">Bot Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Recovery bot achieving 78.5% success rate. Most effective with battery 
                      and connectivity issues, less effective with physical comfort complaints.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>Automated suggestions based on sentiment analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Deploy Recovery Bot</p>
                      <p className="text-xs text-muted-foreground">
                        15 new negative reviews detected in last 4 hours for Bluetooth Headphones
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Product Team Alert</p>
                      <p className="text-xs text-muted-foreground">
                        Comfort complaints trending upward - consider design review
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-sm">Update Documentation</p>
                      <p className="text-xs text-muted-foreground">
                        Share successful firmware update approach with other product teams
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};