const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const pendingNum = document.querySelector(".pendingNum");
const deleteAllBtn = document.querySelector(".footer button");
let inputChange = document.querySelector(".inputField button span i");

//--------------------------------- onkeyup in inputbox -------------------------------------------------

inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting user entered value
  if (userData.trim() != 0) {
    //if user values aren't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
showTasks(); //calling showTasks function

//------------------------------- When user click to add button ------------------------------------------------

//if user click on the add button
addBtn.onclick = () => {
  let userData = inputBox.value; //getting user entered  value
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstarage
  if (getLocalStorage == null) {
    //if localstorage is null
    listArr = []; //creating blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //tranfroming json string into ajs object
  }
  listArr.push(userData); //pushing or adding user data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //trnsforming js object to json string
  showTasks(); //calling showTasks function
  addBtn.classList.remove("active"); // user input ant text then add buttuon will active
};

// --------------------------------- User can see list ---------------------------------------------------------

// function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstarage
  if (getLocalStorage == null) {
    //if localstorage is null
    listArr = []; //creating blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //tranfroming json string into a js object
  }

  pendingNum.textContent = listArr.length; //passing the length value in pendingNum
  if (listArr.length > 0) {
    // if array list is greter than 0
    deleteAllBtn.classList.add("active"); // than delete all button will be active
  } else {
    deleteAllBtn.classList.remove("active"); // else bydefault disable
  }

  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li>${element} <span class="edit" onclick=editTask(${index});><i class="fas fa-edit"></i></span><span class="del" onclick=deleteTask(${index});><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

//------------------------------------ User can delete listing data --------------------------------------------

//delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localstarage
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the particular indexed li

  // aftre remove the li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //trnsforming js object to json string
  showTasks(); //calling showTasks function
}

//delete all tasks function
deleteAllBtn.onclick = () => {
  listArr = []; //empty an array

  // aftre delete all task again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //trnsforming js object to json string
  showTasks(); //calling showTasks function
};

//---------------------------------------- User can edit listing data ---------------------------------------------

//edit task function
function editTask(index) {
  inputBox.value = listArr[index];
  inputChange.classList.remove("fas", "fa-plus");
  inputChange.classList.add("fa-solid", "fa-check");
  addBtn.style.backgroundColor = "blue";

  addBtn.onclick = () => {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1, inputBox.value);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    inputBox.value = "";
    addBtn.classList.remove("active"); // user input ant text then add buttuon will active
    showTasks(); //calling showTasks function
    location.reload();
  };
}

//-------------------------------- important concept about this project -----------------------------------------

/*
localstorage concept


*/