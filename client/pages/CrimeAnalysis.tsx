import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  AlertTriangle,
  Brain,
  Target,
  Eye,
  Clock,
  MapPin,
  Users,
  Smartphone,
  Lock,
  Activity,
  BarChart3,
  Search,
  Gauge,
  Globe,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

interface CrimeAnalysis {
  text: string;
  crimeType: string[];
  riskLevel: "low" | "medium" | "high" | "critical";
  confidence: number;
  location?: string;
  timeframe?: string;
  motive?: string;
  method?: string;
  prevention?: string[];
  scenarios: CrimeScenario[];
  digitalFootprint: string[];
  behaviorPatterns: string[];
}

interface CrimeScenario {
  scenario: string;
  probability: number;
  severity: "low" | "medium" | "high" | "critical";
  timeline: string;
  preventionMeasures: string[];
  lawEnforcementActions: string[];
}

const analysisTypes = [
  {
    id: "threat",
    name: "Threat Assessment",
    icon: AlertTriangle,
    description: "Assess violence and threat levels",
  },
  {
    id: "cyber",
    name: "Cybercrime Analysis",
    icon: Lock,
    description: "Detect cyber attacks and breaches",
  },
  {
    id: "social",
    name: "Social Media Crime",
    icon: Smartphone,
    description: "Monitor social media threats",
  },
  {
    id: "behavioral",
    name: "Behavioral Analysis",
    icon: Users,
    description: "Analyze behavioral patterns",
  },
  {
    id: "predictive",
    name: "Predictive Modeling",
    icon: Target,
    description: "Predict criminal activities",
  },
];

export default function CrimeAnalysis() {
  const [inputText, setInputText] = useState("");
  const [analysisType, setAnalysisType] = useState("threat");
  const [analysis, setAnalysis] = useState<CrimeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const analyzeForCrime = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Enhanced crime detection logic
    const threatWords = [
      "kill",
      "bomb",
      "attack",
      "destroy",
      "harm",
      "shoot",
      "murder",
    ];
    const cyberWords = [
      "hack",
      "breach",
      "steal data",
      "password",
      "ddos",
      "malware",
    ];
    const drugWords = ["sell drugs", "cocaine", "heroin", "meth", "deal"];
    const fraudWords = [
      "scam",
      "fake id",
      "credit card",
      "stolen",
      "money laundering",
    ];

    const text = inputText.toLowerCase();

    let crimeType: string[] = [];
    let riskLevel: CrimeAnalysis["riskLevel"] = "low";
    let confidence = 60;

    if (threatWords.some((word) => text.includes(word))) {
      crimeType.push("Violence Threats", "Terrorism Planning");
      riskLevel = "critical";
      confidence = 95;
    } else if (cyberWords.some((word) => text.includes(word))) {
      crimeType.push("Cybercrime", "Identity Theft");
      riskLevel = "high";
      confidence = 88;
    } else if (drugWords.some((word) => text.includes(word))) {
      crimeType.push("Drug Related");
      riskLevel = "high";
      confidence = 82;
    } else if (fraudWords.some((word) => text.includes(word))) {
      crimeType.push("Fraud", "Financial Crimes");
      riskLevel = "medium";
      confidence = 75;
    } else if (text.includes("hate") || text.includes("kill all")) {
      crimeType.push("Hate Crimes");
      riskLevel = "high";
      confidence = 85;
    } else {
      crimeType.push("Social Media Harassment");
      riskLevel = "low";
      confidence = 65;
    }

    // Generate scenarios based on crime type
    const scenarios: CrimeScenario[] = [];

    if (crimeType.includes("Violence Threats")) {
      scenarios.push(
        {
          scenario: "Immediate physical threat execution",
          probability: 75,
          severity: "critical",
          timeline: "0-24 hours",
          preventionMeasures: [
            "Immediate law enforcement notification",
            "Target protection",
            "Location monitoring",
          ],
          lawEnforcementActions: [
            "Emergency response",
            "Suspect location",
            "Protective custody",
          ],
        },
        {
          scenario: "Planning phase for larger attack",
          probability: 60,
          severity: "critical",
          timeline: "1-7 days",
          preventionMeasures: [
            "Enhanced surveillance",
            "Digital monitoring",
            "Social network analysis",
          ],
          lawEnforcementActions: [
            "Investigation team deployment",
            "Digital forensics",
            "Preemptive arrest",
          ],
        },
      );
    } else if (crimeType.includes("Cybercrime")) {
      scenarios.push(
        {
          scenario: "Data breach attempt",
          probability: 80,
          severity: "high",
          timeline: "1-48 hours",
          preventionMeasures: [
            "System hardening",
            "Access monitoring",
            "Backup verification",
          ],
          lawEnforcementActions: [
            "Cyber unit investigation",
            "Digital evidence collection",
            "IP tracking",
          ],
        },
        {
          scenario: "Identity theft operation",
          probability: 65,
          severity: "medium",
          timeline: "1-30 days",
          preventionMeasures: [
            "Credit monitoring",
            "Identity protection",
            "Account security",
          ],
          lawEnforcementActions: [
            "Financial crime unit",
            "Cross-jurisdiction coordination",
            "Asset freezing",
          ],
        },
      );
    } else {
      scenarios.push({
        scenario: "Escalation to physical confrontation",
        probability: 40,
        severity: "medium",
        timeline: "1-14 days",
        preventionMeasures: [
          "Platform moderation",
          "User education",
          "Reporting mechanisms",
        ],
        lawEnforcementActions: [
          "Case documentation",
          "Restraining order",
          "Monitoring protocols",
        ],
      });
    }

    const result: CrimeAnalysis = {
      text: inputText,
      crimeType,
      riskLevel,
      confidence,
      location: "Analysis suggests urban area based on language patterns",
      timeframe:
        riskLevel === "critical"
          ? "Immediate (0-24 hours)"
          : "Short-term (1-7 days)",
      motive:
        riskLevel === "critical"
          ? "Ideological extremism or personal vendetta"
          : "Financial gain or personal disputes",
      method: crimeType.includes("Cybercrime")
        ? "Digital platforms and social engineering"
        : "Direct physical action",
      prevention: [
        "Enhanced digital monitoring",
        "Community awareness programs",
        "Rapid response protocols",
        "Inter-agency coordination",
      ],
      scenarios,
      digitalFootprint: [
        "Social media activity patterns analyzed",
        "Communication networks mapped",
        "Device and location data correlated",
        "Behavioral indicators identified",
      ],
      behaviorPatterns: [
        "Escalating aggressive language",
        "Isolation from social groups",
        "Increased online activity",
        "Pattern matching with known cases",
      ],
    };

    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "bg-red-600 text-white";
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600";
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1.3, 1, 1.3] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center group cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:drop-shadow-lg transition-all duration-300" />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">
                  Crime Analysis AI
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  Advanced Threat Detection & Scenario Prediction
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
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  Home
                  <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
                <Link
                  to="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  Dashboard
                  <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
                <Link
                  to="/explainable-ai"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                >
                  Explainable AI
                  <motion.div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
                <Link
                  to="/crime-analysis"
                  className="text-sm text-foreground font-medium relative"
                >
                  Crime Analysis
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 origin-left"
                    initial={{ scaleX: 1 }}
                    whileHover={{ scaleX: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </nav>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="outline"
                  className="bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Threat Detection
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
          className="text-center space-y-4 py-6 sm:py-8"
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
            AI-Powered Crime Prediction & Analysis
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Advanced behavioral analysis to predict criminal activities, assess
            threats, and generate actionable prevention strategies
          </motion.p>
        </motion.div>

        {/* Analysis Types */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {analysisTypes.map((type, index) => {
            const IconComponent = type.icon;
            const isSelected = analysisType === type.id;
            return (
              <motion.div
                key={type.id}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(239, 68, 68, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              >
                <Card
                  className={`text-center p-3 sm:p-4 cursor-pointer transition-all duration-300 group ${
                    isSelected
                      ? "bg-red-500/10 border-red-500 ring-2 ring-red-500/30"
                      : "hover:bg-muted/20 hover:shadow-lg"
                  }`}
                  onClick={() => setAnalysisType(type.id)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <IconComponent
                        className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                          isSelected
                            ? "text-red-500"
                            : "text-muted-foreground group-hover:text-red-500"
                        }`}
                      />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium">
                        {type.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Analysis Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="border-border/50 overflow-hidden relative backdrop-blur-sm">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 pointer-events-none"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Search className="w-5 h-5" />
                <span>Crime Prediction Analysis</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Enter text, social media posts, or communication to analyze for
                criminal intent and predict potential scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 relative">
              <div className="space-y-3">
                <Textarea
                  placeholder="Enter text to analyze for criminal intent, threat assessment, or behavior prediction..."
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
                    onClick={analyzeForCrime}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 group relative overflow-hidden"
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
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Analyzing Criminal Patterns...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="analyze"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center relative z-10"
                        >
                          <Target className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                          Analyze for Criminal Intent
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>

              {/* Results */}
              <AnimatePresence>
                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 space-y-4 sm:space-y-6"
                  >
                    {/* Risk Assessment */}
                    <div className="p-4 sm:p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
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
                            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 drop-shadow-lg" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                              Risk Level: {analysis.riskLevel.toUpperCase()}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Confidence: {analysis.confidence}% • Crime Types:{" "}
                              {analysis.crimeType.join(", ")}
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
                            className={getRiskColor(analysis.riskLevel)}
                          >
                            {analysis.riskLevel}
                          </Badge>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <Progress
                          value={analysis.confidence}
                          className="h-2 sm:h-3"
                        />
                      </motion.div>
                    </div>

                    {/* Analysis Details */}
                    <Tabs defaultValue="overview" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 text-xs sm:text-sm">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                        <TabsTrigger value="digital">Digital</TabsTrigger>
                        <TabsTrigger value="behavior">Behavior</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                          <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Analysis Summary</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm sm:text-base">
                              <div>
                                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                  Location Analysis
                                </label>
                                <p className="text-xs sm:text-sm">
                                  {analysis.location}
                                </p>
                              </div>
                              <div>
                                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                  Timeframe
                                </label>
                                <p className="text-xs sm:text-sm">
                                  {analysis.timeframe}
                                </p>
                              </div>
                              <div>
                                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                  Probable Motive
                                </label>
                                <p className="text-xs sm:text-sm">
                                  {analysis.motive}
                                </p>
                              </div>
                              <div>
                                <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                  Method
                                </label>
                                <p className="text-xs sm:text-sm">
                                  {analysis.method}
                                </p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Prevention Measures</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {analysis.prevention?.map((measure, index) => (
                                  <motion.li
                                    key={index}
                                    className="text-xs sm:text-sm flex items-start"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: 0.8 + index * 0.1,
                                    }}
                                  >
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1 flex-shrink-0" />
                                    {measure}
                                  </motion.li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>

                      <TabsContent value="scenarios" className="space-y-4">
                        <div className="grid gap-4">
                          {analysis.scenarios.map((scenario, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.2 }}
                              whileHover={{ scale: 1.02 }}
                              className="cursor-pointer"
                              onClick={() =>
                                setSelectedScenario(
                                  selectedScenario === index ? null : index,
                                )
                              }
                            >
                              <Card className="transition-all duration-300 hover:bg-muted/20 hover:shadow-lg">
                                <CardContent className="p-3 sm:p-4">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h4 className="font-medium text-sm sm:text-base">
                                      {scenario.scenario}
                                    </h4>
                                    <div className="flex items-center space-x-2">
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${getSeverityColor(scenario.severity)}`}
                                      >
                                        {scenario.severity}
                                      </Badge>
                                      <span className="text-xs sm:text-sm text-muted-foreground">
                                        {scenario.probability}%
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                      {scenario.timeline}
                                    </div>
                                  </div>

                                  <AnimatePresence>
                                    {selectedScenario === index && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 pt-4 border-t border-border space-y-3"
                                      >
                                        <div>
                                          <h5 className="font-medium text-xs sm:text-sm mb-2">
                                            Prevention Measures
                                          </h5>
                                          <ul className="space-y-1">
                                            {scenario.preventionMeasures.map(
                                              (measure, i) => (
                                                <li
                                                  key={i}
                                                  className="text-xs text-muted-foreground flex items-center"
                                                >
                                                  <div className="w-1 h-1 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                                                  {measure}
                                                </li>
                                              ),
                                            )}
                                          </ul>
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-xs sm:text-sm mb-2">
                                            Law Enforcement Actions
                                          </h5>
                                          <ul className="space-y-1">
                                            {scenario.lawEnforcementActions.map(
                                              (action, i) => (
                                                <li
                                                  key={i}
                                                  className="text-xs text-muted-foreground flex items-center"
                                                >
                                                  <div className="w-1 h-1 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                                                  {action}
                                                </li>
                                              ),
                                            )}
                                          </ul>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="digital" className="space-y-4">
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Digital Footprint Analysis</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysis.digitalFootprint.map((item, index) => (
                                <motion.li
                                  key={index}
                                  className="text-xs sm:text-sm flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                  }}
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-1 flex-shrink-0" />
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="behavior" className="space-y-4">
                        <Card className="hover:shadow-lg transition-shadow duration-300">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                              <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Behavioral Pattern Analysis</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysis.behaviorPatterns.map(
                                (pattern, index) => (
                                  <motion.li
                                    key={index}
                                    className="text-xs sm:text-sm flex items-start"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: index * 0.1,
                                    }}
                                  >
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-1 flex-shrink-0" />
                                    {pattern}
                                  </motion.li>
                                ),
                              )}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Crime Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          {[
            {
              icon: AlertTriangle,
              label: "Threats Detected",
              value: "847",
              change: "+12% today",
              color: "text-red-500",
            },
            {
              icon: Shield,
              label: "Prevented",
              value: "203",
              change: "+8% this week",
              color: "text-green-500",
            },
            {
              icon: Activity,
              label: "Active Cases",
              value: "156",
              change: "Monitoring",
              color: "text-yellow-500",
            },
            {
              icon: Target,
              label: "Accuracy",
              value: "94.2%",
              change: "Improved",
              color: "text-blue-500",
            },
          ].map((stat, index) => {
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
                    <div className="text-lg sm:text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
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
      </main>

      {/* Footer */}
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
            Crime Analysis AI - Advanced Threat Detection & Prevention
          </motion.p>
          <motion.p
            className="text-xs sm:text-sm mt-2"
            whileHover={{ scale: 1.05 }}
          >
            Behavioral Analysis • Threat Assessment • Predictive Modeling
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
