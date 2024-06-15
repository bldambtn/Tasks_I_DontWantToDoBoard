// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("task")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
  //Get the current timestamp
  const timestamp = new Date().getTime();

  // Increment the task ID counter
  nextId++;

  // Save the updated task ID counter to localStorage
  localStorage.setItem("nextId", JSON.stringify(nextId));

  // Return the task ID as a string
  return "task-" + timestamp + "-" + nextId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // Create the Card
  const taskCard = $("<div>").addClass("card task-card draggable my-3").attr("data-task-id", task.id);

  // Create the Header
  const taskCardTitle = $("<header>").addClass("card-header h4").text(task.taskTitle);

  // Create the Body
  const taskCardBody = $("<div>").addClass("card-body");

  // Create the Description and Due Date
  const taskCardDescription = $("<p>").addClass("card-text").text(task.description);
  const taskCardDueDate = $("<p>").addClass("card-text").text(task.taskDueDate);

  const deleteButton = $("<button>").addClass("btn btn-danger delete").text("Delete").attr("data-task-id", task.id);

  //Append the Description and Due Date to the body
  taskCardBody.append(taskCardDescription, taskCardDueDate, deleteButton);

  //Append the body to the card
  taskCard.append(taskCardTitle, taskCardBody);

  // Set the background color based on the taskDueDate using Day.js
  const today = dayjs().startOf("day"); // Set time to the beginning of the day
  const dueDate = dayjs(task.taskDueDate).startOf("day"); // Set time to the beginning of the day

  if (dueDate.isBefore(today, "day")) {
    taskCard.addClass("bg-danger bg-gradient text-white"); // Past due tasks
    deleteButton.addClass("btn btn-outline-light text-white");
  } else {
    const daysDiff = dueDate.diff(today, "day");

    if (daysDiff <= 0) {
      taskCard.addClass("bg-warning bg-gradient text-white"); // Tasks due today
    } else {
      taskCard.addClass("bg-light bg-gradient text-black"); // Tasks due in the future
    }
  }

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const todoList = $("#todo-cards");
  todoList.empty();

  const inProgressList = $("#in-progress-cards");
  inProgressList.empty();

  const doneList = $("#done-cards");
  doneList.empty();

  // Render a new card for each added task and put in correct lane
  for (let i = 0; i < taskList.length; i++) {
    const todo = taskList[i];
    const taskCard = createTaskCard(todo);

    if (todo.status === "todo") {
      $("#todo-cards").append(taskCard);
    } else if (todo.status === "in-progress") {
      $("#in-progress-cards").append(taskCard);
    } else if (todo.status === "done") {
      $("#done-cards").append(taskCard);
    }
  }

  $(".task-card").draggable({
    opacity: 0.7,
    revert: 'invalid',
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass("ui-draggable")
        ? $(e.target)
        : $(e.target).closest(".ui-draggable");
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // Prevent the default behavior
  event.preventDefault();

  const taskTitle = document.getElementById("title").value;
  const taskDueDate = document.getElementById("datepicker").value;
  const description = document.getElementById("taskDescription").value;

  if (taskTitle === "" || taskDueDate === "" || description === "") {
    // Prevent form submission
    event.preventDefault();
  } else {
    const tasks = {
      id: generateTaskId(),
      taskTitle: taskTitle,
      taskDueDate: taskDueDate,
      description: description,
      status: "todo",
    };

    // Check if the task with the same ID already exists in taskList
    const existingTaskIndex = taskList.findIndex(
      (task) => task.id === tasks.id
    );

    if (existingTaskIndex !== -1) {
      // Update the existing task if found
      taskList[existingTaskIndex] = tasks;
    } else {
      // Add the new task to taskList
      taskList.push(tasks);
    }

    // createTaskCard(task);
    renderTaskList();
  }

  // Clear input fields
  $('input[type="text"]').val("");
  $("#datepicker").val("");
  $('input[type="taskDescription"]').val("");
}
 
// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // Get the task ID from the delete button
  const taskId = $(event.target).attr("id");

  // Remove the task from taskList array
  taskList = taskList.filter((task) => task.id !== taskId);

  // Remove the task card from the UI
  $(event.target).closest(".card").remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable.attr("data-task-id");
  const newStatus = $(this).attr("id").replace("-cards", "");

  // Update the status of the task in taskList
  const taskIndex = taskList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    taskList[taskIndex].status = newStatus;
    renderTaskList();
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Submit event on the form
  $("#taskForm").on("submit", handleAddTask);

  //date picker for add task
  $(function () {
    $("#datepicker").datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });  

  $("#todo-cards, #in-progress-cards, #done-cards").droppable({
  accept: ".draggable",
  drop: function (event, ui) {
    const taskId = ui.draggable.attr("data-task-id");
    const newStatus = $(this).attr("id").replace("-cards", "");

    // Update the status of the task in taskList
    const taskIndex = taskList.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      taskList[taskIndex].status = newStatus;
      renderTaskList();
    }
  }
});

  // Delete Task
  $("#todo-cards").on("click", ".delete", handleDeleteTask); //neds a more unique id instead of #todo-cards or will duplicate/add tasks over and over
});