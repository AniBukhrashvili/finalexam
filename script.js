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

        for (const [siteId, hotel] of Object.entries(data)) {
            const hotelElement = document.createElement('div');
            hotelElement.classList.add('hotel_item');
            hotelElement.innerHTML = `
                <h3>Hotel Site ID: ${hotel.siteId}</h3>
                <a>Hotel Url: ${hotel.url}</a>
                <p>Country Code: ${hotel.countryCode}</p>
                <div class="btn-favourite">
                    <button>Add To Favourites</button>
                </div>
            `;
            hotelsContainer.appendChild(hotelElement);
        }

        const hotelElements = document.querySelectorAll('.hotel_item');
        hotelElements.forEach(hotelElement => {
            const addToFavouritesButton = hotelElement.querySelector('.btn-favourite button');
            addToFavouritesButton.addEventListener('click', toggleFavourite);
        });

        function toggleFavourite(event) {
            const button = event.target;
            const hotelElement = button.closest('.hotel_item');
            const starIcon = hotelElement.querySelector('.fa-star');

            if (button.classList.contains('added-to-favourites')) {
                button.classList.remove('added-to-favourites');
                button.innerText = 'Add to Favourites';
                starIcon.remove();
            } else {
                button.classList.add('added-to-favourites');
                button.innerText = 'Remove from Favourites';
                const starIcon = document.createElement('i');
                starIcon.classList.add('fas', 'fa-star');
                hotelElement.appendChild(starIcon);
            }
        }

        const addToFavouritesButtons = document.querySelectorAll('.btn-favourite button');
        addToFavouritesButtons.forEach(button => {
            button.addEventListener('click', toggleFavourite);
        });

    } catch (error) {
        console.error(error);
    }
}

fetchHotelsData();