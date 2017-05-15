import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoApp.css';
import './css/ionicons.css';
import './css/font-awesome.css';


class TodoSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {

      changeName: this.props.listName.substr(this.props.listName.indexOf(' ') + 1),
      changeNameHolder: 'Type to change',
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
    const num = Number(this.props.listName.split(' ', 1));
    if (this.state.changeName && this.state.editing === 1) {
      // console.log(this.state.changeName);
      this.props.changeNameFunc(num, this.state.changeName);
      this.setState({ editing: 0 });
    }
  }
  clickEditListName() {
    this.setState({ editing: 1 });
  }

  render() {
    const onShowStyle = this.props.showMode === (Number(this.props.listName.split(' ', 1)) + 3) ?
    {
      backgroundColor: 'rgb(93, 161, 218)',
      color: '#FFFFFF',
    } : null;
    return (
      <div className="sideBarRowList" style={onShowStyle} onClick={() => this.props.showModeFunc(Number(this.props.listName.split(' ', 1)) + 3)}>
        <i className="fa fa-list-ul sideBarList" aria-hidden="true"></i>
        {this.state.editing === 0 ?
          <span className="threeBottons">
            {this.props.listName.substr(this.props.listName.indexOf(' ') + 1) }
            <i
              className="icon ion-edit myIcon sideBarEdit"
              onClick={this.clickEditListName}
            ></i>
          </span> :
          <span>
            <input
              className="sideBarInputBox"
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
          </span>
        }
        <i
          className="icon ion-trash-b myIcon sideBarDelete"
          onClick={() => this.props.deleteListsFunc(Number(this.props.listName.split(' ', 1)))}
        ></i>
      </div>
    );
  }
}

TodoSidebar.defaultProps = {
  listName: '0 This is a list',
};

TodoSidebar.propTypes = {
  listName: PropTypes.string.isRequired,
  changeNameFunc: PropTypes.func.isRequired,
  deleteListsFunc: PropTypes.func.isRequired,
  showModeFunc: PropTypes.func.isRequired,
  showMode: PropTypes.number.isRequired,
};

export default TodoSidebar;
