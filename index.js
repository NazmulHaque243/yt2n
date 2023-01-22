// https://yt2ndownload.000webhostapp.com
const data={
    video_url:"https://www.youtube.com/watch?v=EgpxA8DaAt8"
}
fetch('https://yt2ndownload.000webhostapp.com', {
    method: 'POST', // or 'PUT'

    
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
      
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error('Error:', error);
    });