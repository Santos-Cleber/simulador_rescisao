/**
   * Exporta resultado para PDF
   */
  function exportarPDF() {
    if (!dadosCalculados) {
      Utils.showAlert('Faça o cálculo primeiro!', 'warning');
      return;
    }

    if (!Utils.isJsPDFAvailable()) {
      Utils.showAlert('Biblioteca PDF não disponível. Verifique sua conexão.', 'error');
      return;
    }

    Utils.showLoading('Gerando PDF...');

    setTimeout(() => {
      try {
        gerarPDF();
        Utils.hideLoading();
        Utils.showAlert('PDF exportado com sucesso!', 'success', 3000);
      } catch (error/**
 * APLICAÇÃO PRINCIPAL
 * Gerencia o formulário, cálculos e exportações
 */

(function() {
  'use strict';

  // Estado da aplicação
  let dadosCalculados = null;

  // Elementos DOM
  const form = document.getElementById('rescisao-form');
  const btnReset = document.getElementById('btnReset');
  const btnExportPDF = document.getElementById('btnExportPDF');
  const btnExportCSV = document.getElementById('btnExportCSV');
  const resultado = document.getElementById('resultado');

  /**
   * Processa o formulário e calcula a rescisão
   */
  function calcularRescisao(e) {
    e.preventDefault();

    // Limpa alertas anteriores
    Utils.clearAlerts();

    // Mostra loading
    Utils.showLoading('Calculando...');

    // Simula processamento para UX melhor
    setTimeout(() => {
      processarCalculo();
      Utils.hideLoading();
    }, 500);
  }

  /**
   * Processa o cálculo
   */
  function processarCalculo() {
    // Coleta de dados do formulário
    const salarioInput = document.getElementById('salario').value.replace(/\./g, '').replace(',', '.');
    const salario = parseFloat(salarioInput);
    const admissao = new Date(document.getElementById('admissao').value + 'T00:00:00');
    const saida = new Date(document.getElementById('saida').value + 'T00:00:00');
    const diasTrabalhados = parseInt(document.getElementById('diasTrabalhados').value);
    const tipo = document.getElementById('tipo').value;
    const avisoPrevio = document.getElementById('avisoPrevio').value;
    const feriasVencidasQtd = parseInt(document.getElementById('feriasVencidas').value);
    const dependentes = parseInt(document.getElementById('dependentes').value);

    // Validações
    if (!validarDados(salario, admissao, saida, diasTrabalhados, tipo)) {
      return;
    }

    // Cálculos
    const mesesTrabalhados = Calculadora.calcularMesesTrabalhados(admissao, saida, true);
    
    if (feriasVencidasQtd > 0 && mesesTrabalhados < 12) {
      Utils.showAlert('O colaborador precisa ter pelo menos 1 ano de empresa para ter férias vencidas.', 'warning');
      return;
    }

    const calculos = realizarCalculos({
      salario,
      admissao,
      saida,
      diasTrabalhados,
      tipo,
      avisoPrevio,
      feriasVencidasQtd,
      dependentes,
      mesesTrabalhados
    });

    // Armazena resultados
    dadosCalculados = calculos;

    // Exibe resultado
    exibirResultado(calculos);

    // Habilita botões de exportação
    btnExportPDF.disabled = false;
    btnExportCSV.disabled = false;

    // Mostra mensagem de sucesso
    Utils.showAlert('Cálculo realizado com sucesso!', 'success', 3000);

    // Scroll suave até o resultado
    resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Valida os dados do formulário
   */
  function validarDados(salario, admissao, saida, diasTrabalhados, tipo) {
    let isValid = true;

    if (isNaN(salario) || salario <= 0) {
      Utils.showAlert('O salário deve ser maior que zero.', 'error');
      Utils.validateField(document.getElementById('salario'), 'Informe um salário válido');
      isValid = false;
    }

    if (!tipo) {
      Utils.showAlert('Selecione o tipo de rescisão.', 'error');
      isValid = false;
    }

    if (admissao >= saida) {
      Utils.showAlert('A data de admissão deve ser anterior à data de saída.', 'error');
      Utils.validateField(document.getElementById('saida'), 'Data inválida');
      isValid = false;
    }

    if (diasTrabalhados < 0 || diasTrabalhados > 31) {
      Utils.showAlert('Os dias trabalhados devem estar entre 0 e 31.', 'error');
      Utils.validateField(document.getElementById('diasTrabalhados'), 'Valor inválido');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Realiza todos os cálculos da rescisão
   */
  function realizarCalculos(dados) {
    const { salario, admissao, saida, diasTrabalhados, tipo, avisoPrevio, 
            feriasVencidasQtd, dependentes, mesesTrabalhados } = dados;

    // Aviso prévio
    let valorAvisoPrevio = 0;
    let diasAviso = 0;
    
    if ((tipo === 'semJustaCausa' || tipo === 'acordo') && avisoPrevio === 'indenizado') {
      diasAviso = Calculadora.calcularDiasAvisoPrevio(mesesTrabalhados);
      valorAvisoPrevio = (salario / 30) * diasAviso;
    }

    // 13º proporcional (apenas meses do ano corrente)
    const anoSaida = saida.getFullYear();
    const inicioAnoCorrente = new Date(anoSaida, 0, 1);
    const dataInicioCalculo = admissao > inicioAnoCorrente ? admissao : inicioAnoCorrente;
    const mesesAnoCorrente = Calculadora.calcularMesesTrabalhados(dataInicioCalculo, saida, true);
    const decimoTerceiro = (salario / 12) * mesesAnoCorrente;
    
    // Férias proporcionais (baseado no período aquisitivo atual)
    const mesesPeriodoAquisitivo = Calculadora.calcularPeriodoAquisitivoAtual(admissao, saida);
    const feriasProporcionais = (salario / 12) * mesesPeriodoAquisitivo;
    const adicionalFeriasProporcionais = feriasProporcionais / 3;
    
    // Saldo de salário
    const saldoSalario = (salario / 30) * diasTrabalhados;

    // Férias vencidas
    const feriasVencidas = salario * feriasVencidasQtd;
    const adicionalFeriasVencidas = feriasVencidas / 3;

    // Descontos
    const baseINSSSalarioAviso = saldoSalario + valorAvisoPrevio;
    const inssSalarioAviso = Calculadora.calcularINSS(baseINSSSalarioAviso);
    const irrfSalarioAviso = Calculadora.calcularIRRF(baseINSSSalarioAviso - inssSalarioAviso, dependentes);
    
    const inss13 = Calculadora.calcularINSS(decimoTerceiro);
    const irrf13 = Calculadora.calcularIRRF(decimoTerceiro - inss13, dependentes);

    // Valores líquidos
    const saldoSalarioAvisoLiquido = baseINSSSalarioAviso - inssSalarioAviso - irrfSalarioAviso;
    const decimoTerceiroLiquido = decimoTerceiro - inss13 - irrf13;

    // FGTS
    const saldoFgts = salario * 0.08 * mesesTrabalhados;
    let multaFgts = 0;
    let saqueFgts = 0;

    if (tipo === 'semJustaCausa') {
      multaFgts = saldoFgts * 0.4;
      saqueFgts = saldoFgts;
    } else if (tipo === 'acordo') {
      multaFgts = saldoFgts * 0.2;
      saqueFgts = saldoFgts * 0.8;
    }

    // Totais
    const totalDireto = decimoTerceiroLiquido + feriasProporcionais + 
                       adicionalFeriasProporcionais + feriasVencidas + 
                       adicionalFeriasVencidas + saldoSalarioAvisoLiquido;
    const totalCaixa = saqueFgts + multaFgts;
    const totalGeral = totalDireto + totalCaixa;

    return {
      mesesTrabalhados,
      mesesAnoCorrente,
      mesesPeriodoAquisitivo,
      anoSaida,
      diasAviso,
      valorAvisoPrevio,
      decimoTerceiro,
      inss13,
      irrf13,
      decimoTerceiroLiquido,
      feriasProporcionais,
      adicionalFeriasProporcionais,
      feriasVencidas,
      feriasVencidasQtd,
      adicionalFeriasVencidas,
      saldoSalario,
      diasTrabalhados,
      inssSalarioAviso,
      irrfSalarioAviso,
      saldoSalarioAvisoLiquido,
      saldoFgts,
      saqueFgts,
      multaFgts,
      totalDireto,
      totalCaixa,
      totalGeral,
      tipo,
      avisoPrevio
    };
  }

  /**
   * Exibe o resultado na tela
   */
  function exibirResultado(d) {
    resultado.style.display = 'block';
    resultado.innerHTML = '<p><strong>Tempo de empresa:</strong> ' + d.mesesTrabalhados + ' meses</p><hr>' +
      '<p><strong>Saldo de salário (' + d.diasTrabalhados + ' dias):</strong> R$ ' + Calculadora.formatBR(d.saldoSalario) + '</p>' +
      (d.valorAvisoPrevio > 0 ? '<p><strong>Aviso prévio indenizado (' + d.diasAviso + ' dias):</strong> R$ ' + Calculadora.formatBR(d.valorAvisoPrevio) + '</p>' : '') +
      '<p><strong>Descontos INSS + IRRF:</strong> -R$ ' + Calculadora.formatBR(d.inssSalarioAviso + d.irrfSalarioAviso) + '</p>' +
      '<p><strong>Saldo + Aviso líquido:</strong> R$ ' + Calculadora.formatBR(d.saldoSalarioAvisoLiquido) + '</p><hr>' +
      '<p><strong>13º proporcional (' + d.mesesAnoCorrente + ' meses de ' + d.anoSaida + '):</strong> R$ ' + Calculadora.formatBR(d.decimoTerceiro) + '</p>' +
      '<p><strong>Descontos INSS + IRRF sobre 13º:</strong> -R$ ' + Calculadora.formatBR(d.inss13 + d.irrf13) + '</p>' +
      '<p><strong>13º líquido:</strong> R$ ' + Calculadora.formatBR(d.decimoTerceiroLiquido) + '</p><hr>' +
      '<p><strong>Férias proporcionais (' + d.mesesPeriodoAquisitivo + ' meses do período aquisitivo):</strong> R$ ' + Calculadora.formatBR(d.feriasProporcionais) + '</p>' +
      '<p><strong>Adicional de férias proporcionais (1/3):</strong> R$ ' + Calculadora.formatBR(d.adicionalFeriasProporcionais) + '</p>' +
      (d.feriasVencidas > 0 ? '<p><strong>Férias vencidas (' + d.feriasVencidasQtd + ' período' + (d.feriasVencidasQtd > 1 ? 's' : '') + '):</strong> R$ ' + Calculadora.formatBR(d.feriasVencidas) + '</p>' +
      '<p><strong>Adicional de férias vencidas (1/3):</strong> R$ ' + Calculadora.formatBR(d.adicionalFeriasVencidas) + '</p>' : '') +
      '<hr><p><strong>Total direto ao trabalhador:</strong> <span style="color:#7cffb2; font-size:1.2em">R$ ' + Calculadora.formatBR(d.totalDireto) + '</span></p>' +
      (d.totalCaixa > 0 ? '<hr><p><strong>Saldo do FGTS disponível para saque:</strong> R$ ' + Calculadora.formatBR(d.saqueFgts) + '</p>' +
      '<p><strong>Multa sobre o FGTS:</strong> R$ ' + Calculadora.formatBR(d.multaFgts) + '</p>' +
      '<p><strong>Total via Caixa:</strong> <span style="color:#7fb3ff; font-size:1.2em">R$ ' + Calculadora.formatBR(d.totalCaixa) + '</span></p>' : '') +
      '<hr><p><strong>ESTIMATIVA TOTAL:</strong> <span style="color:#ffd27a; font-size:1.4em; font-weight:700">R$ ' + Calculadora.formatBR(d.totalGeral) + '</span></p>';
  }

  /**
   * Limpa o formulário e resultado
   */
  function limparFormulario() {
    form.reset();
    resultado.style.display = 'none';
    resultado.innerHTML = '';
    dadosCalculados = null;
    btnExportPDF.disabled = true;
    btnExportCSV.disabled = true;
  }

  /**
   * Exporta resultado para PDF
   */
  function exportarPDF() {
    if (!dadosCalculados) {
      Utils.showAlert('Faça o cálculo primeiro!', 'warning');
      return;
    }

    if (!Utils.isJsPDFAvailable()) {
      Utils.showAlert('Biblioteca PDF não disponível. Verifique sua conexão.', 'error');
      return;
    }

    Utils.showLoading('Gerando PDF...');

    setTimeout(() => {
      try {
        gerarPDF();
        Utils.hideLoading();
        Utils.showAlert('PDF exportado com sucesso!', 'success', 3000);
      } catch (error) {
        Utils.hideLoading();
        Utils.showAlert('Erro ao gerar PDF. Tente novamente.', 'error');
        console.error('Erro ao gerar PDF:', error);
      }
    }, 300);
  }

  /**
   * Gera o PDF
   */
  function gerarPDF() {
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const d = dadosCalculados;
    
    let y = 20;
    const lineHeight = 7;
    
    doc.setFontSize(16);
    doc.text('SIMULACAO DE RESCISAO', 105, y, { align: 'center' });
    y += lineHeight * 2;
    
    doc.setFontSize(10);
    doc.text('Tempo de empresa: ' + d.mesesTrabalhados + ' meses', 20, y);
    y += lineHeight * 1.5;
    
    doc.text('Saldo de salario (' + d.diasTrabalhados + ' dias): R$ ' + Calculadora.formatBR(d.saldoSalario), 20, y);
    y += lineHeight;
    
    if (d.valorAvisoPrevio > 0) {
      doc.text('Aviso previo indenizado (' + d.diasAviso + ' dias): R$ ' + Calculadora.formatBR(d.valorAvisoPrevio), 20, y);
      y += lineHeight;
    }
    
    doc.text('Descontos INSS + IRRF: -R$ ' + Calculadora.formatBR(d.inssSalarioAviso + d.irrfSalarioAviso), 20, y);
    y += lineHeight;
    doc.text('Saldo + Aviso liquido: R$ ' + Calculadora.formatBR(d.saldoSalarioAvisoLiquido), 20, y);
    y += lineHeight * 1.5;
    
    doc.text('13o proporcional (' + d.mesesAnoCorrente + ' meses de ' + d.anoSaida + '): R$ ' + Calculadora.formatBR(d.decimoTerceiro), 20, y);
    y += lineHeight;
    doc.text('Descontos sobre 13o: -R$ ' + Calculadora.formatBR(d.inss13 + d.irrf13), 20, y);
    y += lineHeight;
    doc.text('13o liquido: R$ ' + Calculadora.formatBR(d.decimoTerceiroLiquido), 20, y);
    y += lineHeight * 1.5;
    
    doc.text('Ferias proporcionais (' + d.mesesPeriodoAquisitivo + ' meses): R$ ' + Calculadora.formatBR(d.feriasProporcionais), 20, y);
    y += lineHeight;
    doc.text('Adicional 1/3 ferias proporcionais: R$ ' + Calculadora.formatBR(d.adicionalFeriasProporcionais), 20, y);
    y += lineHeight;
    
    if (d.feriasVencidas > 0) {
      doc.text('Ferias vencidas: R$ ' + Calculadora.formatBR(d.feriasVencidas), 20, y);
      y += lineHeight;
      doc.text('Adicional 1/3 ferias vencidas: R$ ' + Calculadora.formatBR(d.adicionalFeriasVencidas), 20, y);
      y += lineHeight;
    }
    
    y += lineHeight;
    doc.setFontSize(12);
    doc.text('TOTAL DIRETO: R$ ' + Calculadora.formatBR(d.totalDireto), 20, y);
    y += lineHeight * 1.5;
    
    if (d.totalCaixa > 0) {
      doc.setFontSize(10);
      doc.text('Saldo FGTS disponivel: R$ ' + Calculadora.formatBR(d.saqueFgts), 20, y);
      y += lineHeight;
      doc.text('Multa FGTS: R$ ' + Calculadora.formatBR(d.multaFgts), 20, y);
      y += lineHeight;
      doc.setFontSize(12);
      doc.text('TOTAL VIA CAIXA: R$ ' + Calculadora.formatBR(d.totalCaixa), 20, y);
      y += lineHeight * 2;
    }
    
    doc.setFontSize(14);
    doc.text('TOTAL GERAL: R$ ' + Calculadora.formatBR(d.totalGeral), 20, y);
    
    doc.save('rescisao_simulacao.pdf');
  }

  /**
   * Exporta resultado para CSV
   */
  function exportarCSV() {
    if (!dadosCalculados) {
      Utils.showAlert('Faça o cálculo primeiro!', 'warning');
      return;
    }

    Utils.showLoading('Gerando CSV...');

    setTimeout(() => {
      try {
        gerarCSV();
        Utils.hideLoading();
        Utils.showAlert('CSV exportado com sucesso!', 'success', 3000);
      } catch (error) {
        Utils.hideLoading();
        Utils.showAlert('Erro ao gerar CSV. Tente novamente.', 'error');
        console.error('Erro ao gerar CSV:', error);
      }
    }, 300);
  }

  /**
   * Gera o CSV
   */
  function gerarCSV() {
    
    const d = dadosCalculados;
    const linhas = [
      ['Item', 'Valor'],
      ['Meses trabalhados', d.mesesTrabalhados],
      ['Saldo de salario', Calculadora.formatBR(d.saldoSalario)],
      ['Aviso previo indenizado', Calculadora.formatBR(d.valorAvisoPrevio)],
      ['Descontos INSS + IRRF', Calculadora.formatBR(d.inssSalarioAviso + d.irrfSalarioAviso)],
      ['Saldo + Aviso liquido', Calculadora.formatBR(d.saldoSalarioAvisoLiquido)],
      ['13o proporcional bruto', Calculadora.formatBR(d.decimoTerceiro)],
      ['Descontos sobre 13o', Calculadora.formatBR(d.inss13 + d.irrf13)],
      ['13o liquido', Calculadora.formatBR(d.decimoTerceiroLiquido)],
      ['Ferias proporcionais', Calculadora.formatBR(d.feriasProporcionais)],
      ['Adicional ferias proporcionais', Calculadora.formatBR(d.adicionalFeriasProporcionais)],
      ['Ferias vencidas', Calculadora.formatBR(d.feriasVencidas)],
      ['Adicional ferias vencidas', Calculadora.formatBR(d.adicionalFeriasVencidas)],
      ['TOTAL DIRETO', Calculadora.formatBR(d.totalDireto)],
      ['Saldo FGTS', Calculadora.formatBR(d.saqueFgts)],
      ['Multa FGTS', Calculadora.formatBR(d.multaFgts)],
      ['TOTAL VIA CAIXA', Calculadora.formatBR(d.totalCaixa)],
      ['TOTAL GERAL', Calculadora.formatBR(d.totalGeral)]
    ];
    
    const csvContent = linhas.map(linha => linha.join(';')).join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rescisao_simulacao.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Event Listeners
  form.addEventListener('submit', calcularRescisao);
  btnReset.addEventListener('click', limparFormulario);
  btnExportPDF.addEventListener('click', exportarPDF);
  btnExportCSV.addEventListener('click', exportarCSV);

  // Validação em tempo real
  const salarioInput = document.getElementById('salario');
  const admissaoInput = document.getElementById('admissao');
  const saidaInput = document.getElementById('saida');
  const diasInput = document.getElementById('diasTrabalhados');

  // Validação do salário com debounce
  salarioInput.addEventListener('input', Utils.debounce(() => {
    const value = parseFloat(salarioInput.value.replace(/\./g, '').replace(',', '.'));
    if (salarioInput.value && (isNaN(value) || value <= 0)) {
      Utils.validateField(salarioInput, 'Informe um salário válido');
    } else if (salarioInput.value) {
      Utils.validateField(salarioInput);
    }
  }));

  // Validação das datas
  saidaInput.addEventListener('change', () => {
    const admissao = new Date(admissaoInput.value);
    const saida = new Date(saidaInput.value);
    if (admissaoInput.value && saidaInput.value && admissao >= saida) {
      Utils.validateField(saidaInput, 'A data de saída deve ser após a admissão');
    } else if (saidaInput.value) {
      Utils.validateField(saidaInput);
    }
  });

  // Validação dos dias trabalhados
  diasInput.addEventListener('input', () => {
    const dias = parseInt(diasInput.value);
    if (diasInput.value && (dias < 0 || dias > 31)) {
      Utils.validateField(diasInput, 'Digite um valor entre 0 e 31');
    } else if (diasInput.value) {
      Utils.validateField(diasInput);
    }
  });

})();











