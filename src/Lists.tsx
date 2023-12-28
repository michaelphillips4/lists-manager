import { useState, useEffect, useRef } from "react";
import { IoIosSave } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { List, ListItem } from "./definitions";
import { ListView } from "./List";
const url = "https://4f1nvpq0d8.execute-api.eu-west-2.amazonaws.com/items";
export default function Lists() {
  let defaultValue: List[] = [];
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState(defaultValue);
  const itemsChangedHandler = (item: ListItem, listId: string) => {
    const clone = [...lists];
    const listItem = clone.find((e) => e.id === listId);
    if (listItem !== undefined) {
      if (!listItem.items) {
        listItem.items = [];
      }
      listItem.items.push(item);
      setLists(clone);
      setListName("");
    }
  };

/*   useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLists(json);
      })
      .catch((error) => console.error("fetch error", error));
  }, []); */

  function Save() {
    const body = JSON.stringify(lists)
    console.log(body);
    // Send data to the backend via POST
   /*  fetch(url, { 
      method: 'PUT', 
      body: body // body data type must match "Content-Type" header

    }).then((r) => console.log(r))
    .catch((error) => console.error("fetch PUT error", error)); */
    
  }



  return (
    <>
    <div >
     create new list &nbsp; 
      <input
        type="text"
        value={listName}
        placeholder="shopping list"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                setListName(e.target.value);
        }} 
      ></input>
      &nbsp;
      <button
          disabled={listName.length < 1} 
          onClick={() => {
          const temp = lists;
          temp.push({ name: listName, id: lists.length.toString(), items: [] });
          setLists(temp);
          setListName("");
        }}
      >
        <MdAdd /> Add
      </button>
      </div>
      <br /><br />
        {lists
          .sort((a, b) => Number(b.id) - Number(a.id))
          .map((j) => (
            <div key={j.id} >
              <ListView
                list={j}
                itemsChangedHandler={itemsChangedHandler}
                deleteListItem={(listItem, listId) => {
                  const clone = [...lists];
                  const list = clone.find((e) => e.id === listId);
                  if (list) {
                    const x = list?.items.find((e) => e.id === listItem.id);
                    if (x !== undefined) {
                      const i = list.items.indexOf(x);
                      list.items.splice(i, 1);
                      setLists(clone);
                    }
                  }
                }}
                deleteList={(list) => {
                  const clone = [...lists];
                  const index = clone.indexOf(list);
                  clone.splice(index, 1);
                  setLists(clone);
                }}
              />
            </div>
          ))}
      
 
      <button onClick={Save}>
        <IoIosSave />
        &nbsp; Save
      </button>
    {/*   {lists ? <pre>{JSON.stringify(lists, null, 2)}</pre> : "Loading..."} */}
    </>
  );
}
