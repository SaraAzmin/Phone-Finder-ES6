const displaySection = document.getElementById("phone-display-section");

//onclick function for the search button
const searchButton = () => {
    const input = document.getElementById("phone-name-input");
    const inputValue = input.value;

    //dynamic url for searching by input
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

//function for displaying the phones searched for
const displayPhones = (phones) => {

    for (const phone of phones) {
        const gridDiv = document.createElement("div");
        gridDiv.className = "border-2 border-cyan-700 rounded-md text-center flex flex-col justify-center items-center py-3";
        gridDiv.innerHTML = `
        <img class=" h-2/3" src="${phone.image}" alt="">
            <h1 class="uppercase mt-3 text-xl">${phone.brand}</h1>
            <p class="my-3">${phone.phone_name}</p>
            <button class="bg-cyan-700 text-white py-2 px-3 lg:px-5 font-semibold rounded-md">Show Details</button>
        `
        displaySection.appendChild(gridDiv);
    }

}