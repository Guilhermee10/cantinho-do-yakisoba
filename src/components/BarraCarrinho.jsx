import { formatarPreco } from '../utils/formatarPreco'

function BarraCarrinho({ carrinho, aoClicar, pulsando }) {
  const quantidadeTotal = carrinho.reduce((soma, item) => soma + item.quantidade, 0)
  const valorTotal = carrinho.reduce((soma, item) => soma + item.quantidade * item.preco, 0)

  // Sem itens não há pedido para ver: a barra só aparece quando faz sentido.
  if (quantidadeTotal === 0) return null

  return (
    <div className="fixed bottom-4 inset-x-4 z-40 flex justify-center">
      <button
        onClick={aoClicar}
        className="w-full max-w-md h-15 rounded-2xl bg-molho text-carvao flex items-center justify-between px-4 shadow-lg shadow-black/50 transition-transform"
        style={{ transform: pulsando ? "scale(1.04)" : "scale(1)" }}
      >
        <span className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-carvao text-molho text-sm font-extrabold flex items-center justify-center">
            {quantidadeTotal}
          </span>
          <span className="font-extrabold">Ver pedido</span>
        </span>
        <span className="font-display text-lg">{formatarPreco(valorTotal)}</span>
      </button>
    </div>
  )
}

export default BarraCarrinho
