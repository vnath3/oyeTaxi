// Function to set default date as current date + 1 day
function setDefaultDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const defaultDate = `${year}-${month}-${day}`;
    document.getElementById('date').value = defaultDate;
}

// Function to populate time dropdown with hardcoded values (difference of 30 mins)
function populateTimeDropdown() {
    const timeDropdown = document.getElementById('time');

    // Clear existing options
    timeDropdown.innerHTML = '';

    // Add hardcoded time options with a difference of 30 mins
    for (let hours = 0; hours < 24; hours++) {
        for (let minutes of ['00', '30']) {
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes}`;
            const option = new Option(formattedTime, formattedTime);
            timeDropdown.add(option);
        }
    }
}

// Call the functions after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    setDefaultDate();
    populateTimeDropdown();
});








function calculateDistance() {
    const sourceCity = document.getElementById('source').value;
    const destinationCity = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Basic input validation
    if (!sourceCity || !destinationCity || !date || !time) {
        displayError('Please fill in all the fields.');
        return;
    }

    // Define predefined distances for each combination (you can customize this based on your needs)
    const predefinedDistances = {
        'Mumbai': {
            'Mumbai': 0,
            'Pune': 150,
            'Nagpur': 850,
            'Thane': 30,
            'Nashik': 200,
            'Aurangabad': 350,
            'Solapur': 500,
            'Amravati': 650,
            'Navi Mumbai': 20,
            'Kolhapur': 700,
            'Akola': 600,
            'Jalgaon': 550,
            'Latur': 650,
            'Ahmednagar': 250,
            'Chandrapur': 900,
            'Parbhani': 600,
            'Satara': 300,
            'Dhule': 400,
            'Jalna': 400,
            'Nanded': 600,
            'Bhiwandi': 40,
            'Wardha': 850,
            'Kolad': 150,
            'Alibaug': 100,
            'Lonavala': 100,
            'Ratnagiri': 350,
            'Sangli': 600,
            'Osmanabad': 500,
            'Palghar': 100,
            'Beed': 550,
            'Karad': 400,
            'Yavatmal': 700,
            'Panvel': 30,
            'Buldhana': 700,
            'Aurangabad': 350,
            'Dhule': 400,
            'Ichalkaranji': 600,
            'Hingoli': 650,
            'Nandurbar': 550,
            'Gondia': 850,
            'Gadchiroli': 950,
            'Washim': 700,
            'Wardha': 850,
            'Jalgaon Jamod': 600,
            'Pusad': 650,
            'Manmad': 200,
            'Udgir': 550,
            'Kalyan-Dombivali': 40,
            'Bhusawal': 550,
            'Vasai-Virar': 70
        },
        'Pune': {
            'Pune': 0,
            'Nagpur': 700,
            'Thane': 150,
            'Nashik': 200,
            'Aurangabad': 250,
            'Solapur': 250,
            'Amravati': 800,
            'Navi Mumbai': 160,
            'Kolhapur': 400,
            'Akola': 600,
            'Jalgaon': 450,
            'Latur': 300,
            'Ahmednagar': 120,
            'Chandrapur': 750,
            'Parbhani': 350,
            'Satara': 250,
            'Dhule': 400,
            'Jalna': 200,
            'Nanded': 550,
            'Bhiwandi': 150,
            'Wardha': 650,
            'Kolad': 100,
            'Alibaug': 150,
            'Lonavala': 70,
            'Ratnagiri': 300,
            'Sangli': 350,
            'Osmanabad': 200,
            'Palghar': 180,
            'Beed': 250,
            'Karad': 300,
            'Yavatmal': 600,
            'Panvel': 150,
            'Buldhana': 700,
            'Ichalkaranji': 350,
            'Hingoli': 400,
            'Nandurbar': 500,
            'Gondia': 850,
            'Gadchiroli': 900,
            'Washim': 450,
            'Jalgaon Jamod': 550,
            'Pusad': 500,
            'Manmad': 250,
            'Udgir': 400,
            'Kalyan-Dombivali': 170,
            'Bhusawal': 500,
            'Vasai-Virar': 180
        },
        'Thane': {
            'Pune': 150,
            'Nagpur': 850,
            'Nashik': 120,
            'Aurangabad': 180,
            'Solapur': 220,
            'Amravati': 770,
            'Navi Mumbai': 30,
            'Kolhapur': 370,
            'Akola': 580,
            'Jalgaon': 430,
            'Latur': 270,
            'Ahmednagar': 100,
            'Chandrapur': 720,
            'Parbhani': 320,
            'Satara': 150,
            'Dhule': 300,
            'Jalna': 160,
            'Nanded': 510,
            'Bhiwandi': 10,
            'Wardha': 620,
            'Kolad': 130,
            'Alibaug': 90,
            'Lonavala': 40,
            'Ratnagiri': 260,
            'Sangli': 320,
            'Osmanabad': 170,
            'Palghar': 160,
            'Beed': 230,
            'Karad': 280,
            'Yavatmal': 550,
            'Panvel': 40,
            'Buldhana': 650,
            'Ichalkaranji': 300,
            'Hingoli': 350,
            'Nandurbar': 450,
            'Gondia': 800,
            'Gadchiroli': 850,
            'Washim': 400,
            'Jalgaon Jamod': 500,
            'Pusad': 450,
            'Manmad': 200,
            'Udgir': 350,
            'Kalyan-Dombivali': 50,
            'Bhusawal': 450,
            'Vasai-Virar': 70
        },
        'Nashik': {

            'Pune': 200,
            'Nagpur': 750,
            'Thane': 120,
            'Aurangabad': 200,
            'Solapur': 320,
            'Amravati': 650,
            'Navi Mumbai': 150,
            'Kolhapur': 400,
            'Akola': 550,
            'Jalgaon': 200,
            'Latur': 400,
            'Ahmednagar': 70,
            'Chandrapur': 800,
            'Parbhani': 450,
            'Satara': 250,
            'Dhule': 140,
            'Jalna': 150,
            'Nanded': 500,
            'Bhiwandi': 130,
            'Wardha': 700,
            'Kolad': 200,
            'Alibaug': 250,
            'Lonavala': 200,
            'Ratnagiri': 350,
            'Sangli': 330,
            'Osmanabad': 350,
            'Palghar': 130,
            'Beed': 380,
            'Karad': 310,
            'Yavatmal': 550,
            'Panvel': 150,
            'Buldhana': 600,
            'Ichalkaranji': 300,
            'Hingoli': 400,
            'Nandurbar': 450,
            'Gondia': 850,
            'Gadchiroli': 900,
            'Washim': 400,
            'Wardha': 700,
            'Jalgaon Jamod': 550,
            'Pusad': 500,
            'Manmad': 70,
            'Udgir': 500,
            'Kalyan-Dombivali': 140,
            'Bhusawal': 250,
            'Vasai-Virar': 120
        },
        'Nagpur': {
            'Pune': 700,
            'Nagpur': 0,
            'Thane': 850,
            'Nashik': 750,
            'Aurangabad': 350,
            'Solapur': 600,
            'Amravati': 150,
            'Navi Mumbai': 840,
            'Kolhapur': 750,
            'Akola': 250,
            'Jalgaon': 650,
            'Latur': 500,
            'Ahmednagar': 720,
            'Chandrapur': 150,
            'Parbhani': 550,
            'Satara': 650,
            'Dhule': 800,
            'Jalna': 350,
            'Nanded': 650,
            'Bhiwandi': 860,
            'Wardha': 75,
            'Kolad': 860,
            'Alibaug': 890,
            'Lonavala': 820,
            'Ratnagiri': 540,
            'Sangli': 630,
            'Osmanabad': 500,
            'Palghar': 870,
            'Beed': 450,
            'Karad': 590,
            'Yavatmal': 160,
            'Panvel': 850,
            'Buldhana': 280,
            'Ichalkaranji': 670,
            'Hingoli': 580,
            'Nandurbar': 590,
            'Gondia': 180,
            'Gadchiroli': 300,
            'Washim': 600,
            'Wardha': 75,
            'Jalgaon Jamod': 410,
            'Pusad': 480,
            'Manmad': 660,
            'Udgir': 630,
            'Kalyan-Dombivali': 860,
            'Bhusawal': 540,
            'Vasai-Virar': 870
        },
        'Aurangabad': {
            'Pune': 250,
            'Nagpur': 350,
            'Thane': 180,
            'Nashik': 200,
            'Aurangabad': 0,
            'Solapur': 450,
            'Amravati': 600,
            'Navi Mumbai': 170,
            'Kolhapur': 650,
            'Akola': 450,
            'Jalgaon': 200,
            'Latur': 300,
            'Ahmednagar': 120,
            'Chandrapur': 550,
            'Parbhani': 200,
            'Satara': 300,
            'Dhule': 400,
            'Jalna': 160,
            'Nanded': 300,
            'Bhiwandi': 220,
            'Wardha': 650,
            'Kolad': 400,
            'Alibaug': 450,
            'Lonavala': 380,
            'Ratnagiri': 500,
            'Sangli': 450,
            'Osmanabad': 350,
            'Palghar': 340,
            'Beed': 200,
            'Karad': 350,
            'Yavatmal': 550,
            'Panvel': 170,
            'Buldhana': 520,
            'Ichalkaranji': 370,
            'Hingoli': 300,
            'Nandurbar': 480,
            'Gondia': 400,
            'Gadchiroli': 700,
            'Washim': 350,
            'Wardha': 650,
            'Jalgaon Jamod': 350,
            'Pusad': 400,
            'Manmad': 150,
            'Udgir': 450,
            'Kalyan-Dombivali': 220,
            'Bhusawal': 350,
            'Vasai-Virar': 170
        },
        'Solapur': {
            'Pune': 250,
            'Nagpur': 600,
            'Thane': 220,
            'Nashik': 320,
            'Aurangabad': 450,
            'Solapur': 0,
            'Amravati': 650,
            'Navi Mumbai': 240,
            'Kolhapur': 250,
            'Akola': 550,
            'Jalgaon': 420,
            'Latur': 120,
            'Ahmednagar': 200,
            'Chandrapur': 720,
            'Parbhani': 270,
            'Satara': 200,
            'Dhule': 450,
            'Jalna': 400,
            'Nanded': 450,
            'Bhiwandi': 320,
            'Wardha': 600,
            'Kolad': 420,
            'Alibaug': 470,
            'Lonavala': 450,
            'Ratnagiri': 320,
            'Sangli': 110,
            'Osmanabad': 190,
            'Palghar': 300,
            'Beed': 270,
            'Karad': 350,
            'Yavatmal': 550,
            'Panvel': 240,
            'Buldhana': 500,
            'Ichalkaranji': 190,
            'Hingoli': 320,
            'Nandurbar': 510,
            'Gondia': 820,
            'Gadchiroli': 870,
            'Washim': 480,
            'Wardha': 600,
            'Jalgaon Jamod': 280,
            'Pusad': 330,
            'Manmad': 420,
            'Udgir': 170,
            'Kalyan-Dombivali': 230,
            'Bhusawal': 300,
            'Vasai-Virar': 260
        },
        'Amravati': {
            'Pune': 800,
            'Nagpur': 150,
            'Thane': 650,
            'Nashik': 650,
            'Aurangabad': 600,
            'Solapur': 650,
            'Amravati': 0,
            'Navi Mumbai': 640,
            'Kolhapur': 800,
            'Akola': 100,
            'Jalgaon': 550,
            'Latur': 650,
            'Ahmednagar': 680,
            'Chandrapur': 250,
            'Parbhani': 450,
            'Satara': 700,
            'Dhule': 600,
            'Jalna': 500,
            'Nanded': 600,
            'Bhiwandi': 750,
            'Wardha': 120,
            'Kolad': 820,
            'Alibaug': 870,
            'Lonavala': 800,
            'Ratnagiri': 530,
            'Sangli': 720,
            'Osmanabad': 420,
            'Palghar': 690,
            'Beed': 600,
            'Karad': 750,
            'Yavatmal': 500,
            'Panvel': 640,
            'Buldhana': 220,
            'Ichalkaranji': 710,
            'Hingoli': 620,
            'Nandurbar': 630,
            'Gondia': 270,
            'Gadchiroli': 150,
            'Washim': 550,
            'Wardha': 120,
            'Jalgaon Jamod': 350,
            'Pusad': 450,
            'Manmad': 680,
            'Udgir': 650,
            'Kalyan-Dombivali': 870,
            'Bhusawal': 550,
            'Vasai-Virar': 890
        },
        'Navi Mumbai': {
            'Pune': 150,
            'Nagpur': 840,
            'Thane': 20,
            'Nashik': 150,
            'Aurangabad': 170,
            'Solapur': 240,
            'Amravati': 640,
            'Navi Mumbai': 0,
            'Kolhapur': 400,
            'Akola': 550,
            'Jalgaon': 360,
            'Latur': 450,
            'Ahmednagar': 680,
            'Chandrapur': 250,
            'Parbhani': 450,
            'Satara': 700,
            'Dhule': 600,
            'Jalna': 500,
            'Nanded': 600,
            'Bhiwandi': 750,
            'Wardha': 120,
            'Kolad': 820,
            'Alibaug': 870,
            'Lonavala': 800,
            'Ratnagiri': 530,
            'Sangli': 720,
            'Osmanabad': 420,
            'Palghar': 690,
            'Beed': 600,
            'Karad': 750,
            'Yavatmal': 500,
            'Panvel': 640,
            'Buldhana': 220,
            'Ichalkaranji': 710,
            'Hingoli': 620,
            'Nandurbar': 630,
            'Gondia': 270,
            'Gadchiroli': 150,
            'Washim': 550,
            'Wardha': 120,
            'Jalgaon Jamod': 350,
            'Pusad': 450,
            'Manmad': 680,
            'Udgir': 650,
            'Kalyan-Dombivali': 870,
            'Bhusawal': 550,
            'Vasai-Virar': 890
        },
        'Kolhapur': {
            'Pune': 400,
            'Nagpur': 750,
            'Thane': 420,
            'Nashik': 400,
            'Aurangabad': 650,
            'Solapur': 250,
            'Amravati': 800,
            'Navi Mumbai': 400,
            'Kolhapur': 0,
            'Akola': 650,
            'Jalgaon': 550,
            'Latur': 650,
            'Ahmednagar': 460,
            'Chandrapur': 750,
            'Parbhani': 600,
            'Satara': 240,
            'Dhule': 570,
            'Jalna': 600,
            'Nanded': 670,
            'Bhiwandi': 430,
            'Wardha': 660,
            'Kolad': 600,
            'Alibaug': 650,
            'Lonavala': 580,
            'Ratnagiri': 200,
            'Sangli': 50,
            'Osmanabad': 650,
            'Palghar': 530,
            'Beed': 650,
            'Karad': 60,
            'Yavatmal': 750,
            'Panvel': 420,
            'Buldhana': 800,
            'Ichalkaranji': 50,
            'Hingoli': 550,
            'Nandurbar': 720,
            'Gondia': 800,
            'Gadchiroli': 890,
            'Washim': 680,
            'Wardha': 660,
            'Jalgaon Jamod': 610,
            'Pusad': 800,
            'Manmad': 640,
            'Udgir': 650,
            'Kalyan-Dombivali': 420,
            'Bhusawal': 680,
            'Vasai-Virar': 610
        },
        'Akola': {
            'Pune': 550,
            'Nagpur': 250,
            'Thane': 620,
            'Nashik': 550,
            'Aurangabad': 450,
            'Solapur': 550,
            'Amravati': 100,
            'Navi Mumbai': 550,
            'Kolhapur': 650,
            'Akola': 0,
            'Jalgaon': 200,
            'Latur': 450,
            'Ahmednagar': 530,
            'Chandrapur': 300,
            'Parbhani': 400,
            'Satara': 600,
            'Dhule': 470,
            'Jalna': 400,
            'Nanded': 500,
            'Bhiwandi': 570,
            'Wardha': 320,
            'Kolad': 600,
            'Alibaug': 650,
            'Lonavala': 580,
            'Ratnagiri': 700,
            'Sangli': 500,
            'Osmanabad': 350,
            'Palghar': 670,
            'Beed': 550,
            'Karad': 600,
            'Yavatmal': 450,
            'Panvel': 550,
            'Buldhana': 100,
            'Ichalkaranji': 560,
            'Hingoli': 300,
            'Nandurbar': 580,
            'Gondia': 350,
            'Gadchiroli': 500,
            'Washim': 250,
            'Wardha': 320,
            'Jalgaon Jamod': 480,
            'Pusad': 300,
            'Manmad': 470,
            'Udgir': 350,
            'Kalyan-Dombivali': 620,
            'Bhusawal': 580,
            'Vasai-Virar': 610
        },
        'Nanded': {
            'Pune': 600,
            'Nagpur': 500,
            'Thane': 570,
            'Nashik': 500,
            'Aurangabad': 400,
            'Solapur': 700,
            'Amravati': 600,
            'Navi Mumbai': 600,
            'Kolhapur': 670,
            'Akola': 500,
            'Jalgaon': 600,
            'Latur': 500,
            'Ahmednagar': 530,
            'Chandrapur': 400,
            'Parbhani': 250,
            'Satara': 670,
            'Dhule': 470,
            'Jalna': 300,
            'Nanded': 0,
            'Bhiwandi': 550,
            'Wardha': 550,
            'Kolad': 700,
            'Alibaug': 750,
            'Lonavala': 680,
            'Ratnagiri': 580,
            'Sangli': 720,
            'Osmanabad': 300,
            'Palghar': 650,
            'Beed': 400,
            'Karad': 700,
            'Yavatmal': 350,
            'Panvel': 600,
            'Buldhana': 500,
            'Ichalkaranji': 670,
            'Hingoli': 300,
            'Nandurbar': 750,
            'Gondia': 700,
            'Gadchiroli': 450,
            'Washim': 400,
            'Wardha': 550,
            'Jalgaon Jamod': 500,
            'Pusad': 450,
            'Manmad': 500,
            'Udgir': 400,
            'Kalyan-Dombivali': 610,
            'Bhusawal': 570,
            'Vasai-Virar': 600
        }



    };


    // Update the HTML dropdown list
    // const selectElement = document.getElementById('source');
    // selectElement.innerHTML = '<option value="" selected disabled>Select Source City</option>';

    // for (const city in predefinedDistances) {
    //     const optionElement = document.createElement('option');
    //     optionElement.value = city;
    //     optionElement.textContent = `${city}, Maharashtra`;
    //     selectElement.appendChild(optionElement);
    // }



    // Get the predefined distance based on the selected source and destination cities
    let roundOffDistance = predefinedDistances[sourceCity][destinationCity];
    let totalDistance = predefinedDistances[sourceCity][destinationCity];

    // Apply rounding logic based on thresholds
    if (totalDistance < 300) {
        roundOffDistance = 300;
    } else if (totalDistance >= 300 && totalDistance < 600) {
        roundOffDistance = 600;
    } else if (totalDistance >= 600 && totalDistance < 900) {
        roundOffDistance = 900;
    } // Add more thresholds as needed

    // Example: Assume a base price per km
    const basePricePerKm = 10;
    const basePricePerKmPremium = 12;

    // Calculate total price
    const totalPrice = roundOffDistance * basePricePerKm;
    const totalPricePremium = roundOffDistance * basePricePerKmPremium;

    //Displaying from and to city 
    let search = sourceCity + " to " + destinationCity;

    // Display cab details in the table
    displayCabDetails(search, "Standard Cab", basePricePerKm, totalDistance, totalPrice);
    displayCabDetails(search, "Premium Cab", basePricePerKmPremium, totalDistance, totalPricePremium);
}

function displayCabDetails(search, carName, pricePerKm, totalDistance, totalPrice) {
    const cabListBody = document.getElementById('cab-list-body');

    // Clear existing rows in the table commenting just because its not showing multiple records i.e. for standard and premioun
    //TODO:
    // cabListBody.innerHTML = '';

    // Create a new row in the table
    const newRow = cabListBody.insertRow();

    // Populate the row with cab details
    newRow.innerHTML = `
    <td>${search}</td>
    <td>${carName}</td>
    <td>${pricePerKm}</td>
    <td>${totalDistance} km</td>
    <td>${totalPrice}</td>
    <td><button onclick="bookNow()">Book Now</button></td>
`;
}

function bookNow() {
    alert("Booking confirmed!"); // Example action, customize as needed
}

function displayError(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;

    // Increase the font size of the error message
    errorMessageElement.style.fontSize = '45px';

    const widgetContainer = document.getElementById('booking-widget');
    widgetContainer.classList.add('error');

    setTimeout(() => {
        errorMessageElement.textContent = '';
        widgetContainer.classList.remove('error');
    }, 3000); // Remove error after 3 seconds
}
function searchCab() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    // Simulate an asynchronous operation (e.g., API call) with setTimeout
    setTimeout(() => {
        calculateDistance();
        loader.style.display = 'none';
        showCabList();
    }, 1500); // Adjust the time based on your actual operation duration
}





// Function to dynamically update dropdown options based on selected source and destination
function updateDropdownOptions1() {
    const sourceCityDropdown = document.getElementById('source');
    const destinationCityDropdown = document.getElementById('destination');
    const selectedSource = sourceCityDropdown.value;
    const selectedDestination = destinationCityDropdown.value;

    // Remove all options from destination dropdown
    destinationCityDropdown.innerHTML = '';

    // Get options from source dropdown, clone them, and sort the clones alphabetically
    const sourceOptions = Array.from(sourceCityDropdown.options);
    const sortedOptions = sourceOptions.map(option => option.cloneNode(true))
        .sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));

    // Add sorted options to destination dropdown excluding the selected source
    sortedOptions.forEach(option => {
        if (option.value !== selectedSource) {
            destinationCityDropdown.add(option);
        }
    });

    // Preserve the selected destination if it is still available
    const destinationOption = Array.from(destinationCityDropdown.options)
        .find(option => option.value === selectedDestination);

    if (destinationOption) {
        destinationOption.selected = true;
    }
}

let rideType = 'City Ride';

function toggleRideType(type) {
    rideType = type;
    updateInputLayout();
    updateToggleButtonState();
}

function updateInputLayout() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    dateInput.disabled = rideType === 'Airport Ride'; // Disable date input for Airport Ride
    timeInput.disabled = rideType === 'Airport Ride'; // Disable time input for Airport Ride
}

function updateToggleButtonState() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        if (button.textContent.toLowerCase() === rideType.toLowerCase()) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}


// Update the showCabList function to display the reset button
function showCabList() {
    const cabListContainer = document.getElementById('cab-list-container');
    const resetButton = document.getElementById('reset-button');

    // Show the cab options section
    cabListContainer.style.display = 'block';

    // Scroll to the cab list container
    cabListContainer.scrollIntoView({ behavior: 'smooth' });

}

function closeCabOptions() {
    // Clear the cab list
    const cabListBody = document.getElementById('cab-list-body');
    cabListBody.innerHTML = '';

    // Hide cab list container
    const cabListContainer = document.getElementById('cab-list-container');
    cabListContainer.style.display = 'none';

    // Reset the form
    resetForm();
}


function resetForm() {
    // Reset source and destination dropdowns
    document.getElementById('source').value = '';
    document.getElementById('destination').value = '';

    // Reset date and time inputs
    setDefaultDate();
    populateTimeDropdown();

    // Hide cab list and reset button
    const cabListContainer = document.getElementById('cab-list-container');
    cabListContainer.style.display = 'none';

    // Clear any error message
    document.getElementById('error-message').textContent = '';

    // Remove the active class from toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => button.classList.remove('active'));
}

function handleDateChange() {
    setMinDate();
    validateDate();
    // Add more functions if needed
}
function setMinDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const minDate = `${year}-${month}-${day}`;
    document.getElementById('date').min = minDate;
}

// function validateDate() {
//     const currentDate = new Date();
//     const inputDate = new Date(document.getElementById('date').value);

//     // Disable the date picker if the entered date is in the past
//     if (inputDate < currentDate) {
//         alert("Please select a future date.");
//         document.getElementById('date').value = ''; // Clear the input
//     }
// }

function validateDate() {
    const inputDate = document.getElementById('date').value;

    if (!isValidDate(inputDate)) {
        alert('Please select a valid date in the future.');
        // You can add additional logic or actions here
    } else {
        // Date is valid, you can proceed with other actions if needed
    }
}