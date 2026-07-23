export type Industry = "retail" | "tecnologia" | "servicios" | "alimentos" | "salud" | "otro";
export type CompanySize = "small" | "medium" | "large";

// Estimated monthly growth rate by industry (based on typical SME benchmarks).
const MONTHLY_GROWTH_RATE: Record<Industry, number> = {
  retail: 0.02,
  tecnologia: 0.045,
  servicios: 0.03,
  alimentos: 0.018,
  salud: 0.025,
  otro: 0.02,
};

// Smaller companies tend to post higher relative growth; larger ones grow slower but steadier.
const SIZE_FACTOR: Record<CompanySize, number> = {
  small: 1.3,
  medium: 1,
  large: 0.7,
};

export interface SimulationInput {
  companyName: string;
  industry: Industry;
  monthlyRevenue: number;
  size: CompanySize;
}

export interface SimulationResult {
  companyName: string;
  industry: Industry;
  monthlyRevenue: number;
  monthlyGrowthRate: number;
  projection3: number;
  projection6: number;
  projection12: number;
}

export function runSimulation(input: SimulationInput): SimulationResult {
  const monthlyGrowthRate = MONTHLY_GROWTH_RATE[input.industry] * SIZE_FACTOR[input.size];

  const project = (months: number) =>
    input.monthlyRevenue * Math.pow(1 + monthlyGrowthRate, months);

  return {
    companyName: input.companyName,
    industry: input.industry,
    monthlyRevenue: input.monthlyRevenue,
    monthlyGrowthRate,
    projection3: project(3),
    projection6: project(6),
    projection12: project(12),
  };
}
