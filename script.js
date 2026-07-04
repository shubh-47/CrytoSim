async function getPrices() {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=inr"
        );

        const data = await response.json();

        document.getElementById("btc-price").textContent =
            "₹ " + data.bitcoin.inr.toLocaleString();

        document.getElementById("eth-price").textContent =
            "₹ " + data.ethereum.inr.toLocaleString();

    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

getPrices();