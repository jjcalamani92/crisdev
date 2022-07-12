import Image from "next/image";
import React, { useState } from "react";
import { Main } from "./component";


export const FAQComponent = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  return (
    <Main>
      <div className="grid grid-cols-1 gap-6 ">
        <div className="py-6">
          <div className=" flex justify-between items-center cursor-pointer">
            <h3 className=" font-semibold text-xl leading-5 text-gray-800">¿Puedo utilizar un dominio que ya tenga??</h3>
            <button aria-label="too" className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow(!show)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={show ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.16602 10H15.8327" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show ? "block" : "hidden")}>Los dominios registrados en otras partes se pueden utilizar en crisDev con la ayuda del soporte tecnico.</p>
        </div>
        <div className="py-6">
          <div className=" flex justify-between items-center cursor-pointer">
            <h3 className=" font-semibold text-xl leading-5 text-gray-800">¿El alojamiento está incluido?</h3>
            <button aria-label="too" className=" cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" onClick={() => setShow2(!show2)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className={show2 ? "hidden" : "block"} d="M10 4.1665V15.8332" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.16602 10H15.8327" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <p className={"font-normal text-base leading-6 text-gray-600 mt-4 w-11/12 " + (show2 ? "block" : "hidden")}>Todos los planes de crisDev, incluyen un alojamiento rápido, seguro y fiable.</p>
        </div>
      </div>
      
    </Main>
  )
}