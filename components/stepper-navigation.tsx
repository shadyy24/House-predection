"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home, TrendingUp, GitCompare, Calculator, AlertTriangle, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  icon: React.ReactNode
  gradient: string
  color: string
}

const steps: Step[] = [
  {
    id: "prediction",
    title: "House Price Prediction",
    icon: <Home className="h-5 w-5" />,
    gradient: "gradient-teal",
    color: "teal",
  },
  {
    id: "trends",
    title: "Market Trends",
    icon: <TrendingUp className="h-5 w-5" />,
    gradient: "gradient-orange",
    color: "orange",
  },
  {
    id: "compare",
    title: "Property Comparison",
    icon: <GitCompare className="h-5 w-5" />,
    gradient: "gradient-purple",
    color: "purple",
  },
  {
    id: "emi",
    title: "EMI Calculator",
    icon: <Calculator className="h-5 w-5" />,
    gradient: "gradient-cyan",
    color: "cyan",
  },
  {
    id: "hidden-costs",
    title: "Hidden Cost Revealer",
    icon: <AlertTriangle className="h-5 w-5" />,
    gradient: "gradient-pink",
    color: "pink",
  },
]

interface StepperNavigationProps {
  currentStep: number
  onStepChange: (step: number) => void
  children: React.ReactNode
}

export function StepperNavigation({ currentStep, onStepChange, children }: StepperNavigationProps) {
  const canGoNext = currentStep < steps.length - 1
  const canGoPrev = currentStep > 0

  const handleNext = () => {
    if (canGoNext) {
      onStepChange(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (canGoPrev) {
      onStepChange(currentStep - 1)
    }
  }

  return (
    <div className="space-y-8">
      {/* Professional Stepper Navigation */}
      <div className="relative">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-border via-muted to-border -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div
                className={cn(
                  "relative flex flex-col items-center p-4 rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-105",
                  "glass-effect dark:glass-effect-dark floating-card",
                  index === currentStep && "shadow-2xl ring-4 ring-opacity-20",
                  index === currentStep && step.color === "teal" && "ring-teal-500/30 shadow-teal-500/20",
                  index === currentStep && step.color === "orange" && "ring-orange-500/30 shadow-orange-500/20",
                  index === currentStep && step.color === "purple" && "ring-purple-500/30 shadow-purple-500/20",
                  index === currentStep && step.color === "cyan" && "ring-cyan-500/30 shadow-cyan-500/20",
                  index === currentStep && step.color === "pink" && "ring-pink-500/30 shadow-pink-500/20",
                  index < currentStep &&
                    "bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200/50",
                  index > currentStep && "opacity-60",
                )}
                onClick={() => onStepChange(index)}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-300",
                    index === currentStep && `${step.gradient} text-white shadow-lg`,
                    index < currentStep && "bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-md",
                    index > currentStep && "bg-gradient-to-br from-muted to-muted-foreground/20 text-muted-foreground",
                  )}
                >
                  {index < currentStep ? <Check className="h-6 w-6" /> : step.icon}
                </div>

                <div className="text-center min-w-[120px]">
                  <h3
                    className={cn(
                      "font-semibold text-sm mb-2 transition-colors duration-300 text-balance",
                      index === currentStep && "text-foreground",
                      index < currentStep && "text-emerald-700 dark:text-emerald-400",
                      index > currentStep && "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </h3>
                  <div
                    className={cn(
                      "w-8 h-1 rounded-full mx-auto transition-all duration-300",
                      index === currentStep && `${step.gradient}`,
                      index < currentStep && "bg-gradient-to-r from-emerald-500 to-green-500",
                      index > currentStep && "bg-muted",
                    )}
                  />
                </div>
              </div>

              {/* Step Number Badge */}
              <div
                className={cn(
                  "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  index === currentStep && "bg-background text-foreground shadow-md ring-2 ring-background",
                  index < currentStep && "bg-emerald-500 text-white shadow-sm",
                  index > currentStep && "bg-muted text-muted-foreground",
                )}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[600px]">{children}</div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-border/50">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 bg-background/50 backdrop-blur-sm"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="font-semibold">Previous</span>
        </Button>

        <div className="text-center px-6">
          <div className="flex items-center gap-2 mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentStep && `${steps[currentStep].gradient}`,
                  index < currentStep && "bg-emerald-500",
                  index > currentStep && "bg-muted",
                )}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          className={cn(
            "flex items-center gap-3 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50",
            steps[currentStep].gradient,
          )}
        >
          <span>Next</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
