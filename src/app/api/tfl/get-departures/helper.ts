interface TflPrediction {
  id: string;
  stationName: string;
  lineId: string;
  lineName: string;
  platformName: string;
  towards: string;
  expectedArrival: string;
  timeToStation: number;
  currentLocation: string;
}

export const getDepartures = async (stationId: string) => {
  const response = await fetch(
    `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals?app_key=${process.env.TFL_PRIMARY_KEY}`,
    {
      // Add cache: 'no-store' to ensure fresh data
      cache: 'no-store',
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch departures: ${response.statusText}`);
  }
  
  const data: TflPrediction[] = await response.json();
  console.log(data);
  
  // Sort by time to station
  const sortedDepartures = data
    .sort((a, b) => a.timeToStation - b.timeToStation)
    .map(prediction => ({
      id: prediction.id,
      stationName: prediction.stationName,
      line: prediction.lineName,
      platform: prediction.platformName,
      destination: prediction.towards,
      expectedArrival: new Date(prediction.expectedArrival).toLocaleTimeString(),
      timeToStation: Math.floor(prediction.timeToStation), // Convert to minutes
      currentLocation: prediction.currentLocation,
    }));

  return sortedDepartures;
};
