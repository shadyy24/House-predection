"use client"

import { useState } from "react"
import { StepperNavigation } from "@/components/stepper-navigation"
import { PredictionStep } from "@/components/steps/prediction-step"
import { TrendsStep } from "@/components/steps/trends-step"
import { CompareStep } from "@/components/steps/compare-step"
import { EMIStep } from "@/components/steps/emi-step"
import { HiddenCostsStep } from "@/components/steps/hidden-costs-step"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleStepChange = (newStep: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStep(newStep)
      setIsTransitioning(false)
    }, 200)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PredictionStep />
      case 1:
        return <TrendsStep />
      case 2:
        return <CompareStep />
      case 3:
        return <EMIStep />
      case 4:
        return <HiddenCostsStep />
      default:
        return <PredictionStep />
    }
  }

  return (
    <div className="min-h-screen professional-bg dark:professional-bg-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full gradient-teal opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full gradient-orange opacity-10 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full gradient-purple opacity-5 animate-pulse delay-2000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            {/* Main Title */}
            <div className="mb-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="gradient-text-teal">Aizo</span>
                <span className="text-foreground"> Real Estate</span>
              </h1>
              <div className="text-2xl md:text-3xl font-semibold gradient-text-orange mb-2">House Price Prediction</div>
              <p className="text-lg text-muted-foreground font-medium">
                Welcome to the Smart World of Property Analytics
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-slide-in-right">
              <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="w-3 h-3 rounded-full gradient-teal"></div>
                <span className="text-sm font-medium">Instant Property Valuations</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="w-3 h-3 rounded-full gradient-orange"></div>
                <span className="text-sm font-medium">AI-Powered Market Insights</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30">
                <div className="w-3 h-3 rounded-full gradient-purple"></div>
                <span className="text-sm font-medium">Compare & Analyze Properties</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="animate-bounce-in">
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover accurate property valuations, market trends, and comprehensive analytics for Tamil Nadu real
                estate with our advanced AI-powered platform.
              </p>
              <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <span>Start Your Analysis</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Application */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="glass-effect dark:glass-effect-dark rounded-2xl p-6 floating-card animate-fade-in">
          <StepperNavigation currentStep={currentStep} onStepChange={handleStepChange}>
            <div
              className={`mt-8 transition-all duration-300 ${isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
            >
              <div className="animate-fade-in">{renderStep()}</div>
            </div>
          </StepperNavigation>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-lg font-bold gradient-text-teal">Aizo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced AI-powered real estate analytics platform for Tamil Nadu properties.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Price Prediction</li>
                <li>• Market Analysis</li>
                <li>• Property Comparison</li>
                <li>• EMI Calculator</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Technology</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Machine Learning</li>
                <li>• Real-time Data</li>
                <li>• Advanced Analytics</li>
                <li>• Secure Platform</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Aizo Real Estate Analytics. Powered by Advanced AI Technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
