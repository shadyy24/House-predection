"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, IndianRupee, Calendar, Percent, TrendingUp, PieChart } from "lucide-react"

interface EMIResult {
  emi: number
  totalAmount: number
  totalInterest: number
  breakdown: Array<{ year: number; principal: number; interest: number; balance: number }>
}

export function EMIStep() {
  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: "",
    tenure: "",
    tenureType: "years",
  })

  const [result, setResult] = useState<EMIResult | null>(null)

  const calculateEMI = () => {
    const principal = Number.parseFloat(formData.loanAmount)
    const annualRate = Number.parseFloat(formData.interestRate)
    const tenureInMonths =
      formData.tenureType === "years" ? Number.parseInt(formData.tenure) * 12 : Number.parseInt(formData.tenure)

    if (!principal || !annualRate || !tenureInMonths) return

    const monthlyRate = annualRate / (12 * 100)
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
      (Math.pow(1 + monthlyRate, tenureInMonths) - 1)

    const totalAmount = emi * tenureInMonths
    const totalInterest = totalAmount - principal

    // Generate year-wise breakdown
    const breakdown = []
    let balance = principal
    const years = Math.ceil(tenureInMonths / 12)

    for (let year = 1; year <= years; year++) {
      const monthsInYear = year === years ? tenureInMonths % 12 || 12 : 12
      let yearlyPrincipal = 0
      let yearlyInterest = 0

      for (let month = 1; month <= monthsInYear; month++) {
        const interestPayment = balance * monthlyRate
        const principalPayment = emi - interestPayment

        yearlyInterest += interestPayment
        yearlyPrincipal += principalPayment
        balance -= principalPayment
      }

      breakdown.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(Math.max(0, balance)),
      })
    }

    setResult({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      breakdown,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full mb-4">
          <Calculator className="h-4 w-4" />
          <span className="text-sm font-semibold">Loan Calculator</span>
        </div>
        <h2 className="text-3xl font-bold gradient-text-cyan mb-2">EMI Calculator</h2>
        <p className="text-muted-foreground">Calculate your home loan EMI and payment schedule</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* EMI Calculator Form */}
        <Card className="border-2 border-cyan-100 shadow-lg">
          <CardHeader className="gradient-cyan text-white">
            <CardTitle className="flex items-center gap-3">
              <Calculator className="h-6 w-6" />
              Loan Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Loan Amount */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <IndianRupee className="h-4 w-4 text-cyan-600" />
                Loan Amount
              </Label>
              <Input
                type="number"
                placeholder="e.g., 5000000"
                value={formData.loanAmount}
                onChange={(e) => setFormData((prev) => ({ ...prev, loanAmount: e.target.value }))}
                className="border-2 border-cyan-100 focus:border-cyan-500"
              />
              <div className="text-xs text-muted-foreground">Enter amount in rupees</div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Percent className="h-4 w-4 text-cyan-600" />
                Interest Rate (Annual)
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                value={formData.interestRate}
                onChange={(e) => setFormData((prev) => ({ ...prev, interestRate: e.target.value }))}
                className="border-2 border-cyan-100 focus:border-cyan-500"
              />
              <div className="text-xs text-muted-foreground">Current home loan rates: 8.5% - 11.5%</div>
            </div>

            {/* Loan Tenure */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-cyan-600" />
                Loan Tenure
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="e.g., 20"
                  value={formData.tenure}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tenure: e.target.value }))}
                  className="border-2 border-cyan-100 focus:border-cyan-500"
                />
                <Select
                  value={formData.tenureType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, tenureType: value }))}
                >
                  <SelectTrigger className="border-2 border-cyan-100 focus:border-cyan-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={calculateEMI}
              disabled={!formData.loanAmount || !formData.interestRate || !formData.tenure}
              className="w-full gradient-cyan text-white hover:opacity-90 transition-opacity py-3"
              size="lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate EMI
            </Button>
          </CardContent>
        </Card>

        {/* EMI Results */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Main EMI Result */}
              <Card className="border-2 border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 gradient-cyan rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <IndianRupee className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Monthly EMI</h3>
                  <div className="text-5xl font-bold text-cyan-600 mb-3">{formatCurrency(result.emi)}</div>
                  <Badge className="gradient-cyan text-white px-4 py-1">Per Month</Badge>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card className="border-2 border-cyan-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-cyan-600" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="text-xl font-bold text-cyan-600">{formatCurrency(result.totalAmount)}</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
                      <div className="text-sm text-muted-foreground">Total Interest</div>
                      <div className="text-xl font-bold text-orange-600">{formatCurrency(result.totalInterest)}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div className="text-sm text-muted-foreground">Principal Amount</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatCurrency(Number.parseFloat(formData.loanAmount))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Year-wise Breakdown */}
              <Card className="border-2 border-cyan-100 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-cyan-600" />
                    Year-wise Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {result.breakdown.map((year) => (
                      <div
                        key={year.year}
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {year.year}
                          </div>
                          <div>
                            <div className="font-semibold">Year {year.year}</div>
                            <div className="text-sm text-muted-foreground">Balance: {formatCurrency(year.balance)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            <span className="text-green-600 font-semibold">P: {formatCurrency(year.principal)}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-orange-600 font-semibold">I: {formatCurrency(year.interest)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-2 border-dashed border-cyan-200 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calculator className="h-10 w-10 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Calculate</h3>
                <p className="text-muted-foreground">Enter your loan details to calculate EMI and payment schedule</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
