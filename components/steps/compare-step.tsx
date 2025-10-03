"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GitCompare,
  MapPin,
  Home,
  Ruler,
  Calendar,
  Star,
  Wifi,
  Car,
  Shield,
  Zap,
  Waves,
  TreePine,
  Building2,
  ArrowUpDown,
  Navigation,
} from "lucide-react"
import { getAllCities, getAreasByCity, propertyTypes } from "@/lib/tamil-nadu-data"

interface Property {
  id: string
  city: string
  area: string
  propertyType: string
  price: number
  sqft: number
  bedrooms: number
  bathrooms: number
  age: number
  amenities: string[]
  image: string
  rating: number
}

const sampleProperties: Property[] = [
  {
    id: "1",
    city: "Chennai",
    area: "T. Nagar",
    propertyType: "Apartment",
    price: 12500000,
    sqft: 1200,
    bedrooms: 3,
    bathrooms: 2,
    age: 2,
    rating: 4.5,
    amenities: ["Swimming Pool", "Gym", "Parking", "Security", "Power Backup"],
    image: "/modern-apartment-chennai.jpg",
  },
  {
    id: "2",
    city: "Chennai",
    area: "Anna Nagar",
    propertyType: "Villa",
    price: 18500000,
    sqft: 2200,
    bedrooms: 4,
    bathrooms: 3,
    age: 1,
    rating: 4.8,
    amenities: ["Garden", "Swimming Pool", "Gym", "Security", "Solar Panels"],
    image: "/luxury-villa-chennai.jpg",
  },
  {
    id: "3",
    city: "Coimbatore",
    area: "RS Puram",
    propertyType: "Apartment",
    price: 7200000,
    sqft: 1100,
    bedrooms: 2,
    bathrooms: 2,
    age: 3,
    rating: 4.2,
    amenities: ["Gym", "Parking", "Security", "Clubhouse"],
    image: "/apartment-coimbatore.jpg",
  },
  {
    id: "4",
    city: "Coimbatore",
    area: "Peelamedu",
    propertyType: "Villa",
    price: 11800000,
    sqft: 1800,
    bedrooms: 4,
    bathrooms: 3,
    age: 2,
    rating: 4.6,
    amenities: ["Garden", "Parking", "Security", "Power Backup", "Bore Well"],
    image: "/villa-coimbatore.jpg",
  },
  {
    id: "5",
    city: "Madurai",
    area: "Anna Nagar",
    propertyType: "Independent House",
    price: 5500000,
    sqft: 1500,
    bedrooms: 3,
    bathrooms: 2,
    age: 5,
    rating: 4.0,
    amenities: ["Parking", "Bore Well", "Solar Panels"],
    image: "/independent-house-madurai.jpg",
  },
  {
    id: "6",
    city: "Madurai",
    area: "KK Nagar",
    propertyType: "Apartment",
    price: 3800000,
    sqft: 600,
    bedrooms: 1,
    bathrooms: 1,
    age: 1,
    rating: 4.3,
    amenities: ["Gym", "Security", "Power Backup"],
    image: "/studio-apartment-madurai.jpg",
  },
  {
    id: "7",
    city: "Salem",
    area: "Five Roads",
    propertyType: "Apartment",
    price: 4200000,
    sqft: 900,
    bedrooms: 2,
    bathrooms: 2,
    age: 3,
    rating: 4.1,
    amenities: ["Parking", "Security", "Power Backup"],
    image: "/apartment-salem.jpg",
  },
  {
    id: "8",
    city: "Vellore",
    area: "Katpadi",
    propertyType: "Villa",
    price: 8500000,
    sqft: 1600,
    bedrooms: 3,
    bathrooms: 2,
    age: 2,
    rating: 4.4,
    amenities: ["Garden", "Parking", "Security", "Bore Well"],
    image: "/villa-vellore.jpg",
  },
]

const getAmenityIcon = (amenity: string) => {
  const iconMap: { [key: string]: any } = {
    "Swimming Pool": Waves,
    Gym: Building2,
    Parking: Car,
    Security: Shield,
    "Power Backup": Zap,
    Garden: TreePine,
    "Solar Panels": Zap,
    "Bore Well": Waves,
    Clubhouse: Building2,
    Wifi: Wifi,
  }
  return iconMap[amenity] || Building2
}

export function CompareStep() {
  const [row1, setRow1] = useState<{
    city1: string
    area1: string
    propertyType1: string
    property1: Property | null
    city2: string
    area2: string
    propertyType2: string
    property2: Property | null
  }>({
    city1: "",
    area1: "",
    propertyType1: "",
    property1: null,
    city2: "",
    area2: "",
    propertyType2: "",
    property2: null,
  })

  const [row2, setRow2] = useState<{
    city1: string
    area1: string
    propertyType1: string
    property1: Property | null
    city2: string
    area2: string
    propertyType2: string
    property2: Property | null
  }>({
    city1: "",
    area1: "",
    propertyType1: "",
    property1: null,
    city2: "",
    area2: "",
    propertyType2: "",
    property2: null,
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getPricePerSqft = (price: number, sqft: number) => {
    return Math.round(price / sqft)
  }

  const getFilteredProperties = (city: string, area: string, propertyType: string) => {
    return sampleProperties.filter((p) => p.city === city && p.area === area && p.propertyType === propertyType)
  }

  const updateRowProperty = (rowNum: 1 | 2, side: 1 | 2, city: string, area: string, propertyType: string) => {
    const filteredProps = getFilteredProperties(city, area, propertyType)
    const property = filteredProps.length > 0 ? filteredProps[0] : null

    if (rowNum === 1) {
      setRow1((prev) => ({
        ...prev,
        [`city${side}`]: city,
        [`area${side}`]: area,
        [`propertyType${side}`]: propertyType,
        [`property${side}`]: property,
      }))
    } else {
      setRow2((prev) => ({
        ...prev,
        [`city${side}`]: city,
        [`area${side}`]: area,
        [`propertyType${side}`]: propertyType,
        [`property${side}`]: property,
      }))
    }
  }

  const PropertyCard = ({ property, isLeft = true }: { property: Property | null; isLeft?: boolean }) => {
    if (!property) {
      return (
        <Card className="h-full border-2 border-dashed border-gray-200 bg-gray-50">
          <CardContent className="p-6 h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Select city, area and type</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card
        className={`h-full border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
          isLeft ? "border-teal-200 hover:border-teal-400" : "border-orange-200 hover:border-orange-400"
        }`}
      >
        <div className="relative">
          <img
            src={property.image || "/placeholder.svg"}
            alt={`${property.propertyType} in ${property.area}, ${property.city}`}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-semibold ${
              isLeft ? "bg-teal-500" : "bg-orange-500"
            }`}
          >
            {property.propertyType}
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{property.rating}</span>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <div className={`text-3xl font-bold ${isLeft ? "text-teal-600" : "text-orange-600"}`}>
                {formatPrice(property.price)}
              </div>
              <div className="text-sm text-gray-500">₹{getPricePerSqft(property.price, property.sqft)}/sq ft</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className={`h-5 w-5 ${isLeft ? "text-teal-500" : "text-orange-500"}`} />
                <span className="font-semibold">{property.city}</span>
              </div>
              <div className="flex items-center gap-3">
                <Navigation className={`h-5 w-5 ${isLeft ? "text-teal-500" : "text-orange-500"}`} />
                <span className="text-sm text-gray-600">{property.area}</span>
              </div>
              <div className="flex items-center gap-3">
                <Home className={`h-5 w-5 ${isLeft ? "text-teal-500" : "text-orange-500"}`} />
                <span>
                  {property.bedrooms} BHK • {property.bathrooms} Bath
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Ruler className={`h-5 w-5 ${isLeft ? "text-teal-500" : "text-orange-500"}`} />
                <span>{property.sqft} sq ft</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className={`h-5 w-5 ${isLeft ? "text-teal-500" : "text-orange-500"}`} />
                <span>{property.age} years old</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {property.amenities.slice(0, 4).map((amenity) => {
                  const IconComponent = getAmenityIcon(amenity)
                  return (
                    <div
                      key={amenity}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                        isLeft ? "bg-teal-100 text-teal-700" : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      <IconComponent className="h-3 w-3" />
                      {amenity}
                    </div>
                  )
                })}
                {property.amenities.length > 4 && (
                  <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{property.amenities.length - 4} more
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const ComparisonRow = ({
    rowData,
    rowNum,
    title,
  }: {
    rowData: any
    rowNum: 1 | 2
    title: string
  }) => (
    <Card className="border-2 border-purple-100 shadow-lg">
      <CardHeader className="gradient-purple text-white">
        <CardTitle className="flex items-center gap-3">
          <GitCompare className="h-6 w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Property 1 Selectors */}
          <div className="space-y-4">
            <h3 className="font-semibold text-teal-600 flex items-center gap-2">
              <div className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              Property 1
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Select
                onValueChange={(value) => {
                  const newRowData = { ...rowData, [`city1`]: value, [`area1`]: "", [`propertyType1`]: "" }
                  if (rowNum === 1) setRow1(newRowData)
                  else setRow2(newRowData)
                }}
              >
                <SelectTrigger className="border-teal-200 focus:border-teal-400">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {getAllCities().map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                disabled={!rowData[`city1`]}
                onValueChange={(value) => {
                  const newRowData = { ...rowData, [`area1`]: value, [`propertyType1`]: "" }
                  if (rowNum === 1) setRow1(newRowData)
                  else setRow2(newRowData)
                }}
              >
                <SelectTrigger className="border-teal-200 focus:border-teal-400">
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent>
                  {rowData[`city1`] &&
                    getAreasByCity(rowData[`city1`]).map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                disabled={!rowData[`area1`]}
                onValueChange={(value) => updateRowProperty(rowNum, 1, rowData[`city1`], rowData[`area1`], value)}
              >
                <SelectTrigger className="border-teal-200 focus:border-teal-400">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.type} value={type.type}>
                      {type.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property 2 Selectors */}
          <div className="space-y-4">
            <h3 className="font-semibold text-orange-600 flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              Property 2
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Select
                onValueChange={(value) => {
                  const newRowData = { ...rowData, [`city2`]: value, [`area2`]: "", [`propertyType2`]: "" }
                  if (rowNum === 1) setRow1(newRowData)
                  else setRow2(newRowData)
                }}
              >
                <SelectTrigger className="border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {getAllCities().map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                disabled={!rowData[`city2`]}
                onValueChange={(value) => {
                  const newRowData = { ...rowData, [`area2`]: value, [`propertyType2`]: "" }
                  if (rowNum === 1) setRow1(newRowData)
                  else setRow2(newRowData)
                }}
              >
                <SelectTrigger className="border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent>
                  {rowData[`city2`] &&
                    getAreasByCity(rowData[`city2`]).map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                disabled={!rowData[`area2`]}
                onValueChange={(value) => updateRowProperty(rowNum, 2, rowData[`city2`], rowData[`area2`], value)}
              >
                <SelectTrigger className="border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.type} value={type.type}>
                      {type.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <PropertyCard property={rowData.property1} isLeft={true} />
          <PropertyCard property={rowData.property2} isLeft={false} />
        </div>

        {rowData.property1 && rowData.property2 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ArrowUpDown className="h-5 w-5 text-purple-600" />
              Quick Comparison
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-600">Price Difference</div>
                <div
                  className={`font-bold ${
                    rowData.property1.price > rowData.property2.price ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatPrice(Math.abs(rowData.property1.price - rowData.property2.price))}
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-600">Size Difference</div>
                <div
                  className={`font-bold ${
                    rowData.property1.sqft > rowData.property2.sqft ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.abs(rowData.property1.sqft - rowData.property2.sqft)} sq ft
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-600">Better Value</div>
                <div className="font-bold text-purple-600">
                  {getPricePerSqft(rowData.property1.price, rowData.property1.sqft) <
                  getPricePerSqft(rowData.property2.price, rowData.property2.sqft)
                    ? "Property 1"
                    : "Property 2"}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full mb-4">
          <GitCompare className="h-4 w-4" />
          <span className="text-sm font-semibold">Enhanced Side-by-Side Analysis</span>
        </div>
        <h2 className="text-3xl font-bold gradient-text-purple mb-2">Property Comparison</h2>
        <p className="text-muted-foreground">Compare properties with detailed city and area selection</p>
      </div>

      <ComparisonRow rowData={row1} rowNum={1} title="Comparison Set 1" />

      <ComparisonRow rowData={row2} rowNum={2} title="Comparison Set 2" />
    </div>
  )
}
