import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { CicloContext } from "../../page";

export default function Contador(){

    const { cicloAtivo, idCicloAtivo, marcaFimCiclo } = useContext(CicloContext);

    const [quantidadeSegundosPassados, setQuantidadeSegundosPassados] = useState(0)
    
    const totalSegundos = cicloAtivo ? cicloAtivo.minuto * 60 : 0

    useEffect(() => {
        let intervalo: number;

        if (cicloAtivo){
            intervalo = setInterval(() => {
                const diferencaSegundos: number = differenceInSeconds(new Date(), cicloAtivo.dataInicio)

                if(diferencaSegundos >= totalSegundos){

                    marcaFimCiclo()

                    setQuantidadeSegundosPassados(totalSegundos)
                    clearInterval(intervalo)
                } else {
                    setQuantidadeSegundosPassados(diferencaSegundos)
                }
            }, 1000)
        }
        return () => {
            clearInterval(intervalo)
        }
    }, [cicloAtivo, totalSegundos, marcaFimCiclo])

        const segundosAtual = cicloAtivo ?  totalSegundos - quantidadeSegundosPassados : 0
    
        const quantidadeMinutos = Math.floor(segundosAtual / 60)
        const quantidadeSegundos = segundosAtual % 60
    
        const minutosPreenchido = String(quantidadeMinutos).padStart(2, '0')
        const segundosPreenchido = String(quantidadeSegundos).padStart(2, '0')
    
        useEffect(() => {
            if (cicloAtivo){
                document.title = `${minutosPreenchido}:${segundosPreenchido}`
            }
        },[cicloAtivo, minutosPreenchido, segundosPreenchido])

    return(
        <div className="flex items-center gap-4 text-[10rem] leading-32 font-mono">
            <span className="bg-gray-divider px-4 py-8 rounded-lg">{minutosPreenchido[0]}</span>
            <span className="bg-gray-divider px-4 py-8 rounded-lg">{minutosPreenchido[1]}</span>
            <div className="flex justify-center text-green mb-8 pr-3 w-16 overflow-hidden">
                <span>:</span>
            </div>
            <span className="bg-gray-divider px-4 py-8 rounded-lg">{segundosPreenchido[0]}</span>
            <span className="bg-gray-divider px-4 py-8 rounded-lg">{segundosPreenchido[1]}</span>
        </div>
    )
}