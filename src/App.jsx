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
  const [topic, setTopic] = useState('')



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

  useEffect(()=>{
    getVideo()
  },[])

  const getVideo=async()=>{
    try{
      const { data } = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)
      setNews(data.articles)
    }catch(err){
      console.log(err)
    }
  }



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
      setColor()
    } catch (err) {
      console.log(err)
    }
  } 


  const setColor=()=>{
    style.button.color='red'
  }


  return (
    <>
      {/* <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleNews} className='btn btn-success'>click</button> */}

      <div className='container-fluid'>
        <Row>
          <Row>
            <Navbar className=" text-light align-items-center justify-content-center p-3" style={{backgroundColor:'#89A8B2'}}>
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
            <Col lg={2} className='border border-3 border-dark p-2 ' style={{backgroundColor:'#B3C8CF'}}>
              <div className='d-flex flex-column align-items-center p-2'>
                {/* <h4>Other News</h4> */}
                <Button onClick={() => handleSports('health')} className='m-2 w-100' variant="outline-light">Health</Button>
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
                        <Card onClick={() => handleShow(newsDay)} className='m-2 border-light shadow border-3' style={{ width: '16rem', height: '30rem', backgroundColor:'#E5E1DA' }}>
                          <Card.Img className='img-fluid' variant="top" src={newsDay.urlToImage} style={{ height: '200px' }} />
                          <Card.Body>
                            <Card.Title style={{color:'#555352'}}>{newsDay.title}</Card.Title>
                            <Card.Text>
                              {newsDay.publishedAt
                              }
                            </Card.Text>
                            <Button variant="primary" className="me-2 mb-2" onClick={() => handleShow(newsDay)}>See More</Button>
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


