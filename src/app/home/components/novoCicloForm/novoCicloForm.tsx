import { useContext } from "react";
import { CicloContext } from "../../page";
import { useFormContext } from "react-hook-form";

export default function NovoCicloForm (){

    const { cicloAtivo, idCicloAtivo, marcaFimCiclo } = useContext(CicloContext);
    const { register } = useFormContext();

    return(
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
    )
}