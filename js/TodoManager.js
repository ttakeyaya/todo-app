/**
 * TODO : the class only stores an instace of Todo class.
 */
export class TodoManager{
  constructor(){
    this.items = [];
    this._uniqueKey = 0;
  }

  _generateUniqueKey(){
    // **This is not an optimal solution.**
    this._uniqueKey += 1;
    return this._uniqueKey;
  }
  add(item){
    let copiedItem = Object.assign({}, item);
    let key = this._generateUniqueKey();
    copiedItem['key'] = key;
    this.items.unshift(copiedItem);
    return copiedItem;
  }

  removeItembyKey(itemKey){
    this.items = this.items.filter(item =>{
      if(itemKey != item.key) return item;
    });
  }

  changeItemStatusByKey(itemKey){
    this.items = this.items.map(item => {
      if(item.key == itemKey){
        item.isCompleted = ! item.isCompleted;
        return item;
      }else{
        return item;
      }
    })
  }

  getItems(){
    return this.items;
  }

  getActiveItems(){
    return this.items.filter(item=>{
      if(item.isCompleted == false){
        return item;
      }
    });
  }

  getCompletedItems(){
    return this.items.filter(item=>{
      if(item.isCompleted == true){
        return item;
      }
    });
  }

  getNumberItemsLeft(){
    let activeItems = this.getActiveItems();
    return activeItems.length;
  }
}

export class Todo{
  constructor(content, isCompleted = false){
    this.content = content;
    this.isCompleted = isCompleted;
  }
}