"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, MapPin, Building, DollarSign, BarChart3 } from "lucide-react"
import { tamilNaduDistricts } from "@/lib/tamil-nadu-data"

export default function TrendsPage() {
  const sortedByGrowth = [...tamilNaduDistricts].sort((a, b) => b.growth - a.growth)
  const sortedByPrice = [...tamilNaduDistricts].sort((a, b) => b.averagePrice - a.averagePrice)

  const avgGrowth = tamilNaduDistricts.reduce((sum, d) => sum + d.growth, 0) / tamilNaduDistricts.length
  const avgPrice = tamilNaduDistricts.reduce((sum, d) => sum + d.averagePrice, 0) / tamilNaduDistricts.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Tamil Nadu Real Estate Market Trends
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of property market trends across Tamil Nadu districts
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-blue-100">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{tamilNaduDistricts.length}</div>
              <div className="text-sm text-gray-600">Districts Covered</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{avgGrowth.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg Growth Rate</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">₹{Math.round(avgPrice)}</div>
              <div className="text-sm text-gray-600">Avg Price/sq ft</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardContent className="p-6 text-center">
              <Building className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {tamilNaduDistricts.reduce((sum, d) => sum + d.cities.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Cities Analyzed</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Growth Districts */}
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Fastest Growing Districts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {sortedByGrowth.slice(0, 8).map((district, index) => (
                  <div key={district.name} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{district.name}</div>
                        <div className="text-sm text-gray-600">{district.cities.length} cities</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 mb-1">
                        +{district.growth}%
                      </Badge>
                      <div className="text-sm text-gray-600">₹{district.averagePrice}/sq ft</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Premium Districts */}
          <Card className="border-2 border-orange-200">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Premium Price Districts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {sortedByPrice.slice(0, 8).map((district, index) => (
                  <div key={district.name} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{district.name}</div>
                        <div className="text-sm text-gray-600">{district.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-600">₹{district.averagePrice}</div>
                      <div className="text-sm text-gray-600">per sq ft</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Districts Overview */}
        <Card className="mt-8 border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Complete District Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              {tamilNaduDistricts.map((district) => (
                <div
                  key={district.name}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{district.name}</h3>
                      <p className="text-sm text-gray-600">{district.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-purple-600">₹{district.averagePrice}/sq ft</div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        +{district.growth}% growth
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Growth Rate</span>
                      <span>{district.growth}%</span>
                    </div>
                    <Progress value={(district.growth / 15) * 100} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {district.cities.map((city) => (
                      <Badge key={city} variant="outline" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
