import { useState } from 'react'
import Destaque from './Destaque'
import CartaoYakisoba from './CartaoYakisoba'
import CartaoBebida from './CartaoBebida'
import { yakisobas, bebidas, destaque } from '../data/produtos'

const abas = [
  { id: "yakisobas", rotulo: "Yakisobas" },
  { id: "bebidas", rotulo: "Bebidas" },
]

function Cardapio({ carrinho, aoAdicionar, aoRemoverUm }) {
  const [abaAtiva, setAbaAtiva] = useState("yakisobas")
  const produtoDestaque = yakisobas.find((p) => p.id === destaque.idProduto)

  // Soma as quantidades de todas as linhas do carrinho que são do mesmo
  // produto (ex.: Especial Mini + Especial Grande).
  function quantidadeDoProduto(idProduto) {
    return carrinho
      .filter((item) => item.idProduto === idProduto)
      .reduce((soma, item) => soma + item.quantidade, 0)
  }

  function irParaDestaque() {
    setAbaAtiva("yakisobas")
    // Espera o React desenhar a aba antes de rolar até o card.
    requestAnimationFrame(() => {
      document
        .getElementById(destaque.idProduto)
        ?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  }

  return (
    <main id="menu" className="max-w-5xl mx-auto px-4 pt-4 pb-10">
      {produtoDestaque && (
        <Destaque produto={produtoDestaque} selo={destaque.selo} aoPedir={irParaDestaque} />
      )}

      <h2 className="font-display text-2xl text-creme mb-3">CARDÁPIO</h2>

      <div className="flex gap-2 mb-4">
        {abas.map((aba) => (
          <button
            key={aba.id}
            onClick={() => setAbaAtiva(aba.id)}
            aria-pressed={abaAtiva === aba.id}
            className={`h-11 px-5 rounded-full text-sm transition-colors ${
              abaAtiva === aba.id
                ? "bg-pimenta text-carvao font-extrabold"
                : "border border-borda text-creme/90 font-semibold hover:border-areia"
            }`}
          >
            {aba.rotulo}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {abaAtiva === "yakisobas"
          ? yakisobas.map((produto) => (
              <CartaoYakisoba
                key={produto.id}
                produto={produto}
                quantidadeNoPedido={quantidadeDoProduto(produto.id)}
                aoAdicionar={aoAdicionar}
              />
            ))
          : bebidas.map((produto) => (
              <CartaoBebida
                key={produto.id}
                produto={produto}
                quantidade={quantidadeDoProduto(produto.id)}
                aoAdicionar={aoAdicionar}
                aoRemoverUm={aoRemoverUm}
              />
            ))}
      </div>
    </main>
  )
}

export default Cardapio
