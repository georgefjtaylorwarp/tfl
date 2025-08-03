"use client";
import { useState } from "react";
import Lines from "./lines";
import Stations from "./stations";
import StationData from "./departure-board";

export default function Search({ setDepartures }: { setDepartures: (departures: any[]) => void }) {
    const [stationName, setStationName] = useState("");
    const [stationData, setStationData] = useState<any>(null);
    const [selectedLine, setSelectedLine] = useState<any>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(
            `/api/tfl/get-station?stationName=${stationName}`
        );
        const data = await response.json();
        setStationData(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col-2 gap-4">
                <Lines setSelectedLine={setSelectedLine} />
                <Stations selectedLine={selectedLine} setDepartures={setDepartures} />
            </form>
        </div>
    );
}
