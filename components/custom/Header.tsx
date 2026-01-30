"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronDown,
  ShoppingBag,
  Heart,
  Search,
  Menu,
  User,
  LogOut,
  LocateFixed,
  MoreHorizontal,
} from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Badge } from "../ui/badge";
import axios from "axios";

interface Categories {
  id: string;
  name: string;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function Header() {
  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState("All");
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Categories[]>([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get<Categories[]>("/categories.json");
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories.", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const visibleLinksCount = 8;
  const visibleLinks = categories.slice(0, visibleLinksCount);
  const remainingLinks = categories.slice(visibleLinksCount);

  const isMoreActive = remainingLinks.some(
    (link) => pathname === `/category/${link.slug}`,
  );

  return (
    <header className="w-full bg-white dark:bg-zinc-950 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 lg:px-20 xl:px-60 lg:py-4 max-w-480 mx-auto">
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/kinobdlogo.svg"
              alt="Kinobd Logo"
              width={130}
              height={40}
              className="w-32 lg:w-40"
              priority
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-10 border border-zinc-200 dark:border-zinc-800 rounded-full h-11 overflow-hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-none border-r px-4 h-full hover:bg-zinc-50 flex gap-2 text-zinc-600 cursor-pointer"
              >
                {selectedOption} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="max-h-[60vh] overflow-y-auto"
            >
              {categories.map((option, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setSelectedOption(option.name)}
                  className="cursor-pointer"
                >
                  {option.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Input
            type="text"
            placeholder="Search for products..."
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full text-zinc-600 dark:text-zinc-300 bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            className="bg-[#21b1ad] hover:bg-[#1a9a96] text-white rounded-none h-full 
          px-6 flex gap-2 font-medium cursor-pointer"
          >
            <Search className="h-4 w-4" /> Search
          </Button>
        </div>

        <div className="flex items-center gap-6 lg:gap-6">
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer group">
              <ShoppingBag className="h-6 w-6 lg:h-7 lg:w-7 text-zinc-700 dark:text-zinc-300" />
              <Badge
                variant="secondary"
                className="bg-yellow-500 absolute lg:px-2 px-1.5 -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 rounded-full text-[10px] lg:text-xs"
              >
                1
              </Badge>
            </div>

            <div className="relative cursor-pointer group hidden sm:block">
              <Heart className="h-7 w-7 text-zinc-700 dark:text-zinc-300" />
              <Badge
                variant="secondary"
                className="absolute lg:px-2 px-1.5 -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 bg-[#ff8a3d] rounded-full"
              >
                1
              </Badge>
            </div>

            <div className="flex items-center gap-2 lg:gap-3 lg:pl-4 lg:border-zinc-200 h-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    className="flex items-center cursor-pointer 
                border border-transparent hover:border-zinc-300 
                transition-colors duration-300 lg:px-5 py-1 rounded-lg"
                  >
                    <button className="h-6 w-6 lg:h-10 lg:w-10 gap-3 relative outline-none">
                      <User />
                    </button>
                    <div className="hidden lg:flex items-center gap-2 text-sm">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        John Doe
                      </span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm lg:hidden font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                    <Image
                      alt="DP"
                      src="/demoAvatar.png"
                      width={25}
                      height={25}
                    />
                    John Doe
                  </div>
                  <DropdownMenuSeparator className="lg:hidden" />
                  <Link href={"/dashboard/profile"}>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="h-4 w-4" /> Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                    <button className="flex items-center gap-2 cursor-pointer">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-75 sm:w-100 flex flex-col"
              >
                <SheetHeader className="text-left border-b pb-4 flex-row items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <Link href="/">
                      <Image
                        src="/kinobdlogo.svg"
                        alt="Logo"
                        width={100}
                        height={30}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 px-5 mt-4 overflow-y-auto">
                  <span className="text-xs font-bold uppercase text-muted-foreground">
                    Categories
                  </span>
                  {categories.map((link, idx) => (
                    <Link
                      key={`${link.name}-${idx}`}
                      href={`/category/${link.slug}`}
                      className={`text-lg font-medium px-3 py-2 rounded-lg transition-colors ${
                        pathname === `/category/${link.slug}`
                          ? "bg-[#ff8a3d] text-white"
                          : "hover:text-[#21b1ad]"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <SheetFooter className="mt-auto border-t pt-4">
                  <Button className="mb-2 bg-[#112d2a] w-full dark:text-white">
                    <LocateFixed className="mr-2 h-4 w-4" /> Track My Order
                  </Button>
                  <div className="w-full flex justify-between items-center px-2">
                    <span className="text-xs font-semibold">
                      &copy; {new Date().getFullYear()} kinobd.com{" "}
                    </span>
                    <ThemeToggle />
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 pb-3">
        <div className="flex items-center border rounded-full overflow-hidden h-10">
          <Input
            className="border-0 focus-visible:ring-0 text-sm"
            placeholder="Search..."
          />
          <Button className="bg-[#21b1ad] rounded-none h-full px-4">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="hidden lg:block bg-[#112d2a] text-white w-full">
        <div className="flex items-center justify-between px-20 xl:px-60 py-3 max-w-480 mx-auto">
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-1 font-semibold rounded-md ${
                pathname === "/"
                  ? "bg-[#ff8a3d]"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Home
            </Link>

            <span className="text-zinc-600 mx-1 text-xs">|</span>

            {visibleLinks.map((link, idx) => {
              const isActive = pathname === `/category/${link.slug}`;
              return (
                <div key={`${link.name}-${idx}`} className="flex items-center">
                  <Link
                    href={`/category/${link.slug}`}
                    className={`font-semibold transition-all px-3 py-1 rounded-md ${
                      isActive
                        ? "bg-[#ff8a3d] text-white"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                  {(idx !== visibleLinks.length - 1 ||
                    remainingLinks.length > 0) && (
                    <span className="text-zinc-600 mx-1 text-xs">|</span>
                  )}
                </div>
              );
            })}

            {remainingLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center px-3 py-1 rounded-md transition-all cursor-pointer outline-none ${
                      isMoreActive
                        ? "bg-[#ff8a3d] text-white"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-[80vh] overflow-y-auto bg-[#1c1c1c] text-white border-none">
                  {remainingLinks.map((link, idx) => (
                    <DropdownMenuItem key={`${link.name}-extra-${idx}`} asChild>
                      <Link
                        href={`/category/${link.slug}`}
                        className={`w-full font-semibold transition-all px-3 py-2 rounded-md cursor-pointer block ${
                          pathname === `/category/${link.slug}`
                            ? "bg-[#ff8a3d] text-white"
                            : "text-zinc-300 hover:bg-zinc-800"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
          <Button
            variant="outline"
            className="border-white/40 bg-transparent hover:bg-orange-600 
            hover:text-white text-xs font-bold rounded-lg px-4 h-8 cursor-pointer"
          >
            <LocateFixed className="mr-2 h-4 w-4" /> Track My Order
          </Button>
        </div>
      </div>
    </header>
  );
}
