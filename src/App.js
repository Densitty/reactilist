import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const defaultAlert = {
  show: false,
  msg: "",
  type: ``,
};

const getItemsFromLS = () => {
  let list = localStorage.getItem("list");

  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getItemsFromLS);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState(defaultAlert);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "danger", "please input a value for your item");
    } else if (name && isEditing) {
      /* if there is a name and the btn is eidt, edit the selected item */

      /* set the list to loop through the list item */
      setList(
        list.map((item) => {
          // console.log(item);
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "item has been successfully edited");
    } else {
      /* if there is a name and the btn is submit add item to list */
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };
      const newList = [...list];
      // console.log(list);
      newList.push(newItem);
      setList(newList);
      showAlert(true, "success", "item has been successfully added");
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "you now have an empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed from list");

    const itemIndex = list.findIndex((item) => {
      return item.id === id;
    });

    const newList = [...list];
    newList.splice(itemIndex, 1);
    setList(newList);
  };

  const editItem = (id) => {
    const item = list.find((item) => {
      return item.id === id;
    });

    setIsEditing(true);
    setEditID(id);
    setName(item.title);
    // console.log(item);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <div className="grocery-container">
        <form action="" className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} alert={showAlert} list={list} />}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g tomatoes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              clear items
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
