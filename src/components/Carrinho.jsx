import { useEffect, useState } from 'react'
import SeletorOpcoes from './SeletorOpcoes'
import { formatarPreco } from '../utils/formatarPreco'
import { linkWhatsApp } from '../config/loja'
import {
  formasDePagamento,
  formasDeRecebimento,
  montarMensagem,
  validarPedido,
} from '../utils/montarMensagem'

const classeCampo =
  "w-full h-12 bg-chapa text-creme border border-borda rounded-xl px-3.5 mt-1.5 placeholder:text-areia/70"

function Carrinho({ carrinho, valorTotal, aoFechar, aoAdicionar, aoRemoverUm }) {
  // Um único objeto guarda todos os campos do formulário.
  const [dados, setDados] = useState({
    nome: "",
    recebimento: null,
    endereco: "",
    pagamento: null,
    troco: "",
  })
  const [erros, setErros] = useState({})

  const pedidoVazio = carrinho.length === 0

  // Fecha a tela com a tecla Esc. O "return" remove o ouvinte quando
  // o componente sai da tela, para não deixar ouvinte sobrando.
  useEffect(() => {
    function aoPressionarTecla(evento) {
      if (evento.key === "Escape") aoFechar()
    }
    window.addEventListener("keydown", aoPressionarTecla)
    return () => window.removeEventListener("keydown", aoPressionarTecla)
  }, [aoFechar])

  // Atualiza um campo e apaga o erro dele, se houver.
  function alterar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
    setErros((atual) => ({ ...atual, [campo]: undefined }))
  }

  function finalizarPedido() {
    const errosEncontrados = validarPedido(dados)
    if (Object.keys(errosEncontrados).length > 0) {
      setErros(errosEncontrados)
      return
    }
    const mensagem = montarMensagem({ carrinho, ...dados })
    window.open(linkWhatsApp(mensagem), "_blank")
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-pedido"
      className="fixed inset-0 z-50 bg-carvao overflow-y-auto"
    >
      <div className="max-w-md mx-auto px-4 pb-8">
        <div className="h-16 flex items-center gap-3">
          <button
            onClick={aoFechar}
            aria-label="Voltar ao cardápio"
            className="w-11 h-11 rounded-full bg-chapa text-creme flex items-center justify-center hover:bg-borda transition-colors"
          >
            <i aria-hidden="true" className="fa fa-chevron-left"></i>
          </button>
          <h2 id="titulo-pedido" className="font-display text-creme text-2xl">
            SEU PEDIDO
          </h2>
        </div>

        {pedidoVazio ? (
          <div className="flex flex-col items-center py-12 text-areia">
            <i aria-hidden="true" className="fa fa-utensils text-4xl mb-3"></i>
            <p>Seu pedido está vazio.</p>
            <p className="text-sm">Adicione algo do cardápio.</p>
          </div>
        ) : (
          <ul className="bg-chapa rounded-2xl px-3.5 divide-y divide-borda/60">
            {carrinho.map((item) => (
              <li key={item.chave} className="flex items-center gap-3 py-3">
                <div className="flex-1">
                  <p className="text-creme font-extrabold leading-tight">{item.nome}</p>
                  {item.detalhe && <p className="text-areia text-xs">{item.detalhe}</p>}
                  <p className="text-molho text-sm font-extrabold">
                    {formatarPreco(item.quantidade * item.preco)}
                  </p>
                </div>

                <div className="flex items-center bg-carvao rounded-full">
                  <button
                    onClick={() => aoRemoverUm(item.chave)}
                    aria-label={`Diminuir quantidade de ${item.nome}`}
                    className="w-11 h-11 flex items-center justify-center text-creme hover:text-pimenta"
                  >
                    <i aria-hidden="true" className="fa fa-minus"></i>
                  </button>
                  <span className="text-creme font-extrabold w-5 text-center">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => aoAdicionar(item)}
                    aria-label={`Aumentar quantidade de ${item.nome}`}
                    className="w-11 h-11 flex items-center justify-center text-creme hover:text-molho"
                  >
                    <i aria-hidden="true" className="fa fa-plus"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h3 className="font-display text-creme text-[15px] mt-6 mb-2.5">
          COMO VOCÊ QUER RECEBER?
        </h3>
        <div className="flex">
          <SeletorOpcoes
            legenda="Como você quer receber"
            opcoes={formasDeRecebimento}
            selecionada={dados.recebimento}
            aoSelecionar={(id) => alterar("recebimento", id)}
          />
        </div>
        {erros.recebimento && (
          <p role="alert" className="text-pimenta text-sm mt-1.5">{erros.recebimento}</p>
        )}

        <div className="mt-5">
          <label htmlFor="nome" className="text-creme text-sm font-extrabold">
            Seu nome
          </label>
          <input
            id="nome"
            type="text"
            autoComplete="given-name"
            value={dados.nome}
            onChange={(e) => alterar("nome", e.target.value)}
            className={classeCampo}
          />
          {erros.nome && (
            <p role="alert" className="text-pimenta text-sm mt-1.5">{erros.nome}</p>
          )}
        </div>

        {dados.recebimento === "entrega" && (
          <div className="mt-3.5">
            <label htmlFor="endereco" className="text-creme text-sm font-extrabold">
              Endereço de entrega
            </label>
            <input
              id="endereco"
              type="text"
              autoComplete="street-address"
              value={dados.endereco}
              onChange={(e) => alterar("endereco", e.target.value)}
              placeholder="Rua, número, bairro"
              className={classeCampo}
            />
            {erros.endereco && (
              <p role="alert" className="text-pimenta text-sm mt-1.5">{erros.endereco}</p>
            )}
          </div>
        )}

        <h3 className="font-display text-creme text-[15px] mt-6 mb-2.5">
          FORMA DE PAGAMENTO
        </h3>
        <div className="flex">
          <SeletorOpcoes
            legenda="Forma de pagamento"
            opcoes={formasDePagamento}
            selecionada={dados.pagamento}
            aoSelecionar={(id) => alterar("pagamento", id)}
          />
        </div>
        {erros.pagamento && (
          <p role="alert" className="text-pimenta text-sm mt-1.5">{erros.pagamento}</p>
        )}

        {dados.pagamento === "dinheiro" && (
          <div className="mt-3.5">
            <label htmlFor="troco" className="text-creme text-sm font-extrabold">
              Troco para quanto? <span className="text-areia font-semibold">(opcional)</span>
            </label>
            <input
              id="troco"
              type="text"
              inputMode="decimal"
              value={dados.troco}
              onChange={(e) => alterar("troco", e.target.value)}
              placeholder="Ex.: R$ 100,00"
              className={classeCampo}
            />
          </div>
        )}

        <div className="flex items-baseline justify-between mt-6 pt-4 border-t border-borda/60">
          <p className="text-creme/90 font-semibold">Total</p>
          <p className="font-display text-molho text-2xl">{formatarPreco(valorTotal)}</p>
        </div>

        <button
          onClick={finalizarPedido}
          disabled={pedidoVazio}
          className="w-full h-14 mt-4 rounded-2xl bg-pimenta text-carvao font-extrabold flex items-center justify-center gap-2.5 disabled:opacity-40"
        >
          <i aria-hidden="true" className="fa-brands fa-whatsapp text-xl"></i>
          Enviar pedido no WhatsApp
        </button>
        <p className="text-areia text-xs text-center mt-2.5">
          O pedido abre no WhatsApp da loja já preenchido. É só enviar.
        </p>
      </div>
    </div>
  )
}

export default Carrinho
