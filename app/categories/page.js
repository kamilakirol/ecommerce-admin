"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
      setParentCategory("");
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

  function deleteCategory(category) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${category.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#626B76",
      confirmButtonText: "Yes, delete!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete("/api/categories?_id=" + _id);
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchCategories();
      }
    });
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
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
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
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parentCategory?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
