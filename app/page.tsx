import HomeBestSelling from "./_sections/HomeBestSelling";
import HomeCategories from "./_sections/HomeCategories";
import HomeFeatured from "./_sections/HomeFeatured";
import HomeHero from "./_sections/HomeHero";
import HomeSpecialPeak from "./_sections/HomeSpeicalPeak";

export default function Home() {
  return (
    <div>
      <HomeHero/>
      <HomeCategories/>
      <HomeFeatured/>
      <HomeBestSelling/>
      <HomeSpecialPeak/>
    </div>
  );
}
