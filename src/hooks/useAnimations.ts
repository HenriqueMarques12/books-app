import { useMemo } from "react";
import { Variants } from "framer-motion";

export function useAnimations() {
  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    [],
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 12,
        },
      },
    }),
    [],
  );

  const fadeInVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
    }),
    [],
  );

  const cardVariants: Variants = useMemo(
    () => ({
      hidden: { scale: 0.9, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 20,
        },
      },
      hover: {
        scale: 1.03,
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
      tap: { scale: 0.98 },
    }),
    [],
  );

  const pageTransition: Variants = useMemo(
    () => ({
      initial: { opacity: 0, x: -20 },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
          when: "beforeChildren",
          staggerChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        x: 20,
        transition: { duration: 0.2 },
      },
    }),
    [],
  );

  return {
    containerVariants,
    itemVariants,
    fadeInVariants,
    cardVariants,
    pageTransition,
  };
}
