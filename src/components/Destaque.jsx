import { formatarPreco } from '../utils/formatarPreco'
import { menorPreco } from '../data/produtos'

function Destaque({ produto, selo, aoPedir }) {
  return (
    <section className="bg-chapa border border-molho rounded-2xl overflow-hidden flex items-stretch mb-8">
      <div className="flex-1 p-4 flex flex-col items-start gap-1.5">
        <p className="text-molho text-[11px] font-extrabold tracking-widest uppercase">
          {selo}
        </p>
        <h2 className="font-display text-creme text-xl leading-tight uppercase">
          {produto.nome}
        </h2>
        <p className="text-areia text-sm">
          A partir de {formatarPreco(menorPreco(produto))}
        </p>
        <button
          onClick={aoPedir}
          className="mt-1.5 h-11 px-6 rounded-full bg-molho text-carvao text-sm font-extrabold hover:brightness-110 transition"
        >
          Pedir
        </button>
      </div>
      <img
        src={produto.imagem}
        alt={produto.nomeCompleto}
        className="w-36 sm:w-56 object-cover shrink-0"
      />
    </section>
  )
}

export default Destaque
