"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, easeInOut, useAnimation, useInView } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Video,
  Phone,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  MessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createMeetingAction,
  getAvailableSlotsAction,
} from "@/actions/create-meeting";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeInOut } },
};

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
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "conflict" | null;
    message: string;
    meetLink?: string;
    alternativeSlots?: string[];
  }>({ type: null, message: "" });

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: false }); // 30% visible para disparar
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden");
  }, [isInView, controls]);

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
      // Error checking availability
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await createMeetingAction(formData);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Reunión creada exitosamente. Se han enviado las invitaciones por email.",
          meetLink: result.meetLink ?? undefined,
        });
        // Limpiar formulario
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
          message:
            result.error || "El horario seleccionado no está disponible.",
          alternativeSlots: result.availableSlots,
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error || "Error al crear la reunión. Inténtalo de nuevo.",
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

    // Limpiar estado de conflicto cuando el usuario cambia la hora
    if (field === "horaPreferida" && submitStatus.type === "conflict") {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const selectAlternativeSlot = (slot: string) => {
    handleChange("horaPreferida", slot);
    setSubmitStatus({ type: null, message: "" });
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const hourNum = Number.parseInt(hour);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const displayHour =
      hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="w-full flex mt-15 pb-30 items-center justify-center"
    >
      <div id="contacto" className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Sección de información de contacto */}
        <div className="space-y-12 w-full flex flex-col justify-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Agendá una reunión
            </h1>
            <div className="w-full h-0.5 bg-white/20 mb-8"></div>

            <div className="space-y-2 mb-8">
              <p className="text-white/70">Email</p>
              <p className="text-white text-xl">contacto@wikinbound.com</p>

              <div className="w-full h-0.5 bg-white/20 mb-8"></div>

              <div className="flex items-center mb-8 gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Phone className="text-white h-6 w-6" />
                </div>
                <div>
                  <p className="text-white/70">Teléfonos</p>
                  <p className="text-white text-xl">+54 9 11 5834-6643</p>

                  <Link
                    href="https://wa.me/5491158346643"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full px-1 py-2
             text-green-500/70w hover:text-green-400 transition"
                  >
                    <p>WhatsApp</p>

                    <span className="relative flex h-6 w-6">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/70 opacity-30"></span>
                      <MessageCircleMore size={22} className="relative" />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="w-full h-0.5 bg-white/20 mb-8"></div>

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
                {formData.fechaPreferida && (
                  <div className="bg-green-900/30 rounded-lg p-6 mt-8">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Horarios disponibles
                      {isCheckingAvailability && (
                        <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                      )}
                    </h3>
                    {isCheckingAvailability ? (
                      <p className="text-green-200 text-sm">
                        Verificando disponibilidad...
                      </p>
                    ) : availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleChange("horaPreferida", slot)}
                            className={`text-xs p-2 rounded transition-colors ${
                              formData.horaPreferida === slot
                                ? "bg-green-600 text-white"
                                : "bg-green-800/50 text-green-200 hover:bg-green-700/50"
                            }`}
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-red-300 text-sm">
                        No hay horarios disponibles para esta fecha.
                      </p>
                    )}
                  </div>
                )}

                {/* Proceso automático */}
                <div className="bg-green-900/30 rounded-lg p-6 mt-8">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Proceso automático
                  </h3>
                  <div className="space-y-3 text-green-200 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Verificación automática de disponibilidad</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        Se crea automáticamente la reunión de Google Meet
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>
                        Se envían invitaciones por email a ambas partes
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Recordatorios automáticos 15 min antes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="bg-black/20 backdrop-blur-sm  w-full rounded-2xl p-8 border border-white/10">
          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
                submitStatus.type === "success"
                  ? "bg-green-900/50 border border-green-500/30"
                  : submitStatus.type === "conflict"
                  ? "bg-yellow-900/50 border border-yellow-500/30"
                  : "bg-red-900/50 border border-red-500/30"
              }`}
            >
              {submitStatus.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    submitStatus.type === "conflict"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    submitStatus.type === "success"
                      ? "text-green-200"
                      : submitStatus.type === "conflict"
                      ? "text-yellow-200"
                      : "text-red-200"
                  }`}
                >
                  {submitStatus.message}
                </p>
                {submitStatus.meetLink && (
                  <a
                    href={submitStatus.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 text-sm underline mt-2 block"
                  >
                    Abrir enlace de Google Meet
                  </a>
                )}
                {submitStatus.alternativeSlots &&
                  submitStatus.alternativeSlots.length > 0 && (
                    <div className="mt-3">
                      <p className="text-yellow-200 text-sm mb-2">
                        Horarios alternativos disponibles:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {submitStatus.alternativeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => selectAlternativeSlot(slot)}
                            className="text-xs p-2 bg-yellow-800/50 text-yellow-200 rounded hover:bg-yellow-700/50 transition-colors"
                          >
                            {formatTime(slot)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="nombre"
                  className="text-white text-sm font-medium"
                >
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
                <Label
                  htmlFor="apellido"
                  className="text-white text-sm font-medium"
                >
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
                <Label
                  htmlFor="email"
                  className="text-white text-sm font-medium"
                >
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
                <Label
                  htmlFor="telefono"
                  className="text-white text-sm font-medium"
                >
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
              <Label
                htmlFor="asunto"
                className="text-white text-sm font-medium"
              >
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
                <Label className="text-white text-sm font-medium mb-3 block">
                  Fecha y hora preferida *
                </Label>

                {/* Grilla responsiva: 1 columna en mobile, 2 en md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Fecha */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <Input
                      id="fechaPreferida"
                      type="date"
                      value={formData.fechaPreferida}
                      onChange={(e) =>
                        handleChange("fechaPreferida", e.target.value)
                      }
                      className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 w-full"
                      required
                      disabled={isSubmitting}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  {/* Hora */}
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                    <Select
                      onValueChange={(value) =>
                        handleChange("horaPreferida", value)
                      }
                      disabled={isSubmitting}
                      value={formData.horaPreferida}
                    >
                      <SelectTrigger className="pl-10 bg-black/30 border-white/20 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20 w-full">
                        <SelectValue placeholder="Seleccionar hora" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        {availableSlots.map((slot) => (
                          <SelectItem
                            key={slot}
                            value={slot}
                            className="text-white hover:bg-gray-800"
                          >
                            {formatTime(slot)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <p className="text-green-200/70 text-xs mt-2">
                  {formData.fechaPreferida &&
                  availableSlots.length === 0 &&
                  !isCheckingAvailability
                    ? "No hay horarios disponibles para esta fecha"
                    : "Horario disponible: Lunes a Viernes, 9:00 AM - 6:00 PM (GMT-3)"}
                </p>
              </div>
            </div>

            <div>
              <Label
                htmlFor="duracion"
                className="text-white text-sm font-medium"
              >
                Duración estimada *
              </Label>
              <Select
                onValueChange={(value) => handleChange("duracion", value)}
                disabled={isSubmitting}
              >
                <SelectTrigger className="mt-2 bg-black/30 border-white/20 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/20">
                  <SelectValue placeholder="Seleccionar duración" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem
                    value="30"
                    className="text-white hover:bg-gray-800"
                  >
                    30 minutos
                  </SelectItem>
                  <SelectItem
                    value="45"
                    className="text-white hover:bg-gray-800"
                  >
                    45 minutos
                  </SelectItem>
                  <SelectItem
                    value="60"
                    className="text-white hover:bg-gray-800"
                  >
                    1 hora
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="participantes"
                className="text-white text-sm font-medium"
              >
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
              <Label
                htmlFor="agenda"
                className="text-white text-sm font-medium"
              >
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
              disabled={
                isSubmitting ||
                !formData.horaPreferida ||
                availableSlots.length === 0
              }
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
          </form>
        </div>
      </div>
    </motion.div>
  );
}
