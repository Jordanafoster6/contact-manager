import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Consumer } from "../../Context";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false,
    expandIcon: false
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo, expandIcon } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                      expandIcon: !this.state.expandIcon
                    })
                  }
                >
                  {expandIcon ? "-" : "+"}
                </span>
                <i
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  className="fas fa-user-times mt-1"
                />
                <Link
                  to={`contact/edit/${id}`}
                  style={{ cursor: "pointer", float: "right", color: "black" }}
                >
                  <i className="fas fa-pencil-alt mr-3" />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
