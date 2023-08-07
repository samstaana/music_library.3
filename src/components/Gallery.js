import GalleryItem from './GalleryItem';

function Gallery (props) {

    const display = props.data.map((song, index) => 
    <GalleryItem song={song} key={index} />)

    return (
        <div>
            { display }
        </div>
    )
}

export default Gallery;