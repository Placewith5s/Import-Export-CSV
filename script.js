// local scope
(() => {
    'use strict'; // get less errors
    document.addEventListener("DOMContentLoaded", () => {
        // get the export button
        const export_btn = document.querySelector('#export-btn') ?? console.error("No export button found!");
        // get the csv
        const CSV = document.querySelector('#csv') ?? console.error("No CSV found!");
        // get the table
        const table = document.querySelector('#table') ?? console.error("No table found!");


        // function to handle exporting the data
        function export_data() {
            // get the rows
            const rows = document.querySelectorAll('#table tr') ?? console.error("No rows found!");

            let csv_content = '';

            // loop to handle the rows' length
            for (let i = 0; i < rows.length; i++) {
                const cols = rows[i].querySelectorAll('td') ?? console.error("No columns found!");
                let row_content = '';

                // loop to handle the columns' length
                for (let j = 0; j < cols.length; j++) {
                    // update the row content
                    row_content += cols[j].textContent + ',';
                }

                // update the csv content
                csv_content += row_content.slice(0, -1) + '\n';
            }

            // create a blob
            const blob = new Blob([csv_content], {type: 'text/csv'});
            // create a new url
            const url = window.URL.createObjectURL(blob);
            // get main
            const main = document.querySelector('main') ?? console.error("No main found!");
            // get the link
            const a = main.querySelector('a') ?? console.error("No link found!");

            a.href = url; // connect the link to the url

            a.click(); // make the download work

            // remove the url
            window.URL.revokeObjectURL(url);
        }

        
        // function to handle importing the data
        function import_data(file) {
            if (!file) {
                console.error("No file given!");
                return;
            }

            // get the file reader
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                // get the content
                const content = e.target.result;
                // newline for every new row
                const rows = content.split('\n').map(row => row.split(','));

                // clear the previous table value
                table.innerHTML = '';

                for (let i = 0; i < rows.length; i++) {
                    // create a new table row
                    const tr = document.createElement('tr');
                    // loop to handle the import's length
                    for (let j = 0; j < rows[i].length; j++) {
                        // create a new table data cell
                        const td = document.createElement('td');
                        // update text content for the table data cell
                        td.textContent = rows[i][j];
                        // parent the table data cell to the table row
                        tr.appendChild(td);
                    }
                    // parent the table row to the table
                    table.appendChild(tr);
                }
            });

            reader.readAsText(file);

            reader.addEventListener('error', () => {
                console.error("Reading error!");
                return;
            });
        }

        // add an event listener for the export button
        export_btn.addEventListener("click", () => {
            // export the data
            export_data();
        });

        // add an event listener for importing
        CSV.addEventListener("change", (e) => {
            // import the data
            import_data(e.target.files[0]);
        });
    });
})();