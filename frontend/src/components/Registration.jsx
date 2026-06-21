import React, { useEffect, useState } from "react";
import registration from "../assets/registration.png";
import background1 from "../assets/Clutch_logo.png";
import { Link } from "react-router-dom";
import backgroundReg from "../assets/tp3.jpg"
import axios from "axios";

export function Register() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/games")
      .then((res) => {
        setGames(res.data?.data || []);
      })
      .catch((error) => {
        console.log("Error fetching games:", error);
      })
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <div className="relative bg-black py-12 sm:py-16 md:py-20" 
    style={{
        background:`url(${backgroundReg})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center'
    }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10">
        {/* Red Divider with glow */}
        <div className="w-4/5 mx-auto h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent mb-8 shadow-[0_0_10px_rgba(220,38,38,0.5)]"></div>

        {/* Registration Header */}
        <div className="flex flex-col justify-center items-center gap-4 mb-4">
          <img
            src={registration}
            alt="Registration Icon"
            className="md:w-[25%] sm:w-[40%] w-[55%] drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          />
          <p className="text-zinc-400 text-sm sm:text-base text-center px-4 max-w-xl">
            Choose your game and register your team to compete in the tournament
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Cards Container */}
        {!loading && (
          <div id="games" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 mx-auto max-w-7xl mt-10 sm:mt-12">
            {games.map((game, index) => (
              <Link to={`/form?game=${game.name}`} key={game._id || index} className="group">
                <div className="relative bg-zinc-900/80 border border-zinc-700 rounded-xl overflow-hidden shadow-lg 
                  transition-all duration-500 ease-out
                  hover:scale-105 hover:border-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]
                  group-hover:-translate-y-2">
                  
                  {/* Image with overlay gradient */}
                  <div className="relative overflow-hidden">
                    <img
                      src={game.img}
                      alt={game.name}
                      className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://placehold.co/300x300/212121/white?text=" + encodeURIComponent(game.name); }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Players badge */}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-xs text-zinc-300 px-2 py-1 rounded-full border border-zinc-600">
                      {game.minPlayers}-{game.maxPlayers} players
                    </div>
                  </div>

                  {/* Game info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-white font-bold text-sm sm:text-base md:text-lg text-center truncate">
                      {game.name}
                    </h3>
                    <p className="text-red-400 text-xs sm:text-sm text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Register Now →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && games.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">No games available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
