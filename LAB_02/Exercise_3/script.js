let taskId = 0;
let hideMessageTimer = null;

function addTask() {
    const input = document.getElementById("taskInput");
    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.id = "task" + taskId++;

    const date = new Date().toLocaleDateString();

    task.innerHTML = `<span class="num"></span> <strong>${taskName}</strong><br><small>${date}</small>`;

    task.addEventListener("dragstart", drag);

    document.querySelector("#todo .task-list").appendChild(task);
    input.value = "";

    renumberAll();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();

    const id = ev.dataTransfer.getData("text");
    const task = document.getElementById(id);
    const column = ev.currentTarget.querySelector(".task-list");

    column.appendChild(task);

    const message = document.getElementById("message");

    if (ev.currentTarget.id === "completed") {
        task.classList.add("completed");

        const taskName = task.querySelector("strong").textContent;
        message.textContent = `Task "${taskName}" completed successfully`;
        message.classList.add("show");

        // Reset any existing timer
        if (hideMessageTimer) {
            clearTimeout(hideMessageTimer);
        }

        // Auto-hide after 10 seconds
        hideMessageTimer = setTimeout(() => {
            message.textContent = "";
            message.classList.remove("show");
        }, 10000);

    } else {
        task.classList.remove("completed");
        message.textContent = "";
        message.classList.remove("show");

        if (hideMessageTimer) {
            clearTimeout(hideMessageTimer);
        }
    }

    renumberAll();
}

function renumberAll() {
    document.querySelectorAll(".column").forEach(col => {
        const tasks = col.querySelectorAll(".task");
        tasks.forEach((task, index) => {
            task.querySelector(".num").textContent = (index + 1) + ".";
        });
    });
}
