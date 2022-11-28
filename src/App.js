import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvitationPending from "./invitationpending/InvitationPending.js";
import Homepage from "./homepage/Homepage.js";
import Invitation from "./invitation/Invitation.js";
import Login from "./user/Login.js";
import CreateNewUser from "./user/CreateNewUser.js";
import CreateUserResult from "./user/CreateUserResult.js";
import CreateNewEvent from "./createnewevent/CreateNewEvent.js";
import CreateEventResult from "./createnewevent/CreateEventResult.js";
import EditEvent from "./editevent/EditEvent.js";
import Profile from "./profile/Profile.js";

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
					<Route path="/create-user" element={<CreateNewUser />}></Route>
					<Route path="/create-user/result" element={<CreateUserResult />}></Route>
					<Route path="/profile" element={<Profile />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
