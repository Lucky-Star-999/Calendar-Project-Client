import InvitationPending from "./invitationpending/InvitationPending.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./homepage/Homepage.js";
import Invitation from "./invitation/Invitation.js";
import Login from "./user/Login.js";
import CreateNewEvent from "./createnewevent/CreateNewEvent.js";
import CreateEventResult from "./createnewevent/CreateEventResult.js";
import EditEvent from "./editevent/EditEvent.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route path="/invitations" element={<Invitation />}></Route>
          <Route path="/pending-invitations" element={<InvitationPending />}></Route>
          <Route path="/create-new-event" element={<CreateNewEvent />}></Route>
          <Route path="/create-new-event/result" element={<CreateEventResult />}></Route>
          <Route path="/edit-event" element={<EditEvent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
