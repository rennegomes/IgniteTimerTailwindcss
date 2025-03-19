interface BotaoProps {
    variant?: 'primaria' | 'segundaria' | 'perigo' | 'sucesso',
    cor?: string
}

export function Botao({variant = 'primaria', ...props}: BotaoProps){

    let variaCor = {
        'primaria': 'bg-[blue]',
        'segundaria': 'bg-[orange]',
        'perigo': 'bg-[red]',
        'sucesso': 'bg-green-dark'
        }

    return (
        <button className={`w-20 h-10 rounded-lg m-5 cursor-pointer  ${variaCor[variant]}`}>
            Enviar
        </button>
    )   
}