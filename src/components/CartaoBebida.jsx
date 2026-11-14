import { useState } from 'react'
import { toast } from 'react-toastify'
import SeletorOpcoes from './SeletorOpcoes'
import BotaoAdicionar from './BotaoAdicionar'
import { formatarPreco } from '../utils/formatarPreco'
import { criarItemBebida } from '../data/produtos'

function CartaoBebida({ produto, quantidadeNoPedido, aoAdicionar }) {
  const temSabores = Boolean(produto.sabores)
  const [sabor, setSabor] = useState(null)
  const [faltaEscolher, setFaltaEscolher] = useState(false)

  function handleSelecionar(novoSabor) {
    setSabor(novoSabor)
    setFaltaEscolher(false)
  }

  function handleAdicionar() {
    if (temSabores && !sabor) {
      setFaltaEscolher(true)
      return
    }
    const item = criarItemBebida(produto, sabor)
    aoAdicionar(item)
    toast(`${item.nome}${item.detalhe ? ` (${item.detalhe})` : ""} adicionado`, { icon: "🥤" })
  }

  return (
    <article
      className={`bg-chapa rounded-2xl p-3 flex flex-col gap-2.5 border-2 transition-colors ${
        sabor ? "border-molho" : "border-transparent"
      }`}
    >
      <div className="flex gap-3">
        <img
          src={produto.imagem}
          alt={produto.nome}
          loading="lazy"
          className="w-22 h-22 rounded-xl object-cover shrink-0 bg-creme"
        />
        <div className="flex-1 flex flex-col justify-center gap-1">
          <h3 className="font-display text-creme text-lg leading-tight">{produto.nome}</h3>
          <p className="text-areia text-sm leading-snug">{produto.descricao}</p>
          <p className="text-creme font-extrabold">{formatarPreco(produto.preco)}</p>
          {quantidadeNoPedido > 0 && (
            <p className="text-molho text-xs font-extrabold">{quantidadeNoPedido} no pedido</p>
          )}
        </div>
        {!temSabores && (
          <div className="flex items-end">
            <BotaoAdicionar
              aoClicar={handleAdicionar}
              rotulo={`Adicionar ${produto.nome} ao pedido`}
            />
          </div>
        )}
      </div>

      {temSabores && (
        <div className="flex gap-2 mt-auto">
          <SeletorOpcoes
            legenda={`Sabor do ${produto.nome}`}
            opcoes={produto.sabores.map((nome) => ({ id: nome, rotulo: nome }))}
            selecionada={sabor}
            aoSelecionar={handleSelecionar}
          />
          <BotaoAdicionar
            aoClicar={handleAdicionar}
            rotulo={`Adicionar ${produto.nome} ao pedido`}
          />
        </div>
      )}

      {faltaEscolher && (
        <p role="alert" className="text-pimenta text-sm font-semibold">
          Escolha o sabor antes de adicionar.
        </p>
      )}
    </article>
  )
}

export default CartaoBebida
