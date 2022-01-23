const submission = document.querySelector("form");
const input = document.querySelector("input")
const list = document.querySelector("ul");
let localList = JSON.parse(localStorage.getItem("todos")) || [];


//reload all the tasks from locallist at refresh on to the page 
for (let i of localList) {
    const newLi = document.createElement("li");
    const completed = document.createElement("button");
    const removeButton = document.createElement("button");

    newLi.innerText = i.task;
    removeButton.innerText = "remove";
    completed.innerText = "completed"


    completed.className = "complete"
    removeButton.className = "remove";

    //add buttons to the li 
    newLi.append(completed);
    newLi.append(removeButton);
    list.append(newLi)
}

submission.addEventListener("submit", function (e) {
    e.preventDefault();

    //create new elements for li, remove button and completed button
    const newLi = document.createElement("li");
    const completed = document.createElement("button");
    const removeButton = document.createElement("button");

    newLi.innerText = input.value
    removeButton.innerText = "remove";
    completed.innerText = "completed"


    //add class name so event listener gets added
    completed.className = "complete"
    removeButton.className = "remove";

    //append the li into the unordered list 
    newLi.append(completed);
    newLi.append(removeButton);
    list.append(newLi)

    //add our new task to our local storage list 
    localList.push({ task: newLi.innerText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(localList));
})


list.addEventListener("click", function (e) {
    //if class is complete we will toggle the class list which will style accordingly
    if (e.target.classList.contains("complete")) {
        e.target.parentElement.classList.toggle("checked")
    }
    //if remove button is pressed we will remove parent element 
    if (e.target.classList.contains("remove")) {
        console.log(e.target.parentElement.innerText);

        //use our custom remove function to remove the object from our local list array
        removeFromLocalList(e.target.parentElement.innerText);
        localStorage.setItem("todos", JSON.stringify(localList));

        //remove the li from our unordered list
        e.target.parentElement.remove();
    }
})

///function will help us remove any task from our local list array
function removeFromLocalList(task) {
    let index = 0
    //iterate through our local list and increment the index
    //when we find the index of the task we want to delete we will break
    for (let i of localList) {
        index++
        if (i.task = task) break;
    }
    //we now remove the task from our local list
    localList = localList.splice(index, 1);
}