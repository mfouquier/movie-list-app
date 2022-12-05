import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Image = styled.img`
  width: 20rem;
  height: 30rem;
  padding: 0.5rem;
`
const ImageCard = styled.div`
  justify-content: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 24px;
  text-align: center;
`
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5rem;
`
const Search = styled.input`
  width: 75%;
  height: 75%;
`
const Button = styled.button`
  background-color: green;
  color: white;
  border-radius: 5px;
  width: 10%;
  height: 75%;
`
const AddButton = styled.button`
  background-color: green;
  color: white;
  border-radius: 5px;
  margin-top: 1rem;
  width: 10%;
  margin-left: 8rem;
  height: 75%;
`
const SearchContainer = styled.div`
  display: flex;
  margin: 1rem;
  justify-content: center;
  height: 3rem;
`
const AddMovieContainer = styled.div`
   display: grid;
   grid-template-columns: 1;
   grid-template-rows: 100px, auto;
  
`
const InputField = styled.input`
  width: 30%;
  height: 80%;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
`
const InputLabel = styled.label`
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 20px;
  margin: 0.5rem;
`


export default function Home() {
  const [movieData, setMovieData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [addMovie, setAddMovie] = useState({
    title: '',
    image: ''
  })

  useEffect(() => {
    async function getMovieData() {
      const response = await fetch('http://localhost:3001');
      const data = await response.json();
      setMovieData(data)
    }
    getMovieData()
  }, [])

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleAddMovieChange = (event) => {
    const value = event.target.value
    console.log(event)
    setAddMovie({
      ...addMovie,
      [event.target.name]: value
    })
  }
  console.log(addMovie)

  async function submitSearch() {
    try {
      const response = await fetch(`http://localhost:3001?title=${searchValue}`);
      const data = await response.json();
      setMovieData(data)
    } catch (err) {
      console.log(`Search error ${err}`)
    }
  }

  async function addMovieToDb() {
    try {
      axios.post('http://localhost:3001', addMovie)
        .then(function (response) {
          console.log(response)
        })
    } catch (err) {
      console.log(`Could not add movie ${err}`)
    }
  }

  return (

    <>
      <SearchContainer>
        <Search
          type="search"
          name='q'
          placeholder='Search Movie Title'
          onChange={handleSearchChange}>
        </Search>
        <Button type='submit' onClick={submitSearch}>Submit</Button>
      </SearchContainer>

      <AddMovieContainer>
        <InputLabel htmlFor='title'>Movie Title</InputLabel>
        <InputField
          type='text'
          name='title'
          value={addMovie.title}
          onChange={handleAddMovieChange}>
        </InputField>
        <InputLabel htmlFor='imageUrl'>Movie Image URL</InputLabel>
        <InputField
          type='text'
          name='image'
          value={addMovie.image}
          onChange={handleAddMovieChange}>
        </InputField>
        <AddButton type='submit' onClick={addMovieToDb}>Submit</AddButton>
      </AddMovieContainer>


      <Container>
        {movieData.map((movie, idx) => (
          <>
            <ImageCard key={movie.id}>
              <h4>{movie.title}</h4>
              <Image src={movie.image} alt={movie.title} />
            </ImageCard>
          </>
        ))}
      </Container>
    </>

  );
}