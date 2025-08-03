"use client";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface TflLine {
    id: string;
    name: string;
}

export default function Stations({ selectedLine, setDepartures }: { selectedLine: string, setDepartures: (departures: any[]) => void }) {
    const [stations, setStations] = useState<TflLine[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStation, setSelectedStation] = useState<string>("");

    const fetchStations = async () => {
        if (stations.length > 0) return;

        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/tfl/get-stations?line=${selectedLine}`
            );
            const data = await response.json();
            const simplifiedStations: TflLine[] = data.map((station: any) => ({
                id: station.id,
                name: station.commonName,
            }));
            setStations(simplifiedStations);
            
            // Set initial station
            if (simplifiedStations.length > 0) {
                setSelectedStation(simplifiedStations[0].id);
            }
        } catch (error) {
            console.error("Error fetching stations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Separate effect to handle departure fetching
    useEffect(() => {
        const fetchDepartures = async () => {
            if (!selectedStation || !selectedLine) return;

            try {
                const response = await fetch(
                    `/api/tfl/get-departures?stationId=${selectedStation}&line=${selectedLine}`
                );
                const data = await response.json();
                setDepartures(data);
            } catch (error) {
                console.error("Error fetching departures:", error);
            }
        };

        fetchDepartures();
    }, [selectedStation, selectedLine, setDepartures]);

    return (
        <div>
            <Select
                onValueChange={setSelectedStation}
                disabled={isLoading}
                onOpenChange={(open) => {
                    if (open) fetchStations();
                }}
                value={selectedStation}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a station" />
                </SelectTrigger>
                <SelectContent>
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {!isLoading &&
                        stations.map((station) => (
                            <SelectItem key={station.id} value={station.id}>
                                {station.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
