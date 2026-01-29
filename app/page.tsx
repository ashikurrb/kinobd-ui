import HomeBestSelling from "./_sections/HomeBestSelling";
import HomeCategories from "./_sections/HomeCategories";
import HomeFeatured from "./_sections/HomeFeatured";
import HomeHero from "./_sections/HomeHero";
import HomeMegaSell from "./_sections/HomeMegaSell";
import HomeSpecialPeak from "./_sections/HomeSpeicalPeak";

export default function Home() {
  return (
    <div className="lg:px-30 xl:px-60 px-5">
      <HomeHero/>
      <HomeCategories/>
      <HomeFeatured/>
      <HomeBestSelling/>
      <HomeSpecialPeak/>
      <HomeMegaSell/>
    </div>
  );
}
