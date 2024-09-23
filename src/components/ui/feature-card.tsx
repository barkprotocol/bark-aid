import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  ctaText: string
  ctaLink: string
}

export default function FeatureCard({ title, description, icon, ctaText, ctaLink }: FeatureCardProps) {
  return (
    <Card className="bg-card text-card-foreground hover:shadow-xl transition-shadow duration-300 border border-border">
      <CardHeader className="space-y-1">
        <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-2xl font-syne font-bold text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-poppins text-muted-foreground">{description}</p>
        <Button 
          variant="outline" 
          className="w-full justify-between font-syne text-primary hover:text-primary-foreground hover:bg-primary transition-colors duration-300"
          asChild
        >
          <a href={ctaLink}>
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}