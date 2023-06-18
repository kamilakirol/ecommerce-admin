"use client";

import { useState } from "react";
import axios from "axios";

export default function Categories() {
  const [name, setName] = useState("");

  async function saveCategory(e) {
    e.preventDefault();
    await axios.post("/api/categories", { name });
    setName("");
  }
  return (
    <>
      <h1>Categories</h1>
      <label>New category name</label>

      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={"Category name"}
          className="my-0"
        />
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
    </>
  );
}
