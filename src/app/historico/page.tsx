import Status from "@/components/Status";

export default function historico() {
    return (
     <div className="flex-1 flex flex-col p-14">
        <h1 className="text-[1.5rem] text-gray-title">Meu histórico</h1>

        <div className="flex-1 overflow-auto mt-8">
         <table className="w-full border-separate border-spacing-y-1 min-w-[600px]">
            <thead>
               <tr className="bg-zinc-700 text-gray-title">
                  <th className="p-4 text-left  leading-6 text-sm first:rounded-tl-lg last:rounded-tr-lg first:pl-6 
                  first:w-1/2 last:pr-6 "
                  >Tarefa</th>
                  <th className="p-4 text-left  leading-6 text-sm first:rounded-tl-lg last:rounded-tr-lg first:pl-6 
                  first:w-1/2 last:pr-6 "
                  >Duração</th>
                  <th className="p-4 text-left  leading-6 text-sm first:rounded-tl-lg last:rounded-tr-lg first:pl-6 
                  first:w-1/2 last:pr-6 "
                  >Início</th>
                  <th className="p-4 text-left  leading-6 text-sm first:rounded-tl-lg last:rounded-tr-lg first:pl-6 
                  first:w-1/2 last:pr-6 "
                  >Status</th>
               </tr>
            </thead>
            <tbody>
               <tr className="bg-gray-divider text-gray-text">
                  <td className="p-4 text-sm leading-6">Tarefa</td>
                  <td className="p-4 text-sm leading-6">20 minutos</td>
                  <td className="p-4 text-sm leading-6">Há dois meses</td>
                  <td className="p-4 text-sm leading-6">
                     <Status corStatus="verde" nomeStatus="concluido" />
                  </td>
               </tr>
            </tbody>
         </table>
        </div>
     </div>
    );
  }
  