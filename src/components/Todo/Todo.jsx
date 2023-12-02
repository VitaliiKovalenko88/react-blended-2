import { Component } from 'react';
import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';
import { EditTodoModal } from 'components/EditTodoModal/EditTodoModal';

export class Todo extends Component {
  state = {
    edittedText: this.props.text,
    isEditModalOpen: false,
  };

  openEditModal = () => {
    this.setState({ isEditModalOpen: true });
  };

  closeEditModal = () => {
    this.setState({ isEditModalOpen: false });
  };

  handleTodoEdit = text => {
    this.setState({ edittedText: text });
  };

  render() {
    const { isEditModalOpen, edittedText } = this.state;
    const { text, index, deleteTodo, updateTodo, id } = this.props;
    return (
      <TodoWrapper>
        <Text textAlign="center" marginBottom="20px">
          TODO #{index}
        </Text>
        <Text>{edittedText}</Text>
        <DeleteButton type="button" onClick={deleteTodo}>
          <RiDeleteBinLine size={24} />
        </DeleteButton>
        <EditButton onClick={this.openEditModal}>
          <RiEdit2Line size={24} />
        </EditButton>

        {isEditModalOpen && (
          <EditTodoModal
            id={id}
            handleTodoEdit={this.handleTodoEdit}
            onClose={this.closeEditModal}
            updateTodo={updateTodo}
            edittedText={edittedText}
          />
        )}
      </TodoWrapper>
    );
  }
}
