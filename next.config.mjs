/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Evita que ESLint bloquee el despliegue en Vercel
      },
};

export default nextConfig;
