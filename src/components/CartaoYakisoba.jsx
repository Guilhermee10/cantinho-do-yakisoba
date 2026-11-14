import { useState } from 'react'
import { toast } from 'react-toastify'
import SeletorOpcoes from './SeletorOpcoes'
import BotaoAdicionar from './BotaoAdicionar'
import { criarItemYakisoba, opcoesDeTamanho } from '../data/produtos'

function CartaoYakisoba({ produto, quantidadeNoPedido, aoAdicionar }) {
  // null = o cliente ainda não escolheu o tamanho neste card.
  const [tamanho, setTamanho] = useState(null)
  const [faltaEscolher, setFaltaEscolher] = useState(false)

  function handleSelecionar(novoTamanho) {
    setTamanho(novoTamanho)
    setFaltaEscolher(false)
  }

  function handleAdicionar() {
    if (!tamanho) {
      setFaltaEscolher(true)
      return
    }
    const item = criarItemYakisoba(produto, tamanho)
    aoAdicionar(item)
    toast(`${item.nome} (${item.detalhe}) adicionado`, { icon: "🍜" })
  }

  return (
    <article
      id={produto.id}
      className={`bg-chapa rounded-2xl p-3 flex flex-col gap-2.5 border-2 transition-colors ${
        tamanho ? "border-molho" : "border-transparent"
      }`}
    >
      <div className="flex gap-3">
        <img
          src={produto.imagem}
          alt={produto.nomeCompleto}
          loading="lazy"
          className="w-22 h-22 rounded-xl object-cover shrink-0"
        />
        <div className="flex flex-col justify-center gap-1">
          <h3 className="font-display text-creme text-lg leading-tight">{produto.nome}</h3>
          <p className="text-areia text-sm leading-snug">{produto.descricao}</p>
          {quantidadeNoPedido > 0 && (
            <p className="text-molho text-xs font-extrabold">{quantidadeNoPedido} no pedido</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-auto">
        <SeletorOpcoes
          legenda={`Tamanho do ${produto.nomeCompleto}`}
          opcoes={opcoesDeTamanho(produto)}
          selecionada={tamanho}
          aoSelecionar={handleSelecionar}
        />
        <BotaoAdicionar
          aoClicar={handleAdicionar}
          rotulo={`Adicionar ${produto.nomeCompleto} ao pedido`}
        />
      </div>

      {faltaEscolher && (
        <p role="alert" className="text-pimenta text-sm font-semibold">
          Escolha o tamanho antes de adicionar.
        </p>
      )}
    </article>
  )
}

export default CartaoYakisoba
