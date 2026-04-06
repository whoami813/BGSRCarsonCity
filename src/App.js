import React, { useState, useEffect, useCallback } from 'react';
import { Home, Mountain, Pickaxe, Landmark, RefreshCw, Users, AlertTriangle, ChevronRight, Info, Map as MapIcon, Layers } from 'lucide-react';

// --- HI-RES ASSET LIBRARY ---

const HouseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="45" width="60" height="45" fill="#8b0000" stroke="#3b0000" strokeWidth="2" />
    <path d="M15 45 L50 15 L85 45 Z" fill="#5c1a1a" stroke="#3b0000" strokeWidth="2" />
    <rect x="42" y="65" width="16" height="25" fill="#3b0000" />
    <rect x="30" y="55" width="10" height="10" fill="#f4e4bc" opacity="0.3" />
    <rect x="60" y="55" width="10" height="10" fill="#f4e4bc" opacity="0.3" />
  </svg>
);

// Updated Road Requirement Icon to look like the black wooden game piece
const RoadReqIcon = () => (
  <div className="flex items-center justify-center w-10 h-5" title="Must connect to road">
    <svg viewBox="0 0 100 40" className="w-full h-full filter drop-shadow-md">
      {/* Side/Shadow Depth */}
      <rect x="5" y="15" width="90" height="18" rx="2" fill="#000000" />
      {/* Top Face */}
      <rect x="5" y="10" width="90" height="18" rx="2" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="1" />
      {/* Subtle Wood Grain/Highlight */}
      <rect x="10" y="13" width="80" height="2" rx="1" fill="#444444" opacity="0.4" />
    </svg>
  </div>
);

const HouseReqIcon = ({ count = 1 }) => (
  <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-red-100 border border-red-300 rounded shadow-sm" title={`Must build ${count} House(s)`}>
    <Home className="w-3.5 h-3.5 text-red-700 fill-current" />
    {count > 1 && <span className="text-[10px] font-black text-red-700">x{count}</span>}
  </div>
);

const RanchIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#2d5a27" stroke="#1a3517" strokeWidth="2" />
    <rect x="20" y="40" width="60" height="40" fill="#4a7c44" stroke="#1a3517" strokeWidth="1" />
    <path d="M20 40 L50 20 L80 40 Z" fill="#1a3517" />
    <circle cx="80" cy="80" r="12" fill="#f4e4bc" stroke="#1a3517" strokeWidth="1" />
    <path d="M75 80 H85 M80 75 V85" stroke="#1a3517" strokeWidth="1" transform="rotate(45 80 80)" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$1</text>
  </svg>
);

const DrugstoreIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#6b446b" stroke="#3b253b" strokeWidth="2" />
    <rect x="25" y="30" width="50" height="55" fill="#8e5a8e" stroke="#3b253b" strokeWidth="1" />
    <rect x="25" y="30" width="50" height="15" fill="#3b253b" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$3</text>
  </svg>
);

const MineIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#a66e38" stroke="#5c3d1f" strokeWidth="2" />
    <path d="M20 85 L20 40 L80 40 L80 85" fill="#5c3d1f" />
    <path d="M15 45 L50 25 L85 45 Z" fill="#d29154" stroke="#5c3d1f" strokeWidth="2" />
    <circle cx="80" cy="80" r="12" fill="#f4e4bc" stroke="#5c3d1f" strokeWidth="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$3</text>
  </svg>
);

const BankIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#c5a028" stroke="#7a6319" strokeWidth="2" />
    <rect x="25" y="30" width="50" height="55" fill="#e5c158" stroke="#7a6319" strokeWidth="1" />
    <path d="M20 30 H80 L50 15 Z" fill="#7a6319" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$3</text>
  </svg>
);

const SaloonIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#785a3a" stroke="#4a3623" strokeWidth="2" />
    <rect x="20" y="35" width="60" height="50" fill="#a0785a" stroke="#4a3623" strokeWidth="1" />
    <text x="50" y="46" fontSize="8" fill="#f4e4bc" textAnchor="middle" fontWeight="bold">SALOON</text>
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$5</text>
  </svg>
);

const HotelIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#3a5a78" stroke="#23364a" strokeWidth="2" />
    <rect x="30" y="20" width="40" height="70" fill="#5a7ca0" stroke="#23364a" strokeWidth="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$6</text>
    <rect x="75" y="15" width="12" height="12" fill="#8b0000" rx="1" />
    <rect x="75" y="30" width="12" height="12" fill="#8b0000" rx="1" />
  </svg>
);

const ChurchIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#dcdcdc" stroke="#a9a9a9" strokeWidth="2" />
    <rect x="35" y="45" width="30" height="40" fill="#ffffff" stroke="#a9a9a9" strokeWidth="1" />
    <rect x="42" y="30" width="16" height="15" fill="#ffffff" stroke="#a9a9a9" strokeWidth="1" />
    <path d="M40 30 L50 15 L60 30 Z" fill="#ffffff" stroke="#a9a9a9" strokeWidth="1" />
    <path d="M50 18 V28 M46 22 H54" stroke="#8b0000" strokeWidth="1.5" />
    <rect x="46" y="72" width="8" height="13" fill="#8b5a2b" rx="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#5c4033">$0</text>
  </svg>
);

const PrisonIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#5a5a5a" stroke="#2a2a2a" strokeWidth="2" />
    <rect x="25" y="35" width="50" height="50" fill="#808080" stroke="#2a2a2a" strokeWidth="1.5" />
    <rect x="32" y="45" width="10" height="10" fill="#2a2a2a" />
    <line x1="37" y1="45" x2="37" y2="55" stroke="#808080" strokeWidth="1" />
    <rect x="58" y="45" width="10" height="10" fill="#2a2a2a" />
    <line x1="63" y1="45" x2="63" y2="55" stroke="#808080" strokeWidth="1" />
    <rect x="42" y="65" width="16" height="20" fill="#2a2a2a" rx="1" />
    <circle cx="75" cy="18" r="8" fill="#f4e4bc" stroke="#2a2a2a" strokeWidth="1" />
    <circle cx="88" cy="18" r="8" fill="#f4e4bc" stroke="#2a2a2a" strokeWidth="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$0</text>
  </svg>
);

const BlacksmithIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#4b3621" stroke="#2a1b0a" strokeWidth="2" />
    <rect x="25" y="40" width="50" height="45" fill="#6d4c2e" stroke="#2a1b0a" strokeWidth="1" />
    <path d="M20 40 L50 20 L80 40 Z" fill="#2a1b0a" />
    <text x="12" y="25" fontSize="14" fontWeight="bold" fill="#f4e4bc">$5+</text>
  </svg>
);

const SchoolIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#4682b4" stroke="#2c5a7a" strokeWidth="2" />
    <rect x="30" y="35" width="40" height="50" fill="#f0f8ff" stroke="#2c5a7a" strokeWidth="1" />
    <path d="M25 35 L50 15 L75 35 Z" fill="#2c5a7a" />
    <rect x="75" y="15" width="12" height="12" fill="#8b0000" rx="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">-</text>
  </svg>
);

const GeneralStoreIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#483d8b" stroke="#2a2451" strokeWidth="2" />
    <rect x="25" y="35" width="50" height="50" fill="#6a5acd" stroke="#2a2451" strokeWidth="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">$3</text>
  </svg>
);

const TrainStationIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#8b4513" stroke="#4a260a" strokeWidth="2" />
    <rect x="20" y="45" width="45" height="40" fill="#a0522d" stroke="#4a260a" strokeWidth="1" />
    <rect x="70" y="15" width="12" height="12" fill="#8b0000" rx="1" />
    <rect x="70" y="30" width="12" height="12" fill="#8b0000" rx="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">-</text>
  </svg>
);

const CityHallIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="4" fill="#708090" stroke="#3d464f" strokeWidth="2" />
    <rect x="25" y="35" width="50" height="50" fill="#f5f5f5" stroke="#3d464f" strokeWidth="1" />
    <path d="M20 35 L50 15 L80 35 Z" fill="#3d464f" />
    <rect x="75" y="15" width="12" height="12" fill="#8b0000" rx="1" />
    <text x="12" y="25" fontSize="16" fontWeight="bold" fill="#f4e4bc">-</text>
  </svg>
);

// --- APP LOGIC ---

const BUILDING_DATA = [
  { name: 'Ranch', count: 6, income: '$1 per neighboring free parcel', condition: 'None', road: false, house: 0, icon: <RanchIcon /> },
  { name: 'Mine', count: 6, income: '$3 per adjacent mountain', condition: 'None', road: false, house: 0, icon: <MineIcon /> },
  { name: 'Drugstore', count: 4, income: '$3 per adj. House + $3 per Ranch owned', condition: 'Road + House', road: true, house: 1, icon: <DrugstoreIcon /> },
  { name: 'Bank', count: 4, income: '$3 per adj. House + $3 per Mine owned', condition: 'Road + House', road: true, house: 1, icon: <BankIcon /> },
  { name: 'Saloon', count: 3, income: '$5 per adjacent House', condition: 'Road + House', road: true, house: 1, icon: <SaloonIcon /> },
  { name: 'Hotel', count: 3, income: '$6 fixed', condition: 'Road + House (Counts as 2 houses)', road: true, house: 1, icon: <HotelIcon /> },
  { name: 'Church', count: 2, income: '-', condition: 'Road + House (Prevents attacks)', road: true, house: 1, icon: <ChurchIcon /> },
  { name: 'Prison', count: 2, income: '-', condition: 'Road + House (+2 Firepower)', road: true, house: 1, icon: <PrisonIcon /> },
  { name: 'Blacksmith', count: 2, income: '$5-$20 depending on round + $5 per Ranch', condition: 'Road + House', road: true, house: 1, icon: <BlacksmithIcon /> },
  { name: 'General Store', count: 2, income: '$3 per adj. House ($6 if yours)', condition: 'Road + House', road: true, house: 1, icon: <GeneralStoreIcon /> },
  { name: 'School', count: 2, income: '-', condition: 'Road + 3 Houses', road: true, house: 3, icon: <SchoolIcon /> },
  { name: 'Train Station', count: 1, income: 'VP based on City Houses', condition: 'Along a straight cross-map road', road: true, house: 0, icon: <TrainStationIcon /> },
  { name: 'City Hall', count: 1, income: '-', condition: 'Road + Connected system', road: true, house: 0, icon: <CityHallIcon /> },
];

const PLAYER_COLORS = [
  { id: 'orange', name: 'Orange', hex: '#f97316', dark: '#c2410c', text: 'text-white' },
  { id: 'green', name: 'Green', hex: '#22c55e', dark: '#15803d', text: 'text-white' },
  { id: 'blue', name: 'Blue', hex: '#3b82f6', dark: '#1d4ed8', text: 'text-white' },
  { id: 'yellow', name: 'Yellow', hex: '#fde047', dark: '#a16207', text: 'text-black' },
  { id: 'brown', name: 'Brown', hex: '#a16207', dark: '#78350f', text: 'text-white' },
  { id: 'red', name: 'Red', hex: '#ef4444', dark: '#b91c1c', text: 'text-white' },
];

const CylinderToken = ({ color, size = "md", isActive = true }) => {
  const scale = size === "sm" ? "scale-75" : "scale-110";
  return (
    <div className={`relative ${scale} transition-all duration-300 ${!isActive ? 'opacity-30 grayscale-[0.5]' : 'drop-shadow-md'}`}>
      <div className="w-12 h-10 rounded-b-full" style={{ backgroundColor: color.dark }} />
      <div className="absolute -top-3 w-12 h-8 rounded-full border-t border-white/20" style={{ backgroundColor: color.hex }} />
    </div>
  );
};

export default function App() {
  const [setup, setSetup] = useState({
    center: { row: 4, col: 4 },
    mountains: [],
    buildings: [],
    turnOrder: []
  });
  const [selectedPlayers, setSelectedPlayers] = useState(['yellow', 'red', 'blue']); 
  const [error, setError] = useState("");

  const togglePlayer = (id) => {
    setSelectedPlayers(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const getRandomMap = useCallback(() => {
    const getInnerCoord = () => Math.floor(Math.random() * 6) + 2;
    const center = { row: getInnerCoord(), col: getInnerCoord() };
    const mnts = [];
    while (mnts.length < 9) {
      const r = getInnerCoord();
      const c = getInnerCoord();
      if (!(r === center.row && c === center.col) && !mnts.some(m => m.row === r && m.col === c)) {
        mnts.push({ row: r, col: c });
      }
    }
    return { center, mountains: mnts };
  }, []);

  const getRandomBuildings = useCallback(() => {
    const bag = [];
    BUILDING_DATA.forEach(b => {
      let countInBag = b.count;
      if (b.name === 'Ranch') countInBag -= 2;
      if (b.name === 'Mine') countInBag -= 2;
      for (let i = 0; i < countInBag; i++) {
        bag.push({ ...b });
      }
    });
    const shuffledBag = bag.sort(() => Math.random() - 0.5);
    return shuffledBag.slice(0, 3);
  }, []);

  const getRandomTurnOrder = useCallback((players) => {
    return [...players]
      .map(id => PLAYER_COLORS.find(p => p.id === id))
      .sort(() => Math.random() - 0.5);
  }, []);

  const randomiseAll = () => {
    if (selectedPlayers.length < 2) {
      setError("At least 2 players are required for a game of Carson City.");
      return;
    }
    setError("");
    const map = getRandomMap();
    const buildings = getRandomBuildings();
    const turnOrder = getRandomTurnOrder(selectedPlayers);
    setSetup({ ...map, buildings, turnOrder });
  };

  const randomiseMapOnly = () => {
    const map = getRandomMap();
    setSetup(prev => ({ ...prev, ...map }));
  };

  const randomiseBuildingsOnly = () => {
    const buildings = getRandomBuildings();
    setSetup(prev => ({ ...prev, buildings }));
  };

  useEffect(() => {
    randomiseAll();
  }, []);

  useEffect(() => {
    if (selectedPlayers.length >= 2) {
      setError("");
      setSetup(prev => ({ ...prev, turnOrder: getRandomTurnOrder(selectedPlayers) }));
    } else {
      setError("At least 2 players are required.");
    }
  }, [selectedPlayers, getRandomTurnOrder]);

  return (
    <div className="min-h-screen bg-[#f4e4bc] text-[#3b2f2f] font-serif p-4 md:p-8 flex flex-col items-center">
      
      <header className="max-w-6xl w-full text-center mb-8 border-b-2 border-[#8b5a2b] pb-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wider text-[#5c4033] uppercase mb-2">
          Carson City
        </h1>
        <h2 className="text-xl md:text-2xl text-[#8b5a2b] italic">
          Big Box Setup Randomiser
        </h2>
      </header>

      {/* Player Selection */}
      <section className="w-full max-w-6xl mb-8 bg-[#e8d5a6] p-6 rounded-md shadow-lg border-2 border-[#8b5a2b]">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Users className="w-6 h-6 text-[#5c4033]" />
          <h3 className="text-xl font-bold uppercase tracking-widest text-[#5c4033]">
            Select Player Tokens
          </h3>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center mb-10">
          {PLAYER_COLORS.map((player) => {
            const isActive = selectedPlayers.includes(player.id);
            return (
              <button key={player.id} onClick={() => togglePlayer(player.id)} className="group flex flex-col items-center gap-4 outline-none">
                <CylinderToken color={player} isActive={isActive} />
                <span className={`text-xs font-bold uppercase tracking-tighter transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  {player.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center border-t border-[#8b5a2b]/30 pt-8">
          <button 
            onClick={randomiseAll} 
            className="w-full max-w-md flex items-center justify-center gap-3 py-5 bg-[#8b0000] text-[#f4e4bc] font-bold text-2xl uppercase tracking-[0.15em] rounded border-b-4 border-[#5c4033] hover:bg-[#a52a2a] transition-all shadow-xl active:translate-y-1 active:border-b-0"
          >
            <RefreshCw className="w-7 h-7" /> Randomise All
          </button>
          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-700 font-bold bg-red-100 px-6 py-2 rounded border border-red-300">
              <AlertTriangle className="w-5 h-5" /> {error}
            </div>
          )}
        </div>
      </section>

      {setup.buildings.length > 0 && (
        <div className="max-w-6xl w-full flex flex-col gap-8">
          
          {/* Turn Order */}
          <div className="w-full bg-[#e8d5a6] p-6 rounded-md shadow-lg border-2 border-[#8b5a2b]">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#5c4033] mb-6 text-center">Round 1 Turn Order</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
              {setup.turnOrder.map((player, index) => (
                <div key={player?.id || index} className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#5c4033] text-[#f4e4bc] flex items-center justify-center font-bold text-sm shadow-inner">{index + 1}</div>
                    {player && <CylinderToken color={player} size="sm" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{player?.name}</span>
                  </div>
                  {index < setup.turnOrder.length - 1 && <ChevronRight className="w-6 h-6 text-[#8b5a2b] opacity-30 mt-[-10px]" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Map Section */}
            <div className="bg-[#e8d5a6] p-6 rounded-md shadow-lg border-2 border-[#8b5a2b] flex flex-col items-center relative">
              <div className="w-full flex justify-between items-center mb-6 border-b border-[#a0785a] pb-2">
                <div className="flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-[#5c4033]" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-[#5c4033]">The Map</h3>
                </div>
                <button 
                  onClick={randomiseMapOnly}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#8b5a2b] text-[#f4e4bc] font-bold uppercase text-[10px] rounded hover:bg-[#5c4033] transition-all shadow active:translate-y-0.5"
                >
                  <RefreshCw className="w-3 h-3" /> Randomise Map
                </button>
              </div>
              
              <div className="flex overflow-x-auto w-full justify-center">
                <div className="flex">
                  <div className="flex flex-col justify-around pr-3 text-xs font-bold text-[#8b5a2b]">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={`r-${n}`}>{n}</div>)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-around pb-3 text-xs font-bold text-[#8b5a2b]">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={`c-${n}`}>{n}</div>)}
                    </div>
                    <div className="grid grid-cols-8 grid-rows-8 gap-0 border-4 border-[#5c4033] bg-[#c3a473] shadow-inner w-[320px] h-[320px] md:w-[480px] md:h-[480px]">
                      {[...Array(64)].map((_, index) => {
                        const row = Math.floor(index / 8) + 1;
                        const col = (index % 8) + 1;
                        const isCenter = setup.center.row === row && setup.center.col === col;
                        const isMnt = setup.mountains.some(m => m.row === row && m.col === col);
                        const cellBg = (row + col) % 2 === 0 ? 'bg-[#d2b48c]' : 'bg-[#e1c699]';
                        return (
                          <div key={index} className={`aspect-square border border-[#a0785a]/40 relative flex items-center justify-center ${cellBg}`}>
                            {isCenter && (
                              <>
                                <div className="w-4/5 h-4/5 z-20 drop-shadow-sm"><HouseIcon /></div>
                                <div className="absolute -top-[3px] left-0 right-0 h-[6px] bg-[#704214] z-10" />
                                <div className="absolute -bottom-[3px] left-0 right-0 h-[6px] bg-[#704214] z-10" />
                                <div className="absolute -left-[3px] top-0 bottom-0 w-[6px] bg-[#704214] z-10" />
                                <div className="absolute -right-[3px] top-0 bottom-0 w-[6px] bg-[#704214] z-10" />
                              </>
                            )}
                            {isMnt && <Mountain className="w-4/5 h-4/5 text-[#4a4a4a] fill-current opacity-90 z-0" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Building Track Section */}
            <div className="bg-[#e8d5a6] p-6 rounded-md shadow-lg border-2 border-[#8b5a2b]">
              <div className="flex items-center justify-between mb-6 border-b border-[#a0785a] pb-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#5c4033]" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-[#5c4033]">Building Track</h3>
                </div>
                <button 
                  onClick={randomiseBuildingsOnly}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#8b5a2b] text-[#f4e4bc] font-bold uppercase text-[10px] rounded hover:bg-[#5c4033] transition-all shadow active:translate-y-0.5"
                >
                  <RefreshCw className="w-3 h-3" /> Randomise Buildings
                </button>
              </div>
              
              <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-8 p-2 overflow-x-auto">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 drop-shadow-sm opacity-80"><RanchIcon /></div>
                  <span className="mt-2 text-[10px] font-bold uppercase text-[#5c4033] tracking-tighter text-center">Ranch</span>
                  <span className="text-xs font-black text-green-800 leading-none">$3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 drop-shadow-sm opacity-80"><MineIcon /></div>
                  <span className="mt-2 text-[10px] font-bold uppercase text-[#5c4033] tracking-tighter text-center">Mine</span>
                  <span className="text-xs font-black text-green-800 leading-none">$4</span>
                </div>
                {[5, 6, 8].map((price, i) => (
                  <div key={price} className="flex flex-col items-center transform transition-transform hover:scale-105">
                    <div className="w-20 h-20 md:w-24 md:h-24 drop-shadow-md border-2 border-[#cd853f] rounded-lg bg-[#ffe4b5] p-1">
                      {setup.buildings[i]?.icon}
                    </div>
                    <span className="mt-2 text-[11px] font-black uppercase text-[#8b0000] tracking-tight text-center">
                      {setup.buildings[i]?.name}
                    </span>
                    <span className="text-sm font-black text-green-800 leading-none">${price}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 drop-shadow-sm opacity-80"><RanchIcon /></div>
                  <span className="mt-2 text-[10px] font-bold uppercase text-[#5c4033] tracking-tighter text-center">Ranch</span>
                  <span className="text-xs font-black text-green-800 leading-none">$10</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 drop-shadow-sm opacity-80"><MineIcon /></div>
                  <span className="mt-2 text-[10px] font-bold uppercase text-[#5c4033] tracking-tighter text-center">Mine</span>
                  <span className="text-xs font-black text-green-800 leading-none">$12</span>
                </div>
              </div>
            </div>
          </div>

          {/* REFERENCE SECTION */}
          <div className="w-full bg-[#e8d5a6] rounded-md shadow-lg border-2 border-[#8b5a2b] overflow-hidden">
            <div className="bg-[#5c4033] p-4 text-[#f4e4bc] flex items-center gap-2">
              <Landmark className="w-5 h-5" />
              <h3 className="text-lg font-bold uppercase tracking-[0.2em]">Building Reference Guide</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#d2b48c] border-b-2 border-[#8b5a2b] text-[10px] font-bold uppercase tracking-wider text-[#5c4033]">
                    <th className="p-4 text-center">Icon</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4">Building Name</th>
                    <th className="p-4 text-center">Reqs</th>
                    <th className="p-4 text-center">Income</th>
                    <th className="p-4">Placement / Notes</th>
                  </tr>
                </thead>
                <tbody className="text-[11px]">
                  <tr className="border-b border-[#8b5a2b]/20 bg-[#f4e4bc]/50">
                    <td className="p-4 flex justify-center"><div className="w-10 h-10"><HouseIcon /></div></td>
                    <td className="p-4 text-center font-bold">19+</td>
                    <td className="p-4 font-bold uppercase">House / Town House</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center"><RoadReqIcon /></div>
                    </td>
                    <td className="p-4 text-center font-bold">-</td>
                    <td className="p-4 italic text-[#5c4033]">Houses are never bought; they enter play when buildings are built. Townhouses replace houses.</td>
                  </tr>
                  {BUILDING_DATA.map((b, idx) => (
                    <tr key={idx} className={`border-b border-[#8b5a2b]/20 ${idx % 2 === 0 ? 'bg-[#e1c699]/30' : 'bg-transparent'}`}>
                      <td className="p-4 flex justify-center">
                        <div className="w-12 h-12 drop-shadow-sm">{b.icon}</div>
                      </td>
                      <td className="p-4 text-center font-bold text-[#8b0000] text-sm">
                        {b.count}
                      </td>
                      <td className="p-4 font-bold uppercase tracking-tight">
                        {b.name}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          {b.road && <RoadReqIcon />}
                          {b.house > 0 && <HouseReqIcon count={b.house} />}
                        </div>
                      </td>
                      <td className="p-4 text-center font-bold text-green-800 text-sm">{b.income}</td>
                      <td className="p-4 font-semibold text-[#4a3628] tracking-wide leading-tight">{b.condition}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-[#8b5a2b]/10 p-3 border-t border-[#8b5a2b]/30">
              <div className="flex flex-wrap gap-6 text-[10px] font-bold text-[#5c4033] justify-center">
                <div className="flex items-center gap-2 font-black uppercase text-xs">Legend:</div>
                <div className="flex items-center gap-2"><RoadReqIcon /> Connected to Road</div>
                <div className="flex items-center gap-2"><HouseReqIcon count={1} /> Build House(s)</div>
              </div>
            </div>
          </div>

          <div className="bg-[#e8d5a6] p-5 rounded-md border-2 border-dashed border-[#8b5a2b]">
            <h4 className="font-bold uppercase mb-3 text-[#5c4033] flex items-center gap-2"><Info className="w-4 h-4" /> Quick Start Checklist</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 opacity-80 text-xs list-disc pl-4">
              <li>$15 starting funds per player.</li>
              <li>1 Road tile for each player.</li>
              <li>1 Revolver and 3 Cowboys.</li>
              <li>Initial Characters: 1 to 7.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}