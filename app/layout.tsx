import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aizo - House Price Prediction App",
  description: "Smart AI-powered house price predictions for Tamil Nadu real estate market with stepper navigation",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

function calculatePrice(data) {
  if (!data || !Array.isArray(data)) {
    // Handle error or return default value
    return 0;
  }
  return data.reduce((acc, item) => acc + item.price, 0);
}
