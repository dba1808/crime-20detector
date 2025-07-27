import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const confusionMatrix = [
  [850, 45],
  [32, 873]
];

const classificationReport = [
  { label: 'Real News', precision: 0.964, recall: 0.965, f1: 0.964, support: 895 },
  { label: 'Fake News', precision: 0.951, recall: 0.950, f1: 0.951, support: 905 },
];

const recentPredictions = [
  { id: 1, text: "Climate change report shows record temperatures...", prediction: "real", confidence: 94, timestamp: "2024-01-15 14:30" },
  { id: 2, text: "SHOCKING: Celebrity scandal rocks entertainment...", prediction: "fake", confidence: 87, timestamp: "2024-01-15 14:25" },
  { id: 3, text: "New medical breakthrough announced by researchers...", prediction: "real", confidence: 91, timestamp: "2024-01-15 14:20" },
  { id: 4, text: "URGENT: Government conspiracy revealed!!!", prediction: "fake", confidence: 96, timestamp: "2024-01-15 14:15" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-primary/20 rounded-full blur-3xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Model performance and real-time monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/dashboard" className="text-sm text-foreground font-medium">
                  Dashboard
                </Link>
                <Link to="/explainable-ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Explainable AI
                </Link>
              </nav>
              <Badge variant="outline" className="bg-success/10 border-success text-success">
                <Activity className="w-3 h-3 mr-1" />
                Live Monitoring
              </Badge>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Accuracy</p>
                  <p className="text-3xl font-bold text-foreground">94.2%</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +2.1% from last week
                  </p>
                </div>
                <Target className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Predictions Today</p>
                  <p className="text-3xl font-bold text-foreground">2,847</p>
                  <p className="text-xs text-warning flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    +15% activity
                  </p>
                </div>
                <BarChart3 className="w-10 h-10 text-neural" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fake News Detected</p>
                  <p className="text-3xl font-bold text-foreground">1,203</p>
                  <p className="text-xs text-danger flex items-center mt-1">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    42% of total
                  </p>
                </div>
                <AlertTriangle className="w-10 h-10 text-danger" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                  <p className="text-3xl font-bold text-foreground">89.7%</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    High reliability
                  </p>
                </div>
                <PieChart className="w-10 h-10 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Model Performance</TabsTrigger>
            <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
            <TabsTrigger value="realtime">Real-time Activity</TabsTrigger>
            <TabsTrigger value="classification">Classification Report</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Precision vs Recall</CardTitle>
                  <CardDescription>Model performance across different confidence thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Precision</span>
                      <span className="text-sm font-medium">92.8%</span>
                    </div>
                    <Progress value={92.8} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Recall</span>
                      <span className="text-sm font-medium">91.5%</span>
                    </div>
                    <Progress value={91.5} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">F1-Score</span>
                      <span className="text-sm font-medium">92.1%</span>
                    </div>
                    <Progress value={92.1} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ROC Curve Analysis</CardTitle>
                  <CardDescription>Area Under Curve: 0.96</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted/20">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>ROC Curve Visualization</p>
                      <p className="text-xs">AUC: 0.96 (Excellent)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="confusion" className="space-y-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Confusion Matrix</CardTitle>
                <CardDescription>True vs Predicted classifications on test set</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div></div>
                    <div className="font-medium text-sm">Predicted Real</div>
                    <div className="font-medium text-sm">Predicted Fake</div>
                    
                    <div className="font-medium text-sm">Actual Real</div>
                    <div className="p-4 bg-success/20 border border-success rounded-lg">
                      <div className="text-2xl font-bold text-success">{confusionMatrix[0][0]}</div>
                      <div className="text-xs text-muted-foreground">True Positive</div>
                    </div>
                    <div className="p-4 bg-danger/20 border border-danger rounded-lg">
                      <div className="text-2xl font-bold text-danger">{confusionMatrix[0][1]}</div>
                      <div className="text-xs text-muted-foreground">False Negative</div>
                    </div>
                    
                    <div className="font-medium text-sm">Actual Fake</div>
                    <div className="p-4 bg-danger/20 border border-danger rounded-lg">
                      <div className="text-2xl font-bold text-danger">{confusionMatrix[1][0]}</div>
                      <div className="text-xs text-muted-foreground">False Positive</div>
                    </div>
                    <div className="p-4 bg-success/20 border border-success rounded-lg">
                      <div className="text-2xl font-bold text-success">{confusionMatrix[1][1]}</div>
                      <div className="text-xs text-muted-foreground">True Negative</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Predictions</CardTitle>
                <CardDescription>Live stream of model predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPredictions.map((prediction) => (
                    <div key={prediction.id} className="flex items-start justify-between p-3 rounded-lg border border-border/50 bg-card/50">
                      <div className="flex-1">
                        <p className="text-sm text-foreground mb-1">{prediction.text}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{prediction.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge 
                          variant="outline" 
                          className={prediction.prediction === 'real' ? 'bg-success/10 border-success text-success' : 'bg-danger/10 border-danger text-danger'}
                        >
                          {prediction.prediction}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{prediction.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Classification Report</CardTitle>
                <CardDescription>Detailed metrics per class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2">Class</th>
                        <th className="text-right py-2">Precision</th>
                        <th className="text-right py-2">Recall</th>
                        <th className="text-right py-2">F1-Score</th>
                        <th className="text-right py-2">Support</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classificationReport.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 font-medium">{row.label}</td>
                          <td className="text-right py-3">{(row.precision * 100).toFixed(1)}%</td>
                          <td className="text-right py-3">{(row.recall * 100).toFixed(1)}%</td>
                          <td className="text-right py-3">{(row.f1 * 100).toFixed(1)}%</td>
                          <td className="text-right py-3">{row.support}</td>
                        </tr>
                      ))}
                      <tr className="border-b border-border font-medium bg-muted/20">
                        <td className="py-3">Weighted Avg</td>
                        <td className="text-right py-3">95.8%</td>
                        <td className="text-right py-3">95.7%</td>
                        <td className="text-right py-3">95.7%</td>
                        <td className="text-right py-3">1,800</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
