





import axios from 'axios';

async function handler(req, res) {
  const year = req.query.year;
  const nextYear = (Number(year) + 1).toString();

  const teamQuery = [
    "AUT", "FIN", "CAN", "NOR", "DEN", "GBR", "CZE",
    "SWI", "FRA", "SWE", "KAZ", "SVK", "GER", "USA",
    "LAT", "POL"
  ];

  try {
    const teamRequests = teamQuery.map(teamCode => 
      axios.get(`https://www.hockey-live.sk/api/team/${teamCode}/WCH/${nextYear}`, {
        params: { key: process.env.API_KEY2, tz: 'America/New_York' },
        headers: { 'X-RapidAPI-Key': process.env.API_KEY, 'X-RapidAPI-Host': 'hockey-live-sk-data.p.rapidapi.com' }
      })
    );

    
    
    const teamResponses = await Promise.all(teamRequests);

    // Extract individual games from each teamResponse, filtering out duplicates
    const seenGameIds = new Set();
    const allGames = teamResponses.flatMap(response => 
      response.data && response.data.games && Array.isArray(response.data.games)
        ? response.data.games.filter(game => {
            const isNewGame = !seenGameIds.has(game.id);
            seenGameIds.add(game.id);
            return isNewGame;
          })
        : []
    );

    // Group games by date
    const gamesByDate = allGames.reduce((acc, game) => {
      const gameDate = new Date(game.date).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      if (!acc[gameDate]) {
        acc[gameDate] = [];
      }
      acc[gameDate].push(game);
      return acc;
    }, {});

    res.status(200).json({
      status: "success",
      data: gamesByDate
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
}

export default handler;