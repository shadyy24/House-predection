import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MapPin, Home } from "lucide-react"
import { tamilNaduDistricts } from "@/lib/tamil-nadu-data"

export function MarketInsights() {
  // Sort districts by growth rate
  const topGrowthDistricts = [...tamilNaduDistricts].sort((a, b) => b.growth - a.growth).slice(0, 6)

  // Sort districts by average price
  const premiumDistricts = [...tamilNaduDistricts].sort((a, b) => b.averagePrice - a.averagePrice).slice(0, 6)

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Tamil Nadu <span className="gradient-text">Market Insights</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the fastest-growing and premium real estate markets across Tamil Nadu
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Top Growth Markets */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-green-500" />
              Fastest Growing Markets
            </h3>
            <div className="space-y-4">
              {topGrowthDistricts.map((district, index) => (
                <Card key={district.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{district.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {district.cities.slice(0, 3).join(", ")}
                            {district.cities.length > 3 && ` +${district.cities.length - 3} more`}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600">+{district.growth}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{district.description}</p>
                    <div className="mt-3 text-sm font-medium text-primary">
                      ₹{district.averagePrice.toLocaleString()}/sq ft
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Markets */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Home className="h-6 w-6 text-primary" />
              Premium Markets
            </h3>
            <div className="space-y-4">
              {premiumDistricts.map((district, index) => (
                <Card key={district.name} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{district.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {district.cities.slice(0, 3).join(", ")}
                            {district.cities.length > 3 && ` +${district.cities.length - 3} more`}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-primary text-primary">
                        ₹{district.averagePrice.toLocaleString()}/sq ft
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{district.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">+{district.growth}% growth</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
