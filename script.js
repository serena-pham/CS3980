(function () {
    const url = "https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&measures=Population&drilldowns=Year";

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {

            const records = result.data;

            records.sort(function(a, b) {
                return a.Year - b.Year;
            });

            const tableBody = document.querySelector("#populationTable tbody");

            records.forEach(function(item) {

                const row = document.createElement("tr");
                const yearCell = document.createElement("td");
                yearCell.textContent = item.Year;

                const populationCell = document.createElement("td");
                populationCell.textContent = Number(item.Population).toLocaleString();

                row.appendChild(yearCell);
                row.appendChild(populationCell);

                tableBody.appendChild(row);
            });

        })
        .catch(function(error) {
            console.log("Error fetching data:", error);
        });

})();