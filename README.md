# Cantina - App: A Cantina Inteligente da FIAP | CheckPoint 2

## Nomes, RM´s e Contribuições Descritas do Grupo

| Nome | RM | Contribuições |
|------|----|----------------|
| Henrique Maldonado | 557270 | Desenvolveu toda a estrutura do projeto e o código do Cantina App, incluindo as versões iniciais e as atualizações com tela de login/cadastro, cardápio com favoritos e tema escuro (dark mode). |<img width="1220" height="791" alt="cardapio" src="https://github.com/user-attachments/assets/02a8a396-ffe8-406d-8d8b-2972dec20ee0" />

| Matheus Taylor | 556211 | Responsável pela documentação do README.md, criação do repositório `fiap-mdi-cp2-cantina-app` e atualizações da documentação conforme novas funcionalidades pro CheckPoint 2 (fiap-mdi-cp2-cantina-app). |

## Sobre o Projeto

**Nome do App:** Cantina - App: A Cantina Inteligente da FIAP  
**Problema resolvido:** Durante os intervalos, a cantina da FIAP costuma ficar lotada, fazendo com que os alunos percam tempo em filas longas sem saber o momento ideal para ir lanchar.  
Este app resolve esse problema oferecendo **monitoramento em tempo real da fila**, estatísticas de atendimento, gráfico histórico de ocupação, **cardápio interativo** e **tema escuro** para melhor experiência de uso.

**Operação da FIAP escolhida:** Operação **Cantina** – escolhida por ser um ambiente de alto fluxo de alunos, onde a gestão de filas impacta diretamente a experiência e o tempo disponível para alimentação.

### Funcionalidades implementadas

- **Tela inicial (Home)**  
  - Exibe o número atual de pessoas na fila, com status visual (🟢 Tranquilo, 🟡 Moderado, 🔴 Cheio) e ícone ilustrativo.  
  - Acesso rápido a: análise completa, histórico da fila e cardápio.  
  - **Login/Logout** – opção para se identificar (nome) ou sair do perfil.  
  - **Tema escuro** – botão flutuante no canto inferior esquerdo para alternar entre modo claro e escuro.

- **Tela de Login / Cadastro**  
  - Formulário com validação (nome obrigatório no cadastro, e‑mail com @ e senha com mínimo 4 caracteres).  
  - Alternância entre modos de cadastro e login.  
  - Exibição/ocultação da senha.  
  - Tema escuro próprio, com o mesmo botão flutuante.

- **Tela "Ver cardápio da cantina" (Menu)**  
  - Exibe 6 categorias de itens (Salgados, Pizza, Refrigerantes, Café, Salgados 2 e Sucos) com ícones ilustrativos.  
  - **Favoritar itens** tocando na estrela (☆ / ⭐).  
  - Tema escuro com botão flutuante.

- **Tela "Ver análise completa" (Sobre / Simulação)**  
  - Simula dinamicamente a fila e os tempos de atendimento.  
  - Calcula e exibe:
    - Média do tempo de atendimento (min)
    - Variância dos tempos
    - Tempo estimado total = média × tamanho da fila
  - Indicação quando não há fila (🎉).  
  - Tema escuro com botão flutuante.

- **Tela "Ver histórico da fila" (Status / Gráfico)**  
  - Gráfico de barras atualizado automaticamente a cada 2 segundos com as últimas 10 medições.  
  - Cada barra mostra o número de pessoas e o horário da medição, com cores conforme a lotação (verde, amarelo, vermelho).  
  - Tema escuro com botão flutuante.

- **Navegação**  
  - Abas inferiores (Home / Perfil – a tela de Perfil ainda é um placeholder).  
  - Navegação empilhada para as demais telas, com botão "Voltar" em cada uma.  
  - O estado do tema escuro é preservado ao navegar entre as telas (passado via parâmetros).

## Como Rodar o Projeto

### Pré‑requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Aplicativo **Expo Go** no celular (Android/iOS) ou emulador Android/iOS configurado

### Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/MatheusTaylorSimomn2014/fiap-mdi-cp1-cantina-app.git
cd fiap-mdi-cp1-cantina-app/cantina-app
```

2. Instale as dependências

```bash
npm install
```

3. Inicie o servidor Expo

```bash
npx expo start
```

4. Execute no dispositivo/emulador
      Escaneie o QR Code com o Expo Go (Android/iOS) ou pressione a para emulador Android / i para iOS.

OBS: Certifique-se de que o celular e o computador estejam na mesma rede Wi-Fi.

## Demonstração

Os prints abaixo foram capturados das versões recentes do aplicativo, já com tema escuro e novas funcionalidades. Vídeos de demonstração podem ser adicionados posteriormente.

### Tela Inicial (Home)

<img width="1139" height="760" alt="menudisplay" src="https://github.com/user-attachments/assets/37b7ea9d-0293-4311-bf34-a79ca88d2ddd" />

### Tela Inicial (Home) – Modo Escuro

<img width="498" height="1036" alt="menudark" src="https://github.com/user-attachments/assets/99224b54-ac60-4ad4-a264-15ababaaab4e" />

### Tela de Login

<img width="1367" height="773" alt="login" src="https://github.com/user-attachments/assets/022984b1-eca6-4907-8942-76a290dc4685" />

### Tela do Cardápio (Menu)

<img width="1220" height="791" alt="cardapio" src="https://github.com/user-attachments/assets/a46c69db-1358-49bc-8394-e556a50b8292" />

### Tela de Análise (Simulação)

<img width="1304" height="732" alt="simulacao" src="https://github.com/user-attachments/assets/7f5d07bd-ad57-4018-8c98-ce4b85b65ec5" />

### Gráfico Histórico da Fila

<img width="1227" height="755" alt="grafico" src="https://github.com/user-attachments/assets/2c843592-eb9e-4c86-a98b-b572b09601bc" />

### Link do Video do Projeto Rodando:
https://youtube.com/shorts/wv70OC5QSvE?si=WEIQg8M_-V8Njo2e


## Decisões Técnicas

### Estrutura do projeto

O projeto foi criado com Expo (SDK 51) e utiliza o Expo Router para navegação baseada em arquivos. A organização das pastas segue o padrão recomendado:

```text
cantina-app/
├── app/
│   ├── _layout.js        # Configuração das abas (Home e Perfil)
│   ├── index.js          # Tela inicial (Home)
│   ├── login.js          # Tela de login/cadastro
│   ├── menu.js           # Cardápio com favoritos
│   ├── sobre.js          # Simulação da fila e estatísticas
│   ├── status.js         # Gráfico histórico da fila
│   └── perfil.js         # (placeholder para futura implementação)
├── assets/               # Recursos estáticos
├── .gitignore
├── app.json
└── package.json
```

## Hooks utilizados e suas finalidades

| Hook                     | Local(is)                              | Finalidade                                                                                                                                                                       |
|--------------------------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `useState`               | Todos os componentes                   | Gerenciar estados da fila, tempos, estatísticas, dados do gráfico, informações do usuário, estado do tema escuro, favoritos, validação de formulário, etc.                       |
| `useEffect`              | index, sobre, status                   | Efeitos colaterais: simulação periódica da fila (`setInterval`), limpeza dos intervalos, atualização de estatísticas e dados do gráfico.                                         |
| `useRouter`              | Todos os componentes                   | Navegação programática (`router.push`, `router.replace`, `router.back`).                                                                                                        |
| `useLocalSearchParams`   | index, login, menu, sobre, status      | Leitura de parâmetros recebidos na rota (nome do usuário, estado do dark mode).                                                                                                  |
| `useRef`                 | index                                  | Referência para controlar se o login inicial já foi processado, evitando loops no `useEffect`.                                                                                  |
| `useCallback`            | sobre, status                          | Memorizar funções de cálculo e geração de dados, evitando recriações desnecessárias e dependências instáveis em efeitos.                                                        |

## Navegação
· Abas (Tabs): `_layout.js` define duas abas principais – Home (`index`) e Perfil (`perfil`).
· Rotas empilhadas: A partir da Home, o usuário pode acessar `/login`, `/sobre`, `/status` e `/menu` via `router.push`, podendo retornar com router.back().
· Parâmetros de rota: O nome do usuário logado e o estado do tema escuro (`dark`) são passados entre telas para manter a experiência coerente.

## Simulação de dados

Como o app foi desenvolvido para fins acadêmicos e demonstração (sem backend real), utilizamos `setInterval` e `Math.random()` para simular:

· Número de pessoas na fila (0 a 14)
· Tempo de atendimento por pessoa (2 a 6 minutos)
· Atualização a cada 2 ou 3 segundos, conforme a tela.

Essa abordagem permite testar todas as funcionalidades sem dependência externa.

## Estilização e Tema Escuro
· StyleSheet.create para estilos isolados por componente.
· Cores definidas manualmente (ex: #F23064 para cards principais, #32CD32 para estimativa, #FF8C00 para barras do gráfico).
· Tema escuro (dark mode): Cada tela possui um estado local `darkMode`, inicializado pelo parâmetro de rota. O botão flutuante no canto inferior esquerdo permite alternância instantânea, adaptando fundos, textos, inputs e cards.

## Login e Cardápio

· **Login:** Validação de campos, alternância entre cadastro e login, máscara de senha e feedback de erros.
· **Cardápio:** Lista de itens com imagens, sistema de favoritos (estado local) e layout em grid responsivo.

## Próximos Passos (Melhorias Futuras)

Apesar do app já possuir funcionalidades além do escopo inicial, o grupo identifica oportunidades de evolução:

· **Backend real** – API REST com Node.js + MongoDB para filas, usuários e cardápio dinâmico.
· **Autenticação institucional** – Login via e‑mail FIAP/SSO para personalização do perfil.
· **Localização da cantina** – Detectar qual unidade o aluno está para exibir a fila correspondente.
· **Notificações push** – Alertar quando a fila estiver abaixo de um limite configurado.
· **Acessibilidade** – Suporte a leitores de tela (já iniciado com `accessibilityLabel`), aumento de contraste e fontes ajustáveis.
· **Perfil do aluno** (tela atualmente placeholder) – Histórico de idas à cantina, tempo médio de espera, preferências alimentares.

## Licença

Este projeto foi desenvolvido para fins acadêmicos – FIAP – Mobile Development & IOT (CheckPoint 2).
