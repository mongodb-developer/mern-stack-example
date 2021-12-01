import React, { useState } from "react";
// This will require to npm install axios
import axios from "axios";
import { useHistory } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    person_name: "",
    person_position: "",
    person_level: "",
  });
  const history = useHistory();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  function onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      person_name: form.person_name,
      person_position: form.person_position,
      person_level: form.person_level,
    };

    axios
      .post("http://localhost:5000/record/add", newperson)
      .then((res) => console.log(res.data))
      .finally(() => {
        // We will empty the state after posting the data to the database
        setForm({ person_name: "", person_position: "", person_level: "" });
        history.push("/");
      });
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name of the person: </label>
          <input
            type="text"
            className="form-control"
            value={form.person_name}
            onChange={(e) => updateForm({ person_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Person's position: </label>
          <input
            type="text"
            className="form-control"
            value={form.person_position}
            onChange={(e) => updateForm({ person_position: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Intern"
              checked={form.person_level === "Intern"}
              onChange={(e) => updateForm({ person_level: e.target.value })}
            />
            <label className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Junior"
              checked={form.person_level === "Junior"}
              onChange={(e) => updateForm({ person_level: e.target.value })}
            />
            <label className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Senior"
              checked={form.person_level === "Senior"}
              onChange={(e) => updateForm({ person_level: e.target.value })}
            />
            <label className="form-check-label">Senior</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
