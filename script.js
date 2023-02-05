// Get current day element and set its text
const currentDay = document.querySelector("#current-day");
currentDay.textContent = moment().format("dddd, MMMM Do YYYY");

// Get time blocks container element
const timeBlocksContainer = document.querySelector("#time-blocks-container");

// Loop through standard business hours
for (let hour = 9;
    hour <= 17;
    hour++
) {
    // Create time block element
    const timeBlock = document.createElement("div");
    timeBlock.classList.add("time-block");

    // Create hour element
    const hourEl = document.createElement("div");
    hourEl.classList.add("hour");
    hourEl.textContent = `${hour}:00`;
    timeBlock.appendChild(hourEl);

    // Create event element
    const event = document.createElement("div");
    event.classList.add("event");
    timeBlock.appendChild(event);

    // Create text area element
    const textArea = document.createElement("textarea");
    textArea.classList.add("text-area");
    event.appendChild(textArea);

    // Get saved event from local storage
    const savedEvent = localStorage.getItem(hour);

    // Check if there's a saved event for the current hour
    if (savedEvent) {
        // Set saved event as a task with checkbox above text field
        const task = document.createElement("p");
        task.classList.add("task");
        task.textContent = savedEvent;      
        event.prependChild(task);
    }

    // Create save button element
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("save-btn");
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", function () {
        // Save event to local storage
        localStorage.setItem(hour, textArea.value);
    });
    event.appendChild(saveBtn);

    // Color-code time block based on past, present, and future
    const currentHour = moment().hour();
    if (hour < currentHour) {
        timeBlock.classList.add("past");
    } else if (hour === currentHour) {
        timeBlock.classList.add("present");
    } else {
        timeBlock.classList.add("future");
    }

    // Append time block to time blocks container
    timeBlocksContainer.appendChild(timeBlock);
}  