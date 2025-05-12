document.addEventListener("DOMContentLoaded", () => {
    const todos = document.querySelectorAll(".todo");
    
    // Load saved todos from localStorage
    todos.forEach((todo, index) => {
        const input = todo.querySelector(".todo_value");
        const checkbox = todo.querySelector(".todo_checkbox");

        // Load value
        const savedText = localStorage.getItem(`todo_${index}_text`);
        if (savedText) input.value = savedText;

        // Load checked state
        const savedCheck = localStorage.getItem(`todo_${index}_checked`);
        if (savedCheck === "true") {
            checkbox.checked = true;
            todo.style.textDecoration = "line-through";
        }

        // Save changes
        input.addEventListener("input", () => {
            localStorage.setItem(`todo_${index}_text`, input.value);
        });

        checkbox.addEventListener("change", () => {
            localStorage.setItem(`todo_${index}_checked`, checkbox.checked);
            todo.style.textDecoration = checkbox.checked ? "line-through" : "none";
        });
    });

    // Clear button
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear All";
    clearButton.style.margin = "20px auto";
    clearButton.style.display = "block";
    clearButton.style.padding = "10px 20px";
    clearButton.style.fontSize = "16px";
    clearButton.style.cursor = "pointer";
    document.body.appendChild(clearButton);

    clearButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all tasks?")) {
            todos.forEach((todo, index) => {
                const input = todo.querySelector(".todo_value");
                const checkbox = todo.querySelector(".todo_checkbox");

                input.value = "";
                checkbox.checked = false;
                todo.style.textDecoration = "none";

                localStorage.removeItem(`todo_${index}_text`);
                localStorage.removeItem(`todo_${index}_checked`);
            });
        }
    });
});
