import React, { useState, useCallback } from "react";
import { toPng } from "html-to-image";

function CarDetailsComponent() {
  const [brand, setBrand] = useState("");
  const [brandEnabled, setBrandEnabled] = useState(false);
  const [plate, setPlate] = useState("");
  const [plateEnabled, setPlateEnabled] = useState(false);
  const [chassis, setChassis] = useState("");
  const [chassisEnabled, setChassisEnabled] = useState(false);

  const carBrands = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"];

  let resultRef = React.useRef(null);
  let innerContentRef = React.useRef(null);

  const setResultRef = useCallback((node) => {
    if (node !== null) {
      resultRef.current = node;
    }
  }, []);

  const downloadImage = async () => {
    try {
      const dataUrl = await toPng(innerContentRef.current);
      const link = document.createElement("a");
      link.download = "car-details.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error al crear la imagen", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
      <div
        className="leading-none p-8 bg-white shadow-lg rounded-xl space-y-6 w-full"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={brandEnabled}
            onChange={() => setBrandEnabled(!brandEnabled)}
            className="form-checkbox h-5 w-5"
          />
          <span>Marca:</span>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            disabled={!brandEnabled}
            className="form-select p-2 rounded-md w-full"
          >
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <input
            type="checkbox"
            checked={plateEnabled}
            onChange={() => setPlateEnabled(!plateEnabled)}
            className="form-checkbox h-5 w-5"
          />
          <span>Patente:</span>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            disabled={!plateEnabled}
            placeholder="Ingrese patente"
            className="form-input p-2 rounded-md w-full"
            maxLength={6}
          />
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <input
            type="checkbox"
            checked={chassisEnabled}
            onChange={() => setChassisEnabled(!chassisEnabled)}
            className="form-checkbox h-5 w-5"
          />
          <span>Chasis:</span>
          <input
            type="text"
            value={chassis}
            onChange={(e) => setChassis(e.target.value)}
            disabled={!chassisEnabled}
            placeholder="Ingrese chasis"
            className="form-input p-2 rounded-md w-full"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">Resultado:</h3>
        <div
          ref={setResultRef}
          className="p-4 border-2 border-dashed border-gray-400 rounded-md mt-4 text-center"
        >
          <div
            ref={innerContentRef}
            className="inline-block bg-white text-black"
          >
            {brandEnabled && <p className="">{brand}</p>}
            {plateEnabled && <p className="text-9xl">{plate}</p>}
            {chassisEnabled && <p className="text-7xl ">{chassis}</p>}
          </div>
        </div>

        <button
          onClick={downloadImage}
          className="py-2 px-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
        >
          Descargar Imagen
        </button>
      </div>
    </div>
  );
}

export default CarDetailsComponent;
