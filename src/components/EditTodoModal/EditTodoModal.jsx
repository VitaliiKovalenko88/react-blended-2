import { Component } from 'react';
import {
  Backdrop,
  ModalEdit,
  EditForm,
  EditInput,
  EditBtn,
} from './EditTodoModal.styled';

export class EditTodoModal extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  handleBackdropClose = ({ target, currentTarget }) => {
    if (target === currentTarget) this.props.onClose();
  };

  handleEdit = e => {
    e.preventDefault();

    const { value } = this.state;
    const { id, handleTodoEdit, onClose, updateTodo } = this.props;

    handleTodoEdit(value);
    updateTodo(id, value);

    this.setState({ value: '' });

    onClose();
  };

  render() {
    const { value } = this.state;
    const { edittedText } = this.props;

    return (
      <Backdrop onClick={this.handleBackdropClose}>
        <ModalEdit>
          <EditForm onSubmit={this.handleEdit}>
            <EditInput
              type="text"
              name="edit"
              value={value}
              autoComplete="off"
              placeholder={edittedText}
              onChange={this.handleChange}
            />
            <EditBtn type="submit">Edit</EditBtn>
          </EditForm>
        </ModalEdit>
      </Backdrop>
    );
  }
}
