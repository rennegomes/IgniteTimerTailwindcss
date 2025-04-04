'use client'
import { Play, HandPalm } from "@phosphor-icons/react/dist/ssr";
import { createContext, useState } from "react";
import NovoCicloForm from "./components/novoCicloForm/novoCicloForm";
import Contador from "./components/contador/contador";
import { FormProvider, useForm } from "react-hook-form";

interface Ciclo {
    id: string;
    tarefa: string;
    minuto: number;
    dataInicio: Date;
    dataInterrompida?: Date
    dataFinalizada?: Date
}

interface CicloContextProps {
    cicloAtivo: Ciclo | undefined;
    idCicloAtivo: string | null;
    quantidadeSegundosPassados: number;
    marcaFimCiclo: () => void;
    setSegundosPassados: (segundos: number) => void;
}

interface FormaDadoNovoCiclo {
    nomeProjetoForm: string;
    minutosForm: number
}

export const CicloContext = createContext({} as CicloContextProps)

export default function Home() {
    const novoCicloForm = useForm<FormaDadoNovoCiclo>()
    const { handleSubmit, watch, reset } = novoCicloForm
 
    const [quantidadeSegundosPassados, setQuantidadeSegundosPassados] = useState(0)

    const [ciclos, setCiclos] = useState<Ciclo[]>([]);
    const [idCicloAtivo, setIdCicloAtivo] = useState<string | null>(null);

    const cicloAtivo = ciclos.find((ciclos) => ciclos.id === idCicloAtivo)
    
    function setSegundosPassados(segundos: number){
        setQuantidadeSegundosPassados(segundos)
    }

    function marcaFimCiclo(){
        setCiclos((state) =>
            state.map((ciclo) => {
                if(ciclo.id === idCicloAtivo){
                    return { ...ciclo, dataFinalizada: new Date() }
                } else {
                    return ciclo
                }
            }),
        )
    } 

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

    function paraContador(){

        marcaFimCiclo()

        document.title = 'Timer'

        setIdCicloAtivo(null)
    }

    const nomeProjetoForm = watch('nomeProjetoForm');
    const minutosForm = watch('minutosForm');
    const botaoDesabilitado = !nomeProjetoForm || !minutosForm;

    return (
     <div className="flex-1 flex justify-center items-center">
         <form onSubmit={handleSubmit(criaNovoCiclo)} className="flex flex-col gap-14 items-center text-gray-title">
            <CicloContext.Provider 
                value={{ 
                    cicloAtivo, 
                    idCicloAtivo, 
                    marcaFimCiclo, 
                    quantidadeSegundosPassados,
                    setSegundosPassados,
                }}
            >
                <FormProvider {...novoCicloForm}>
                    <NovoCicloForm />
                </FormProvider>
                <Contador />
            </CicloContext.Provider>
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
  