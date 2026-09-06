function BarraCarrinho({ carrinho, aoClicar, pulsando }) {
  const quantidadeTotal = carrinho.reduce((soma, item) => soma + item.quantidade, 0)

  return (
    <button
      onClick={aoClicar}
      className="fixed bottom-6 right-6 w-16 h-16 bg-pimenta rounded-full flex items-center justify-center shadow-lg z-40 transition-transform"
      style={{ transform: pulsando ? "scale(1.15)" : "scale(1)" }}
    >
      <i className="fa fa-cart-plus text-creme text-xl"></i>

      {quantidadeTotal > 0 && (
        <span className="absolute -top-1 -right-1 bg-molho text-carvao text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {quantidadeTotal}
        </span>
      )}
    </button>
  )
}

export default BarraCarrinho