// Retrieve elements with the close class
var closebtns = document.getElementsByClassName("close");
var i;
updateTaskCount();

// Loop through the elements, and hide the parent when clicked on
for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function() {
    var div = this.parentElement;
    div.style.display = 'none';
    updateTaskCount();
    
    // Remove item from localStorage
    var itemText = div.firstChild.textContent;
    removeFromLocalStorage(itemText);
  });
  
  // Add double-click event listener to delete item
  closebtns[i].parentElement.addEventListener("dblclick", function() {
    var div = this;
    div.style.display = 'none';
    updateTaskCount();
    
    // Remove item from localStorage
    var itemText = div.textContent;
    removeFromLocalStorage(itemText);
  });
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
  
  // Add click event listener to close button
  span.addEventListener('click', function(event) {
    event.stopPropagation();
    var li = this.parentElement;
    li.remove();
    updateTaskCount();
    updateLocalStorage();
  });
  
  // Add mouseover event listener to add close button
  li.addEventListener('mouseover', function() {
    li.appendChild(span);
  });
  
  // Add mouseout event listener to remove close button
  li.addEventListener('mouseout', function() {
    span.remove();
  });
  
  todoList.appendChild(li);
  
  updateTaskCount(); // Update task count
}




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
