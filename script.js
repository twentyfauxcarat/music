document.addEventListener("DOMContentLoaded", () => {
    const output = document.getElementById("output");
    const input = document.getElementById("command-input");

    const projects = {
        "Lifted": "Melodic/Progressive House track - an uplifting energetic piece.",
        "Swift API for Polygon": "A Swift-based API for interacting with Polygon blockchain.",
        "Terminal Portfolio": "This interactive portfolio project you're viewing now."
    };

    const commands = {
        "help": "Available commands:\nls - List projects\ncd [project] - View project details\nclear - Clear terminal",
        "ls": Object.keys(projects).join("\n"),
        "clear": function() { output.innerHTML = ""; },
        "cd": function(args) {
            const project = args.join(" ");
            return projects[project] || "Project not found.";
        }
    };

    function executeCommand(command) {
        const args = command.split(" ");
        const cmd = args.shift();
        const result = commands[cmd] instanceof Function ? commands[cmd](args) : commands[cmd];

        output.innerHTML += `\n$ ${command}\n${result || "Command not found. Type 'help' for a list of commands."}\n`;
        output.scrollTop = output.scrollHeight;
    }

    var history = [];
    var index = history.length;

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const command = input.value.trim();
            input.value = "";
            history.push(command);
            index = history.length;
            console.log(history);
            executeCommand(command);
        } else if (event.key === "ArrowUp") {
            index--;
            input.value = getHistory()
        } else if (event.key === "ArrowDown") {
            index++;
            input.value = getHistory();
        }
    });

    function getHistory() {
        console.log(index);
        if (index < 0) {
            index = 0;
        } else if (index >= history.length) {
            index = history.length - 1;
        }
        return history[index] === undefined ? "" : history[index];
    }
});
