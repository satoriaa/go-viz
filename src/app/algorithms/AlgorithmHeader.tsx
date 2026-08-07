"use client";
import React from "react";
import { Button } from "@/components/ui/Button";

interface AlgorithmHeaderProps {
  category: string;
  slug: string;
  metadata: {
    title: string;
    description: string;
  };
  onRandomize: () => void;
}

export function AlgorithmHeader({ category, slug, metadata, onRandomize }: AlgorithmHeaderProps) {
  return (
    <div className="border-3 border-black p-6 rounded-neo bg-neoCyan shadow-neo flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase rounded">
            {category}
          </span>
          <span className="bg-white text-black text-xs font-bold px-2 py-1 border-2 border-black rounded">
            {slug}
          </span>
        </div>
        <h1 className="text-4xl font-black">{metadata.title}</h1>
        <p className="text-sm font-medium mt-1">{metadata.description}</p>
      </div>
      <Button variant="white" onClick={onRandomize}>
        Randomize Data
      </Button>
    </div>
  );
}