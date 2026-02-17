import { useState } from "react";
import api from "../services/api";

export default function Upload() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const form = new FormData();
    form.append("title", document.getElementById("title").value);
    form.append("subject", document.getElementById("subject").value);
    form.append("description", document.getElementById("desc").value);
    form.append("tags", document.getElementById("tags").value);
    form.append("privacy", document.getElementById("privacy").value);
    form.append("file", file);

    await api.post("/resources/upload", form);
    alert("Uploaded Successfully");
  };

  return (
    <div className="container">
      <h2>📤 Upload Resource</h2>
      <input id="title" placeholder="Title" />
      <input id="subject" placeholder="Subject" />
      <textarea id="desc" placeholder="Description" />
      <input id="tags" placeholder="Tags (comma separated)" />
      <select id="privacy">
        <option>Public</option>
        <option>Private</option>
      </select>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
      <button onClick={upload}>Upload</button>
    </div>
  );
}
