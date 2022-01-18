import React, { useState, useRef } from 'react';
import { Button, Col, Form, Row, FormControl, Card } from 'react-bootstrap';
import useGet from '../hooks/useGet';
import Logo from '../assets/LogoMarca1.svg';
import '../css/music_search.css';
import { ErrorAlert } from '../hooks/error';

function Tracks({ data, logo }) {
    const [error, setError] = useState(null);
    const value = useRef();
    const card = useRef();
    const [lyric, setLyric] = useState()
    let { apiData } = useGet();
    const ShowLyric = () => {
        if (value.current.style.display === 'none') {
            value.current.style.display = 'block';
            card.current.classList.add('col-12')
        } else {
            value.current.style.display = 'none';
            card.current.classList.remove('col-12')
        }
    }
    apiData(`https://api.lyrics.ovh/v1/${data.strArtist}/${data.strTrack}`)
        .then(res => {
            if (res.ok === false) setError({
                error: true,
                status: res.status,
                statusText:
                    (!res.statusText
                        ? 'Ocurrio un error'
                        : res.statusText),
                type: res.type,
                url: res.url
            });
            if (res.track === null) setError({
                error: true,
                status: 'Por favor verifica que el nombre del Artista o Grupo está bien escrito',
                statusText: 'No se encontro el Artista o Grupo',
            });
            if (res.lyrics) {
                setLyric(res.lyrics)
            }
        })
    return (
        <Card ref={card} className='col-6' style={{ height: 'max-content' }}>
            <Card.Img variant="top" src={logo} alt={data.strAlbum} />
            <Card.Body className='row'>
                <Col >
                    <Card.Title>{data.strTrack}</Card.Title>
                </Col>
                <Card.Subtitle className="mb-2  text-muted">{data.strAlbum}</Card.Subtitle>
                <Col className="align-self-end">
                    <Card.Subtitle className="mb-2  text-muted">Genre: {data.strGenre}</Card.Subtitle>
                    {
                        error ?
                            (
                                <ErrorAlert error={error} />
                            ) : (
                                <Card.Text ref={value} className='text-center' style={{ display: 'none', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: lyric }} />
                            )
                    }
                    <Button variant="outline-dark" onClick={ShowLyric}>Lyrics</Button>
                </Col>
            </Card.Body>
        </Card>
    )
}



function Albums({ data, track, logo, show }) {
    const [error, setError] = useState(null)
    let { apiData } = useGet();
    const LoadTracks = (e) => {
        show({ load: true })
        apiData(`https://theaudiodb.com/api/v1/json/2/track.php?m=${e.target.dataset.id}`)
            .then(res => {
                if (res.ok === false) setError({
                    error: true,
                    status: res.status,
                    statusText:
                        (!res.statusText
                            ? 'Ocurrio un error'
                            : res.statusText),
                    type: res.type,
                    url: res.url
                });
                if (res.track === null) setError({
                    error: true,
                    status: 'Por favor verifica que el nombre del Artista o Grupo está bien escrito',
                    statusText: 'No se encontro el Artista o Grupo',
                });
                if (res.track.length > 0) {
                    track(res.track);
                }
                show({
                    album: false,
                    track: true,
                    load: false,
                    logo: data.strAlbumThumb,
                })
            })
    }
    return (
        error ?
            (
                <ErrorAlert error={error} />
            ) : (
                <Card className='col-6'>
                    <Card.Img variant="top" src={data.strAlbumThumb || logo} alt={data.strAlbum} />
                    <Card.Body className='row'>
                        <Col >
                            <Card.Title>{data.strAlbum}</Card.Title>
                        </Col>
                        <Col className="align-self-end">
                            <Card.Subtitle className="mb-2  text-muted">Genre: {data.strGenre}</Card.Subtitle>
                            <Card.Text>Release: {data.intYearReleased}</Card.Text>
                            <Button variant="outline-dark" data-id={data.idAlbum} onClick={(e) => LoadTracks(e)} >Look Track's</Button>
                        </Col>
                    </Card.Body>
                </Card>
            )

    )
}

function ArtitsAlbum({ data, loading }) {
    const [error, setError] = useState(null)
    const [album, setAlbum] = useState({})
    const [track, setTrack] = useState({})
    const [show, setShow] = useState({})
    let { apiData } = useGet();

    const LoadAlbums = (e) => {
        setShow({ load: true })
        apiData(`https://www.theaudiodb.com/api/v1/json/2/album.php?i=${e.target.dataset.id}`)
            .then(res => {
                if (res.ok === false) setError({
                    error: true,
                    status: res.status,
                    statusText:
                        (!res.statusText
                            ? 'Ocurrio un error'
                            : res.statusText),
                    type: res.type,
                    url: res.url
                });
                if (res.album === null) setError({
                    error: true,
                    status: 'Por favor verifica que el nombre del Artista o Grupo está bien escrito',
                    statusText: 'No se encontro el Artista o Grupo',
                });
                if (res.album.length > 0) {
                    setAlbum(res.album);
                }
                setShow({
                    album: true,
                    track: false,
                    load: false
                })
            })
    }
    if (data) {
        return (
            <Row className='justify-content-center'>
                <Col className='col-12 col-lg-6'>
                    <Card>
                        <Card.Img variant="top" src={data.logo} alt={data.artists} />
                        <Card.Body>
                            <Card.Title>{data.artists}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Genre: {data.genre}</Card.Subtitle>
                            <Card.Subtitle className="mb-2 text-muted">Formed: {data.formed}</Card.Subtitle>
                            <Card.Text className="text-justify" style={{ overflow: 'scroll', maxHeight: '15rem' }}>
                                {data.bio}
                            </Card.Text>
                            <Button variant="dark" data-id={data.id} onClick={(e) => LoadAlbums(e)}>Load Album's</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='row col-12 col-lg-6'>
                    {show.load && <h2>Loading...</h2>}
                    {
                        error
                            ? <ErrorAlert error={error} />
                            : <></>
                    }
                    {
                        show.album
                            ? album.map(el => <Albums key={el.idAlbum} data={el} logo={data.logo} track={setTrack} show={setShow} />)
                            : <></>
                    }
                    {
                        show.track
                            ? track.map(el => <Tracks key={el.idTrack} data={el} logo={show.logo} track={setTrack} show={setShow} />)
                            : <></>
                    }
                </Col>
            </Row>
        )
    } else {
        return (
            <>
                <Row>
                    <Col sm={12} className='col-6 MusicSearch_header-logo text-center'>
                        <h2>Busca tu grupo o artista Favorito</h2>
                        <p>Coloca en el buscador su nombre, dale al boton search y este te mostrara sus detalles</p>
                        <img src={Logo} alt="Logo" className='m-auto' />
                        <p className='text-muted'>Luego que aparescan los detalles podras ver sus albums y por cada album la lista de canciones, mas la letra de la cancion</p>
                    </Col>
                </Row>
            </>
        )
    }

}

export default function MusicSearch() {
    const [artists, setArtists] = useState({});
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    let { apiData } = useGet();
    const SearchArtits = (e) => {
        e.preventDefault()
        setLoading(true)
        apiData(`https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artists.artists}`)
            .then(res => {
                if (res.ok === false) setError({
                    error: true,
                    status: res.status,
                    statusText:
                        (!res.statusText
                            ? 'Ocurrio un error'
                            : res.statusText),
                    type: res.type,
                    url: res.url
                });
                if (res.artists === null) setError({
                    error: true,
                    status: 'Por favor verifica que el nombre del Artista o Grupo está bien escrito',
                    statusText: 'No se encontro el Artista o Grupo',
                });
                if (res.artists.length > 0) {
                    res.artists.map(el => setData({
                        id: el.idArtist,
                        artists: el.strArtist,
                        logo: el.strArtistLogo || el.strArtistFanart || el.strArtistThumb,
                        formed: el.intFormedYear,
                        genre: el.strGenre,
                        bio: el.strBiographyES || el.strBiographyEN
                    }));
                    setArtists({})
                    setLoading(false)
                }
            });
    };
    return (
        <>
            <Row className='MusicSearch_header py-1 justify-content-center'>
                <Col sm={3} className='d-flex col-7 align-items-center justify-content-center MusicSearch_header-title'>
                    <h2>Search Lyrics</h2>
                </Col>
                <Col sm={1} className='col-5 MusicSearch_header-logo text-center'>
                    <img src={Logo} alt="Logo" />
                </Col>
                <Col sm={8} className='d-flex col-12 align-items-center justify-content-around MusicSearch_header-search'>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name="artists"
                            onChange={(e) => setArtists({
                                ...artists,
                                [e.target.name]: e.target.value
                            })}
                            value={artists.artists || ""}
                        />
                        <Button variant="btn btn-dark" type="submit" onClick={(e) => SearchArtits(e)}>Search</Button>
                    </Form>
                </Col>
            </Row>
            {loading && <h2>Loading...</h2>}
            {
                !error
                    ? <></>
                    : <ErrorAlert error={error} />
            }
            {
                !loading
                    ? <ArtitsAlbum data={data} />
                    : <></>
            }
        </>
    )
}