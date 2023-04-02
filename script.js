const currentTime = document.querySelector("#currentTime");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmBtn = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#displayContent");

window.addEventListener("DOMContentLoaded", (event) => {
    dropDownMenu(1, 12, setHours); // Adding Hours, Minutes, Seconds in DropDown Menu
    dropDownMenu(0, 59, setMinutes); // -""-
    dropDownMenu(0, 59, setSeconds); // -""-

    setInterval(getCurrentTime, 1000); //calling getCurrentTime for 1sec internal
    fetchAlarm();
});

// Event Listener added to Set Alarm Button
setAlarmBtn.addEventListener("click", getInput);

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

function getInput(e) {
    e.preventDefault();
    let hours = setHours.value;
    let minutes = setMinutes.value;
    let seconds = setSeconds.value;
    let amPm = setAmPm.value;
    if(hours == 'Hours' || minutes == 'Minutes' || seconds == 'Seconds' || amPm == 'AM/PM'){
        alert('Please set correct time!!!');
        return;
    }

    const alarmTime = convertToTime(hours, minutes, seconds, amPm);
    setAlarm(alarmTime);
}


// Converting time to 24 hour format
function convertToTime(hour, minute, second, amPm) {
    return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
}


function setAlarm(time, fetching = false) {
    const alarm = setInterval(() => {
        if (time === getCurrentTime()) {
            alert("Alarm Ringing...");
        }
    }, 500);

    addAlarmToDom(time, alarm);
    if (!fetching) {
        saveAlarm(time);
    }
}

// save alarm to local storage
function saveAlarm(time) {
    const alarms = checkAlarams();

    alarms.push(time);
    localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Alarms set by user Dislayed in HTML
function addAlarmToDom(time, intervalId) {
    const alarm = document.createElement("ul");
    alarm.innerHTML = `
             <li>
                <span class="time">${time}</span>
                <i class="fa fa-trash-o btn delete-alarm" data-id=${intervalId}></i>
              </li>
                `;
    const deleteButton = alarm.querySelector(".delete-alarm");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));

    alarmContainer.prepend(alarm);
}

// Is alarms saved in Local Storage?
function checkAlarams() {
    let alarms = [];
    const isPresent = localStorage.getItem("alarms");
    if (isPresent) alarms = JSON.parse(isPresent);

    return alarms;
}

function deleteAlarm(event, time, intervalId) {
    const self = event.target;

    clearInterval(intervalId);

    const alarm = self.parentElement;
    deleteAlarmFromLocal(time);
    alarm.remove();
}

function deleteAlarmFromLocal(time) {
    const alarms = checkAlarams();

    const index = alarms.indexOf(time);
    alarms.splice(index, 1);
    localStorage.setItem("alarms", JSON.stringify(alarms));
}

// Fetching alarms from local storage
function fetchAlarm() {
    const alarms = checkAlarams();

    alarms.forEach((time) => {
        setAlarm(time, true);
    });
}