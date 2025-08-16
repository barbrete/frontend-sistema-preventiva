# FrontEnd — Sistema de Preventivas

>Este sistema foi desenvolvido para resolver o problema da gestão de manutenções preventivas de CTO's e POP's para empresas de fibra óptica. É uma plataforma centralizada e intuitiva para que os técnicos e supervisores de campo possam criar em tempo real e gerenciar as preventivas de forma eficiente.

### 👥 Funcionalidades por papel
- **Técnico**  
  - Criar conta e fazer login  
  - CRUD de suas preventivas
  - Acompanhar histórico de preventivas
  - Acessar página de perfil  

- **Administrador**  
  - CRUD completo de preventivas e usuários
  - Acompanhar preventivas dos técnicos
  - Acessar página de perfil
  - Manter controle sobre usuários e registros

---

## 📌 Índice

* [📂 Estrutura](#-estrutura)
* [🚀 Tecnologias](#-tecnologias)
* [📦 Instalação](#-instalação)
* [▶️ Execução](#️-execução)
* [📸 Screenshots](#-screenshots)
* [📡 Integração com o Backend](#-integração-com-o-backend)
* [📄 Licença](#-licença)

---

## 📂 Estrutura

```
frontend-sistema-preventiva/
├── public/                        # Arquivos estáticos (imagens, favicon, etc)
│   
├── src/
│   ├── app/                       # Páginas do Next.js (rotas)
│   │   ├── criar_preventiva/      # Página de criação de preventiva
│   │   ├── mostrar_preventivas/   # Página de listagem de preventivas
│   │   ├── perfil/[id]            # Página de perfil dinâmico
│   │   ├── preventiva/[id]        # Página de detalhes da preventiva
│   │   ├── cadastro/              # Página de cadastro de usuário
│   │   ├── acesso_negado/         # Página de acesso negado
│   │   ├── not-found.tsx          # Página 404 personalizada
│   │   ├── layout.tsx             # Layout global
│   │   └── page.tsx               # Página inicial
│   │
│   ├── components/                # Componentes reutilizáveis
│   │   
│   ├── hooks/                     # Custom React hooks
│   │   
│   ├── services/                  # Serviços de API (axios, autenticação, etc)
│   │   
│   ├── utils/                     # Funções utilitárias e tipos
│   │   
│   └── styles/           
```

---

## 🚀 Tecnologias

| Pacote                | Função                                     |
|-----------------------|------------------------------------------------------------|
| **next**              | Framework React para SSR/SSG e rotas baseadas em arquivos  |
| **react**             | Biblioteca principal para construção de interfaces         |
| **react-dom**         | Renderização do React no DOM                               |
| **typescript**        | Superset do JavaScript com tipagem estática                |
| **@mui/material**     | Componentes de UI prontos e acessíveis (Material UI)       |
| **@emotion/react**    | Biblioteca de CSS-in-JS usada pelo Material UI             |
| **@emotion/styled**   | Estilização de componentes com CSS-in-JS                   |
| **axios**             | Cliente HTTP para requisições à API                        |
| **js-cookie**         | Manipulação de cookies (autenticação, preferências, etc)   |
| **lucide-react**      | Ícones SVG modernos e personalizáveis                      |
| **framer-motion**     | Animações e transições para React                          |
| **html2canvas**       | Captura de screenshots do DOM em canvas                    |
| **pdf-lib**           | Criação e manipulação de arquivos PDF no frontend          |
| **react-day-picker**  | Componente de seleção de datas flexível e acessível        |
| **recharts**          | Gráficos e visualização de dados em React                  |
| **react-is**          | Utilitários para validação de elementos React              |
| **@types/react**      | TypeScript para React                                      |
| **@types/react-dom**  | TypeScript para ReactDOM                                   |


---

## 📦 Instalação

```bash
git clone https://github.com/barbrete/frontend-sistema-preventiva.git
cd .\frontend-sistema-preventiva\
npm i
```

---

## ▶️ Execução

```bash
npm run dev
```
---

## 📸 Screenshots

<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/27f8737f-a057-4069-9ece-88de63998ea2" />
<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/778c9075-b76c-496c-8868-a5cf2ded337f" />
<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/67ac1e40-64e2-44b1-8975-dc4eb1859c19" />
<img width="550" height="878" alt="image" src="https://github.com/user-attachments/assets/d4cd1b77-f327-4ef6-a84c-bd105c0385bb" />


---

## 📡 Integração com o Backend

Este frontend consome a API disponível no [Repositório Backend](https://github.com/barbrete/backend-sistema-preventiva)).

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---
