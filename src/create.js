class Todo {
    constructor(title, description, dueDate, priority, notes, projectName ,checkbox) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.projectName = projectName;
        this.checkbox = checkbox // Storing the project name in the Todo
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.todos = []; // Each project has its own list of todos
    }

    addTodo(todo) {
        this.todos.push(todo); // Add todo to the project’s todo list
    }
}

let projects = [];

function addProjectdefault(name) {
    let newProject = new Project(name);
    projects.push(newProject);
}
function addProject() {
    let name = document.getElementById("projectName").value; // Assuming there's an input with id="projectName"
    let newProject = new Project(name);
    projects.push(newProject);
}

function addTodo() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;
    let notes = document.getElementById('notes').value;
    let projectName = document.getElementById('project').value;
    let checkbox = document.getElementById('checkbox').value;

    // Create a new todo
    let newTodo = new Todo(title, description, dueDate, priority, notes, projectName);

    // Find the project that matches the project name
    let project = projects.find(proj => proj.name === projectName);
    
    if (project) {
        project.addTodo(newTodo); // Add the todo to the project
    } else {
        console.error(`Project "${projectName}" not found!`);
    }
}

// Creating default projects
addProjectdefault("Goals");
addProject("This Month");

// Example usage: add a todo to a project
addTodo();
