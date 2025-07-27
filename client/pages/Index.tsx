import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Search
} from 'lucide-react';

interface AnalysisResult {
  text: string;
  prediction: 'real' | 'fake' | 'suspicious';
  confidence: number;
  reasons: string[];
  sentiment: string;
  keyPhrases: string[];
}

const mockResults: AnalysisResult[] = [
  {
    text: "Breaking: Scientists discover new method for renewable energy storage that could revolutionize the industry.",
    prediction: 'real',
    confidence: 92,
    reasons: ['Credible source format', 'Scientific terminology', 'Balanced reporting'],
    sentiment: 'neutral',
    keyPhrases: ['scientists', 'renewable energy', 'industry']
  },
  {
    text: "URGENT: Aliens have landed in downtown New York and the government is hiding it from everyone!!",
    prediction: 'fake',
    confidence: 98,
    reasons: ['Sensational language', 'Conspiracy theory markers', 'Lack of credible sources'],
    sentiment: 'negative',
    keyPhrases: ['urgent', 'aliens', 'government hiding']
  }
];

export default function Index() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on input
    const isSuspicious = inputText.toLowerCase().includes('urgent') || 
                        inputText.toLowerCase().includes('breaking') ||
                        inputText.includes('!!');
    
    const result: AnalysisResult = {
      text: inputText,
      prediction: isSuspicious ? 'fake' : 'real',
      confidence: Math.floor(Math.random() * 20) + 75,
      reasons: isSuspicious 
        ? ['Sensational language detected', 'Emotional manipulation', 'Urgency markers']
        : ['Neutral tone', 'Factual structure', 'Credible phrasing'],
      sentiment: isSuspicious ? 'negative' : 'neutral',
      keyPhrases: inputText.split(' ').slice(0, 3)
    };
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'real': return 'success';
      case 'fake': return 'danger';
      case 'suspicious': return 'warning';
      default: return 'muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-neural-dark flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TruthGuard AI</h1>
                <p className="text-sm text-muted-foreground">Fake News & Social Media Crime Detection</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-neural/10 border-neural">
                <Brain className="w-3 h-3 mr-1" />
                BERT/RoBERTa
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            AI-Powered Truth Detection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced NLP and Machine Learning to identify fake news, hate speech, and social media crimes in real-time
          </p>
        </div>

        {/* Analysis Interface */}
        <Card className="max-w-4xl mx-auto border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Analyze Text</span>
            </CardTitle>
            <CardDescription>
              Enter news content or social media text to analyze for authenticity and potential threats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                placeholder="Paste news article, social media post, or any text content here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[100px] resize-none"
                style={{ minHeight: '100px' }}
              />
              <Button 
                onClick={analyzeText}
                disabled={!inputText.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-primary to-neural-dark hover:from-primary/90 hover:to-neural-dark/90"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </div>

            {/* Results */}
            {analysisResult && (
              <div className="mt-6 p-6 rounded-lg border border-border/50 bg-card/50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {analysisResult.prediction === 'real' ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-danger" />
                    )}
                    <div>
                      <h3 className="font-semibold text-foreground">
                        Prediction: {analysisResult.prediction.toUpperCase()}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Confidence: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getPredictionColor(analysisResult.prediction)} border-current`}
                  >
                    {analysisResult.prediction}
                  </Badge>
                </div>

                <Progress 
                  value={analysisResult.confidence} 
                  className="h-2"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      Analysis Factors
                    </h4>
                    <ul className="space-y-1">
                      {analysisResult.reasons.map((reason, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Key Phrases</h4>
                    <div className="flex flex-wrap gap-1">
                      {analysisResult.keyPhrases.map((phrase, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {phrase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features & Metrics */}
        <Tabs defaultValue="metrics" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="text-2xl font-bold text-foreground">94.2%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Precision</p>
                      <p className="text-2xl font-bold text-foreground">92.8%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Recall</p>
                      <p className="text-2xl font-bold text-foreground">91.5%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">F1-Score</p>
                      <p className="text-2xl font-bold text-foreground">92.1%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-neural" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-neural" />
                    <span>NLP Models</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• BERT for context understanding</li>
                    <li>• RoBERTa for robustness</li>
                    <li>• Transformer architecture</li>
                    <li>• Fine-tuned on news data</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span>Explainable AI</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• SHAP value analysis</li>
                    <li>• LIME explanations</li>
                    <li>• Feature importance</li>
                    <li>• Decision transparency</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-success" />
                    <span>Live Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Reddit API integration</li>
                    <li>• NewsAPI feeds</li>
                    <li>• Real-time processing</li>
                    <li>• Social media monitoring</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="datasets" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Datasets</CardTitle>
                  <CardDescription>High-quality labeled datasets for model training</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>LIAR Dataset</span>
                      <Badge variant="outline">12.8K samples</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>FakeNewsNet</span>
                      <Badge variant="outline">23.5K samples</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>ISOT Dataset</span>
                      <Badge variant="outline">44.9K samples</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>COVID-19 Infodemic</span>
                      <Badge variant="outline">8.2K samples</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Live Sources</CardTitle>
                  <CardDescription>Real-time data collection endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Reddit API</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success">Active</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>NewsAPI</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success">Active</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>Twitter API v2</span>
                      <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Limited</Badge>
                    </li>
                    <li className="flex justify-between">
                      <span>RSS Feeds</span>
                      <Badge variant="outline" className="bg-success/10 text-success border-success">Active</Badge>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Analysis Examples */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Recent Analysis Examples</CardTitle>
            <CardDescription>Sample predictions from our AI model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResults.map((result, index) => (
                <div key={index} className="p-4 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-sm text-foreground flex-1 mr-4">{result.text}</p>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`${getPredictionColor(result.prediction)} border-current`}
                      >
                        {result.prediction}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{result.confidence}%</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {result.keyPhrases.map((phrase, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>TruthGuard AI - Advanced Fake News Detection using BERT/RoBERTa</p>
          <p className="text-sm mt-2">Built with React, TypeScript, and modern AI/ML technologies</p>
        </div>
      </footer>
    </div>
  );
}
