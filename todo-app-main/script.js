// Retrieve elements with the close class
var closebtns = document.getElementsByClassName("close");
var i;

// Loop through the elements, and hide the parent when clicked on
for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function() {
    this.parentElement.style.display = 'none';
  });
}

// Checked symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

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
    };
  }
}

// Clear completed items from the list
function clearCompletedItems() {
  var completedItems = document.querySelectorAll('.checked');
  completedItems.forEach(function(item) {
    item.style.display = 'none';
  });
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
//Adding an event listener to the button
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
