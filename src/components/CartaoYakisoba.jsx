import { useState } from 'react'
import { toast } from 'react-toastify'
import { formatarPreco } from '../utils/formatarPreco'
import { tamanhos, criarItemYakisoba } from '../data/produtos'

function CartaoYakisoba({ produto, quantidadeNoPedido, aoAdicionar }) {
  // Cada card guarda só o tamanho que está selecionado nele.
  // O carrinho continua sendo estado do App.
  const [tamanho, setTamanho] = useState("grande")

  function handleAdicionar() {
    const item = criarItemYakisoba(produto, tamanho)
    aoAdicionar(item)
    toast(`${item.nome} (${tamanhos[tamanho].rotulo}) adicionado`, { icon: "🍜" })
  }

  return (
    <article
      id={produto.id}
      className="bg-chapa rounded-2xl p-3 flex flex-col gap-2.5 scroll-mt-4"
    >
      <div className="flex gap-3">
        <img
          src={produto.imagem}
          alt={produto.nomeCompleto}
          loading="lazy"
          className="w-22 h-22 rounded-xl object-cover shrink-0"
        />
        <div className="flex flex-col justify-center gap-1">
          <h3 className="font-display text-creme text-lg leading-tight">
            {produto.nome}
          </h3>
          <p className="text-areia text-sm leading-snug">{produto.descricao}</p>
          {quantidadeNoPedido > 0 && (
            <p className="text-molho text-xs font-extrabold">
              {quantidadeNoPedido} no pedido
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        {Object.entries(tamanhos).map(([chave, { rotulo, peso }]) => {
          const selecionado = chave === tamanho
          return (
            <button
              key={chave}
              onClick={() => setTamanho(chave)}
              aria-pressed={selecionado}
              className={`flex-1 min-h-12 rounded-xl px-3 py-1.5 text-left transition-colors ${
                selecionado
                  ? "border-2 border-molho bg-molho/15"
                  : "border border-borda hover:border-areia"
              }`}
            >
              <span className={`block text-[11px] ${selecionado ? "text-molho" : "text-areia"}`}>
                {rotulo} · {peso}
              </span>
              <span className="block text-creme text-sm font-extrabold">
                {formatarPreco(produto.precos[chave])}
              </span>
            </button>
          )
        })}

        <button
          onClick={handleAdicionar}
          aria-label={`Adicionar ${produto.nomeCompleto} ${tamanhos[tamanho].rotulo} ao pedido`}
          className="w-12 min-h-12 rounded-xl bg-pimenta text-carvao flex items-center justify-center hover:bg-molho transition-colors"
        >
          <i aria-hidden="true" className="fa fa-plus text-lg"></i>
        </button>
      </div>
    </article>
  )
}

export default CartaoYakisoba
