import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Bot, User, Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";

interface BotInterfaceProps {
  onBack: () => void;
}

interface Message {
  id: number;
  sender: 'bot' | 'user';
  content: string;
  timestamp: Date;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export const BotInterface = ({ onBack }: BotInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'bot',
      content: "Hello! I noticed you left a review mentioning that the product is 'rubbish'. I'm here to help resolve any issues you're experiencing. Could you tell me what specifically went wrong?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversationPhase, setConversationPhase] = useState<'initial' | 'understanding' | 'resolving' | 'resolved'>('initial');
  const [customerSentiment, setCustomerSentiment] = useState<'negative' | 'neutral' | 'positive'>('negative');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
    const positiveWords = ['good', 'great', 'excellent', 'thanks', 'helpful', 'solved', 'better', 'fixed', 'working', 'satisfied', 'happy'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'worst', 'horrible', 'rubbish', 'poor', 'broken', 'useless', 'disappointed'];
    
    const lowerText = text.toLowerCase();
    const hasPositive = positiveWords.some(word => lowerText.includes(word));
    const hasNegative = negativeWords.some(word => lowerText.includes(word));
    
    if (hasPositive && !hasNegative) return 'positive';
    if (hasNegative && !hasPositive) return 'negative';
    return 'neutral';
  };

  const generateBotResponse = (userMessage: string, sentiment: 'positive' | 'negative' | 'neutral') => {
    const responses = {
      initial: {
        negative: [
          "I understand your frustration. Let me help you resolve this issue. Can you describe exactly what problems you're experiencing?",
          "I'm sorry to hear about your disappointing experience. Could you provide more details about what went wrong so I can assist you better?"
        ],
        neutral: [
          "Thank you for sharing your feedback. Could you help me understand what specific aspects of the product aren't meeting your expectations?",
          "I'd like to help improve your experience. What particular issues are you facing with the product?"
        ],
        positive: [
          "I'm glad to hear from you! Even though your initial review was concerning, it sounds like there might be some positive aspects. Could you tell me more?",
          "Thank you for taking the time to engage with us. What can I help you with regarding your product experience?"
        ]
      },
      understanding: {
        negative: [
          "That does sound frustrating. Let me see what I can do to help. Have you tried [specific troubleshooting step] yet?",
          "I completely understand why that would be disappointing. Let's work together to fix this issue. Can you try this solution..."
        ],
        neutral: [
          "I see what you mean. Let me suggest a few things that might help improve your experience with the product.",
          "Thank you for the clarification. Based on what you've described, here are some solutions we can try..."
        ],
        positive: [
          "That's encouraging to hear! It sounds like we're making progress. Is there anything else I can help you with?",
          "I'm happy that we're moving in the right direction. Let me know if you need any additional assistance."
        ]
      },
      resolving: {
        negative: [
          "I understand this is still not working as expected. Let me escalate this to our technical team and arrange a replacement for you.",
          "I apologize that the previous solution didn't work. I'm going to personally ensure this gets resolved for you today."
        ],
        neutral: [
          "I see. Let me try a different approach that might be more effective for your specific situation.",
          "Thank you for trying that. Let's explore another solution that might work better for you."
        ],
        positive: [
          "Excellent! I'm so glad we were able to resolve this for you. Is there anything else I can help you with today?",
          "That's wonderful to hear! Your experience is very important to us. Thank you for giving us the chance to make this right."
        ]
      }
    };

    const phaseResponses = responses[conversationPhase] || responses.initial;
    const sentimentResponses = phaseResponses[sentiment] || phaseResponses.neutral;
    return sentimentResponses[Math.floor(Math.random() * sentimentResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const sentiment = analyzeSentiment(inputMessage);
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
      sentiment
    };

    setMessages(prev => [...prev, userMessage]);

    // Update conversation state based on sentiment
    if (sentiment === 'positive' && conversationPhase !== 'resolved') {
      setConversationPhase('resolved');
      setCustomerSentiment('positive');
    } else if (sentiment === 'neutral' && customerSentiment === 'negative') {
      setCustomerSentiment('neutral');
      if (conversationPhase === 'initial') setConversationPhase('understanding');
    } else if (sentiment === 'negative') {
      if (conversationPhase === 'initial') setConversationPhase('understanding');
      else if (conversationPhase === 'understanding') setConversationPhase('resolving');
    }

    // Generate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        sender: 'bot',
        content: generateBotResponse(inputMessage, sentiment),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const getStatusColor = (sentiment: 'positive' | 'negative' | 'neutral') => {
    switch (sentiment) {
      case 'positive': return 'text-success bg-success/10 border-success/20';
      case 'negative': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted border-muted';
    }
  };

  const getPhaseLabel = (phase: string) => {
    switch (phase) {
      case 'initial': return 'Initial Contact';
      case 'understanding': return 'Understanding Issue';
      case 'resolving': return 'Resolving Problem';
      case 'resolved': return 'Issue Resolved';
      default: return phase;
    }
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
              <div className="w-8 h-8 bg-warning/20 border-2 border-warning rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">AI Recovery Bot</h1>
                <p className="text-sm text-muted-foreground">Customer sentiment recovery conversation</p>
              </div>
            </div>
            <Badge variant="secondary">Live Demo</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Conversation Status */}
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Conversation Status</CardTitle>
                  <CardDescription>Automated sentiment recovery in progress</CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Phase</p>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {getPhaseLabel(conversationPhase)}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">Sentiment</p>
                    <Badge className={getStatusColor(customerSentiment)}>
                      {customerSentiment.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span>Customer: Sarah M.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span>Product: Bluetooth Headphones</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                  <span>Issue: Product quality concerns</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-primary" />
              <span>AI Support Conversation</span>
            </CardTitle>
            <CardDescription>
              Real-time sentiment analysis and automated response generation
            </CardDescription>
          </CardHeader>
          
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' ? (
                      <Bot className="w-5 h-5 text-primary mt-0.5" />
                    ) : (
                      <User className="w-5 h-5 text-primary-foreground mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                        {message.sentiment && message.sender === 'user' && (
                          <Badge className={`text-xs ${getStatusColor(message.sentiment)}`}>
                            {message.sentiment}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-6 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder={conversationPhase === 'resolved' ? "Thank you for your help!" : "Type your response..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {conversationPhase === 'resolved' 
                ? "✓ Customer sentiment successfully recovered"
                : "AI is analyzing your response for sentiment and generating appropriate replies..."
              }
            </p>
          </div>
        </Card>

        {/* Conversation Summary */}
        {conversationPhase === 'resolved' && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-success">
                  <CheckCircle className="w-5 h-5" />
                  <span>Recovery Successful</span>
                </CardTitle>
                <CardDescription>
                  Customer sentiment has been successfully recovered from negative to positive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <h4 className="font-medium text-success mb-2">Initial Sentiment</h4>
                    <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                      NEGATIVE
                    </Badge>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <h4 className="font-medium text-primary mb-2">Messages Exchanged</h4>
                    <span className="text-2xl font-bold">{messages.length}</span>
                  </div>
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <h4 className="font-medium text-success mb-2">Final Sentiment</h4>
                    <Badge className="bg-success/10 text-success border-success/20">
                      POSITIVE
                    </Badge>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-4 border border-success/20">
                  <h4 className="font-medium text-foreground mb-2">Recovery Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    The AI bot successfully identified the customer's specific concerns, provided targeted solutions, 
                    and maintained empathetic communication throughout the conversation. Customer satisfaction 
                    was recovered through active listening and problem-solving approach.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};