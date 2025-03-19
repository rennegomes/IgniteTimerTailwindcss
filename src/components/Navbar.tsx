'use client'
import { Scroll, Timer } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar(){

    const nomeRota = usePathname();

    const rotaAtiva = (path: string) =>
        nomeRota === path ? 'text-green' : '';

    return(
        <div className="flex items-center justify-between">
            <span>Logo</span>
            <div className="flex items-center gap-5">
                <Link href="/" title="Timer" className={`border-y-3 border-transparent hover:border-b-green hover:text-green  transition-colors duration-200 ${rotaAtiva('/')}`}>
                    <Timer size={25}/>
                </Link>
                <Link href="/historico" title="Histórico" className={`border-y-3 border-transparent hover:border-b-green hover:text-green  transition-colors duration-200 ${rotaAtiva('/historico')}`}>
                    <Scroll size={25}/>
                </Link>
            </div>
        </div>
    )
}