"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [name, setName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }

    setName("");
    fetchCategories();
  }

  async function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parentCategory?._id);
  }

  return (
    <>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category "}
      </label>

      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={"Category name"}
          className="my-0"
        />
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="my-0"
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parentCategory?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button className="btn-primary">Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
