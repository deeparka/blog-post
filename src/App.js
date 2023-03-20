import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import Categories from './components/Categories';
import Posts from './components/Posts';
import PostForm from './components/PostForm';

import { getCategories } from './categories_api';

class App extends Component {
  state = {
    categories: [],
    selectedCategory: { code: 'all', name: 'All' }
  }

  componentDidMount() {
    getCategories()
      .then((categories) => {
        this.setState({ categories: categories });
      })
      .catch((error) => {
        console.log('Get categories failed!');
        console.log('Error:', error);
      });
  }

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Nav />

          <Route path="/posts/form" render={() => {
            return <PostForm categories={this.state.categories} />
          }} />
          <Route path="/posts" exact render={() => {
            return (
              <div className="row">
                <Categories
                  categories={this.state.categories}
                  onCategorySelect={this.handleCategorySelect}
                />
                <Posts
                  categories={this.state.categories}
                  selectedCategory={this.state.selectedCategory}
                />
              </div>
            );
          }} />
          <Route path="/" exact component={Home} />

        </div>
      </BrowserRouter>
    );
  }
};

export default App;
