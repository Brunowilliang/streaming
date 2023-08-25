'use client'

import { motion, useMotionValue, useAnimation } from "framer-motion";
import React, { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FiX } from "react-icons/fi";

import {
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";

import Movies from "@/components/Movies";
import FabButton from "@/components/FabButton";
import useGroups from "@/hooks/useGroups";
import { useMovies, useSearchMovies } from "@/hooks/useMovies";
import { GroupsResponse } from "@/types/types";


const containerPadding = 20;
export default function Home() {
  const {
    isOpen: isOpenSearch,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure();

  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const width = useMotionValue(0);
  const [activeTab, setActiveTab] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const {
    groups,
    groupsLoading 
  } = useGroups();

  const {
    movies,
    moviesLoading,
    fetchNextPage,
    hasNextPage,
  } = useMovies({
    filter: `group="${activeTab}"`,
  });

  const {
    searchMovies,
  } = useSearchMovies({
    filter: `title~"${search}"`,
  });

  useEffect(() => {
    if (groups && groups.length > 0) {
      setActiveTab(groups[0].id);
  
      refs.current = refs.current.slice(0, groups.length);
  
      const tabRef = refs.current[0];
      if (tabRef) {
        x.set(tabRef.offsetLeft - containerPadding);
        width.set(tabRef.offsetWidth);
      }
    }
  }, [groups]);
  
  const scrollTo = (tab: GroupsResponse) => {
    setActiveTab(tab.id);
    const index = groups?.findIndex((group) => group.id === tab.id);
  
    if (index === undefined || index === -1) {
      console.error(`Tab "${tab.title}" not found in groups`);
      return;
    }
  
    const tabRef = refs.current[index];
  
    tabRef?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  
    if (tabRef) {
      controls.start({
        x: tabRef.offsetLeft - containerPadding,
        width: tabRef.offsetWidth,
        transition: { duration: 0.5 },
      });
    }
  };
  

  return (
    <main
      className={'mx-auto flex flex-col min-h-screen max-w-5xl bg-slate-100'}
    >
      {/* tabs */}
      <div className="fixed left-0 top-0 z-10 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-300 pb-4 pt-7 backdrop-blur-sm">
        <div
          className="relative flex h-10 overflow-x-scroll scrollbar-hide"
          style={{
            paddingLeft: `${containerPadding}px`,
            paddingRight: `${containerPadding}px`,
          }}
        >
          {groups?.map((group, index) => (
            <button
              ref={(ref) => (refs.current[index] = ref)}
              key={index}
              className={`relative z-10 flex items-center justify-center whitespace-nowrap rounded px-4 py-2 transition-all duration-500 text-sm md:text-base
              ${
                activeTab === group.id
                  ? "text-white font-semibold"
                  : "text-black font-medium"
              }`}
              onClick={() => scrollTo(group)}
            >
              {group.title}
            </button>
          ))}
          <motion.div
            className="absolute mt-0 h-10 rounded bg-blue-500"
            style={{ x, width }}
            animate={controls}
          />
        </div>
      </div>


      {moviesLoading || groupsLoading && (
        <div className="z-10 flex flex-col pt-7 gap-3 w-full items-center justify-start">
          <Spinner size="xl" className="text-black" />
          <p className="text-black">Loading...</p>
        </div>
      )}

      {/* Movies */}
      <InfiniteScroll
        dataLength={movies?.pages.flatMap((group) => group).length || 0} // This is important, as it is what the scroll component uses to detect the end of the list
        className="pt-28 px-4 pb-4"
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        hasChildren
        loader={<h4>Loading...</h4>}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          key={activeTab}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
          }}
          className="grid w-full gap-x-4 gap-y-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5"
        >
          {movies?.pages.flatMap((page, i) =>
            page?.items?.map((movie, index) => (
              <Movies
                key={movie.id}
                movie={movie}
                onClick={() => {
                  window.open(movie.url, "_blank");
                }}
              />
            ))
          )}
        </motion.div>
      </InfiniteScroll>

      <FabButton onclick={onOpenSearch} />

      <Modal
        isOpen={isOpenSearch}
        size={"5xl"}
        onClose={() => {
          onCloseSearch();
          setSearch("");
        }}
      >
        <ModalOverlay className="backdrop-blur-md" />
        <ModalContent
          bg={"transparent"}
          shadow={"none"}
          alignItems={"center"}
          w={"full"}
          className="relative w-full px-4 py-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="fixed left-0 top-0 z-10 flex w-full justify-center border-gray-300 bg-gradient-to-b from-slate-700 px-4 pt-7 pb-3 backdrop-blur-sm"
          >
            <div className="w-full max-w-[995px] flex">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="relative flex h-14 w-full rounded-md text-slate-800 bg-slate-200 px-4 py-2 text-lg font-semibold placeholder:text-slate-500 focus:outline-none"
                placeholder="Search"
              />
              <button
                onClick={() => {
                  onCloseSearch();
                  setSearch("");
                }}
                className="flex h-14 w-14 items-center justify-end bg-transparent"
              >
                <FiX size={32} className="h-8 w-8 text-slate-200" />
              </button>
            </div>
          </motion.div>

          {searchMovies?.length === 0 && (
            <p className="font-medium text-center text-lg text-slate-200">
              No results found
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            key={search}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="mt-0 w-full grid gap-x-4 gap-y-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5"
          >
            {searchMovies?.map((movie, index) => (
              <Movies
                key={index}
                movie={movie}
                onClick={() => {
                  window.open(movie.url, "_blank");
                }}
              />
            ))}
          </motion.div>
        </ModalContent>
      </Modal>

      {/* <Modal isOpen={isOpen} size={"4xl"} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"transparent"}
          px={"4"}
          shadow={"none"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {isLoading ? (
            <Spinner size="xl" className="text-white" />
          ) : (
            movieUrl && (
              <MediaPlayer
                aspectRatio={16 / 10}
                className="rounded-md"
                keyTarget="player"
                src={movieUrl}
                autoplay
                controls
                onError={(error) => {
                  playError(error);
                }}
                onHlsError={(error) => {
                  playError(error);
                }}
              >
                <MediaOutlet />
              </MediaPlayer>
            )
          )}
        </ModalContent>
      </Modal> */}
    </main>
  );
}
