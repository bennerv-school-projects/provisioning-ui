import React from 'react';
import { MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import { isNullOrUndefined } from 'util';

const apiUrl = process.env.REACT_APP_API_URL;

class SaaSCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      error: false,
      errorMessage: null
    };

    this.createSaaS = this.createSaaS.bind(this)
  }

  componentDidMount() { }

  render() {
    let error = null;

    if (this.state.error) {
      error = (
        <MDBAlert color="warning" >
          {this.state.errorMessage}
        </MDBAlert>
      );
    }

    return (
      <div>
        {error}
        <MDBInput id="name" label="Name" onChange={this.updateValue.bind(this, "name")} />
        <div className="d-flex justify-content-between">
          <MDBBtn onClick={this.createSaaS}><i className="fa fa-save mr-2" />Create</MDBBtn>
        </div>
      </div>
    )
  }

  updateValue(key, event) {
    let s = this.state;
    s[key] = event.target.value;
    this.setState(s);
  }

  createSaaS() {
    let regex = new RegExp("^[a-z0-9]([-a-z0-9]*[a-z0-9])?$");

    if (!regex.test(this.state.name)) {
      this.setState({ error: true, errorMessage: 'Name must conform to RFC 1123 (only lowercase alphanumeric chracters, dashes, or periods)' });
      return
    }

    fetch(apiUrl + "/v1/saas", {
      method: 'POST',
      body: JSON.stringify({ "namespace": this.state.name })
    })
      .then((res) => {
        if (res.status < 200 && res.status >= 300) {
          let errorMessage = '';
          if (!isNullOrUndefined(res.text()) || res.text() === '') {
            errorMessage = res.text();
          } else {
            errorMessage = 'Failed to create SaaS - Backend Error';
          }
          this.setState({ error: true, errorMessage: errorMessage });
        } else {
          this.setState({ error: false });
        }
      });
  }

}
export default SaaSCreator;