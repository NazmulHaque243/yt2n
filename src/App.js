import { useState,useEffect } from 'react';
import { Route,useNavigate,Routes,BrowserRouter } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import './style.css'
import logo from'./componend/img/youtube-svgrepo-com.svg'
import './App.css';
import { SEO } from './componend/SEO';
import { Footer } from './componend/Footer';
import { Download } from './componend/Download'

function App() {
  const parsedUrl = new URL(window.location);
  const navigator=useNavigate()
  const [loading,setLoading] = useState(true);
  const [videoUrl,setVideoUrl]=useState('')
  useEffect(()=>{
    if (parsedUrl.searchParams.get("text") != null) {
      setVideoUrl(parsedUrl.searchParams.get("text"))
    }
    if(window.location.pathname === "/"){
      setVideoUrl("")
    }else{

      
      if (parsedUrl.searchParams.get("text") != null) {
        setVideoUrl(parsedUrl.searchParams.get("text"))
      }
    }

  },[window.location.pathname])
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(videoUrl === "" || !videoUrl.includes("https") || !videoUrl.includes("yout")){
      alert("Please enter a Youtube URL...")
    }else{
      navigator('/download',{
        state:{
          url:videoUrl
        }
      })

      
      setLoading(true)
    }
  }


  const handleUrlchange=(e)=>{
    
    setVideoUrl(e.target.value)


  }
  return (
      <>
      <div className="container">
        <div className="title">
            <img style={{width: '150px'}} className="responsive_image" src={logo} alt="" />
            <h1>Youtube Video Downloader</h1>
        </div>
        <form action="" className="form" onSubmit={handleSubmit}>
            <input onChange={handleUrlchange} value={videoUrl} type="text" placeholder="Enter YouTube URL... " />
            <button type='submit'>Covert</button>
        </form>

       
      <Routes>
        <Route path='/download' element={<Download loading={loading} setLoading={setLoading}/>} />
          
        
      </Routes>
      

      <SEO />
      </div>
      <Footer />
      </>

    
  );
  }


export default App;
