const currentTime = document.querySelector("#currentTime");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");


window.addEventListener("DOMContentLoaded", (event) => {
    dropDownMenu(1, 12, setHours); // Adding Hours, Minutes, Seconds in DropDown Menu
    dropDownMenu(0, 59, setMinutes); // -""-
    dropDownMenu(0, 59, setSeconds); // -""-

    setInterval(getCurrentTime, 1000); //calling getCurrentTime for 1sec internal
});

// function to populate Hours, Minutes, Seconds in DropDown Menu
function dropDownMenu(start, end, element) {
    for (let i = start; i <= end; i++) {
        const dropDown = document.createElement("option");
        dropDown.value = i < 10 ? "0" + i : i;
        dropDown.innerHTML = i < 10 ? "0" + i : i;
        element.appendChild(dropDown);
    }
}

// function to fetch current time
function getCurrentTime() {
    let time = new Date();
    time = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
    currentTime.innerHTML = time;
    return time;
}