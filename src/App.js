import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setNewCategory({ name: "", description: "" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/categories", newCategory).then(() => {
      setCategories([...categories, newCategory]);
      closeForm();
    });
  };

  return (
    <div>
      <h2>Categories</h2>
      <input
        type="text"
        placeholder="Search categories"
        value={searchText}
        onChange={handleSearchChange}
      />
      <button onClick={openForm}>Add Category</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <div>
          <h3>Add Category</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </label>
            <button type="submit">Add</button>
            <button onClick={closeForm}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
