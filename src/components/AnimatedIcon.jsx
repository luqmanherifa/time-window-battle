import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BoltIcon, BullseyeIcon, DizzyIcon } from "./icons";

const ICONS = [BoltIcon, BullseyeIcon, DizzyIcon];

export default function AnimatedIcon({
  className = "w-11 h-11 text-white",
  interval = 1600,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ICONS.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const Icon = ICONS[index];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.7, opacity: 0, rotate: 10 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <Icon className={className} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
