interface StatusProps{
    nomeStatus: keyof typeof statusNome,
    corStatus: keyof typeof statusCor
}

const statusNome = {
    concluido: 'Concluído',
    andamento: 'Em andamento',
    interrompido: 'Interrompido'
} as const

const statusCor = {
    verde: 'before:bg-green',
    amarelo: 'before:bg-yellow-500',
    vermelho: 'before:bg-red'
} as const


export default function Status(props: StatusProps){
    return(
        <span className={`flex items-center gap-2  before:w-2 before:h-2 before:rounded-full before:container-[''] ${statusCor[props.corStatus]}`}>
            {statusNome[props.nomeStatus]}
        </span>
    )
}