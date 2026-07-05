
let balance = 100000;
let btcOwned = 0;
let btcPrice = 0;
async function getPrices() {
    try {
        const btcRes = await fetch(
            "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        );

        const ethRes = await fetch(
            "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
        );

        const btcData = await btcRes.json();
        const ethData = await ethRes.json();
        btcPrice = Number(btcData.price);
updateUI();
        document.getElementById("btc-price").innerText =
            "$" + Number(btcData.price).toLocaleString();

        document.getElementById("eth-price").innerText =
            "$" + Number(ethData.price).toLocaleString();

    } catch (error) {
        console.error(error);
    }
}

getPrices();
document.getElementById("buy-btn").addEventListener("click", buyBTC);

function buyBTC() {

    const investment = 10000;

    if(balance >= investment){

        const btcPurchased =
            investment / btcPrice;

        btcOwned += btcPurchased;

        balance -= investment;

        updateUI();

    } else {

        alert("Insufficient Balance");

    }
}

document.getElementById("sell-btn").addEventListener("click", sellBTC);

function sellBTC() {

    const investment = 10000;

    const btcToSell = investment / btcPrice;

    if (btcOwned >= btcToSell) {

        btcOwned -= btcToSell;

        balance += investment;

        updateUI();

    } else {

        alert("Not enough BTC");

    }
}
function updateUI() {
document.getElementById("balance").innerText =
    "₹" + balance.toLocaleString();

    document.getElementById("btc-owned").innerText =
        btcOwned.toFixed(6);

    const portfolioValue = btcOwned * btcPrice;

document.getElementById("portfolio-value").innerText =
    "$" + portfolioValue.toLocaleString(undefined, {
         minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
updateUI();