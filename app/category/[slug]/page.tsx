import type { Metadata } from "next";
import CategoryDetails from "./CategoryDetails";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return { title: "Category - KinoBD" };

  const title =
    slug.replaceAll("-", " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) +
    " - KinoBD";

  return {
    title,
  };
}

export default async function CategoryDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  return <CategoryDetails slug={slug} />;
}
