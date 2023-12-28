
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { ListItemProps } from "./definitions";

export function ListView({
  list,
  deleteList,
  deleteListItem,
  itemsChangedHandler  
}: ListItemProps) {
  const [listItemValue, setListitemValue] = useState("");

  return (
    <div key={list.id} className="notice">
      <p>
    <button onClick={() => deleteList(list)}className="float-right">
     Delete List <FaTrash />
      </button>
      &nbsp; <b className="list-item-text">{list.name} </b> 
      </p>
      New Item  &nbsp;  <input
        type="text"
        value={listItemValue}
        placeholder="apples"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          setListitemValue(e.target.value);
        }}
      ></input>
 &nbsp;
      <button
        disabled={listItemValue.length< 1}
        onClick={() => {
          const l = list.items ? list.items.length : 0;
          itemsChangedHandler({ id: l.toString(), name: listItemValue },list.id);
          setListitemValue("");
        }}
      >
        <MdAdd /> Add 
      </button>
      <ol>
        {list.items &&
          list.items.map((item, i) => (
            <li key={i}>
              <p>
              <button onClick={() => deleteListItem(item, list.id)}>
                <FaTrash />
              </button> {item.name}
            </p>
            </li>
          ))}
      </ol>
    </div>
  );
}
