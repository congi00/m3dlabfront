"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Layers, Calculator } from "lucide-react";

const QuoteCalculator = () => {
  const [files, setFiles] = useState([]);
  const [service, setService] = useState("Stampa 3D");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- GESTIONE DROPZONE IN BASE AL SERVIZIO ---
  const { getRootProps, getInputProps } = useDropzone({
    accept:
      service === "Stampa 3D"
        ? {
            "application/*": [".stl", ".step", ".stp", ".obj", ".3mf"],
          }
        : {
            "application/*": [".step", ".stp"],
          },
    multiple: true,
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  const calculateCost = (files, service, material, quantity) => {
    if (!files.length || !material) return 0;
    const basePrice =
      service === "Stampa 3D" ? 25 : service === "Lavorazioni CNC" ? 40 : 0;
    const materialFactor = 1.2;
    return (basePrice * materialFactor * quantity).toFixed(2);
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleCalculate = async () => {
    const errors = {};
    if (!files.length) errors.file = "Carica almeno un file.";
    if (!material) errors.material = "Seleziona un materiale.";
    if (service === "Stampa 3D" && !color)
      errors.color = "Seleziona un colore.";
    if (!quantity || quantity < 1)
      errors.quantity = "Inserisci una quantità valida.";
    if (!email) errors.email = "Inserisci un indirizzo email.";
    else if (!validateEmail(email))
      errors.email = "L'indirizzo email non è valido.";
    if (!phone) errors.phone = "Inserisci un numero di telefono.";

    setErrorMessages(errors);
    if (Object.keys(errors).length > 0) return;

    const estimatedCost = calculateCost(files, service, material, quantity);
    setQuote(estimatedCost);
    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("service", service);
      formData.append("material", material);
      formData.append("color", color);
      formData.append("quantity", quantity);
      formData.append("quote", estimatedCost);
      formData.append("email", email);
      formData.append("phone", phone);

      const res = await fetch("/api/sendQuote", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Errore invio");
      setSuccess(true);
    } catch (err) {
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // --- MATERIALI E COLORI ---
  const materials3D = {
    FDM: {
      PLA: [
        "Nero",
        "Bianco",
        "Giallo",
        "Rosso",
        "Blu",
        "Marrone",
        "Verde",
        "Grigio",
      ],
      PETG: [
        "Nero",
        "Bianco",
        "Giallo",
        "Rosso",
        "Blu",
        "Marrone",
        "Verde",
        "Grigio",
      ],
      ABS: [
        "Nero",
        "Bianco",
        "Giallo",
        "Rosso",
        "Blu",
        "Marrone",
        "Verde",
        "Grigio",
      ],
      "TPU 90": [],
      "TPU 95": [],
      "TPU 98": [
        "Nero",
        "Bianco",
        "Giallo",
        "Rosso",
        "Blu",
        "Marrone",
        "Verde",
      ],
      "PA 12": ["Nero"],
      "PCP-PBT": ["Traslucido"],
      "PETG-CF": ["Nero"],
      "ABS-CF": ["Nero"],
      "PA-CF": ["Nero"],
    },
    MSLA: {
      "ABS Like": ["Nera", "Bianca", "Traslucida"],
      "Flame Retardant": ["Grigio"],
      "Resin Tough 2000": ["Nera"],
      "Resin Tough 1500": ["Nera"],
      "Elastic 50A": ["Traslucido"],
      "Rigid 4000": ["Bianco"],
      "Rigid 10K": ["Bianco"],
      "High Temp Resin": ["Traslucido"],
    },
  };

  const materialsCNC = {
    ALLUMINIO: ["5083", "6082", "6061"],
    PMMA: [], // Selezionabile
    POLICARBONATO: [], // Selezionabile
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-1 md:px-6 py-12 mt-16 backdrop-blur-xl bg-transparent">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-black text-white p-8 rounded-xl shadow-2xl max-w-md text-center space-y-4 border border-white/20">
            <h2 className="text-2xl font-bold">Errore di Invio</h2>
            <p>
              Si è verificato un problema durante l'invio dei dati. Ti invitiamo
              a contattarci al numero <strong>+39 333 1234567</strong>.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-6 py-2 bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 transition"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}

      <div className="max-w-3xl w-full space-y-8">
        {!success ? (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">Calcola il tuo Preventivo</h1>
              <p className="text-base opacity-80">
                Carica il tuo file e scopri in tempo reale il costo stimato.
              </p>
            </div>

            {/* Upload */}
            <div className="p-6 rounded-2xl shadow-lg bg-white/10 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Upload size={24} />
                <h2 className="text-2xl font-semibold">
                  1. Carica i tuoi file
                </h2>
              </div>
              <div
                {...getRootProps({
                  className:
                    "border-2 border-dashed border-white/30 rounded-xl p-8 text-center cursor-pointer hover:border-white/50",
                })}
              >
                <input {...getInputProps()} />
                {files.length > 0 ? (
                  <ul className="space-y-1">
                    {files.map((f) => (
                      <li key={f.name}>📁 {f.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Trascina qui i tuoi file oppure clicca per selezionarli</p>
                )}
              </div>
              {errorMessages.file && (
                <p className="text-red-400 text-sm mt-2">
                  {errorMessages.file}
                </p>
              )}
            </div>

            {/* Selezioni */}
            <div className="p-6 rounded-2xl shadow-lg bg-white/10 border border-white/20 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <Layers size={24} />
                <h2 className="text-2xl font-semibold">
                  2. Seleziona le opzioni
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Servizio */}
                <div>
                  <label className="font-medium">Servizio</label>
                  <select
                    value={service}
                    onChange={(e) => {
                      setService(e.target.value);
                      setFiles([]); // reset
                      setMaterial("");
                      setColor("");
                    }}
                    className="w-full p-2 rounded-lg bg-white/20 border border-white/30"
                  >
                    <option value="Stampa 3D">Stampa 3D</option>
                    <option value="Lavorazioni CNC">Lavorazione CNC</option>
                  </select>
                </div>

                {/* Materiale */}
                <div>
                  <label className="font-medium">Materiale</label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 border border-white/30"
                  >
                    <option value="">Seleziona Materiale</option>

                    {service === "Stampa 3D"
                      ? Object.entries(materials3D).map(([group, mats]) => (
                          <optgroup key={group} label={`${group}`}>
                            {Object.keys(mats).map((mat) => (
                              <option key={mat} value={mat}>
                                {mat}
                              </option>
                            ))}
                          </optgroup>
                        ))
                      : Object.entries(materialsCNC).map(([group, mats]) => (
                          <optgroup key={group} label={`${group}`}>
                            {mats.length > 0 ? (
                              mats.map((m) => (
                                <option key={m} value={m}>
                                  {m}
                                </option>
                              ))
                            ) : (
                              <option value={group}>{group}</option>
                            )}
                          </optgroup>
                        ))}
                  </select>
                  {errorMessages.material && (
                    <p className="text-red-400 text-sm mt-1">
                      {errorMessages.material}
                    </p>
                  )}
                </div>

                {/* Colore solo per stampa 3D */}
                {service === "Stampa 3D" && (
                  <div>
                    <label className="font-medium">Colore</label>
                    <select
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      disabled={!material} // ✅ Disabilitato finché non si sceglie un materiale
                      className={`w-full p-2 rounded-lg border border-white/30 transition ${
                        !material
                          ? "bg-white/10 text-gray-400 cursor-not-allowed"
                          : "bg-white/20"
                      }`}
                    >
                      <option value="">Seleziona Colore</option>

                      {/* Se esiste un materiale selezionato, mostra i colori corrispondenti */}
                      {(
                        materials3D.FDM[material] ||
                        materials3D.MSLA[material] ||
                        []
                      ).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errorMessages.color && (
                      <p className="text-red-400 text-sm mt-1">
                        {errorMessages.color}
                      </p>
                    )}
                  </div>
                )}

                {/* Quantità */}
                <div>
                  <label className="font-medium">Quantità</label>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/20 border border-white/30 h-[28px]"
                  />
                  {errorMessages.quantity && (
                    <p className="text-red-400 text-sm mt-1">
                      {errorMessages.quantity}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Email + Telefono */}
            <div className="p-6 rounded-2xl shadow-lg bg-white/10 border border-white/20 space-y-3">
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/20 border border-white/30"
              />
              {errorMessages.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errorMessages.email}
                </p>
              )}
            </div>

            <div className="p-6 rounded-2xl shadow-lg bg-white/10 border border-white/20 space-y-3">
              <label className="font-medium">Telefono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/20 border border-white/30"
              />
              {errorMessages.phone && (
                <p className="text-red-400 text-sm mt-1">
                  {errorMessages.phone}
                </p>
              )}
            </div>

            {/* Calcola */}
            <div className="p-6 rounded-2xl shadow-lg bg-white/10 border border-white/20 text-center">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-white/20 border border-white/30 font-semibold hover:bg-white/30 transition disabled:opacity-50"
              >
                {loading ? "Invio in corso..." : "Calcola Preventivo"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20 space-y-4">
            <h2 className="text-3xl font-bold">✅ Preventivo inviato!</h2>
            <p>
              Riceverai un'email all'indirizzo <strong>{email}</strong> con
              tutti i dettagli.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteCalculator;
