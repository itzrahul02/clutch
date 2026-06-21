import React, { useEffect, useState } from "react";
import registration from "../assets/registration.png";
import background1 from "../assets/Clutch_logo.png";
import { Link } from "react-router-dom";
import backgroundReg from "../assets/tp3.jpg"
import axios from "axios";

export function Register() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("/api/games")
      .then((res) => {
        setGames(res.data?.data || []);
      })
      .catch((error) => {
        console.log("Error fetching games:", error);
      });
  }, []);
  
  return (
    <div className="bg-black py-16" 
    style={{
        background:`url(${backgroundReg})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPositionY:'0px'
    }}>
      {/* Red Divider */}

      <div className="w-4/5 mx-auto h-0.5 bg-red-700 mb-8"></div>

      {/* Registration Image */}
      <div className="flex justify-center items-center">
        <img
          src={registration}
          alt="Registration Icon"
          className="md:h-15 md:w-[30%] w-[60%] shadow-lg "
        />
      </div>

      {/* Cards Container */}
 
      <div id="games" className="flex gap-3 flex-wrap md:gap-[5rem] mx-auto md:w-[60%] justify-center md:justify-between items-center mt-[4rem]">
      {games.map((game,index)=>(
        
        <Link to={`/form?game=${game.name}`} key={game._id || index} >
        <div className="border md:w-[15rem] mx-auto w-[9rem] bg-[#212121] hover:scale-110 hover:bg-red-600/90 transition-transform duration-700 ease-in-out border-white overflow-hidden rounded-lg shadow-lg">
          <div className="text-white">
            <img src={game.img} alt={game.name} className="aspect-square object-cover" />
            <p className="text-lg font-bold text-center inset-4 text-white">{game.name}</p>
          </div>
        </div>
        </Link >
      ))}        
      </div>
    </div>
  );
}
