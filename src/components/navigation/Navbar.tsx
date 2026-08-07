import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Cpu, Bookmark } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b-4 border-black bg-white sticky top-0 z-50 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-neoYellow border-2 border-black p-2 rounded-neo shadow-neoSm">
            <Cpu className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-black tracking-tight">ALGO-VIZ</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <span className="font-bold text-sm hover:underline">Home</span>
          </Link>
          <Link href="/algorithms/sorting/quick-sort">
            <span className="font-bold text-sm hover:underline">Explore</span>
          </Link>
          <Link href="/algorithms/sorting/quick-sort">
            <Button variant="pink" className="text-xs py-2 px-3">
              <Bookmark className="w-4 h-4 mr-1" /> Bookmarks
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}