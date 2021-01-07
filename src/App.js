import React ,{useEffect,useState} from 'react'
import Message from './Message';
import Budget from "./Budget";
import Total from "./Total";
const getLocalStorage = ()=>{
const list = localStorage.getItem("list");
if(list){
return JSON.parse(localStorage.getItem("list"));

}

else {
  return []
}
}
function App() {
const [name,setName] = useState("");
const [amount,setAmount] = useState("");
const [budget,setBudget] = useState(getLocalStorage());
const [isEditing,setIsEditing] = useState(false);
const [editId,setEditId] = useState(null);
const [alert,setAlert] = useState({show:false,variant:"",message:""})


const showAlert = (show= false,variant="",message="")=>{
setAlert({show,variant,message})
setTimeout(()=>{
setAlert({show:false,variant:"",message:""})
},2000)
}

const removeItem = (id)=>{
  showAlert(true,"danger","budget deleted")
setBudget(budget.filter((item)=>item.id !== id))

}

const editItem = (id)=>{
  const item = budget.find((it)=>it.id === id);
  const {id:edId,name,amount} = item;
setIsEditing(true)
setEditId(edId);
setName(name)
setAmount(amount)


}

  const addBudget = (item)=>{

setBudget([item,...budget]);
  }




  const handleSubmit = (e)=>{
e.preventDefault();
console.log(name,amount)
if(!name && !amount){
  showAlert(true,"danger","please write an input")
}


else if (isEditing && name && amount){
// console.log("edit this")
setBudget(budget.map((item)=>{
if(item.id === editId){
return {...item,name,amount:parseInt(amount)}
}
return item

}))
showAlert(true,"success","budget edited");
setIsEditing(false)
setEditId(null);
setName("")
setAmount("")
}
else {showAlert(true,"success","budget added")
const newItem = {id:new Date().getTime().toString(),name,amount:parseInt(amount)};
addBudget(newItem);
  setName("")
  setAmount("")}


  }

useEffect(()=>{
localStorage.setItem("list",JSON.stringify(budget))
},[budget])
  return <main>
<section>
  <div className="container">
    <div className="row align-items-center justify-content-center text-center">
<h4 className="text-capitalize">budget app</h4>
    </div>
       <div className="row align-items-center justify-content-center text-center">
{alert.show && <Message {...alert} ></Message>}
    </div>
    <div className="row align-items-center justify-content-center h-100">

      <div className="col-10 mx-auto col-md-10 ">
  <form  onSubmit={handleSubmit}>
<div className="row">
  <div className="col-6">
    <label htmlFor="name">charge</label>
<input type="text" className="name w-100 form-inp" placeholder="e.g rent" value={name} onChange={(e)=>setName(e.target.value)}/>
  </div>

    <div className="col-6">
  <label htmlFor="name">amount</label>
<input type="text" className="amount w-100 form-inp" placeholder="e.g 100" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
  </div>

</div>
<div className="row text-center">
  <button className="btnn " type="submit">{isEditing?"edit":"submit"}</button>
</div>
  </form>

{budget.length > 0 && (<div className="text-center py-3">
  
  
      <div>
<Budget list = {budget} removeItem = {removeItem} editItem = {editItem}></Budget>
      </div>

<button className="btnn my-2" onClick={()=>setBudget([])}>clear budget</button>

<Total list = {budget}></Total>
  
</div>)}

</div>


      </div>


    </div>
</section>





  </main>
    
     
}

export default App
