import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import UserPost from "./pages/UserPost";
import UpdatePost from "./pages/UpdatePost";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminDashbord from "./pages/Admin-PC/AdminDashbord";
import AllUsers from "./pages/Admin-PC/AllUsers";
import AllPosts from "./pages/Admin-PC/AllPosts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post-create" element={<CreatePost />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route element={<PrivateRoute />}>
            <Route path="/user/posts" element={<UserPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/update/:id" element={<UpdatePost />} />
          </Route>
          <Route element={<AdminPrivateRoute/>}>

          <Route path="/admin" element={<AdminDashbord />}>
            <Route path="users" element={<AllUsers />} />
            <Route path="posts" element={<AllPosts />} />
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
