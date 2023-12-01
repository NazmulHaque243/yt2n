import {useState,useEffect} from "react"
import "./style.css";
import {
  useNavigate,
  useLocation,
  Route,
  Link,Routes
} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import YouTubeIcon from '@material-ui/icons/YouTube';
import YouTubeIcon from '@mui/icons-material/YouTube';
// import Download from "./components/Download"
import Download from "./components/Download";
import Seo from "./components/Seo"



function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function App() {
  // const classes = useStyles();
  let history = useNavigate();
  const parsedUrl = new URL(window.location);
   let query = useQuery();
  // states
  const [url,setUrl] = useState("")
    const [loading,setLoading] = useState(true);
   // effect
    useEffect(()=>{
      if (parsedUrl.searchParams.get("text") != null) {
        setUrl(parsedUrl.searchParams.get("text"))
      }
      if(window.location.pathname === "/"){
          setUrl("")
      }else{

        setUrl(query.get("url"))
        if (parsedUrl.searchParams.get("text") != null) {
          setUrl(parsedUrl.searchParams.get("text"))
        }
      }

    },[window.location.pathname])
  // function
    const handleSubmit = () => {
      if(url === "" || !url.includes("https") || !url.includes("yout")){
        alert("Please enter a Youtube URL...")
      }else{
        if(url.includes("www")){
          history(`/download?url=${url.replace("www.","")}`)
        }else{
          history(`/download?url=${url}`)
        }
        setLoading(true)
      }
    }

    const handleUrlChange = (e) => {
      setUrl(e.target.value)
    } 
    

  return (
    
    <div className="container" noValidate>
      <div className="title"onClick={()=>history("/")}>
      <YouTubeIcon style={{fontSize:"128px",color:"red"}} />
      <h1 style={{marginTop:"0px"}} >Youtube Video Downloader</h1>
      </div>
      <form style={{display:"flex",
    flexDirection:"column"}}   >
      <TextField  id="outlined-basic" variant="outlined" label="Enter YouTube URL..." type="url" required onChange={handleUrlChange} value={url} />
      <Button className="btn" onClick={handleSubmit} variant="contained" style={{marginTop:'10px',backgroundColor:"red",color:"#fff"}}>
        Download
      </Button>
    </form>
      {/* <Routes>
        <Route path="/download">
            <Download setInputUrl={setUrl} loading={loading} setLoading={setLoading}/>
        </Route>
      </Routes> */}
      <Routes>
          <Route
            path="/download"
            element={<Download loading={loading} setLoading={setLoading} />}
          />
        </Routes>
  {/* <a className={classes.affliate} target="_blank" href={"https://publishers.adsterra.com/referral/YZThaqfRBZ"}>
    💰 Earn money from your website without approval.
  </a>
  <a className={classes.affliate} style={{marginTop:"7px"}} target="_blank" href={"https://www.fiverr.com/share/A0rxe5"}>
    🌐 I can make yt downloader for you.
  </a> */}
  <div id="container-262d89e83f48f4f114bffdc40c7395b4"></div>
      <Seo />
    </div>
  );
}

export default App;
