import { Play } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
    return (
     <div className="flex-1 flex justify-center items-center">
        <form action="" className="flex flex-col gap-14 items-center text-gray-text">

            <div className="flex flex-wrap items-center justify-center gap-2 font-bold">
                <label htmlFor="" id="nomeProjetoForm">Vou trabalhar em</label>
                <input type="text" id="nomeProjetoForm" placeholder="Dê um nome para o seu projeto" />

                <label htmlFor="" id="minutosForm">durante</label>
                <input type="number" name="" id="minutosForm" placeholder="00" />

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

            <div className="flex items-center justify-center gap-3">
                <Play />
                <button type="submit">Começar</button>
            </div>
        </form>
     </div>
    );
  }
  