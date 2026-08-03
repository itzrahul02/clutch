import { React, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import formImage from '../assets/form_image.jpg';
import axios from 'axios';

function Form() {
  const [gameOptions, setGamesOptions] = useState([]);
  useEffect(() => {
    axios
      .get('/api/games')
      .then((res) => {
        setGamesOptions(res.data?.data || []);
      })
      .catch((error) => {
        console.log('Error in getting games:', error);
      });
  }, []);
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState([]);
  const game = searchParams.get('game');
  const [contactData, setContactData] = useState('');

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
    if (details.length < (selectGame?.maxPlayers || 1)) {
      setDetails([...details, { name: '', UID: '', IGN: '', email: '' }]);
    } else {
      alert('Kyu add kar raha hai?');
    }
  };

  const correctDetails = () => {
    const checker = [];

    for (const element of details) {
      if (checker.includes(element.email)) {
        alert('Invalid Emails');
        return false;
      } else {
        checker.push(element.email);
      }
    }
    console.log(checker);
    return true;
  };

  // Function for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('move');
    if (correctDetails()) {
      try {
        const response = await axios.post(
          '/api/team',
          {
            gameName: game,
            teamName: teamName,
            contact: contactData,
            teamPlayers: details,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
        console.log('Data entered', response.data);
        if (teamName && contactData && details) {
          alert('Now verify your emails');
          window.location.href = '/';
        } else {
          alert('Enter details properly');
        }
      } catch (error) {
        console.log('Error in entering data', error);
      }
    } else {
      alert('Check Emails');
    }
  };

  const selectGame = gameOptions.find((g) => g.name === game);
  history.replaceState(null, '', '/');
  return (
    <>
      <div
        className="md:flex md:flex-row-reverse justify-between items-center
                       h-screen
                       bg-gradient-to-r from-indigo-950 from-10% via-blue-950 via-20% to-black 100% "
      >
        {/* Right Game Info Section */}
        <div className="details w-full md:w-[30%] md:block justify-center items-center overflow-y-auto md:h-screen bg-gradient-to-b from-red-600 to-amber-500 font-medium p-6 sm:p-8">
          <img
            src={selectGame?.img}
            alt=""
            className="md:w-full w-[50%] mx-auto rounded-2xl object-cover aspect-square shadow-xl border-2 border-white/20"
          />
          <div className="p-2">
            <p className="md:text-3xl text-2xl font-bold">
              {selectGame?.name[0].toUpperCase() + selectGame?.name.slice(1)}
            </p>
            <ul className="list-disc px-8 text-lg">
              <li>Maximum Player: {selectGame?.maxPlayers}</li>
            </ul>
            <p className="font-bold text-xl">Rules</p>
            {selectGame?.rules.map((each) => (
              <>
                <li className="list-disc px-8 text-lg">{each}</li>
              </>
            ))}
          </div>
        </div>
        <div className="flex border mx-auto mt-[2rem] md:mt-0 md:h-2/3 border-white bg-black rounded-lg overflow-hidden">
          {/* Left Image Section */}
          <div className="md:block hidden">
            <img src={formImage} alt="Form" className="w-[350px] h-[500px] border-white object-cover" />
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
                onChange={(e) => setTeamName(e.target.value)}
              />
              <label htmlFor="team">Contact</label>
              <input
                type="number"
                placeholder="Enter your Contact"
                className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                onChange={(e) => setContactData(e.target.value)}
              />
            </div>

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
                  <option key={index} value={g.name} className="bg-black text-white">
                    {g.name}
                  </option>
                ))}
              </select>

              {details.map((detail, index) => (
                <div key={index} className="flex flex-col gap-3 border p-4 rounded-md">
                  <div className="flex items-center justify-center">
                    Player {index + 1}
                    <span className="opacity-0">_</span> {index === 0 ? <p>(IGL)</p> : null}
                  </div>
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
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  />
                  {game === 'valorant' ? (
                    <>
                      <label htmlFor={`UID-${index}`}>Riot ID*</label>
                      <input
                        type="UID"
                        id={`UID-${index}`}
                        placeholder="Enter your User ID"
                        className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        value={detail.UID}
                        onChange={(e) => handleInputChange(index, 'UID', e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor={`UID-${index}`}>User ID*</label>
                      <input
                        type="UID"
                        id={`UID-${index}`}
                        placeholder="Enter your User ID"
                        className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        value={detail.UID}
                        onChange={(e) => handleInputChange(index, 'UID', e.target.value)}
                      />
                      <label htmlFor={`IGN-${index}`}>IGN*</label>
                      <input
                        type="IGN"
                        id={`IGN-${index}`}
                        placeholder="Enter your IGN"
                        className="p-2 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        value={detail.IGN}
                        onChange={(e) => handleInputChange(index, 'IGN', e.target.value)}
                      />
                    </>
                  )}

                  <label htmlFor={`email-${index}`}>Email*</label>
                  <input
                    type="email"
                    id={`email-${index}`}
                    placeholder="Enter your Email"
                    className="p-3 bg-zinc-950/80 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 placeholder-zinc-500"
                    required
                    value={detail.email}
                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  />
                </div>
              ))}

              <span className="w-fit  text-blue-300 cursor-pointer hover:text-blue-500" onClick={addMember}>
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
