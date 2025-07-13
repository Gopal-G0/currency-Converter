const btnEl = document.getElementById('convert-btn');
const inputEl = document.getElementById('amount');
const dropDownEl = document.querySelectorAll('.drop-down select');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const resultEl = document.getElementById('resultBox');

const BASE_URL = 'https://v6.exchangerate-api.com/v6/e4e19cbe2ef3ed85f0fb3457/latest/'

for(let select of dropDownEl) {
    for(currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.textContent = currCode;
        newOption.value = currCode;
        if(select.name === 'From' && currCode === 'USD') {
            newOption.selected = 'selected';
        } 

        if(select.name === 'to' && currCode === 'INR') {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }

    select.addEventListener('click',(evt) => {
        updateFlag(evt.target);
    })
}

function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}

btnEl.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = inputEl.value;
    if(amount === "" || amount < 0) {
        amount = 0;
        inputEl.value = '0';
    }

    //console.log(fromCurr.value,toCurr.value);

    const url = `${BASE_URL}/${fromCurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let exchangeData = data['conversion_rates'];
    let changeTo = toCurr.value;
    let exchangeRate =  exchangeData[changeTo];
    resultEl.innerHTML = (parseInt(amount) * exchangeRate).toFixed(2);
})

