"use client"

import type React from "react"

import { useState } from "react"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import emailjs from "@emailjs/browser";


export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    tema: "",
    mensaje: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const templateParams = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      tema: formData.tema,
      mensaje: formData.mensaje,
    };

    // Enviar el correo usando EmailJS
    emailjs
      .send(
        "service_7098h1l", // Reemplaza con tu Service ID
        "template_38pikwd", // Reemplaza con tu Template ID
        templateParams,
        "P7uTbplF4ZBiNftvn" // Reemplaza con tu Public Key
      )
      .then(
        (response) => {
          console.log("Correo enviado con éxito:", response);
          alert("¡Mensaje enviado con éxito!");
        },
        (error) => {
          console.error("Error al enviar el correo:", error);
          alert("Ocurrió un error al enviar el mensaje.");
        }
      );
  }

  return (
    <div className=" w-full flex mt-15 items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Sección de información de contacto */}
        <div className="space-y-12 flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Contacto</h1>
            <div className="w-full h-0.5 bg-white/20 mb-8"></div>

            <div className="space-y-2 mb-8">
              <p className="text-white/70">Email</p>
              <p className="text-white text-xl">wikinbound@proyectos.com</p>
            </div>

            <div className="w-full h-0.5 bg-white/20 mb-8"></div>

            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full">
                <Phone className="text-white h-6 w-6" />
              </div>
              <div>
                <p className="text-white/70">Teléfonos</p>
                <p className="text-white text-xl">+54 11 232341234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className=" backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-white">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="apellidos" className="text-white">
                  Apellido
                </label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-white">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="telefono" className="text-white">
                  Teléfono
                </label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-white">
                  Tema
                </label>
                <Input
                  id="tema"
                  name="tema"
                  type="input"
                  value={formData.tema}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>

            </div>

            <div className="space-y-2">
              <label htmlFor="mensaje" className="text-white">
                Mensaje
              </label>
              <Input
                id="mensaje"
                name="mensaje"
                type="text"
                placeholder="Ingresar el mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className="bg-white/10 border-white/20 text-white"
                required
              />
            </div>

            <div className="flex justify-end mt-8">
              <Button
                type="submit"
                className="bg-transparent hover:bg-white/10 text-white border border-white/50 px-8 py-2 rounded-md"
              >
                ENVIAR
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

