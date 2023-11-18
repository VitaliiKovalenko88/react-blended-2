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

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {this.state.todos.length > 0 ? (
          <Grid>
            {this.state.todos.map(({ text, id }, index) => (
              <GridItem key={id}>
                <Todo
                  text={text}
                  index={index + 1}
                  deleteTodo={() => this.deleteTodo(id)}
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
