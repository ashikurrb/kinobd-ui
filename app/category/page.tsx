import { Metadata } from "next";
import Category from "./_sections/Category";

export const metadata: Metadata = {
  title: "All Categories - KinoBD",
  description: "The largest E-Commerce Shop in Bangladesh",
};

export default function CategoryPage() {
  return (
    <div className="lg:px-30 xl:px-60 px-5">
      <Category />
    </div>
  );
}
