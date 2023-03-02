import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import loadingSvg from "../loading.svg"
import { useLocation } from 'react-router-dom';

export const Download =({loading,setLoading})=>{

    let location=useLocation()
    // state
    const [thumnail,setThumnail]=useState('')
    const [title,setTitle]=useState('')
    const [videoLink,setVideoLink]=useState('')
    const [audioLink,setAudioLink]=useState('')
    
    

    useEffect(()=>{
        posts();
        
    },[location.state.url]);

    const posts=()=>{
        const data = {
            video_url:location.state.url ,
          };
        //   var config = {
        //     headers: {'Access-Control-Allow-Origin': '*'}
            

        // };
//         fetch('https://yt2ndownload.000webhostapp.com', {
//   method: 'POST', // or 'PUT'

//   headers: {
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//         }
//   },
//   body: JSON.stringify(data),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
        // axios.post('https://yt2ndownload.000webhostapp.com/',data)
        //   .then(function (response) {
        //     const { video,audio,title_thum }=response.data
        //     const { title,thumb }=title_thum
        //     setTitle(title)
        //     setThumnail(thumb)
        //     setVideoLink(video)
        //     setAudioLink(audio)


        //     console.log(data);
        //     setLoading(false)
            
           
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // var data = JSON.stringify({
        //   "video_url": "https://www.youtube.com/watch?v=RvCBzhhydNk"
        // });
        
        var config = {
          method: 'post',
          url: 'https://yt2ndownload.000webhostapp.com/',
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data : JSON.stringify(data)
        };
        
        axios(config)
        .then(function (response) {
          const { video,audio,title_thum }=response.data
            const { title,thumb }=title_thum
            setTitle(title)
            setThumnail(thumb)
            setVideoLink(video)
            setAudioLink(audio)


            console.log(data);
            setLoading(false)
          // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });

          

          
    }
    return (

    <>
      {!loading? <div className="download_page container">
        <div className="video_thumnail">
            <img className="responsive_image" src={thumnail} alt="" />
            
        </div>
        <h3>{title}</h3>
        <p>video</p>
        <div className="format">
        {videoLink.map((format,index)=>{

            return <a key={index} href={format.contentLength ? `https://yt2ndownload.000webhostapp.com/download.php?link=${encodeURIComponent(format.url)}&title=${title}&len=${format.contentLength}&type=${format.mimeType}` : `${format.url}&title=${title}`} target="_blank" rel="noopener noreferrer">{format.qualityLabel}</a>
        })}


            
        </div>
        <p>Audio</p>
        <div className="format">

        {audioLink.map((format,index)=>{

      return <a key={index} href={`https://yt2ndownload.000webhostapp.com/download.php?link=${encodeURIComponent(format.url)}&title=${title}&len=${format.contentLength}&type=${format.mimeType}`}  target="_blank" rel="noopener noreferrer" >{format.itag}</a>
    })}
            
        </div>

    </div>:
    <div className='container image'>
        <img className='svg_image' src={loadingSvg} />
            <p>Loading...</p>
    </div>}
    </>
      
    );



}