"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";

export default function CategoryDetails({ slug }: { slug: string }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const getCategory = async () => {
    try {
      const { data } = await axios.get<Category[]>("/categories.json");
      const matchedCategory = data.find((item) => item.slug === slug);
      setCategory(matchedCategory || null);
    } catch (error) {
      console.error("Failed to fetch category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-20 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">Category not found</h2>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* back */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 text-slate-500 hover:text-slate-900 transition-colors gap-1 cursor-pointer"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Categories
        </Button>
        
        <div className="mt-4">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            {category.name}
          </h1>
          <p className="mt-2 text-slate-500 max-w-2xl">
            Discover our premium selection of {category.name.toLowerCase()} essentials.
          </p>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {category.subCategories.map((sub) => (
          <div
            key={sub.id}
            className="group cursor-pointer"
          >
            {/* Image Container */}
            <div className="aspect-4/5 relative bg-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-500 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
              <Image
                src={sub.image}
                alt={sub.name}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                fill
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="mt-4 px-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-slate-900 group-hover:text-primary transition-colors">
                  {sub.name}
                </h3>
                <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mt-1 font-semibold">
                Explore Items
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}