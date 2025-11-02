/**
 * GERENCIAMENTO DE TEMA CLARO/ESCURO
 * Controla a alternância entre temas e salva a preferência do usuário
 */

(function() {
  'use strict';

  // Elementos DOM
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  /**
   * Inicializa o tema com base na preferência salva ou do sistema
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    setTheme(savedTheme);
  }

  /**
   * Define o tema e atualiza o ícone
   * @param {string} theme - 'light' ou 'dark'
   */
  function setTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
  }

  /**
   * Alterna entre tema claro e escuro
   */
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  // Event Listener
  themeToggle.addEventListener('click', toggleTheme);

  // Inicializa o tema ao carregar a página
  initTheme();

})();