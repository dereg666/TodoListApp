import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoApp.css';
import './css/ionicons.css';



class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

      changeName: this.props.itemName.substr(this.props.itemName.indexOf(' ') + 1),
      changeNameHolder: 'Type to change',
      editing: 0,
    };
    this.clickEditItemName = this.clickEditItemName.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.submitFunction = this.submitFunction.bind(this);
    this.textBlur = this.textBlur.bind(this);
    this.textFocus = this.textFocus.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  textFocus() {
    if (this.state.editing === 0) {
      this.setState({ addItemHolder: '' });
    } else if (this.state.editing === 1) {
      this.setState({ changeNameHolder: '' });
    }
  }
  textBlur() {
    if (this.state.editing === 1) {
      this.setState({ changeNameHolder: 'Type to change' });
    }
  }
  handleChange(event) {
    if (this.state.editing === 1) {
      this.setState({ changeName: event.target.value });
    }
  }
  clickEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.submitFunction();
    }
  }
  submitFunction() {
    const num = Number(this.props.itemName.split(' ', 1));
    if (this.state.changeName && this.state.editing === 1) {
      // console.log(this.state.changeName);
      this.props.changeItemNameFunc(num, this.state.changeName);
      this.setState({ editing: 0 });
    }
  }
  clickEditItemName() {
    this.setState({ editing: 1 });
  }
  render() {
    return ((this.props.showMode - this.props.itemState) === 0 ?
      null :
      <div>
        {this.state.editing === 0 ?
          <div className="todoItem">
            {this.props.itemState === 0 ?
              <i
                className="icon ion-android-checkbox-outline-blank checkBox"
                onClick={() => this.props.checkItemsFunc(Number(this.props.itemName.split(' ', 1)))}
              /> :
              <i
                className="icon ion-android-checkbox-outline checkBox"
                onClick={() => this.props.checkItemsFunc(Number(this.props.itemName.split(' ', 1)))}
              />
            }
            <div className="itemName">{this.props.itemName.substr(this.props.itemName.indexOf(' ') + 1)}</div>
            <i
              className="icon ion-edit myIcon sideBarEdit"
              onClick={this.clickEditItemName}
            ></i>
            <i
              className="icon ion-trash-b myIcon"
              onClick={() => this.props.deleteItemsFunc(Number(this.props.itemName.split(' ', 1)))}
            ></i>
          </div> :
          <div className="todoItem">
            {this.props.itemState === 0 ?
              <i
                className="icon ion-android-checkbox-outline-blank checkBox"
                onClick={() => this.props.checkItemsFunc(Number(this.props.itemName.split(' ', 1)))}
              /> :
              <i
                className="icon ion-android-checkbox-outline checkBox"
                onClick={() => this.props.checkItemsFunc(Number(this.props.itemName.split(' ', 1)))}
              />
            }
            <input
              className="itemName"
              type="text"
              value={this.state.changeName}
              placeholder={this.state.changeNameHolder}
              onKeyDown={this.clickEnter}
              onChange={this.handleChange}
              onFocus={this.textFocus}
              onBlur={this.textBlur}
              autoFocus
            />
            <i
              className="icon ion-log-in myIcon sideBarEdit"
              onClick={this.submitFunction}
            ></i>
            <i
              className="icon ion-trash-b myIcon"
              onClick={() => this.props.deleteItemsFunc(Number(this.props.itemName.split(' ', 1)))}
            ></i>
          </div> 
        }
      </div>
    );
  }
}

TodoItem.defaultProps = {
  itemName: 'This is a todo',
  itemState: 0,
};

TodoItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  itemState: PropTypes.number.isRequired,
  checkItemsFunc: PropTypes.func.isRequired,
  deleteItemsFunc: PropTypes.func.isRequired,
  showMode: PropTypes.number.isRequired,
  changeItemNameFunc: PropTypes.func.isRequired,
};

export default TodoItem;
