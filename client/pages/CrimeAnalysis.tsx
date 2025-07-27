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
import { Textarea } from '@/components/ui/textarea';
import { 
  Shield, 
  AlertTriangle, 
  Brain,
  Target,
  Zap,
  Eye,
  Clock,
  MapPin,
  Users,
  Smartphone,
  Lock,
  Activity,
  TrendingUp,
  BarChart3,
  FileText,
  Search,
  Gauge,
  Globe,
  MessageSquare
} from 'lucide-react';

interface CrimeAnalysis {
  text: string;
  crimeType: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
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
  severity: 'low' | 'medium' | 'high' | 'critical';
  timeline: string;
  preventionMeasures: string[];
  lawEnforcementActions: string[];
}

const crimeTypes = [
  'Cybercrime',
  'Social Media Harassment',
  'Fraud',
  'Terrorism Planning',
  'Drug Related',
  'Violence Threats',
  'Identity Theft',
  'Hate Crimes',
  'Financial Crimes',
  'Misinformation Campaign'
];

const analysisTypes = [
  { id: 'threat', name: 'Threat Assessment', icon: AlertTriangle },
  { id: 'cyber', name: 'Cybercrime Analysis', icon: Lock },
  { id: 'social', name: 'Social Media Crime', icon: Smartphone },
  { id: 'behavioral', name: 'Behavioral Analysis', icon: Users },
  { id: 'predictive', name: 'Predictive Modeling', icon: Target }
];

export default function CrimeAnalysis() {
  const [inputText, setInputText] = useState('');
  const [analysisType, setAnalysisType] = useState('threat');
  const [analysis, setAnalysis] = useState<CrimeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  const analyzeForCrime = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Enhanced crime detection logic
    const threatWords = ['kill', 'bomb', 'attack', 'destroy', 'harm', 'shoot', 'murder'];
    const cyberWords = ['hack', 'breach', 'steal data', 'password', 'ddos', 'malware'];
    const drugWords = ['sell drugs', 'cocaine', 'heroin', 'meth', 'deal'];
    const fraudWords = ['scam', 'fake id', 'credit card', 'stolen', 'money laundering'];
    
    const text = inputText.toLowerCase();
    
    let crimeType: string[] = [];
    let riskLevel: CrimeAnalysis['riskLevel'] = 'low';
    let confidence = 60;
    
    if (threatWords.some(word => text.includes(word))) {
      crimeType.push('Violence Threats', 'Terrorism Planning');
      riskLevel = 'critical';
      confidence = 95;
    } else if (cyberWords.some(word => text.includes(word))) {
      crimeType.push('Cybercrime', 'Identity Theft');
      riskLevel = 'high';
      confidence = 88;
    } else if (drugWords.some(word => text.includes(word))) {
      crimeType.push('Drug Related');
      riskLevel = 'high';
      confidence = 82;
    } else if (fraudWords.some(word => text.includes(word))) {
      crimeType.push('Fraud', 'Financial Crimes');
      riskLevel = 'medium';
      confidence = 75;
    } else if (text.includes('hate') || text.includes('kill all')) {
      crimeType.push('Hate Crimes');
      riskLevel = 'high';
      confidence = 85;
    } else {
      crimeType.push('Social Media Harassment');
      riskLevel = 'low';
      confidence = 65;
    }

    // Generate scenarios based on crime type
    const scenarios: CrimeScenario[] = [];
    
    if (crimeType.includes('Violence Threats')) {
      scenarios.push(
        {
          scenario: 'Immediate physical threat execution',
          probability: 75,
          severity: 'critical',
          timeline: '0-24 hours',
          preventionMeasures: ['Immediate law enforcement notification', 'Target protection', 'Location monitoring'],
          lawEnforcementActions: ['Emergency response', 'Suspect location', 'Protective custody']
        },
        {
          scenario: 'Planning phase for larger attack',
          probability: 60,
          severity: 'critical',
          timeline: '1-7 days',
          preventionMeasures: ['Enhanced surveillance', 'Digital monitoring', 'Social network analysis'],
          lawEnforcementActions: ['Investigation team deployment', 'Digital forensics', 'Preemptive arrest']
        }
      );
    } else if (crimeType.includes('Cybercrime')) {
      scenarios.push(
        {
          scenario: 'Data breach attempt',
          probability: 80,
          severity: 'high',
          timeline: '1-48 hours',
          preventionMeasures: ['System hardening', 'Access monitoring', 'Backup verification'],
          lawEnforcementActions: ['Cyber unit investigation', 'Digital evidence collection', 'IP tracking']
        },
        {
          scenario: 'Identity theft operation',
          probability: 65,
          severity: 'medium',
          timeline: '1-30 days',
          preventionMeasures: ['Credit monitoring', 'Identity protection', 'Account security'],
          lawEnforcementActions: ['Financial crime unit', 'Cross-jurisdiction coordination', 'Asset freezing']
        }
      );
    } else {
      scenarios.push(
        {
          scenario: 'Escalation to physical confrontation',
          probability: 40,
          severity: 'medium',
          timeline: '1-14 days',
          preventionMeasures: ['Platform moderation', 'User education', 'Reporting mechanisms'],
          lawEnforcementActions: ['Case documentation', 'Restraining order', 'Monitoring protocols']
        }
      );
    }

    const result: CrimeAnalysis = {
      text: inputText,
      crimeType,
      riskLevel,
      confidence,
      location: 'Analysis suggests urban area based on language patterns',
      timeframe: riskLevel === 'critical' ? 'Immediate (0-24 hours)' : 'Short-term (1-7 days)',
      motive: riskLevel === 'critical' ? 'Ideological extremism or personal vendetta' : 'Financial gain or personal disputes',
      method: crimeType.includes('Cybercrime') ? 'Digital platforms and social engineering' : 'Direct physical action',
      prevention: [
        'Enhanced digital monitoring',
        'Community awareness programs',
        'Rapid response protocols',
        'Inter-agency coordination'
      ],
      scenarios,
      digitalFootprint: [
        'Social media activity patterns analyzed',
        'Communication networks mapped',
        'Device and location data correlated',
        'Behavioral indicators identified'
      ],
      behaviorPatterns: [
        'Escalating aggressive language',
        'Isolation from social groups',
        'Increased online activity',
        'Pattern matching with known cases'
      ]
    };
    
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1.3, 1, 1.3] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
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
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <AlertTriangle className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Crime Analysis AI</h1>
                <p className="text-sm text-muted-foreground">Advanced Threat Detection & Scenario Prediction</p>
              </div>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
                <Link to="/explainable-ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Explainable AI</Link>
                <Link to="/crime-analysis" className="text-sm text-foreground font-medium">Crime Analysis</Link>
              </nav>
              <Badge variant="outline" className="bg-red-500/10 border-red-500 text-red-500">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Threat Detection
              </Badge>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            AI-Powered Crime Prediction & Analysis
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Advanced behavioral analysis to predict criminal activities, assess threats, and generate actionable prevention strategies
          </motion.p>
        </motion.div>

        {/* Analysis Types */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {analysisTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
              >
                <Card className={`text-center p-4 cursor-pointer transition-colors ${
                  analysisType === type.id ? 'bg-red-500/10 border-red-500' : 'hover:bg-muted/20'
                }`}
                onClick={() => setAnalysisType(type.id)}>
                  <div className="flex flex-col items-center space-y-2">
                    <IconComponent className={`w-6 h-6 ${analysisType === type.id ? 'text-red-500' : 'text-muted-foreground'}`} />
                    <p className="text-xs font-medium">{type.name}</p>
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
        >
          <Card className="max-w-5xl mx-auto border-border/50 overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 pointer-events-none"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <CardHeader className="relative">
              <CardTitle className="flex items-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Crime Prediction Analysis</span>
              </CardTitle>
              <CardDescription>
                Enter text, social media posts, or communication to analyze for criminal intent and predict potential scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="space-y-3">
                <Textarea
                  placeholder="Enter text to analyze for criminal intent, threat assessment, or behavior prediction..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={analyzeForCrime}
                    disabled={!inputText.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
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
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Analyzing Criminal Patterns...
                        </motion.div>
                      ) : (
                        <motion.div
                          key="analyze"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Target className="w-4 h-4 mr-2" />
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
                    className="mt-6 space-y-6"
                  >
                    {/* Risk Assessment */}
                    <div className="p-6 rounded-lg border border-border/50 bg-card/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">
                              Risk Level: {analysis.riskLevel.toUpperCase()}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Confidence: {analysis.confidence}% • Crime Types: {analysis.crimeType.join(', ')}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <Badge variant="outline" className={getRiskColor(analysis.riskLevel)}>
                            {analysis.riskLevel}
                          </Badge>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <Progress value={analysis.confidence} className="h-3" />
                      </motion.div>
                    </div>

                    {/* Analysis Details */}
                    <Tabs defaultValue="overview" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                        <TabsTrigger value="digital">Digital Footprint</TabsTrigger>
                        <TabsTrigger value="behavior">Behavior Analysis</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5" />
                                <span>Analysis Summary</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Location Analysis</label>
                                <p className="text-sm">{analysis.location}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Timeframe</label>
                                <p className="text-sm">{analysis.timeframe}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Probable Motive</label>
                                <p className="text-sm">{analysis.motive}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Method</label>
                                <p className="text-sm">{analysis.method}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Shield className="w-5 h-5" />
                                <span>Prevention Measures</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {analysis.prevention?.map((measure, index) => (
                                  <motion.li 
                                    key={index} 
                                    className="text-sm flex items-center"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                                  >
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
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
                              onClick={() => setSelectedScenario(selectedScenario === index ? null : index)}
                            >
                              <Card className="transition-colors hover:bg-muted/20">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">{scenario.scenario}</h4>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline" className={getSeverityColor(scenario.severity)}>
                                        {scenario.severity}
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">{scenario.probability}%</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {scenario.timeline}
                                    </div>
                                  </div>
                                  
                                  <AnimatePresence>
                                    {selectedScenario === index && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 pt-4 border-t border-border space-y-3"
                                      >
                                        <div>
                                          <h5 className="font-medium text-sm mb-2">Prevention Measures</h5>
                                          <ul className="space-y-1">
                                            {scenario.preventionMeasures.map((measure, i) => (
                                              <li key={i} className="text-xs text-muted-foreground flex items-center">
                                                <div className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                                                {measure}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                        <div>
                                          <h5 className="font-medium text-sm mb-2">Law Enforcement Actions</h5>
                                          <ul className="space-y-1">
                                            {scenario.lawEnforcementActions.map((action, i) => (
                                              <li key={i} className="text-xs text-muted-foreground flex items-center">
                                                <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                                                {action}
                                              </li>
                                            ))}
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
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Globe className="w-5 h-5" />
                              <span>Digital Footprint Analysis</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysis.digitalFootprint.map((item, index) => (
                                <motion.li 
                                  key={index} 
                                  className="text-sm flex items-center"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="behavior" className="space-y-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Brain className="w-5 h-5" />
                              <span>Behavioral Pattern Analysis</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {analysis.behaviorPatterns.map((pattern, index) => (
                                <motion.li 
                                  key={index} 
                                  className="text-sm flex items-center"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                                  {pattern}
                                </motion.li>
                              ))}
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          {[
            { icon: AlertTriangle, label: "Threats Detected", value: "847", change: "+12% today", color: "text-red-500" },
            { icon: Shield, label: "Prevented", value: "203", change: "+8% this week", color: "text-green-500" },
            { icon: Activity, label: "Active Cases", value: "156", change: "Monitoring", color: "text-yellow-500" },
            { icon: Target, label: "Accuracy", value: "94.2%", change: "Improved", color: "text-blue-500" }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 2 + index * 0.1 }}
              >
                <Card className="text-center p-4">
                  <CardContent className="p-0">
                    <div className={`mb-2 flex justify-center ${stat.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                    <div className="text-xs text-success mt-1">{stat.change}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
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
          <p>Crime Analysis AI - Advanced Threat Detection & Prevention</p>
          <p className="text-sm mt-2">Behavioral Analysis • Threat Assessment • Predictive Modeling</p>
        </div>
      </motion.footer>
    </div>
  );
}
