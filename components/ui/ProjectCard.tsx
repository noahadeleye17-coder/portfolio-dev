"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40"
    >
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-sm text-neutral-400 mb-1">
        <span className="font-medium text-neutral-300">Problem: </span>
        {project.problem}
      </p>
      <p className="text-sm text-neutral-400 mb-1">
        <span className="font-medium text-neutral-300">Craft: </span>
        {project.craft}
      </p>
      {project.outcome && (
        <p className="text-sm text-neutral-400 mb-3">
          <span className="font-medium text-neutral-300">Outcome: </span>
          {project.outcome}
        </p>
      )}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline underline-offset-4"
        >
          View project →
        </a>
      )}
    </motion.article>
  );
}
