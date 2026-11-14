import { toast } from 'react-toastify'
import { formatarPreco } from '../utils/formatarPreco'
import { criarItemBebida } from '../data/produtos'

function CartaoBebida({ produto, quantidade, aoAdicionar, aoRemoverUm }) {
  const item = criarItemBebida(produto)

  function handleAdicionar() {
    aoAdicionar(item)
    if (quantidade === 0) toast(`${produto.nome} adicionado`, { icon: "🥤" })
  }

  return (
    <article className="bg-chapa rounded-2xl p-3 flex gap-3">
      <img
        src={produto.imagem}
        alt={produto.nome}
        loading="lazy"
        className="w-22 h-22 rounded-xl object-cover shrink-0"
      />
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="font-display text-creme text-lg leading-tight">{produto.nome}</h3>
        <p className="text-areia text-sm leading-snug flex-1">{produto.descricao}</p>

        <div className="flex items-center justify-between mt-1">
          <p className="text-creme font-extrabold">{formatarPreco(produto.preco)}</p>

          {quantidade === 0 ? (
            <button
              onClick={handleAdicionar}
              aria-label={`Adicionar ${produto.nome} ao pedido`}
              className="w-11 h-11 rounded-xl bg-pimenta text-carvao flex items-center justify-center hover:bg-molho transition-colors"
            >
              <i aria-hidden="true" className="fa fa-plus"></i>
            </button>
          ) : (
            <div className="flex items-center bg-carvao rounded-full">
              <button
                onClick={() => aoRemoverUm(item.chave)}
                aria-label={`Diminuir quantidade de ${produto.nome}`}
                className="w-11 h-11 flex items-center justify-center text-creme hover:text-pimenta transition-colors"
              >
                <i aria-hidden="true" className="fa fa-minus"></i>
              </button>
              <span className="text-creme font-extrabold w-5 text-center">{quantidade}</span>
              <button
                onClick={handleAdicionar}
                aria-label={`Aumentar quantidade de ${produto.nome}`}
                className="w-11 h-11 flex items-center justify-center text-creme hover:text-molho transition-colors"
              >
                <i aria-hidden="true" className="fa fa-plus"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default CartaoBebida
