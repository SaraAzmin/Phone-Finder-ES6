const searchSection = document.getElementById("search-section");
const notFoundDiv = document.getElementById("not-found-div");
const displaySection = document.getElementById("phone-display-section");
const detailsSection = document.getElementById("phone-details-section");


//onclick function for the search button
const searchButton = () => {
    const input = document.getElementById("phone-name-input");
    const inputValue = input.value;

    const error = document.getElementById("error-msg");

    //error checking
    if (inputValue == '') {
        error.innerText = 'Input cannot be blank. Please give a valid input';

        detailsSection.innerHTML = '';
        displaySection.innerHTML = '';
    }
    else if (!isNaN(inputValue)) {
        error.innerText = 'Input cannot be number. Please give a valid input';

        detailsSection.innerHTML = '';
        displaySection.innerHTML = '';
        input.value = '';
    }
    else {
        //dynamic url for searching by input
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhones(data.data))

        input.value = '';
        error.innerText = '';
    }
}


//function for displaying the phones searched for
const displayPhones = (phones) => {

    displaySection.innerHTML = '';
    detailsSection.innerHTML = '';

    //show if no results found
    if (phones.length == 0) {

        notFoundDiv.innerHTML = `
        <h4 class="text-2xl text-cyan-700 font-bold text-center mt-5">Found no results for search</h4>
        `;
        searchSection.appendChild(notFoundDiv);
    }
    else if (phones.length > 20) {

        //show only first 20 results of search
        const phoneResult20 = phones.slice(0, 20);
        showPhones(phoneResult20);

        const showAllButtonDiv = document.createElement("div");
        showAllButtonDiv.className = "flex justify-center items-center lg:col-span-1 md:col-span-2";
        showAllButtonDiv.innerHTML = `
        <button class="bg-cyan-700 text-white px-5 py-2 rounded-md ml-2 w-auto">Show All</button> 
        `;
        displaySection.appendChild(showAllButtonDiv);

    }
    else {
        showPhones(phones);
    }
}


//function for showing phones searched
const showPhones = (phones) => {
    for (const phone of phones) {

        notFoundDiv.innerHTML = '';

        const gridDiv = document.createElement("div");
        gridDiv.className = "border-2 border-cyan-700 rounded-md text-center flex flex-col justify-center items-center py-3";
        gridDiv.innerHTML = `
        <img class="h-2/3" src="${phone.image}" alt="">
            <h1 class="uppercase mt-3 text-xl">${phone.brand}</h1>
            <p class="my-3">${phone.phone_name}</p>
            <button onclick="showDetailsButton('${phone.slug}')" class="bg-cyan-700 text-white py-2 px-3 lg:px-5 font-semibold rounded-md">Show Details</button>
        `;
        displaySection.appendChild(gridDiv);
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

    detailsSection.innerHTML = '';

    //displays phone image, name and releasedate
    const leftDiv = document.createElement("div");
    leftDiv.className = "text-center flex flex-col justify-center items-center md:p-5 md:col-span-2 lg:col-span-1"
    leftDiv.innerHTML = `
    <img class="h-3/6" src="${phone.image}" alt="">
            <h1 class="uppercase mt-3 text-xl font-bold">${phone.name}</h1 >
        <p id="release-date" class="font-montserrat mb:0 md:my-3">${phone.releaseDate}</p>
    `;

    if (phone.releaseDate == null) {
        const releaseDateField = document.getElementById("release-date");
        releaseDateField.innerText = "No release date";
    }
    detailsSection.appendChild(leftDiv);

    //displays main features including sensors
    const middleDiv = document.createElement("div");
    middleDiv.className = "text-center flex flex-col justify-center items-start px-5";
    middleDiv.innerHTML = `
    <h1 class="uppercase mt-0 lg:mt-3 text-xl font-bold">Main Features</h1>
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
    rightDiv.className = "text-center flex flex-col justify-center items-start px-5 my-5 md:my-0";
    rightDiv.innerHTML =
        `
        <h1 class="uppercase mt-0 lg:mt-3 text-xl font-bold">Others</h1>
        <p class="mt-2 font-semibold text-left">WLAN: <span class="font-normal">${phone?.others.WLAN}</span></p >
        <p class="my-1 font-semibold text-left">Bluetooth: <span class="font-normal">${phone?.others?.Bluetooth}</span></p>
        <p class="my-1 font-semibold text-left">GPS: <span class="font-normal">${phone?.others.GPS}</span></p>
        <p class="my-1 font-semibold text-left">NFC: <span class="font-normal">${phone?.others.NFC}</span></p>
        <p class="my-1 font-semibold text-left">Radio: <span class="font-normal">${phone?.others.Radio}</span></p>
        <p class="my-1 font-semibold text-left">USB: <span class="font-normal">${phone?.others.USB}</span></p>
`;
    detailsSection.appendChild(rightDiv);

}