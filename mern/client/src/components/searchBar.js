import React, { useState } from "react";
import { useNavigate } from "react-router";
const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5000'

export default function SearchBar({setRecords}) {
  const [form, setForm] = useState({
   searchTerm : null
  });


  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newSearch = { ...form };
    try {
      const response = await fetch(`${BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSearch),
    })
    const records = await response.json();
    // setForm({ name: "", position: "", level: "" });
    setRecords(records);
    }
    catch(e){
      window.alert("Error : " + e);
      return;
    }
   
    //navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="searchTerm"
            value={form.searchTerm}
            onChange={(e) => updateForm({ searchTerm: e.target.value })}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
