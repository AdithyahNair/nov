"use client";

import React, { useState } from "react";
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
}: DetailDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-2xl font-bold text-gray-900">
          {title}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5" />
                    Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {data.metrics.map((metric: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gradient-to-r from-brand-lightest to-white rounded-lg border hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 bg-brand rounded-full inline-block" />
                          <span className="font-medium text-sm">
                            {metric.label}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-brand-dark">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Performance Trends */}
            {data.trends && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.trends.map((trend: any, index: number) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg bg-gradient-to-r from-green-50 to-brand-lightest hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-1 bg-green-100 rounded-full">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold mb-1">
                              {trend.period}
                            </div>
                            <div className="text-sm text-muted-foreground">
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
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
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
                      <Activity className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800 text-sm">
                        Monitor data quality trends
                      </span>
                    </div>
                    <p className="text-xs text-blue-700 ml-6">
                      Maintain current validation protocols
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

export default function Home() {
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
      {/* PRISM Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-0 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo and branding */}
            <div className="flex items-center gap-4 -ml-4">
              <a href="/" className="flex items-center -ml-8">
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
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg font-bold text-green-700">94</div>
                  <div className="text-xs text-green-600">Health Score</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-700">3</div>
                  <div className="text-xs text-blue-600">Active AI Models</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6 pr-4">
            {/* Main Dashboard Card */}
            <Card
              className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group"
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
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100/20 to-transparent rounded-full translate-y-12 -translate-x-12" />

              <CardHeader className="pb-4 relative z-10">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    AI System Health Overview
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Side - Executive Summary */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0 text-center relative">
                        <div className="relative mb-4">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 flex items-center justify-center animate-counter shadow-lg">
                            <span className="text-3xl font-bold text-white drop-shadow-sm">
                              {systemHealth}
                            </span>
                          </div>
                          {/* Animated ring */}
                          <div className="absolute inset-0 rounded-full border-4 border-green-200/50 animate-pulse" />
                          <div className="absolute inset-2 rounded-full border-2 border-green-300/30 animate-ping" />
                        </div>
                        <div className="text-sm font-semibold text-slate-700 bg-white px-4 py-2 rounded-full shadow-sm">
                          Health Score
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100 hover:shadow-md transition-all">
                            <div className="p-1.5 bg-green-100 rounded-full">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-800">
                                Performance
                              </div>
                              <div className="text-lg font-bold text-green-600">
                                96.2%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100 hover:shadow-md transition-all">
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
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100 hover:shadow-md transition-all">
                            <div className="p-1.5 bg-emerald-100 rounded-full">
                              <CheckCircle className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-800">
                                Drift
                              </div>
                              <div className="text-lg font-bold text-emerald-600">
                                Normal
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-slate-100 hover:shadow-md transition-all">
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
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-sm text-muted-foreground">
                          Next Review
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          24 hours
                        </div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-sm text-muted-foreground">
                          Uptime
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          99.7%
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
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium">
                            Data Pipeline
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                            <span className="text-xs text-green-700">
                              Active
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium">
                            Model Training
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                            <span className="text-xs text-green-700">
                              Scheduled
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <span className="text-sm font-medium">
                            Alert System
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                            <span className="text-xs text-green-700">
                              Monitoring
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Risk Matrix */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="h-5 w-5 text-brand" />
                      <h3 className="text-lg font-semibold">
                        Risk Matrix (5x5)
                      </h3>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mb-6 justify-items-center">
                      {Array.from({ length: 25 }, (_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded bg-green-400 flex items-center justify-center"
                        />
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border border-green-300 text-sm">
                        <span className="flex items-center gap-2 text-green-800 font-medium">
                          <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                          High Confidence/Low Impact
                        </span>
                        <Badge className="bg-green-600 text-white text-xs px-3 py-1 font-semibold">
                          15 models
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-100 rounded-lg border border-yellow-300 text-sm">
                        <span className="flex items-center gap-2 text-yellow-800 font-medium">
                          <span className="w-3 h-3 bg-yellow-500 rounded-full inline-block" />
                          Medium Confidence/Medium Impact
                        </span>
                        <div className="bg-black text-white text-xs px-3 py-1 font-semibold rounded-full">
                          5 models
                        </div>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded">
                      <p className="font-bold text-sm text-green-600">
                        All critical operations in GREEN zone
                      </p>
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
                      <Badge className="bg-green-500 text-xs mt-1">
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
                      <p className="text-xs text-muted-foreground">
                        Confidence
                      </p>
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
                      <Badge className="bg-green-500 text-xs mt-1">
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
                      <Badge className="bg-green-500 text-xs mt-1">
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
                      <p className="text-xs text-muted-foreground">
                        Efficiency
                      </p>
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
                        <span className="font-medium text-sm">
                          Production AI
                        </span>
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
                      <p className="font-bold text-sm text-green-600">
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
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-brand-lightest rounded-lg">
                      <div className="text-2xl font-bold mb-1 text-green-600">
                        {financialData.ytdCostAvoidance}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        YTD Cost Avoidance
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-brand-lightest rounded-lg">
                      <div className="text-2xl font-bold mb-1 text-blue-600">
                        {financialData.operationalEfficiencyGain}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        Efficiency Gain
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-brand-lightest rounded-lg">
                      <div className="text-2xl font-bold mb-1 text-purple-600">
                        {financialData.roiOnAI}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        ROI on AI Investment
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-brand-lightest rounded-lg">
                      <div className="text-2xl font-bold mb-1 text-teal-600">
                        {financialData.downtimePrevented}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        Downtime Prevented
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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
}
