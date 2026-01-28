"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Frown, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center lg:px-30 xl:px-60 px-5 space-y-8 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <Frown
              size={100}
              className="text-slate-900 dark:text-white"
              strokeWidth={1.5}
            />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-pulse blur-sm opacity-50"></div>
          </div>
        </div>

        <h1 className="text-7xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
          4<span className="text-orange-500">0</span>4
        </h1>

        <h2 className="text-2xl font-semibold italic">
          Oops! Something went wrong...
        </h2>

        <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link href="/">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 rounded-md shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer">
            <Home className="h-5 w-5" />
            Back to Home
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-6 cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
          Previous Page
        </Button>
      </div>

      <div className="pt-10">
        <div className="h-1 w-20 bg-orange-500 rounded-full opacity-30 mx-auto"></div>
      </div>
    </div>
  );
}
