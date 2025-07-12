// services/searchFlights.ts

export const searchFlights = async ({
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  date,
  adults = 1,
  currency = "USD",
  market = "en-US",
}) => {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${date}&adults=${adults}&currency=${currency}&market=${market}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d87572b80msh3584e2b927ed3fbp107f41jsn83f614b1a609",
      "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching flights:", error);
    return { status: false, error: error.message };
  }
};
