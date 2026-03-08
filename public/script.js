const button = document.getElementById("loadBtn");
const output = document.getElementById("output");

button.addEventListener("click", async () => {

    const response = await fetch("/test");
    const data = await response.json();

    output.innerText = data.message;

});