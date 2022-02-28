const searchSection = document.getElementById("search-section");
const displaySection = document.getElementById("phone-display-section");
const detailsSection = document.getElementById("phone-details-section");

//onclick function for the search button
const searchButton = () => {
    const input = document.getElementById("phone-name-input");
    const inputValue = input.value;

    //error checking
    if (inputValue == '') {
        alert("Please input phone name");
        displaySection.innerHTML = '';
    }
    else if (!isNaN(inputValue)) {
        alert("Please give a valid input");
        input.value = '';
    }
    else {
        //dynamic url for searching by input
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
    }
}

//function for displaying the phones searched for
const displayPhones = (phones) => {
    //show if no results found
    if (phones.length == 0) {
        const div = document.createElement("div");
        div.innerHTML = `
        <h4 class="text-2xl text-cyan-700 font-bold text-center mt-5">Found no results for search</h4>
        `
        searchSection.appendChild(div);
    }
    else {
        for (const phone of phones) {
            const gridDiv = document.createElement("div");
            gridDiv.className = "border-2 border-cyan-700 rounded-md text-center flex flex-col justify-center items-center py-3";
            gridDiv.innerHTML = `
            <img class=" h-2/3" src="${phone.image}" alt="">
                <h1 class="uppercase mt-3 text-xl">${phone.brand}</h1>
                <p class="my-3">${phone.phone_name}</p>
                <button onclick="showDetailsButton('${phone.slug}')" class="bg-cyan-700 text-white py-2 px-3 lg:px-5 font-semibold rounded-md">Show Details</button>
            `
            displaySection.appendChild(gridDiv);
        }
    }

}

//onclick function for the show details button
//loads details of the selected phone
const showDetailsButton = (phoneId) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

//display phone details by slug
const displayPhoneDetails = (phone) => {

    //displays phone image, name and releasedate
    const leftDiv = document.createElement("div");
    leftDiv.className = "text-center flex flex-col justify-center items-center p-5"
    leftDiv.innerHTML = `
    <img class="h-3/6" src="${phone.image}" alt="">
            <h1 class="uppercase mt-3 text-xl font-bold">${phone.name}</h1 >
        <p id="release-date" class="font-montserrat my-3">${phone.releaseDate}</p>
    `;
    if (phone.releaseDate.length == 0) {
        const releaseDateField = document.getElementById("release-date");
        releaseDateField.innerText = "No release date";
    }
    detailsSection.appendChild(leftDiv);

    //displays main features including sensors
    const middleDiv = document.createElement("div");
    middleDiv.className = "text-center flex flex-col justify-center items-start p-5";
    middleDiv.innerHTML = `
    <h1 class="uppercase mt-3 text-xl font-bold">Main Features</h1>
            <p class="mt-2 font-semibold text-left">Storage: <span class="font-normal">${phone.mainFeatures.storage}</span></p>
            <p class="my-1 font-semibold text-left">Display: <span class="font-normal">${phone.mainFeatures.displaySize}</span></p>
            <p class="my-1 font-semibold text-left">ChipSet: <span class="font-normal">${phone.mainFeatures.chipSet}</span>
            </p>
            <p class="my-1 font-semibold text-left">Memory: <span class="font-normal">${phone.mainFeatures.memory}</span></p>
            <p class="my-1 font-semibold text-left">Sensors: <span class="font-normal">${phone.mainFeatures.sensors.join(', ')}</span></p>
    `;
    detailsSection.appendChild(middleDiv);

    //displays others
    const rightDiv = document.createElement("div");
    rightDiv.innerHTML = "text-center flex flex-col justify-center items-start p-5";
    rightDiv.innerHTML =
        `
        <h1 class="uppercase mt-10 text-lg font-bold">Others</h1>
        <p class="mt-2 font-semibold text-left">WLAN: <span class="font-normal">${phone.others.WLAN}</span></p>
        <p class="my-1 font-semibold text-left">Bluetooth: <span class="font-normal">${phone.others.Bluetooth}</span></p>
        <p class="my-1 font-semibold text-left">GPS: <span class="font-normal">${phone.others.GPS}</span></p>
        <p class="my-1 font-semibold text-left">NFC: <span class="font-normal">${phone.others.NFC}</span></p>
        <p class="my-1 font-semibold text-left">Radio: <span class="font-normal">${phone.others.Radio}</span></p>
        <p class="my-1 font-semibold text-left">USB: <span class="font-normal">${phone.others.USB}</span></p>
    `;
    detailsSection.appendChild(rightDiv);

}