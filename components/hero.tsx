import React, { useState } from "react";
function Hero() {
    const [show, setShow] = useState(false);
    return (
        <div className=" px-6 py-16 text-center">
            <div className="max-w-xl mx-auto">
                <h1 className="text-4xl lg:text-7xl text-center font-bold text-gray-800 leading-normal">La libertad de crear el sitio web e-commerce que desea</h1>
                <p className="mt-6 text-gray-500 dark:text-gray-300">Crea un negocio, tanto si tienes una idea original como si estás buscando una nueva forma de ganar dinero.</p>
                <button className="px-6 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-orange-500 rounded-lg hover:bg-orange-600 md:mx-0 md:w-auto focus:outline-none">
                    Comience la Prueba Gratuita de 7 Días
                </button>

                <p className="mt-3 text-sm text-gray-400 ">No se requiere tarjeta de crédito</p>
            </div>

        </div>

    );
}

export default Hero;
