// Retrieve elements with the close class
var closebtns = document.getElementsByClassName("close");
var i;
updateTaskCount();

// Loop through the elements, and hide the parent when clicked on
for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function() {
    this.parentElement.style.display = 'none';
    updateTaskCount();
  });
}

// Checked symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    updateTaskCount();
  }
}, false);

//Using enter to accept input
var input = document.getElementById('newInput');
input.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission
    var inputValue = input.value.trim();
    if (inputValue !== '') {
      newElement(inputValue);
      input.value = ''; // Clear the input field
    }
  }
});

// Add a new item to the list when "Add" is clicked
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("newInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("This field cannot be empty!");
  } else {
    document.getElementById("todo-list").appendChild(li);
    updateTaskCount(); // Update task count
  }

  document.getElementById("newInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < closebtns.length; i++) {
    closebtns[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
      updateTaskCount(); // Update task count
    };
  }
}


// Clear completed items from the list
function clearCompletedItems() {
  var completedItems = document.querySelectorAll('.checked');
  completedItems.forEach(function(item) {
    item.style.display = 'none';
  });
  updateTaskCount();
}

// Get the reference to the "Clear Completed" button
var clearButton = document.getElementById('clear-completed-button');

// Add an event listener to the button
clearButton.addEventListener('click', clearCompletedItems);

// Show only completed items
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


// Get the reference to the "Active" button
var activeButton = document.getElementById('active-button');

// Adding an event listener to the button
activeButton.addEventListener('click', showActiveItems);

// Show only active items
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

// All button
var allButton = document.getElementById('all-button');
allButton.addEventListener('click', showAllItems);
function showAllItems() {
  var listItems = document.querySelectorAll('#todo-list li');
  listItems.forEach(function(item) {
    item.style.display = '';
  });
}

// Toggle-button functionalities
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");

//Changing image on click
  var toggleButton = document.querySelector('.toggle-button');
  var currentImage = toggleButton.querySelector('img');
  var newImageSrc = '';

  if (element.classList.contains('dark-mode')) {
    newImageSrc = "images/icon-sun.svg"; 
  } else {
    newImageSrc = "images/icon-moon.svg"; 
  }

  currentImage.src = newImageSrc;

//Button container color change
  var buttons = document.querySelectorAll('.button-container button');
  buttons.forEach(function(button) {
    button.classList.toggle('light-mode');
  });

//Header image change
  var header = document.getElementById('header');

  if (element.classList.contains('dark-mode')) {
    header.style.backgroundImage = 'url(images/bg-desktop-dark.jpg)';
  } else {
    header.style.backgroundImage = 'url(images/bg-desktop-light.jpg)';
  }

// Set initial background image size
var header = document.getElementById('header');
header.style.backgroundSize = 'auto';

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
  } else if (event.target.tagName === 'SPAN') {
    var listItem = event.target.parentElement;
    listItem.classList.toggle('checked');
    updateTaskCount(); // Call the function to update task count
  }
});

//Drag and drop functionalities
var dragSrcElement = null;

function handleDragStart(e) {
  dragSrcElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
  this.classList.add('dragging');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcElement !== this) {
    dragSrcElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

function handleDragEnd(e) {
  this.classList.remove('dragging');
  var listItems = document.querySelectorAll('#todo-list li');
  listItems.forEach(function(item) {
    item.classList.remove('over');
  });
}

var listItems = document.querySelectorAll('#todo-list li');
listItems.forEach(function(item) {
  item.addEventListener('dragstart', handleDragStart, false);
  item.addEventListener('dragenter', handleDragEnter, false);
  item.addEventListener('dragover', handleDragOver, false);
  item.addEventListener('dragleave', handleDragLeave, false);
  item.addEventListener('drop', handleDrop, false);
  item.addEventListener('dragend', handleDragEnd, false);
});

