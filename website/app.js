/* Global Variables */
const zipInput= document.getElementById('zip')
const feelingInput = document.getElementById('feelings')
const generateBtn = document.getElementById('generate')
const dateOutput = document.getElementById('date')
const cityOutput = document.getElementById('city')
const tempOutput = document.getElementById('temp')
const feelingOutput = document.getElementById('content')

// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//api
const APIKEY = "8da143e2d5f91f48fdc0d0be3af3d842"
const APIUrl = `&units=metric&appid=${APIKEY}`
const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=`

//get weather data function
const getWeatherData= async(baseUrl, zip, APIUrl)=>{
    const rawData = await fetch(`${baseUrl}${zip}${APIUrl}`)
    try{
        const data = await rawData.json()
        return data
    }catch(e){
        console.log(e)
    }
}

//()=> post data to the server
const postWeatherData = async(url, data)=>{
   
    try {
        const res = await fetch(url,{
            method:'post',
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data) // convert data object to JSON
        })
    } catch (err) {
        console.log(err)
    }

}
//update ui ()

const updateUI = async(url)=>{
    const recivedData = await fetch(url)
    try {
        const data = await recivedData.json()
        dateOutput.innerHTML= `date: ${data.date}`
        cityOutput.innerHTML= `city: ${data.city}`
        tempOutput.innerHTML= `temprature: ${data.temp}`
        feelingOutput.innerHTML= `feeling: ${data.feeling}`
        
    } catch (err) {
        console.log(err)
    }
}

//add functionality to generate button
generateBtn.addEventListener("click",(e)=>{
    const zip = zipInput.value
    const feeling = feelingInput.value
    getWeatherData(baseUrl, zip, APIUrl).then(data =>{
        // console.log(APIUrl)
        console.log(data)
        let d = new Date();
        let newDate =`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

        //post data to the server
        postWeatherData("/addData",{
            date:newDate,
            city:data.city.name,
            temp:data.list[0].main.temp,
            feeling:feelingInput.value,
        })
        //update url
        updateUI("/allData")

    })

    
})

