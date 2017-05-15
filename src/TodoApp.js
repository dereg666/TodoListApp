import React, { Component } from 'react';
import TodoList from './TodoList';
import TodoSidebar from './TodoSidebar';
import './TodoApp.css';
import './css/ionicons.css';

const sizeTime = 1000;

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      lists: [],
      numUndoneDone: [0, 0],
      addListHolder: 'Type to add lists',
      addListValue: '',
      showMode: 2,
    };
    this.textFocus = this.textFocus.bind(this);
    this.textBlur = this.textBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.addingItem = this.addingItem.bind(this);
    this.checkingItem = this.checkingItem.bind(this);
    this.deletingItem = this.deletingItem.bind(this);
    this.changingName = this.changingName.bind(this);
    this.deletingList = this.deletingList.bind(this);
    this.setShowState = this.setShowState.bind(this);
  }
  setShowState(mode) {
    this.setState({ showMode: mode });
  }
  textFocus() {
    this.setState({ addListHolder: '' });
  }
  textBlur() {
    this.setState({ addListHolder: 'Type to add lists' });
  }
  handleChange(event) {
    this.setState({ addListValue: event.target.value });
  }
  clickEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.submitFunction();
    }
  }
  submitFunction() {
    if (this.state.addListValue) {
      const addList = {
        todoName: this.state.lists.length.toString() + ' ' + this.state.addListValue,
        todoItems: [],
      };
      const temp = this.state.lists;
      temp.push(addList);
      this.setState({ showMode: (temp.length + 2) });
      this.setState({ lists: temp });
      this.setState({ addListValue: '' });
    }
  }
  addingItem(num, str) {
    const tempNum = num * sizeTime + this.state.lists[num].todoItems.length;
    const tempLists = this.state.lists;
    const tempUndoneDone = this.state.numUndoneDone;
    const tempI = {
      itemName: tempNum.toString() + ' ' + str,
      itemState: 0,
    };
    tempUndoneDone[0] += 1;
    tempLists[num].todoItems.push(tempI);
    this.setState({ lists: tempLists });
    this.setState({ numUndoneDone: tempUndoneDone });
  }
  checkingItem(num) {
    const numList = ~~(num / sizeTime);
    const numItem = num % sizeTime;
    const tempLists = this.state.lists;
    const tempUndoneDone = this.state.numUndoneDone;
    tempUndoneDone[tempLists[numList].todoItems[numItem].itemState] -= 1;
    tempLists[numList].todoItems[numItem].itemState = Math.abs(tempLists[numList].todoItems[numItem].itemState - 1);
    tempUndoneDone[tempLists[numList].todoItems[numItem].itemState] += 1;
    this.setState({ lists: tempLists });
    this.setState({ numUndoneDone: tempUndoneDone });
  }
  deletingItem(num) {
    const numList = ~~(num / sizeTime);
    const numItem = num % sizeTime;
    const tempLists = this.state.lists;
    const tempUndoneDone = this.state.numUndoneDone;
    tempUndoneDone[tempLists[numList].todoItems[numItem].itemState] -= 1;
    tempLists[numList].todoItems[numItem] ? delete tempLists[numList].todoItems[numItem] : null;
    this.setState({ lists: tempLists });
    this.setState({ numUndoneDone: tempUndoneDone });
  }
  changingName(num, name) {
    const tempLists = this.state.lists;
    tempLists[num].todoName = num.toString() + ' ' + name;
    this.setState({ lists: tempLists });
  }
  deletingList(num) {
    const tempLists = this.state.lists;
    const tempUndoneDone = this.state.numUndoneDone;
    for (let i = 0; i < tempLists[num].todoItems.length; i += 1) {
      if (tempLists[num].todoItems[i]) {
        tempUndoneDone[tempLists[num].todoItems[i].itemState] -= 1;
      }
    }
    tempLists[num].todoItems.length = 0;
    delete tempLists[num];
    this.setState({ lists: tempLists });
    this.setState({ numUndoneDone: tempUndoneDone });
  }
  render() {
    let s1 = null;
    let s2 = null;
    let s3 = null;
    if (this.state.showMode === 0) {
      s3 = {
        backgroundColor: 'rgb(93, 161, 218)',
        color: '#FFFFFF',
      };
    } else if (this.state.showMode === 1) {
      s2 = {
        backgroundColor: 'rgb(93, 161, 218)',
        color: '#FFFFFF',
      };
    } else if (this.state.showMode === 2) {
      s1 = {
        backgroundColor: 'rgb(93, 161, 218)',
        color: '#FFFFFF',
      };
    }
    return (
      <div>
        <div className="header">
          <h1 >&nbsp; TODOs</h1><br />
          <div className="boxUndone"> Undone: {this.state.numUndoneDone[0]} <br /></div>
          <div className="boxDone"> Done: {this.state.numUndoneDone[1]} </div>
        </div>
        <div className="TodoAPP">
          <div className="side">
            <div className="sideBar">
              <button className="sideBarRow threeBottons" style={s1} type="button" onClick={() => this.setShowState(2)}>Show All</button>
              <button className="sideBarRow threeBottons" style={s2} type="button" onClick={() => this.setShowState(1)}>Show Undone</button>
              <button className="sideBarRow threeBottons" style={s3} type="button" onClick={() => this.setShowState(0)}>Show Done</button>
              {this.state.lists.map(l => <TodoSidebar
                listName={l.todoName}
                changeNameFunc={this.changingName}
                deleteListsFunc={this.deletingList}
                showMode={this.state.showMode}
                showModeFunc={this.setShowState}
              />)}
            </div>
            <div className="appInputBar">
              <input
                className="appInputBox"
                type="text"
                value={this.state.addListValue}
                placeholder={this.state.addListHolder}
                onKeyDown={this.clickEnter}
                onChange={this.handleChange}
                onFocus={this.textFocus}
                onBlur={this.textBlur}
              />
              <input
                className="appSubmitButton"
                type="submit"
                value="Add"
                onClick={this.submitFunction}
              />
            </div><br />
          </div>
          <div className="listArea">
            {this.state.lists.map(l => <TodoList
              listName={l.todoName}
              listItems={l.todoItems}
              addItemsFunc={this.addingItem}
              checkItemsFunc={this.checkingItem}
              deleteItemsFunc={this.deletingItem}
              changeNameFunc={this.changingName}
              deleteListsFunc={this.deletingList}
              showMode={this.state.showMode}
            />)}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoApp;
