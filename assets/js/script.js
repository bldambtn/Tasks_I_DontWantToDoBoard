// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("task")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
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

// Function to create a task card
function createTaskCard(task) {
  // Create the Card
  const taskCard = $("<div>")
    .addClass("card task-card draggable my-3 ui-draggable") // Add the ui-draggable class here
    .attr("data-task-id", task.id);

  // Create the Header
  const taskCardTitle = $("<header>")
    .addClass("card-header h4")
    .text(task.taskTitle);

  // Create the Body
  const taskCardBody = $("<div>").addClass("card-body");

  // Create the Description and Due Date
  const taskCardDescription = $("<p>")
    .addClass("card-text")
    .text(task.description);
  const taskCardDueDate = $("<p>").addClass("card-text").text(task.datepicker);

  const deleteButton = $("<button>")
    .addClass("btn btn-danger delete")
    .text("Delete")
    .attr("data-task-id", task.id);

  //Append the Description and Due Date to the body
  taskCardBody.append(taskCardDescription, taskCardDueDate, deleteButton);

  //Append the body to the card
  taskCard.append(taskCardTitle, taskCardBody);

  // Set the background color based on datepicker using Day.js
  const today = dayjs().startOf("day"); // Set time to the beginning of the day
  const dueDate = dayjs(task.datepicker).startOf("day"); // Set time to the beginning of the day

  if (task.status !== "done") {
    if (dueDate.isBefore(today, "day")) {
      taskCard.addClass("bg-danger bg-gradient text-white"); // Past due tasks
      deleteButton.addClass("btn btn-outline-light text-white");
    } else {
      const daysDiff = dueDate.diff(today, "day");

      if (daysDiff === 0) {
        taskCard.addClass("bg-warning bg-gradient text-white"); // Tasks due today
      } else if (daysDiff > 0) {
        taskCard.addClass("bg-light bg-gradient text-black"); // Tasks due in the future
      }
    }
  }

  return taskCard;
}

// Function to render the task list and make cards draggable
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

  $(function () {
    $("#sortable").sortable({
      revert: true,
    });
    $("#draggable").draggable({
      connectToSortable: "#sortable",
      helper: "clone",
      revert: "invalid",
    });
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  // Prevent the default behavior
  event.preventDefault();

  const taskTitle = document.getElementById("title").value;
  const datepicker = document.getElementById("datepicker").value;
  const description = document.getElementById("taskDescription").value;

  if (taskTitle === "" || datepicker === "" || description === "") {
    // Prevent form submission
    event.preventDefault();
  } else {
    const tasks = {
      id: generateTaskId(),
      taskTitle: taskTitle,
      datepicker: datepicker,
      description: description,
      status: "todo",
    };

    taskList.push(tasks);

    // Save the updated task list to localStorage
    localStorage.setItem("task", JSON.stringify(taskList));

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
  const taskId = $(event.target).attr("data-task-id");

  // Remove the task from taskList array
  taskList = taskList.filter((task) => task.id !== taskId);

  // Save the updated task list to localStorage
  localStorage.setItem("task", JSON.stringify(taskList));

  // Remove the task card from the UI
  $(event.target).closest(".card").remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.item.attr("data-task-id");
  let newStatus;

  // Determine the new status based on the target lane
  if ($(event.target).is("#todo-cards")) {
    newStatus = "todo";
  } else if ($(event.target).is("#in-progress-cards")) {
    newStatus = "in-progress";
  } else if ($(event.target).is("#done-cards")) {
    newStatus = "done";
  }

  // Update the status of the task in taskList
  const taskIndex = taskList.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    taskList[taskIndex].status = newStatus;

    // Save the updated task list back to Local Storage
    localStorage.setItem("task", JSON.stringify(taskList));

    renderTaskList(); // Update the UI with the new task statuses
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  // Render the task list on page load
  renderTaskList();

  // Submit event on the form
  $("#taskForm").on("submit", handleAddTask);

  // Date picker for adding a task
  $(function () {
    $("#datepicker").datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });

  // Make lanes droppable
  $(function () {
    $("#todo-cards, #in-progress-cards, #done-cards")
      .sortable({
        connectWith: "#todo-cards, #in-progress-cards, #done-cards",
        opacity: 0.7,
        receive: function (event, ui) {
          handleDrop(event, ui); // Call handleDrop function when a task is dropped
        },
      })
      .disableSelection();
  });

  // Delete task
  $(document).on("click", ".delete", handleDeleteTask);
});