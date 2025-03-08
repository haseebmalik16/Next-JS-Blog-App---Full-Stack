import BlogFooter from "@/components/home/BlogFooter";
import Navbar from "@/components/home/header/Navbar";
import HeroSection from "@/components/home/HeroSection";
import TopArticles from "@/components/home/TopArticles";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { AllArticlesPageSkeleton } from "../articles/page";



export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Featured Articles</h2>
            <p>Discover our most popular and trending content</p>
          </div>

          <Suspense fallback={<AllArticlesPageSkeleton />}>
            <TopArticles />
          </Suspense>

          <div className="text-center mt-12">
            <Link href={'/articles'}>
              <Button className="rounded-full hover:bg-gray-900 hover:text-white dark:bg-white dark:hover:text-gray-900">View all articles</Button></Link>
          </div>
        </div>
      </section>

      <BlogFooter />
    </main>
  );
}
