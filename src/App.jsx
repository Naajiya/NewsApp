import { act, useEffect, useState } from 'react'
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
  const [color, setBgBtnColor] = useState()
  const [activeBtn, setActiveBtn] = useState('')


  console.log(activeBtn)

  const [show, setShow] = useState(false);
  const [activeNews, setActiveNews] = useState(null);

  const handleClose = () => {
    setActiveNews(null);
  };
  const handleShow = (newsItem) => {

    setActiveNews(newsItem);
  };




  // https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}
  // https://newsapi.org/v2/everything?q=sports&apiKey=${API_KEY}

  useEffect(() => {
    getVideo()
  }, [])

  const getVideo = async () => {
    try {
      const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
      setNews(data.articles)
    } catch (err) {
      console.log(err)
    }
  }



  const handleNews = async (to) => {
    try {
      const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
      console.log(data)
      setNews(data.articles)
      setSearch('')
      setActiveBtn(to)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSports = async (to) => {
    try {
      const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${to}&apiKey=${API_KEY}`)
      console.log(data.articles)
      // setBgBtnColor('blue')
      // if(data.articles.content != [Rwm])
      setNews(data.articles)
      setActiveBtn(to)


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
            <Navbar className="d-flex flex-column flex-md-row text-light text-center align-items-center justify-content-center p-3" style={{ backgroundColor: '#89A8B2' }}>
              <Col sm={12} lg={6}>
                
                  <h2 style={{ fontFamily: 'fantasy' }}>NewsApp</h2>
                
              </Col>
              <Form className="w-100 w-md-auto">
                
                  <Row inline className='d-flex flex-column flex-md-row p-3 align-items-center'>
                    <Col xs="auto">
                      <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                      />
                    </Col>
                    <Col xs="auto">
                     
                        <Button className='m-2' onClick={()=>handleNews('search')}
                        style={{
                          backgroundColor: activeBtn == 'search' ? 'red' : ''
                        }}>Submit</Button>
                    
                    </Col>
                  </Row>
               
              </Form>
            </Navbar>
          </Row>

          <Row className='p-2'>
            <Col lg={2} sm={12} className='border border-3 border-info rounded p-2 ' style={{ backgroundColor: '#B3C8CF' }}>
              <div className='d-flex flex-column align-items-center p-2'>
                {/* <h4>Other News</h4> */}
                
                <Button onClick={() => handleSports('health')} className='m-2 w-100' variant="outline-light"
                  style={{
                    backgroundColor: activeBtn == 'health' ? 'red' : ''
                  }}>Health</Button>


                <Button onClick={() => handleSports('sports')} className='m-2 w-100' variant="outline-dark"
                  style={{
                    backgroundColor: activeBtn == 'sports' ? 'red' : ''
                  }}
                >Sports</Button>


                <Button onClick={() => handleSports('technology')} className='m-2 w-100' variant="outline-dark"
                  style={{
                    backgroundColor: activeBtn == 'technology' ? 'red' : ''
                  }} >Technology</Button>


                <Button onClick={() => handleSports('business')} className='m-2 w-100' variant="outline-dark"
                  style={{
                    backgroundColor: activeBtn == 'business' ? 'red' : ''
                  }}>Business</Button>


                <Button onClick={() => handleSports('politics')} className='m-2 w-100' variant="outline-dark"
                  style={{
                    backgroundColor: activeBtn == 'politics' ? 'red' : ''
                  }}>Politics</Button>


                <Button onClick={() => handleSports('entertainment')} className='m-2 w-100' variant="outline-dark"
                  style={{
                    backgroundColor: activeBtn == 'entertainment' ? 'red' : ''
                  }}>Entartainment</Button>


                <Button onClick={() => handleSports('science')} className='m-2 w-100' variant="outline-dark"
                  style={{
                    backgroundColor: activeBtn == 'science' ? 'red' : ''
                  }}>science</Button>


              </div>
            </Col>
            <Col>
              <Row>

                {
                  news.length > 0 ?
                    news?.map(newsDay =>
                      <Col lg={4} sm={12} >
                        <Card onClick={() => handleShow(newsDay)} className='m-2 p-1 border-teritary shadow border-3' style={{ width: '18rem', height: '30rem', backgroundColor: '#E5E1DA' }}>
                          <Card.Img className='img-fluid' variant="top" src={newsDay.urlToImage} style={{ height: '200px' }} />
                          <Card.Body>
                            <Card.Title style={{ color: '#555352' }}>{newsDay.title}</Card.Title>
                            <Card.Text>
                              {newsDay.publishedAt
                              }
                            </Card.Text>
                            <Button variant="primary" className="me-2 mb-2 " onClick={() => handleShow(newsDay)}>See More</Button>
                          </Card.Body>
                        </Card>




                      </Col>
                    )
                    :
                    <div>nothing no display</div>
                }
              </Row>
            </Col>
          </Row>
        </Row>

        {
          activeNews && (
            <Modal show={activeNews} size="lg" onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title><h1>{activeNews.title} </h1> </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h3>{activeNews.author}</h3> <br />
                <h4>{activeNews.content}</h4>

                <p>{activeNews.description}</p>
              </Modal.Body>

            </Modal>

          )
        }
      </div>

    </>
  )
}

export default App


