import { FC } from "react";
import { User } from "../typings/user";
import { useNavigate } from "react-router-dom";
interface Props {
  users: User[];
}
export const Table: FC<Props> = ({ users }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Nombres
            </th>
            <th scope="col" className="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" className="px-6 py-3">
              Login
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Creacion
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Modificacion
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.nombres}</td>
              <td className="px-6 py-4">{user.apellidos}</td>
              <td className="px-6 py-4">{user.login}</td>
              <td className="px-6 py-4">{user.estado}</td>
              <td className="px-6 py-4">
                {new Date(user.fechaCreacion).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                {new Date(user.fechaActualizacion).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <button
                  className="border border-gray-400"
                  type="button"
                  onClick={() => navigate(`/user/${user.id}`)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
