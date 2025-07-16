'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";

export default function PaginaPrincipal() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const menuMargin = open ? "ml-80 md:ml-64 sm:ml-45" : "ml-20 md:ml-20 sm:ml-16";
    const headerPadding = "pt-24";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
            <Menu open={open} setOpen={setOpen} />
            <Header open={open} />
            <main className={`flex-1 w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mt-8 transition-all duration-300 ${menuMargin} ${headerPadding}`}>



                <Footer />

            </main>
        </div>
    );
}