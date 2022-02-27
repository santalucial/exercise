import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateUser, Home, EditUser } from "./routes";
import { SharedStoreProvider } from "./components/Store";
import ErrorBoundary from "./components/ErrorBonduary";

export default function App() {
  return (
    <ErrorBoundary>
      <SharedStoreProvider>
        <Router>
          <div>
            {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul> 
        </nav> */}

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/edit/:userId" element={<EditUser />} />
              <Route path="/edit" element={<CreateUser />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
      </SharedStoreProvider>
    </ErrorBoundary>
  );
}

// export default function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//  App;

//TODO stack edit
