/////   Selectors
const currentShare = document.querySelector("#current-share");
const currentPrice = document.querySelector("#current-price");
const targetShare = document.querySelector("#target-share");
const targetPrice = document.querySelector("#target-price");
const calculateBtn = document.querySelector("#quick-calculate-btn");
const loadBtn = document.querySelector("#load-btn");
const clearInputBtn = document.querySelector("#clear-input-btn");
const clearSavedBtn = document.querySelector("#clear-btn");

const final1 = document.querySelector("#final-result");
const final2 = document.querySelector("#final-result-2");
const final3 = document.querySelector("#final-result-3");

const inputArray = [currentPrice, currentShare, targetPrice, targetShare];

// //    Test
// currentShare.value = 2;
// currentPrice.value = 2;
// targetShare.value = 400;
// targetPrice.value = 8.1;

/////   Functions

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const quickCalc = (e) => {
  e.preventDefault();
  let curShare = Number(currentShare.value);
  let curPrice = Number(currentPrice.value);
  let curTotal = curPrice * curShare;

  let tarShare = Number(targetShare.value);
  let tarPrice = Number(targetPrice.value);
  let tarTotal = tarPrice * tarShare;

  totalPrice = tarTotal + curTotal;
  totalShare = curShare + tarShare;

  adjustedPrice = totalPrice / totalShare;
  adjustedPriceRounded = adjustedPrice.toFixed(2);

  const lastInputs = {
    cP: curPrice,
    cS: curShare,
    tP: tarPrice,
    tS: tarShare,
  };

  if (adjustedPriceRounded === null || isNaN(adjustedPriceRounded)) {
    console.log("");
  } else {
    final1.textContent = `Average Stock Price: $${numberWithCommas(
      adjustedPriceRounded
    )}`;
    final2.textContent = `Total Number of Shares: ${totalShare}`;
    final3.textContent = `Total Cost: $${numberWithCommas(
      totalPrice.toFixed(2)
    )}`;
    window.localStorage.setItem("lastPriceInputs", JSON.stringify(lastInputs));
  }
};

const loadPreviousStockInputs = (e) => {
  let getItem = window.localStorage.getItem("lastPriceInputs");
  let previousInputs = {};

  if (getItem === null) {
    console.log("");
  } else {
    previousInputs = JSON.parse(getItem);
  }

  if (
    Object.keys(previousInputs).length === 0 &&
    previousInputs.constructor === Object
  ) {
    console.log("");
  } else {
    currentShare.value = previousInputs.cS;
    currentPrice.value = previousInputs.cP;
    targetShare.value = previousInputs.tS;
    targetPrice.value = previousInputs.tP;
  }
};

const clearInputs = (e) => {
  final1.textContent = `Average Stock Price: $0`;
  final2.textContent = `Total Number of Shares: 0`;
  final3.textContent = `Total Cost: $0`;
  inputArray.forEach((arr) => {
    arr.value = "";
  });
};

/////   Event Listeners

calculateBtn.addEventListener("click", quickCalc);

loadBtn.addEventListener("click", loadPreviousStockInputs);

clearSavedBtn.addEventListener("click", (e) => {
  window.localStorage.clear();
  clearInputs();
});

clearInputBtn.addEventListener("click", clearInputs);
