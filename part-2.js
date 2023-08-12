document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const errorMessages = document.getElementById("errorMessages");

    form.addEventListener("submit", function(event) {
        errorMessages.innerHTML = "";

        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const country = form.country.value;
        const zipCode = form.zipCode.value;
        const phone = form.phone.value;

        if (!/^[a-zA-Z. ]+$/.test(firstName)) {
            errorMessages.innerHTML += "Invalid First Name<br>";
            event.preventDefault();
        }

        if (!/^[a-zA-Z. ]+$/.test(lastName)) {
            errorMessages.innerHTML += "Invalid Last Name<br>";
            event.preventDefault();
        }

        if (!/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$|^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/.test(zipCode) && country === "CA") {
            errorMessages.innerHTML += "Invalid ZIP/Postal Code<br>";
            event.preventDefault();
        }

        if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phone)) {
            errorMessages.innerHTML += "Invalid Phone Number<br>";
            event.preventDefault();
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const countriesTable = document.getElementById("countriesTable");

    fetch("https://restcountries.com/v3.1/independent?status=true")
        .then(response => response.json())
        .then(data => {
            const countriesData = data.map(country => {
                return `
                    <tr>
                        <td>${country.name.common}</td>
                        <td>${country.capital[0]}</td>
                        <td>${country.population}</td>
                        <!-- Add more columns as needed -->
                    </tr>
                `;
            }).join('');

            countriesTable.querySelector("tbody").innerHTML = countriesData;
        })
        .catch(error => console.error("Error fetching data:", error));
});

