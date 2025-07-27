import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  Brain, 
  Zap,
  Eye,
  TrendingUp,
  Database,
  Search,
  Gauge,
  Target,
  Activity,
  Users,
  MessageSquare,
  Globe,
  Lock,
  Smartphone
} from 'lucide-react';

interface AnalysisResult {
  text: string;
  prediction: 'real' | 'fake' | 'suspicious' | 'threat' | 'safe';
  confidence: number;
  reasons: string[];
  sentiment: string;
  keyPhrases: string[];
  crimeRisk?: number;
  scenarios?: string[];
  aiModel: string;
}

const mockResults: AnalysisResult[] = [
  {
    text: "Breaking: Scientists discover new method for renewable energy storage that could revolutionize the industry.",
    prediction: 'real',
    confidence: 92,
    reasons: ['Credible source format', 'Scientific terminology', 'Balanced reporting'],
    sentiment: 'neutral',
    keyPhrases: ['scientists', 'renewable energy', 'industry'],
    crimeRisk: 5,
    scenarios: ['Legitimate research publication', 'Industry announcement'],
    aiModel: 'BERT News Classifier'
  },
  {
    text: "URGENT: Aliens have landed in downtown New York and the government is hiding it from everyone!!",
    prediction: 'fake',
    confidence: 98,
    reasons: ['Sensational language', 'Conspiracy theory markers', 'Lack of credible sources'],
    sentiment: 'negative',
    keyPhrases: ['urgent', 'aliens', 'government hiding'],
    crimeRisk: 25,
    scenarios: ['Misinformation campaign', 'Social media manipulation', 'Public panic induction'],
    aiModel: 'RoBERTa Fake News Detector'
  }
];

const aiModels = [
  { id: 'news', name: 'News Authenticity (BERT)', icon: <Shield className="w-4 h-4" /> },
  { id: 'crime', name: 'Crime Prediction (RoBERTa)', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'sentiment', name: 'Sentiment Analysis (DistilBERT)', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'hate', name: 'Hate Speech Detection (ALBERT)', icon: <Users className="w-4 h-4" /> },
  { id: 'cyber', name: 'Cybercrime Analysis (T5)', icon: <Lock className="w-4 h-4" /> },
  { id: 'social', name: 'Social Media Threats (GPT-3.5)', icon: <Smartphone className="w-4 h-4" /> }
];

export default function Index() {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('news');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with longer delay for more realistic feel
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Enhanced analysis based on selected model and input
    const isSuspicious = inputText.toLowerCase().includes('urgent') || 
                        inputText.toLowerCase().includes('breaking') ||
                        inputText.includes('!!') ||
                        inputText.toLowerCase().includes('government') ||
                        inputText.toLowerCase().includes('conspiracy');
    
    const isCriminal = inputText.toLowerCase().includes('hack') ||
                      inputText.toLowerCase().includes('steal') ||
                      inputText.toLowerCase().includes('threat') ||
                      inputText.toLowerCase().includes('kill') ||
                      inputText.toLowerCase().includes('bomb');

    let prediction: AnalysisResult['prediction'] = 'safe';
    let crimeRisk = Math.floor(Math.random() * 20) + 5;
    let scenarios: string[] = ['Normal social media activity'];
    let aiModel = aiModels.find(m => m.id === selectedModel)?.name || 'BERT';

    if (isCriminal) {
      prediction = 'threat';
      crimeRisk = Math.floor(Math.random() * 30) + 70;
      scenarios = [
        'Potential cybercrime planning',
        'Criminal network communication',
        'Threat assessment required',
        'Law enforcement notification needed'
      ];
    } else if (isSuspicious) {
      prediction = selectedModel === 'news' ? 'fake' : 'suspicious';
      crimeRisk = Math.floor(Math.random() * 40) + 30;
      scenarios = [
        'Misinformation spread',
        'Social manipulation campaign',
        'Public opinion influence',
        'Platform moderation review needed'
      ];
    } else {
      crimeRisk = Math.floor(Math.random() * 15) + 5;
      scenarios = [
        'Legitimate content sharing',
        'Normal user interaction',
        'Educational or informational content'
      ];
    }
    
    const result: AnalysisResult = {
      text: inputText,
      prediction,
      confidence: Math.floor(Math.random() * 20) + 75,
      reasons: isCriminal 
        ? ['Criminal language patterns', 'Threat indicators', 'Behavioral analysis']
        : isSuspicious 
        ? ['Sensational language detected', 'Emotional manipulation', 'Urgency markers']
        : ['Neutral tone', 'Factual structure', 'Credible phrasing'],
      sentiment: isCriminal ? 'threatening' : isSuspicious ? 'negative' : 'neutral',
      keyPhrases: inputText.split(' ').slice(0, 3),
      crimeRisk,
      scenarios,
      aiModel
    };
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'real':
      case 'safe': return 'success';
      case 'fake': return 'danger';
      case 'threat': return 'destructive';
      case 'suspicious': return 'warning';
      default: return 'muted';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return 'destructive';
    if (risk >= 40) return 'warning';
    if (risk >= 20) return 'secondary';
    return 'success';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-neural/20 rounded-full blur-3xl"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-neural/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="border-b border-border/50 backdrop-blur-sm relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-neural-dark flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TruthGuard AI</h1>
                <p className="text-sm text-muted-foreground">Advanced AI Crime & Misinformation Detection</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-sm text-foreground font-medium">
                  Home
                </Link>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link to="/explainable-ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Explainable AI
                </Link>
                <Link to="/crime-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Crime Analysis
                </Link>
              </nav>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Badge variant="outline" className="bg-neural/10 border-neural">
                  <Brain className="w-3 h-3 mr-1" />
                  6 AI Models
                </Badge>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-4 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Multi-Model AI Security Platform
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Advanced NLP models for fake news detection, crime prediction, sentiment analysis, and social media threat assessment
          </motion.p>
        </motion.div>

        {/* AI Models Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {aiModels.map((model, index) => (
            <motion.div
              key={model.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
            >
              <Card className="text-center p-4 cursor-pointer hover:bg-muted/20 transition-colors">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 text-primary">{model.icon}</div>
                  <p className="text-xs font-medium">{model.name}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Analysis Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <Card className="max-w-4xl mx-auto border-border/50 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-neural/5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Multi-Model AI Analysis</span>
              </CardTitle>
              <CardDescription>
                Select an AI model and analyze text for authenticity, threats, sentiment, and crime risk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">AI Model</label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center space-x-2">
                            {model.icon}
                            <span>{model.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Enter text to analyze for authenticity, threats, sentiment, or crime risk..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[100px] resize-none"
                  style={{ minHeight: '100px' }}
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={analyzeText}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-primary to-neural-dark hover:from-primary/90 hover:to-neural-dark/90"
                    size="lg"
                  >
                    <AnimatePresence mode="wait">
                      {isAnalyzing ? (
                        <motion.div
                          key="analyzing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Analyzing with AI...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="analyze"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Analyze with AI
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>

              {/* Enhanced Results */}
              <AnimatePresence>
                {analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 p-6 rounded-lg border border-border/50 bg-card/50 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          {analysisResult.prediction === 'real' || analysisResult.prediction === 'safe' ? (
                            <CheckCircle className="w-6 h-6 text-success" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-danger" />
                          )}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Prediction: {analysisResult.prediction.toUpperCase()}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Model: {analysisResult.aiModel} • Confidence: {analysisResult.confidence}%
                          </p>
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <Badge 
                          variant="outline" 
                          className={`${getPredictionColor(analysisResult.prediction)} border-current`}
                        >
                          {analysisResult.prediction}
                        </Badge>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Progress 
                        value={analysisResult.confidence} 
                        className="h-2"
                      />
                    </motion.div>

                    {/* Crime Risk Assessment */}
                    {analysisResult.crimeRisk && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="p-4 rounded-lg bg-muted/20 border border-border/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground flex items-center">
                            <Gauge className="w-4 h-4 mr-1" />
                            Crime Risk Assessment
                          </h4>
                          <Badge variant="outline" className={`${getRiskColor(analysisResult.crimeRisk)} border-current`}>
                            {analysisResult.crimeRisk}% Risk
                          </Badge>
                        </div>
                        <Progress value={analysisResult.crimeRisk} className="h-2" />
                      </motion.div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      >
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          Analysis Factors
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.reasons.map((reason, index) => (
                            <motion.li 
                              key={index} 
                              className="text-sm text-muted-foreground flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                            >
                              <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                              {reason}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        <h4 className="font-medium text-foreground mb-2">Key Phrases</h4>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.keyPhrases.map((phrase, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                            >
                              <Badge variant="secondary" className="text-xs">
                                {phrase}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Scenario Analysis */}
                    {analysisResult.scenarios && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1 }}
                        className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-neural/5 border border-primary/20"
                      >
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          Potential Scenarios
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.scenarios.map((scenario, index) => (
                            <motion.li 
                              key={index} 
                              className="text-sm text-muted-foreground flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 1.1 + index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-primary to-neural rounded-full mr-2" />
                              {scenario}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Access with animations */}
        <motion.div 
          className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-gradient-to-br from-neural/10 to-primary/10 border-neural/20 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neural/10 to-primary/10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Analytics Dashboard</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      View detailed model performance metrics, confusion matrices, and real-time monitoring
                    </p>
                    <Link to="/dashboard">
                      <Button variant="outline" className="border-neural/40 hover:bg-neural/10">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Dashboard
                      </Button>
                    </Link>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <BarChart3 className="w-12 h-12 text-neural/40" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Card className="bg-gradient-to-br from-primary/10 to-neural/10 border-primary/20 overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-neural/10"
                animate={{ opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Explainable AI</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Understand model decisions with SHAP, LIME, and feature importance analysis
                    </p>
                    <Link to="/explainable-ai">
                      <Button variant="outline" className="border-primary/40 hover:bg-primary/10">
                        <Eye className="w-4 h-4 mr-2" />
                        Explore XAI
                      </Button>
                    </Link>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Eye className="w-12 h-12 text-primary/40" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Live Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          {[
            { icon: <Activity className="w-6 h-6" />, label: "Live Analyses", value: "2,847", change: "+15%" },
            { icon: <Shield className="w-6 h-6" />, label: "Threats Blocked", value: "1,203", change: "+8%" },
            { icon: <Brain className="w-6 h-6" />, label: "AI Models", value: "6", change: "Active" },
            { icon: <Globe className="w-6 h-6" />, label: "Global Coverage", value: "24/7", change: "Online" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
            >
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  <div className="text-xs text-success mt-1">{stat.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer 
        className="border-t border-border/50 mt-16 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>TruthGuard AI - Advanced Multi-Model AI Security Platform</p>
          <p className="text-sm mt-2">BERT • RoBERTa • ALBERT • DistilBERT • T5 • GPT-3.5</p>
        </div>
      </motion.footer>
    </div>
  );
}