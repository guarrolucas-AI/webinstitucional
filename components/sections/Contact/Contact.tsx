"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, Users, Video, Phone, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMeetingAction, getAvailableSlotsAction } from "@/actions/create-meeting";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    asunto: "",
    fechaPreferida: "",
    horaPreferida: "",
    duracion: "",
    participantes: "",
    agenda: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
    meetLink: undefined,
    alternativeSlots: undefined,
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-20% 0px" });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const containerFade = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  useEffect(() => {
    if (formData.fechaPreferida) {
      checkAvailableSlots(formData.fechaPreferida);
    }
  }, [formData.fechaPreferida]);

  const checkAvailableSlots = async (date: string) => {
    setIsCheckingAvailability(true);
    try {
      const result = await getAvailableSlotsAction(date);
      if (result.success) {
        setAvailableSlots(result.slots);
      }
    } catch {
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "", meetLink: undefined, alternativeSlots: undefined });

    try {
      const result = await createMeetingAction(formData);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Reunión creada exitosamente. Se han enviado las invitaciones por email.",
          meetLink: result.meetLink ?? undefined,
        });
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          asunto: "",
          fechaPreferida: "",
          horaPreferida: "",
          duracion: "",
          participantes: "",
          agenda: "",
        });
        setAvailableSlots([]);
      } else if (result.availableSlots) {
        setSubmitStatus({
          type: "conflict",
          message: result.error || "El horario seleccionado no está disponible.",
          alternativeSlots: result.availableSlots,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Error al crear la reunión. Inténtalo de nuevo.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Error inesperado. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "horaPreferida" && submitStatus.type === "conflict") {
      setSubmitStatus({ type: null, message: "", meetLink: undefined, alternativeSlots: undefined });
    }
  };

  const selectAlternativeSlot = (slot: string) => {
    handleChange("horaPreferida", slot);
    setSubmitStatus({ type: null, message: "", meetLink: undefined, alternativeSlots: undefined });
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const hourNum = Number.parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={containerFade}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex mt-15 items-center justify-center p-4"
    >
      <motion.div
        variants={fadeInUp}
        className="w-full max-w-6xl grid md:grid-cols-2 gap-8"
      >
        {/* Sección izquierda */}
        <motion.div variants={fadeInUp} className="space-y-12 flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Agendá una reunión</h1>
            <div className="w-full h-0.5 bg-white/20 mb-8" />
            <div className="space-y-2 mb-8">
              <p className="text-white/70">Email</p>
              <p className="text-white text-xl">proyectos@wikinbound.com</p>
            </div>
            <div className="w-full h-0.5 bg-white/20 mb-8" />
            <div className="flex items-center mb-8 gap-4">
              <div className="bg-white/10 p-3 rounded-full">
              <Link href={'https://wa.me/5491166614164'}>
                <Phone className="text-white h-6 w-6" />
              </Link>
              </div>
              <div>
                <p className="text-white/70">Teléfonos</p>
                <p className="text-white text-xl">+54 9 11 6661-4164</p>
              </div>
            </div>
            <div className="w-full h-0.5 bg-white/20 mb-8" />
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-green-200">
                <Calendar className="w-5 h-5" />
                <span>Reuniones disponibles de Lunes a Viernes</span>
              </div>
              <div className="flex items-center space-x-3 text-green-200">
                <Clock className="w-5 h-5" />
                <span>Horario: 9:00 AM - 6:00 PM (GMT-3)</span>
              </div>
              <div className="flex items-center space-x-3 text-green-200">
                <Users className="w-5 h-5" />
                <span>Hasta 50 participantes por reunión</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Formulario */}
        <motion.div variants={fadeInUp} className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <motion.form
  onSubmit={handleSubmit}
  className="space-y-6"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="nombre" className="text-white text-sm font-medium">
        Nombre *
      </Label>
      <Input
        id="nombre"
        value={formData.nombre}
        onChange={(e) => handleChange("nombre", e.target.value)}
        className="mt-2 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
        required
        disabled={isSubmitting}
      />
    </div>
    <div>
      <Label htmlFor="apellido" className="text-white text-sm font-medium">
        Apellido *
      </Label>
      <Input
        id="apellido"
        value={formData.apellido}
        onChange={(e) => handleChange("apellido", e.target.value)}
        className="mt-2 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
        required
        disabled={isSubmitting}
      />
    </div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="email" className="text-white text-sm font-medium">
        Email *
      </Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        className="mt-2 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
        required
        disabled={isSubmitting}
      />
    </div>
    <div>
      <Label htmlFor="telefono" className="text-white text-sm font-medium">
        Teléfono
      </Label>
      <Input
        id="telefono"
        value={formData.telefono}
        onChange={(e) => handleChange("telefono", e.target.value)}
        className="mt-2 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
        disabled={isSubmitting}
      />
    </div>
  </div>

  <div>
    <Label htmlFor="asunto" className="text-white text-sm font-medium">
      Asunto de la reunión *
    </Label>
    <Input
      id="asunto"
      value={formData.asunto}
      onChange={(e) => handleChange("asunto", e.target.value)}
      className="mt-2 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
      placeholder="Ej: Revisión de proyecto, Consulta técnica..."
      required
      disabled={isSubmitting}
    />
  </div>

  <div className="grid grid-cols-1 gap-6">
    <div>
      <Label className="text-white text-sm font-medium mb-3 block">Fecha y hora preferida *</Label>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <Input
            id="fechaPreferida"
            type="date"
            value={formData.fechaPreferida}
            onChange={(e) => handleChange("fechaPreferida", e.target.value)}
            className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
            required
            disabled={isSubmitting}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <Select
            onValueChange={(value) => handleChange("horaPreferida", value)}
            disabled={isSubmitting}
            value={formData.horaPreferida}
          >
            <SelectTrigger className="pl-10 bg-black/30 border-white/20 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20">
              <SelectValue placeholder="Seleccionar hora" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              {availableSlots.map((slot) => (
                <SelectItem key={slot} value={slot} className="text-white hover:bg-gray-800">
                  {formatTime(slot)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-green-200/70 text-xs mt-2">
        {formData.fechaPreferida && availableSlots.length === 0 && !isCheckingAvailability
          ? "No hay horarios disponibles para esta fecha"
          : "Horario disponible: Lunes a Viernes, 9:00 AM - 6:00 PM (GMT-3)"}
      </p>
    </div>
  </div>

  <div>
    <Label htmlFor="duracion" className="text-white text-sm font-medium">
      Duración estimada *
    </Label>
    <Select onValueChange={(value) => handleChange("duracion", value)} disabled={isSubmitting}>
      <SelectTrigger className="mt-2 bg-black/30 border-white/20 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20">
        <SelectValue placeholder="Seleccionar duración" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 border-gray-700">
        <SelectItem value="30" className="text-white hover:bg-gray-800">30 minutos</SelectItem>
        <SelectItem value="45" className="text-white hover:bg-gray-800">45 minutos</SelectItem>
        <SelectItem value="60" className="text-white hover:bg-gray-800">1 hora</SelectItem>
        <SelectItem value="90" className="text-white hover:bg-gray-800">1.5 horas</SelectItem>
        <SelectItem value="120" className="text-white hover:bg-gray-800">2 horas</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div>
    <Label htmlFor="participantes" className="text-white text-sm font-medium">
      Número de participantes
    </Label>
    <Input
      id="participantes"
      type="number"
      min="1"
      max="50"
      value={formData.participantes}
      onChange={(e) => handleChange("participantes", e.target.value)}
      className="mt-2 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
      placeholder="Ej: 5"
      disabled={isSubmitting}
    />
  </div>

  <div>
    <Label htmlFor="agenda" className="text-white text-sm font-medium">
      Agenda / Descripción *
    </Label>
    <Textarea
      id="agenda"
      value={formData.agenda}
      onChange={(e) => handleChange("agenda", e.target.value)}
      className="mt-2 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 min-h-[100px]"
      placeholder="Describe los temas a tratar en la reunión..."
      required
      disabled={isSubmitting}
    />
  </div>

  <Button
    type="submit"
    disabled={isSubmitting || !formData.horaPreferida || availableSlots.length === 0}
    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
  >
    {isSubmitting ? (
      <>
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        <span>CREANDO REUNIÓN...</span>
      </>
    ) : (
      <>
        <Video className="w-5 h-5" />
        <span>CREAR REUNIÓN DE GOOGLE MEET</span>
      </>
    )}
  </Button>
</motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
