import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    const updateContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updateContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    //clear state
    this.setState({
      name: "",
      email: "",
      phone: ""
    });

    //redirect
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div>
              <h1 className="display-4">
                <span className="text-danger">Edit</span> Contact
              </h1>
              <div className="card mb-3">
                <div className="card-header">Edit Contact</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      label="Name"
                      name="name"
                      type=""
                      placeholder="Enter Name"
                      value={name}
                      onChange={this.onChange}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={this.onChange}
                    />
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      type=""
                      placeholder="Enter Phone Number"
                      value={phone}
                      onChange={this.onChange}
                    />

                    <input
                      type="submit"
                      value="Update Contact"
                      className="btn btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
