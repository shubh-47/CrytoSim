
let balance = 100000;
let btcOwned = 0;
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

        document.getElementById("btc-price").innerText =
            "$" + Number(btcData.price).toLocaleString();

        document.getElementById("eth-price").innerText =
            "$" + Number(ethData.price).toLocaleString();

    } catch (error) {
        console.error(error);
    }
}

getPrices();

document.getElementById("buy-btn")
document.addEventListener("click", buyBTC);
function buyBTC() {

    if(balance >= 10000){

        balance -= 10000;

        btcOwned += 0.0001;

        updateUI();

    }
    else{
        alert("Not enough balance");
    }
}
function updateUI(){

    document
    .getElementById("balance")
    .innerText =
    balance.toFixed(2);

    document
    .getElementById("btc-owned")
    .innerText =
    btcOwned.toFixed(4);
}
updateUI();