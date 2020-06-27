var newTodoInput = document.getElementById("new-todo");
var addNewTodoButton = document.getElementById("todo-button");
var todoContainer = document.getElementById("todo-list-container");
var completedContainer = document.getElementById("completed-list-container");


var createNewTodoItems = function(todoTitle) {
  var listItem = document.createElement("li");
  var label = document.createElement("label");
  var checkbox = document.createElement("input");
  var editTodo = document.createElement("input");
  var doneButton = document.createElement("input");
  var editButton = document.createElement("input");
  var deleteButton = document.createElement("input");

  //add types and images 
  checkbox.type = "checkbox";
  editTodo.type = "text";
  doneButton.type = "image";
  doneButton.src = "images/done.png"
  editButton.type = "image";
  editButton.src = "images/noteboo_small.png";
  deleteButton.type = "image";
  deleteButton.src = "images/delete.png";

  label.innerText = todoTitle

  //append the items to the list item
  listItem.append(checkbox);
  listItem.append(label);
  listItem.append(editTodo);
  listItem.append(doneButton);
  listItem.append(editButton);
  listItem.append(deleteButton);

  return listItem;
}

var addTask = function() {
  //Get the value that was entered by the user
  var newTodoTitle = newTodoInput.value;

  if (newTodoTitle.isEmpty) {

  }
  // Create a new list item from the function created earlier
  var listItem = createNewTodoItems(newTodoTitle);
  
  // Append the list item to the todo container
  todoContainer.append(listItem)

  bindTaskEvents(listItem, taskCompleted);
  // Clear the input the user entered so the user can enter another todo
  newTodoInput.value = ""

}

var editTask

addNewTodoButton.addEventListener("click", addTask);

var editTask = function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  
  var listItem=this.parentNode;
  
  var editInput=listItem.querySelector('input[type=text]');
  var label=listItem.querySelector("label");
  var containsClass=listItem.classList.contains("editMode");
      //If class of the parent is .editmode
      if(containsClass){
  
      //switch to .editmode
      //label becomes the inputs value.
        label.innerText=editInput.value;
      }else{
        editInput.value=label.innerText;
      }
  
      //toggle .editmode on the parent.
      listItem.classList.toggle("editMode");
  }

var doneTask = function() {
  var listItem=this.parentNode;
  var editInput=listItem.querySelector('input[type=text]');
  var label=listItem.querySelector("label");
  var containsClass=listItem.classList.contains("editMode");
      //If class of the parent is .editmode
      if(containsClass){
  
      //switch to .editmode
      //label becomes the inputs value.
        label.innerText=editInput.value;
      }else{
        editInput.value=label.innerText;
      }
  listItem.classList.toggle("editMode");
  editInput.value = ""
}
  //Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);

}

//Mark task completed
var taskCompleted=function(){
  console.log("Complete Task...");

//Append the task list item to the #completed-tasks
var listItem=this.parentNode;
completedContainer.appendChild(listItem);
      bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
//Mark task as incomplete.
//When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var listItem=this.parentNode;
  todoContainer.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("bind list item events");
//select ListItems children
  var checkBox=taskListItem.querySelector("input[type=checkbox]");
  var doneButton=taskListItem.querySelector("#todo-list-container li > :nth-child(4)");
	var editButton=taskListItem.querySelector("#todo-list-container li > :nth-child(5)");
	var deleteButton=taskListItem.querySelector("#todo-list-container li > :nth-child(6)");

      //Bind editTask to edit button.
      if (doneButton) doneButton.onclick=doneTask;
			if (editButton) editButton.onclick=editTask;
			//Bind deleteTask to delete button.
			if (deleteButton)deleteButton.onclick=deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
	//for each list item
	for (var i=0; i<todoContainer.children.length;i++){

		//bind events to list items chldren(tasksCompleted)
		bindTaskEvents(todoContainer.children[i],taskCompleted);
	}




//cycle over completedTasksHolder ul list items
	for (var i=0; i<completedContainer.children.length;i++){
	//bind events to list items chldren(tasksIncompleted)
		bindTaskEvents(completedContainer.children[i],taskIncomplete);
	}
