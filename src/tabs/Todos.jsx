import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);
    if (todos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  handleSubmit = value => {
    const todo = {
      text: value,
      id: nanoid(),
    };
    this.setState(prevState => ({ todos: [todo, ...prevState.todos] }));
  };

  deleteTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleEdit = (id, value) => {
    const editTodo = {
      text: value,
      id: id,
    };

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return editTodo;
        }
        return todo;
      }),

      // [todo, ...prevState.todos]
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {this.state.todos.length > 0 ? (
          <Grid>
            {this.state.todos.map(({ text, id }, index) => (
              <GridItem key={id}>
                <Todo
                  id={id}
                  text={text}
                  index={index + 1}
                  deleteTodo={() => this.deleteTodo(id)}
                  editTodo={() => this.handleEdit(id, todos.text)}
                />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <Text>There are no any todos</Text>
        )}
      </>
    );
  }
}
