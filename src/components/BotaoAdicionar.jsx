function BotaoAdicionar({ aoClicar, rotulo }) {
  return (
    <button
      onClick={aoClicar}
      aria-label={rotulo}
      className="w-12 min-h-12 rounded-xl bg-pimenta text-carvao flex items-center justify-center hover:bg-molho transition-colors shrink-0"
    >
      <i aria-hidden="true" className="fa fa-plus text-lg"></i>
    </button>
  )
}

export default BotaoAdicionar
