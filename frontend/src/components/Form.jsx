import { React, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import formImage from "../assets/form_image.jpg";
import axios from 'axios';

function Form() {
  const[gameOptions, setGamesOptions] = useState([]);
  useEffect(() => {
    axios.get('/api/games').then(res => {
      setGamesOptions(res.data?.data || [])
      })
      .catch((error)=>{console.log("Error in getting games:",error);})
},[]);
  const [teamName,setTeamName] = useState("")
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState([]);
  const game = searchParams.get("game");
  const [contactData,setContactData] = useState("")

  // Function to update details
  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const removeMember = (index) => {
    const updatedDetails = details.filter((_, idx) => idx !== index);
    setDetails(updatedDetails);
  };

  // Function to add a new member
  const addMember = () => {
    if (details.length < (selectGame?.maxPlayers || 1)){
      setDetails([...details, { name: "",UID: "", IGN:"",email: "", }]);
    }
    else{
      alert(
        "Kyu add kar raha hai?"
      )
    }
    
  };

  const correctDetails = () =>{
    const checker=[]
    
    for (const element of details){
        if(checker.includes(element.email)){
            alert("Invalid Emails")
            return false
        }
        else{
            checker.push(element.email)
        }
    };
    console.log(checker);
    return true;
  }

  // Function for submit
  const handleSubmit = async(e) => {

    e.preventDefault()
    console.log("move");
    if(correctDetails()){
        try {
          const response = await axios.post("/api/team",{
            gameName: game,
            teamName: teamName,
            contact: contactData,
            teamPlayers: details
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );
          console.log("Data entered",response.data);
          if(teamName && contactData && details){
            alert("Now verify your emails")
            window.location.href="/"
            
          }else{
            alert("Enter details properly")
          }
          }
          catch (error) {
          console.log("Error in entering data",error);
          }
        }     
    else{
        alert("Check Emails")
    }
  }
  
  const selectGame=gameOptions.find((g)=>g.name===game)
  history.replaceState(null,"","/")
  return (
    <>
      <div className="md:flex md:flex-row-reverse justify-between items-stretch
                       min-h-screen
                       bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
        

        {/* Right Game Info Section */}
        <div className="details w-full md:w-[30%] md:block justify-center items-center overflow-y-auto md:h-screen bg-gradient-to-b from-red-600 to-amber-500 font-medium p-6 sm:p-8">
          <img
            src={selectGame?.img}
            alt=""
            className="md:w-full w-[50%] mx-auto rounded-2xl object-cover aspect-square shadow-xl border-2 border-white/20"
          />
          <div className="p-2 mt-4">
            <p className="md:text-3xl text-2xl font-bold text-white drop-shadow-lg">{selectGame?.name[0].toUpperCase()+selectGame?.name.slice(1)}</p>
            <ul className="list-disc px-8 text-lg text-white/90 mt-2">
              <li>Maximum Player: {selectGame?.maxPlayers}</li>
            </ul>
              <p className="font-bold text-xl mt-4 text-white">Rules</p>
              {selectGame?.rules.map((each, i)=>(
                <li key={i} className="list-disc px-8 text-lg text-white/90">{each}</li>
              ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="flex border border-zinc-700/50 bg-zinc-900/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-3xl w-full">
            {/* Left Image Section */}
            <div className="md:block hidden">
              <img
                src={formImage}
                alt="Form"
                className="w-[350px] h-full object-cover"
              />
            </div>

            {/* Right Form Section */}
            <div className="text-white overflow-y-auto max-h-[80vh] p-6 sm:p-8 w-full md:w-[25rem]">
              <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Register Your Team</h2>
              <form className="flex flex-col gap-4">
                <label htmlFor="team" className="text-sm text-zinc-400 font-medium">Team Name</label>
                
                <input
                  type="text"
                  placeholder="Enter your Team"
                  className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                  required
                  onChange={(e)=>setTeamName(e.target.value)}
                />
                <label htmlFor="team" className="text-sm text-zinc-400 font-medium">Contact</label>
                <input
                  type="number"
                  placeholder="Enter your Contact"
                  className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                  required
                  onChange={(e)=>setContactData(e.target.value)}
                />

                <label htmlFor="games" className="text-sm text-zinc-400 font-medium">Select a Game</label>
                <select
                  className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300"
                  required
                  value={game}
                  onChange={(e) => navigate(`/form?game=${e.target.value}`)}
                >
                  <option value="" className="bg-zinc-900">
                    Choose a Game
                  </option>
                  {gameOptions.map((g, index) => (
                    <option
                      key={index}
                      value={g.name}
                      className="bg-zinc-900 text-white"
                    >
                      {g.name}
                    </option>
                  ))}
                </select>

                {details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 border border-zinc-700/50 bg-zinc-800/30 p-4 rounded-xl transition-all duration-300 hover:border-zinc-600"
                  >
                  <div className="flex items-center justify-center text-sm font-semibold text-red-400">Player {index+1}<span className="opacity-0">_</span> {index===0?(<p>(IGL)</p>):null}</div>
                  <div className="flex justify-between items-center">
                    <label htmlFor={`name-${index}`} className="text-sm text-zinc-400">Name</label>
                    <span
                      className="text-red-500 font-bold text-sm cursor-pointer hover:text-red-400 bg-red-950/30 px-2 py-0.5 rounded transition-colors"
                      onClick={() => removeMember(index)}
                    >
                      ✕
                    </span>
                  </div>
                  <input
                    type="text"
                    id={`name-${index}`}
                    placeholder="Enter your name"
                    className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                    required
                    value={detail.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                  {game==="valorant"?(
                    <>
                    <label htmlFor={`UID-${index}`} className="text-sm text-zinc-400">Riot ID*</label>
                    <input
                      type="UID"
                      id={`UID-${index}`}
                      placeholder="Enter your User ID"
                      className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                      required
                      value={detail.UID}
                      onChange={(e) =>
                        handleInputChange(index, "UID", e.target.value)
                      }
                    />
                    </>
                  ):(
                    <>
                    <label htmlFor={`UID-${index}`} className="text-sm text-zinc-400">User ID*</label>
                  <input
                    type="UID"
                    id={`UID-${index}`}
                    placeholder="Enter your User ID"
                    className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                    required
                    value={detail.UID}
                    onChange={(e) =>
                      handleInputChange(index, "UID", e.target.value)
                    }
                  />
                  <label htmlFor={`IGN-${index}`} className="text-sm text-zinc-400">IGN*</label>
                  <input
                    type="IGN"
                    id={`IGN-${index}`}
                    placeholder="Enter your IGN"
                    className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                    required
                    value={detail.IGN}
                    onChange={(e) =>
                      handleInputChange(index, "IGN", e.target.value)
                    }
                  />
                    </>
                  )}
                  
                  <label htmlFor={`email-${index}`} className="text-sm text-zinc-400">Email*</label>
                  <input
                    type="email"
                    id={`email-${index}`}
                    placeholder="Enter your Email"
                    className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                    required
                    value={detail.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                  
                </div>
              ))}

              <span
                className="w-fit text-red-400 cursor-pointer hover:text-red-300 font-medium text-sm border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-950/30 transition-all duration-300"
                onClick={addMember}
              >
                + Add Member
              </span>
              <button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 rounded-lg mt-3 transition-all duration-300 shadow-lg hover:shadow-green-600/25 hover:-translate-y-0.5 active:translate-y-0"
                onClick={handleSubmit}

              >
                Register
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Form;
