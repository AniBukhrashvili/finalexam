function displayFavourites() {
    const favouritesContainer = document.getElementById('favourites-container');
    const favouritesSection = document.getElementById('favourites');
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (favourites.length === 0) {
        favouritesSection.innerHTML = '<div class="favourite-message">There are no hotels in your favourites.</div>';
        return;
    }

    favouritesContainer.innerHTML = '';

    for (const hotel of favourites) {
        const hotelElement = createHotelElement(hotel);
        favouritesContainer.appendChild(hotelElement);
    }
}

function createHotelElement(hotel) {
    const hotelElement = document.createElement('div');
    hotelElement.classList.add('hotel_item');
    hotelElement.innerHTML = `
        <h3>Hotel Site ID: ${hotel.siteId}</h3>
        <p>Hotel Url: ${hotel.branding}</p>
        <div class="btn-remove">
            <button>Remove From Favourites
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    const removeButton = hotelElement.querySelector('.btn-remove button');
    removeButton.addEventListener('click', () => {
        removeHotelFromFavourites(hotel);
        hotelElement.remove();
    });

    return hotelElement;
}

function removeHotelFromFavourites(hotel) {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const updatedFavourites = favourites.filter(h => h.siteId !== hotel.siteId);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    displayFavourites();
}

displayFavourites();