import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from './searchBar.js'
const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5000'

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    

    getRecords();

    return; 
  }, []);
  async function getRecords() {
    const response = await fetch(`${BASE_URL}/record/`);

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    setRecords(records);
  }
  // This method will delete a record
  async function deleteRecord(id) {
    try {
      /*
        Please remove once implement mern/server/routes/record.js lines 74
      */
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
      });
    
      if (response.status === 404) {
        alert('Please implement the mongodb delete method. Please visit "mern/server/routes/record.js" on line 74. This is where the delete endpoint should reside');
      } else {
        await getRecords();
      }
    }
    catch(e) {
      alert("Error : " + e)
    }
  }

  // This method will map out the records on the table
  function recordList() {
    if (records.length === 0) return <div>No Records Yet</div>
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <SearchBar setRecords={setRecords} />
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
