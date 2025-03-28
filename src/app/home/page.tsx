'use client'

import { HandPalm } from "@phosphor-icons/react";
import { Play } from "@phosphor-icons/react/dist/ssr";
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface FormaDadoNovoCiclo {
    nomeProjetoForm: string;
    minutosForm: number
}

interface Ciclo {
    id: string;
    tarefa: string;
    minuto: number;
    dataInicio: Date;
    dataInterrompida?: Date
    dataFinalizada?: Date
}
export default function Home() {

    const [ciclos, setCiclos] = useState<Ciclo[]>([]);
    const [idCicloAtivo, setIdCicloAtivo] = useState<string | null>(null);
    const [quantidadeSegundosPassados, setQuantidadeSegundosPassados] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<FormaDadoNovoCiclo>()
    function criaNovoCiclo(data: FormaDadoNovoCiclo){

        const id = String(new Date().getTime())

        const novoCiclo: Ciclo ={
            id,
            tarefa: data.nomeProjetoForm,
            minuto: data.minutosForm,
            dataInicio: new Date()
        }

        setCiclos((state) => [...state, novoCiclo])
        setIdCicloAtivo(id)
        setQuantidadeSegundosPassados(0)

        reset();
    }

    const cicloAtivo = ciclos.find((ciclos) => ciclos.id === idCicloAtivo)

    useEffect(() => {
        let intervalo: number;

        if (cicloAtivo){
            intervalo = setInterval(() => {
                const diferencaSegundos: number = differenceInSeconds(new Date(), cicloAtivo.dataInicio)

                if(diferencaSegundos >= totalSegundos){
                    setCiclos((state) =>
                        state.map((ciclo) => {
                        if(ciclo.id === idCicloAtivo){
                            return { ...ciclo, dataFinalizada: new Date() }
                        } else {
                            return ciclo
                        }
                    }),
                )
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
    }, [cicloAtivo])

    function paraContador(){
        setCiclos((state) =>
            state.map((ciclo) => {
                if (ciclo.id === idCicloAtivo){
                    return { ...ciclo, dataInterrompida: new Date() }
                } else {
                    return ciclo
                }
            }),
        )
        document.title = 'Timer'

        setIdCicloAtivo(null)
    }

    const totalSegundos = cicloAtivo ? cicloAtivo.minuto * 60 : 0
    const segundosAtual = cicloAtivo?  totalSegundos - quantidadeSegundosPassados : 0

    const quantidadeMinutos = Math.floor(segundosAtual / 60)
    const quantidadeSegundos = segundosAtual % 60

    const minutosPreenchido = String(quantidadeMinutos).padStart(2, '0')
    const segundosPreenchido = String(quantidadeSegundos).padStart(2, '0')

    useEffect(() => {
        if (cicloAtivo){
            document.title = `${minutosPreenchido}:${segundosPreenchido}`
        }
    },[cicloAtivo, minutosPreenchido, segundosPreenchido])

    const nomeProjetoForm = watch('nomeProjetoForm');
    const minutosForm = watch('minutosForm');
    const botaoDesabilitado = !nomeProjetoForm || !minutosForm;

    return (
     <div className="flex-1 flex justify-center items-center">
        <form onSubmit={handleSubmit(criaNovoCiclo)} className="flex flex-col gap-14 items-center text-gray-title">

            <div className="flex flex-wrap w-full items-center justify-center gap-2 font-bold">
                <label htmlFor="" id="nomeProjetoForm">Vou trabalhar em</label>
                <input 
                    type="text" 
                    id="nomeProjetoForm"
                    list="sujestaoNomeProjetoForm" 
                    placeholder="Dê um nome para o seu projeto"
                    disabled={!!cicloAtivo}
                    required
                    {...register('nomeProjetoForm')}
                    className="flex-1 h-10 border-b-2 border-gray-placeholder px-2 transition-colors duration-200
                    focus:border-green focus:outline-none"
                    />
                
                <datalist 
                    id="sujestaoNomeProjetoForm"
                    >
                    <option value="Oi" />
                    <option value="Tudo" />
                    <option value="Bem" />
                    <option value="?" />
                </datalist>

                <label htmlFor="" id="minutosForm">durante</label>
                <input 
                    type="number"  
                    id="minutosForm" 
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                    disabled={!!cicloAtivo}
                    required
                    {...register('minutosForm', { valueAsNumber: true })}
                    className="text-center h-10 border-b-2 border-gray-placeholder px-2 w-16 transition-colors duration-200
                    focus:border-green focus:outline-none"
                    />

                <span>minutos.</span>
            </div>

            <div className="flex items-center gap-4 text-[10rem] leading-32 font-mono">
                <span className="bg-gray-divider px-4 py-8 rounded-lg">{minutosPreenchido[0]}</span>
                <span className="bg-gray-divider px-4 py-8 rounded-lg">{minutosPreenchido[1]}</span>
                <div className="flex justify-center text-green mb-8 pr-3 w-16 overflow-hidden">
                    <span>:</span>
                </div>
                <span className="bg-gray-divider px-4 py-8 rounded-lg">{segundosPreenchido[0]}</span>
                <span className="bg-gray-divider px-4 py-8 rounded-lg">{segundosPreenchido[1]}</span>
            </div>

            {cicloAtivo? 
                <button 
                    type="button"
                    onClick={paraContador}
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-lg font-bold cursor-pointer 
                        bg-red transition-colors duration-200 hover:bg-red-dark"
                    >
                    <HandPalm size={20}/>
                    Interromper
                </button>
            :
                <button 
                    type="submit" 
                    disabled={botaoDesabilitado}
                    className="flex items-center justify-center gap-2 w-full p-4 rounded-lg font-bold cursor-pointer 
                        bg-green transition-colors duration-200 hover:bg-green-dark disabled:opacity-70 
                        disabled:cursor-not-allowed disabled:hover:bg-green"
                    >
                    <Play />
                    Começar
                </button>
            }
        </form>
     </div>
    );
  }
  