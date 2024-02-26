import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const RevealWithStagger = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={mainControls}
      transition={{ staggerChildren: 0.05, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
};
export default RevealWithStagger;
