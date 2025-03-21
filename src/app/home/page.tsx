'use client'

import { Play } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormaDadoNovoCiclo {
    nomeProjetoForm: string;
    minutosForm: number
}

interface Ciclo {
    id: string;
    tarefa: string;
    minuto: number
}
export default function Home() {

    const [ciclos, setCiclos] = useState<Ciclo[]>([]);
    const [idCicloAtivo, setIdCicloAtivo] = useState<string | null>(null);

    const { register, handleSubmit, watch, reset } = useForm<FormaDadoNovoCiclo>()
    function criaNovoCiclo(data: FormaDadoNovoCiclo){

        const id = String(new Date().getTime())

        const novoCiclo: Ciclo ={
            id,
            tarefa: data.nomeProjetoForm,
            minuto: data.minutosForm
        }

        setCiclos((state) => [...state, novoCiclo])
        setIdCicloAtivo(id)

        reset();
    }

    const cicloAtivo = ciclos.find((ciclos) => ciclos.id === idCicloAtivo)
    console.log(cicloAtivo)

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
                    required
                    {...register('minutosForm', { valueAsNumber: true })}
                    className="text-center h-10 border-b-2 border-gray-placeholder px-2 w-16 transition-colors duration-200
                    focus:border-green focus:outline-none"
                    />

                <span>minutos.</span>
            </div>

            <div className="flex items-center gap-4 text-[10rem] leading-32 font-mono">
                <span className="bg-gray-divider px-4 py-8 rounded-lg">0</span>
                <span className="bg-gray-divider px-4 py-8 rounded-lg">0</span>
                <div className="flex justify-center text-green mb-8 pr-3 w-16 overflow-hidden">
                    <span>:</span>
                </div>
                <span className="bg-gray-divider px-4 py-8 rounded-lg">0</span>
                <span className="bg-gray-divider px-4 py-8 rounded-lg">0</span>
            </div>

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
        </form>
     </div>
    );
  }
  