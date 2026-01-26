"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
} from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Badge } from "../ui/badge";

export default function Header() {
  const [selectedOption, setSelectedOption] = useState("All");
  const [query, setQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Electronic", href: "/electronic" },
    { name: "Apparel", href: "/apparel" },
    { name: "Home Appliance", href: "/appliances" },
    { name: "Gadget", href: "/gadgets" },
    { name: "Grocery", href: "/grocery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="w-full bg-white dark:bg-zinc-950 sticky top-0 z-50 shadow-sm">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-20 lg:py-4 max-w-480 mx-auto">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100 flex flex-col">
              <SheetHeader className="text-left border-b pb-4 flex-row items-center justify-between">
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src="/kinobdlogo.svg"
                    alt="Logo"
                    width={100}
                    height={30}
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-5 overflow-y-auto">
                <span className="text-xs font-bold uppercase text-muted-foreground">
                  Categories
                </span>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-[#21b1ad] py-2 border-b border-zinc-100 dark:border-zinc-800"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button className="mt-4 bg-[#112d2a] w-full dark:text-white">
                  <LocateFixed /> Track My Order
                </Button>
              </div>
              <SheetFooter>
                <div className="w-full flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    &copy; {new Date().getFullYear()} kinobd.com{" "}
                  </span>
                  <ThemeToggle />
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="shrink-0">
          <Link href="/">
            <Image
              src="/kinobdlogo.svg"
              alt="Kinobd Logo"
              width={130}
              height={40}
              className="lg:w-40"
              priority
            />
          </Link>
        </div>

        {/* Desktop Search Bar */}
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
            <DropdownMenuContent align="start">
              {["All", "Articles", "Products", "Users"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className="cursor-pointer"
                >
                  {option}
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

        {/* Desktop & Mobile Actions */}
        <div className="flex items-center gap-3 lg:gap-6">
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <Search className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          </button>

          <div className="relative cursor-pointer group">
            <ShoppingBag className="h-5 w-5 lg:h-7 lg:w-7 text-zinc-700 dark:text-zinc-300" />
            <Badge
              variant="secondary"
              className="bg-yellow-500 absolute -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 rounded-full"
            >
              1
            </Badge>
          </div>

          <div className="relative cursor-pointer group hidden sm:block">
            <Heart className="h-5 w-5 lg:h-7 lg:w-7 text-zinc-700 dark:text-zinc-300" />
            <Badge
              variant="secondary"
              className="absolute -top-1.5 -right-1.5 lg:-top-2 lg:-right-2 bg-[#ff8a3d] rounded-full"
            >
              1
            </Badge>
          </div>

          {/* User Profile - Mobile & Desktop */}
          <div className="flex items-center gap-2 lg:gap-3 lg:pl-4 lg:border-l lg:border-zinc-200 h-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="flex items-center gap-2 cursor-pointer 
                border border-transparent hover:border-zinc-300 
                transition-colors duration-300 lg:px-5 py-1 rounded-lg"
                >
                  <button className="h-8 w-8 lg:h-10 lg:w-10 relative outline-none">
                    <Image
                      src="/demoAvatar.png"
                      alt="User"
                      fill
                      className="rounded-full object-cover cursor-pointer"
                    />
                  </button>
                  <div className="hidden lg:flex items-center gap-2 text-sm">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      John Doe
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm lg:hidden font-bold text-zinc-800 dark:text-zinc-200">
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
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Search Input*/}
      {isMobileSearchOpen && (
        <div className="lg:hidden px-4 pb-3 animate-in slide-in-from-top duration-200">
          <div className="flex items-center border rounded-full overflow-hidden h-10">
            <Input
              className="border-0 focus-visible:ring-0"
              placeholder="Search..."
            />
            <Button className="bg-[#21b1ad] rounded-none h-full">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div className="hidden lg:block bg-[#112d2a] text-white w-full">
        <div className="flex items-center justify-between px-20 py-3 max-w-480 mx-auto">
          <nav className="flex items-center gap-1">
            {navLinks.map((link, idx) => (
              <div key={link.name} className="flex items-center">
                <Link
                  href={link.href}
                  className={`text-sm font-semibold hover:text-[#21b1ad] transition-colors px-2 ${link.name === "Home" ? "text-white" : "text-zinc-300"}`}
                >
                  {link.name}
                </Link>
                {idx !== navLinks.length - 1 && (
                  <span className="text-zinc-600 mx-2 text-xs">|</span>
                )}
              </div>
            ))}
          </nav>
          <Button
            variant="outline"
            className="border-white/40 bg-transparent hover:bg-white hover:text-[#112d2a] dark:hover:text-white text-white text-xs font-bold rounded-lg px-4 h-8 cursor-pointer"
          >
            <LocateFixed /> Track My Order
          </Button>
        </div>
      </div>
    </header>
  );
}
