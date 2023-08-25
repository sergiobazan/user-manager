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
import { UserProvider, useUpload } from "./context/UserProvider";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

export default function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

function Root() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const { upload } = useUpload();

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
  }, [upload]);

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
