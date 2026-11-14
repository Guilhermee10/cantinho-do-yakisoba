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
            className={`flex-1 min-h-12 rounded-xl px-3 py-1.5 border-2 transition-colors ${
              opcao.valor ? "text-left" : "text-center"
            } ${ativa ? "border-molho bg-molho/15" : "border-borda hover:border-areia"}`}
          >
            {opcao.valor ? (
              <>
                <span className={`block text-xs ${ativa ? "text-molho" : "text-areia"}`}>
                  {opcao.rotulo}
                </span>
                <span className="block text-creme text-sm font-extrabold">{opcao.valor}</span>
              </>
            ) : (
              // Opção sem valor (sabor, pagamento): o rótulo é o texto principal.
              <span className={`block text-sm ${ativa ? "text-creme font-extrabold" : "text-creme/90 font-semibold"}`}>
                {opcao.rotulo}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default SeletorOpcoes
