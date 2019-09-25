const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
search.value = "";

const message1 = document.querySelector("#weather");
const message2 = document.querySelector("#error");

weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const location = search.value;

    console.log(location);

    message1.textContent = "Loading Results..";
    message2.textContent = "";



    fetch(`/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        if (data.error) {
            message1.textContent = "";
            message2.textContent = `${data.error}`
        } else if (data) {

            message1.textContent = `${data.location}`;
            message2.textContent = `${data.forecastData}`;
        }
    })
});
});