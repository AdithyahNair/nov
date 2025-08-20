"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Settings, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold text-slate-900">Settings</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="space-y-8">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Dashboard Theme
                  </label>
                  <select className="mt-1 w-full p-2 border border-slate-300 rounded-lg">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Language
                  </label>
                  <select className="mt-1 w-full p-2 border border-slate-300 rounded-lg">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Time Zone
                </label>
                <select className="mt-1 w-full p-2 border border-slate-300 rounded-lg">
                  <option>UTC (GMT+0)</option>
                  <option>EST (GMT-5)</option>
                  <option>PST (GMT-8)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-slate-600">
                    Receive alerts via email
                  </p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-slate-600">
                    Critical alerts via SMS
                  </p>
                </div>
                <div className="w-12 h-6 bg-slate-300 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-slate-600">
                    Browser push notifications
                  </p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Model Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                AI Model Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Model Update Frequency
                  </label>
                  <select className="mt-1 w-full p-2 border border-slate-300 rounded-lg">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Confidence Threshold
                  </label>
                  <select className="mt-1 w-full p-2 border border-slate-300 rounded-lg">
                    <option>90%</option>
                    <option>95%</option>
                    <option>99%</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Data Retention Period
                </label>
                <select className="mt-1 w-full p-2 border border-slate-300 rounded-lg">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
