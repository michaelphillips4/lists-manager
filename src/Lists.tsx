import { Button } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdAdd } from "react-icons/md";

type List = {
  name: string;
  id: string;
  items: ListItem[];
};

type ListItem = {
  name: string;
};

export default function Lists() {
  let defaultValue: List[] = [];
  const [listName, setListName] = useState("List 0");
  const [listItemValue, setListitemValue] = useState("Item 0");
  const [lists, setLists] = useState(defaultValue);

 
  const deleteHandler = (id: string) => {
   /*  const temp = [...lists];
    temp.splice(i, 1);
    console.log(i, lists, temp);
    setLists(temp); */
  };

  const addListItemHandler = (id: string) => {
    console.log("adding item",id)
    const temp = lists.find((e) => e.id === id);
    if (temp)
    { 
      if(!temp.items)
      {
        temp.items = [];
      }
      temp.items.push({name: listItemValue})
      const index = lists.indexOf(temp);
      lists.splice(index,1);
      lists.push(temp);
      setLists(lists);
        }

  };

  useEffect(() => {
    fetch("https://4f1nvpq0d8.execute-api.eu-west-2.amazonaws.com/items")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLists(json);
      })
      .catch((error) => console.error("fetch error", error));
  }, []);

  return (
    <>
      
      <input
        type="text"
        value={listName}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setListName(e.target.value);
        }}
      ></input>
      &nbsp;
      <Button
        onClick={() => {
          
          const temp = lists;
          temp.push({name : listName , id:"temp",items:[] })
          setLists(temp);
          setListName(`List ${temp.length}`);
        }}
      >
        <MdAdd /> Add New List
      </Button>
      {lists.map((j) => (

        <div key={j.id} className="notice">

          <Button onClick={() => deleteHandler(j.id)}>
                <FaTrash />
          </Button>

          <span className="list-item-text">{j.name} </span>
          <input
        type="text"
        value={listItemValue}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
         setListitemValue(e.target.value);
        }}
      ></input>

          <Button
        onClick={() => addListItemHandler(j.id)}>
  
        <MdAdd /> Add New Item
      </Button>
          <ul>
            {j.items && j.items.map((item,i) =><li key={i}>
              {item.name}
            </li> )}
          </ul>
        </div>
      ))}
      <hr />
      <Button>
        <IoIosSave />
        &nbsp; Save
      </Button>
      {lists ? <pre>{JSON.stringify(lists, null, 2)}</pre> : "Loading..."}
    </>
  );
}
