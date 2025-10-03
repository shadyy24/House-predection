import { TrendingUp, Users, MapPin, Award } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "₹2.5Cr+",
      label: "Property Value Analyzed",
      description: "Total worth of properties evaluated",
    },
    {
      icon: Users,
      value: "10K+",
      label: "Happy Customers",
      description: "Satisfied users across Tamil Nadu",
    },
    {
      icon: MapPin,
      value: "500+",
      label: "Locations Covered",
      description: "Cities and towns in Tamil Nadu",
    },
    {
      icon: Award,
      value: "4.9/5",
      label: "User Rating",
      description: "Average customer satisfaction",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span> Across Tamil Nadu
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform has helped countless individuals make informed real estate decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>

              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{stat.value}</div>

              <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>

              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
