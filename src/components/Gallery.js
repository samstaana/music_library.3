import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import GalleryItem from './GalleryItem';

function Gallery () {

    const data = useContext(DataContext)
    const myData = data.result.read()

    const display = myData.map((song, i) => 
    <GalleryItem song={song} key={i} />)

    return (
        <div>
            { display }
        </div>
    )
}

export default Gallery;