# Tasks_I_DontWantToDoBoard

## Description
A project management application to keep track of due dates and progress. This app  utilizes jQuery UI to make it more interactive and user-friendly.

## Original User Story and Acceptace Criteria

### User Story

```
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```

### Acceptance Criteria

```
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```
## Mock-UP

The following animation demonstrates the intended application functionality:

![A user adds three tasks to the task board and changes the state of two of them to in progress and then completion. The user then deletes the two cards in the done column.](./assets/demo.gif)

## Link to Deployed application

* https://bldambtn.github.io/Tasks_I_DontWantToDoBoard/ 

## Credits

### Collaborator(s):

* Jacqlyn McQuade, https://github.com/JacqMcQ, helped with code-reivew, debugging, and assisting with JQuery - dragging, sorting.

* Sherman Burwell, https://github.com/shermanburwell3/, helped with code-reivew, debugging, and assisting with JQuery - dragging, sorting.

### Research Sources:

* Geeks for Geeks. (accessed June 12, 2024) How to add background color to a div in Bootstrap ? Retrieved from https://www.geeksforgeeks.org/how-to-add-background-color-to-a-div-in-bootstrap/

* Bootstrap Documentation. (accessed June 14, 2024) Background. Retrieved from https://getbootstrap.com/docs/5.1/utilities/background/

* Bootstrap Documentation. (accessed June 14, 2024) Colors. Retrieved from https://getbootstrap.com/docs/5.1/utilities/colors/

* jQuery Interface. (accessed June 12, 2024) Draggable. Retrieved from https://jqueryui.com/draggable/#sortable

* jQuery Interface. (accessed June 12, 2024) Droppable. Retrieved from https://api.jqueryui.com/droppable/#options

* Mozilla. (accessed June 14, 2024). HTMLElement: drag event. Mozilla Developer Network. Retrieved from https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event 

* Mozilla. (accessed June 14, 2024). HTMLElement: drop event. Mozilla Developer Network. Retrieved from https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event

* Mozilla. (accessed June 12, 2024). Element: setAttribute() method. Mozilla Developer Network. Retrieved from https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute 

* W3Schools. (accessed June 12, 2024). Bootstrap 5 Background Colors. Retrieved from https://www.w3schools.com/bootstrap5/bootstrap_colors_bg.php

* W3Schools. (accessed June 15, 2024). HTML Drag and Drop API. Retrieved from https://www.w3schools.com/html/html5_draganddrop.asp

* W3Schools. (accessed June 12, 2024). Style backgroundColor Property. Retrieved from https://www.w3schools.com/jsref/prop_style_backgroundcolor.asp

### Source Coude: 

* The code in this project is base on the work/assignment from EdX (https://git.bootcampcontent.com/University-of-Texas-at-Austin/UTA-VIRT-FSF-PT-05-2024-U-LOLC/-/tree/main/05-Third-Party-APIs/02-Challenge?ref_type=heads)

## License
MIT License

Copyright (c) 2024 bldambtn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.