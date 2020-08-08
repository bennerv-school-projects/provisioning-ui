import React from 'react';
import './SaaSTable.css';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { isNullOrUndefined } from 'util';


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

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return this.renderSpinner()
    } else {
      let tableData = this.generateTableData()
      return (
        <div id="saasTable">
          <MDBTable
            responsive
            striped
            bordered
            hover
            btn
          >
            <MDBTableHead columns={tableData.columns} />
            <MDBTableBody rows={tableData.rows} />
          </MDBTable>

        </div>
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
      let namespace = saas.name
      let status = saas.status
      let disabled = true
      if (!isNullOrUndefined(status)) {
        if (status === "Completed" || status === "Failed") {
          disabled = false
        }
      }


      rows.push({
        saasName: saas.name,
        saasStatus: saas.status,
        saasError: saas.error,
        saasUsername: saas.username,
        saasPassword: saas.password,
        saasUrl: saas.saasUrl,
        manage: <div>
          <MDBBtn
            onClick={() => {
              this.deleteByNamespace(namespace);
            }}
            disabled={disabled}
            color="danger"
            size="sm">
            Delete
            </MDBBtn>
        </div>
      });
    }
    data.rows = rows;
    return data;
  }

  deleteByNamespace(namespace) {
    this.setState({ isLoading: true });
    fetch(apiUrl + "/v1/saas", {
      method: 'DELETE',
      body: JSON.stringify({ "namespace": namespace })
    })
      .then(res => res.text())
      .then(res => console.log(res))
  }


}

export default SaaSTable;