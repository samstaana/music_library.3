import './App.css';
import { Fragment, useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import { DataContext } from './context/DataContext';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import { createResource as fetchData } from './helper';
import Spinner from './components/Spinner';

function App() {

  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState('Search for Music!')
  const [ data, setData ] = useState(null)

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

  const renderGallery = () => {
    if(data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data = {data} />
        </Suspense>
        
      )
    }
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={
            <Fragment>
              <SearchBar handleSearch = {handleSearch} />
              { message }
              { renderGallery() }
            </Fragment>
          } />
          <Route path="/album/:id" element={<AlbumView />}/>
          <Route path="/artist/:id" element={<ArtistView />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
