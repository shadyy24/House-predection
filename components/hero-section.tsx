import { Button } from "@/components/ui/button"
import { ArrowRight, Home, TrendingUp, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top welcome message */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            Welcome to the Smart World
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Aizo</span>
              <br />
              <span className="text-foreground">House Price</span>
              <br />
              <span className="text-foreground">Prediction</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Discover accurate property valuations across Tamil Nadu with our AI-powered prediction engine. Make
              informed real estate decisions with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="gradient-primary text-white hover:opacity-90 transition-opacity">
                Get Price Prediction
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
              >
                Explore Market Trends
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Properties Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">32</div>
                <div className="text-sm text-muted-foreground">Tamil Nadu Districts</div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">
              {/* Mock prediction interface */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Quick Prediction</h3>
                    <p className="text-sm text-muted-foreground">Get instant estimates</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Chennai, Tamil Nadu</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Home className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">2 BHK Apartment</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">1200 sq ft</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white text-center">
                  <div className="text-sm opacity-90 mb-1">Estimated Price</div>
                  <div className="text-3xl font-bold">₹85.5 Lakhs</div>
                  <div className="text-sm opacity-90 mt-1">+12% from last year</div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
