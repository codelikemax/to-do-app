//Retrieve elements with the close class
var closebtns = document.getElementsByClassName("close");
var i;

// Loop through the elements, and hide the parent, when clicked on
for (i = 0; i < closebtns.length; i++) {
  closebtns[i].addEventListener("click", function() {
    this.parentElement.style.display = 'none';
  });
}

//Checked symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev)
{
    if(ev.target.tagName === 'LI')
    {
        ev.target.classList.toggle('checked');
    }
}, false);


// Add a new item to the list when "Add" is clicked
function newElement() 
{
    var li = document.createElement("li");
    var inputValue = document.getElementById("newInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '')
    {
      alert("This field cannot be empty!");
    }
    else 
    {
      document.getElementById("todo").appendChild(li);
    }
    
    document.getElementById("newInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) 
    {
      close[i].onclick = function() 
      {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
}

//Theme toggle functionality
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}
