import React, { useEffect, useState } from 'react';
import { getCharacterApi } from '../utils/api';
import {ListImage} from './ListImage';

const axios = require('axios');

export const Home = ()=>{

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
      <section >      
        <h2>Rick and Morty</h2>
      </section> 
      <section className="row row-cols-4">
        { 
          characters ?
            characters.map(({id, image, name})=>              
              <ListImage
                key={id}
                image={image}
                nameCharacter={name}
              />
            )
          : 
            <p>Loading</p>
        }
      </section>
    </div>
  )
}



