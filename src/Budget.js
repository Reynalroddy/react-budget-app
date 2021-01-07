import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
const Budget = ({list,editItem,removeItem}) => {
  return <ul className="list-group">
  {
list.map((item)=>{
    const {id,name,amount} = item;
  return  <li className="list-group-item d-flex justify-content-between align-items-center" key={id}>
   {name} 
   <span>{amount}</span>
   <div>
        <span className="badge bg-warning text-white rounded-pill mx-1" onClick={()=>editItem(id)}><FaEdit></FaEdit></span>
    <span className="badge bg-warning text-white rounded-pill" onClick={()=>removeItem(id)}><FaTrash></FaTrash></span>
   </div>
   
  </li>

})

  
}
  </ul>
}

export default Budget
