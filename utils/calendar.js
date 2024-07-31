// Function to add days to the current date
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Function to format the date in 'YYYY-MM-DDTHH:MM' format
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Get the current date
const currentDate = new Date();

// Calculate the min and max dates
const minDate = addDays(currentDate, 7);
const maxDate = addDays(currentDate, 2 * 365); // Approximation for 2 years

// Format the dates in 'YYYY-MM-DDTHH:MM' format
const minDateTime = formatDate(minDate);
const maxDateTime = formatDate(maxDate);


function convertToDateTimeLocal(dateString) {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Combine the components into the desired format
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    return formattedDate;
}

module.exports = {minDateTime, maxDateTime, convertToDateTimeLocal}