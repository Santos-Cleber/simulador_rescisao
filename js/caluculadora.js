/**
 * CALCULADORA DE RESCISÃO TRABALHISTA
 * Funções para cálculo de INSS, IRRF, férias, 13º e demais verbas rescisórias
 */

const Calculadora = (function() {
  'use strict';

  /**
   * Calcula o INSS sobre o salário
   * @param {number} salario - Valor do salário
   * @returns {number} Valor do INSS
   */
  function calcularINSS(salario) {
    const faixas = [
      { limite: 1518.00, aliquota: 0.075 },
      { limite: 2793.88, aliquota: 0.09 },
      { limite: 4190.93, aliquota: 0.12 },
      { limite: 8157.41, aliquota: 0.14 }
    ];
    
    let inss = 0;
    let restante = salario;
    let anterior = 0;
    
    for (const faixa of faixas) {
      const faixaBase = faixa.limite - anterior;
      const valorFaixa = Math.min(restante, faixaBase);
      inss += valorFaixa * faixa.aliquota;
      restante -= valorFaixa;
      anterior = faixa.limite;
      if (restante <= 0) break;
    }
    
    return Math.min(inss, 951.63); // Teto do INSS
  }

  /**
   * Calcula o IRRF sobre a base de cálculo
   * @param {number} base - Base de cálculo
   * @param {number} dependentes - Número de dependentes
   * @returns {number} Valor do IRRF
   */
  function calcularIRRF(base, dependentes = 0) {
    const deducaoPorDependente = 189.59;
    const baseFinal = base - (dependentes * deducaoPorDependente);
    
    const faixas = [
      { limite: 2259.20, aliquota: 0, deducao: 0 },
      { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
      { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
      { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
      { limite: Infinity, aliquota: 0.275, deducao: 896.00 }
    ];
    
    for (const faixa of faixas) {
      if (baseFinal <= faixa.limite) {
        return Math.max(0, baseFinal * faixa.aliquota - faixa.deducao);
      }
    }
    
    return 0;
  }

  /**
   * Calcula os meses trabalhados entre duas datas
   * @param {Date} admissao - Data de admissão
   * @param {Date} saida - Data de saída
   * @param {boolean} contarMesAtual - Se deve contar o mês atual
   * @returns {number} Número de meses trabalhados
   */
  function calcularMesesTrabalhados(admissao, saida, contarMesAtual = true) {
    let meses = (saida.getFullYear() - admissao.getFullYear()) * 12;
    meses += saida.getMonth() - admissao.getMonth();
    
    if (contarMesAtual && saida.getDate() >= 15) {
      meses += 1;
    }
    
    return Math.max(0, meses);
  }

  /**
   * Calcula os dias de aviso prévio baseado nos meses trabalhados
   * @param {number} mesesTrabalhados - Meses trabalhados
   * @returns {number} Dias de aviso prévio
   */
  function calcularDiasAvisoPrevio(mesesTrabalhados) {
    const anosTrabalhados = Math.floor(mesesTrabalhados / 12);
    return Math.min(30 + (anosTrabalhados * 3), 90);
  }

  /**
   * Calcula os meses do período aquisitivo atual de férias
   * @param {Date} admissao - Data de admissão
   * @param {Date} saida - Data de saída
   * @returns {number} Meses do período aquisitivo atual
   */
  function calcularPeriodoAquisitivoAtual(admissao, saida) {
    const mesesTotais = calcularMesesTrabalhados(admissao, saida, false);
    const periodosCompletos = Math.floor(mesesTotais / 12);
    const inicioAtual = new Date(admissao);
    inicioAtual.setMonth(inicioAtual.getMonth() + (periodosCompletos * 12));
    const mesesPeriodoAtual = calcularMesesTrabalhados(inicioAtual, saida, true);
    return Math.min(mesesPeriodoAtual, 12);
  }

  /**
   * Formata valor para padrão brasileiro
   * @param {number} value - Valor a ser formatado
   * @returns {string} Valor formatado
   */
  function formatBR(value) {
    return value.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }

  // API Pública
  return {
    calcularINSS,
    calcularIRRF,
    calcularMesesTrabalhados,
    calcularDiasAvisoPrevio,
    calcularPeriodoAquisitivoAtual,
    formatBR
  };

})();