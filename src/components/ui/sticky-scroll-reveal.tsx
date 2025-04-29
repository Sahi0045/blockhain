"use client";
import React, { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
    icon?: React.ElementType;
    benefits?: string[];
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["black"];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--orange-500), var(--pink-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--purple-500))",
    "linear-gradient(to bottom right, var(--purple-500), var(--orange-500))",
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[40rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-5"
      ref={ref}
    >
      <div className="div relative flex items-start px-4 lg:w-1/2">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <motion.div
              key={item.title + index}
              className="my-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
                y: activeCard === index ? 0 : 10,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                {item.icon && (
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <item.icon className="w-6 h-6 text-orange-500" />
                  </div>
                )}
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-slate-100"
                >
                  {item.title}
                </motion.h2>
              </div>
              
              <motion.p
                className="text-lg text-slate-300 mb-4"
              >
                {item.description}
              </motion.p>

              {item.benefits && (
                <motion.ul className="space-y-2 mt-4">
                  {item.benefits.map((benefit, idx) => (
                    <li 
                      key={idx}
                      className="flex items-center gap-2 text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      {benefit}
                    </li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      <div className="hidden lg:block sticky top-10 h-[30rem] w-1/2 rounded-2xl overflow-hidden">
        <motion.div
          animate={{
            background: linearGradients[activeCard % linearGradients.length],
          }}
          className={cn(
            "absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br",
            contentClassName
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {content[activeCard].content}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
