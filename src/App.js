import './App.css';
import React,{useEffect, useState} from "react";
import axios from "axios"
import cross from "./cross.png";

function App() {

  let [search,setSearch] = useState("");

  function searchfunction(event) {
    event.preventDefault();
    console.log(search)
   if(search) {
      loadApi(search);
   }
  }

  let [apidata, setapidata] = useState("");

  async function loadApi() {
    try {
        let api1data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=840de593b7028de6e424162454790fe5`);
        let itemsarray1=api1data.data;
        setapidata(api1data.data);
    }
    catch {
      alert("Not found.Please try different city name!")
      console.error("Some error occurred")
    }
      } 

      useEffect(()=>{
        function modal() {
          document.getElementById('modalbtn').click();
        }

        if(apidata)
        {
          modal();
        }

      },[apidata])



  return (
    <div>
      <nav className="navbar" style={{display:"flex",justifyContent:"center"}}>
       <form onSubmit={searchfunction} >
      <input className="form-control bg-danger me-2" value={search} placeholder="Enter City Name" type="search" style={{borderRadius:"15px"}}  onChange={(event)=>{setSearch(event.target.value)}}/>
    </form>
      <img src={cross} style={{position:"relative",right:"50px",width:"65px",height:"65px"}} onClick={()=>{setSearch("")}}/>
    </nav>
    <button type="button" class="btn btn-primary" id="modalbtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{display:"none"}}>
  Launch static backdrop modal
</button>
    {apidata &&
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="staticBackdropLabel">Weather Report</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body d-flex justify-content-center flex-column">
         <div style={{textAlign:"center"}}>City Name : {apidata.name}</div>
        <div style={{textAlign:"center"}}>Temperature : {apidata.main.temp} C</div>
         <div style={{textAlign:"center"}}>Sky:
           <div>{apidata.weather[0].main}</div>
          <div>{apidata.weather[0].description}</div>
        </div>
        </div>
      </div>
    </div>
  </div>
    }
    </div>)
}

export default App;



 