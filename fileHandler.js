let csvDataArray = [];
let selectedColumns = [];

// --------------- Load CSV file
function loadCsvFile() {
    const fileInput = document.getElementById('csvFileInput');
    const loadCsvButton = document.getElementById('loadCsvButton');
    const columnCheckboxes = document.getElementById('columnCheckboxes');
    const generateArrayButton = document.getElementById('generateArrayButton');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const csvData = e.target.result;
            csvDataArray = parseCsvToArray(csvData);

            // Generate checkboxes for columns
            const columns = csvDataArray.length > 0 ? csvDataArray[0] : [];
            selectedColumns = columns.map((column, index) => index);

            columnCheckboxes.innerHTML = columns.map((column, index) =>
               {
                return `<label><input type="checkbox" checked value="${index}" onchange="toggleColumn(${index})">${column}</label> <br>`
            }
            ).join('');

            // Show the next step button
            loadCsvButton.classList.add('hidden');
            columnCheckboxes.classList.remove('hidden');
            generateArrayButton.classList.remove('hidden');
        };
        reader.readAsText(file);
    } else {
        alert('Please select a CSV file.');
    }
}

//----------- Parse CSV data into an array using semicolon as a delimiter

function parseCsvToArray(csvData) {
    var fileContent = csvData;
    var contentWithSemicolons = fileContent.replace(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g, ';');
    console.log(contentWithSemicolons);
    const rows = contentWithSemicolons.split('\n');
    const dataArray = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();
        if (row) {
            const columns = row.split(';');
            dataArray.push(columns);
        }
    }

    return dataArray;
}

//----------- Toggle column selection, update the selectedColumns array

function toggleColumn(index) {
    const checkbox = document.querySelector(`input[value="${index}"]`);
    if (checkbox) {
        if (checkbox.checked) {
            selectedColumns.push(index);
        } else {
            selectedColumns = selectedColumns.filter(colIndex => colIndex !== index);
        }
    }
}

// ----------- Generate the array and pass it to the second form
function generateArray() {
    const columnCheckboxes = document.getElementById('columnCheckboxes');
    const generateArrayButton = document.getElementById('generateArrayButton');

    // Extract selected columns from CSV data
    const filteredData = csvDataArray.map(row =>
        selectedColumns.map(colIndex => row[colIndex])
    );

    // Display the result
    const csvData = JSON.stringify(filteredData, null, 2);
    // console.log(filteredData)
    // console.log(csvData)

    //Add csvData to csvData field in fileSenderForm
    const csvDataField = document.getElementById('csvData');
    csvDataField.value = csvData;
    

    // Hide the checkboxes and the generate button
    columnCheckboxes.classList.add('hidden');
    generateArrayButton.classList.add('hidden');
    // resultOutput.classList.remove('hidden');

    //Hide fileuploadform
    const fileuploadform = document.getElementById('fileUploadForm');
    fileuploadform.classList.add('hidden');

    //Show fileSenderForm
    const fileSenderForm = document.getElementById('fileSenderForm');
    fileSenderForm.classList.remove('hidden');
}
