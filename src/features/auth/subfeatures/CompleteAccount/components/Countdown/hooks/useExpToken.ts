import { useEffect, useState } from "react";

interface UseExpToken {
    exp: number;
}

export const useExpToken = ({ exp }: UseExpToken) => {
    const [tiempoRestante, setTiempoRestante] = useState("");

    useEffect(() => {
        const intervalo = setInterval(() => {
            const ahora = Math.floor(Date.now() / 1000);
            let restantes = exp - ahora;

            if (restantes <= 0) {
                setTiempoRestante("00:00");
                clearInterval(intervalo);
                return;
            }

            const minutos = Math.floor(restantes / 60);
            const segundos = restantes % 60;
            setTiempoRestante(
                `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
            );
        }, 1000);

        return () => clearInterval(intervalo);
    }, [exp]);

    return tiempoRestante;
};
