import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);

    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };
  handleChange = ({ target }) => {
    this.setState({
      value: target.value,
    });
  };
  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.value}
          onChange={this.handleChange}
        />
      </SearchFormStyled>
    );
  }
}
