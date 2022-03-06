import React, { useEffect, useState } from 'react';
import { getCharacterApi } from '../utils/api';
const axios = require('axios');

export const Ready = ()=>{

  const [characters, setCharacters] = useState(false);

  const fetchData = async()=>{   
    try {
      const {data} = await getCharacterApi.get('/character')
      console.log(data)         
      setCharacters(data.results)
    } catch (error) {
      console.error(error)      
    } 
  }

  
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="container">
      <section>      
        <h2>Rick and Morty</h2>
        <br/>
        { 
          characters ?
            characters.map((el)=>(
              <li key={el.id}>{el.name}</li>
            ))
            : 
             <p>Loading</p>
        } 
      </section> 
    </div>
  )

}
