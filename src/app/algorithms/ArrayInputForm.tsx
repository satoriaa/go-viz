"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ArrayInputFormProps {
  onSubmitCustomArray: (newArray: number[]) => void;
  isSearching: boolean;
  target: number;
  onSubmitTarget: (newTarget: number) => void;
}

export function ArrayInputForm({
  onSubmitCustomArray,
  isSearching,
  target,
  onSubmitTarget,
}: ArrayInputFormProps) {
  const [inputValue, setInputValue] = useState("");
  const [targetValue, setTargetValue] = useState(target.toString());

  const handleArraySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ubah string "10, 20, 30" menjadi array angka [10, 20, 30]
    const parsed = inputValue
      .split(",")
      .map((item) => parseInt(item.trim(), 10))
      .filter((num) => !isNaN(num));

    if (parsed.length > 0) {
      // Jika algoritma searching, biasanya array harus terurut
      const finalArray = isSearching ? parsed.sort((a, b) => a - b) : parsed;
      onSubmitCustomArray(finalArray);
    }
  };

  const handleTargetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTarget = parseInt(targetValue, 10);
    if (!isNaN(parsedTarget)) {
      onSubmitTarget(parsedTarget);
    }
  };

  return (
    <div className="bg-white border-3 border-black p-4 rounded-neo shadow-neo space-y-4">
      <h3 className="font-black text-sm uppercase border-b-2 border-black pb-2">
        Custom Input Data
      </h3>

      <form onSubmit={handleArraySubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <label className="block text-xs font-bold mb-1">
            Array Angka (pisahkan dengan koma):
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Contoh: 12, 45, 23, 89, 4"
            className="w-full px-3 py-2 border-2 border-black rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex items-end">
          <Button variant="yellow" type="submit">
            Terapkan Array
          </Button>
        </div>
      </form>

      {isSearching && (
        <form onSubmit={handleTargetSubmit} className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-dashed border-gray-400">
          <div className="flex-1">
            <label className="block text-xs font-bold mb-1">
              Target Angka yang Dicari:
            </label>
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="flex items-end">
            <Button variant="cyan" type="submit">
              Set Target
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}