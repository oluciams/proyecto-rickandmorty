import React from 'react';

export const ListImage = ({image, nameCharacter})=>{ 

  return(

    <div className="mt-3 mb-3">
      <div className="card" style={{width: "18rem"}}>
        <img src={image} className="card-img-top" alt="character"/>
        <div className="card-body">          
          <h5 className="card-text">{nameCharacter}</h5>        
        </div>
      </div>
    </div>
     
    
  )
}