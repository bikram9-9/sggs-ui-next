import { Metadata } from 'next';
import { ShabadClient } from './client';

export const metadata: Metadata = {
  title: 'Shabad Details - Gurbani Space',
  description: 'Read and explore Gurbani shabad details',
};

export async function generateStaticParams() {
  // This is a placeholder that allows all dynamic routes
  return [];
}

export default function ShabadPage() {
  return <ShabadClient />;
}