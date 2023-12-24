import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import loadingSvg from "../loading.svg";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function str_hash_and_number_rpl(str){
  return str.replace(/(\W+)(\d+)/i, "");

}
function str_pip_rep(strs){
  return strs.replace(/\|/i,"_");
}




export default function Download({ loading, setLoading }) {
  // const classes = useStyles();
  let query = useQuery();
 

  // states
  const [thumnail, setThumnail] = useState("");
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [audioLink, setAudioLink] = useState("");

  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [formats, setFormats] = useState();
  const [audioFormats, setAudioFormats] = useState();
  let rl = "Rick Astley - Never Gonna Give You Up (Official Music Video)";
  const parsedUrl = new URL(window.location);
  // effect
  useEffect(() => {
    if (parsedUrl.searchParams.get("text") != null) {
      setUrl(parsedUrl.searchParams.get("text"));
    } else {
      setUrl(query.get("url"));
    }
    let data = {
      video_url:
        parsedUrl.searchParams.get("text") !== null
          ? parsedUrl.searchParams.get("text")
          : query.get("url"),
    };

    // console.log(data);

    var config = {
      method: "post",
      url: "https://yt2ndownload.000webhostapp.com/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then(function (response) {
        const { video, audio, title_thum } = response.data;
        const { title, thumb } = title_thum;
        setTitle(title);
        setThumnail(thumb);
        setVideoLink(video);
        setAudioLink(audio);

       

        // console.log(data);
        setLoading(false);
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [query.get("url")]);
  
  
  return (
    <>
      {!loading ? (
        <div className="download_page container">
          <div className="video_thumnail">
            <img src={thumnail} className="responsive_image" alt="" />
          </div>
          <h1>
            {title === rl
              ? `You got Rick Rolled... Please Enter a valid url`
              : title}
          </h1>
          <p>Video</p>
          {/* <div className={classes.DownloadSection}>
              {formats && formats.map((format,index)=>(
                 format.qualityLabel === null ? "" : format.hasAudio === true ? <Chip label={format.qualityLabel} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} key={index} color="primary" style={{margin:"0px 7px 7px 0px",cursor:"pointer"}} /> : ""
              ))}
            </div> */}
          <div className="format">
            {videoLink.map((format, index) => {
              
              return (
                <a
                  color="primary"
                  style={{
                    margin: "0px 7px 7px 0px",
                    cursor: "pointer",
                    textDecoration: "none",
                    backgroundColor: "red",
                    padding: "10px",
                    color: "#fff",
                    borderRadius: "5px",
                    fontWeight: "550",
                  }}
                  key={index}
                  href={
                    format.contentLength
                      ? `https://yt2ndownload.000webhostapp.com/download.php?link=${encodeURIComponent(
                          format.url
                        )}&title=${str_pip_rep(str_hash_and_number_rpl(title)).trim()}&len=${format.contentLength}&type=${
                          format.mimeType
                        }`
                      : `${format.url}&title=${str_pip_rep(str_hash_and_number_rpl(title)).trim()}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {format.qualityLabel}-{format.size}
                </a>
              );
            })}
          </div>
          <p>Audio</p>
          <div className="format">
            {audioLink.map((format, index) => {
              return (
                <a
                  color="primary"
                  style={{
                    margin: "0px 7px 7px 0px",
                    cursor: "pointer",
                    textDecoration: "none",
                    backgroundColor: "red",
                    padding: "10px",
                    color: "#fff",
                    borderRadius: "5px",
                    fontWeight: "550",
                  }}
                  key={index}
                  href={`https://yt2ndownload.000webhostapp.com/download.php?link=${encodeURIComponent(
                    format.url
                  )}&title=${str_pip_rep(str_hash_and_number_rpl(title)).trim()}&len=${format.contentLength}&type=${
                    format.mimeType
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {format.itag}
                </a>
              );
            })}
          </div>
          {/* <div className={classes.DownloadSection}>
                {audioFormats && audioFormats.map((format,index)=>(
        
                 <Chip label={format.mimeType.split(";")[0] === "audio/mp4" ? "audio/mp3" : format.mimeType.split(";")[0]} onClick={()=>{downloadFile(format.itag,format.hasVideo)}} key={index} style={{margin:"0px 7px 7px 0px",cursor:"pointer",backgroundColor:"red",color:"#fff"}} />
              ))}
            </div> */}
        </div>
      ) : (
        <div className="container image">
          <img src={loadingSvg} className="svg_image" />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
