function updateClock() {
    const now = new Date();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    document.getElementById("liveClock").textContent =
        now.toLocaleString("th-TH", options);
}

updateClock();
setInterval(updateClock, 1000);