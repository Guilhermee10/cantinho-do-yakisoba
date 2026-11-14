// Linha de opções (tamanho do yakisoba, sabor do refrigerante...).
// Nenhuma opção vem marcada: só fica amarela a que o cliente escolher.
function SeletorOpcoes({ opcoes, selecionada, aoSelecionar, legenda }) {
  return (
    <div role="group" aria-label={legenda} className="flex flex-1 gap-2">
      {opcoes.map((opcao) => {
        const ativa = opcao.id === selecionada
        return (
          <button
            key={opcao.id}
            onClick={() => aoSelecionar(opcao.id)}
            aria-pressed={ativa}
            className={`flex-1 min-h-12 rounded-xl px-3 py-1.5 text-left border-2 transition-colors ${
              ativa ? "border-molho bg-molho/15" : "border-borda hover:border-areia"
            }`}
          >
            <span className={`block text-xs ${ativa ? "text-molho" : "text-areia"}`}>
              {opcao.rotulo}
            </span>
            {opcao.valor && (
              <span className="block text-creme text-sm font-extrabold">{opcao.valor}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default SeletorOpcoes
