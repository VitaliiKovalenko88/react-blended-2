import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getPhotos(this.state.query, this.state.page);
    }
  }
  handleSearch = value => {
    this.setState({ query: value.trim() });
  };

  getPhotos = async (query, page) => {
    try {
      const { per_page, photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      console.log(per_page, photos, total_results);
    } catch (error) {}
  };

  render() {
    return (
      <>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        <SearchForm onSubmit={this.handleSearch} />
      </>
    );
  }
}
