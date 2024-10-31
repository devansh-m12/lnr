'use client'
import { useState, useEffect } from "react";
import { LatestRelease } from "@/components/common/latestRelease";
import { Novel } from "@/types/novel";

export default function Page() {
  const [novels, setNovels] = useState<Novel[]>([]);
  
  useEffect(() => {
    fetch("/api/get-all-novels")
      .then(res => res.json())
      .then(data => setNovels(data));
  }, []);
  
  return (
    <main className="container mx-auto">
      <div className="h-[33vh] bg-black">
        <LatestRelease novels={novels} />
      </div>
    </main>
  );
}
