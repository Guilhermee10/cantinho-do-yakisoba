import { useState } from 'react'

function Carrinho({ carrinho, aoFechar, aoRemover }) {
    const [endereco, setEndereco] = useState("")
    const [erroEndereco, setErroEndereco] = useState(false)

    const valorTotal = carrinho.reduce((soma, item) => soma + item.quantidade * item.preco, 0)

    function finalizarPedido() {
        if (endereco.trim().length < 5) {
            setErroEndereco(true)
            return
        }

        const linhasDoPedido = carrinho
            .map((item) => `- ${item.quantidade}x ${item.nome}`)
            .join("\n")

        const mensagem =
            `Olá! Quero fazer o seguinte pedido:\n\n${linhasDoPedido}\n\n` +
            `Total: R$ ${valorTotal.toFixed(2).replace(".", ",")}\n\n` +
            `Endereço de entrega: ${endereco}`

        const numeroWhatsApp = "557599683710" // troque pelo número real, com DDI+DDD
        const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`

        window.open(link, "_blank")
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-madeira rounded-xl p-6 w-full max-w-md">
                <h2 className="font-display text-creme text-2xl mb-4">MEU CARRINHO</h2>

                {carrinho.length === 0 ? (
                    <div className="flex flex-col items-center py-8 text-creme/50">
                        <i className="fa fa-utensils text-4xl mb-3"></i>
                        <p>Seu carrinho está vazio.</p>
                        <p className="text-sm">Adicione algo saboroso do cardápio!</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 mb-4">
                        {carrinho.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-creme">
                                <span>{item.quantidade}x {item.nome}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-molho font-semibold">
                                        R$ {(item.quantidade * item.preco).toFixed(2).replace(".", ",")}
                                    </span>
                                    <button onClick={() => aoRemover(item.id)} className="text-creme/50 hover:text-pimenta">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <p className="font-display text-molho text-xl mb-4">
                    Total: R$ {valorTotal.toFixed(2).replace(".", ",")}
                </p>

                <label className="text-creme text-sm font-semibold">Endereço de entrega:</label>
                <input
                    type="text"
                    value={endereco}
                    onChange={(e) => {
                        setEndereco(e.target.value)
                        setErroEndereco(false)
                    }}
                    placeholder="Rua, número, bairro..."
                    className="w-full bg-carvao text-creme border border-creme/20 rounded-lg p-2 mt-1"
                />
                {erroEndereco && (
                    <p className="text-pimenta text-sm mt-1">Digite seu endereço completo.</p>
                )}

                <div className="flex items-center justify-between mt-6">
                    <button onClick={aoFechar} className="text-creme/70">
                        Fechar
                    </button>
                    <button
                        onClick={finalizarPedido}
                        disabled={carrinho.length === 0}
                        className="bg-pimenta text-creme px-5 py-2 rounded-full font-semibold disabled:opacity-40"
                    >
                        Finalizar no WhatsApp
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Carrinho