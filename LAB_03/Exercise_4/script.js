let activityLog = [];
let clickCount = 0;
const CLICK_THRESHOLD = 5;

const logTable = document.getElementById("logTable");
const warning = document.getElementById("warning");

/* Utility function to log activity */
function logActivity(event, phase) {
    const activity = {
        type: event.type,
        target: event.target.tagName,
        key: event.key || "-",
        phase: phase,
        time: new Date().toLocaleTimeString()
    };

    activityLog.push(activity);
    displayLog();

    // Suspicious activity check
    if (event.type === "click") {
        clickCount++;
        if (clickCount > CLICK_THRESHOLD) {
            warning.textContent = "⚠ Suspicious activity detected: Too many clicks!";
        }
    }
}

/* Display log dynamically */
function displayLog() {
    logTable.innerHTML = "";

    activityLog.forEach((log, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${log.type}</td>
                <td>${log.target}</td>
                <td>${log.key}</td>
                <td>${log.phase}</td>
                <td>${log.time}</td>
            </tr>
        `;
        logTable.innerHTML += row;
    });
}

/* Event listeners – Capturing phase */
document.addEventListener("click", e => logActivity(e, "Capturing"), true);
document.addEventListener("keydown", e => logActivity(e, "Capturing"), true);
document.addEventListener("focus", e => logActivity(e, "Capturing"), true);

/* Event listeners – Bubbling phase */
document.addEventListener("click", e => logActivity(e, "Bubbling"), false);
document.addEventListener("keydown", e => logActivity(e, "Bubbling"), false);
document.addEventListener("focus", e => logActivity(e, "Bubbling"), false);

/* Reset button */
document.getElementById("resetBtn").addEventListener("click", () => {
    activityLog = [];
    clickCount = 0;
    warning.textContent = "";
    displayLog();
});

/* Export button */
document.getElementById("exportBtn").addEventListener("click", () => {
    let text = "User Activity Log:\n\n";
    activityLog.forEach((log, i) => {
        text += `${i + 1}. ${log.type} on ${log.target} | Key: ${log.key} | Phase: ${log.phase} | Time: ${log.time}\n`;
    });
    alert(text);
});
