
let balance =
    Number(localStorage.getItem("balance")) || 100000;

let btcOwned =
    Number(localStorage.getItem("btcOwned")) || 0;
let btcPrice = 0;

let trades =
    JSON.parse(localStorage.getItem("trades")) || [];

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
        btcOwned = Number(btcOwned.toFixed(8));  
        balance -= investment;


        trades.push({
    type: "BUY",
    amount: 10000

     });
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


btcOwned = Number(btcOwned.toFixed(8));

if (Math.abs(btcOwned) < 0.000001) {
    btcOwned = 0;
}
        balance += investment;
        
    trades.push({
    type: "SELL",
    amount: 10000
     });
        
     updateUI();

    } else {

        alert("Not enough BTC");

    }
}
function updateUI() {
document.getElementById("balance").innerText =
    "₹" + balance.toLocaleString();

  document.getElementById("btc-owned").innerText =
    btcOwned.toLocaleString(undefined, {
        maximumFractionDigits: 6
    });
       
        localStorage.setItem("balance", balance);
        localStorage.setItem("btcOwned", btcOwned);

    const portfolioValue = btcOwned * btcPrice;

document.getElementById("portfolio-value").innerText =
    "$" + portfolioValue.toLocaleString(undefined, {
         minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
        renderTrades();
}

function renderTrades() {

    const history =
        document.getElementById("trade-history");

    history.innerHTML = "";

    [...trades]
.reverse()
.slice(0, 20)
.forEach(trade => {

        history.innerHTML += `
            <tr>
                <td>${trade.type}</td>
                <td>₹${trade.amount}</td>
            </tr>
        `;
    });

    localStorage.setItem(
        "trades",
        JSON.stringify(trades)
    );
}

function resetPortfolio() {
    localStorage.clear();

    balance = 100000;
    btcOwned = 0;
    totalInvested = 0;
    trades = [];

    updateUI();
}
updateUI();