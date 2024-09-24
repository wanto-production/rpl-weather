import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import TiltCard from './components/tiltcard'
import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {
  const [data,setData] = useState([])
  const [query,setQuery] = useState('jakarta')
  const apikey = import.meta.env.VITE_API_KEY

  const search =async(event)=>{
    if(event){
      event.preventDefault()
    }
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}`)
    .then(response => {
      setData(response.data)
      setQuery('')
    })
   .catch(error => {
      if(error == 'AxiosError: Request failed with status code 404'){
        alert(`City ${query} not found!`)
      }
      setQuery('')
    });
  }

  useEffect(()=>{
    search()
  },[])

  return (
    <>
      <main className=' w-full h-screen flex justify-center items-center flex-col bg-[#BFA3D8]'>
        <header className=' w-full h-[60px] fixed top-0 flex justify-around items-center z-50'>
          <h1 className=' text-[30px] font-semibold cursor-pointer text-crimson'>weather app</h1>
          <form className=' flex items-center gap-2' onSubmit={search}>
            <input className=' p-1 rounded-s-md placeholder:text-black outline-none' type="text" placeholder='search..' value={query} onChange={(e)=> setQuery(e.target.value)} required/>
            <button type='submit' className=' text-white bg-crimson p-1 rounded-e-md'><i className=' fa fa-search'></i></button>
          </form>
        </header>
        <TiltCard>
          {data && (
            <>
            <h1 className=" absolute top-3 font-bold text-3xl cursor-pointer">city {data.name?data.name:'loading...'}</h1> 
            {data.weather?(
              <img src={`https://openweathermap.org/img/wn/${data.weather?data.weather[0].icon:'none'}@2x.png`} alt="" className=" h-auto w-[200px] bg-crimson p-3 rounded-md" />
            ):(
              <div className="flex items-center justify-center w-[200px] h-48 bg-gray-300 rounded-md dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                </svg>
              </div>
            )}
            <div className=" flex gap-3 max-w-[250px] overflow-x-auto bg-[#BFA3D8] p-2 rounded-md mt-2 mb-10">
            {data.weather ?data.weather.map((wet,i)=>(
              <img key={i} src={`https://openweathermap.org/img/wn/${wet.icon}@2x.png`} className=" h-auto w-[60px]" alt="" />
            )):(
              <p>loading</p>
            )}
            </div>
            <div className=' w-[300px] bg-[#BFA3D8] p-2 rounded-md absolute bottom-1'>
              {data.weather?(
                <>
                <p className="text-white text-lg font-semibold">temperature : {data.main?Math.round(data.main.temp - 273.15) : 'loading...'} ℃</p>
                <p className="text-white text-lg font-semibold">humidity : {data.main?data.main.humidity : 'loading...'} <i className=' fa fa-tint'></i></p>
                <p className="text-white text-lg font-semibold">wind speed : {data.wind?data.wind.speed : 'loading...'} <i className='fa fa-wind'></i></p>
                </>
              ):(
                <p className=' text-white'>loading weather data...</p>
              )}
            </div>
          </>
          )}
        </TiltCard>
      </main>
      <main className=' w-full h-[200px] bg-gray-700 flex flex-col p-3'>
        <h1 className=' text-white text-3xl font-mono'>made ny ikhwan satrio</h1>
        <p className=' text-white'>suport:</p>
        <img className=' w-[120px] h-auto rounded-md' src="data:image/png;base64,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" alt="" />
      </main>
    </>
  )

}

export default App
