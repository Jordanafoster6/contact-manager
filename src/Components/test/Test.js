import React, { Component } from "react";

class Test extends Component {
  state = {
    title: "",
    body: ""
  };

  //where to fetch data from api and put it in state
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }

  //componentWillMount() {
  //  console.log('componentWillMount...')
  //}

  //componentDidUpdate() {
  //  console.log('componentDidUpdate...')
  //}

  //componentWillReceiveProps(nextProps, nextState) {
  //  console.log('componentWillReceiveProps...')
  //}

  //static getDerivedStateFromProps(nextProps, prevState) {
  //    return {
  //        test: 'something'
  //    }
  //}

  //getSnapshotBeforeUpdate(prevProps, prevState) {
  //  console.log('getSnapshotBeforeUpdate...')
  //}

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1 className="display-4 mb-4">
          <span className="text-danger">Test</span> Component
        </h1>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
