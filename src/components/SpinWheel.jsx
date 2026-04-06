// import React from "react";

// const colors = [
//   "#ef4444", // red
//   "#3b82f6", // blue
//   "#8b5cf6", // purple
//   "#22c55e", // green
//   "#f59e0b", // amber
//   "#ec4899", // pink
//   "#06b6d4", // cyan
//   "#f97316", // orange
// ];

// export default function SpinWheel({ players = [] }) {
//   if (!players || players.length === 0) {
//     return (
//       <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full border-4 border-[#3b3b5c] bg-[#111126] shadow-[0_0_50px_rgba(59,130,246,0.2)] flex items-center justify-center text-white">
//         No players added
//       </div>
//     );
//   }

//   const totalPlayers = players.length;
//   const segmentAngle = 360 / totalPlayers;
//   const radius = 180; // Wheel radius
//   const centerX = 200;
//   const centerY = 200;

//   return (
//     <div className="relative w-[400px] h-[400px] rounded-full border-4 border-[#3b3b5c] bg-[#111126] shadow-[0_0_50px_rgba(59,130,246,0.2)] flex items-center justify-center overflow-hidden">
      
//       {/* SPINNING LAYER */}
//       <div className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full">
//         <svg viewBox="0 0 400 400" className="w-full h-full">
//           {players.map((player, index) => {
//             const startAngle = index * segmentAngle;
//             const endAngle = (index + 1) * segmentAngle;
//             const startRad = (startAngle * Math.PI) / 180;
//             const endRad = (endAngle * Math.PI) / 180;
//             const color = colors[index % colors.length];
            
//             // Calculate arc path
//             const x1 = centerX + radius * Math.cos(startRad);
//             const y1 = centerY + radius * Math.sin(startRad);
//             const x2 = centerX + radius * Math.cos(endRad);
//             const y2 = centerY + radius * Math.sin(endRad);
            
//             const largeArc = segmentAngle > 180 ? 1 : 0;
            
//             const pathData = [
//               `M ${centerX} ${centerY}`,
//               `L ${x1} ${y1}`,
//               `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
//               'Z'
//             ].join(' ');
            
//             // Calculate text position (middle of the slice at 60% radius)
//             const midAngle = startAngle + segmentAngle / 2;
//             const midRad = (midAngle * Math.PI) / 180;
//             const textRadius = radius * 0.65;
//             const textX = centerX + textRadius * Math.cos(midRad);
//             const textY = centerY + textRadius * Math.sin(midRad);
            
//             // Calculate text rotation to stay readable
//             const textRotation = midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle;
            
//             return (
//               <g key={index}>
//                 <path
//                   d={pathData}
//                   fill={color}
//                   opacity="0.3"
//                   stroke="#3b3b5c"
//                   strokeWidth="2"
//                 />
//                 <line
//                   x1={centerX}
//                   y1={centerY}
//                   x2={x1}
//                   y2={y1}
//                   stroke="white"
//                   strokeOpacity="0.2"
//                   strokeWidth="2"
//                 />
//                 <text
//                   x={textX}
//                   y={textY}
//                   fill="white"
//                   fontSize="12"
//                   fontWeight="bold"
//                   textAnchor="middle"
//                   dominantBaseline="middle"
//                   transform={`rotate(${textRotation}, ${textX}, ${textY})`}
//                   className="uppercase tracking-wide drop-shadow-lg"
//                 >
//                   {player.name}
//                 </text>
//               </g>
//             );
//           })}
          
//           {/* Inner decorative circles */}
//           <circle cx={centerX} cy={centerY} r="30" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.3"/>
//           <circle cx={centerX} cy={centerY} r="60" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.2"/>
//           <circle cx={centerX} cy={centerY} r="90" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
//         </svg>
//       </div>

//       {/* Center Spinner Node */}
//       <div className="absolute w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(239,68,68,0.6)] border-2 border-red-400">
//         <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
//       </div>

//       {/* Pointer at top */}
//        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-red-400 z-20 drop-shadow-lg" />
//     </div>
//   );
// }