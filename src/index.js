import './styles.css';
import { Todo, Project, projects } from './create.js';



let content = document.querySelector('.content');

const addpro = document.querySelector('.addProjects');
const addtod = document.querySelector('.addTasks');

const proadd = document.querySelector(".pro-add");
const taskadd = document.querySelector(".task-add");

const proDialog = document.querySelector('.pro-dialog');
const taskDialog = document.querySelector('.task-dialog');



addpro.addEventListener("click", () => {
    proDialog.showModal();
});

addtod.addEventListener("click", () => {
    taskDialog.showModal();
});



proadd.addEventListener("click", () => {
    event.preventDefault();
    let name = document.getElementById("projectName").value; 
    if (!name) {
        alert("Project name cannot be empty!");
        return;
    }// Assuming there's an input with id="projectName"
    let newProject = new Project(name);
    projects.push(newProject);
    proDialog.close();  // Close dialog

    displayProjects();
});

taskadd.addEventListener("click", () => {
    event.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;
    let notes = document.getElementById('notes').value;
    let projectName = document.getElementById('project').value;

    // Create a new todo
    let newTodo = new Todo(title, description, dueDate, priority, notes, projectName);

    // Find the project that matches the project name
    let project = projects.find(proj => proj.name === projectName);
    
    if (project) {
        project.addTodo(newTodo); // Add the todo to the project
    } else {
        console.error(`Project "${projectName}" not found!`);
    }
    taskDialog.close(); // Close dialog
    displayTasks(project);
    
});




// Function to display tasks for a selected project
function displayTasks(project) {
    const taskList = document.querySelector('.dropdown2-content');

    // Clear the list before adding new tasks
    taskList.innerHTML = '';

    // Loop through all the tasks of the selected project and add them to the task list
    project.todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.title; 
        
        listItem.addEventListener('click', () => {
            displayTasksInfo(todo);
        });

        taskList.appendChild(listItem);
    });
}

function displayTasksInfo(todo) {
   
   
    content.innerHTML = '';
   
    const taskNameHeading = document.createElement('h1');
    taskNameHeading.textContent = `Task: ${todo.title}`;
   content.appendChild(taskNameHeading);

   const todoList = document.createElement('ul');

    const todoDescription = document.createElement('li');
    todoDescription.textContent = `Description : ${todo.description};` // Display the task title
    todoList.appendChild(todoDescription);


    const todoDueDate = document.createElement('li');
    todoDueDate.textContent = `Due Date :  ${todo.dueDate};` // Display the task title
    todoList.appendChild(todoDueDate);



    const todoPriority = document.createElement('li');
    todoPriority.textContent = `Priority :  ${todo.priority};` // Display the task title
    todoList.appendChild(todoPriority);


    const todoNotes = document.createElement('li');
    todoNotes.textContent = `Notes :  ${todo.notes};` // Display the task title
    todoList.appendChild(todoNotes);

    content.appendChild(todoList);

    const edittask = document.createElement('button');
    edittask.textContent = 'Edit Task';
    edittask.addEventListener('click', () => {
        editTask(todo);
    });
    content.appendChild(edittask);

    const deletetask = document.createElement('button');
    deletetask.textContent = 'Delete Task';
    deletetask.addEventListener('click', () => {
        deleteTask(todo);
        
    });
    content.appendChild(deletetask);

    
}

function displayProjects() {
    const projectList = document.querySelector('.dropdown-content');

    // Clear the list before adding new elements
    projectList.innerHTML = '';

    // Loop through all the projects and add them to the project list
    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.name;

        listItem.addEventListener('click', () => {
            displayProjectInfo(project);
        });

        projectList.appendChild(listItem);
    });
}

function displayProjectInfo(project){

   
    content.innerHTML = '';

   
    const projectNameHeading = document.createElement('h1');
    projectNameHeading.textContent = `Project: ${project.name}`;
   content.appendChild(projectNameHeading);

    // Optionally, display the tasks (todos) for this project
    if (project.todos.length > 0) {
        const todoList = document.createElement('ul');

        project.todos.forEach(todo => {
            const todoTitle = document.createElement('li');
            todoTitle.textContent = todo.title; 

            todoTitle.addEventListener('click', () => {
                displayTasksInfo(todo);
            });

            todoList.appendChild(todoTitle);
        });
        
        content.appendChild(todoList);

    } else {
        const noTasksMessage = document.createElement('p');
        noTasksMessage.textContent = "No tasks for this project.";
        content.appendChild(noTasksMessage);
    }

    const addtask = document.createElement('button');
    addtask.textContent = 'Add Task';
    addtask.addEventListener('click', () => {
        taskDialog.showModal();
    });
    content.appendChild(addtask);

}

function editTask(todo) {
    // Show the dialog with current task info pre-filled
    const taskDialog = document.querySelector('.task-dialog');
    document.getElementById("title").value = todo.title;
    document.getElementById("description").value = todo.description;
    document.getElementById("dueDate").value = todo.dueDate;
    document.getElementById("priority").value = todo.priority;
    document.getElementById("notes").value = todo.notes;
    
    taskDialog.showModal();

    // Handle form submission
    const taskadd = document.querySelector(".task-add");
    taskadd.addEventListener('click', () => {
        // Update the task properties based on form values
        todo.title = document.getElementById("title").value;
        todo.description = document.getElementById("description").value;
        todo.dueDate = document.getElementById("dueDate").value;
        todo.priority = document.getElementById("priority").value;
        todo.notes = document.getElementById('notes').value;

        taskDialog.close(); // Close the dialog after editing

        displayTasksInfo(todo); // Refresh task display with updated info
    }, { once: true }); // The { once: true } ensures the listener is only executed once
}

function deleteTask(todo) {
    // Find the project that contains this todo
    let project = projects.find(proj => proj.todos.includes(todo));

    if (project) {
        // Find the index of the task in the project's todos array
        const taskIndex = project.todos.indexOf(todo);
        
        if (taskIndex !== -1) {
            project.todos.splice(taskIndex, 1); // Remove the task
            
            // Refresh the task list
            displayTasks(project); 

            // Instead of just showing a message, we can bring the user back to the project view
            content.innerHTML = ''; // Clear the content first
            displayProjectInfo(project); // Display the updated project info
        }
    } else {
        console.error('Task not found in any project.');
    }
}


displayProjects();
  

