import { useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';


function App() {

  const API_KEY = "d9524749a3c2409ea299f2fe98b02875"
  const [search, setSearch] = useState("india")
  const [news, setNews] = useState([])
  const [topic, setTopic] = useState('')

  const [fullscreen, setFullscreen] = useState('xxl-down'); // Set the desired breakpoint directly
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  // https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}
  // https://newsapi.org/v2/everything?q=sports&apiKey=${API_KEY}



  const handleNews = async () => {
    try {
      const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
      console.log(data)
      setNews(data.articles)
      setSearch('')

    } catch (err) {
      console.log(err)
    }
  }

  const handleSports = async (to) => {
    try {
      const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${to}&apiKey=${API_KEY}`)
      console.log(data.articles)
      // if(data.articles.content != [Rwm])
      setNews(data.articles)
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <>
      {/* <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleNews} className='btn btn-success'>click</button> */}

      <div className='container-fluid'>
        <Row>
          <Row>
            <Navbar className="bg-dark text-light align-items-center justify-content-center p-3">
              <Col sm={12} lg={6}>
                <Form >
                  <h2 style={{ fontFamily: 'fantasy' }}>NewsLatest</h2>
                </Form>
              </Col>
              <Form >
                <Col >
                  <Row inline>
                    <Col xs="auto">
                      <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                      />
                    </Col>
                    <Col xs="auto">
                      <Button onClick={handleNews}>Submit</Button>
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Navbar>
          </Row>

          <Row className='p-2'>
            <Col lg={2} className='border border-light p-2 '>
              <div className='d-flex flex-column align-items-center p-2'>
                {/* <h4>Other News</h4> */}
                <Button onClick={() => handleSports('health')} className='m-2 w-100' variant="outline-info">Health</Button>
                <Button onClick={() => handleSports('sports')} className='m-2 w-100' variant="outline-dark">Sports</Button>
                <Button onClick={() => handleSports('technology')} className='m-2 w-100' variant="outline-dark">Technology</Button>
                <Button onClick={() => handleSports('business')} className='m-2 w-100' variant="outline-dark">Business</Button>
                <Button onClick={() => handleSports('politics')} className='m-2 w-100' variant="outline-dark">Politics</Button>
                <Button onClick={() => handleSports('entertainment')} className='m-2 w-100' variant="outline-dark">Entartainment</Button>
                <Button onClick={() => handleSports('science')} className='m-2 w-100' variant="outline-dark">science</Button>
              </div>
            </Col>
            <Col>
              <Row>

                {
                  news.length > 0 ?
                    news?.map(newsDay =>
                      <Col lg={4} sm={12} >
                        <Card className='m-2 border-light bg-light-subtle shadow border-3' style={{ width: '16rem', height: '30rem' }}>
                          <Card.Img className='img-fluid' variant="top" src={newsDay.urlToImage} style={{ height: '200px' }} />
                          <Card.Body>
                            <Card.Title>{newsDay.title}</Card.Title>
                            <Card.Text>
                              {newsDay.publishedAt
                              }
                            </Card.Text>
                            <Button variant="primary" className="me-2 mb-2" onClick={handleShow}>See More</Button>
                          </Card.Body>
                        </Card>


                        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                          <Modal.Header closeButton>
                            <Modal.Title>{newsDay.title}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>{newsDay.description}</Modal.Body>
                          <Modal.Body>{newsDay.content}</Modal.Body>
                          <Modal.Body>{newsDay.author}</Modal.Body>
                        </Modal>

                      </Col>
                    )
                    :
                    <div>nothing no display</div>
                }
              </Row>
            </Col>
          </Row>
        </Row>

      </div>

    </>
  )
}

export default App


