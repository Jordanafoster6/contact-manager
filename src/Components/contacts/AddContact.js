import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({ type: "ADD_CONTACT", payload: res.data });

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
                <span className="text-danger">Add</span> Contacts
              </h1>
              <div className="card mb-3">
                <div className="card-header">Add Contact</div>
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
                      value="Add Contact"
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

export default AddContact;
