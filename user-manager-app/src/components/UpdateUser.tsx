import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userClient } from "../client/user";
import { useUpload } from "../context/UserProvider";

export const UpdateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    login: "",
  });
  const [state, setState] = useState("Activo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { upload, setUpload } = useUpload();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userClient.get(`/users/${userId}`);
        setInputs({
          firstName: data.nombres,
          lastName: data.apellidos,
          login: data.login,
        });
        setState(data.estado);
      } catch (error) {
        toast.error("No se encontro usuario");
        setError(true);
      }
    })();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      nombres: inputs.firstName,
      apellidos: inputs.lastName,
      login: inputs.login,
      estado: state,
    };
    try {
      setLoading(true);
      await userClient.put(`/users/${userId}`, data);
      toast.success("Usuario actualizado. Volver a pagina principal");
      setUpload(!upload);
    } catch (error) {
      toast.error("Error creando usuario");
    } finally {
      setLoading(false);
    }
  };

  if (error)
    return (
      <div>
        <Link to="/">Regresa a la pagina principal</Link>
      </div>
    );

  return (
    <div>
      <h2 className="mb-4 text-2xl">Actualizar Usuario</h2>
      <div>
        <form
          className="flex flex-col gap-3 max-w-sm m-auto"
          onSubmit={handleSubmit}>
          <input
            className="p-2 rounded-md"
            placeholder="Nombres"
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 rounded-md"
            placeholder="Apellidos"
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={handleChange}
            required
          />
          <input
            className="p-2 rounded-md"
            placeholder="Login"
            type="text"
            name="login"
            value={inputs.login}
            onChange={handleChange}
            required
          />
          <select
            className="p-2 rounded-sm"
            name="estado"
            id="estado"
            value={state}
            onChange={({ target }) => setState(target.value)}>
            <option value="Activo">Activo</option>
            <option value="Bloqueado">Bloqueado</option>
            <option value="Eliminado">Eliminado</option>
          </select>
          <div className="flex gap-2 w-full">
            <button
              className="w-full bg-gray-400 text-black"
              type="button"
              onClick={() => navigate("/")}>
              Regresar
            </button>
            <button
              type="submit"
              className="border border-gray-400 w-full"
              disabled={loading}>
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
