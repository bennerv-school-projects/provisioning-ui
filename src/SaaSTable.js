import React from 'react';
import './SaaSTable.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';


const apiUrl = process.env.REACT_APP_API_URL;

class SaaSTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: false,
      items: []
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetch(apiUrl + "/v1/saas")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
            console.log(result)
          },

          (error) => {
            this.setState({
              isLoaded: true,
              error: true
            });
          }
        )
    }, 5000);

  }

  loadData() {

  }

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return this.renderSpinner()
    } else {
      let tableData = this.generateTableData()
      return (
        <MDBTable
          striped
          bordered
          hover
          btn
          responsiveMd>
          <MDBTableHead columns={tableData.columns} />
          <MDBTableBody rows={tableData.rows} />
        </MDBTable>
      );
    }
  }

  renderSpinner() {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary mt-5" role="status" style={{ "width": "5em", "height": "5em" }}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  generateTableData() {
    let data = {
      columns: [
        {
          label: 'Name',
          field: 'saasName',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Status',
          field: 'saasStatus',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Error Message',
          field: 'saasError',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Username',
          field: 'saasUsername',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Password',
          field: 'saasPassword',
          sort: 'asc',
          width: 100
        },
        {
          label: 'URL',
          field: 'saasUrl',
          sort: 'asc',
          width: 100
        },
        {
          sort: 'disabled',
          field: 'manage',
          label: 'Manage'
        }
      ]
    }
    let rows = [];
    for (let i in this.state.items) {
      let saas = this.state.items[i];
      rows.push({
        saasName: saas.name,
        saasStatus: saas.status,
        saasError: saas.error,
        saasUsername: saas.username,
        saasPassword: saas.password,
        saasUrl: saas.saasUrl,
        manage: <div><MDBBtn color="red" size="sm"><i className="fa fa-edit" />Delete</MDBBtn></div>
      });
    }
    data.rows = rows;
    return data;
  }

  deleteByNamespace(namespace) {
    this.setState({ isLoading: true });
    // TODO: Delete the namespace 
  }


}

export default SaaSTable;