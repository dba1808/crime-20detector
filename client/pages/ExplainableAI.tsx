import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Brain, 
  BarChart3, 
  Lightbulb,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const sampleText = "BREAKING: Scientists have discovered a revolutionary new technology that can cure all diseases instantly! Government officials are trying to hide this miracle cure from the public. Share this before it gets deleted!";

const shapValues = [
  { word: "BREAKING:", importance: 0.85, type: "negative" },
  { word: "Scientists", importance: 0.12, type: "positive" },
  { word: "have", importance: 0.02, type: "neutral" },
  { word: "discovered", importance: 0.15, type: "positive" },
  { word: "revolutionary", importance: 0.45, type: "negative" },
  { word: "new", importance: 0.08, type: "neutral" },
  { word: "technology", importance: 0.18, type: "positive" },
  { word: "that", importance: 0.01, type: "neutral" },
  { word: "can", importance: 0.03, type: "neutral" },
  { word: "cure", importance: 0.25, type: "positive" },
  { word: "all", importance: 0.67, type: "negative" },
  { word: "diseases", importance: 0.22, type: "positive" },
  { word: "instantly!", importance: 0.89, type: "negative" },
  { word: "Government", importance: 0.71, type: "negative" },
  { word: "officials", importance: 0.34, type: "negative" },
  { word: "are", importance: 0.02, type: "neutral" },
  { word: "trying", importance: 0.28, type: "negative" },
  { word: "to", importance: 0.01, type: "neutral" },
  { word: "hide", importance: 0.78, type: "negative" },
  { word: "this", importance: 0.05, type: "neutral" },
  { word: "miracle", importance: 0.56, type: "negative" },
  { word: "cure", importance: 0.25, type: "positive" },
  { word: "from", importance: 0.12, type: "negative" },
  { word: "the", importance: 0.01, type: "neutral" },
  { word: "public.", importance: 0.33, type: "negative" },
  { word: "Share", importance: 0.82, type: "negative" },
  { word: "this", importance: 0.15, type: "negative" },
  { word: "before", importance: 0.43, type: "negative" },
  { word: "it", importance: 0.08, type: "neutral" },
  { word: "gets", importance: 0.31, type: "negative" },
  { word: "deleted!", importance: 0.91, type: "negative" }
];

const featureImportances = [
  { feature: "Sensational Language", importance: 0.92, description: "Words like 'BREAKING', 'instantly', 'miracle'" },
  { feature: "Conspiracy Markers", importance: 0.87, description: "References to government hiding information" },
  { feature: "Urgency Indicators", importance: 0.83, description: "Phrases like 'before it gets deleted'" },
  { feature: "Unrealistic Claims", importance: 0.79, description: "Claims about curing 'all diseases'" },
  { feature: "Call to Action", importance: 0.74, description: "Encouragement to share without verification" },
  { feature: "Emotional Manipulation", importance: 0.68, description: "Appeal to fear and excitement" },
  { feature: "Lack of Sources", importance: 0.61, description: "No credible references or citations" },
  { feature: "Grammatical Patterns", importance: 0.45, description: "Excessive punctuation and capitalization" }
];

const limeExplanation = {
  prediction: "fake",
  confidence: 0.94,
  topFeatures: [
    { feature: "Sensational words count", value: 8, impact: "+0.28" },
    { feature: "Conspiracy language", value: 1, impact: "+0.22" },
    { feature: "Urgency markers", value: 3, impact: "+0.19" },
    { feature: "Scientific credibility", value: 0.2, impact: "-0.15" },
    { feature: "Source references", value: 0, impact: "+0.12" }
  ]
};

export default function ExplainableAI() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("shap");

  const getWordColor = (word: any) => {
    if (word.type === "negative") {
      const intensity = Math.min(word.importance, 1);
      return `bg-red-500/20 border-red-500/40 hover:bg-red-500/30`;
    } else if (word.type === "positive") {
      const intensity = Math.min(word.importance, 1);
      return `bg-green-500/20 border-green-500/40 hover:bg-green-500/30`;
    }
    return `bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Explainable AI</h1>
              <p className="text-muted-foreground">Understanding model predictions with SHAP and LIME</p>
            </div>
            <Badge variant="outline" className="bg-neural/10 border-neural text-neural">
              <Brain className="w-3 h-3 mr-1" />
              XAI Module
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Sample Analysis */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Sample Text Analysis</span>
            </CardTitle>
            <CardDescription>Click on words to see their individual impact on the prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
                <div className="flex flex-wrap gap-1 leading-relaxed">
                  {shapValues.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedWord(word.word)}
                      className={`px-1 py-0.5 rounded border transition-colors ${getWordColor(word)} ${
                        selectedWord === word.word ? 'ring-2 ring-primary' : ''
                      }`}
                      title={`Impact: ${word.importance.toFixed(2)} (${word.type})`}
                    >
                      {word.word}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-danger/10 border border-danger/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-danger" />
                    <span className="font-medium">Prediction: FAKE</span>
                  </div>
                  <Badge variant="outline" className="bg-danger/10 border-danger text-danger">
                    94% Confidence
                  </Badge>
                </div>

                {selectedWord && (
                  <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h4 className="font-medium mb-2">Word Analysis: "{selectedWord}"</h4>
                    <p className="text-sm text-muted-foreground">
                      {shapValues.find(w => w.word === selectedWord)?.type === 'negative' 
                        ? 'This word increases the likelihood of fake news classification.'
                        : shapValues.find(w => w.word === selectedWord)?.type === 'positive'
                        ? 'This word supports real news classification.'
                        : 'This word has minimal impact on classification.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Explanation Methods */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shap">SHAP Analysis</TabsTrigger>
            <TabsTrigger value="lime">LIME Explanation</TabsTrigger>
            <TabsTrigger value="features">Feature Importance</TabsTrigger>
          </TabsList>

          <TabsContent value="shap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>SHAP (SHapley Additive exPlanations)</span>
                </CardTitle>
                <CardDescription>
                  Unified measure of feature importance showing how each word contributes to the final prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium mb-4">
                    <div className="text-center">
                      <div className="w-4 h-4 bg-red-500/40 rounded mx-auto mb-1"></div>
                      <span>Fake Indicators</span>
                    </div>
                    <div className="text-center">
                      <div className="w-4 h-4 bg-gray-500/40 rounded mx-auto mb-1"></div>
                      <span>Neutral</span>
                    </div>
                    <div className="text-center">
                      <div className="w-4 h-4 bg-green-500/40 rounded mx-auto mb-1"></div>
                      <span>Real Indicators</span>
                    </div>
                  </div>

                  {shapValues
                    .sort((a, b) => b.importance - a.importance)
                    .slice(0, 10)
                    .map((word, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-24 text-sm font-mono truncate" title={word.word}>
                          {word.word}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div 
                              className={`h-4 rounded ${
                                word.type === 'negative' ? 'bg-red-500' : 
                                word.type === 'positive' ? 'bg-green-500' : 'bg-gray-500'
                              }`}
                              style={{ width: `${Math.max(word.importance * 100, 5)}%` }}
                            ></div>
                            <span className="text-sm text-muted-foreground min-w-12">
                              {word.importance.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>LIME (Local Interpretable Model-agnostic Explanations)</span>
                </CardTitle>
                <CardDescription>
                  Local linear approximation explaining individual predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Prediction Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Base Rate</span>
                          <span className="text-sm font-mono">0.50</span>
                        </div>
                        {limeExplanation.topFeatures.map((feature, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm">{feature.feature}</span>
                            <span className={`text-sm font-mono ${
                              feature.impact.startsWith('+') ? 'text-red-500' : 'text-green-500'
                            }`}>
                              {feature.impact}
                            </span>
                          </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-medium">
                            <span>Final Prediction</span>
                            <span className="text-danger">{limeExplanation.confidence.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Feature Values</h4>
                      <div className="space-y-2">
                        {limeExplanation.topFeatures.map((feature, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-sm">{feature.feature}</span>
                            <span className="text-sm font-mono">{feature.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium mb-2">Interpretation</h4>
                    <p className="text-sm text-muted-foreground">
                      The model predicts this text as <strong>fake news</strong> with high confidence. 
                      The strongest indicators are sensational language patterns, conspiracy-style claims, 
                      and urgency markers typically associated with misinformation campaigns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Global Feature Importance</span>
                </CardTitle>
                <CardDescription>
                  Overall model behavior across the entire dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {featureImportances.map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{feature.feature}</h4>
                        <span className="text-sm text-muted-foreground">
                          {(feature.importance * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={feature.importance * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Model Interpretation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                    <h4 className="font-medium text-danger mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Fake News Indicators
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Sensational or emotional language</li>
                      <li>• Conspiracy theory references</li>
                      <li>• Urgency and scarcity claims</li>
                      <li>• Unrealistic or exaggerated claims</li>
                      <li>• Lack of credible sources</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-medium text-success mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Real News Indicators
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Neutral, factual tone</li>
                      <li>• Specific dates and locations</li>
                      <li>• Multiple source references</li>
                      <li>• Professional writing style</li>
                      <li>• Balanced perspective</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
