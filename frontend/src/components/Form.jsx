import { React, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import formImage from "../assets/form_image.jpg";
import axios from 'axios';

function Form() {
  const[gameOptions, setGamesOptions] = useState([]);
  useEffect(() => {
    axios.get('/api/games').then(res => {
      console.log(res.data)
      setGamesOptions(res.data)
      })
      .catch((error)=>{console.log("Error in getting games:",error);})
},[]);
  const [teamName,setTeamName] = useState("")
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState([]);
  const game = searchParams.get("game");
  const [contactData,setContactData] = useState(0)

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
    if (details.length<selectGame.maxPlayers){
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
      <div className="md:flex md:flex-row-reverse justify-between items-center
                       h-screen
                       bg-gradient-to-r from-indigo-950 from-10% via-blue-950 via-20% to-black 100% ">
        

        {/* Right Game Info Section */}
        <div className="details  w-100% md:block justify-center items-center overflow-y-scroll md:h-screen text-wrap bg-amber-400 font-medium p-8 md:w-[30%]">
          <img
            src={selectGame?.img}
            alt=""
            className="md:w-full w-[60%] rounded-xl object-cover aspect-square"
          />
          <div className="p-2">
            <p className="md:text-3xl text-2xl font-bold">{selectGame?.name[0].toUpperCase()+selectGame?.name.slice(1)}</p>
            <ul className="list-disc px-8 text-lg">
              <li>Maximum  Player: {selectGame?.maxPlayers}</li>
            </ul>
              <p className="font-bold text-xl">Rules</p>
              {selectGame?.rules.map((each)=>(
                <>
                <li className="list-disc px-8 text-lg">{each}</li>
                </>
              ))}
          </div>
        </div>
        <div className="flex border mx-auto mt-[2rem] md:mt-0 md:h-2/3 border-white bg-black rounded-lg overflow-hidden">
          {/* Left Image Section */}
          <div className="md:block hidden">
            <img
              src={formImage}
              alt="Form"
              className="w-[350px] h-[500px] border-white object-cover"
            />
          </div>

          {/* Right Form Section */}
          <div className="text-white overflow-y-scroll p-6 w-[25rem]">
            <h2 className="text-xl font-bold mb-4 text-center">Register Now</h2>
            <form className="flex flex-col gap-3">
              <label htmlFor="team">Team Name</label>
              
              <input
                type="text"
                placeholder="Enter your Team"
                className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                onChange={(e)=>setTeamName(e.target.value)}
              />
              <label htmlFor="team">Contact</label>
              <input
                type="number"
                placeholder="Enter your Contact"
                className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                onChange={(e)=>setContactData(parseInt(e.target.value))}
              />

              <label htmlFor="games">Select a Game</label>
              <select
                className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                value={game}
                onChange={(e) => navigate(`/form?game=${e.target.value}`)}
              >
                <option value="" className="bg-black">
                  Choose a Game
                </option>
                {gameOptions.map((g, index) => (
                  <option
                    key={index}
                    value={g.url}
                    className="bg-black text-white"
                  >
                    {g.name}
                  </option>
                ))}
              </select>

              {details.map((detail, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 border p-4 rounded-md"
                >
                  <div className="flex items-center justify-center">Player {index+1}<span className="opacity-0">_</span> {index===0?(<p>(IGL)</p>):null}</div>
                  <div className="flex justify-between items-center">
                    <label htmlFor={`name-${index}`}>Name</label>
                    <span
                      className="text-red-600 font-bold text-md cursor-pointer"
                      onClick={() => removeMember(index)}
                    >
                      X
                    </span>
                  </div>
                  <input
                    type="text"
                    id={`name-${index}`}
                    placeholder="Enter your name"
                    className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    value={detail.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                  {game==="valorant"?(
                    <>
                    <label htmlFor={`UID-${index}`}>Riot ID*</label>
                    <input
                      type="UID"
                      id={`UID-${index}`}
                      placeholder="Enter your User ID"
                      className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                      value={detail.UID}
                      onChange={(e) =>
                        handleInputChange(index, "UID", e.target.value)
                      }
                    />
                    </>
                  ):(
                    <>
                    <label htmlFor={`UID-${index}`}>User ID*</label>
                  <input
                    type="UID"
                    id={`UID-${index}`}
                    placeholder="Enter your User ID"
                    className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    value={detail.UID}
                    onChange={(e) =>
                      handleInputChange(index, "UID", e.target.value)
                    }
                  />
                  <label htmlFor={`IGN-${index}`}>IGN*</label>
                  <input
                    type="IGN"
                    id={`IGN-${index}`}
                    placeholder="Enter your IGN"
                    className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    value={detail.IGN}
                    onChange={(e) =>
                      handleInputChange(index, "IGN", e.target.value)
                    }
                  />
                    </>
                  )}
                  
                  <label htmlFor={`email-${index}`}>Email*</label>
                  <input
                    type="email"
                    id={`email-${index}`}
                    placeholder="Enter your Email"
                    className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                    value={detail.email}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                  
                </div>
              ))}

              <span
                className="w-fit  text-blue-300 cursor-pointer hover:text-blue-500"
                onClick={addMember}
              >
                + Add Member
              </span>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded-md mt-3 transition-all"
                onClick={handleSubmit}

              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
