import { Button } from "@aws-amplify/ui-react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdAdd } from "react-icons/md";


export default function List() 
{
    let x : string[]=[];
    const [listName,setListName] = useState("item 0");
    const [lists,setLists] = useState(x);
   
const deleteHandler = (i:number)=>
{
  
    const temp = [...lists];
    temp.splice(i,1);
    console.log(i,lists,temp);
    setLists(temp);
}

return <>

<input type="text" value={listName}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => 
            {setListName(e.target.value); }}
            ></input>&nbsp;
             <Button onClick={() => {
               const temp = [...lists,listName];
               setLists(temp);
               setListName(`item ${temp.length}`);
            }}><MdAdd /> Add New </Button>


  
            {lists.map((j, index) => 
            <div key={index} className="notice">
                <Button onClick={()=>deleteHandler(index)}> <FaTrash /> </Button><span className="list-item-text">{j}</span></div>)}
   
<hr />
<Button><IoIosSave />&nbsp; Save</Button>
</>

}