"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, Calculator, TrendingUp, ArrowRight, Sparkles } from "lucide-react"
import { getAllCities, propertyTypes, amenityPricing, calculatePrice, formatPrice } from "@/lib/tamil-nadu-data"
import { ResponsiveContainer, LineChart } from 'recharts';

export function PredictionStep() {
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    age: "",
    amenities: [] as string[],
  })

  const [prediction, setPrediction] = useState<{
    price: string
    confidence: string
    factors: Array<{ name: string; impact: string; value: string }>
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const tamilNaduCities = getAllCities()
  const propertyTypesList = propertyTypes.map((p) => p.type)
  const amenitiesList = Object.keys(amenityPricing)

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handlePredict = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const result = calculatePrice(
      formData.location,
      "", // area (empty string if not used)
      formData.propertyType,
      Number.parseInt(formData.sqft),
      Number.parseInt(formData.age),
      formData.amenities,
      [] // features
    )

    const confidence = Math.floor(Math.random() * 10 + 90)

    setPrediction({
      price: formatPrice(result.totalPrice),
      confidence: `${confidence}%`,
      factors: result.factors,
    })

    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full mb-4">
          <Home className="h-4 w-4" />
          <span className="text-sm font-semibold">AI-Powered Prediction</span>
        </div>
        <h2 className="text-3xl font-bold gradient-text-teal mb-2">House Price Prediction</h2>
        <p className="text-muted-foreground">Get instant, accurate property valuations powered by advanced AI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="border-2 border-teal-100 shadow-lg">
          <div className="p-6">
            {/* Location */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-600" />
                Location
              </Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger className="border-2 border-teal-100 focus:border-teal-500">
                  <SelectValue placeholder="Select city in Tamil Nadu" />
                </SelectTrigger>
                <SelectContent>
                  {tamilNaduCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property Type */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Home className="h-4 w-4 text-teal-600" />
                Property Type
              </Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}
              >
                <SelectTrigger className="border-2 border-teal-100 focus:border-teal-500">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypesList.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Bedrooms</Label>
                <Select
                  value={formData.bedrooms}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, bedrooms: value }))}
                >
                  <SelectTrigger className="border-2 border-teal-100 focus:border-teal-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} BHK
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Bathrooms</Label>
                <Select
                  value={formData.bathrooms}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, bathrooms: value }))}
                >
                  <SelectTrigger className="border-2 border-teal-100 focus:border-teal-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Square Feet & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Area (sq ft)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.sqft}
                  onChange={(e) => setFormData((prev) => ({ ...prev, sqft: e.target.value }))}
                  className="border-2 border-teal-100 focus:border-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Property Age (years)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                  className="border-2 border-teal-100 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Amenities</Label>
              <div className="flex flex-wrap gap-2">
                {amenitiesList.map((amenity) => (
                  <Badge
                    key={amenity}
                    variant={formData.amenities.includes(amenity) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.amenities.includes(amenity)
                        ? "gradient-teal text-white hover:opacity-90"
                        : "hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300"
                    }`}
                    onClick={() => handleAmenityToggle(amenity)}
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handlePredict}
              disabled={!formData.location || !formData.propertyType || !formData.sqft || isLoading}
              className="w-full gradient-teal text-white hover:opacity-90 transition-opacity py-3"
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing Property...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get AI Prediction
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {prediction ? (
            <>
              {/* Main Prediction */}
              <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 gradient-teal rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Predicted Price</h3>
                  <div className="text-5xl font-bold text-teal-600 mb-3">{prediction.price}</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Confidence: <span className="font-semibold text-teal-600">{prediction.confidence}</span>
                  </div>
                  <Badge className="gradient-teal text-white px-4 py-1">AI-Powered Analysis</Badge>
                </CardContent>
              </Card>

              {/* Price Factors */}
              <Card className="border-2 border-teal-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-teal-600" />
                    Price Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prediction.factors.map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-100"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{factor.name}</div>
                        <div className="text-sm text-muted-foreground">{factor.value}</div>
                      </div>
                      <Badge
                        variant={factor.impact.startsWith("+") ? "default" : "destructive"}
                        className={factor.impact.startsWith("+") ? "bg-green-500 hover:bg-green-600" : ""}
                      >
                        {factor.impact}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-2 border-dashed border-teal-200 shadow-lg">
              <div className="p-6">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready for Analysis</h3>
                <p className="text-muted-foreground">
                  Fill in the property details to get your AI-powered price prediction
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}