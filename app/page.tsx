import HomeBestSelling from "./_sections/HomeBestSelling";
import HomeCategories from "./_sections/HomeCategories";
import HomeFeatured from "./_sections/HomeFeatured";
import HomeFeedBack from "./_sections/HomeFeedback";
import HomeGearUp from "./_sections/HomeGearUp";
import HomeHero from "./_sections/HomeHero";
import HomeMegaSell from "./_sections/HomeMegaSell";
import HomeNewsletter from "./_sections/HomeNewsletter";
import HomeSpecialPeak from "./_sections/HomeSpecialPeak";
import HomeSummerFashion from "./_sections/HomeSummerFashion";

export default function Home() {
  return (
    <div className="lg:px-30 xl:px-60 px-5">
      <HomeHero/>
      <HomeCategories/>
      <HomeFeatured/>
      <HomeBestSelling/>
      <HomeSpecialPeak/>
      <HomeMegaSell/>
      <HomeGearUp/>
      <HomeSummerFashion/>
      <HomeFeedBack/>
      <HomeNewsletter/>
    </div>
  );
}
