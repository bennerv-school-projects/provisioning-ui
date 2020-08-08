import React from 'react'
import { MDBNavbar, MDBNavbarBrand, MDBIcon } from 'mdbreact'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }


  render() {
    return (
      <div id="navBar">
        <MDBNavbar color="default-color" dark expand="lg">
          <MDBNavbarBrand>
            <strong className="white-text">Order <MDBIcon icon="cat" size="lg" />eow</strong>
          </MDBNavbarBrand>
        </MDBNavbar>
      </div>
    );
  }
}


export default NavBar;