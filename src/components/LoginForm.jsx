"use client";

import React, { useState } from "react";

const LoginForm = () => {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newCredentialData = { ...userData, [name]: value };
    setuserData(newCredentialData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Credenciales invalidas");
      }
      const json = await response.json();
      alert("Credenciales validas");
    } catch (error) {
      alert("Algo salio mal");
    }
    setuserData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black justify-items-center ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-xl px-10 py-16 rounded-3xl bg-primary "
        >
          <div className="flex flex-col items-center justify-center justify-items-center text-secundary">
            <p className="mb-5 text-2xl">Iniciar sesión</p>
          </div>
          <div className="flex flex-col space-y-3">
            <input
              className="px-6 py-3 bg-black rounded-full "
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="email"
            ></input>
            <input
              className="px-6 py-3 bg-black rounded-full"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="password"
            ></input>
            <button className="px-6 py-2 rounded-full bg-secundary">
              Ingresar
            </button>
          </div>
          <p className="mt-5 text-center">
            ¿No tienes cuenta?{" "}
            <span className="text-secundary">Registrate</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
