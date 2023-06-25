const url = 'https://hotels4.p.rapidapi.com/v2/get-meta-data';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '11cd97ecd0mshab7ef7bf1709e24p109e92jsndf56ee0ba9c4',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
};

async function fetchHotelsData() {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log(data);

        const hotelsContainer = document.getElementById('hotels-container');

        for (const hotelId in data) {
            if (data.hasOwnProperty(hotelId)) {
                const hotel = data[hotelId];
                const hotelElement = createHotelElement(hotel);
                hotelsContainer.appendChild(hotelElement);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

function createHotelElement(hotel) {
    const hotelElement = document.createElement('div');
    hotelElement.classList.add('hotel_item');
    hotelElement.innerHTML = `
        <h3>Hotel Site ID: ${hotel.siteId}</h3>
        <a>Hotel Url: ${hotel.url}</a>
        <p>Country Code: ${hotel.countryCode}</p>
        <div class="btn-favourite">
            <button>Add to Favourites</button>
        </div>
    `;

    const addToFavouritesButton = hotelElement.querySelector('.btn-favourite button');
    addToFavouritesButton.addEventListener('click', () => {
        toggleFavourite(hotel, hotelElement);
    });

    return hotelElement;
}

function toggleFavourite(hotel, hotelElement) {
    const button = hotelElement.querySelector('.btn-favourite button');

    button.classList.add('added-to-favourites');
    button.innerText = 'Added To Favourites';
    const starIcon = document.createElement('i');
    starIcon.classList.add('fas', 'fa-star');
    button.appendChild(starIcon);
    addHotelToFavourites(hotel);
}

function addHotelToFavourites(hotel) {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const hotelData = {
        siteId: hotel.siteId,
        branding: hotel.branding
    };
    favourites.push(hotelData);
    localStorage.setItem('favourites', JSON.stringify(favourites));
}

fetchHotelsData();