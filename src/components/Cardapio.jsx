import { useState } from 'react'
import CartaoProduto from './CartaoProduto'
import { produtos, bebidas } from '../data/produtos'

function Cardapio({ carrinho, aoAdicionar, aoRemoverUm }) {
  const [abaAtiva, setAbaAtiva] = useState("yakisobas")
  const itensParaMostrar = abaAtiva === "yakisobas" ? produtos : bebidas

  return (
    <div id="menu" className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="font-display text-3xl text-creme text-center mb-8">
        NOSSO CARDÁPIO
      </h2>

      <div className="flex justify-center gap-3 mb-8">
        <button
          onClick={() => setAbaAtiva("yakisobas")}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${
            abaAtiva === "yakisobas" ? "bg-pimenta text-creme" : "bg-madeira text-creme/60"
          }`}
        >
          Yakisobas
        </button>
        <button
          onClick={() => setAbaAtiva("bebidas")}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${
            abaAtiva === "bebidas" ? "bg-pimenta text-creme" : "bg-madeira text-creme/60"
          }`}
        >
          Bebidas
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {itensParaMostrar.map((item) => {
          const itemNoCarrinho = carrinho.find((c) => c.id === item.id)
          return (
            <CartaoProduto
              key={item.id}
              produto={item}
              quantidade={itemNoCarrinho ? itemNoCarrinho.quantidade : 0}
              aoAdicionar={aoAdicionar}
              aoRemoverUm={aoRemoverUm}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Cardapio