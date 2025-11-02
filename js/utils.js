/**
 * UTILITÁRIOS
 * Funções auxiliares para alertas, loading e validações
 */

const Utils = (function() {
  'use strict';

  /**
   * Mostra o overlay de loading
   * @param {string} message - Mensagem a ser exibida
   */
  function showLoading(message = 'Processando...') {
    const overlay = document.getElementById('loadingOverlay');
    const text = overlay.querySelector('p');
    if (text) text.textContent = message;
    overlay.classList.add('active');
  }

  /**
   * Esconde o overlay de loading
   */
  function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('active');
  }

  /**
   * Mostra um alerta na tela
   * @param {string} message - Mensagem do alerta
   * @param {string} type - Tipo: 'error', 'success', 'warning'
   * @param {number} duration - Duração em ms (0 = não fecha automaticamente)
   */
  function showAlert(message, type = 'error', duration = 5000) {
    const container = document.getElementById('alertContainer');
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    
    const icons = {
      error: '❌',
      success: '✅',
      warning: '⚠️'
    };
    
    alert.innerHTML = `
      <span class="alert-icon">${icons[type]}</span>
      <span>${message}</span>
      <button class="alert-close" aria-label="Fechar">×</button>
    `;
    
    container.appendChild(alert);
    
    // Botão de fechar
    alert.querySelector('.alert-close').addEventListener('click', () => {
      alert.remove();
    });
    
    // Auto-fechar
    if (duration > 0) {
      setTimeout(() => {
        if (alert.parentNode) {
          alert.remove();
        }
      }, duration);
    }
  }

  /**
   * Limpa todos os alertas
   */
  function clearAlerts() {
    const container = document.getElementById('alertContainer');
    container.innerHTML = '';
  }

  /**
   * Valida um campo e mostra mensagem de erro
   * @param {HTMLElement} field - Campo a ser validado
   * @param {string} errorMessage - Mensagem de erro
   * @returns {boolean} - Se é válido
   */
  function validateField(field, errorMessage = '') {
    const errorSpan = document.getElementById(`${field.id}-error`);
    
    if (!field.validity.valid || errorMessage) {
      field.classList.add('invalid');
      field.classList.remove('valid');
      if (errorSpan) {
        errorSpan.textContent = errorMessage || field.validationMessage;
      }
      return false;
    } else {
      field.classList.remove('invalid');
      field.classList.add('valid');
      if (errorSpan) {
        errorSpan.textContent = '';
      }
      return true;
    }
  }

  /**
   * Limpa validação de um campo
   * @param {HTMLElement} field - Campo a ser limpo
   */
  function clearValidation(field) {
    field.classList.remove('invalid', 'valid');
    const errorSpan = document.getElementById(`${field.id}-error`);
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  }

  /**
   * Formata input de dinheiro em tempo real
   * @param {HTMLElement} input - Input a ser formatado
   */
  function formatMoneyInput(input) {
    input.addEventListener('input', function(e) {
      let value = e.target.value;
      
      // Remove tudo exceto números
      value = value.replace(/\D/g, '');
      
      // Converte para centavos
      value = (parseFloat(value) / 100).toFixed(2);
      
      // Formata para padrão brasileiro
      value = value.replace('.', ',');
      value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      
      e.target.value = value;
    });
  }

  /**
   * Debounce para validação em tempo real
   * @param {Function} func - Função a ser executada
   * @param {number} wait - Tempo de espera em ms
   * @returns {Function}
   */
  function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Verifica se jsPDF está disponível
   * @returns {boolean}
   */
  function isJsPDFAvailable() {
    return typeof window.jspdf !== 'undefined';
  }

  // API Pública
  return {
    showLoading,
    hideLoading,
    showAlert,
    clearAlerts,
    validateField,
    clearValidation,
    formatMoneyInput,
    debounce,
    isJsPDFAvailable
  };

})();