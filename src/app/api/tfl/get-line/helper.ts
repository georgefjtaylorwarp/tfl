export const getLine = async () => {
  try {
    const response = await fetch(
      `https://api.tfl.gov.uk/Line/mode/tube/Status?app_key=${process.env.TFL_PRIMARY_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TFL data:', error);
    throw error;
  }
};
