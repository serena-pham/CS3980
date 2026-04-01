# Assignment 3: MongoDB Setup and Queries

The HTML page that accompanies the files in this folder displays the US Population data taken from [Data USA](https://datausa.io/about/api/).

The ```index.html``` file defines the structure of the webpage created. Within the file, a table layout is created, and connects to ```script.js```, which fills the table with data from the given API. 

In summary, the ```script.js``` file retreives the population data from the API endpoint and fills the table with it. The script uses ```fetch()``` to request the data from the API, and once retreieved, extracts the year and population records. The script then locates the table body in ```index.hmtl``` using the table's ID, and creates rows for each population record.

Lastly, for every population record, the script creates a new row and cell for the year and population, and fills the table with the data.

The screenshot below shows the final HTML page.

![](page.png)
