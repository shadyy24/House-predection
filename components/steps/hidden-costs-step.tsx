"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Home, Shield, Wrench, Zap, Droplets, Calculator, PieChart } from "lucide-react"
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Legend, Pie } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface HiddenCost {
  category: string
  amount: number
  percentage: number
  icon: React.ReactNode
  color: string
  description: string
}

interface CostAnalysis {
  totalHiddenCosts: number
  monthlyMaintenance: number
  annualCosts: number
  breakdown: HiddenCost[]
  suggestions: Array<{ title: string; description: string; priority: "high" | "medium" | "low" }>
}

export function HiddenCostsStep() {
  const [formData, setFormData] = useState({
    propertyValue: "",
    propertyAge: "",
    location: "",
    propertyType: "apartment",
  })

  const [analysis, setAnalysis] = useState<CostAnalysis | null>(null)

  const calculateHiddenCosts = () => {
    const propertyValue = Number.parseFloat(formData.propertyValue)
    const propertyAge = Number.parseInt(formData.propertyAge)

    if (!propertyValue || !propertyAge) return

    // Calculate various hidden costs based on property value and age
    const maintenanceBase = propertyValue * 0.02 // 2% of property value annually
    const ageMultiplier = 1 + propertyAge * 0.01 // Increase by 1% per year of age

    const costs = {
      maintenance: Math.round(maintenanceBase * ageMultiplier),
      insurance: Math.round(propertyValue * 0.003), // 0.3% of property value
      propertyTax: Math.round(propertyValue * 0.008), // 0.8% of property value
      utilities: Math.round(propertyValue * 0.004), // 0.4% of property value
      repairs: Math.round(propertyValue * 0.015 * ageMultiplier), // 1.5% with age factor
      society: Math.round(propertyValue * 0.006), // 0.6% for society/association fees
    }

    const totalHiddenCosts = Object.values(costs).reduce((sum, cost) => sum + cost, 0)

    const breakdown: HiddenCost[] = [
      {
        category: "Maintenance & Repairs",
        amount: costs.maintenance + costs.repairs,
        percentage: Math.round(((costs.maintenance + costs.repairs) / totalHiddenCosts) * 100),
        icon: <Wrench className="h-5 w-5" />,
        color: "#ef4444",
        description: "Regular upkeep, painting, plumbing, electrical work",
      },
      {
        category: "Insurance & Security",
        amount: costs.insurance,
        percentage: Math.round((costs.insurance / totalHiddenCosts) * 100),
        icon: <Shield className="h-5 w-5" />,
        color: "#3b82f6",
        description: "Home insurance, security systems, fire safety",
      },
      {
        category: "Property Tax",
        amount: costs.propertyTax,
        percentage: Math.round((costs.propertyTax / totalHiddenCosts) * 100),
        icon: <Home className="h-5 w-5" />,
        color: "#f59e0b",
        description: "Municipal taxes, registration fees, legal costs",
      },
      {
        category: "Utilities",
        amount: costs.utilities,
        percentage: Math.round((costs.utilities / totalHiddenCosts) * 100),
        icon: <Zap className="h-5 w-5" />,
        color: "#10b981",
        description: "Electricity, water, gas, internet, cable",
      },
      {
        category: "Society/Association",
        amount: costs.society,
        percentage: Math.round((costs.society / totalHiddenCosts) * 100),
        icon: <Droplets className="h-5 w-5" />,
        color: "#8b5cf6",
        description: "Society maintenance, common area upkeep",
      },
    ]

    const suggestions = [
      {
        title: "Set up Emergency Fund",
        description: "Keep 6-12 months of maintenance costs as emergency fund for unexpected repairs",
        priority: "high" as const,
      },
      {
        title: "Regular Maintenance Schedule",
        description: "Preventive maintenance can reduce long-term repair costs by up to 40%",
        priority: "high" as const,
      },
      {
        title: "Energy Efficient Upgrades",
        description: "LED lighting, efficient appliances can reduce utility costs by 20-30%",
        priority: "medium" as const,
      },
      {
        title: "Insurance Review",
        description: "Review and compare insurance policies annually to get better rates",
        priority: "medium" as const,
      },
      {
        title: "Tax Benefits",
        description: "Explore tax deductions available for home loan interest and property tax",
        priority: "low" as const,
      },
    ]

    setAnalysis({
      totalHiddenCosts,
      monthlyMaintenance: Math.round(totalHiddenCosts / 12),
      annualCosts: totalHiddenCosts,
      breakdown,
      suggestions,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full mb-4">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-semibold">Cost Analysis</span>
        </div>
        <h2 className="text-3xl font-bold gradient-text-pink mb-2">Hidden Cost Revealer</h2>
        <p className="text-muted-foreground">Discover the true cost of homeownership beyond the purchase price</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="border-2 border-pink-100 shadow-lg">
          <CardHeader className="gradient-pink text-white">
            <CardTitle className="flex items-center gap-3">
              <Calculator className="h-6 w-6" />
              Property Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Home className="h-4 w-4 text-pink-600" />
                Property Value
              </Label>
              <Input
                type="number"
                placeholder="e.g., 5000000"
                value={formData.propertyValue}
                onChange={(e) => setFormData((prev) => ({ ...prev, propertyValue: e.target.value }))}
                className="border-2 border-pink-100 focus:border-pink-500"
              />
              <div className="text-xs text-muted-foreground">Enter current market value in rupees</div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Property Age</Label>
              <Input
                type="number"
                placeholder="e.g., 5"
                value={formData.propertyAge}
                onChange={(e) => setFormData((prev) => ({ ...prev, propertyAge: e.target.value }))}
                className="border-2 border-pink-100 focus:border-pink-500"
              />
              <div className="text-xs text-muted-foreground">Age in years (0 for new construction)</div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Location</Label>
              <Input
                placeholder="e.g., Chennai"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="border-2 border-pink-100 focus:border-pink-500"
              />
            </div>

            <Button
              onClick={calculateHiddenCosts}
              disabled={!formData.propertyValue || !formData.propertyAge}
              className="w-full gradient-pink text-white hover:opacity-90 transition-opacity py-3"
              size="lg"
            >
              <AlertTriangle className="mr-2 h-5 w-5" />
              Reveal Hidden Costs
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {analysis ? (
            <>
              {/* Total Hidden Costs */}
              <Card className="border-2 border-orange-200 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 gradient-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <AlertTriangle className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Annual Hidden Costs</h3>
                  <div className="text-5xl font-bold text-pink-600 mb-3">
                    {formatCurrency(analysis.totalHiddenCosts)}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">
                    Monthly:{" "}
                    <span className="font-semibold text-pink-600">{formatCurrency(analysis.monthlyMaintenance)}</span>
                  </div>
                  <Badge className="gradient-pink text-white px-4 py-1">Beyond Purchase Price</Badge>
                </CardContent>
              </Card>

              {/* Cost Breakdown Chart */}
              <Card className="border-2 border-pink-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-pink-600" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={analysis.breakdown}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="amount"
                          nameKey="category"
                        >
                          {analysis.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-2 border-dashed border-pink-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-10 w-10 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground">Enter property details to reveal hidden ownership costs</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Cost Details & Suggestions */}
      {analysis && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Detailed Breakdown */}
          <Card className="border-2 border-pink-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.breakdown.map((cost, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: cost.color + "20", color: cost.color }}
                    >
                      {cost.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{cost.category}</div>
                      <div className="text-sm text-muted-foreground">{cost.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{formatCurrency(cost.amount)}</div>
                    <div className="text-sm text-muted-foreground">{cost.percentage}%</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Card className="border-2 border-pink-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Cost-Saving Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{suggestion.title}</h4>
                    <Badge className={`text-xs ${getPriorityColor(suggestion.priority)}`}>{suggestion.priority}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
