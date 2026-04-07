# 📚 Criador de Livros Digital

Um aplicativo web moderno e intuitivo, construído com React + TypeScript + Vite, que permite criar e visualizar livros digitais interativos com simulação de virada de páginas estilo livro real.

## ✨ Recursos

### 📖 Criação de Livros
- **Editor de Capa**: Customize a cor, imagem e informações do livro
- **Gerenciador de Páginas**: Crie, edite e delete páginas facilmente
- **Editor de Conteúdo**: Escreva o conteúdo de cada página com preview de caracteres
- **Imagens em Páginas**: Adicione imagens em qualquer página com posicionamento customizável (topo, centro, rodapé ou tela cheia)
- **Metadados do Livro**: Defina título, autor e descrição

### 👀 Visualização de Livro
- **Visualização de Duas Páginas**: Exibe o livro como se fosse aberto
- **Efeito de Perspectiva 3D**: Páginas com efeito tridimensional realista
- **Sistema de Navegação Intuitivo**: 
  - Botões de próxima/anterior página
  - Indicador de página
  - Slider para pular páginas rapidamente
  - Botão "Ir para Capa"
- **Estilos Livro Realista**: Formato de página, numeração, e layout profissional

### 💾 Persistência de Dados
- **Salvamento Automático**: Seu livro é salvo automaticamente no localStorage
- **Exportação**: Baixe seu livro em formato JSON
- **Exportação PDF**: Exporte sua história completa como PDF
- **Importação**: Carregue livros exportados anteriormente
- **Novo Livro**: Crie múltiplos livros (com aviso de não salvar)

### 🌓 Temas
- **Modo Claro**: Interface clara e limpa (padrão)
- **Modo Escuro**: Interface escura para reduzir fadiga ocular
- **Alternância Fácil**: Botão de tema na barra superior (🌙/☀️)
- **Persistência de Preferência**: Seu tema preferido é salvo

## 🎨 Design

O aplicativo usa um design com tema marrom/bege que simula o visual de livros físicos tradicionais:
- Paleta de cores: Marrom (#8B4513), Bege, Branco
- Interface intuitiva com dois modos: Edição e Visualização
- Design responsivo que funciona em desktop e tablets

## 🚀 Como Usar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

O servidor de desenvolvimento abre automaticamente em `http://localhost:5173/`

### Build para Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/               # Componentes React
│   ├── BookMetadataEditor.tsx   # Editor de capa e informações
│   ├── BookPageEditor.tsx       # Editor de páginas
│   └── BookViewer.tsx           # Visualizador de livro
├── types/                   # Tipos TypeScript
│   └── Book.ts              # Interfaces de dados
├── styles/                  # CSS dos componentes
│   ├── BookMetadataEditor.css
│   ├── BookPageEditor.css
│   └── BookViewer.css
├── App.tsx                 # Componente principal
├── App.css                 # Estilos globais
├── index.css               # Estilos base
└── main.tsx                # Entrada da aplicação
```

## 🔧 Tecnologias Utilizadas

- **React 18** - Framework UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool de alta performance
- **CSS 3** - Estilos com efeitos 3D
- **localStorage API** - Persistência de dados

## 📚 Como Criar um Livro

1. **Comece no modo Visualizar** para ver um livro de exemplo
2. **Alterne para o modo Editar** clicando em "✏️ Editar"
3. **Edite a Capa**:
   - Clique em "Editar Capa e Info"
   - Defina título, autor, descrição
   - Escolha uma cor de fundo ou uma imagem
   - Clique em "Salvar"
4. **Edite as Páginas**:
   - Selecione uma página da lista à esquerda
   - Escreva o conteúdo no textarea
   - Adicione novas páginas clicando em "+ Adicionar Página"
   - Delete páginas clicando em "Deletar Página"
5. **Volte para Visualizar** para ver seu livro em ação!

## 💡 Dicas

- O livro é salvo automaticamente no seu navegador
- Use a função **Exportar** para fazer backup do seu livro em JSON
- Use **Exportar PDF** para compartilhar ou imprimir seu livro
- Use **Importar** para restaurar um livro salvo
- Os efeitos 3D ficam mais visíveis em browsers modernos
- Teste em diferentes telas para ver o design responsivo
- Use o botão de tema (🌙/☀️) para alternar entre modo claro e escuro

## 🚀 Deployment no GitHub Pages

### Pré-requisitos
- Node.js instalado
- Conta no GitHub
- Git instalado

### Passos para Deploy

1. **Crie um repositório no GitHub**
   - Acesse [github.com/new](https://github.com/new)
   - Nomeie como "ProjectCreateYourbook"
   - Não inicialize com README (já temos um)

2. **Configure o Git e faça upload**
   ```bash
   cd ProjectCreateYourbook
   git add .
   git commit -m "Initial commit: Book creator app with dark mode and PDF export"
   git remote add origin https://github.com/SEU_USUARIO/ProjectCreateYourbook.git
   git branch -M main
   git push -u origin main
   ```

3. **Compare o Deploy**
   ```bash
   npm run deploy
   ```

4. **Habilite GitHub Pages (se necessário)**
   - Vá para Settings do repositório
   - Procure por "Pages" no menu lateral
   - Selecione "Deploy from a branch"
   - Escolha a branch "gh-pages" e diretório "/ (root)"

5. **Acesse sua aplicação**
   - URL: `https://SEU_USUARIO.github.io/ProjectCreateYourbook/`

## 🎯 Funcionalidades Implementadas

- ✅ Criação e edição de livros
- ✅ Visualização em duas páginas com efeito 3D
- ✅ Imagens em páginas com posicionamento customizável
- ✅ Exportação em PDF
- ✅ Modo claro e escuro
- ✅ Persistência de dados local
- ✅ Responsivo para desktop e tablets

## 📝 Licença

Este projeto é livre para uso pessoal e educacional.

---

**Desenvolvido com ❤️ usando React e Vite**
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
