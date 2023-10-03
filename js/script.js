// Define UI element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners
form.addEventListener('submit', addTask);

taskList.addEventListener('click',removeTask);

clearBtn.addEventListener('click',clearTask);

filter.addEventListener('keyup',filterTask);

document.addEventListener('DOMContentLoaded', getTasks);




// Define functions
// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task!');
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        
        console.log(taskInput.value);
        
        let link=document.createElement('a');

        link.setAttribute('href','#');

        link.innerHTML='x';

        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value='';

    }
    e.preventDefault();
   
}

//remove pne task

function removeTask(e){


    if(e.target.hasAttribute('href')){

    //console.log(e.target.parentElement);

    if(confirm("Are you sure?")){
        let ele=e.target.parentElement;

        ele.remove();

        removeFromLS(ele);
            
    }

    }
}

//remove all task list

function clearTask(e){

    taskList.innerHTML='';

    localStorage.clear();
}

//filterTask

function filterTask(e){

    let text=e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task=>{
        let item=task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) !=-1){

            task.style.display='block';
        }
        else{

            task.style.display='none';
        }
    })
}

// Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// gettask

function getTasks(){

    let tasks;
    
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task=>{

         let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        
        console.log(taskInput.value);
        
        let link=document.createElement('a');

        link.setAttribute('href','#');

        link.innerHTML='x';

        li.appendChild(link);

        taskList.appendChild(li);
    })

}

//remove from local

function removeFromLS(taskItem){

    let tasks;
    
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    /*let li=taskItem;//kon li ta k delete korbo seita k ana

    li.removeChild(li.lastChild);// li theke first child task 1 rekhe last child x k delete kora karon compare korte hobe only first child er shate

    tasks.forEach((task,index)=>{

        if(li.textContent.trim()===task){


            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));*/

    let li=taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task,index)=>{

        if(task===li.textContent.trim()){
        tasks.splice(index,1);
        }
    })
    
   
localStorage.setItem('tasks',JSON.stringify(tasks));
    
}