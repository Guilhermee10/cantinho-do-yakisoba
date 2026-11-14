import { useState } from 'react'
import { toast } from 'react-toastify'
import SeletorOpcoes from './SeletorOpcoes'
import { criarItemYakisoba, opcoesDeTamanho } from '../data/produtos'

function Destaque({ produto, selo, aoAdicionar }) {
  const [tamanho, setTamanho] = useState(null)
  const [faltaEscolher, setFaltaEscolher] = useState(false)

  function handleSelecionar(novoTamanho) {
    setTamanho(novoTamanho)
    setFaltaEscolher(false)
  }

  function handlePedir() {
    if (!tamanho) {
      setFaltaEscolher(true)
      return
    }
    const item = criarItemYakisoba(produto, tamanho)
    aoAdicionar(item)
    toast(`${item.nome} (${item.detalhe}) adicionado`, { icon: "🍜" })
  }

  return (
    <section
      className={`bg-chapa border-2 rounded-2xl overflow-hidden mb-8 sm:flex sm:items-stretch transition-colors ${
        tamanho ? "border-molho" : "border-borda"
      }`}
    >
      <img
        src={produto.imagem}
        alt={produto.nomeCompleto}
        className="w-full h-40 sm:h-auto sm:w-64 object-cover shrink-0 sm:order-2"
      />
      <div className="flex-1 p-4 flex flex-col gap-2">
        <p className="text-molho text-[11px] font-extrabold tracking-widest uppercase">{selo}</p>
        <h2 className="font-display text-creme text-xl leading-tight uppercase">
          {produto.nomeCompleto}
        </h2>
        <p className="text-areia text-sm leading-snug">{produto.descricao}</p>

        <div className="flex gap-2 mt-1">
          <SeletorOpcoes
            legenda={`Tamanho do ${produto.nomeCompleto}`}
            opcoes={opcoesDeTamanho(produto)}
            selecionada={tamanho}
            aoSelecionar={handleSelecionar}
          />
          <button
            onClick={handlePedir}
            className="min-h-12 px-6 rounded-xl bg-molho text-carvao text-sm font-extrabold hover:brightness-110 transition shrink-0"
          >
            Pedir
          </button>
        </div>

        {faltaEscolher && (
          <p role="alert" className="text-pimenta text-sm font-semibold">
            Escolha o tamanho antes de pedir.
          </p>
        )}
      </div>
    </section>
  )
}

export default Destaque
