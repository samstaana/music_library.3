import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import { DataContext } from './context/DataContext';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';

function App() {

  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState('Search for Music!')
  const [ data, setData ] = useState([])

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if(search) {
      const fetchData = async () => {
        document.title = `${search} music`
        const response = await fetch(API_URL + search)
        const resData = await response.json()
        if (resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [ search ])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      { message }
      <DataContext.Provider value={data}>
        <Gallery data={data} />
        <AlbumView />
        <ArtistView />
      </DataContext.Provider>
    </div>
  )
}

export default App;
