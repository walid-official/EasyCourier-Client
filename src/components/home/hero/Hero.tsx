import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, ArrowRight } from "lucide-react"
import Image from "next/image"

export const Hero = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                <Truck className="w-3 h-3 mr-1" />
                Trusted Delivery Solutions
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-white">
                Manage Your <span className="text-emerald-400">Courier Business</span> Efficiently
              </h1>

              <p className="max-w-[600px] text-slate-300 text-lg md:text-xl leading-relaxed">
                Streamline deliveries, track packages in real-time, and grow your courier business with our
                comprehensive management platform.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-base">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent text-slate-300 border-slate-600 hover:bg-slate-800 hover:text-white px-8 py-3 text-base"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-400">Active Couriers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-slate-400">Delivery Success</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-3xl opacity-20"></div>
              <Image
                src="/images/delivery-person.jpg"
                width="500"
                height="600"
                alt="Professional courier delivering packages"
                className="relative mx-auto aspect-[5/6] overflow-hidden rounded-2xl object-cover shadow-2xl"
              />

              {/* Floating status card */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-700">Delivery in Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
