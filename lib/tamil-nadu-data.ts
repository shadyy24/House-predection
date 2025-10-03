export interface District {
  name: string
  cities: City[]
  averagePrice: number // Price per sq ft in INR
  growth: number // Annual growth percentage
  description: string
}

export interface City {
  name: string
  areas: string[]
  averagePrice: number
  growth: number
}

export const tamilNaduDistricts: District[] = [
  {
    name: "Chennai",
    cities: [
      {
        name: "Chennai",
        areas: [
          "T. Nagar",
          "Anna Nagar",
          "Adyar",
          "Velachery",
          "Porur",
          "OMR",
          "ECR",
          "Mylapore",
          "Nungambakkam",
          "Alwarpet",
          "Besant Nagar",
          "Thiruvanmiyur",
          "Sholinganallur",
          "Perungudi",
          "Thoraipakkam",
        ],
        averagePrice: 9500,
        growth: 13.2,
      },
      {
        name: "Tambaram",
        areas: [
          "East Tambaram",
          "West Tambaram",
          "Selaiyur",
          "Chitlapakkam",
          "Medavakkam",
          "Sembakkam",
          "Mudichur",
          "Perungalathur",
        ],
        averagePrice: 6800,
        growth: 11.5,
      },
      {
        name: "Avadi",
        areas: [
          "Avadi Town",
          "Poonamallee",
          "Tiruvallur Road",
          "Red Hills",
          "Ambattur",
          "Korattur",
          "Thirumullaivoyal",
        ],
        averagePrice: 5200,
        growth: 10.8,
      },
      {
        name: "Pallavaram",
        areas: ["Pallavaram Town", "Chromepet", "Anakaputhur", "Pammal", "Hasthinapuram", "Zamin Pallavaram"],
        averagePrice: 7200,
        growth: 12.1,
      },
    ],
    averagePrice: 8500,
    growth: 12.5,
    description: "Capital city with highest property values and strong IT sector presence",
  },
  {
    name: "Coimbatore",
    cities: [
      {
        name: "Coimbatore",
        areas: [
          "RS Puram",
          "Peelamedu",
          "Saravanampatti",
          "Vadavalli",
          "Singanallur",
          "Ganapathy",
          "Kuniyamuthur",
          "Thudiyalur",
          "Saravanampatty",
          "Hopes College",
          "Race Course",
          "Town Hall",
        ],
        averagePrice: 4800,
        growth: 9.2,
      },
      {
        name: "Tirupur",
        areas: ["Tirupur Town", "Avinashi Road", "Dharapuram Road", "Udumalpet Road", "Kangeyam Road", "Palladam Road"],
        averagePrice: 3200,
        growth: 7.8,
      },
      {
        name: "Pollachi",
        areas: ["Pollachi Town", "Udumalaipettai Road", "Palani Road", "Kinathukadavu", "Anamalai"],
        averagePrice: 2800,
        growth: 6.5,
      },
    ],
    averagePrice: 4200,
    growth: 8.3,
    description: "Industrial hub with textile and engineering industries",
  },
  {
    name: "Madurai",
    cities: [
      {
        name: "Madurai",
        areas: [
          "Anna Nagar",
          "KK Nagar",
          "Vilangudi",
          "Thiruparankundram",
          "Sellur",
          "Pasumalai",
          "Tallakulam",
          "SS Colony",
          "Gomathipuram",
          "Avaniyapuram",
          "Mattuthavani",
          "Meenakshi Amman College",
        ],
        averagePrice: 4200,
        growth: 8.1,
      },
      {
        name: "Dindigul",
        areas: ["Dindigul Town", "Palani Road", "Trichy Road", "Batlagundu Road", "Natham Road"],
        averagePrice: 2900,
        growth: 6.8,
      },
      {
        name: "Theni",
        areas: ["Theni Town", "Periyakulam", "Uthamapalayam", "Bodinayakanur", "Andipatti"],
        averagePrice: 2600,
        growth: 6.2,
      },
    ],
    averagePrice: 3800,
    growth: 7.2,
    description: "Cultural capital with growing commercial real estate",
  },
  {
    name: "Tiruchirappalli",
    cities: [
      {
        name: "Tiruchirappalli",
        areas: [
          "Srirangam",
          "Thillai Nagar",
          "KK Nagar",
          "Anna Nagar",
          "Cantonment",
          "Woraiyur",
          "Manachanallur Road",
          "Karur Bypass",
          "Airport Road",
          "Puthur",
        ],
        averagePrice: 3800,
        growth: 7.5,
      },
      {
        name: "Thanjavur",
        areas: [
          "Thanjavur Town",
          "Medical College Road",
          "East Main Street",
          "South Main Street",
          "Punnainallur",
          "Vallam",
        ],
        averagePrice: 2800,
        growth: 6.1,
      },
      {
        name: "Kumbakonam",
        areas: ["Kumbakonam Town", "Swamimalai", "Darasuram", "Thiruvidaimarudur", "Aduthurai"],
        averagePrice: 2400,
        growth: 5.8,
      },
    ],
    averagePrice: 3500,
    growth: 6.8,
    description: "Central Tamil Nadu hub with educational institutions",
  },
  {
    name: "Salem",
    cities: [
      {
        name: "Salem",
        areas: [
          "Five Roads",
          "Fairlands",
          "Ammapet",
          "Hasthampatti",
          "Suramangalam",
          "Kondalampatti",
          "Sankari Main Road",
          "Attur Road",
          "Yercaud Road",
        ],
        averagePrice: 3600,
        growth: 8.2,
      },
      {
        name: "Namakkal",
        areas: ["Namakkal Town", "Tiruchengode", "Rasipuram", "Paramathi Velur", "Kolli Hills Road"],
        averagePrice: 2400,
        growth: 6.5,
      },
      {
        name: "Erode",
        areas: ["Erode Town", "Perundurai", "Bhavani", "Gobichettipalayam", "Sathyamangalam", "Modakurichi"],
        averagePrice: 2800,
        growth: 7.1,
      },
    ],
    averagePrice: 3200,
    growth: 7.5,
    description: "Steel city with industrial development",
  },
  {
    name: "Vellore",
    cities: [
      {
        name: "Vellore",
        areas: [
          "Katpadi",
          "Sathuvachari",
          "Thottapalayam",
          "Officer's Line",
          "Gandhi Nagar",
          "Kosapet",
          "CMC Campus",
          "Bagayam",
        ],
        averagePrice: 4100,
        growth: 9.1,
      },
      {
        name: "Ranipet",
        areas: ["Ranipet Town", "Arcot", "Walajapet", "Nemili", "Sholinghur"],
        averagePrice: 2900,
        growth: 7.2,
      },
      {
        name: "Tirupattur",
        areas: ["Tirupattur Town", "Vaniyambadi", "Ambur", "Natrampalli", "Jolarpet"],
        averagePrice: 3100,
        growth: 7.8,
      },
    ],
    averagePrice: 3600,
    growth: 8.1,
    description: "Educational hub with medical colleges and IT growth",
  },
  {
    name: "Kanchipuram",
    cities: [
      {
        name: "Kanchipuram",
        areas: ["Kanchipuram Town", "Chengalpattu", "Maraimalai Nagar", "Guduvanchery", "Tambaram West", "Urapakkam"],
        averagePrice: 5800,
        growth: 10.4,
      },
      {
        name: "Sriperumbudur",
        areas: ["Sriperumbudur Town", "Oragadam", "Irungattukottai", "Singaperumal Koil", "Poonamallee"],
        averagePrice: 6200,
        growth: 11.8,
      },
    ],
    averagePrice: 5200,
    growth: 9.4,
    description: "Temple city with proximity to Chennai driving growth",
  },
  {
    name: "Nilgiris",
    cities: [
      {
        name: "Udhagamandalam",
        areas: ["Ooty Town", "Coonoor Road", "Mysore Road", "Charring Cross", "Commercial Street", "Fernhill"],
        averagePrice: 8200,
        growth: 12.8,
      },
      {
        name: "Coonoor",
        areas: ["Coonoor Town", "Wellington", "Lovedale", "Sim's Park Area", "Bedford"],
        averagePrice: 6800,
        growth: 10.5,
      },
      {
        name: "Kotagiri",
        areas: ["Kotagiri Town", "Kodanad", "Catherine Falls Road", "Elk Hill"],
        averagePrice: 5200,
        growth: 9.2,
      },
    ],
    averagePrice: 6800,
    growth: 11.2,
    description: "Hill station with premium residential properties",
  },
]

export const propertyTypes = [
  {
    type: "Apartment",
    multiplier: 1.0,
    description: "Multi-story residential buildings",
  },
  {
    type: "Independent House",
    multiplier: 1.2,
    description: "Standalone residential properties",
  },
  {
    type: "Villa",
    multiplier: 1.8,
    description: "Luxury residential properties with amenities",
  },
  {
    type: "Plot/Land",
    multiplier: 0.6,
    description: "Vacant land for construction",
  },
  {
    type: "Commercial Space",
    multiplier: 2.2,
    description: "Office spaces and retail outlets",
  },
  {
    type: "Warehouse",
    multiplier: 0.8,
    description: "Industrial storage facilities",
  },
]

export const amenityPricing = {
  "Swimming Pool": 150,
  Gym: 100,
  Parking: 80,
  Security: 120,
  "Power Backup": 90,
  Lift: 110,
  Garden: 70,
  "Club House": 200,
  "Children's Play Area": 60,
  CCTV: 50,
  "Water Supply": 40,
  Maintenance: 30,
}

export const propertyFeatures = {
  "Smart Home": 300,
  "Solar Panels": 250,
  "Rainwater Harvesting": 100,
  "Waste Management": 80,
  "EV Charging": 200,
  "High Speed Internet": 120,
  "Modular Kitchen": 180,
  "False Ceiling": 90,
  "Wooden Flooring": 150,
  "Marble Flooring": 200,
  Balcony: 100,
  "Terrace Garden": 120,
  "Servant Room": 150,
  "Study Room": 100,
  "Prayer Room": 80,
}

export const locationFactors = {
  "Near Metro": 500,
  "Near IT Park": 400,
  "Near Hospital": 200,
  "Near School": 250,
  "Near Mall": 300,
  "Near Airport": 600,
  "Near Beach": 800,
  "Near Highway": 150,
  "Gated Community": 400,
  "Lake View": 700,
}

export function calculatePrice(
  city: string,
  area: string,
  propertyType: string,
  sqft: number,
  age: number,
  amenities: string[],
  features: string[],
): {
  basePrice: number
  totalPrice: number
  factors: Array<{ name: string; impact: string; value: string }>
} {
  // Find city data
  const cityData = getCityData(city)
  const baseRate = cityData?.averagePrice || 3000

  // Area premium (some areas are more expensive)
  const areaPremium = getAreaPremium(area)
  const adjustedRate = baseRate + areaPremium

  // Property type multiplier
  const propertyData = propertyTypes.find((p) => p.type === propertyType)
  const typeMultiplier = propertyData?.multiplier || 1.0

  // Age depreciation (2% per year after 5 years)
  const ageMultiplier = age > 5 ? 1 - (age - 5) * 0.02 : 1.0

  // Amenities premium
  const amenityValue = Array.isArray(amenities)
    ? amenities.reduce((total, amenity) => {
        return total + (amenityPricing[amenity as keyof typeof amenityPricing] || 0)
      }, 0)
    : 0

  // Features premium
  const featureValue = Array.isArray(features)
  ? features.reduce((total, feature) => {
      return total + (propertyFeatures[feature as keyof typeof propertyFeatures] || 0)
    }, 0)
  : 0

  // Calculate base price
  const basePrice = adjustedRate * sqft * typeMultiplier * ageMultiplier

  // Add amenity and feature premium
  const totalPrice = basePrice + (amenityValue + featureValue) * sqft

  // Calculate factors
  const factors = [
    {
      name: "City Premium",
      impact: cityData ? `+${Math.round(((cityData.averagePrice - 3000) / 3000) * 100)}%` : "+0%",
      value: city,
    },
    {
      name: "Area Premium",
      impact: `+${Math.round((areaPremium / 3000) * 100)}%`,
      value: area,
    },
    {
      name: "Property Type",
      impact: `${typeMultiplier > 1 ? "+" : ""}${Math.round((typeMultiplier - 1) * 100)}%`,
      value: propertyType,
    },
    {
      name: "Property Age",
      impact: `${Math.round((ageMultiplier - 1) * 100)}%`,
      value: `${age} years old`,
    },
    {
      name: "Amenities Premium",
      impact: `+${Math.round((amenityValue / adjustedRate) * 100)}%`,
      value: `${Array.isArray(amenities) ? amenities.length : 0} premium amenities`,
    },
    {
      name: "Features Premium",
      impact: `+${Math.round((featureValue / adjustedRate) * 100)}%`,
      value: `${Array.isArray(features) ? features.length : 0} premium features`,
    },
    {
      name: "Market Trend",
      impact: cityData ? `+${cityData.growth}%` : "+6%",
      value: "Annual growth rate",
    },
  ]

  return {
    basePrice,
    totalPrice,
    factors,
  }
}

function getAreaPremium(area: string): number {
  const premiumAreas: { [key: string]: number } = {
    // Chennai Premium Areas
    "T. Nagar": 2000,
    "Anna Nagar": 1800,
    Adyar: 2200,
    Nungambakkam: 2500,
    Alwarpet: 2300,
    "Besant Nagar": 1900,
    OMR: 1500,
    ECR: 1200,
    Sholinganallur: 1400,

    // Coimbatore Premium Areas
    "RS Puram": 800,
    Peelamedu: 600,
    Saravanampatti: 700,

    // Madurai Premium Areas
    "KK Nagar": 400,

    // Other Premium Areas
    Srirangam: 300,
    "Five Roads": 400,
    Katpadi: 500,
    "Ooty Town": 1500,
    "Coonoor Town": 800,
  }

  return premiumAreas[area] || 0
}

export function getAllCities(): string[] {
  return tamilNaduDistricts.flatMap((district) => district.cities.map((city) => city.name)).sort()
}

export function getAreasByCity(cityName: string): string[] {
  for (const district of tamilNaduDistricts) {
    const city = district.cities.find((c) => c.name === cityName)
    if (city) {
      return city.areas.sort()
    }
  }
  return []
}

export function getCityData(cityName: string): City | null {
  for (const district of tamilNaduDistricts) {
    const city = district.cities.find((c) => c.name === cityName)
    if (city) {
      return city
    }
  }
  return null
}

export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} Lakhs`
  } else {
    return `₹${price.toLocaleString("en-IN")}`
  }
}

