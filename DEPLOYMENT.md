# 🚀 Guia de Deployment - GitHub Pages

## Opção 1: Deployment Automático com GitHub Actions (Recomendado)

### 1. Crie um novo repositório no GitHub
- Acesse [github.com/new](https://github.com/new)
- Nome: `ProjectCreateYourbook`
- Deixe como público (para GitHub Pages funcionar sem plano pago)

### 2. Envie o código para GitHub
```bash
cd ProjectCreateYourbook
git remote add origin https://github.com/SEU_USUARIO/ProjectCreateYourbook.git
git branch -M main
git push -u origin main
```
*Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub*

### 3. Configure GitHub Pages
- Vá para a aba **Settings** do repositório
- Procure por **Pages** no menu lateral esquerdo
- Em "Source", selecione "Deploy from a branch"
- Escolha a branch `gh-pages`
- Deixe o diretório como `/ (root)`
- Clique em **Save**

### 4. Faça o Deploy
```bash
npm run deploy
```

Isso irá:
1. Fazer o build do projeto
2. Criar/atualizar a branch `gh-pages`
3. Enviar os arquivos buildados para o GitHub

### 5. Aguarde alguns minutos e acesse
Sua aplicação estará disponível em:
```
https://SEU_USUARIO.github.io/ProjectCreateYourbook/
```

---

## Opção 2: Deploy Manual

Se preferir fazer o deployment de forma manual:

```bash
# 1. Faça o build
npm run build

# 2. Crie a branch gh-pages se não existir
git checkout --orphan gh-pages
git rm -rf .

# 3. Copie os arquivos buildados
cp -r dist/* .
echo "# Build" > README.md

# 4. Commit e push
git add .
git commit -m "Deploy to GitHub Pages"
git push -u origin gh-pages
```

---

## Troubleshooting

### Não vejo a aplicação após fazer deploy
- Verifique se a branch `gh-pages` existe no repositório
- Aguarde 5-10 minutos para o GitHub Pages processar
- Verifique as configurações do repositório em Settings > Pages

### Recursos não carregam corretamente
- Certifique-se de que `base: '/ProjectCreateYourbook/'` está em `vite.config.ts`
- Limpe o cache do navegador (Ctrl+Shift+Delete)

### Erro de permissão ao fazer push
- Gere um token pessoal no GitHub: https://github.com/settings/tokens
- Use o token como password ao fazer git push

---

## 📝 Notas

- Cada vez que você fizer `npm run deploy`, a aplicação será atualizada automaticamente
- Os dados salvos no localStorage são locais - cada navegador tem seu próprio armazenamento
- PDFs exportados são salvos no computador do usuário

---

**Aproveite seu Criador de Livros Digital! 📚✨**
