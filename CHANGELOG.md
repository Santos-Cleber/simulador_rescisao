# 💼 Simulador de Rescisão Trabalhista

[![Versão](https://img.shields.io/badge/versão-2.0.0-blue.svg)](CHANGELOG.md)
[![Licença](https://img.shields.io/badge/licença-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-ativo-success.svg)]()

Aplicação web profissional para cálculo de verbas rescisórias trabalhistas, incluindo INSS, IRRF, FGTS, 13º salário, férias e aviso prévio.

![Screenshot](screenshot.png)

## 🎯 Funcionalidades

- ✅ Cálculo automático de todas as verbas rescisórias
- ✅ Cálculo progressivo de INSS (tabela 2025)
- ✅ Cálculo de IRRF com dedução por dependentes
- ✅ 13º salário proporcional (baseado no ano corrente)
- ✅ Férias proporcionais (baseado no período aquisitivo)
- ✅ Aviso prévio proporcional ao tempo de serviço
- ✅ Cálculo de FGTS e multa rescisória
- ✅ Exportação em PDF e CSV
- ✅ Tema claro/escuro com preferência salva
- ✅ Interface moderna e responsiva

## 📁 Estrutura do Projeto

```
simulador-rescisao/
│
├── index.html              # Página principal
│
├── css/
│   └── styles.css          # Estilos e temas
│
├── js/
│   ├── theme.js            # Gerenciamento de tema
│   ├── calculadora.js      # Funções de cálculo
│   ├── utils.js            # Funções auxiliares
│   └── app.js              # Lógica da aplicação
│
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
├── CHANGELOG.md            # Histórico de mudanças
├── CONTRIBUTING.md         # Guia de contribuição
└── INSTALL.md              # Guia de instalação
```

## 🚀 Como Usar

### 📦 Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/Santos-Cleber/simulador_rescisao.git

# Entre na pasta
cd simulador_rescisao

# Abra o index.html no navegador
```

Para instalação detalhada, veja [INSTALL.md](INSTALL.md)

### Uso Básico

1. **Preencha os campos do formulário:**
   - Salário mensal (aceita formato brasileiro: 3.000,00)
   - Data de admissão
   - Data de saída
   - Tipo de rescisão
   - Tipo de aviso prévio
   - Férias vencidas (se houver)
   - Dias trabalhados no mês
   - Número de dependentes

2. **Clique em "Calcular"**

3. **Veja o resultado detalhado:**
   - Saldo de salário
   - Aviso prévio
   - 13º salário proporcional
   - Férias proporcionais
   - FGTS e multa
   - Total a receber

4. **Exporte os resultados:**
   - PDF: Documento formatado
   - CSV: Planilha para Excel

## 🎨 Temas

- **🌙 Tema Escuro**: Design moderno com tons de preto e cyan
- **☀️ Tema Claro**: Gradiente roxo elegante com cards translúcidos

Clique no botão no canto superior direito para alternar entre os temas.

## 📊 Cálculos Implementados

### INSS (2025)
- 7,5% até R$ 1.518,00
- 9% de R$ 1.518,01 até R$ 2.793,88
- 12% de R$ 2.793,89 até R$ 4.190,93
- 14% de R$ 4.190,94 até R$ 8.157,41
- Teto: R$ 951,63

### IRRF (2025)
- Isento até R$ 2.259,20
- 7,5% até R$ 2.826,65 (dedução: R$ 169,44)
- 15% até R$ 3.751,05 (dedução: R$ 381,44)
- 22,5% até R$ 4.664,68 (dedução: R$ 662,77)
- 27,5% acima de R$ 4.664,68 (dedução: R$ 896,00)
- Dedução por dependente: R$ 189,59

### 13º Salário
Calculado proporcionalmente aos meses trabalhados **no ano corrente** da rescisão.

### Férias Proporcionais
Calculadas com base no **período aquisitivo atual**, não no tempo total de empresa.

### Aviso Prévio
- Base: 30 dias
- Adicional: 3 dias por ano trabalhado
- Máximo: 90 dias

### FGTS
- **Sem justa causa**: 100% do saldo + 40% de multa
- **Acordo**: 80% do saldo + 20% de multa
- **Pedido de demissão**: Sem saque

## 💻 Tecnologias

- HTML5
- CSS3 (Custom Properties, Flexbox, Gradients)
- JavaScript ES6+ (Modules, Arrow Functions, Template Literals)
- jsPDF (geração de PDF)

## 🔧 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexão com internet (para fontes do Google Fonts e jsPDF CDN)

## 📝 Observações

- Os cálculos são baseados na legislação trabalhista brasileira vigente em 2025
- Os valores são estimativas e podem variar conforme convenções coletivas
- Sempre consulte um profissional de RH ou contador para validação final

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📜 Histórico

Veja [CHANGELOG.md](CHANGELOG.md) para lista de mudanças.

## 👨‍💻 Autor

**Cleber.dev**

- GitHub: [@seu-usuario](https://github.com/santos-cleber)
- Website: [cleber.dev]( https://santos-cleber.github.io/simulador_rescisao/)

## 📄 Licença

Este projeto está sob a licença MIT - veja [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- jsPDF pela biblioteca de geração de PDF
- Google Fonts pela fonte Poppins
- Comunidade open source

## 📞 Suporte

- 📧 Email: contato@cleber.dev
- 🐛 Issues: [GitHub Issues](https://github.com/santos-cleber/simulador_rescisao/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/santos-cleber/simulador_rescisao/discussions)

---

**⭐ Se este projeto foi útil, deixe uma estrela no GitHub!**

**Versão:** 2.0.0  
**Última atualização:** Outubro 2025  
**Status:** ✅ Ativo e Mantido