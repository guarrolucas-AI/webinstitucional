"use client"

import type React from "react"

import { useState } from "react"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    fechaNacimiento: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
    // Aquí iría la lógica para enviar los datos
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-900 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Sección de información de contacto */}
        <div className="space-y-12 flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Contacto</h1>
            <div className="w-full h-0.5 bg-white/20 mb-8"></div>

            <div className="space-y-2 mb-8">
              <p className="text-white/70">Gmail</p>
              <p className="text-white text-xl">wikinbound@proyectos.com</p>
            </div>

            <div className="w-full h-0.5 bg-white/20 mb-8"></div>

            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-full">
                <Phone className="text-white h-6 w-6" />
              </div>
              <div>
                <p className="text-white/70">Teléfonos</p>
                <p className="text-white text-xl">+54 11 365754258</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-gradient-to-br from-indigo-900 via-purple-800 to-green-600 p-8 rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-white">
                  Nombre completo
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
                  Apellidos
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
                  Gmail
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

            <div className="space-y-2">
              <label htmlFor="fechaNacimiento" className="text-white">
                Fecha de nacimiento
              </label>
              <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="text"
                placeholder="07 de Marzo de 2025"
                value={formData.fechaNacimiento}
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

