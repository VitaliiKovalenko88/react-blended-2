import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    pics: [],
    isEmpty: false,
    shouldBeVisible: false,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }

  handleSearch = value => {
    this.setState({ query: value.trim(), page: 1, pics: [], isEmpty: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getPhotos = async (query, page) => {
    if (!query) return alert('Enter something!');

    this.setState({ isLoading: true });

    try {
      const { per_page, photos, total_results } = await ImageService.getImages(
        query,
        page
      );

      // console.log(per_page, photos, total_results);

      if (total_results === 0) this.setState({ isEmpty: true });

      this.setState(prevState => ({
        pics: [...prevState.pics, ...photos],
        shouldBeVisible: page < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { pics, isEmpty, shouldBeVisible, isLoading } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSearch} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isLoading && <div>Завантажуємо...</div>}
        {pics.length > 0 && (
          <Grid>
            {pics.map(({ id, avg_color, alt, src: { large } }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
          </Grid>
        )}
        {shouldBeVisible && (
          <Button onClick={this.onLoadMore}>Load more...</Button>
        )}
      </>
    );
  }
}
