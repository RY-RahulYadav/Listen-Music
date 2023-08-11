const ApiUrl= import.meta.env.VITE_URL

const token = async ()=>{

    const Client_id = import.meta.env.VITE_CLIENT_ID;
    const secret_id = import.meta.env.VITE_SECRET_ID;
    let auth = {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "grant_type=client_credentials&client_id=" + Client_id + "&client_secret=" + secret_id
    }

       const value = await fetch('https://accounts.spotify.com/api/token', auth)
      .then(result => result.json())
      .then(data =>{ return (data.access_token)})
      .catch(err => (console.log(err)))
      return(value)
}


const search = async (query , type )=>{
  const data =   fetch("https://api.spotify.com/v1/search?q=" +query  +"&limit=50&market=IN&type=" +type, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  await token()
        }
      }).then(resp => resp.json()).then(data => { return(data) })

      return(data)
}


const brow = async (url)=>{
  const data =   fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  await token()
        }
      }).then(resp => resp.json()).then(data => { return(data) })

      return(data)
}

export {token , search ,brow}



const fetchUserdata = async ()=>{
  const data = await fetch(`${ApiUrl}/api/auth/getUser` ,{
     method: "GET",
     headers: {
         'Content-Type': 'application/json',

     },
     credentials: "include",
 }).then((res)=>  res.json()).then((data)=>{return(data)})
return data ;
}


 export{fetchUserdata}


 