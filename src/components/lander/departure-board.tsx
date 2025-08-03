import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"

export default function StationData({ departures }: { departures: any[] }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Group departures by line
    const departuresByLine = departures.reduce((acc, departure) => {
        if (!acc[departure.line]) {
            acc[departure.line] = [];
        }
        acc[departure.line].push(departure);
        return acc;
    }, {} as Record<string, any[]>);

    console.log(departuresByLine);


    return (
        <div className="flex flex-col gap-8">
            {departures.length === 0 ? (
                <div className="bg-black p-4 font-mono rounded-lg shadow-lg">
                    <div className="text-amber-400 text-xl font-bold text-center py-4">
                        You've hit the end of the line...
                    </div>
                </div>
            ) : (
                Object.entries(departuresByLine as Record<string, any[]>).map(([line, lineDepartures]) => (
                    <div key={line} className="bg-black p-4 font-mono rounded-lg shadow-lg">
                        <div className="text-amber-400 text-2xl font-bold mb-4 border-b border-amber-400 pb-2">
                            {line} Line
                        </div>
                        <Table>
                            <TableBody className="text-amber-400">
                                {lineDepartures.map((departure: any, index: number) => (
                                    <TableRow 
                                        key={`${departure.id}-${departure.platform}-${index}`}
                                        className="border-none hover:bg-transparent"
                                    >
                                        <TableCell className="py-1 text-xl font-bold">
                                            {departure.platform}
                                        </TableCell>
                                        <TableCell className="py-1 text-xl font-bold">
                                            {departure.destination === "Check Front of Train" 
                                                ? "Check Front of Train"
                                                : departure.destination}
                                        </TableCell>
                                        <TableCell className="py-1 text-xl font-bold text-right">
                                            {Math.ceil(departure.timeToStation / 60)} mins
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="text-amber-400 text-right mt-2 text-xl">
                            {time.toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false
                            })}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
