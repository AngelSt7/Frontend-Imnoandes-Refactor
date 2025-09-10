import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

export function buildMetadata({ title, description, url, image }: SEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Mi Sitio",
      images: [{ url: image }],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
