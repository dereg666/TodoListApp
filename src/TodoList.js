import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './TodoApp.css';


class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addItemHolder: 'Type to add todos in "' + this.props.listName.substr(this.props.listName.indexOf(' ') + 1) + '"...',
      addItemValue: '',
      editing: 0,
    };
    this.textFocus = this.textFocus.bind(this);
    this.textBlur = this.textBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.clickEditListName = this.clickEditListName.bind(this);
  }
  textFocus() {
    if (this.state.editing === 0) {
      this.setState({ addItemHolder: '' });
    }
  }
  textBlur() {
    if (this.state.editing === 0) {
      this.setState({ addItemHolder: 'Type to add items' });
    }
  }
  handleChange(event) {
    if (this.state.editing === 0) {
      this.setState({ addItemValue: event.target.value });
    }
  }
  clickEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.submitFunction();
    }
  }
  submitFunction() {
    const num = Number(this.props.listName.split(' ', 1));
    if (this.state.addItemValue && this.state.editing === 0) {
      // console.log(this.state.addItemValue);
      this.props.addItemsFunc(num, this.state.addItemValue);
      this.setState({ addItemValue: '' });
    }
  }
  clickEditListName() {
    this.setState({ editing: 1 });
  }

  render() {
    let listShow = 0;
    if (this.props.showMode < 2) {
      for (let it = 0; it < this.props.listItems.length; it += 1) {
        if (this.props.listItems[it]) {
          listShow += Math.abs(this.props.listItems[it].itemState - this.props.showMode);
        }
      }
      listShow = (listShow === 0 ? 0 : 1);
    } else if (this.props.showMode === 2) {
      listShow = 1;
    }
    if (listShow === 0 && this.props.showMode !== (Number(this.props.listName.split(' ', 1)) + 3)) {
      return null;
    }
    else {
      return (
        <div className="listBlock">
          {listShow === 1 ?
            <div className="listName">
              {this.props.listName.substr(this.props.listName.indexOf(' ') + 1) }
            </div> : null
          }
          {this.props.showMode === (Number(this.props.listName.split(' ', 1)) + 3) ?
            <div className="listInputBar">
              <input
                className="listInputBox"
                type="text"
                value={this.state.addItemValue}
                placeholder={this.state.addItemHolder}
                onKeyDown={this.clickEnter}
                onChange={this.handleChange}
                onFocus={this.textFocus}
                onBlur={this.textBlur}
              />
              <i
                className="icon ion-plus-round myIcon whiteIcon"
                onClick={this.submitFunction}
              />
            </div> : null
          }
          <div>
            {this.props.listItems.map(Is => <TodoItem
              itemName={Is.itemName}
              itemState={Is.itemState}
              checkItemsFunc={this.props.checkItemsFunc}
              deleteItemsFunc={this.props.deleteItemsFunc}
              showMode={this.props.showMode}
              changeItemNameFunc={this.props.changeItemNameFunc}
            />)}
          </div>
        </div>
      );
    }
  }
}

TodoList.defaultProps = {
  listName: '0 This is a list',
  listItems: [],
};

TodoList.propTypes = {
  listName: PropTypes.string.isRequired,
  listItems: PropTypes.array.isRequired,
  addItemsFunc: PropTypes.func.isRequired,
  checkItemsFunc: PropTypes.func.isRequired,
  deleteItemsFunc: PropTypes.func.isRequired,
  showMode: PropTypes.number.isRequired,
  changeItemNameFunc: PropTypes.func.isRequired,
};

export default TodoList;
