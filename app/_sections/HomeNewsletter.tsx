import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function HomeNewsletter() {
  const brands = [
    "/brands/hp.png",
    "/brands/zara.png",
    "/brands/samsung.png",
    "/brands/brother.png",
    "/brands/epson.png",
    "/brands/esctasy.png",
  ];
  return (
    <div className="pt-15">
      {/* Newsletter */}
      <section className="w-full rounded bg-linear-to-r from-[#0b2b2a] via-[#0f5f5c] to-[#1bb6a7] px-6 lg:px-20 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <h2 className="text-xl lg:text-2xl font-semibold text-white">
            Subscribe Our News Letters
          </h2>

          <div className="flex items-center w-full lg:w-105 h-11 bg-white rounded-full overflow-hidden">
            <Input
              type="email"
              placeholder="jondoe@yourmail.com"
              className="border-0 focus-visible:ring-0 text-sm h-full px-5"
            />
            <Button className="h-full rounded-none rounded-r-full px-6 bg-orange-500 hover:bg-orange-600 text-white text-sm cursor-pointer">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Our Brands */}
      <section className="py-15">
        <h2 className="text-xl lg:text-2xl font-semibold mb-5">
          Our Brands
        </h2>

        <div className="flex gap-2 items-center justify-between">
          {brands.map((brand, index) => (
            <div key={index}>
              <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
