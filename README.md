# 🎮 GameList: coleção de jogos com React Native + Expo

Aplicativo para cadastrar os jogos da sua coleção (título, plataforma, gênero e nota).
Ele usa a mesma estrutura do exemplo `rv_clientes25092026` visto em sala.

## Fluxo

1. Login com email e senha (API **ReqRes**). O token fica salvo no **AsyncStorage**.
2. Na tela inicial, o usuário escolhe entre **Meus jogos**, **Cadastrar jogo** e **Sair**.
3. **Meus jogos** tem busca por título, *pull to refresh*, **Editar** e **Excluir** (a exclusão pede confirmação em um modal).
4. O mesmo formulário serve para **cadastrar** e **editar**, com validação dos campos.

## Conceitos aplicados

| Conceito | Onde |
| --- | --- |
| Context API + AsyncStorage (login persistente) | `contexts/AuthContext.js` |
| Navegação condicional (Auth x App) | `navigation/RootNavigator.js` |
| Stack Navigator + passagem de parâmetros | `AppNavigator.js`, `GamesListScreen` → `GameFormScreen` |
| Axios com instâncias separadas | `services/api.js` |
| Serviços separados das telas | `services/authApi.js`, `services/gamesApi.js` |
| **CRUD completo** (GET, POST, **PUT**, DELETE) | `services/gamesApi.js` |
| `useState`, `useEffect`, `useMemo`, `useCallback` | telas |
| `useFocusEffect` (recarrega a lista ao voltar) | `GamesListScreen.js` |
| FlatList + RefreshControl + ActivityIndicator | `GamesListScreen.js` |
| Modal de confirmação | `GamesListScreen.js` |
| Componente reutilizável | `components/GameItem.js` |
| Validações | `utils/validators.js` |
| `StyleSheet.create` | `styles/common.js` e componentes |
| `async/await` + `try/catch/finally` | serviços e telas |

## Estrutura

```text
src/
├── components/GameItem.js
├── contexts/AuthContext.js
├── navigation/ (RootNavigator, AuthNavigator, AppNavigator)
├── screens/    (LoginScreen, HomeScreen, GamesListScreen, GameFormScreen)
├── services/   (api, authApi, gamesApi)
├── styles/common.js
└── utils/validators.js
```

## Configurando o MockAPI (obrigatório)

1. Acesse https://mockapi.io e entre (pode usar a conta do GitHub).
2. Clique em **New Project** e dê um nome, por exemplo `gamelist`.
3. Dentro do projeto, clique em **New Resource**, com o nome **`games`**.
4. No schema, deixe o `id` e adicione estes campos:
   - `title`: String
   - `platform`: String
   - `genre`: String
   - `rating`: Number
5. Clique em **Create**. Se quiser começar com a lista vazia, deixe o gerador de dados em 0.
6. Copie a URL do recurso. Ela tem este formato: `https://XXXXXXXX.mockapi.io/api/v1/games`.
7. Cole a URL em `src/services/api.js`, na constante `MOCKAPI_BASE`.

## Executando

```bash
npm install
npm start        # abre o QR code para o Expo Go
npm run web      # ou roda no navegador
```

Login de teste (ReqRes):

```text
Email: eve.holt@reqres.in
Senha: cityslicka
```

## Observação sobre a navegação

A partir do React Navigation 7, `navigate("Tela")` **empilha uma nova tela**, mesmo que ela já esteja na pilha.
Por isso, depois de salvar, o formulário usa `navigation.popTo("GamesList", { message })`.
Esse comando volta para a lista, se ela já estiver aberta, ou abre a lista, se o formulário foi aberto pela Home.
