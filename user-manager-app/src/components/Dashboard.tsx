import { FC, useState } from "react";
import { User } from "../typings/user";
import { Table } from "./Table";
import { useNavigate } from "react-router-dom";

interface Props {
  users: User[];
  loading: boolean;
}

export const Dashboard: FC<Props> = ({ users, loading }) => {
  const [name, setName] = useState("");
  const [state, setState] = useState("Seleccionar estado");
  const navigate = useNavigate();

  const filteredUsers = users.filter(
    (user) =>
      user.nombres.toLowerCase().includes(name.toLowerCase()) ||
      user.login.toLowerCase().includes(name.toLowerCase())
  );

  const filteredState =
    state !== "Seleccionar estado"
      ? filteredUsers.filter((user) => user.estado.includes(state))
      : filteredUsers;

  return (
    <>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <>
          <h2 className="text-xl">Gestion Usuarios</h2>
          <div className="w-full my-4 flex justify-around gap-4">
            <input
              className="w-full p-2 rounded-lg"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <select
              className="p-2 rounded-sm"
              name="estado"
              id="estado"
              value={state}
              onChange={({ target }) => setState(target.value)}>
              <option>Seleccionar estado</option>
              <option value="Activo">Activo</option>
              <option value="Bloqueado">Bloqueado</option>
              <option value="Eliminado">Eliminado</option>
            </select>
            <button
              type="button"
              className="border border-gray-500 whitespace-nowrap"
              onClick={() => navigate("/new-user")}>
              Nuevo Usuario
            </button>
          </div>
          <br />
          <Table users={filteredState} />
        </>
      )}
    </>
  );
};
