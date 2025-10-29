"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LAYOUTS = ["large-left", "large-right", "top-large", "grid"];

const ChevronLeftSVG = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightSVG = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseXSVG = ({ className = "" }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ServicePage({ titles = [], texts = [], images = [] }) {
  const [indices, setIndices] = useState(titles.map(() => 0));
  const [layouts, setLayouts] = useState(titles.map(() => LAYOUTS[0]));
  const [modal, setModal] = useState({ open: false, section: null, index: 0 });
  const [direction, setDirection] = useState(1); // 1 = avanti, -1 = indietro
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

  // Random layout solo al primo render client
  useEffect(() => {
    setLayouts(titles.map(() => LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)]));
  }, [titles]);

  const groupSectionImages = (sectionImgs = []) => {
    const groups = [];
    for (let i = 0; i < sectionImgs.length; i += 3) {
      groups.push(sectionImgs.slice(i, i + 3));
    }
    return groups;
  };

  const nextSlide = (secIdx) => {
    const groups = groupSectionImages(images[secIdx] || []);
    if (groups.length <= 1) return;
    setDirection(1);
    setIndices(prev => prev.map((v, i) => i === secIdx ? (v + 1) % groups.length : v));
  };

  const prevSlide = (secIdx) => {
    const groups = groupSectionImages(images[secIdx] || []);
    if (groups.length <= 1) return;
    setDirection(-1);
    setIndices(prev => prev.map((v, i) => i === secIdx ? (v === 0 ? groups.length - 1 : v - 1) : v));
  };

  const openModalAt = (secIdx, groupIdx, imgIdx) => {
    const absIndex = groupIdx * 3 + imgIdx;
    setModal({ open: true, section: secIdx, index: absIndex });
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModal({ open: false, section: null, index: 0 });
    document.body.style.overflow = "";
  };

  const modalPrev = () => {
    if (modal.section === null) return;
    const total = (images[modal.section] || []).length;
    setModal(m => ({ ...m, index: (m.index - 1 + total) % total }));
  };

  const modalNext = () => {
    if (modal.section === null) return;
    const total = (images[modal.section] || []).length;
    setModal(m => ({ ...m, index: (m.index + 1) % total }));
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (!modal.open) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") modalPrev();
      if (e.key === "ArrowRight") modalNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal.open, modal.section, modal.index]);

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="relative px-2 md:px-16 pt-40" ref={ref}>
      <div className="container mx-auto flex flex-col gap-20">
        {titles.map((title, secIdx) => {
          const sectionImgs = images[secIdx] || [];
          const groups = groupSectionImages(sectionImgs);
          const groupIndex = indices[secIdx] || 0;
          const currentGroup = groups[groupIndex] || [];
          const layout = layouts[secIdx] || "grid";

          return (
            <motion.div
              key={secIdx}
              className="flex flex-col gap-6"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
                <div className="md:flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-left">{title.toUpperCase()}</h2>
                  {texts[secIdx] && <p style={{color: "#fff", whiteSpace: "pre-line"}} className="mt-3 max-w-3xl">{texts[secIdx]}</p>}
                </div>

                <div className="flex items-center gap-3">
                  {groups.length > 1 && (
                    <>
                      <button
                        aria-label="Previous"
                        onClick={() => prevSlide(secIdx)}
                        className="border border-gray-400 text-gray-700 bg-white/60 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
                      >
                        <ChevronLeftSVG />
                      </button>
                      <button
                        aria-label="Next"
                        onClick={() => nextSlide(secIdx)}
                        className="border border-gray-400 text-gray-700 bg-white/60 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
                      >
                        <ChevronRightSVG />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Images */}
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${secIdx}-${groupIndex}-${layout}`}
                    initial={{ opacity: 0, x: 100 * direction }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 * direction }}
                    transition={{ duration: 0.45 }}
                    className="w-full"
                  >
                    {/* Render layout */}
                    {layout === "large-left" && (
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-[1.6fr_1fr]">
                        <div
                          className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-video"
                          onClick={() => openModalAt(secIdx, groupIndex, 0)}
                        >
                          {currentGroup[0] && <img src={`http://localhost:1337${currentGroup[0].url}`} alt={currentGroup[0].alternativeText || ""} className="object-cover w-full h-full"/>}
                        </div>
                        <div className="grid gap-4">
                          {currentGroup.slice(1, 3).map((img, idx) => (
                            <div key={idx} className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-[3/2]" onClick={() => openModalAt(secIdx, groupIndex, idx+1)}>
                              <img src={`http://localhost:1337${img.url}`} alt={img.alternativeText || ""} className="object-cover w-full h-full"/>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {layout === "large-right" && (
                      <div className="grid gap-4 grid-cols-1 md:grid-cols-[1fr_1.6fr]">
                        <div className="grid gap-4">
                          {currentGroup.slice(0,2).map((img, idx) => (
                            <div key={idx} className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-[3/2]" onClick={() => openModalAt(secIdx, groupIndex, idx)}>
                              <img src={`http://localhost:1337${img.url}`} alt={img.alternativeText || ""} className="object-cover w-full h-full"/>
                            </div>
                          ))}
                        </div>
                        <div className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-video" onClick={() => openModalAt(secIdx, groupIndex, 2)}>
                          {currentGroup[2] && <img src={`http://localhost:1337${currentGroup[2].url}`} alt={currentGroup[2].alternativeText || ""} className="object-cover w-full h-full"/>}
                        </div>
                      </div>
                    )}

                    {layout === "top-large" && (
                      <div className="grid gap-4">
                        <div className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-[16/9]" onClick={() => openModalAt(secIdx, groupIndex, 0)}>
                          {currentGroup[0] && <img src={`http://localhost:1337${currentGroup[0].url}`} alt={currentGroup[0].alternativeText || ""} className="object-cover w-full h-full"/>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentGroup.slice(1,3).map((img, idx) => (
                            <div key={idx} className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-[4/3]" onClick={() => openModalAt(secIdx, groupIndex, idx+1)}>
                              <img src={`http://localhost:1337${img.url}`} alt={img.alternativeText || ""} className="object-cover w-full h-full"/>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {layout === "grid" && (
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {currentGroup.map((img, idx) => (
                          <div key={idx} className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-[4/3]" onClick={() => openModalAt(secIdx, groupIndex, idx)}>
                            <img src={`http://localhost:1337${img.url}`} alt={img.alternativeText || ""} className="object-cover w-full h-full"/>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && modal.section !== null && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85"
            onClick={closeModal}
          >
            <div className="relative max-w-[1200px] w-full max-h-[90vh] mx-4 md:mx-8" onClick={e => e.stopPropagation()}>
              <button onClick={closeModal} className="fixed right-2 top-2 md:right-4 md:top-4 z-30 p-2 rounded-full border border-white/60 text-white bg-black/30 hover:bg-black/50">
                <CloseXSVG className="w-5 h-5"/>
              </button>
              <div className="flex items-center justify-center relative">
                <button onClick={modalPrev} className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronLeftSVG/>
                </button>
                <img src={`http://localhost:1337${(images[modal.section] || [])[modal.index]?.url}`} alt={(images[modal.section] || [])[modal.index]?.alternativeText || ""} className="max-h-[80vh] object-contain mx-auto"/>
                <button onClick={modalNext} className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronRightSVG/>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
