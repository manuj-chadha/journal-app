import React from "react";
import {
  Book,
  Sparkles,
  Lock,
  Calendar,
  ChevronRight,
  BarChart2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { Card, CardContent } from "@/components/ui/card";
import faqs from "../lib/faqs.json";

const dummyAdvice = "What are you most grateful for today?";

const features = [
  {
    icon: Book,
    title: "Rich Text Editor",
    description:
      "Express yourself with a powerful editor supporting markdown, formatting, and more.",
  },
  {
    icon: Sparkles,
    title: "Daily Inspiration",
    description:
      "Get inspired with daily prompts and mood-based imagery to spark your creativity.",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description:
      "Your thoughts are safe with enterprise-grade security and privacy features.",
  },
];

export default function Home() {
  return (
    <div className="relative container mx-auto px-4 pt-16 pb-16">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl lg:text-8xl gradient-title mb-6">
          Your Space to Reflect. <br /> Your Story to Tell.
        </h1>
        <p className="text-lg md:text-xl text-pink-600 mb-8">
          Capture your thoughts, track your moods, and reflect on your journey
          in a beautiful, secure space.
        </p>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-pink-50 via-transparent to-transparent pointer-events-none z-10" />
          <div className="bg-[#FEEBF6] rounded-2xl p-4 max-full mx-auto">
            <div className="border-b border-pink-200 pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-pink-500" />
                <span className="text-pink-700 font-medium">
                  Today&rsquo;s Entry
                </span>
              </div>
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-pink-700" />
                <div className="h-3 w-3 rounded-full bg-pink-700" />
                <div className="h-3 w-3 rounded-full bg-pink-700" />
              </div>
            </div>
            <div className="space-y-4 p-4">
              <h3 className="text-xl font-semibold text-pink-700">
                {dummyAdvice}
              </h3>
              <Skeleton className="h-4 bg-pink-100 rounded w-3/4" />
              <Skeleton className="h-4 bg-pink-200 rounded w-full" />
              <Skeleton className="h-4 bg-pink-300 rounded w-2/3" />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-pink-400 to-pink-500 text-white hover:from-pink-500 hover:to-rose-500 active:scale-95 transition shadow-md hover:shadow-lg px-8 py-6 rounded-full flex items-center gap-2"
          >
            Start Writing <ChevronRight className="h-5 w-5" />
          </Button>
          <a href="#features">
            <Button
              variant="outline"
              className="px-8 py-6 rounded-full border-pink-500 text-pink-500 hover:bg-pink-100"
            >
              Learn More
            </Button>
          </a>
        </div>
      </div>

      {/* Feature Cards */}
      <section
        id="features"
        className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-pink-50 border border-pink-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="font-semibold text-xl text-pink-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-pink-500">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Feature Sections */}
      <div className="space-y-24 mt-24">
        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-left">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-pink-700">
              Rich Text Editor
            </h3>
            <p className="text-lg text-pink-500">
              Express yourself fully with our powerful editor featuring:
            </p>
            <ul className="space-y-3 text-pink-500">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Format text with ease</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Embed links</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-pink-200">
            <div className="flex gap-2 mb-6">
              <div className="h-8 w-8 rounded bg-pink-100"></div>
              <div className="h-8 w-8 rounded bg-pink-100"></div>
              <div className="h-8 w-8 rounded bg-pink-100"></div>
            </div>
            <div className="h-4 bg-pink-50 rounded w-3/4"></div>
            <div className="h-4 bg-pink-50 rounded w-full"></div>
            <div className="h-4 bg-pink-50 rounded w-2/3"></div>
            <div className="h-4 bg-pink-50 rounded w-1/3"></div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-12 md:flex-row-reverse">
          <div className="space-y-6 md:order-2 text-left">
            <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-pink-700">
              Mood Analytics
            </h3>
            <p className="text-lg text-pink-500">
              Track your emotional journey with powerful analytics:
            </p>
            <ul className="space-y-3 text-pink-500">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Visual mood trends</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-pink-400" />
                <span>Pattern recognition</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4 bg-white rounded-2xl shadow-xl p-6 border border-pink-200 md:order-1">
            <div className="h-40 bg-gradient-to-t from-pink-100 to-pink-50 rounded-lg"></div>
            <div className="flex justify-between">
              <div className="h-4 w-16 bg-pink-100 rounded"></div>
              <div className="h-4 w-16 bg-pink-100 rounded"></div>
              <div className="h-4 w-16 bg-pink-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <TestimonialCarousel />

      {/* FAQ Section */}
      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-pink-700 text-lg">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-pink-600 text-left">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA Section */}
      <div className="mt-24">
        <Card className="bg-gradient-to-r from-pink-100 to-rose-100">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold text-pink-700 mb-6">
              Start Reflecting on Your Journey Today
            </h2>
            <p className="text-lg text-pink-500 mb-8 max-w-2xl mx-auto">
              Join thousands of writers who have already discovered the power of
              digital journaling.
            </p>
            <Button className="animate-bounce bg-pink-500 text-white hover:bg-pink-600 px-6 py-3 rounded-md">
              Get Started for Free <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
