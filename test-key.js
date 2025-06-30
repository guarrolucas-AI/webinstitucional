import dotenv from "dotenv";
dotenv.config();

const rawKey = process.env.GOOGLE_PRIVATE_KEY;
if (!rawKey) {
  console.error("No se encontró GOOGLE_PRIVATE_KEY en las variables de entorno");
  process.exit(1);
}

// Mostrar rawKey con \n literales (para ver cómo viene)
console.log("Raw key con \\n literales:");
console.log(rawKey);

// Reemplazar \n literales por saltos reales
const fixedKey = rawKey.replace(/\\n/g, "\n");

console.log("\nClave con saltos de línea reales:");
console.log(fixedKey);

// Verificar que comienza y termina correctamente
if (fixedKey.startsWith("-----BEGIN PRIVATE KEY-----") && fixedKey.trim().endsWith("-----END PRIVATE KEY-----")) {
  console.log("\nLa clave parece tener el formato correcto.");
} else {
  console.warn("\nLa clave NO tiene el formato correcto.");
}
