"use client";

import Search from "@/components/lander/search";
import StationData from "@/components/lander/departure-board";
import { useState } from "react";

export default function Home() {
    const [departures, setDepartures] = useState<any[]>([]);
    return (
        <>
            <h1 className="p-36 text-center text-5xl font-black text-green-400">
                Where are you going?
            </h1>
            <div className="flex flex-col items-center justify-center gap-12">
                <StationData departures={departures} />
                <Search setDepartures={setDepartures} />
            </div>
        </>
    );
}
