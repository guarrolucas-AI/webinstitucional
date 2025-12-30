'use client'

import ColorsBg from "../layout/ColorsBg";
import Footer from "../layout/Footer";
import Hero from "../sections/Hero/Hero";
import ProjectsGrid from "./projects-grid";

export default function ProjectContent() {
  return (
    <>
      <ColorsBg>
        <main className="flex flex-col px-4 space-y-24">
          <Hero section={"projects"} />
          <ProjectsGrid/>
        </main>
        <Footer/>
      </ColorsBg>
    </>
  )
}
