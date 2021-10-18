import { Todo, TodoManager } from "./TodoManager.js";
import {themeSwitch, changeCheckBoxTheme} from './ThemeSwitch.js';

const themeSelector = document.getElementById('theme-switch');
const themeImage = document.querySelector('.moon');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const itemLeftMessage = document.getElementById('item-left-message');
const search = document.getElementById('search');
const clearCompletedBtn = document.getElementById('clear');

let theme = {
  isLight: true,
  isDark: false,
  toggle: function(){
    this.isLight = !this.isLight;
    this.isDark = !this.isDark;
  }
};

// 
const Manager = new TodoManager();
renderItemLeftMessage(Manager);

// delete complted items as 'Clear Completed' btn is clicked
clearCompletedBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  clearTodoList();
  // let activeItems = Manager.getActiveItems();
  let completedItems = Manager.getCompletedItems();
  completedItems.forEach(item => Manager.removeItembyKey(item.key));
  renderItemLeftMessage(Manager);
})

// filter todos
search.addEventListener('click', (e) =>{
  let searchTerm = e.target.innerText;
  let currentTheme;
  console.log(theme);
  if(theme.isLight){
    currentTheme = 'light';
  }else{
    currentTheme='dark';
  }
  if(searchTerm == "All"){
    let items = Manager.getItems();
    clearTodoList();
    renderItems(items, todoList);
    changeCheckBoxTheme(currentTheme);
  }else if(searchTerm == "Completed"){
    let items = Manager.getCompletedItems();
    clearTodoList();
    renderItems(items, todoList);
    changeCheckBoxTheme(currentTheme);
  }else if(searchTerm == "Active"){
    let items = Manager.getActiveItems();
    clearTodoList();
    renderItems(items, todoList);
    changeCheckBoxTheme(currentTheme);
  }
})

// add line-through + change the status of the todoitem
todoList.addEventListener('click', (e)=>{
  console.log(e);
  let path = e.path || (e.composedPath && e.composedPath());
  if(path){
    if(e.target.type =="checkbox"){
      if(e.target.checked){
        let li = path[3];
        li.classList.add('line-through');
        let itemKey = li.dataset.key;
        Manager.changeItemStatusByKey(itemKey);
      }else{
        let li = path[3];
        li.classList.remove('line-through');
        let itemKey = li.dataset.key;
        Manager.changeItemStatusByKey(itemKey);
      }
    }else if(e){
      let li = path[1];
      let itemKey = li.dataset.key;
      if(itemKey == undefined) return;
      Manager.removeItembyKey(itemKey);
      let items = Manager.getItems();
      clearTodoList();
      renderItems(items, todoList);
    }
  }else{
    
  }
  
});

// create a todo item
todoForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  let userInput = todoForm.userInput.value;
  let item = new Todo(userInput);
  item = Manager.add(item);
  renderTodo(item, todoList);
  renderItemLeftMessage(Manager);
  todoForm.userInput.value="";
});

// clear all todo items
function clearTodoList(){
  while(todoList.firstChild){
    todoList.removeChild(todoList.firstChild);
  }
}

function renderItemLeftMessage(manager){
  let num = manager.getNumberItemsLeft();
  switch(num){
    case 0:
      itemLeftMessage.innerText = "0 item left";
      break;
    case 1:
      itemLeftMessage.innerText = "1 item left";
      break;
    default:
      itemLeftMessage.innerText = `${num} items left`;
  }
}

function renderItems(items, itemContainer){
  let sorted = items.sort(function(itemA, itemB){
    return itemA.key - itemB.key
  });
  sorted.forEach(item => {
    renderTodo(item, itemContainer);
  });
  renderItemLeftMessage(Manager);
}

function renderTodo(todoItem, itemContainer){
  const position = 'afterbegin';
  let itemHTML = `
  <li class="item text-gray text-small" data-key="${todoItem.key}">
    <div>
      <label class="checkbox">
        <input type="checkbox" id="checkbox${todoItem.key}">
        <div class="circle">
        </div>
        <div class="base"></div>
      </label>

      <p class="text-list text-bold-bladark-text" id="todoItem${todoItem.key}">${todoItem.content}</p>
    </div>
    <img src="../images/icon-cross.svg" alt="cross the item">
  </li> 
  `;
  itemContainer.insertAdjacentHTML(position, itemHTML);
  if(todoItem.isCompleted){
      const checkboxId = `checkbox${todoItem.key}`;
      let checkbox = document.getElementById(checkboxId);
      checkbox.checked = true;
  }
  let currentTheme;
  if(theme.isLight){
    currentTheme = 'light';
  }else{
    currentTheme='dark';
  }
  changeCheckBoxTheme(currentTheme);
  renderItemLeftMessage(Manager);
}

// switch theme
themeSelector.addEventListener('click', ()=>{
  if(!theme.isLight ){
    themeImage.style.backgroundImage = "url('../../images/icon-moon.svg')";
    themeSwitch('light');
    theme.toggle();

  }else if(!theme.isDark){
    themeImage.style.backgroundImage ="url('../../images/icon-sun.svg')"
    themeSwitch('dark');
    theme.toggle();
  }
});
