// TODO need to cache the doms
export function themeSwitch(theme){
  let body = document.body;
  let heroContainer = document.querySelector('.hero-container');
  let formInput = document.querySelector('.form__input');
  let todoContent = document.querySelector('.todo__content');
  let todoInfo = document.querySelector('.todo__info');
  let todoSearch = document.querySelector('.todo__search');
  let clearBtn = document.getElementById('clear');
  let todoForm = document.querySelector('.todo__form');
  if(theme=="dark"){
    body.classList.add('dark-body');
    heroContainer.classList.add('dark-hero-container');
    formInput.classList.add('dark__input');
    todoContent.classList.add('dark-container');
    todoInfo.classList.add('dark-container');
    todoSearch.classList.add('dark-container');
    clearBtn.classList.add('dark-completed');
    todoForm.style.setProperty("--light-theme-grayish-blue", '#393A4B');
    changeCheckBoxTheme(theme);
  }else if(theme=="light"){
    changeCheckBoxTheme(theme);
    body.classList.toggle('dark-body');
    heroContainer.classList.toggle('dark-hero-container')
    ;
    formInput.classList.toggle('dark__input');
    todoContent.classList.toggle('dark-container');
    todoInfo.classList.toggle('dark-container');
    todoSearch.classList.toggle('dark-container');
    clearBtn.classList.toggle('dark-completed');
    todoForm.style.setProperty("--light-theme-grayish-blue", '#E3E4F1');
  }
}

export function changeCheckBoxTheme(theme){
  let todoContent = document.querySelector('.todo__content');
  if(todoContent.children.length !== 0){
    let circlesNodes = document.querySelectorAll('.circle');
    Array.from(circlesNodes).forEach(circle =>{

      if(theme=="dark"){
        circle.style.setProperty("--color-white", "#393A4B");
        circle.style.border="1px solid hsl(233, 14%, 35%)";
        
      }else if(theme=="light"){
        circle.style.setProperty("--color-white", "white");
        circle.style.border="1px solid #e3e4f1"
      }
    });
  }
}