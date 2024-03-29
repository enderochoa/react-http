import React, {Component} from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
        axios.get('/posts/' + this.props.id)
          .then(response => {
            console.log(response);
            this.setState({
              loadedPost: response.data
            })
          });
      }
    }
  }

  render() {
    const {id} = this.props;
    const {loadedPost} = this.state;

    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
    if (id) {
      post = <p style={{textAlign: 'center'}}>Loading...</p>;
    }
    if (loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete">Delete</button>
          </div>
        </div>

      );
    }
    return post;
  }
}

export default FullPost;