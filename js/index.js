//onclick function for the search button
const searchButton = () => {
    fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

//function for displaying the phones searched for
const displayPhones = (phones) => {
    for (const phone of phones) {
        console.log(phone);
    }

}