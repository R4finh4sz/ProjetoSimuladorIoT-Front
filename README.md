# ProjetoSimuladorIoT-Front

Interface web para o simulador IoT, construída com **React + Vite + Tailwind CSS**. Exibe o estado em tempo real dos sensores e dispositivos consumindo a API FastAPI do backend.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Backend FastAPI rodando em `http://localhost:8000`  
  _(veja o repositório [ProjetoSimuladorIoT](https://github.com/R4finh4sz/ProjetoSimuladorIoT))_

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/R4finh4sz/ProjetoSimuladorIoT-Front.git
cd ProjetoSimuladorIoT-Front

# Instale as dependências
npm install
```

---

## Executar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

> O frontend faz polling na API a cada **1 segundo**. Certifique-se de que o backend esteja rodando antes de abrir o front.

### Iniciando o backend (FastAPI)

```bash
py -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.

---

## Estrutura do projeto

```
src/
├── components/
│   ├── Header.jsx            # Barra superior: slider LDR, indicador de zona, modo
│   ├── Mesa.jsx              # Mesa arrastável com os dispositivos
│   ├── UserCursor.jsx        # Label de usuário arrastável
│   └── devices/
│       ├── ButtonDevice.jsx  # Botão vermelho (liga/desliga relay)
│       └── LEDArrayDevice.jsx # Array de 3 LEDs controlado por zona LDR
├── constants/
│   ├── api.js                # URL base, endpoints e intervalo de polling
│   ├── ldr.js                # Limiares LDR, zonas e mapeamento de LEDs
│   └── index.js              # Re-exportações
├── services/
│   └── apiService.js         # Funções fetch para todos os endpoints
├── App.jsx                   # Componente raiz com React Query
└── main.jsx                  # Entry point com QueryClientProvider
```

---

## Endpoints consumidos

| Método | Endpoint           | Descrição                          |
| ------ | ------------------ | ---------------------------------- |
| GET    | `/api/status`      | Estado completo do sistema         |
| POST   | `/api/simulate`    | Simula valor de luminosidade (LDR) |
| POST   | `/api/relay/set`   | Liga ou desliga o relay            |
| POST   | `/api/mode/toggle` | Alterna entre modo auto e manual   |
| POST   | `/api/mode/auto`   | Força modo automático              |

---

## Comportamento dos LEDs

| Zona LDR | Luminosidade | Cor do LED |
| -------- | ------------ | ---------- |
| Escuro   | < 30%        | Vermelho   |
| Médio    | 30% – 60%    | Amarelo    |
| Alto     | > 60%        | Verde      |

Os LEDs ficam **apagados** quando o relay está desligado.

---

## Tecnologias

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [@tanstack/react-query v5](https://tanstack.com/query/latest)
- [react-draggable](https://github.com/react-grid-layout/react-draggable)
