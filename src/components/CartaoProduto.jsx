import { useState } from 'react'
import { toast } from 'react-toastify'

function CartaoProduto({ produto, quantidade, aoAdicionar, aoRemoverUm }) {
  const [confirmado, setConfirmado] = useState(false)

  function handleAdicionar() {
    aoAdicionar(produto)
    toast(`${produto.nome} adicionado`, { icon: "🍜" })

    setConfirmado(true)
    setTimeout(() => setConfirmado(false), 600)
  }

  return (
    <div className="bg-madeira rounded-xl overflow-hidden flex flex-col">
      <img
        src={produto.imagem}
        alt={produto.nome}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <p className="font-display text-creme text-lg leading-tight">
          {produto.nome}
        </p>
        <p className="text-creme/60 text-sm mt-1 flex-1">
          {produto.descricao}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="font-display text-molho text-xl">
            R$ {produto.preco.toFixed(2).replace(".", ",")}
          </p>

          {quantidade === 0 ? (
            <button
              onClick={handleAdicionar}
              className="bg-pimenta w-10 h-10 rounded-full flex items-center justify-center hover:bg-molho transition-colors"
            >
              <i className={`fa ${confirmado ? "fa-check" : "fa-cart-plus"} text-creme`}></i>
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-carvao rounded-full px-3 py-1">
              <button
                onClick={() => aoRemoverUm(produto.id)}
                className="w-6 h-6 flex items-center justify-center text-creme hover:text-pimenta transition-colors"
              >
                <i className="fa fa-minus"></i>
              </button>
              <span className="text-creme font-semibold w-4 text-center">
                {quantidade}
              </span>
              <button
                onClick={handleAdicionar}
                className="w-6 h-6 flex items-center justify-center text-creme hover:text-molho transition-colors"
              >
                <i className="fa fa-plus"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartaoProduto