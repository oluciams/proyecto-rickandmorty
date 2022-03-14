import React, { useEffect, useState } from 'react';
import { getCharacterApi } from '../utils/api';
import {ListImage} from './ListImage';

const axios = require('axios');

export const Home = ()=>{

  const [characters, setCharacters] = useState(false);
  const [searchCharacter, setSearchCharacter] = useState('');
  const [pageNext, setPageNext] = useState('');
  const [pagePrev, setPagePrev] = useState(null);
  const [numPage, setNumPage] = useState(1);
  const [pages, setPages] = useState('');


  const pagination = (data)=>{
    setCharacters(data.results)
    setPageNext(data.info.next)
    setPagePrev(data.info.prev)  
  }
  
  const fetchData = async(actionButton)=>{ 
    try {

      if(!actionButton){
        const {data} = await getCharacterApi.get('/character')
          pagination(data);
          setPages(data.info.pages)
          
      } else if (actionButton === 'next'){ 
          const {data} = await axios.get(pageNext)
            pagination(data);
            setNumPage(numPage + 1)             
          
      } else if (actionButton === 'prev') {
          const {data} = await axios.get(pagePrev)
            pagination(data)
            setNumPage(numPage - 1)         
      } 
    } catch (error) {
      console.error(error)      
    } 
  }

  const handleSearchCharacter = (e)=>{
    let search1 = e.target.value  
    setSearchCharacter(search1)
  } 

  
  useEffect(() => {
    fetchData()
  }, []);

  if(!characters) return <h4>Loading . . . </h4>

  return (
    <div className="container">
      <section >      
        <h2>Rick and Morty</h2>                
        <div>        
          <input 
            className="form-control-lg me-2"
            type="text"
            placeholder="Search character"
            value={searchCharacter}
            onChange={handleSearchCharacter}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>           
        </div>     
      </section> 
      <section className="row row-cols-sm-2 row-cols-md-4">
        {characters

          .filter(character => character.name.match(new RegExp(searchCharacter, "i")))

          .map(({id, image, name})=>              
            <ListImage
              key={id}
              image={image}
              nameCharacter={name}
            />
          ) 
        }
      </section>
      <section className="mb-5">
        <div className="d-flex justify-content-start gap-3">
          <div>                             
            <button type="button" className="btn btn-outline-dark fw-bold" id="prev" onClick={() => fetchData('prev')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Prev
            </button>
          </div>
          <div className="align-items-center fs-5 fw-bold mt-1">
            <p>{numPage} of {pages}</p>       
          </div> 
          <div>                  
            <button type="button" className="btn btn-outline-dark fw-bold" id="next" onClick={()=>fetchData('next')}>
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </svg>
            </button>
          </div>       
        </div>
      </section>
    </div>
  )
}