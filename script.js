// Function to set the header image based on the current mode
function setHeaderImage() {
  var element = document.body;
  var header = document.getElementById('header');
  var toggleButton = document.querySelector('.toggle-button');
  var currentImage = toggleButton.querySelector('img');
  var newImageSrc = '';

  if (element.classList.contains('dark-mode')) {
    newImageSrc = "images/bg-desktop-dark.jpg";
    currentImage.src = "images/icon-sun.svg";
  } else {
    newImageSrc = "images/bg-desktop-light.jpg";
    currentImage.src = "images/icon-moon.svg";
  }

  header.style.backgroundImage = 'url(' + newImageSrc + ')';
}

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  setHeaderImage();
  restoreToggleState(); // Restore toggle state when the page is loaded
});

// Function to save the dark mode toggle state
function saveToggleState() {
  var element = document.body;
  var isDarkMode = element.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Function to restore the dark mode toggle state
function restoreToggleState() {
  var isDarkMode = localStorage.getItem('darkMode');
  var element = document.body;
  
  if (isDarkMode === 'true') {
    element.classList.add('dark-mode');
  } else {
    element.classList.remove('dark-mode');
  }

  // Update the header image and toggle button based on the restored state
  setHeaderImage();
  var toggleButton = document.querySelector('.toggle-button');
  var currentImage = toggleButton.querySelector('img');
  var newImageSrc = isDarkMode === 'true' ? "images/icon-sun.svg" : "images/icon-moon.svg";
  currentImage.src = newImageSrc;
}


// Retrieve elements with the close class
var closeBtns = document.getElementsByClassName("close");

// Loop through the elements and attach click event listeners
Array.from(closeBtns).forEach(function(closeBtn) {
  closeBtn.addEventListener("click", function() {
    var listItem = this.parentElement;
    listItem.remove();
    updateTaskCount();

    // Remove item from localStorage
    var itemText = listItem.firstChild.textContent;
    removeFromLocalStorage(itemText);
  });
});

// Add double-click event listener to delete item
var listItems = document.querySelectorAll('#todo-list li');
listItems.forEach(function(item) {
  item.addEventListener("dblclick", function() {
    this.remove();
    updateTaskCount();

    // Remove item from localStorage
    var itemText = this.textContent;
    removeFromLocalStorage(itemText);
  });
});


// Function to handle the double-click event on the parent element
function createParentDoubleClickHandler(parentElement) {
  return function() {
    parentElement.remove();
    updateTaskCount();

    // Remove item from localStorage
    var itemText = parentElement.textContent;
    removeFromLocalStorage(itemText);
  };
}

// Checked symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    updateTaskCount();
    updateLocalStorage();
  }
}, false);

// Using enter to accept input
var input = document.getElementById('newInput');
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    var inputValue = input.value.trim();
    if (inputValue !== '') {
      newElement(inputValue);
      input.value = ''; // Clear the input field
      updateLocalStorage();
    }
  }
});

// Add a new item to the list when "Add" is clicked
var addButton = document.getElementById('add-button');
addButton.addEventListener('click', function() {
  var inputValue = input.value.trim();
  if (inputValue === '') {
    alert("Enter a task!");
  } else {
    newElement(inputValue);
    input.value = ''; // Clear the input field
    updateLocalStorage();
  }
});

// Add a new element to the list
function newElement(inputValue) {
  var todoList = document.getElementById('todo-list');

  // Remove x's from all items
  var items = todoList.getElementsByTagName('li');
  for (var i = 0; i < items.length; ++i) {
    var closeBtn = items[i].getElementsByClassName('close')[0];
    if (closeBtn) {
      closeBtn.remove();
    }
  }

  // Add new item
  var li = document.createElement("li");
  li.setAttribute('draggable', true);
  var t = document.createTextNode(inputValue);
  li.appendChild(t);

   // Add close button
   var span = document.createElement("span");
   span.className = "close";
   span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;
   li.appendChild(span);
 
   // Add click event listener to close button
   span.addEventListener('click', function(event) {
     event.stopPropagation();
     var li = this.parentElement;
     li.remove();
     updateTaskCount();
     updateLocalStorage();
     var itemText = li.firstChild.textContent;
     removeFromLocalStorage(itemText);
   });




// Get the input element and button container
const input = document.getElementById('newInput');
const buttonContainer = document.getElementById('button-container');

// Function to add a new item
function addItem() {
  const inputValue = input.value.trim();

  if (inputValue !== '') {
    // Create a new list item
    const newItem = document.createElement('li');
    newItem.textContent = inputValue;

    // Insert the new item before the button container
    const list = document.getElementById('todo-list');
    list.insertBefore(newItem, buttonContainer);

    // Clear the input value
    input.value = '';
  }
}






// Event listener for the add button
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addItem);

  // Add click event listener to close button
  span.addEventListener('click', function(event) {
    event.stopPropagation();
    var li = this.parentElement;
    li.remove();
    updateTaskCount();
    updateLocalStorage();
  });


   // Add event listener to the list item to show the close button
   li.addEventListener('mouseenter', function() {
    span.style.visibility = 'visible';
  });

  // Add event listener to the list item to hide the close button
  li.addEventListener('mouseleave', function() {
    span.style.visibility = 'hidden';
  });

  todoList.appendChild(li);

  updateTaskCount(); // Update task count

  handleNewListItem(li);
  return li;
}

// Add double-click event listener to delete item
var listContainer = document.getElementById('todo-list');
listContainer.addEventListener('dblclick', function(event) {
  if (event.target.tagName === 'LI') {
    var listItem = event.target;
    listItem.remove();
    updateTaskCount();

    // Remove item from localStorage
    var itemText = listItem.textContent;
    removeFromLocalStorage(itemText);
  }
});




// Initialize the todo list from localStorage
initializeTodoList();

// Function to initialize the todo list from localStorage
function initializeTodoList() {
  var storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList) {
    var todoListItems = JSON.parse(storedTodoList);
    todoListItems.forEach(function(item) {
      newElement(item);
    });
  }
}

// Function to add an item to localStorage
function addToLocalStorage(item) {
  var storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList) {
    var todoListItems = JSON.parse(storedTodoList);
    if (!todoListItems.includes(item)) {
      todoListItems.push(item);
      localStorage.setItem('todoList', JSON.stringify(todoListItems));
    }
  } else {
    var todoListItems = [item];
    localStorage.setItem('todoList', JSON.stringify(todoListItems));
  }
}

// Function to remove an item from localStorage
function removeFromLocalStorage(item) {
  var storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList) {
    var todoListItems = JSON.parse(storedTodoList);
    var index = todoListItems.indexOf(item);
    if (index > -1) {
      todoListItems.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(todoListItems));
    }
  }
}

// Function to update localStorage with current todo list items
function updateLocalStorage() {
  var todoListItems = [];
  var todoList = document.getElementById('todo-list');
  var items = todoList.getElementsByTagName('li');
  for (var i = 0; i < items.length; ++i) {
    if (!items[i].classList.contains('checked')) {
      todoListItems.push(items[i].textContent);
    }
  }
  localStorage.setItem('todoList', JSON.stringify(todoListItems));
}

// Toggle-button functionalities
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  saveToggleState();
  
  // Changing image on click
  var toggleButton = document.querySelector('.toggle-button');
  var currentImage = toggleButton.querySelector('img');
  var newImageSrc = '';

  if (element.classList.contains('dark-mode')) {
    newImageSrc = "images/icon-sun.svg";
  } else {
    newImageSrc = "images/icon-moon.svg";
  }

  currentImage.src = newImageSrc;

  // Button container color change
  var buttons = document.querySelectorAll('.button-container button');
  buttons.forEach(function(button) {
    button.classList.toggle('light-mode');
  });

  // Header image change
  var header = document.getElementById('header');

  if (element.classList.contains('dark-mode')) {
    header.style.backgroundImage = 'url(images/bg-desktop-dark.jpg)';
  } else {
    header.style.backgroundImage = 'url(images/bg-desktop-light.jpg)';
  }
}

// TaskCount functionalities
function updateTaskCount() {
  var uncheckedItems = document.querySelectorAll('#todo-list li:not(.checked)');
  var taskCountElement = document.getElementById('task-count');
  taskCountElement.textContent = uncheckedItems.length + " item(s) left";
}

// Call the function initially to display the initial count
updateTaskCount();

// Add event listener to the list container
var listContainer = document.getElementById('todo-list');
listContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    var listItem = event.target.parentElement;
    listItem.remove();
    updateTaskCount(); // Call the function to update task count

    // Remove item from localStorage
    var itemText = listItem.firstChild.textContent;
    removeFromLocalStorage(itemText);
  } else if (event.target.tagName === 'SPAN') {
    var listItem = event.target.parentElement;
    listItem.classList.toggle('checked');
    updateTaskCount(); 
    updateLocalStorage();
  }
});

// Function to remove all completed items from the list and localStorage
function clearCompletedItems() {
  var completedItems = document.querySelectorAll('.checked');
  completedItems.forEach(function(item) {
    item.remove();
  });
  updateTaskCount();

  // Remove completed items from localStorage
  var storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList) {
    var todoListItems = JSON.parse(storedTodoList);
    todoListItems = todoListItems.filter(function(item) {
      return !completedItems.some(function(completedItem) {
        return completedItem.firstChild.textContent === item;
      });
    });
    localStorage.setItem('todoList', JSON.stringify(todoListItems));
  }
}

// Get the reference to the "Clear Completed" button
var clearButton = document.getElementById('clear-completed-button');

// Add an event listener to the button
clearButton.addEventListener('click', clearCompletedItems);

// Function to show only completed items
function showCompletedItems() {
  var listItems = document.querySelectorAll('#todo-list li');
  listItems.forEach(function(item) {
    if (!item.classList.contains('checked')) {
      item.style.display = 'none';
    } else {
      item.style.display = '';
    }
  });
}

// Get the reference to the "Completed" button
var completedButton = document.getElementById('completed-button');

// Add an event listener to the button
completedButton.addEventListener('click', showCompletedItems);

// Function to show only active items
function showActiveItems() {
  var listItems = document.querySelectorAll('#todo-list li');
  listItems.forEach(function(item) {
    if (!item.classList.contains('checked')) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

// Get the reference to the "Active" button
var activeButton = document.getElementById('active-button');

// Add an event listener to the button
activeButton.addEventListener('click', showActiveItems);

// Function to show all items
function showAllItems() {
  var listItems = document.querySelectorAll('#todo-list li');
  listItems.forEach(function(item) {
    item.style.display = '';
  });
}

// Get the reference to the "All" button
var allButton = document.getElementById('all-button');
allButton.addEventListener('click', showAllItems);

// Drag and drop functionality

var draggedItem = null;

function dragStart(event) {
  draggedItem = this;
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.innerHTML);
  this.classList.add('dragging');
}

function dragEnter(event) {
  event.preventDefault();
  this.classList.add('dragover');
}

function dragOver(event) {
  event.preventDefault();
  this.classList.add('dragover');
}

function dragLeave(event) {
  this.classList.remove('dragover');
}

function drop(event) {
  event.preventDefault();
  if (this !== draggedItem) {
    var temp = this.innerHTML;
    this.innerHTML = draggedItem.innerHTML;
    draggedItem.innerHTML = temp;

    // Handle the checked state of the dragged and dropped items
    var draggedItemChecked = draggedItem.classList.contains('checked');
    var droppedItemChecked = this.classList.contains('checked');
    draggedItem.classList.toggle('checked', droppedItemChecked);
    this.classList.toggle('checked', draggedItemChecked);
  }
  this.classList.remove('dragover');
  updateTaskCount();
  updateLocalStorage();
}

function dragEnd(event) {
  this.classList.remove('dragging');
  updateTaskCount();
  updateLocalStorage();
}

function addDragListeners(item) {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragenter', dragEnter);
  item.addEventListener('dragover', dragOver);
  item.addEventListener('dragleave', dragLeave);
  item.addEventListener('drop', drop);
  item.addEventListener('dragend', dragEnd);
}

// Add drag and drop listeners to existing list items
listItems.forEach(function(item) {
  addDragListeners(item);
});

// Function to handle adding drag and drop listeners to new list items
function handleNewListItem(listItem) {
  addDragListeners(listItem);
}
