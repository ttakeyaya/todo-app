import { Todo, TodoManager } from "./TodoManager.js";
const themeSelector = document.getElementById('theme-switch');
const themeImage = document.querySelector('.moon');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const itemLeftMessage = document.getElementById('item-left-message');
const search = document.getElementById('search');


// 
const Manager = new TodoManager();
renderItemLeftMessage(Manager);

// filter todos
search.addEventListener('click', (e) =>{
  let searchTerm = e.target.innerText;
  if(searchTerm == "All"){
    let items = Manager.getItems();
    clearTodoList();
    renderItems(items, todoList);
  }else if(searchTerm == "Completed"){
    let items = Manager.getCompletedItems();
    clearTodoList();
    renderItems(items, todoList);
  }else if(searchTerm == "Active"){
    let items = Manager.getActiveItems();
    clearTodoList();
    renderItems(items, todoList);
  }
})

// create a todo item
todoForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  let userInput = todoForm.userInput.value;
  let item = new Todo(userInput);
  Manager.add(item);
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
  items.forEach(item => {
    renderTodo(item, itemContainer);
  });
}
function renderTodo(todoItem, itemContainer){
  const position = 'afterbegin';
  let itemHTML = `
  <li class="item text-gray text-small dark-item" data-key=${todoItem.key}>
    <div>
      <label class="checkbox">
        <input type="checkbox">
        <div class="circle">
          <div class="circle__inner"></div>
        </div>
        <div class="base"></div>
      </label>
      <!-- dark -->
      <p class="text-list text-bold-bladark-text">${todoItem.content}</p>
    </div>
    <img src="../images/icon-cross.svg" alt="cross the item">
  </li> 
  `;
  itemContainer.insertAdjacentHTML(position, itemHTML);
}
// 













let theme = {
  isLight: true,
  isDark: false,
};

themeSelector.addEventListener('click', ()=>{
  let isChecked = themeSelector.checked;
  if(!isChecked && theme.isLight ){
    themeImage.style.backgroundImage = "url('../../images/icon-moon.svg')";
    
    changeTheme('light');
  }else{
    themeImage.style.backgroundImage ="url('../../images/icon-sun.svg')"
    
    changeTheme('dark');

  }
});

function changeTheme(theme){
  console.log(theme);

}