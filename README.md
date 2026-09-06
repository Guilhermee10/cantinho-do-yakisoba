# Cantinho do Yakisoba 🍜

Cardápio digital e carrinho de pedidos para uma casa de yakisoba local, com
checkout direto via WhatsApp. Projeto freelancer, migrado de HTML/JS puro
para **React**, com identidade visual redesenhada do zero.

🔗 **Site no ar**: [cantinho-do-yakisoba.vercel.app](https://cantinho-do-yakisoba.vercel.app)

## Sobre o projeto

O cliente já tinha um site funcional (HTML + Tailwind + JavaScript puro), mas
com o cardápio inteiro escrito manualmente em blocos de HTML repetidos —
qualquer alteração de produto ou preço exigia mexer direto no código. Este
projeto refez a base em React (produtos viram dados, não HTML duplicado) e
redesenhou a identidade visual, mantendo o fluxo essencial do negócio: o
cliente monta o carrinho e finaliza o pedido com a mensagem já pronta no
WhatsApp da loja.

## Funcionalidades

- 🛒 Carrinho de compras com contador de itens e ajuste de quantidade direto
  no card do produto (+/-)
- 📑 Cardápio organizado em abas (Yakisobas / Bebidas), evitando rolagem
  longa e facilitando a escolha
- 💬 Checkout via WhatsApp — monta automaticamente a mensagem com os itens,
  quantidades, total e endereço de entrega
- 🔔 Feedback visual ao adicionar item (toast de confirmação + animação no
  ícone do carrinho)
- 📱 Totalmente responsivo, pensado primeiro para uso no celular

## Stack técnica

- **React** + **Vite**
- **Tailwind CSS v4** (tema customizado via `@theme`, sem arquivo de config
  separado)
- **react-toastify** para notificações
- **Font Awesome** para ícones
- Deploy contínuo na **Vercel**

## Rodando localmente

```bash
git clone https://github.com/Guilhermee10/cantinho-do-yakisoba.git
cd cantinho-do-yakisoba
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Estrutura

```
src/
├── components/     → Header, Cardapio, CartaoProduto, Carrinho, BarraCarrinho, Footer
├── data/           → produtos.js (cardápio como dados, não HTML repetido)
├── App.jsx         → estado do carrinho, orquestra os componentes
└── index.css       → tema Tailwind (cores, fontes, scroll suave)
```

## Decisões de design

- Paleta inspirada em chapa/wok (carvão, vermelho-pimenta, dourado), evitando
  o visual genérico de landing page
- Tipografia de dois papéis: display forte (Archivo Black) para títulos,
  sans-serif limpa (Manrope) para leitura em telas pequenas
- Estado do carrinho centralizado no componente `App`, repassado via props —
  qualquer parte da tela (barra flutuante, modal, contador no card) reflete
  o mesmo dado em tempo real

## Autor

Desenvolvido por [Guilherme](https://github.com/Guilhermee10) como projeto
freelancer.
