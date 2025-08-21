"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Activity,
  CheckCircle,
  Clock,
  DollarSign,
  Settings,
  TrendingUp,
  Wrench,
  Zap,
  Shield,
  BarChart3,
  ArrowLeft,
  Search,
  Filter,
  Star,
  AlertTriangle,
} from "lucide-react";

interface DetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: any;
}

const DetailDialog = ({
  open,
  onOpenChange,
  title,
  data,
}: DetailDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto w-full mx-4">
        <div className="border-b pb-4 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {data && (
            <div className="grid gap-4">
              {/* Status Overview */}
              <div className="border-l-2 border-l-blue-500 p-4">
                <h3 className="text-lg font-semibold mb-4">Status Overview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold mb-1">{data.status}</div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold mb-1 text-blue-600">
                      {data.accuracy}
                    </div>
                    <div className="text-sm text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold mb-1 text-green-600">
                      {data.uptime || "N/A"}
                    </div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-xl font-bold mb-1 text-blue-600">
                      {data.lastCheck || "2 hrs ago"}
                    </div>
                    <div className="text-sm text-gray-600">Last Check</div>
                  </div>
                </div>
              </div>

              {/* Detailed Metrics */}
              {data.metrics && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    📊 Metrics
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {data.metrics.map((metric: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" />
                          <span className="font-medium text-sm">
                            {metric.label}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-blue-600">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Trends */}
              {data.trends && (
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    📈 Trends
                  </h3>
                  <div className="space-y-3">
                    {data.trends.map((trend: any, index: number) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg bg-green-50 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-green-100 rounded-full">
                            📈
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold mb-1">
                              {trend.period}
                            </div>
                            <div className="text-sm text-gray-600">
                              {trend.description}
                            </div>
                            <div className="mt-1">
                              <Progress value={85} className="h-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  ⚙️ Recommendations
                </h3>
                <div className="space-y-2">
                  <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      ✅
                      <span className="font-medium text-green-800 text-sm">
                        Continue current operations
                      </span>
                    </div>
                    <p className="text-xs text-green-700 ml-6">
                      All metrics within optimal parameters
                    </p>
                  </div>
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      📊
                      <span className="font-medium text-blue-800 text-sm">
                        Monitor data quality trends
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 ml-6">
                      Maintain current validation protocols
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Project Detail View Component
const ProjectDetailView = ({ onBack }: { onBack: () => void }) => {
  const [selectedCard, setSelectedCard] = useState<{
    title: string;
    data: any;
  } | null>(null);

  const systemHealth = 94;

  const productionAI = {
    status: "OPERATIONAL",
    accuracy: "95.8%",
    uptime: "99.7%",
    lastCheck: "2 hours ago",
    metrics: [
      { label: "Prediction Confidence", value: "92%" },
      { label: "Cost Savings (Quarter)", value: "$2.3M" },
      { label: "Processing Speed", value: "0.3ms avg" },
      { label: "Data Quality Score", value: "98.1%" },
    ],
    trends: [
      {
        period: "Last 30 days",
        description: "Steady 95-97% accuracy maintained",
      },
      {
        period: "This Quarter",
        description: "Cost savings exceeded target by 15%",
      },
    ],
  };

  const maintenanceAI = {
    status: "OPERATIONAL",
    accuracy: "94.1%",
    uptime: "99.2%",
    lastCheck: "1 hour ago",
    metrics: [
      { label: "Failure Prediction Accuracy", value: "94.1%" },
      { label: "False Positive Rate", value: "3.2%" },
      { label: "Maintenance Cost Reduction", value: "38%" },
      { label: "Equipment Monitored", value: "847 assets" },
    ],
    trends: [
      {
        period: "Last 30 days",
        description: "Consistent 93-95% accuracy range",
      },
      {
        period: "Equipment Coverage",
        description: "98% of critical assets monitored",
      },
    ],
  };

  const drillingAI = {
    status: "OPERATIONAL",
    accuracy: "97.3%",
    uptime: "99.9%",
    lastCheck: "30 minutes ago",
    metrics: [
      { label: "NPT Reduction", value: "42%" },
      { label: "Drilling Efficiency", value: "+27%" },
      { label: "Stuck Pipe Prevention", value: "97.3%" },
      { label: "Wells Optimized", value: "23 active" },
    ],
    trends: [
      {
        period: "Last 30 days",
        description: "Stable 94-96% accuracy maintained",
      },
      {
        period: "Efficiency Impact",
        description: "27% improvement over baseline",
      },
    ],
  };

  const financialData = {
    ytdCostAvoidance: "$18.7M",
    operationalEfficiencyGain: "31%",
    roiOnAI: "340%",
    downtimePrevented: "127 hours",
  };

  const openDetailDialog = (title: string, data: any) => {
    console.log("Opening dialog with:", { title, data });
    setSelectedCard({ title, data });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
      {/* Back Button */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Project Overview
              </h1>
              <div className="text-sm text-gray-600">
                Projects &gt; AI System Health Monitor
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload New Version
            </button>
          </div>
        </div>
      </div>

      {/* Project Summary Card */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    AI System Health Monitor
                  </h2>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    active
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  Comprehensive monitoring and health assessment for AI systems
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>AI Health Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-sm text-gray-600">MODELS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
              <div className="text-sm text-gray-600">TRAINING DATASETS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-600">VALIDATION DATASETS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-600">TEST DATASETS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Main Dashboard Card */}
          <Card
            className="relative overflow-hidden bg-white border border-slate-200 transition-all duration-500 cursor-pointer group"
            onClick={() =>
              openDetailDialog("AI System Health Overview", {
                status: "OPTIMAL",
                accuracy: "96.2%",
                uptime: "99.7%",
                lastCheck: "2 hours ago",
                metrics: [
                  { label: "Model Performance", value: "96.2% (>90%)" },
                  { label: "Data Quality Score", value: "98.1% (>95%)" },
                  { label: "Drift Detection", value: "Normal parameters" },
                  { label: "Next Review", value: "24 hours" },
                ],
              })
            }
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />

            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  AI System Health Overview
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-4">
                {/* Executive Summary */}
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 text-center">
                      <div className="text-4xl font-bold text-teal-600 mb-2">
                        {systemHealth}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        Health Score
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-white border border-green-300 rounded-lg hover:shadow-md transition-all">
                          <div className="p-1.5 bg-green-100 rounded-full">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-black">
                              Performance
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              96.2%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-lg hover:shadow-md transition-all">
                          <div className="p-1.5 bg-blue-100 rounded-full">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-slate-800">
                              Quality
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              98.1%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white border border-green-300 rounded-lg hover:shadow-md transition-all">
                          <div className="p-1.5 bg-green-100 rounded-full">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-black">
                              Drift
                            </div>
                            <div className="text-lg font-bold text-green-600">
                              Normal
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-lg hover:shadow-md transition-all">
                          <div className="p-1.5 bg-slate-100 rounded-full">
                            <Clock className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-slate-800">
                              Last Update
                            </div>
                            <div className="text-lg font-bold text-slate-600">
                              2 hrs ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional System Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    <div className="text-center p-3 bg-white rounded border border-slate-200">
                      <div className="text-sm text-slate-600">Next Review</div>
                      <div className="text-lg font-bold text-green-600">
                        24 hours
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded border border-slate-200">
                      <div className="text-sm text-slate-600">Uptime</div>
                      <div className="text-lg font-bold text-blue-600">
                        99.7%
                      </div>
                    </div>
                  </div>

                  {/* System Status Indicators */}
                  <div className="pt-3 border-t">
                    <h4 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      System Status
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-white border border-green-300 rounded-lg">
                        <span className="text-sm font-medium text-black">
                          Data Pipeline
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                          <span className="text-xs text-black">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white border border-green-300 rounded-lg">
                        <span className="text-sm font-medium text-black">
                          Model Training
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                          <span className="text-xs text-black">Scheduled</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white border border-green-300 rounded-lg">
                        <span className="text-sm font-medium text-black">
                          Alert System
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                          <span className="text-xs text-black">Monitoring</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Systems Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog("Production Optimization AI", productionAI)
              }
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand/10 rounded-lg">
                    <Settings className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      Production Optimization AI
                    </CardTitle>
                    <Badge className="bg-white border border-blue-300 text-black text-xs mt-1 hover:bg-white">
                      ✓ OPERATIONAL
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                    <p className="text-xl font-bold text-brand">95.8%</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-xl font-bold text-brand">92%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Cost Impact</span>
                    <span className="font-bold text-green-600">+$2.3M</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Uptime</span>
                    <span className="font-bold">99.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog("Predictive Maintenance AI", maintenanceAI)
              }
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand/10 rounded-lg">
                    <Wrench className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      Predictive Maintenance AI
                    </CardTitle>
                    <Badge className="bg-white border border-blue-300 text-black text-xs mt-1 hover:bg-white">
                      ✓ OPERATIONAL
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">
                      Failure Prediction
                    </p>
                    <p className="text-xl font-bold text-brand">94.1%</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">
                      False Positive
                    </p>
                    <p className="text-xl font-bold text-green-600">3.2%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Cost Reduction</span>
                    <span className="font-bold text-green-600">38%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Assets Monitored</span>
                    <span className="font-bold">847</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog("Drilling Optimization AI", drillingAI)
              }
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand/10 rounded-lg">
                    <Zap className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      Drilling Optimization AI
                    </CardTitle>
                    <Badge className="bg-white border border-blue-300 text-black text-xs mt-1 hover:bg-white">
                      ✓ OPERATIONAL
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">
                      NPT Reduction
                    </p>
                    <p className="text-xl font-bold text-brand">42%</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                    <p className="text-xl font-bold text-brand">+27%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Stuck Pipe Prevention</span>
                    <span className="font-bold text-green-600">97.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Wells Optimized</span>
                    <span className="font-bold">23</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends & Financial Impact */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog("30-Day Performance Trends", {
                  status: "TRENDING",
                  accuracy: "Historical Analysis",
                  metrics: [
                    { label: "Production AI Trend", value: "Steady 95-97%" },
                    {
                      label: "Maintenance AI Trend",
                      value: "Consistent 93-95%",
                    },
                    { label: "Drilling AI Trend", value: "Stable 94-96%" },
                    {
                      label: "Overall Trend Status",
                      value: "Within normal bands",
                    },
                  ],
                })
              }
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand" />
                  30-Day Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Production AI Trend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Production AI</span>
                      <span className="text-xs text-green-600">
                        Steady 95-97%
                      </span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>

                  {/* Maintenance AI Trend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">
                        Maintenance AI
                      </span>
                      <span className="text-xs text-green-600">
                        Consistent 93-95%
                      </span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>

                  {/* Drilling AI Trend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Drilling AI</span>
                      <span className="text-xs text-green-600">
                        Stable 94-96%
                      </span>
                    </div>
                    <Progress value={97} className="h-2" />
                  </div>

                  <div className="text-center p-3 bg-muted/50 rounded mt-4">
                    <p className="font-bold text-sm text-black">
                      All trends within normal operating bands
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Impact Summary */}
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog("Financial Impact Analysis", {
                  status: "POSITIVE ROI",
                  accuracy: "Financial Analysis Complete",
                  metrics: [
                    {
                      label: "YTD Cost Avoidance",
                      value: financialData.ytdCostAvoidance,
                    },
                    {
                      label: "Operational Efficiency Gain",
                      value: financialData.operationalEfficiencyGain,
                    },
                    {
                      label: "ROI on AI Investment",
                      value: financialData.roiOnAI,
                    },
                    {
                      label: "Downtime Prevented",
                      value: financialData.downtimePrevented,
                    },
                  ],
                })
              }
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-brand" />
                  Financial Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold mb-1 text-green-600">
                      {financialData.ytdCostAvoidance}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      YTD Cost Avoidance
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold mb-1 text-blue-600">
                      {financialData.operationalEfficiencyGain}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Efficiency Gain
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold mb-1 text-purple-600">
                      {financialData.roiOnAI}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      ROI on AI Investment
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                    <div className="text-2xl font-bold mb-1 text-teal-600">
                      {financialData.downtimePrevented}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Downtime Prevented
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/60 backdrop-blur-sm border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-slate-600">
            <p className="text-sm font-medium">
              24/7 Critical Response Team • Emergency Escalation: Executive
              alerting active
            </p>
            <p className="text-xs mt-1 text-slate-500">
              Model Engineers: On-site within 4 hours • Dashboard auto-refreshes
              every 5 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      {selectedCard && (
        <DetailDialog
          open={!!selectedCard}
          onOpenChange={(open) => {
            console.log("Dialog onOpenChange:", open);
            if (!open) setSelectedCard(null);
          }}
          title={selectedCard.title}
          data={selectedCard.data}
        />
      )}
    </div>
  );
};

// Critical Alert Dashboard Component
const CriticalAlertDashboard = ({ onBack }: { onBack: () => void }) => {
  const [selectedCard, setSelectedCard] = useState<{
    title: string;
    data: any;
  } | null>(null);

  const systemHealth = 67;

  const drillingAI = {
    status: "CRITICAL",
    accuracy: "72.1%",
    uptime: "85.2%",
    lastCheck: "15 minutes ago",
    metrics: [
      { label: "Stuck Pipe Prevention", value: "45%" },
      { label: "False Positive Rate", value: "28%" },
      { label: "Data Drift Score", value: "8.7/10" },
      { label: "Confidence Level", value: "45%" },
    ],
    trends: [
      {
        period: "Last 30 days",
        description: "Severe performance degradation detected",
      },
      {
        period: "Risk Assessment",
        description: "Stuck pipe risk increased 4x",
      },
    ],
  };

  const safetyMonitor = {
    status: "CRITICAL",
    accuracy: "61%",
    uptime: "92.1%",
    lastCheck: "5 minutes ago",
    metrics: [
      { label: "False Alarms", value: "47 in 24hrs" },
      { label: "Alert Fatigue", value: "DETECTED" },
      { label: "Safety Confidence", value: "61%" },
      { label: "Response Time", value: "2.3s avg" },
    ],
    trends: [
      {
        period: "Last 24 hours",
        description: "47 false alarms triggered",
      },
      {
        period: "Safety Impact",
        description: "Genuine alerts may be ignored",
      },
    ],
  };

  const maintenanceAI = {
    status: "WARNING",
    accuracy: "86.3%",
    uptime: "94.7%",
    lastCheck: "1 hour ago",
    metrics: [
      { label: "Equipment Coverage", value: "92%" },
      { label: "Model Age", value: "127 days" },
      { label: "Prediction Accuracy", value: "86.3%" },
      { label: "Maintenance Cost", value: "+15%" },
    ],
    trends: [
      {
        period: "Last 30 days",
        description: "Performance declining trend",
      },
      {
        period: "Model Health",
        description: "Approaching retraining threshold",
      },
    ],
  };

  const productionAI = {
    status: "WARNING",
    accuracy: "78.3%",
    uptime: "89.1%",
    lastCheck: "30 minutes ago",
    metrics: [
      { label: "Failed Sensors", value: "3 detected" },
      { label: "Prediction Variance", value: "+15%" },
      { label: "Efficiency Loss", value: "$45K daily" },
      { label: "Data Quality", value: "83.2%" },
    ],
    trends: [
      {
        period: "Last 24 hours",
        description: "3 sensor failures detected",
      },
      {
        period: "Financial Impact",
        description: "$45K daily efficiency loss",
      },
    ],
  };

  const financialData = {
    immediateRisk: "$2.8M",
    quarterlyExposure: "$8.1M",
    safetyRiskLevel: "ELEVATED",
    regulatoryCompliance: "AT RISK",
  };

  const openDetailDialog = (title: string, data: any) => {
    console.log("Opening dialog with:", { title, data });
    setSelectedCard({ title, data });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Project Overview
              </h1>
              <div className="text-sm text-gray-600">
                Projects &gt; Critical Alert Dashboard
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload New Version
            </button>
          </div>
        </div>
      </div>

      {/* Project Summary Card */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    Critical Alert Dashboard
                  </h2>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                    critical
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  Emergency monitoring system with active alerts and warnings
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>Critical Alert Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
              <div className="text-sm text-gray-600">MODELS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
              <div className="text-sm text-gray-600">TRAINING DATASETS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
              <div className="text-sm text-gray-600">VALIDATION DATASETS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
              <div className="text-sm text-gray-600">TEST DATASETS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Main Dashboard Card */}
          <Card
            className="relative overflow-hidden bg-white border border-slate-200 transition-all duration-500 cursor-pointer group"
            onClick={() =>
              openDetailDialog("Critical AI System Health Overview", {
                status: "CRITICAL",
                accuracy: "78.3%",
                uptime: "85.2%",
                lastCheck: "15 minutes ago",
                metrics: [
                  { label: "Model Performance", value: "78.3% (BELOW TARGET)" },
                  { label: "Data Quality Score", value: "83.2% (DEGRADED)" },
                  { label: "Drift Detection", value: "CRITICAL on 2 models" },
                  { label: "Next Review", value: "IMMEDIATE" },
                ],
              })
            }
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />

            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  Critical AI System Health Overview
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-4">
                {/* Executive Summary */}
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">
                        {systemHealth}
                      </div>
                      <div className="text-sm font-semibold text-slate-700">
                        Health Score
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-white border border-orange-300 rounded-lg hover:shadow-md transition-all">
                          <div className="p-1.5 bg-orange-100 rounded-full">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-black">
                              Performance
                            </div>
                            <div className="text-lg font-bold text-orange-600">
                              78.3%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-all">
                          <div className="p-1.5 bg-blue-100 rounded-full">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-slate-800">
                              Quality
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              83.2%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white border border-orange-300 rounded-lg hover:shadow-md transition-all">
                          <div className="p-1.5 bg-orange-100 rounded-full">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-black">
                              Drift
                            </div>
                            <div className="text-lg font-bold text-orange-600">
                              Critical
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:shadow-md transition-all">
                          <div className="p-1.5 bg-slate-100 rounded-full">
                            <Clock className="h-4 w-4 text-slate-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-slate-800">
                              Last Update
                            </div>
                            <div className="text-lg font-bold text-slate-600">
                              15 min ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional System Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                    <div className="text-center p-3 bg-red-50/30 rounded">
                      <div className="text-sm text-muted-foreground">
                        Immediate Risk
                      </div>
                      <div className="text-lg font-bold text-red-600">
                        $2.8M
                      </div>
                    </div>
                    <div className="text-center p-3 bg-red-50/30 rounded">
                      <div className="text-sm text-muted-foreground">
                        Safety Level
                      </div>
                      <div className="text-lg font-bold text-red-600">
                        ELEVATED
                      </div>
                    </div>
                  </div>

                  {/* System Status Indicators */}
                  <div className="pt-3 border-t">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      System Status
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-white border border-red-300 rounded-lg">
                        <span className="text-sm font-medium text-black">
                          Emergency Protocol
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block" />
                          <span className="text-xs text-black">ACTIVE</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white border border-green-300 rounded-lg">
                        <span className="text-sm font-medium text-black">
                          Manual Oversight
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                          <span className="text-xs text-black">ENABLED</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-white border border-yellow-300 rounded-lg">
                        <span className="text-sm font-medium text-black">
                          Alert System
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse inline-block" />
                          <span className="text-xs text-black">WARNING</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Systems Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog(
                  "Drilling Optimization AI - CRITICAL",
                  drillingAI
                )
              }
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Zap className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      Drilling Optimization AI
                    </CardTitle>
                    <Badge className="bg-red-100 border border-red-300 text-red-800 text-xs mt-1 hover:bg-red-100">
                      🚨 CRITICAL
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                    <p className="text-xl font-bold text-red-600">72.1%</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-xl font-bold text-red-600">45%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Drift Score</span>
                    <span className="font-bold text-red-600">8.7/10</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>False Positives</span>
                    <span className="font-bold text-red-600">28%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog(
                  "Process Safety Monitor - CRITICAL",
                  safetyMonitor
                )
              }
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      Process Safety Monitor
                    </CardTitle>
                    <Badge className="bg-red-100 border border-red-300 text-red-800 text-xs mt-1 hover:bg-red-100">
                      🚨 CRITICAL
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">
                      False Alarms
                    </p>
                    <p className="text-xl font-bold text-red-600">47</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Confidence</p>
                    <p className="text-xl font-bold text-red-600">61%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Alert Fatigue</span>
                    <span className="font-bold text-red-600">DETECTED</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Response Time</span>
                    <span className="font-bold">2.3s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog(
                  "Predictive Maintenance - WARNING",
                  maintenanceAI
                )
              }
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Wrench className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      Predictive Maintenance
                    </CardTitle>
                    <Badge className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-xs mt-1 hover:bg-yellow-100">
                      ⚠️ WARNING
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                    <p className="text-xl font-bold text-yellow-600">86.3%</p>
                  </div>
                  <div className="text-center p-3 bg-white/80 rounded">
                    <p className="text-xs text-muted-foreground">Coverage</p>
                    <p className="text-xl font-bold text-yellow-600">92%</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Model Age</span>
                    <span className="font-bold text-yellow-600">127 days</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/80 rounded text-sm">
                    <span>Cost Impact</span>
                    <span className="font-bold text-yellow-600">+15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends & Financial Impact */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog("30-Day Critical Performance Trends", {
                  status: "CRITICAL TRENDS",
                  accuracy: "Historical Analysis",
                  metrics: [
                    { label: "Drilling AI Trend", value: "Severe degradation" },
                    {
                      label: "Safety Monitor Trend",
                      value: "False alarm increase",
                    },
                    {
                      label: "Maintenance AI Trend",
                      value: "Declining performance",
                    },
                    {
                      label: "Overall Trend Status",
                      value: "CRITICAL - Immediate action required",
                    },
                  ],
                })
              }
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  30-Day Critical Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Drilling AI Trend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">Drilling AI</span>
                      <span className="text-xs text-red-600">
                        Severe degradation
                      </span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>

                  {/* Safety Monitor Trend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">
                        Safety Monitor
                      </span>
                      <span className="text-xs text-red-600">
                        False alarm increase
                      </span>
                    </div>
                    <Progress value={39} className="h-2" />
                  </div>

                  {/* Maintenance AI Trend */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">
                        Maintenance AI
                      </span>
                      <span className="text-xs text-yellow-600">
                        Declining performance
                      </span>
                    </div>
                    <Progress value={63} className="h-2" />
                  </div>

                  <div className="text-center p-3 bg-red-50 rounded mt-4">
                    <p className="font-bold text-sm text-red-800">
                      CRITICAL - Immediate action required
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial Impact Summary */}
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() =>
                openDetailDialog("Critical Financial Impact Analysis", {
                  status: "HIGH RISK",
                  accuracy: "Financial Analysis Complete",
                  metrics: [
                    {
                      label: "Immediate Risk",
                      value: financialData.immediateRisk,
                    },
                    {
                      label: "Quarterly Exposure",
                      value: financialData.quarterlyExposure,
                    },
                    {
                      label: "Safety Risk Level",
                      value: financialData.safetyRiskLevel,
                    },
                    {
                      label: "Regulatory Status",
                      value: financialData.regulatoryCompliance,
                    },
                  ],
                })
              }
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-black" />
                  Critical Financial Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                    <div className="text-2xl font-bold mb-1 text-black">
                      {financialData.immediateRisk}
                    </div>
                    <div className="text-xs text-black font-medium">
                      Immediate Risk
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                    <div className="text-2xl font-bold mb-1 text-black">
                      {financialData.quarterlyExposure}
                    </div>
                    <div className="text-xs text-black font-medium">
                      Quarterly Exposure
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                    <div className="text-2xl font-bold mb-1 text-black">
                      {financialData.safetyRiskLevel}
                    </div>
                    <div className="text-xs text-black font-medium">
                      Safety Risk Level
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-red-200">
                    <div className="text-2xl font-bold mb-1 text-black">
                      {financialData.regulatoryCompliance}
                    </div>
                    <div className="text-xs text-black font-medium">
                      Regulatory Status
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/60 backdrop-blur-sm border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="text-center text-slate-600">
            <p className="text-sm font-medium">
              24/7 Critical Response Team • Emergency Escalation: Executive
              alerting active
            </p>
            <p className="text-xs mt-1 text-slate-500">
              Model Engineers: On-site within 4 hours • Dashboard auto-refreshes
              every 2 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      {selectedCard && (
        <DetailDialog
          open={!!selectedCard}
          onOpenChange={(open) => {
            console.log("Dialog onOpenChange:", open);
            if (!open) setSelectedCard(null);
          }}
          title={selectedCard.title}
          data={selectedCard.data}
        />
      )}
    </div>
  );
};

// Main Dashboard Component
export default function Home() {
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [showCriticalAlert, setShowCriticalAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);

    // Check localStorage after hydration
    const bannerClosed = localStorage.getItem("alertBannerClosed");
    const closedTime = localStorage.getItem("alertBannerClosedTime");
    const currentTime = Date.now();

    if (bannerClosed === "true" && closedTime) {
      const timeDiff = currentTime - parseInt(closedTime);
      if (timeDiff > 3600000) {
        // 1 hour
        localStorage.removeItem("alertBannerClosed");
        localStorage.removeItem("alertBannerClosedTime");
        setShowAlertBanner(true);
      } else {
        setShowAlertBanner(false);
      }
    } else {
      setShowAlertBanner(true); // Show by default
    }
  }, []);

  // Project data
  const projects = [
    {
      id: "critical",
      name: "Critical Alert Dashboard",
      description: "Red flags active - Immediate attention required",
      healthScore: 67,
      aiModels: 4,
      status: "Critical",
      type: "critical",
      badges: ["Emergency"],
      icon: "AlertTriangle",
      color: "red",
    },
    {
      id: "healthy",
      name: "AI System Health Monitor",
      description: "All systems operational - Optimal performance",
      healthScore: 94,
      aiModels: 3,
      status: "Operational",
      type: "healthy",
      badges: ["Optimal", "Stable"],
      icon: "Shield",
      color: "green",
    },
  ];

  // Filter projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.badges.some((badge) =>
        badge.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (showCriticalAlert) {
    return (
      <CriticalAlertDashboard onBack={() => setShowCriticalAlert(false)} />
    );
  }

  if (showProjectDetail) {
    return <ProjectDetailView onBack={() => setShowProjectDetail(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
      {/* PRISM Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-0 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and branding */}
            <div className="flex items-center gap-8 -ml-4">
              <a href="/" className="flex items-center -ml-4 gap-2">
                <img
                  src="/images/logo.svg"
                  alt="PRISM Logo"
                  className="h-10 w-auto"
                />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold text-gray-900 leading-none">
                    PRISM
                  </h1>
                  <span className="text-xs text-gray-500 font-normal">
                    by Block Convey
                  </span>
                </div>
              </a>
            </div>

            {/* Right side - User profile */}
            <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-45 rounded-lg p-1 transition-colors ">
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="hidden md:block"></div>
              <span className="text-slate-600 font-medium text-sm">NOV</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/90 backdrop-blur-sm border-r border-slate-200/60 min-h-screen p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Navigation
              </h3>
              <div className="space-y-1">
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    Dashboard
                  </span>
                </div>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  <Settings className="h-4 w-4 text-slate-600" />
                  <span className="text-sm text-slate-600">Settings</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-white rounded-lg border border-yellow-200">
                  <div className="text-lg font-bold text-yellow-600">80.5</div>
                  <div className="text-xs text-yellow-700">
                    Avg Health Score
                  </div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-700">2</div>
                  <div className="text-xs text-blue-600">Active Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Dashboard Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                PRISM Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor your AI systems and ensure compliance across all
                projects.
              </p>
            </div>

            {/* Critical Alert Banner */}
            {isClient && showAlertBanner && (
              <div className="bg-white border border-orange-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-orange-100 rounded-full">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-orange-800">
                        Critical AI Risk Detected
                      </h3>
                      <p className="text-xs text-orange-700">
                        Drilling Optimization Model: Severe drift detected •
                        Risk Level: High
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-orange-600">
                      $2.8M
                    </div>
                    <div className="text-xs text-orange-600">
                      Potential Loss
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowAlertBanner(false);
                      localStorage.setItem("alertBannerClosed", "true");
                      localStorage.setItem(
                        "alertBannerClosedTime",
                        Date.now().toString()
                      );
                    }}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Alert Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-orange-200 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-orange-600">1</div>
                <div className="text-xs text-orange-700">Critical</div>
              </div>
              <div className="bg-white border border-yellow-200 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-yellow-600">0</div>
                <div className="text-xs text-yellow-700">Warning</div>
              </div>
              <div className="bg-white border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-lg font-semibold text-blue-600">2</div>
                <div className="text-xs text-blue-700">Info</div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Projects
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Project Cards */}
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <Card
                    key={project.id}
                    className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 bg-white ${
                      project.color === "red"
                        ? "border-red-300 hover:border-red-400"
                        : "border-green-300 hover:border-green-400"
                    }`}
                    onClick={() => {
                      if (project.type === "critical") {
                        setShowCriticalAlert(true);
                      } else {
                        setShowProjectDetail(true);
                      }
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-lg bg-white border border-${project.color}-200`}
                          >
                            <Shield
                              className={`h-6 w-6 text-${project.color}-600`}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {project.name}
                              </h3>
                              <Badge
                                className={`bg-${project.color}-100 text-${project.color}-800 text-xs px-2 py-1`}
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {project.badges.map((badge, index) => (
                                <Badge
                                  key={index}
                                  className={`bg-${project.color}-100 text-${project.color}-800 text-xs`}
                                >
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {project.healthScore}
                            </div>
                            <div className="text-xs text-gray-600">
                              Health Score
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {project.aiModels}
                            </div>
                            <div className="text-xs text-gray-600">
                              AI Models
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full bg-${project.color}-500 animate-pulse`}
                            ></div>
                            <span
                              className={`text-sm text-${project.color}-600 font-semibold`}
                            >
                              {project.status}
                            </span>
                          </div>
                          <div className={`text-${project.color}-400`}>
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
