import { Metadata } from "next";
import { PageClient } from "./client";

export const metadata: Metadata = {
  title: "Shabad Details - Gurbani Space",
  description: "Read and explore Gurbani shabad details",
};

export async function generateStaticParams() {
  // Generate an array of numbers from 1 to 1430 (total number of angs in SGGS)
  const totalAngs = 1430;
  return Array.from({ length: totalAngs }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return <PageClient id={params.id} />;
}
