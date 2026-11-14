import { loja } from '../config/loja'
import { estaAberto, textoStatus } from '../utils/horario'

function Header() {
  const aberto = estaAberto()

  return (
    <header className="max-w-5xl mx-auto px-4">
      <div className="h-16 flex items-center justify-between gap-3">
        <h1 className="font-display text-creme text-base sm:text-xl tracking-wide">
          {loja.nome.toUpperCase()}
        </h1>

        <p
          className={`flex items-center gap-2 text-xs font-extrabold px-3 py-1.5 rounded-full ${
            aberto ? "bg-[#1F3A26] text-[#8FE3A4]" : "bg-chapa text-areia"
          }`}
        >
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full ${aberto ? "bg-[#5ED47E]" : "bg-areia"}`}
          />
          {textoStatus()}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <p className="bg-chapa rounded-2xl px-3 py-2.5 flex items-center gap-2 text-xs text-creme/90">
          <i aria-hidden="true" className="fa fa-location-dot text-molho"></i>
          {loja.endereco}
        </p>
        <p className="bg-chapa rounded-2xl px-3 py-2.5 flex items-center gap-2 text-xs text-creme/90">
          <i aria-hidden="true" className="fa fa-clock text-molho"></i>
          {loja.horario.texto}
        </p>
      </div>
    </header>
  )
}

export default Header
