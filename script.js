// Function to update the countdown timer
function updateCountdown() {
    const endDate = new Date(); // Current date
    endDate.setDate(endDate.getDate() + 7); // Add 7 days to the current date

    const now = new Date();
    const timeLeft = endDate - now;

    // Check if the countdown has expired
    if (timeLeft <= 0) {
        document.getElementById('countdown').innerHTML = 'Offer has expired';
        document.getElementById('claimButton').disabled = true;
    } else {
        const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        document.getElementById('countdown').innerHTML = `${daysLeft} day(s) left to claim offer`;
        document.getElementById('claimButton').disabled = false;
    }
}

// Function to get or set the initial visit date for the user
function getUserInitialVisitDate() {
    const userInitialVisitDate = localStorage.getItem('userInitialVisitDate');
    if (!userInitialVisitDate) {
        const currentDate = new Date();
        localStorage.setItem('userInitialVisitDate', currentDate.toISOString());
        return currentDate;
    }
    return new Date(userInitialVisitDate);
}

// Initial call to set up the countdown
const initialVisitDate = getUserInitialVisitDate();
const currentDate = new Date();
const daysPassed = Math.floor((currentDate - initialVisitDate) / (1000 * 60 * 60 * 24));
if (daysPassed <= 7) {
    // Adjust the end date based on the days passed since the initial visit
    const endDate = new Date(initialVisitDate);
    endDate.setDate(endDate.getDate() + 7 - daysPassed);
    localStorage.setItem('endDate', endDate.toISOString());
}

updateCountdown();

// Periodically update the countdown every second
setInterval(updateCountdown, 1000);
