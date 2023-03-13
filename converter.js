import {MY_API_KEY} from './config.js';


document.getElementById("convertButton").onclick = function() {
    var amount = document.getElementById("amount").value;
    console.log(amount);


    var array = [];
    dropdowns.forEach(dropdown => {
        array.push(dropdown.querySelector('.selected').innerText);
    })

    console.log(array);
    let from = array[0];
    let to = array[1];

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': MY_API_KEY,
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };

    let fetchLine = "https://currency-exchange.p.rapidapi.com/exchange?from=" + from + "&to=" + to + "&q=1.0";

    if (from.localeCompare(to) == 0) { 
        console.log("Value", document.getElementById('amount').value)
        document.getElementById('answer').innerHTML = document.getElementById('amount').value + " " + to;
    } else {
        fetch(fetchLine, options)
        .then(response => response.json())
        .then(response => {
            console.log("Rate", response);
            console.log("Value", document.getElementById('amount').value * response);
            document.getElementById('answer').innerHTML = Math.round(((document.getElementById('amount').value * response) + Number.EPSILON) * 100) / 100 + " " + to;
        })
        .catch(err => console.error(err));
    }
}



