export function renderCurriculo() {
  return `
    <style>
        .cv-wrapper {
            background-color: #555; /* Fundo do app */
            padding: 40px 20px;
            font-family: 'Segoe UI', Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .cv-no-print { margin-bottom: 30px; }
        .cv-btn-print { 
            background: #e65100; color: white; border: none; padding: 12px 30px; 
            border-radius: 50px; cursor: pointer; font-weight: bold; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.3); font-size: 14px;
        }

        /* Estilo da Folha A4 Master */
        .cv-page { 
            width: 210mm; 
            min-height: 297mm; 
            background: white; 
            margin-bottom: 30px; 
            padding: 20mm; 
            box-shadow: 0 0 20px rgba(0,0,0,0.5); 
            display: flex;
            flex-direction: column;
            color: #333;
            position: relative;
        }

        /* Barra Laranja Master */
        .cv-header { 
            border-bottom: 5px solid #e65100; 
            padding-bottom: 20px; 
            margin-bottom: 20px; 
        }

        .cv-header h1 { color: #e65100; font-size: 34px; text-transform: uppercase; margin: 0; line-height: 1; }
        .cv-header h2 { color: #2d3436; font-size: 18px; font-weight: 500; margin: 8px 0 15px 0; }
        
        .cv-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 11px; color: #666; }
        .cv-contact-grid span { display: flex; align-items: center; gap: 8px; }

        /* Botão de Vídeo Master */
        .cv-video-cta { 
            display: inline-flex; align-items: center; gap: 10px;
            background: #fff5f0; border: 1px solid #e65100; 
            padding: 10px 20px; border-radius: 5px; color: #e65100;
            text-decoration: none; font-weight: bold; font-size: 12px;
            margin: 15px 0;
        }

        .cv-section-title { color: #e65100; text-transform: uppercase; font-size: 15px; margin: 20px 0 12px 0; letter-spacing: 0.5px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        
        .cv-text { line-height: 1.6; margin: 8px 0; text-align: justify; font-size: 14px; }
        
        /* Lista com Bullets Laranja Master */
        .cv-wrapper ul { list-style: none; padding: 0; margin: 10px 0; }
        .cv-wrapper li { position: relative; padding-left: 25px; margin-bottom: 8px; line-height: 1.5; font-size: 14px; }
        .cv-wrapper li::before { 
            content: "●"; 
            color: #e65100; 
            position: absolute; 
            left: 0; 
            font-size: 16px;
        }

        .cv-grid-two { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 40px; }
        .cv-exp-item { margin-bottom: 20px; }
        .cv-exp-header { font-weight: bold; color: #000; display: flex; justify-content: space-between; font-size: 15px; }
        .cv-exp-tech { font-style: italic; color: #777; font-size: 12px; margin: 2px 0 8px 0; }

        /* Estilo da Carta */
        .cv-letter-content { line-height: 1.8; text-align: justify; font-size: 15px; color: #222; }

        @media print {
            body { background: white !important; }
            .cv-wrapper { background: white !important; padding: 0; }
            .cv-no-print { display: none; }
            .cv-page { box-shadow: none; margin: 0; width: 100%; height: 297mm; page-break-after: always; border-top: none; }
            /* Garante que o laranja apareça na impressão */
            .cv-header { border-bottom: 5px solid #e65100 !important; -webkit-print-color-adjust: exact; }
            .cv-section-title { color: #e65100 !important; -webkit-print-color-adjust: exact; }
        }
    </style>

    <div class="cv-wrapper">
      <div class="cv-no-print">
          <button class="cv-btn-print" onclick="window.print()">📥 BAIXAR PDF MASTER</button>
      </div>

      <!-- PÁGINA 1: CURRÍCULO MASTER -->
      <div class="cv-page">
          <div class="cv-header">
              <h1>Luan Estifer Rodrigues Pereira</h1>
              <h2>Engenharia de Software | Desenvolvedor Full Stack Python</h2>
              
              <div class="cv-contact-grid">
                  <span><i class="fas fa-phone"></i> +55 19 9722 2694</span>
                  <span><i class="fas fa-envelope"></i> luanestiferpy@gmail.com</span>
                  <span><i class="fab fa-linkedin"></i> linkedin.com/in/luanestifer</span>
                  <span><i class="fab fa-github"></i> github.com/Zsubzeroz</span>
                  <span><i class="fas fa-map-marker-alt"></i> Artur Nogueira, SP | Disponível Remoto</span>
                  <span><i class="fas fa-language"></i> Inglês B2 (SEDA College / Fluency)</span>
              </div>

              <a href="https://www.loom.com/share/0f49c21960fb459eaa6bdbbdccc4237c" target="_blank" class="cv-video-cta">
                  <i class="fas fa-play-circle"></i> ASSISTIR APRESENTAÇÃO EM VÍDEO (2 MIN)
              </a>
          </div>

          <section>
              <h2 class="cv-section-title">Resumo Profissional</h2>
              <p class="cv-text">
                  Estudante de Engenharia de Software com sólido desempenho acadêmico (Média <strong>8,4</strong>) e perfil altamente analítico. Possuo <strong>29 meses de experiência profissional</strong> acumulada, atuando como protagonista na automação de processos industriais. Especialista em converter regras de negócio complexas em soluções de inteligência de dados utilizando <strong>Python e SQL</strong> no ecossistema ERP Protheus.
              </p>
          </section>

          <div class="cv-grid-two">
              <div>
                  <h2 class="cv-section-title">Experiência Profissional</h2>
                  <div class="cv-exp-item">
                      <div class="cv-exp-header"><span>Auxiliar de Produção IA</span><span>2025 – 2026</span></div>
                      <div class="cv-exp-tech">Ecoflora Brasil | AppSheet, Python, Google Sheets</div>
                      <ul>
                          <li>Liderei a transição digital de processos operacionais via AppSheet, eliminando o uso de papel.</li>
                          <li>Desenvolvi scripts de automação para garantir integridade e fluidez de dados técnicos.</li>
                      </ul>
                  </div>

                  <div class="cv-exp-item">
                      <div class="cv-exp-header"><span>Suporte Administrativo</span><span>2023 – 2025</span></div>
                      <div class="cv-exp-tech">Embrasatec | Python, SQL, ERP Protheus, Excel</div>
                      <ul>
                          <li>Automatizei a extração de KPIs do ERP Protheus via Python, otimizando a tomada de decisão.</li>
                          <li>Investigação de causas-raiz em inconsistências de dados e suporte técnico estratégico.</li>
                      </ul>
                  </div>
              </div>

              <div>
                  <h2 class="cv-section-title">Habilidades Técnicas</h2>
                  <ul>
                      <li><strong>Python (Foco)</strong> & Django.</li>
                      <li><strong>SQL</strong> & ERP Protheus.</li>
                      <li><strong>Git/GitHub</strong> & Docker.</li>
                      <li><strong>VS Code</strong> & APIs REST.</li>
                  </ul>

                  <h2 class="cv-section-title">Diferenciais</h2>
                  <ul>
                      <li><strong>Liderança:</strong> Líder Equipe Xadrez.</li>
                      <li><strong>Lógica:</strong> Vencedor Olimp. Astronomia.</li>
                      <li><strong>Nota 9,7</strong> em Técnicas de Programação.</li>
                  </ul>
              </div>
          </div>

          <section>
              <h2 class="cv-section-title">Educação & Formação</h2>
              <p class="cv-text">
                  ● <strong>Bacharelado em Engenharia de Software</strong> - UniCesumar (10/2027)<br>
                  ● <strong>Inglês Nível B2</strong> - SEDA College & Fluency Academy<br>
                  ● <strong>Python & Django Full Stack</strong> - Mate Academy
              </p>
          </section>
      </div>

      <!-- PÁGINA 2: CARTA DE APRESENTAÇÃO MASTER -->
      <div class="cv-page">
          <div class="cv-header">
              <h1>Carta de Apresentação</h1>
              <h2>Luan Estifer Rodrigues Pereira</h2>
          </div>

          <div class="cv-letter-content">
              <p style="text-align: right; color: #666; margin-bottom: 30px;">Artur Nogueira, SP.</p>
              
              <p>Prezados responsáveis pela seleção,</p>

              <p>Demonstro meu forte interesse em integrar a equipe de tecnologia de sua organização. Como estudante de Engenharia de Software apaixonado por lógica e eficiência, busco uma oportunidade onde eu possa aplicar minha base técnica em <strong>Python e Django</strong> e meu perfil resolutivo para construir soluções que gerem valor real ao negócio.</p>

              <p>Minha trajetória é marcada pela proatividade em unir a tecnologia à operação. Em minhas experiências na Embrasatec e Ecoflora, atuei diretamente na interface com sistemas críticos, onde utilizei o ecossistema Python para automatizar KPIs e facilitar a transição digital de equipes operacionais. Essa vivência me conferiu a maturidade para traduzir requisitos complexos em código funcional, testável e escalável.</p>

              <p>Um dos meus diferenciais competitivos é o investimento contínuo na minha comunicação global. Possuo nível de <strong>inglês B2 (Upper Intermediate)</strong> e estudo ativamente em instituições internacionais como a <strong>SEDA College</strong>, o que me permite colaborar em ambientes multiculturais com facilidade.</p>

              <p>Além disso, minha base estratégica como <strong>líder de equipe de xadrez</strong> e vencedor de olimpíadas científicas forjou meu raciocínio lógico investigativo, competência que aplico diariamente na arquitetura de software e na resolução de problemas complexos.</p>

              <p style="background: #fafafa; border-left: 5px solid #e65100; padding: 20px; margin: 30px 0; font-weight: bold; text-align: center;">
                  Quer conhecer minha postura e comunicação em 2 minutos?<br>
                  <a href="https://www.loom.com/share/0f49c21960fb459eaa6bdbbdccc4237c" target="_blank" style="color:#e65100;">CLIQUE AQUI PARA ASSISTIR MEU VÍDEO NO LOOM</a>
              </p>

              <p>Tenho total disponibilidade para atuação remota ou híbrida, com flexibilidade garantida pelo meu formato de estudos EAD. Agradeço pela atenção.</p>

              <div style="margin-top: 50px; font-weight: bold; border-top: 1px solid #eee; padding-top: 20px;">
                  Atenciosamente,<br>
                  Luan Estifer Rodrigues Pereira<br>
                  <span style="font-weight: normal; font-size: 12px; color: #666;">Engenharia de Software | Python Developer | B2 English</span>
              </div>
          </div>
      </div>
    </div>
  `;
}
    