import React from 'react';

import PostForm from './PostForm';
import PostDetails from './PostDetails';
import { getPosts, addPost, deletePost } from '../posts_api';

class Posts extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

  }

  componentDidMount() {
    getPosts()
      .then((posts) => {
        this.setState({ posts: posts });
      })
      .catch((error) => {
        console.log('Get posts failed!');
        console.log('Error:', error);
      });
  }

  handleNewPost = (post) => {
    addPost(post)
      .then((newPost) => {
        this.setState((prevState) => {
          return { posts: [...prevState.posts, newPost] }
        });
      })
      .catch((error) => {
        console.log('Add post failed!');
        console.log('Error:', error);
      });
  }

  generateId(posts) {
    const newId = posts.length === 0 ? 1 : posts[posts.length - 1].id + 1;
    return newId;
  }

  handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        this.setState((prevState) => {
          const filteredPosts = prevState.posts.filter((post) => {
            return post.id !== id;
          });

          return { posts: filteredPosts };
        });
      })
      .catch((error) => {
        console.log('Delete post failed!');
        console.log('Error:', error);
      });
  }

  renderPosts() {
    const filteredPosts = this.props.selectedCategory.code === 'all'
      ? this.state.posts
      : this.state.posts.filter((post) => {
        return post.category === this.props.selectedCategory.code
      });

    return (
      <div className="col-sm-7">
        <h4>Posts</h4>
        <h5>Category: {this.props.selectedCategory.name}</h5>
        {filteredPosts.map((post) => {
          return <PostDetails key={post.id} post={post} onDelete={this.handleDelete} />
        })}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderPosts()}
        <PostForm categories={this.props.categories} onNewPost={this.handleNewPost} />
      </React.Fragment>
    );
  }

}

export default Posts;
