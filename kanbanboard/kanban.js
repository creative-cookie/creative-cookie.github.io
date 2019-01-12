const toDoList = document.querySelector('#toDo ul');
const doingList = document.querySelector('#doing ul');
const doneList = document.querySelector('#done ul');
const highPri = document.querySelector('#toDo .highPri');
const medPri = document.querySelector('#toDo .medPri');
const lowPri = document.querySelector('#toDo .lowPri');
const charCount = document.getElementById('charCount');
const taskText = document.getElementById('task');
const addTask = document.forms['add-task'];
const checked = document.getElementById('isHighPri');

// delete/move cards
toDoList.addEventListener('click', (e) =>{
  if(e.target.className == 'fas fa-trash-alt trash'){
    const li = e.target.parentElement;
    e.target.parentElement.parentElement.removeChild(li);
  }
  if(e.target.className == 'fas fa-caret-right arrow right'){
    const taskItem = e.target.parentElement;
    const clone = taskItem.cloneNode(true);
    const highPri = document.querySelector('#doing .highPri');
    const medPri = document.querySelector('#doing .medPri');
    const lowPri = document.querySelector('#doing .lowPri');

    if(taskItem.className == 'highPriority'){
      highPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'medPriority'){
      medPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'lowPriority'){
      lowPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
  }
});

doingList.addEventListener('click', (e) =>{
  if(e.target.className == 'fas fa-trash-alt trash'){
    const li = e.target.parentElement;
    e.target.parentElement.parentElement.removeChild(li);
  }
  if(e.target.className == 'fas fa-caret-right arrow right'){
    const taskItem = e.target.parentElement;
    const clone = taskItem.cloneNode(true);
    const highPri = document.querySelector('#done .highPri');
    const medPri = document.querySelector('#done .medPri');
    const lowPri = document.querySelector('#done .lowPri');
    if(taskItem.className == 'highPriority'){
      highPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'medPriority'){
      medPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'lowPriority'){
      lowPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
  }
  if(e.target.className == 'fas fa-caret-left arrow left'){
    const taskItem = e.target.parentElement;
    const clone = taskItem.cloneNode(true);
    // const highPri = document.querySelector('#toDo .highPri');
    // const medPri = document.querySelector('#toDo .medPri');
    // const lowPri = document.querySelector('#toDo .lowPri');
    if(taskItem.className == 'highPriority'){
      highPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'medPriority'){
      medPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'lowPriority'){
      lowPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
  }
});

doneList.addEventListener('click', (e) =>{
  if(e.target.className == 'fas fa-trash-alt trash'){
    const li = e.target.parentElement;
    e.target.parentElement.parentElement.removeChild(li);
  }
  if(e.target.className == 'fas fa-caret-left arrow left'){
    const taskItem = e.target.parentElement;
    const clone = taskItem.cloneNode(true);
    const highPri = document.querySelector('#doing .highPri');
    const medPri = document.querySelector('#doing .medPri');
    const lowPri = document.querySelector('#doing .lowPri');
    if(taskItem.className == 'highPriority'){
      highPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'medPriority'){
      medPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
    else if(taskItem.className == 'lowPriority'){
      lowPri.appendChild(clone);
      e.target.parentElement.parentElement.removeChild(taskItem);
    }
  }
});

// add character count
task.addEventListener('keyup', ()=>{
  charCount.innerHTML = `${task.value.length}/80 characters used`;
  if(task.value.length >= 80){
    charCount.style.color = "red";
    task.style.border = "1px solid red";
  } else{
    charCount.style.color = "#888";
    task.style.border = "1px solid #ddd";
  }
});

//add task
addTask.addEventListener('submit', (e)=>{
  e.preventDefault();
  const value = document.querySelector('input[type="text"]').value;
  const isPriority = getPriority(addTask, 'priority');

  //create elements
  const li = document.createElement('li');
  const leftArrow = document.createElement('span');
  const taskP = document.createElement('p');
  const rightArrow = document.createElement('span');
  const trashIcon = document.createElement('span');

  //add content
  taskP.textContent = value;
  leftArrow.className = 'fas fa-caret-left arrow left';
  rightArrow.className = 'fas fa-caret-right arrow right';
  trashIcon.className = 'fas fa-trash-alt trash';

  //add elements
  li.appendChild(leftArrow);
  li.appendChild(taskP);
  li.appendChild(rightArrow);
  li.appendChild(trashIcon);
  if(isPriority == 'isHighPri'){
    li.className = 'highPriority';
    highPri.appendChild(li);
  }
  else if (isPriority == 'isMedPri'){
    li.className = 'medPriority';
    medPri.appendChild(li);
  }
  else if (isPriority == 'isLowPri'){
    li.className = 'lowPriority';
    lowPri.appendChild(li);
  }
  //resetting fields and count
  task.value = '';
  checked.checked = true;
  charCount.innerHTML = `0/80 characters used`;
});

function getPriority(form, name){
  let val;

  let radioBtns = form.elements[name];
  for(let i = 0, length = radioBtns.length; i < length; i++){
    if(radioBtns[i].checked){
      val = radioBtns[i].value;
      break;
    }
  }
  return val;
}
