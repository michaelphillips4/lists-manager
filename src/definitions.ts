export type List ={
    name: string;
    id: string;
    items: ListItem[];
    
  };
  
 export  type ListItem = {
    name: string;
    id:string;
  };

  export interface ListItemProps{
    list : List,
    deleteList : (list:List) => void
    deleteListItem : (item:ListItem,listId:string) => void
    itemsChangedHandler : (items:ListItem,listId:string) => void
   

  }  