import "./App.css";
import { useEffect, useState } from "react";
import { userClient } from "./client/user";
import { User, UserResponse } from "./typings/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dashboard } from "./components/Dashboard";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { CreateUser } from "./components/CreateUser";
import { UpdateUser } from "./components/UpdateUser";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await userClient.get<UserResponse>("/users");
        setUsers(data);
      } catch (error) {
        toast.error("No se pudo obtener usuarios");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<Dashboard users={users} loading={loading} />}
        />
        <Route path="/new-user" element={<CreateUser />} />
        <Route path="/user/:userId" element={<UpdateUser />} />
      </Routes>
    </>
  );
}
