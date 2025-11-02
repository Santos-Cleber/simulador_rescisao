# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Simulador de Rescisão! 

## 📋 Como Contribuir

### 1. Reportar Bugs

Se você encontrar um bug, por favor abra uma issue incluindo:

- **Descrição clara** do problema
- **Passos para reproduzir** o erro
- **Comportamento esperado** vs comportamento atual
- **Screenshots** (se aplicável)
- **Navegador e versão** utilizada
- **Dados de teste** que causaram o erro

### 2. Sugerir Melhorias

Tem uma ideia para melhorar o projeto? Ótimo!

- Abra uma issue com a tag `enhancement`
- Descreva sua sugestão em detalhes
- Explique por que seria útil
- Se possível, adicione exemplos de uso

### 3. Contribuir com Código

#### Preparando o Ambiente

```bash
# Clone o repositório
git clone https://github.com/santos-cleber/simulador_rescisao.git

# Entre na pasta
cd simulador-rescisao

# Abra no seu editor favorito
code .
```

#### Padrões de Código

**JavaScript:**
- Use ES6+ (arrow functions, const/let, etc)
- Escreva código modular com IIFE
- Adicione JSDoc nos comentários
- Nomeie variáveis de forma clara
- Use camelCase para variáveis e funções

**CSS:**
- Use variáveis CSS (custom properties)
- Organize por seções com comentários
- Mobile-first approach
- Prefira flexbox/grid para layouts

**HTML:**
- Semântica correta
- Atributos ARIA quando necessário
- Acessibilidade em mente

#### Processo de Pull Request

1. **Fork** o projeto
2. **Crie um branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para o branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

#### Mensagens de Commit

Use o padrão:

```
tipo: descrição curta

Descrição mais detalhada (opcional)

- Detalhe 1
- Detalhe 2
```

**Tipos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de código)
- `refactor`: Refatoração
- `test`: Adição de testes
- `chore`: Tarefas de manutenção

**Exemplos:**
```
feat: adiciona validação de CPF

fix: corrige cálculo de férias proporcionais

docs: atualiza README com novos exemplos
```

### 4. Melhorar a Documentação

Documentação é tão importante quanto código!

- Corrija erros de português
- Adicione exemplos
- Melhore explicações
- Adicione diagramas (se aplicável)

## 🧪 Testes

Antes de submeter um PR, teste manualmente:

- ✅ Formulário com dados válidos
- ✅ Formulário com dados inválidos
- ✅ Diferentes tipos de rescisão
- ✅ Exportação PDF e CSV
- ✅ Tema claro e escuro
- ✅ Responsividade mobile
- ✅ Diferentes navegadores

## 📝 Checklist do Pull Request

- [ ] O código segue os padrões do projeto
- [ ] Testei todas as funcionalidades
- [ ] Adicionei comentários onde necessário
- [ ] Atualizei a documentação (se aplicável)
- [ ] Não quebrei funcionalidades existentes
- [ ] Testei em diferentes navegadores
- [ ] Testei em mobile

## 🎯 Áreas que Precisam de Ajuda

- [ ] Testes automatizados
- [ ] Acessibilidade (WCAG)
- [ ] Performance
- [ ] Suporte a PWA
- [ ] Internacionalização (i18n)
- [ ] Temas adicionais
- [ ] Impressão otimizada

## 💡 Ideias para Futuras Features

- Histórico de cálculos
- Comparação entre tipos de rescisão
- Calculadora de tempo de aviso prévio
- Salvar cálculos localmente
- Modo offline (PWA)
- Gráficos visuais dos valores
- Calculadora de férias separada

## 📞 Dúvidas?

Se tiver alguma dúvida, sinta-se à vontade para:

- Abrir uma issue
- Comentar em PRs existentes
- Entrar em contato

---

**Obrigado por contribuir!** 🚀