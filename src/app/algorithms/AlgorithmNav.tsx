"use client";
import React from "react";
import Link from "next/link";

interface AlgorithmNavProps {
  category: string;
  currentSlug: string;
  sortingOptions: { slug: string; label: string }[];
  searchingOptions: { slug: string; label: string }[];
}

export function AlgorithmNav({ category, currentSlug, sortingOptions, searchingOptions }: AlgorithmNavProps) {
  const isSorting = category === "sorting";
  const options = isSorting ? sortingOptions : searchingOptions;

  return (
    <div className="flex flex-wrap items-center gap-2 bg-white border-3 border-black p-3 rounded-neo shadow-neo">
      <span className="text-xs font-black uppercase px-2 py-1 bg-black text-white rounded">
        Pilih {category}:
      </span>
      {options.map((opt) => {
        const isActive = currentSlug === opt.slug;
        return (
          <Link key={opt.slug} href={`/algorithms/${category}/${opt.slug}`}>
            <span
              className={`text-xs font-bold px-3 py-1.5 border-2 border-black rounded transition-all cursor-pointer inline-block ${
                isActive
                  ? "bg-neoYellow shadow-neo-sm translate-x-0.5 translate-y-0.5"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {opt.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}