import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import useSWR from 'swr';


function App() {
  const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  };
  const { data, error } = useSWR('https://pokeapi.co/api/v2/pokemon', fetcher);
 

  return (
    <div>
    {error && <div>Error loading Pokemon</div>}
    {!data && <div>Loading Pokemon...</div>}
    {data && (
      <ul>
        {data.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    )}
  </div>
   
  )
}

export default App
