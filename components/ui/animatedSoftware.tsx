import React, { useState, useEffect } from "react";

const techOrder: Array<"Nodejs" | "React" | "NextJS"> = ["Nodejs", "React", "NextJS"];

const codeSnippets: Record<"Nodejs" | "React" | "NextJS", string> = {
  Nodejs: `coonst express = require('express');
const app = express();
app.listen(3000);`,
  React: `coonst App = () => <Component optimized />;`,
  NextJS: `exxport async function getServerSideProps() {
  return { props: { fast: true } };
}`,
};

const defaultDescriptions: Record<"Nodejs" | "React" | "NextJS", string> = {
  Nodejs: "Node.js permite crear servidores y APIs eficientes usando JavaScript en el backend.",
  React: "React es una biblioteca para construir interfaces de usuario reutilizables mediante componentes.",
  NextJS: "Next.js extiende React con renderizado del lado del servidor, rutas automáticas y más rendimiento.",
};

interface AnimatedSoftwareProps {
  descriptions?: Record<"Nodejs" | "React" | "NextJS", string>
}

const AnimatedSoftware = ({ descriptions = defaultDescriptions }: AnimatedSoftwareProps) => {
  const [tech, setTech] = useState<"Nodejs" | "React" | "NextJS">("Nodejs");
  const [codeText, setCodeText] = useState("");

  const code: Record<"Nodejs" | "React" | "NextJS", { description: string; code: string }> = {
    Nodejs: { description: descriptions.Nodejs, code: codeSnippets.Nodejs },
    React: { description: descriptions.React, code: codeSnippets.React },
    NextJS: { description: descriptions.NextJS, code: codeSnippets.NextJS },
  };

  const handleChangeTech = (newTech: "Nodejs" | "React" | "NextJS") => {
    setTech(newTech);
  };

  useEffect(() => {
    setCodeText(""); // Reinicia el texto antes de comenzar

    let index = 0;
    const codeToType = codeSnippets[tech];

    const intervalId = setInterval(() => {
      const nextChar = codeToType[index];
      if (nextChar !== undefined) {
        setCodeText((prev) => prev + nextChar);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [tech]);

  useEffect(() => {
    const autoChange = setInterval(() => {
      setTech((prevTech) => {
        const currentIndex = techOrder.indexOf(prevTech);
        const nextIndex = (currentIndex + 1) % techOrder.length;
        return techOrder[nextIndex];
      });
    }, 7000);

    return () => clearInterval(autoChange);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full relative p-6 gap-6">
      {/* Descripción */}
      <div className="md:w-1/2 flex flex-col items-start">
        <p className="text-gray-300 text-[12px] mt-5">{code[tech]?.description}</p>
      </div>

      {/* Código animado */}
      <div className="md:w-1/2 flex flex-col ml-2">
        <pre className="text-gray-300 text-[10px] whitespace-pre-wrap">{codeText}</pre>
      </div>

      {/* Botones */}
      <div className="absolute top-1 left-1 flex gap-2">
        {techOrder.map((t) => (
          <button
            key={t}
            onClick={() => handleChangeTech(t)}
            className={`${
              t === tech ? "bg-orange-800" : "bg-neutral-900"
            } text-white text-[12px] px-2 py-1 rounded hover:brightness-110 transition-colors`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedSoftware;
