'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Check, X } from 'lucide-react'

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  notIncluded: string[]
}

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "$9.99",
    description: "Perfect for getting started",
    features: ["5 transactions per day", "Basic analytics", "Email support"],
    notIncluded: ["Advanced security", "Custom branding", "API access"]
  },
  {
    name: "Pro",
    price: "$29.99",
    description: "For growing businesses",
    features: ["Unlimited transactions", "Advanced analytics", "Priority support", "Advanced security"],
    notIncluded: ["Custom branding", "API access"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: ["Unlimited transactions", "Advanced analytics", "24/7 phone support", "Advanced security", "Custom branding", "API access"],
    notIncluded: []
  }
]

export default function PricingSection() {
  return (
    <section className="py-16 bg-background text-foreground">
      <div className="container mx-auto">
        <h2 className="text-4xl font-syne font-bold text-center mb-4 text-primary">
          Choose Your Plan
        </h2>
        <p className="text-center text-lg mb-12 text-muted-foreground font-poppins">
          Select the perfect plan for your needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card key={index} className={`flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${index === 1 ? 'border-primary' : 'border-border'}`}>
              <CardHeader>
                <CardTitle className="text-2xl font-syne font-bold text-primary">{tier.name}</CardTitle>
                <CardDescription className="text-xl font-semibold text-secondary">{tier.price}</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                  {tier.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <X className="mr-2 h-4 w-4 text-destructive" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full font-syne" variant={index === 1 ? "default" : "outline"}>
                  Choose {tier.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}