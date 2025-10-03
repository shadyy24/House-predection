"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, MapPin } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const marketTrends = [
  { month: "Jan", price: 4500, growth: 2.1 },
  { month: "Feb", price: 4650, growth: 3.3 },
  { month: "Mar", price: 4800, growth: 3.2 },
  { month: "Apr", price: 4950, growth: 3.1 },
  { month: "May", price: 5100, growth: 3.0 },
  { month: "Jun", price: 5280, growth: 3.5 },
]

const districtData = [
  { district: "Chennai", avgPrice: 8500, growth: 4.2, trend: "up" },
  { district: "Coimbatore", avgPrice: 5200, growth: 3.8, trend: "up" },
  { district: "Madurai", avgPrice: 3800, growth: 2.9, trend: "up" },
  { district: "Tiruchirappalli", avgPrice: 3200, growth: 2.1, trend: "up" },
  { district: "Salem", avgPrice: 2900, growth: 1.8, trend: "up" },
  { district: "Tirunelveli", avgPrice: 2600, growth: -0.5, trend: "down" },
]

const propertyTypeData = [
  { type: "Apartment", price: 5200, change: 3.2 },
  { type: "Villa", price: 7800, change: 4.1 },
  { type: "Independent House", price: 4500, change: 2.8 },
  { type: "Plot", price: 2100, change: 1.9 },
]

export function TrendsStep() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full mb-4">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-semibold">Market Intelligence</span>
        </div>
        <h2 className="text-3xl font-bold gradient-text-orange mb-2">Market Trends Analysis</h2>
        <p className="text-muted-foreground">Real-time insights into Tamil Nadu's real estate market</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Price Trends Chart */}
        <Card className="border-2 border-orange-100 shadow-lg">
          <CardHeader className="gradient-orange text-white">
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6" />
              Price Trends (₹/sq ft)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer
              config={{
                price: {
                  label: "Price per sq ft",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="var(--color-price)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-price)", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700">
                <TrendingUp className="h-4 w-4" />
                <span className="font-semibold">+3.2% growth this month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* District Performance */}
        <Card className="border-2 border-orange-100 shadow-lg">
          <CardHeader className="gradient-orange text-white">
            <CardTitle className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6" />
              District Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ChartContainer
              config={{
                avgPrice: {
                  label: "Average Price",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="district" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="avgPrice" fill="var(--color-avgPrice)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Insights Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Top Performing Districts */}
        <Card className="border-2 border-green-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {districtData.slice(0, 3).map((district, index) => (
              <div key={district.district} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{district.district}</div>
                    <div className="text-sm text-muted-foreground">₹{district.avgPrice}/sq ft</div>
                  </div>
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">+{district.growth}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Property Types */}
        <Card className="border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5" />
              Property Types
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {propertyTypeData.map((property) => (
              <div key={property.type} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold">{property.type}</div>
                  <div className="text-sm text-muted-foreground">₹{property.price}/sq ft</div>
                </div>
                <Badge
                  variant={property.change > 0 ? "default" : "destructive"}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {property.change > 0 ? "+" : ""}
                  {property.change}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Summary */}
        <Card className="border-2 border-purple-100 shadow-lg">
          <CardHeader className="gradient-purple text-white">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              Market Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">₹5,280</div>
              <div className="text-sm text-muted-foreground">Avg. Price/sq ft</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Growth</span>
                <Badge className="gradient-purple text-white">+3.5%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Listings</span>
                <span className="font-semibold">12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Days on Market</span>
                <span className="font-semibold">45 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
