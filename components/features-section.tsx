import { Card, CardContent } from "@/components/ui/card"
import { Brain, MapPin, TrendingUp, Shield, Clock, Users } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze market trends, location factors, and property features for accurate predictions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Tamil Nadu Expertise",
      description:
        "Specialized knowledge of local markets across all 32 districts with region-specific pricing factors.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: TrendingUp,
      title: "Market Trends",
      description:
        "Real-time market analysis with historical data to predict future price movements and investment opportunities.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Shield,
      title: "Verified Data",
      description: "All predictions based on verified property transactions and government-approved registration data.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Clock,
      title: "Instant Results",
      description:
        "Get accurate price predictions in seconds with detailed breakdown of factors affecting the valuation.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Access to real estate experts and market analysts for personalized guidance and consultation.",
      color: "from-indigo-500 to-indigo-600",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">Aizo</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of AI-driven real estate insights tailored specifically for the Tamil Nadu market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="relative mb-6">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  ></div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
