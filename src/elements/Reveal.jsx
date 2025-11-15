// /src/elements/Reveal.jsx

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Reveal = ({
  children,
  width = "100%",
  duration = 0.8,
  delay = 0,
  y = 40,
}) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px",
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
