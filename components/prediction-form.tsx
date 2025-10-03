"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, Calculator, TrendingUp, ArrowRight } from "lucide-react"
import { getAllCities, propertyTypes, amenityPricing, calculatePrice, formatPrice } from "@/lib/tamil-nadu-data"

export function PredictionForm() {
  const [formData, setFormData] = useState({
    location: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    age: "",
    amenities: [] as string[],
    description: "",
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const result = calculatePrice(
      formData.location,
      formData.propertyType,
      Number.parseInt(formData.sqft),
      Number.parseInt(formData.age),
      formData.amenities,
    )

    const confidence = Math.floor(Math.random() * 10 + 90) // 90-99%

    setPrediction({
      price: formatPrice(result.totalPrice),
      confidence: `${confidence}%`,
      factors: result.factors,
    })

    setIsLoading(false)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get Your <span className="gradient-text">Price Prediction</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill in your property details and get an instant AI-powered price prediction
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <Card className="border-2 border-orange-100">
            <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardTitle className="flex items-center gap-3">
                <Calculator className="h-6 w-6" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
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
                <Label htmlFor="propertyType" className="text-sm font-semibold flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  Property Type
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}
                >
                  <SelectTrigger>
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
                  <Label htmlFor="bedrooms" className="text-sm font-semibold">
                    Bedrooms
                  </Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bedrooms: value }))}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="bathrooms" className="text-sm font-semibold">
                    Bathrooms
                  </Label>
                  <Select
                    value={formData.bathrooms}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bathrooms: value }))}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="sqft" className="text-sm font-semibold">
                    Area (sq ft)
                  </Label>
                  <Input
                    id="sqft"
                    type="number"
                    placeholder="e.g., 1200"
                    value={formData.sqft}
                    onChange={(e) => setFormData((prev) => ({ ...prev, sqft: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-semibold">
                    Property Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 5"
                    value={formData.age}
                    onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
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
                      className={`cursor-pointer transition-colors ${
                        formData.amenities.includes(amenity)
                          ? "bg-primary hover:bg-primary/90"
                          : "hover:bg-primary hover:text-white"
                      }`}
                      onClick={() => handleAmenityToggle(amenity)}
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Additional Details (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Any additional information about the property..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <Button
                onClick={handlePredict}
                disabled={!formData.location || !formData.propertyType || !formData.sqft || isLoading}
                className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Property...
                  </>
                ) : (
                  <>
                    Get Price Prediction
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {prediction ? (
              <>
                {/* Main Prediction */}
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Predicted Price</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">{prediction.price}</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Confidence: <span className="font-semibold text-green-600">{prediction.confidence}</span>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-700">
                      AI-Powered Prediction
                    </Badge>
                  </CardContent>
                </Card>

                {/* Price Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Price Factors Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {prediction.factors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{factor.name}</div>
                          <div className="text-sm text-muted-foreground">{factor.value}</div>
                        </div>
                        <Badge
                          variant={factor.impact.startsWith("+") ? "default" : "destructive"}
                          className={factor.impact.startsWith("+") ? "bg-green-500" : ""}
                        >
                          {factor.impact}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed border-muted">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready for Prediction</h3>
                  <p className="text-muted-foreground">
                    Fill in the property details on the left to get your AI-powered price prediction
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
