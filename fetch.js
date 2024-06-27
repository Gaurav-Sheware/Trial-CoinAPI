document.addEventListener("DOMContentLoaded", fetchCryptoPrices);

function fetchCryptoPrices() {
  const headers = new Headers({
    Accept: "application/json",
    "X-CoinAPI-Key": "263E1B5C-760D-48F3-8B83-20DAA7A68ED6", // Replace with your CoinAPI key
  });

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  const urls = [
    "https://rest.coinapi.io/v1/exchangerate/BTC/USD",
    "https://rest.coinapi.io/v1/exchangerate/DOGE/USD",
    "https://rest.coinapi.io/v1/exchangerate/ETH/USD",
  ];

  // Fetch prices for each cryptocurrency
  Promise.all(
    urls.map((url) =>
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          updatePrice(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
    )
  ).catch((error) => {
    console.error("Error in one or more requests:", error);
  });
}

function updatePrice(data) {
  const { asset_id_base, rate } = data;
  let formattedRate;

  if (rate > 1000) {
    formattedRate = `$${(rate / 1000).toFixed(0)}k`;
  } else {
    formattedRate = `$${rate.toFixed(2)}`;
  }

  switch (asset_id_base) {
    case "BTC":
      document.querySelector(".coin-list .coin:nth-child(1) h3").textContent =
        formattedRate;
      break;
    case "DOGE":
      document.querySelector(".coin-list .coin:nth-child(2) h3").textContent =
        formattedRate;
      break;
    case "ETH":
      document.querySelector(".coin-list .coin:nth-child(3) h3").textContent =
        formattedRate;
      break;
    default:
      break;
  }
}
