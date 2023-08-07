import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import GalleryItem from './GalleryItem';

function Gallery (props) {

    const data = props.data.result.read()

    const display = props.data.map((song, i) => 
    <GalleryItem song={song} key={i} />)

    return (
        <div>
            { display }
        </div>
    )
}

export default Gallery;