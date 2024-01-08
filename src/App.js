import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import SetAvatar from "./Avatar/SetAvatar";
import Chat from "./Chat/Chat";
import Login from "./Login/Login";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      
        {/* <AuthenticatedRoute path="/" element={<Chat />} /> */}

        <Route path="/" element={<Chat />} />
 

      </Routes>
    </BrowserRouter>
  );
}

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./Register/Register";
// import SetAvatar from "./Avatar/Avatar";
// import Chat from "./Chat/Chat";
// import Login from "./Login/Login";
// // import AuthenticatedRoute from "./Login/AuthenticatedRoute";
// import AuthenticatedRoute from './Login/AuthenticatedRoute';
// import AuthenticatedLayout from './path/to/AuthenticatedLayout';


// export default function App() {
//   return (
//     <BrowserRouter>
//       {/* <Routes> */}
//         {/* <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/setAvatar" element={<SetAvatar />} />
//         <Route
//           path="/"
//           element={
//             <Routes>
//               {" "}
//               // Wrap AuthenticatedRoute in Routes
//               <AuthenticatedRoute>
//                 <Route path="/" element={<Chat />} /> // Use path="/" here
//               </AuthenticatedRoute>
//             </Routes>
//           }
//         />
//       </Routes> */}

// <Routes>
//   <Route path="/register" element={<Register />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/setAvatar" element={<SetAvatar />} />

//   {/* <AuthenticatedRoute path="/" element={<Chat />} />  // Protected route */}

//   <AuthenticatedRoute path="/">
//   <AuthenticatedLayout>
//     <Outlet />  // Render nested routes within the layout
//   </AuthenticatedLayout>
// </AuthenticatedRoute>

// <Route path="/" element={<Chat />} />  // Nested route


// </Routes>


//     </BrowserRouter>
//   );
// }
