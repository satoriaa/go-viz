"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, Layers, Cpu, Award } from "lucide-react";

export default function LandingPage() {
  const categories = [
    { title: "Sorting", count: "8 Algorithms", icon: Layers, color: "bg-neoYellow", link: "/algorithms/sorting/quick-sort" },
    { title: "Searching", count: "1 Algorithm", icon: Cpu, color: "bg-neoLime", link: "/algorithms/searching/binary-search" },
    { title: "Graph", count: "6 Algorithms", icon: Sparkles, color: "bg-neoPink", link: "/algorithms/graph/dijkstra" },
    { title: "Dynamic Programming", count: "5 Algorithms", icon: Award, color: "bg-neoCyan", link: "/algorithms/dp/fibonacci" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <div className="border-4 border-black p-10 rounded-neo bg-neoYellow shadow-neoLg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="inline-block bg-black text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider">
            Next-Gen CS Learning Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Master Algorithms Visually & Interactively.
          </h1>
          <p className="text-base font-medium">
            Platform edukasi modern bergaya Neobrutalism untuk memvisualisasikan cara kerja algoritma komputer dari awal hingga akhir dengan penjelasan ala dosen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/algorithms/sorting/quick-sort">
              <Button variant="dark" className="text-base py-3 px-6">
                Mulai Eksplorasi <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Visual Card / Stats Preview */}
        <div className="bg-white border-3 border-black p-6 rounded-neo shadow-neo space-y-4">
          <h3 className="text-xl font-black border-b-2 border-black pb-2">Platform Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neoYellow/30 border-2 border-black p-4 rounded-neo text-center">
              <span className="block text-3xl font-black">20+</span>
              <span className="text-xs font-bold uppercase">Algorithms</span>
            </div>
            <div className="bg-neoLime/30 border-2 border-black p-4 rounded-neo text-center">
              <span className="block text-3xl font-black">100%</span>
              <span className="text-xs font-bold uppercase">Interactive</span>
            </div>
          </div>
          <p className="text-xs font-bold text-gray-600 text-center pt-2">
            Built with Next.js, Tailwind CSS, & Framer Motion
          </p>
        </div>
      </div>

      {/* Category Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black">Pilih Kategori Algoritma</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <Link key={idx} href={cat.link}>
                <div className={`${cat.color} border-3 border-black p-6 rounded-neo shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer space-y-4 h-full flex flex-col justify-between`}>
                  <div className="bg-white border-2 border-black w-12 h-12 rounded-neo flex items-center justify-center shadow-neoSm">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black">{cat.title}</h3>
                    <p className="text-xs font-bold mt-1 text-black/70">{cat.count}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}