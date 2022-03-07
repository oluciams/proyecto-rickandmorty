import React from 'react';

export const ListImage = ({image, nameCharacter})=>{ 

  return(
    <div className="row row-cols-1 row-cols-md-2 g-4">  
      <div className="col">
        <div className="card" style={{width: "18rem"}}>
          <img src={image} className="card-img-top" alt="character"/>
          <div className="card-body">          
            <p className="card-text">{nameCharacter}</p>        
          </div>
        </div>
      </div>
    </div>
  )
}