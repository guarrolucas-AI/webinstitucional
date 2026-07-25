"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n/LocaleContext";
import {
  runSimulation,
  type CompanySize,
  type Industry,
  type SimulationResult,
} from "@/lib/business-simulator";
import { submitSimulatorLead } from "@/actions/submit-lead";

const INDUSTRIES: Industry[] = ["retail", "tecnologia", "servicios", "alimentos", "salud", "otro"];
const SIZES: CompanySize[] = ["small", "medium", "large"];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function BusinessSimulator() {
  const { t } = useI18n();
  const s = t.simulador;

  const [activeTab, setActiveTab] = useState<"chat" | "manual" | "dashboard">("manual");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState<Industry | "">("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [size, setSize] = useState<CompanySize | "">("");
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

  const isFormValid = companyName.trim() !== "" && industry !== "" && size !== "" && Number(monthlyRevenue) > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setResult(
      runSimulation({
        companyName: companyName.trim(),
        industry,
        monthlyRevenue: Number(monthlyRevenue),
        size,
      })
    );
    setActiveTab("dashboard");
  };

  const handleReset = () => {
    setResult(null);
    setCompanyName("");
    setIndustry("");
    setMonthlyRevenue("");
    setSize("");
    setLeadEmail("");
    setLeadStatus("idle");
    setActiveTab("manual");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!result || !leadEmail.trim()) return;

    setLeadStatus("submitting");
    const response = await submitSimulatorLead({
      email: leadEmail.trim(),
      companyName: result.companyName,
      industry: s.form.industries[result.industry],
      monthlyRevenue: result.monthlyRevenue,
      monthlyGrowthRate: result.monthlyGrowthRate,
      projection3: result.projection3,
      projection6: result.projection6,
      projection12: result.projection12,
    });
    setLeadStatus(response.success ? "success" : "error");
  };

  return (
    <section id='simulador' className="w-full mt-20 max-w-6xl mx-auto" ref={sectionRef}>
      <motion.div
        className="relative"
        variants={containerFade}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="absolute pointer-events-none top-0 right-0 w-full flex justify-center">
          <Image src='w.svg' width={980} height={980} alt="Decoración W" />
        </div>

        <motion.h1 variants={fadeInUp} className="text-5xl mb-16 font-normal text-white text-center">
          {s.heading}
        </motion.h1>

        <motion.div variants={fadeInUp} className="rounded-3xl overflow-hidden bg-white/5">
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <h2 className="text-5xl font-normal text-white">
                {s.title1}<br />{s.title2}
              </h2>
              <p className="text-white/80 text-2xl whitespace-pre-line">
                {s.description}
              </p>
              <p className="text-green-300 opacity-80 mt-10">
                {s.warning}
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
                <TabsList className="bg-black/20 mb-4 p-1 w-full flex justify-between">
                  <TabsTrigger value="chat" className="flex-1 text-white mr-2 border-r border-orange-500/30 data-[state=active]:bg-white data-[state=active]:text-black">
                    {s.tabs.chat}
                  </TabsTrigger>
                  <TabsTrigger value="manual" className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-black rounded-md">
                    {s.tabs.manual}
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" className="flex-1 text-white data-[state=active]:border-white data-[state=active]:text-black rounded-md">
                    {s.tabs.dashboard}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual">
                  <div className="border border-white/20 rounded-lg p-6 text-white">
                    <h3 className="text-xl mb-4">{s.form.title}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name" className="block text-white">{s.form.name}</Label>
                        <Input
                          id="company-name"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder={s.form.namePlaceholder}
                          className="bg-transparent border-white/30 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="block text-white">{s.form.industry}</Label>
                        <Select value={industry} onValueChange={(v) => setIndustry(v as Industry)}>
                          <SelectTrigger className="bg-transparent border-white/30 text-white w-full">
                            <SelectValue placeholder={s.form.industryPlaceholder} />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            {INDUSTRIES.map((key) => (
                              <SelectItem key={key} value={key} className="text-white hover:bg-gray-800">
                                {s.form.industries[key]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="monthly-revenue" className="block text-white">{s.form.revenue}</Label>
                        <Input
                          id="monthly-revenue"
                          type="number"
                          min="1"
                          value={monthlyRevenue}
                          onChange={(e) => setMonthlyRevenue(e.target.value)}
                          placeholder={s.form.revenuePlaceholder}
                          className="bg-transparent border-white/30 text-white"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="block text-white">{s.form.size}</Label>
                        <Select value={size} onValueChange={(v) => setSize(v as CompanySize)}>
                          <SelectTrigger className="bg-transparent border-white/30 text-white w-full">
                            <SelectValue placeholder={s.form.sizePlaceholder} />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            {SIZES.map((key) => (
                              <SelectItem key={key} value={key} className="text-white hover:bg-gray-800">
                                {s.form.sizes[key]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button type="submit" disabled={!isFormValid} className="bg-white text-black hover:bg-white/90 disabled:opacity-50">
                          {s.form.submit}
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>

                <TabsContent value="chat">
                  <div className="relative border border-white/20 rounded-lg p-6 text-white overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <p className="text-white text-xl font-semibold px-4 mb-2">
                          {s.chat.developing}
                        </p>
                        <p className="text-white/70 text-sm">
                          {s.chat.soon}
                        </p>
                      </div>
                    </div>

                    <div className="pointer-events-none select-none opacity-30 space-y-6">
                      <h3 className="text-xl mb-3">{s.chat.title}</h3>
                      <form className="mt-4 flex gap-2">
                        <Input type="text" placeholder={s.chat.placeholder} className="bg-transparent border-white/30 text-white flex-1" disabled />
                        <Button type="submit" className="bg-white text-black hover:bg-white/90" disabled>
                          {s.chat.send}
                        </Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dashboard">
                  <div className="border border-white/20 rounded-lg p-6 text-white">
                    {!result ? (
                      <p className="text-white/70 text-sm">{s.results.empty}</p>
                    ) : (
                      <div className="space-y-6">
                        <h3 className="text-xl font-regular">{s.results.title}</h3>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <p className="text-white/60">{s.results.company}</p>
                            <p className="text-white text-xl">{result.companyName}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/60">{s.results.industry}</p>
                            <p className="text-white text-xl">{s.form.industries[result.industry]}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/60">{s.results.currentRevenue}</p>
                            <p className="text-green-300 text-xl">{currencyFormatter.format(result.monthlyRevenue)}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/60">{s.results.growthRate}</p>
                            <p className="text-green-300 text-xl">+{(result.monthlyGrowthRate * 100).toFixed(1)}%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/60">{s.results.month3}</p>
                            <p className="text-green-300 text-xl">{currencyFormatter.format(result.projection3)}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/60">{s.results.month6}</p>
                            <p className="text-green-300 text-xl">{currencyFormatter.format(result.projection6)}</p>
                          </div>
                          <div className="space-y-1 col-span-2">
                            <p className="text-white/60">{s.results.month12}</p>
                            <p className="text-green-300 text-xl">{currencyFormatter.format(result.projection12)}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-white/60 text-sm">{s.results.suggestion}</p>
                          <p className="text-white/90 text-sm">{s.suggestions[result.industry]}</p>
                        </div>

                        <div className="rounded-lg border border-white/20 bg-white/5 p-4 space-y-3">
                          <div>
                            <p className="text-white font-medium">{s.lead.heading}</p>
                            <p className="text-white/70 text-sm">{s.lead.description}</p>
                          </div>
                          {leadStatus === "success" ? (
                            <p className="text-green-300 text-sm">{s.lead.success}</p>
                          ) : (
                            <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row gap-2">
                              <Input
                                type="email"
                                value={leadEmail}
                                onChange={(e) => setLeadEmail(e.target.value)}
                                placeholder={s.lead.emailPlaceholder}
                                className="bg-transparent border-white/30 text-white flex-1"
                                required
                                disabled={leadStatus === "submitting"}
                              />
                              <Button
                                type="submit"
                                disabled={leadStatus === "submitting" || !leadEmail.trim()}
                                className="bg-white text-black hover:bg-white/90 disabled:opacity-50 whitespace-nowrap"
                              >
                                {leadStatus === "submitting" ? s.lead.submitting : s.lead.submit}
                              </Button>
                            </form>
                          )}
                          {leadStatus === "error" && (
                            <p className="text-red-300 text-sm">{s.lead.error}</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <p className="text-white/50 text-xs">{s.results.disclaimer}</p>
                          <button
                            onClick={handleReset}
                            className="text-xs whitespace-nowrap rounded-md border border-white/20 px-3 py-1.5 text-white hover:bg-white/10 transition"
                          >
                            {s.results.newSimulation}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
