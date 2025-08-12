import React from "react";
import { HeaderCover } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neonGreen via-royalBlue to-deepNavy flex flex-col">
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        <HeaderCover/>
      </main>
    </div>
  );
}