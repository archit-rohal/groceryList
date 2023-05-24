// Create a list of Grocery list items with checkboxes and as the user checks out the item those checked-out items should be listed in another section named ‘Completed list’. Add the list of items via an input field.
import { useEffect, useRef, useState } from "react";

const GroceryList = () => {
  const [itemsList, setItemsList] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [completedList, setCompletedList] = useState([]);
  const refElement = useRef("");
  const handleChange = (e) => {
    e.preventDefault();
    setNewItem(e.target.value);
  };
  const handleClick = () => {
    if (newItem !== "") {
      const id = Math.floor(Math.random() * 1000000);
      setItemsList([...itemsList, { id, name: newItem }]);
      setNewItem("")
      refElement.current.focus();
    } else {
      console.error("Enter an item please.");
    }
  };
  const handleCheckbox = (e) => {
    const itemId = parseInt(e.target.value, 10);
    const itemIndex = itemsList.findIndex((item) => item.id === itemId);
    const filteredItems = [...itemsList];
    filteredItems.splice(itemIndex, 1);
    setItemsList(filteredItems);
    const completedItem = itemsList.find((item) => item.id === itemId);
    setCompletedList([...completedList, completedItem]);
  };
  useEffect(() => {
    refElement.current.focus();
  })
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Grocery List</h2>
      <label htmlFor="itemInput">
        Add item:
        <input
          ref={refElement}
          type="text"
          id="itemInput"
          value={newItem}
          placeholder="Enter item"
          onChange={handleChange}
        />
        <button type="button" onClick={handleClick}>
          Add
        </button>
      </label>
      <div style={{ marginTop: "4rem" }}>
        <ul>
          {itemsList.map((item) => (
            <label htmlFor="items" key={item.id}>
              <li >
                <input
                  id="items"
                  type="checkbox"
                  value={item.id}
                  onChange={handleCheckbox}
                />
                {item.name}
              </li>
            </label>
          ))}
        </ul>
      </div>
      <div>
        <h2>Completed List</h2>
        <ul>
          {completedList.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroceryList;
