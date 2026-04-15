# News App Expo

Um aplicativo simples e intuitivo de notícias desenvolvido com [React Native](https://reactnative.dev/) e [Expo](https://expo.dev/). O app consome a API pública do [FIRST.org](https://api.first.org/data/v1/news) para exibir uma lista das últimas notícias e comunicados.

## 🚀 Funcionalidades

- Lista as últimas notícias recuperadas da API em tempo real.
- Apresenta o título da notícia, data de publicação e imagem de forma limpa.
- Interface simples, construída com `ScrollView` para facilitar o entendimento de iniciantes na tecnologia.
- Integração de navegação externa: ao tocar em uma notícia, o navegador padrão do dispositivo é aberto automaticamente redirecionando para a fonte original (através da API `Linking`).
- Tratamento moderno e amigável de estados com componentes nativos (Carregamento / Loading e Erro).

## 🛠 Tecnologias Utilizadas

- **React Native** (v0.81.5)
- **Expo** (SDK 54)
- **TypeScript** - para garantir segurança e qualidade no estilo de código.

## ⚙️ Pré-requisitos

Para rodar o projeto localmente, certifique-se de possuir:
- [Node.js](https://nodejs.org/) (versão LTS recomendada).
- O app **Expo Go** instalado no seu dispositivo móvel (Android ou iOS) se desejar rodar diretamente no próprio celular.

## 🏃 Como Rodar o Projeto

1. Navegue até o diretório do projeto pelo terminal:
   ```bash
   cd news-app-expo
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do Expo:
   ```bash
   npx expo start
   ```

4. Para abrir e testar o app:
   - **Android / iOS:** Escaneie o QR Code que aparece na janela do terminal com o aplicativo Expo Go do seu celular.
   - **No Navegador (Web):** Pressione a tecla `w` no terminal em execução.

## 📂 Estrutura do Projeto

- `App.tsx`: Ponto de entrada primário, que hospeda os estados da aplicação.
- `News.tsx`: Componente focado apenas em renderizar os cartões individuais de cada notícia separadamente.
- `services/api-handler.ts`: Módulo focado especificamente em realizar a chamada externa HTTP (Fetch) organizando os retornos e tipagens das notícias.

## Deploy com EAS

O Expo Application Services (EAS) é um ecossistema de ferramentas em nuvem criado para facilitar o ciclo de vida de apps Expo e React Native, cuidando de processos complexos como a compilação de binários nativos e a submissão para as lojas. O perfil **development** é usado para criar builds que rodam com ferramentas de depuração (Expo Go ou Development Client); o perfil **preview** gera versões para testes internos ou compartilhamento (como APKs instaláveis diretamente no Android) sem passar pela loja oficial; já o perfil **production** é otimizado para o usuário final, com configurações prontas para submissão à App Store ou Play Store.

Para executar um build de preview para Android, utilize o comando:
```bash
eas build --profile preview --platform android
```

---

> Projeto desenvolvido visando a facilidade e aprendizado para desenvolvedores que estão iniciando os estudos com React Native e Expo.
