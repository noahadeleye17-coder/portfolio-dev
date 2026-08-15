"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";
import { staggerContainer, fadeUp } from "@/lib/motion";

export default function Proof() {
  return (
    <section className="min-h-screen px-6 md:px-16 py-24">
      <ScrollReveal variants={fadeUp}>
        <h2 className="text-3xl md:text-5xl font-semibold mb-12">
          Proof
        </h2>
      </ScrollReveal>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.slug} variants={fadeUp}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
