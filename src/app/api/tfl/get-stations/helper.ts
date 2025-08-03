interface Station {
  id: string;
  commonName: string;
  lat: number;
  lon: number;
}

export const getStations = async (line: string): Promise<Station[]> => {
  try {
    const response = await fetch(
      `https://api.tfl.gov.uk/Line/${line}/StopPoints?app_key=${process.env.TFL_PRIMARY_KEY}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch stations: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform the response to only include relevant station data
    return data.map((station: any) => ({
      id: station.id,
      commonName: station.commonName,
      lat: station.lat,
      lon: station.lon,
    }));
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
}
