import { MoviesRecord } from "@/types/types";
import { Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface Props {
  onClick: () => void;
  movie: MoviesRecord;
}

export default function Movies({ movie, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="relative cursor-pointer overflow-hidden rounded-md"
      onClick={onClick}
    >
      <Image
        src={movie.logo}
        alt={movie.title}
        className="w-full object-cover"
        fallbackSrc="https://via.placeholder.com/150x230"
      />
      <motion.div
        className="absolute bottom-0 left-0 flex h-full w-full items-end justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0 }}
      >
        <div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-black to-transparent" />
        <h2 className="z-10 p-2 pb-2 text-center text-sm font-semibold text-white">
          {movie.title}
        </h2>
      </motion.div>
    </motion.div>
  );
}
