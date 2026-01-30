"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// Interfaces
interface subCategory {
  id: string;
  name: string;
  image: string;
  slug: string;
}

interface Categories {
  id: string;
  name: string;
  image: string;
  slug: string;
  subCategories: subCategory[];
}

export default function Category() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get<Categories[]>("/categories.json");
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-10 group">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white hover:shadow-sm transition-all"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Button>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Browse Categories
            </h2>
            <p className="text-slate-500 text-sm md:text-base">
              Discover our curated collections.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CategorySkeleton key={i} />)
            : categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-28 h-28 md:w-36 md:h-36 mb-4">
                    {/* Circle Background/Border Decor */}
                    <div className="absolute inset-0 rounded-full border border-slate-200 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300" />
                    
                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-sm bg-white p-1">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.png"}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Label */}
                  <span className="text-sm md:text-base font-medium text-slate-700 group-hover:text-primary group-hover:translate-y-[-2px] transition-all duration-300">
                    {category.name}
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center animate-pulse">
      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-slate-200 mb-4" />
      <div className="h-4 w-20 bg-slate-200 rounded-full" />
    </div>
  );
}