import React from 'react'

const Total = ({list}) => {
    return  <h4>
   $
{
    list.reduce((acc,curr)=>{
return (acc += curr.amount);

    },0)
}
    </h4>
}

export default Total
