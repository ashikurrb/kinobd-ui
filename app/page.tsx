import HomeCategories from "./_sections/HomeCategories";
import HomeFeatured from "./_sections/HomeFeatured";
import HomeHero from "./_sections/HomeHero";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <HomeHero/>
      <HomeCategories/>
      <HomeFeatured/>
    </div>
  );
}
