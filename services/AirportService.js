export const getAirports = async (query) => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1d87572b80msh3584e2b927ed3fbp107f41jsn83f614b1a609',
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return { status: false, data: [] };
  }
};
