document.addEventListener("DOMContentLoaded", function () {
    const countryTableBody = document.getElementById("countryTableBody");

    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then(response => response.json())
      .then(data => {
        const countries = Object.values(data);

        let countryRows = "";
        countries.forEach((country, index) => {
          const flag = country.flags?.png || "";
          const nativeName = getNativeName(country);
          const capital = country.capital[0] || "";
          const subregion = country.subregion || "";
          const coatOfArms = country.coatOfArms?.png || ""; // Coat of arms adjustment

          countryRows += `
            <tr>
              <td>${index + 1}</td>
              <td>&nbsp;${country.name?.common || ""}</td>
              <td>&nbsp;<img src="${flag}" height="30" /></td>
              <td>&nbsp;<img src="${coatOfArms}" height="30" /></td>
              <td>&nbsp;${capital}</td>
              <td>&nbsp;${subregion}</td>
            </tr>
          `;
        });
        function getNativeName(country) {
      if (country.nativeName) {
        for (const langCode of Object.keys(country.nativeName)) {
          if (country.nativeName[langCode].common) {
            return country.nativeName[langCode].common;
          }
        }
      }
      return "";
    }

        countryTableBody.innerHTML = countryRows;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  });
