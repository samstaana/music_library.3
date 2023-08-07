import './App.css';
import { useEffect, useState } from 'react';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';

function App() {
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ message, setMessage ] = useState('Search for Music!')
  const [ data, setData ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      document.title = `${searchTerm} Music`
      const response = await fetch('https://itunes.apple.com/search?term=the%20grateful%20dead')
      const resData = await response.json()
      if (resData.results.length > 0) {
        setData(resData.results)
      } else {
        setMessage('Not Found')
      }
    }
    fetchData()
  }, [ searchTerm ])

  return (
    <div className="App">
      <SearchBar />
      { message }
      <Gallery />
    </div>
  );
}

export default App;
