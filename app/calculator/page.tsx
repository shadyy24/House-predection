"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, PieChart, TrendingUp, DollarSign } from "lucide-react"
import { formatPrice } from "@/lib/tamil-nadu-data"

export default function CalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(5000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [emiResult, setEmiResult] = useState<{
    emi: number
    totalAmount: number
    totalInterest: number
  } | null>(null)

  const calculateEMI = () => {
    const principal = loanAmount
    const rate = interestRate / 12 / 100
    const time = tenure * 12

    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
    const totalAmount = emi * time
    const totalInterest = totalAmount - principal

    setEmiResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            EMI Calculator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your home loan EMI and plan your property investment in Tamil Nadu
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Input */}
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <Label>Loan Amount</Label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number.parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                  <div className="text-sm text-gray-600 mt-1">{formatPrice(loanAmount)}</div>
                </div>

                <div>
                  <Label>Interest Rate (% per annum)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Loan Tenure (years)</Label>
                  <Select value={tenure.toString()} onValueChange={(value) => setTenure(Number.parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 15, 20, 25, 30].map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year} years
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={calculateEMI}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate EMI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {emiResult && (
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  EMI Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="text-sm text-gray-600 mb-1">Monthly EMI</div>
                    <div className="text-3xl font-bold text-green-600">{formatPrice(emiResult.emi)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                      <div className="font-bold text-blue-600">{formatPrice(emiResult.totalAmount)}</div>
                    </div>

                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                      <div className="font-bold text-orange-600">{formatPrice(emiResult.totalInterest)}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Principal Amount</span>
                      <span className="font-semibold">{formatPrice(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Interest Component</span>
                      <span className="font-semibold text-orange-600">{formatPrice(emiResult.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-semibold">Total Payable</span>
                      <span className="font-bold text-blue-600">{formatPrice(emiResult.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Interest Rate Guide */}
        <Card className="mt-8 border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle>Current Interest Rate Guide</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-700 mb-2">SBI Home Loan</h3>
                <div className="text-2xl font-bold text-green-600">8.50%</div>
                <div className="text-sm text-gray-600">Starting rate</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-700 mb-2">HDFC Home Loan</h3>
                <div className="text-2xl font-bold text-blue-600">8.75%</div>
                <div className="text-sm text-gray-600">Starting rate</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-orange-700 mb-2">ICICI Home Loan</h3>
                <div className="text-2xl font-bold text-orange-600">8.65%</div>
                <div className="text-sm text-gray-600">Starting rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
