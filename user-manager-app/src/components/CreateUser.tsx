import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userClient } from "../client/user";

export const CreateUser = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
  });
  const [state, setState] = useState("Activo");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      nombres: inputs.firstName,
      apellidos: inputs.lastName,
      login: inputs.login,
      password: inputs.password,
      estado: state,
    };
    try {
      setLoading(true);
      await userClient.post("/users", data);
      toast.success("Usuario creado. Volver a pagina principal");
    } catch (error) {
      toast.error("Error creando usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl">Crear Usuario</h2>
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
          <input
            className="p-2 rounded-md"
            placeholder="Password"
            type="password"
            name="password"
            value={inputs.password}
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
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
