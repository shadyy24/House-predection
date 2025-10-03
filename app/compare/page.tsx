"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BarChart3, TrendingUp, MapPin, Home, Plus, X } from "lucide-react"
import { getAllCities, calculatePrice, formatPrice, propertyTypes, tamilNaduDistricts } from "@/lib/tamil-nadu-data"

interface PropertyComparison {
  id: string
  location: string
  propertyType: string
  sqft: number
  age: number
  amenities: string[]
  result?: ReturnType<typeof calculatePrice>
}

export default function ComparePage() {
  const [properties, setProperties] = useState<PropertyComparison[]>([
    { id: "1", location: "", propertyType: "", sqft: 1000, age: 0, amenities: [] },
    { id: "2", location: "", propertyType: "", sqft: 1000, age: 0, amenities: [] },
  ])

  const cities = getAllCities()
  const amenityOptions = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Security",
    "Power Backup",
    "Lift",
    "Garden",
    "Club House",
    "Children's Play Area",
    "CCTV",
  ]

  const addProperty = () => {
    if (properties.length < 4) {
      setProperties([
        ...properties,
        {
          id: Date.now().toString(),
          location: "",
          propertyType: "",
          sqft: 1000,
          age: 0,
          amenities: [],
        },
      ])
    }
  }

  const removeProperty = (id: string) => {
    if (properties.length > 2) {
      setProperties(properties.filter((p) => p.id !== id))
    }
  }

  const updateProperty = (id: string, field: keyof PropertyComparison, value: any) => {
    setProperties(properties.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const compareProperties = () => {
    const updatedProperties = properties.map((property) => {
      if (property.location && property.propertyType) {
        const result = calculatePrice(
          property.location,
          "", // area (empty string if not used)
          property.propertyType,
          property.sqft,
          property.age,
          property.amenities,
          [] // features
        )
        return { ...property, result }
      }
      return property
    })
    setProperties(updatedProperties)
  }

  const getDistrictInfo = (city: string) => {
    return tamilNaduDistricts.find((d) => d.cities.some((c) => c.name === city))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Property Price Comparison
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Compare property prices across different locations in Tamil Nadu to make informed investment decisions
          </p>
        </div>

        {/* Property Input Cards */}
        <div className="grid gap-6 mb-8">
          {properties.map((property, index) => (
            <Card key={property.id} className="border-2 border-orange-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Property {index + 1}
                  </CardTitle>
                  {properties.length > 2 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProperty(property.id)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label>Location</Label>
                    <Select
                      value={property.location}
                      onValueChange={(value) => updateProperty(property.id, "location", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Property Type</Label>
                    <Select
                      value={property.propertyType}
                      onValueChange={(value) => updateProperty(property.id, "propertyType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
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

                  <div>
                    <Label>Area (sq ft)</Label>
                    <Input
                      type="number"
                      value={property.sqft}
                      onChange={(e) => updateProperty(property.id, "sqft", Number.parseInt(e.target.value) || 0)}
                      min="100"
                      max="10000"
                    />
                  </div>

                  <div>
                    <Label>Age (years)</Label>
                    <Input
                      type="number"
                      value={property.age}
                      onChange={(e) => updateProperty(property.id, "age", Number.parseInt(e.target.value) || 0)}
                      min="0"
                      max="50"
                    />
                  </div>
                </div>

                {/* District Info */}
                {property.location && (
                  <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                    {(() => {
                      const district = getDistrictInfo(property.location)
                      return district ? (
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                            <MapPin className="w-3 h-3 mr-1" />
                            {district.name} District
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {district.growth}% Growth
                          </Badge>
                          <span className="text-gray-600">{district.description}</span>
                        </div>
                      ) : null
                    })()}
                  </div>
                )}

                {/* Results */}
                {property.result && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-green-800">Estimated Price</h4>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {formatPrice(property.result.totalPrice)}
                        </div>
                        <div className="text-sm text-gray-600">
                          ₹{Math.round(property.result.totalPrice / property.sqft)}/sq ft
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          {properties.length < 4 && (
            <Button
              onClick={addProperty}
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          )}
          <Button
            onClick={compareProperties}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Compare Properties
          </Button>
        </div>

        {/* Comparison Results */}
        {properties.some((p) => p.result) && (
          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardTitle>Comparison Results</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6">
                {properties
                  .filter((p) => p.result)
                  .map((property, index) => (
                    <div key={property.id}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          Property {properties.indexOf(property) + 1} - {property.location}
                        </h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">
                            {formatPrice(property.result!.totalPrice)}
                          </div>
                          <div className="text-sm text-gray-600">
                            ₹{Math.round(property.result!.totalPrice / property.sqft)}/sq ft
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
                        {property.result!.factors.map((factor, idx) => (
                          <div key={idx} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">{factor.name}</div>
                            <div className="font-semibold text-sm">{factor.impact}</div>
                            <div className="text-xs text-gray-500">{factor.value}</div>
                          </div>
                        ))}
                      </div>

                      {index < properties.filter((p) => p.result).length - 1 && <Separator className="my-6" />}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
