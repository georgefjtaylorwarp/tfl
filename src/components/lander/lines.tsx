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

export default function Lines({
    setSelectedLine,
}: {
    setSelectedLine: (line: string) => void;
}) {
    const [lines, setLines] = useState<TflLine[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLines = async () => {
        if (lines.length > 0) return;
        
        setIsLoading(true);
        try {
            const response = await fetch("/api/tfl/get-line");
            const data = await response.json();
            // Only extract the id and name from each line
            const simplifiedLines: TflLine[] = data.map((line: any) => ({
                id: line.id,
                name: line.name
            }));
            setLines(simplifiedLines);
        } catch (error) {
            console.error("Error fetching lines:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Select onValueChange={setSelectedLine} disabled={isLoading} onOpenChange={(open) => {
                if (open) fetchLines();
            }}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a line" />
                </SelectTrigger>
                <SelectContent>
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {!isLoading &&
                        lines.map((line) => (
                            <SelectItem key={line.id} value={line.id}>
                                {line.name}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
    );
}
