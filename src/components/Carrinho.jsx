import { useState } from 'react'
import { formatarPreco } from '../utils/formatarPreco'
import { linkWhatsApp } from '../config/loja'

function Carrinho({ carrinho, aoFechar, aoAdicionar, aoRemoverUm, aoRemover }) {
    const [endereco, setEndereco] = useState("")
    const [erroEndereco, setErroEndereco] = useState(false)

    const valorTotal = carrinho.reduce((soma, item) => soma + item.quantidade * item.preco, 0)

    function finalizarPedido() {
        if (endereco.trim().length < 5) {
            setErroEndereco(true)
            return
        }

        const linhasDoPedido = carrinho
            .map((item) => {
                const detalhe = item.detalhe ? ` (${item.detalhe})` : ""
                return `- ${item.quantidade}x ${item.nome}${detalhe}`
            })
            .join("\n")

        const mensagem =
            `Olá! Quero fazer o seguinte pedido:\n\n${linhasDoPedido}\n\n` +
            `Total: ${formatarPreco(valorTotal)}\n\n` +
            `Endereço de entrega: ${endereco}`

        window.open(linkWhatsApp(mensagem), "_blank")
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 sm:px-4">
            <div className="bg-carvao border border-borda rounded-t-3xl sm:rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="font-display text-creme text-2xl mb-4">SEU PEDIDO</h2>

                {carrinho.length === 0 ? (
                    <div className="flex flex-col items-center py-8 text-areia">
                        <i aria-hidden="true" className="fa fa-utensils text-4xl mb-3"></i>
                        <p>Seu pedido está vazio.</p>
                        <p className="text-sm">Adicione algo do cardápio.</p>
                    </div>
                ) : (
                    <ul className="bg-chapa rounded-2xl px-3.5 mb-4 divide-y divide-borda/60">
                        {carrinho.map((item) => (
                            <li key={item.chave} className="flex items-center gap-3 py-3">
                                <div className="flex-1">
                                    <p className="text-creme font-extrabold leading-tight">{item.nome}</p>
                                    {item.detalhe && (
                                        <p className="text-areia text-xs">{item.detalhe}</p>
                                    )}
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

                                <button
                                    onClick={() => aoRemover(item.chave)}
                                    aria-label={`Remover ${item.nome} do pedido`}
                                    className="w-9 h-11 flex items-center justify-center text-areia hover:text-pimenta"
                                >
                                    <i aria-hidden="true" className="fa fa-trash"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex items-baseline justify-between mb-4">
                    <p className="text-creme/90 font-semibold">Total</p>
                    <p className="font-display text-molho text-2xl">{formatarPreco(valorTotal)}</p>
                </div>

                <label htmlFor="endereco" className="text-creme text-sm font-extrabold">
                    Endereço de entrega
                </label>
                <input
                    id="endereco"
                    type="text"
                    value={endereco}
                    onChange={(e) => {
                        setEndereco(e.target.value)
                        setErroEndereco(false)
                    }}
                    placeholder="Rua, número, bairro"
                    className="w-full h-12 bg-chapa text-creme border border-borda rounded-xl px-3.5 mt-1.5"
                />
                {erroEndereco && (
                    <p className="text-pimenta text-sm mt-1">Digite seu endereço completo.</p>
                )}

                <button
                    onClick={finalizarPedido}
                    disabled={carrinho.length === 0}
                    className="w-full h-14 mt-5 rounded-2xl bg-pimenta text-carvao font-extrabold flex items-center justify-center gap-2.5 disabled:opacity-40"
                >
                    <i aria-hidden="true" className="fa-brands fa-whatsapp text-xl"></i>
                    Enviar pedido no WhatsApp
                </button>
                <button onClick={aoFechar} className="w-full h-11 mt-2 text-creme/80 font-semibold">
                    Voltar ao cardápio
                </button>
            </div>
        </div>
    )
}

export default Carrinho
