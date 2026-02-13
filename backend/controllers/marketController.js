export const getMarketInfo = async (req, res) => {
  const perPage = req.body?.perPage || 25;
  const page = req.query?.page || 1;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}`,
    );

    const data = await response.json();

    res.json({
      status: "success",
      data,
    });
  } catch (error) {
    res.json({
      status: "fail",
      error,
    });
  }
};
