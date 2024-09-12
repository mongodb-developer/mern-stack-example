import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50">
    <td className="p-4 align-middle">
      <div className="flex items-center gap-7">
        <input
          type="checkbox"
          checked={props.selectedRecords.includes(props.record._id)}
          onChange={() => props.handleCheckboxChange(props.record._id)}
        />
        {props.record.name}
      </div>
    </td>
    <td className="p-4 align-middle">{props.record.position}</td>
    <td className="p-4 align-middle">{props.record.level}</td>
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          onClick={() => props.deleteRecord(props.record._id)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);


export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  const closeModal = () => setOpen(false);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }


  // this method will delete selected records
  async function deleteSelectedRecords() {
    Promise.all(selectedRecords.map((id) => fetch(`http://localhost:5050/record/${id}`, { method: "DELETE" })))
      .then(() => {
        setRecords(records.filter((record) => !selectedRecords.includes(record._id)));
        setSelectedRecords([]); // Clear selection after deletion
        closeModal();
      })
      .catch(error => console.error('Error deleting records:', error));
  }

  function handleCheckboxChange(id) {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter((item) => item !== id));
    } else {
      setSelectedRecords([...selectedRecords, id]);
    }
  }

  // This method will map out the records on the table
  function recordList() {
    return records
      .filter((record) =>
        (record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.position.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (selectedLevel === "" || record.level === selectedLevel)
      )
      .map((record) => {
        return (
          <Record
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
            handleCheckboxChange={handleCheckboxChange}
            selectedRecords={selectedRecords}
            key={record._id}
          />
        );
      });
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Employee Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
            <div className="p-4">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="🔍 Search by name or position"
                className="border rounded-md p-2 w-3/12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            <button
              className="ml-2 border rounded-md p-2 bg-blue-500 text-white hover:bg-blue-700"
              onClick={() => setSearchQuery(searchQuery)}
            >
             Search
           </button>
           <div className="relative mt-4">
              <select
                className="border rounded-md p-2 w-3/12"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Filter by Level</option>
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>
            <table className="w-full text-sm">
            <thead>
            <tr className="border-b">
                <th className="px-4 text-left align-middle font-medium">Name</th>
                <th className="px-4 text-left align-middle font-medium">Position</th>
                <th className="px-4 text-left align-middle font-medium">Level</th>
                <th className="px-4 text-left align-middle font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {recordList()}
            </tbody>
          </table>
        </div>
      </div>
      <button
        className="mt-3 mb-3 inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
        onClick={() => setOpen(true)}
      >
        Delete Selected
      </button>
      <Popup
  open={open}
  closeOnDocumentClick
  onClose={closeModal}
  modal
  nested
  contentStyle={{ width: "auto", maxWidth: "600px", padding: "30px", borderRadius: "8px" }} // Increased max-width and padding
  overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
  position="center center"
>
  <button
    style={{ position: "absolute", top: "10px", right: "10px", border: "none", background: "transparent", fontSize: "16px", cursor: "pointer" }}
    onClick={closeModal}
  >
    X
  </button>
  <div className="modal">
    <div className="header" style={{ fontSize: "15px", marginBottom: "15px", textAlign: "center", padding: "20px 0" }}> 
      Are you sure you want to delete the selected Records?
    </div>
    <div className="actions" style={{ textAlign: "center" }}>
      <button
        className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-7 rounded-md px-2"
        onClick={deleteSelectedRecords}
        style={{ marginRight: "10px", fontSize: "14px" }}
      >
        Yes
      </button>
      <button
        className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-7 rounded-md px-2"
        onClick={closeModal}
        style={{ fontSize: "14px" }}
      >
        No
      </button>
    </div>
  </div>
</Popup>
    </>
  );
  }
