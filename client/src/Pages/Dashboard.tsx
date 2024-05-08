// import { useSearchContext } from "./DispatcherGate";

// export function Dashboard() {
//   const { searchResults }: any = useSearchContext();
//   return (
//     <>
//       <div>
//         <h2>Dashboard</h2>
//       </div>

//       <div>
//         <div>
//           <button>All Package</button>
//         </div>
//         <div>
//           <button>Route in action soon</button>
//         </div>
//         <div>
//           <button>Single Package</button>
//         </div>
//         <div>
//           <button>Clock-in/out</button>
//         </div>
//       </div>

//       {searchResults && searchResults.length > 0 && (
//         <div>
//           {searchResults.map((result: string, index: number) => {
//             return <div key={index}>{result}</div>;
//           })}
//         </div>
//       )}
//     </>
//   );
// }
