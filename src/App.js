import InvitationPending from "./invitationpending/InvitationPending.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./homepage/Homepage.js";
import Invitation from "./invitation/Invitation.js";
import Login from "./user/Login.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/invitations" element={<Invitation />}></Route>
          <Route path="/pending-invitations" element={<InvitationPending />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
