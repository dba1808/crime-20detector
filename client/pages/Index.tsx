import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Brain,
  Zap,
  Eye,
  Search,
  Gauge,
  Target,
  Activity,
  MessageSquare,
  Lock,
  Smartphone,
  Users,
  Globe,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface AnalysisResult {
  text: string;
  prediction: "real" | "fake" | "suspicious" | "threat" | "safe";
  confidence: number;
  reasons: string[];
  sentiment: string;
  keyPhrases: string[];
  crimeRisk?: number;
  scenarios?: string[];
  aiModel: string;
}

const aiModels = [
  {
    id: "news",
    name: "News Authenticity (BERT)",
    icon: Shield,
    description: "Detects fake news and misinformation",
  },
  {
    id: "crime",
    name: "Crime Prediction (RoBERTa)",
    icon: AlertTriangle,
    description: "Predicts criminal intent and behavior",
  },
  {
    id: "sentiment",
    name: "Sentiment Analysis (DistilBERT)",
    icon: MessageSquare,
    description: "Analyzes emotional tone and sentiment",
  },
  {
    id: "hate",
    name: "Hate Speech Detection (ALBERT)",
    icon: Users,
    description: "Identifies hate speech and harassment",
  },
  {
    id: "cyber",
    name: "Cybercrime Analysis (T5)",
    icon: Lock,
    description: "Detects cyber threats and attacks",
  },
  {
    id: "social",
    name: "Social Media Threats (GPT-3.5)",
    icon: Smartphone,
    description: "Monitors social media for threats",
  },
];

const realtimeStats = [
  {
    icon: Activity,
    label: "Live Analyses",
    value: "2,847",
    change: "+15%",
    color: "text-blue-500",
  },
  {
    icon: Shield,
    label: "Threats Blocked",
    value: "1,203",
    change: "+8%",
    color: "text-green-500",
  },
  {
    icon: Brain,
    label: "AI Models",
    value: "6",
    change: "Active",
    color: "text-purple-500",
  },
  {
    icon: Globe,
    label: "Global Coverage",
    value: "24/7",
    change: "Online",
    color: "text-orange-500",
  },
];

export default function Index() {
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState("news");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(realtimeStats);

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value:
            stat.label === "Live Analyses"
              ? (
                  parseInt(stat.value.replace(",", "")) +
                  Math.floor(Math.random() * 10)
                ).toLocaleString()
              : stat.value,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const analyzeText = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const isSuspicious =
      inputText.toLowerCase().includes("urgent") ||
      inputText.toLowerCase().includes("breaking") ||
      inputText.includes("!!") ||
      inputText.toLowerCase().includes("government") ||
      inputText.toLowerCase().includes("conspiracy");

    const isCriminal =
      inputText.toLowerCase().includes("hack") ||
      inputText.toLowerCase().includes("steal") ||
      inputText.toLowerCase().includes("threat") ||
      inputText.toLowerCase().includes("kill") ||
      inputText.toLowerCase().includes("bomb");

    let prediction: AnalysisResult["prediction"] = "safe";
    let crimeRisk = Math.floor(Math.random() * 20) + 5;
    let scenarios: string[] = ["Normal social media activity"];
    let aiModel = aiModels.find((m) => m.id === selectedModel)?.name || "BERT";

    if (isCriminal) {
      prediction = "threat";
      crimeRisk = Math.floor(Math.random() * 30) + 70;
      scenarios = [
        "Potential cybercrime planning",
        "Criminal network communication",
        "Threat assessment required",
        "Law enforcement notification needed",
      ];
    } else if (isSuspicious) {
      prediction = selectedModel === "news" ? "fake" : "suspicious";
      crimeRisk = Math.floor(Math.random() * 40) + 30;
      scenarios = [
        "Misinformation spread",
        "Social manipulation campaign",
        "Public opinion influence",
        "Platform moderation review needed",
      ];
    }

    const result: AnalysisResult = {
      text: inputText,
      prediction,
      confidence: Math.floor(Math.random() * 20) + 75,
      reasons: isCriminal
        ? [
            "Criminal language patterns",
            "Threat indicators",
            "Behavioral analysis",
          ]
        : isSuspicious
          ? [
              "Sensational language detected",
              "Emotional manipulation",
              "Urgency markers",
            ]
          : ["Neutral tone", "Factual structure", "Credible phrasing"],
      sentiment: isCriminal
        ? "threatening"
        : isSuspicious
          ? "negative"
          : "neutral",
      keyPhrases: inputText.split(" ").slice(0, 3),
      crimeRisk,
      scenarios,
      aiModel,
    };

    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case "real":
      case "safe":
        return "bg-green-500/10 border-green-500 text-green-500";
      case "fake":
        return "bg-red-500/10 border-red-500 text-red-500";
      case "threat":
        return "bg-red-600/10 border-red-600 text-red-600";
      case "suspicious":
        return "bg-yellow-500/10 border-yellow-500 text-yellow-500";
      default:
        return "bg-muted/10 border-muted text-muted";
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "bg-red-600/10 border-red-600 text-red-600";
    if (risk >= 40) return "bg-yellow-500/10 border-yellow-500 text-yellow-500";
    if (risk >= 20) return "bg-blue-500/10 border-blue-500 text-blue-500";
    return "bg-green-500/10 border-green-500 text-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-primary/20 to-neural/20 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-neural/20 to-primary/20 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="border-b border-border/50 backdrop-blur-sm relative z-10 sticky top-0"
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
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-neural-dark flex items-center justify-center group cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground group-hover:drop-shadow-lg transition-all duration-300" />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">
                  TruthGuard AI
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Advanced AI Crime & Misinformation Detection
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className="hidden lg:flex items-center space-x-6"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <nav className="flex items-center space-x-6">
                <Link
                  to="/"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative group"
                >
                  Home
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                    initial={{ scaleX: 1 }}
                    whileHover={{ scaleX: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  Dashboard
                  <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
                <Link
                  to="/explainable-ai"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  Explainable AI
                  <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
                <Link
                  to="/crime-analysis"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  Crime Analysis
                  <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
              </nav>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="outline"
                  className="bg-neural/10 border-neural text-neural hover:bg-neural/20 transition-all duration-200 cursor-pointer"
                >
                  <Brain className="w-3 h-3 mr-1" />6 AI Models
                </Badge>
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg hover:bg-muted/20 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pb-4 border-t border-border/50"
              >
                <nav className="flex flex-col space-y-4 pt-4">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/dashboard", label: "Dashboard" },
                    { to: "/explainable-ai", label: "Explainable AI" },
                    { to: "/crime-analysis", label: "Crime Analysis" },
                  ].map((link, index) => (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        className="block px-4 py-2 text-sm rounded-lg hover:bg-muted/20 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-4 py-8 sm:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Multi-Model AI Security Platform
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Advanced NLP models for fake news detection, crime prediction,
            sentiment analysis, and social media threat assessment
          </motion.p>
        </motion.div>

        {/* AI Models Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {aiModels.map((model, index) => {
            const IconComponent = model.icon;
            const isSelected = selectedModel === model.id;
            return (
              <motion.div
                key={model.id}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              >
                <Card
                  className={`text-center p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:bg-muted/20 group ${
                    isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <IconComponent
                        className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                          isSelected
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary"
                        }`}
                      />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground">
                        {model.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                        {model.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Analysis Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="max-w-5xl mx-auto"
        >
          <Card className="border-border/50 overflow-hidden relative backdrop-blur-sm">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-neural/5 pointer-events-none"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Search className="w-5 h-5" />
                <span>Multi-Model AI Analysis</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Select an AI model and analyze text for authenticity, threats,
                sentiment, and crime risk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">AI Model</label>
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                  >
                    <SelectTrigger className="hover:bg-muted/20 transition-colors duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => {
                        const IconComponent = model.icon;
                        return (
                          <SelectItem
                            key={model.id}
                            value={model.id}
                            className="hover:bg-muted/20 transition-colors duration-200"
                          >
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span>{model.name}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <motion.div className="w-full" whileHover={{ scale: 1.02 }}>
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-2 bg-gradient-to-r from-primary/10 to-neural/10 border-primary/20 hover:from-primary/20 hover:to-neural/20 transition-all duration-300 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      {
                        aiModels.find((m) => m.id === selectedModel)
                          ?.description
                      }
                    </Badge>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-3">
                <Input
                  placeholder="Enter text to analyze for authenticity, threats, sentiment, or crime risk..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[100px] sm:min-h-[120px] resize-none hover:bg-muted/10 focus:bg-muted/20 transition-all duration-200"
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button
                    onClick={analyzeText}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-primary to-neural-dark hover:from-primary/90 hover:to-neural-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 group relative overflow-hidden"
                    size="lg"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <AnimatePresence mode="wait">
                      {isAnalyzing ? (
                        <motion.div
                          key="analyzing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center relative z-10"
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Analyzing with AI...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="analyze"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center relative z-10"
                        >
                          <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
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
                    className="mt-6 p-4 sm:p-6 rounded-lg border border-border/50 bg-card/50 space-y-4 backdrop-blur-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.2,
                            type: "spring",
                            stiffness: 400,
                          }}
                        >
                          {analysisResult.prediction === "real" ||
                          analysisResult.prediction === "safe" ? (
                            <CheckCircle className="w-6 h-6 text-green-500 drop-shadow-lg" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-red-500 drop-shadow-lg" />
                          )}
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm sm:text-base">
                            Prediction:{" "}
                            {analysisResult.prediction.toUpperCase()}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Model: {analysisResult.aiModel} • Confidence:{" "}
                            {analysisResult.confidence}%
                          </p>
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3,
                          type: "spring",
                          stiffness: 400,
                        }}
                      >
                        <Badge
                          variant="outline"
                          className={getPredictionColor(
                            analysisResult.prediction,
                          )}
                        >
                          {analysisResult.prediction}
                        </Badge>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <Progress
                        value={analysisResult.confidence}
                        className="h-2 sm:h-3"
                      />
                    </motion.div>

                    {/* Crime Risk Assessment */}
                    {analysisResult.crimeRisk && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="p-3 sm:p-4 rounded-lg bg-muted/20 border border-border/30"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h4 className="font-medium text-foreground flex items-center text-sm sm:text-base">
                            <Gauge className="w-4 h-4 mr-1" />
                            Crime Risk Assessment
                          </h4>
                          <Badge
                            variant="outline"
                            className={getRiskColor(analysisResult.crimeRisk)}
                          >
                            {analysisResult.crimeRisk}% Risk
                          </Badge>
                        </div>
                        <Progress
                          value={analysisResult.crimeRisk}
                          className="h-2"
                        />
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      >
                        <h4 className="font-medium text-foreground mb-2 flex items-center text-sm sm:text-base">
                          <Eye className="w-4 h-4 mr-1" />
                          Analysis Factors
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.reasons.map((reason, index) => (
                            <motion.li
                              key={index}
                              className="text-xs sm:text-sm text-muted-foreground flex items-center"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.8 + index * 0.1,
                              }}
                            >
                              <div className="w-1 h-1 bg-primary rounded-full mr-2 flex-shrink-0" />
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
                        <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">
                          Key Phrases
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {analysisResult.keyPhrases.map((phrase, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.9 + index * 0.1,
                                type: "spring",
                                stiffness: 400,
                              }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-xs hover:bg-secondary/80 transition-colors duration-200 cursor-pointer"
                              >
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
                        className="p-3 sm:p-4 rounded-lg bg-gradient-to-r from-primary/5 to-neural/5 border border-primary/20"
                      >
                        <h4 className="font-medium text-foreground mb-2 flex items-center text-sm sm:text-base">
                          <Target className="w-4 h-4 mr-1" />
                          Potential Scenarios
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.scenarios.map((scenario, index) => (
                            <motion.li
                              key={index}
                              className="text-xs sm:text-sm text-muted-foreground flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 1.1 + index * 0.1,
                              }}
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-primary to-neural rounded-full mr-2 mt-1 flex-shrink-0" />
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

        {/* Live Stats with enhanced animations */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          {animatedStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
              >
                <Card className="text-center p-3 sm:p-4 hover:bg-muted/10 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-0">
                    <motion.div
                      className={`mb-2 flex justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-lg" />
                    </motion.div>
                    <motion.div
                      className="text-xl sm:text-2xl font-bold text-foreground"
                      key={stat.value}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="text-xs text-green-500 mt-1 font-medium">
                      {stat.change}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Access with enhanced hover effects */}
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
              y: -5,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-gradient-to-br from-neural/10 to-primary/10 border-neural/20 overflow-hidden relative group cursor-pointer">
              <motion.div className="absolute inset-0 bg-gradient-to-r from-neural/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4 sm:p-6 relative">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                      Analytics Dashboard
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      View detailed model performance metrics, confusion
                      matrices, and real-time monitoring
                    </p>
                    <Link to="/dashboard">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="border-neural/40 hover:bg-neural/20 hover:border-neural/60 transition-all duration-300 group/btn"
                          size="sm"
                        >
                          <BarChart3 className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                          View Dashboard
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-neural/40" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.02,
              y: -5,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-neural/10 border-primary/20 overflow-hidden relative group cursor-pointer">
              <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-neural/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-4 sm:p-6 relative">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                      Explainable AI
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      Understand model decisions with SHAP, LIME, and feature
                      importance analysis
                    </p>
                    <Link to="/explainable-ai">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          className="border-primary/40 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 group/btn"
                          size="sm"
                        >
                          <Eye className="w-4 h-4 mr-2 group-hover/btn:animate-pulse" />
                          Explore XAI
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-primary/40" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      {/* Enhanced Footer */}
      <motion.footer
        className="border-t border-border/50 mt-12 sm:mt-16 relative z-10 bg-background/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center text-muted-foreground">
          <motion.p
            className="text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
          >
            TruthGuard AI - Advanced Multi-Model AI Security Platform
          </motion.p>
          <motion.p
            className="text-xs sm:text-sm mt-2"
            whileHover={{ scale: 1.05 }}
          >
            BERT • RoBERTa • ALBERT • DistilBERT • T5 • GPT-3.5
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
