


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

// Creating default projects
addProjectdefault("Goals");
addProjectdefault("This Month");



export { Todo,Project,projects }


/*
import './styles.css';
//import { Todo, Project, projects } from './create.js';

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

// Creating default projects
addProjectdefault("Goals");
addProjectdefault("This Month");


//export {Todo,Project,projects}




const addpro = document.querySelector('.addProjects');
const addtod = document.querySelector('.addTasks');

const proadd = document.getElementById("pro-add");
const taskadd = document.getElementById("task-add");

const proDialog = document.querySelector('.pro-dialog');
const taskDialog = document.querySelector('.task-dialog');



addpro.addEventListener("click", () => {
    proDialog.showModal();
});

addtod.addEventListener("click", () => {
    taskDialog.showModal();
});



proadd.addEventListener("click", () => {
    let name = document.getElementById("projectName").value; // Assuming there's an input with id="projectName"
    let newProject = new Project(name);
    projects.push(newProject);

    proDialog.style.display = 'none'; // Close dialog

    displayProjects();
});

taskadd.addEventListener("click", () => {
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
    taskDialog.style.display = 'none'; // Close dialog
});


// Function to display all projects in the sidebar
function displayProjects() {
    const projectList = document.querySelector('.dropdown-content');

    // Clear the list before adding new elements
    projectList.innerHTML = '';

    // Loop through all the projects and add them to the project list
    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.name;
        projectList.appendChild(listItem);
    });
}

// Function to display tasks for a selected project
function displayTasks(project) {
    const taskList = document.querySelector('.dropdown2-content');

    // Clear the list before adding new tasks
    taskList.innerHTML = '';

    // Loop through all the tasks of the selected project and add them to the task list
    project.todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.title;  // Display task title

        taskList.appendChild(listItem);
    });
}




displayProjects();

*/