+++
title = "CV"
description = "Professional experience, skills and background of Jesus Valera Reales, Senior Software Engineer."
template = "cv.html"
aliases = ['resume', 'work']

[extra]
# Current roles listed under the name in the home page hero
[[extra.hero_roles]]
role = "Senior Software Developer"
company = "GotPhoto.com"
url = "https://www.gotphoto.com/"
logo = "/cv/fotograf.webp"

[[extra.hero_roles]]
role = "Founder & Engineer"
company = "Narrale"
url = "https://narrale.com/"
logo = "/cv/narrale.webp"

# Projects highlighted in the "Building" section of the home page
[[extra.featured_projects]]
name = "Narrale"
url = "https://narrale.com/"
logo = "/cv/narrale.webp"
tagline = "A quiet writing workspace for novelists"

[[extra.featured_projects]]
name = "Security Scorecard"
url = "https://laravel-security-scorecard-production-q6p9v4.laravel.cloud/"
logo = "/cv/securityscorecard.webp"
tagline = "Instant security audit for Laravel applications"

[[extra.featured_projects]]
name = "Phel Lang IntelliJ Plugin"
url = "https://plugins.jetbrains.com/plugin/28459-phel-lang/"
logo = "/cv/phel-plugin.webp"
tagline = "A Kotlin plugin for the JetBrains IDE family"
+++

<section class="hero" aria-label="Introduction">
  <img class="hero-avatar"
       src="/assets/images/profile/jesus-150.webp"
       srcset="/assets/images/profile/jesus-150.webp 1x, /assets/images/profile/jesus.webp 2x"
       alt="Jesus Valera Reales"
       width="112" height="112">
  <div class="hero-body">
    <h1 class="hero-name">Jesus Valera Reales</h1>
    <p class="hero-role hero-role-place"><svg width="15" height="15" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-pin"></use></svg>Berlin, Germany</p>
    <p class="hero-bio"><strong>Senior Software Engineer</strong> building products end-to-end with <strong>clean&nbsp;architecture</strong>, <strong>TDD</strong>, and <strong>AI</strong>.</p>
    <div class="cv-actions">
      <a class="btn-primary btn-sm" href="/assets/documents/Jesus-Valera-Reales-CV.pdf" download="Jesus-Valera-Reales-CV.pdf">
        <svg width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-download"></use></svg>
        Download PDF
      </a>
      <div class="cv-links">
        <a class="icon-link email-protected" data-email="bWVAamVzdXN2YWxlcmEuZGV2" href="#" aria-label="Send me an email" title="Email">
          <svg width="18" height="18" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-mail"></use></svg>
        </a>
        <a class="icon-link" href="https://github.com/JesusValeraDev" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
          <svg width="18" height="18" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-github"></use></svg>
        </a>
        <a class="icon-link" href="https://www.linkedin.com/in/jesus-valera-reales/" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
          <svg width="18" height="18" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-linkedin"></use></svg>
        </a>
      </div>
    </div>
  </div>
</section>

## About

<div class="card card-pad">
  <ul class="bullets">
    <li><strong>{{ <experience_years start_year={2018} /> }}+ years</strong> shipping products, from data model to UI, with <strong>clean architecture</strong> and <strong>TDD</strong></li>
    <li>Founded and shipped <strong>Narrale</strong>, an <strong>AI-powered SaaS</strong> with paid plans, solo and end-to-end</li>
    <li>Experienced in <strong>mentoring</strong> and <strong>knowledge sharing</strong>, including speaking at public conferences</li>
    <li><strong>Active open-source contributor</strong>, sharing knowledge and driving innovation</li>
    <li><strong>Collaborative engineer</strong> passionate about delivering reliable, high-quality products</li>
  </ul>
</div>

## Skills

<div class="card">
  <div class="skill-row">
    <h3>Languages &amp; frameworks</h3>
    <div class="tags">
      <span class="skill">Java</span>
      <span class="skill">Kotlin</span>
      <span class="skill">PHP</span>
      <span class="skill">TypeScript</span>
      <span class="skill">JavaScript</span>
      <span class="skill">Deno</span>
      <span class="skill">Symfony</span>
      <span class="skill">Laravel</span>
      <span class="skill">VueJS</span>
      <span class="skill">Android</span>
    </div>
  </div>
  <div class="skill-row">
    <h3>Databases &amp; storage</h3>
    <div class="tags">
      <span class="skill">MySQL</span>
      <span class="skill">PostgreSQL</span>
      <span class="skill">Redis</span>
    </div>
  </div>
  <div class="skill-row">
    <h3>Tools &amp; platforms</h3>
    <div class="tags">
      <span class="skill">AWS</span>
      <span class="skill">Docker</span>
      <span class="skill">Git</span>
      <span class="skill">Atlassian</span>
    </div>
  </div>
</div>

## Experience

<div class="card">
  <article class="xp">
    <img class="xp-logo" src="/cv/narrale.webp" alt="Narrale logo" width="44" height="44">
    <div class="xp-body">
      <div class="xp-head">
        <div class="xp-title">
          <h3 class="xp-name"><a href="https://narrale.com/" target="_blank" rel="noopener noreferrer">Narrale<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
          <span class="xp-current">Current</span>
        </div>
        <div class="xp-role">Founder &amp; Engineer (side business)</div>
        <div class="xp-meta">Mar 2026 — Present · {{ <duration start_year={2026} start_month={3} /> }} · Berlin, Germany</div>
      </div>
      <ul class="bullets">
        <li>Designed, built, and launched a <strong>writing platform for novelists end-to-end</strong>: product design, data model, backend, frontend, billing, and deployment</li>
        <li>Architected the backend as a <strong>modular monolith</strong> with <strong>Hexagonal Architecture and DDD</strong></li>
        <li>Built a <strong>provider-agnostic AI layer</strong> with credit-based usage, powering story-bible and scene-notes extraction, "Ask your book" answers with cited passages, continuity tracking, and editorial feedback</li>
        <li>Built the editor on <strong>TipTap/ProseMirror</strong> with offline-safe autosave and version history</li>
        <li>Kept quality high working solo with <strong>AI coding agents</strong>: Spec-Driven Development, TDD, <strong>11,000+ tests</strong></li>
        <li>Ran <strong>user discovery</strong> directly with novelists in online writing communities and turned feedback into the roadmap</li>
      </ul>
      <div class="project-gallery">
        <a href="/cv/projects/narrale1.webp"><img src="/cv/projects/narrale1.webp" alt="Narrale screenshot 1" loading="lazy"></a>
        <a href="/cv/projects/narrale2.webp"><img src="/cv/projects/narrale2.webp" alt="Narrale screenshot 2" loading="lazy"></a>
        <a href="/cv/projects/narrale3.webp"><img src="/cv/projects/narrale3.webp" alt="Narrale screenshot 3" loading="lazy"></a>
      </div>
      <div class="tags">
        <span class="skill">TypeScript</span>
        <span class="skill">React</span>
        <span class="skill">TipTap</span>
        <span class="skill">PHP</span>
        <span class="skill">Laravel</span>
        <span class="skill">PostgreSQL</span>
        <span class="skill">Paddle</span>
        <span class="skill">OpenAI API</span>
        <span class="skill">Docker</span>
      </div>
    </div>
  </article>
  <article class="xp">
    <img class="xp-logo" src="/cv/fotograf.webp" alt="fotograf.de logo" width="44" height="44">
    <div class="xp-body">
      <div class="xp-head">
        <div class="xp-title">
          <h3 class="xp-name"><a href="https://www.gotphoto.com/" target="_blank" rel="noopener noreferrer">GotPhoto.com | fotograf.de<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
          <span class="xp-current">Current</span>
        </div>
        <div class="xp-role">Senior Software Developer</div>
        <div class="xp-meta">Sep 2023 — Present · {{ <duration start_year={2023} start_month={9} /> }} · Berlin, Germany (hybrid)</div>
      </div>
      <ul class="bullets">
        <li>Improved the <strong>package customization flow</strong> in the shop photographers use to sell to parents, raising the order rate by 20% while reducing bugs and support overhead</li>
        <li><strong>Redesigned and rebuilt a shop from scratch</strong> using Symfony, implementing a RESTful API architecture, which significantly improved performance, scalability, and long-term maintainability</li>
        <li><strong>Extracted components</strong> from the monolith into external services, improving maintainability and drastically reducing deployment time from 30 minutes to 40 seconds</li>
        <li><strong>Drove team adoption of AI development tools</strong>, sharing practices for experimentation, analysis, and solution design</li>
        <li><strong>Mentored new team joiners</strong>, guiding them through team ceremonies, knowledge-sharing practices, and technical workflows, enabling faster onboarding and more effective collaboration</li>
      </ul>
      <div class="tags">
        <span class="skill">TypeScript</span>
        <span class="skill">Deno</span>
        <span class="skill">PHP</span>
        <span class="skill">Symfony</span>
        <span class="skill">MySQL</span>
        <span class="skill">Docker</span>
        <span class="skill">GitLab</span>
        <span class="skill">Jira</span>
      </div>
    </div>
  </article>
  <article class="xp">
    <img class="xp-logo" src="/cv/artnight.webp" alt="artnight logo" width="44" height="44">
    <div class="xp-body">
      <div class="xp-head">
        <div class="xp-title">
          <h3 class="xp-name"><a href="https://www.artnight.com/" target="_blank" rel="noopener noreferrer">ArtNight<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
        </div>
        <div class="xp-role">Software Developer</div>
        <div class="xp-meta">Oct 2021 — May 2023 · 1 yr 8 mos · Berlin, Germany (hybrid)</div>
      </div>
      <ul class="bullets">
        <li>Refactored the <strong>PHP monolith into a modular architecture</strong> using Hexagonal Architecture, improving maintainability, scalability, and long-term evolvability of the codebase</li>
        <li>Actively <strong>reviewed and influenced architectural decisions</strong>, balancing business constraints with technical quality and sustainability</li>
        <li>Led by example in <strong>code reviews and refactoring initiatives</strong>, raising overall code quality and reducing technical debt</li>
        <li>Promoted best practices by organizing <strong>internal tech talks and coding katas</strong>, fostering clean code principles and a strong <strong>TDD</strong> culture across the team</li>
      </ul>
      <div class="tags">
        <span class="skill">PHP</span>
        <span class="skill">Symfony</span>
        <span class="skill">PimCore</span>
        <span class="skill">Jira</span>
        <span class="skill">MySQL</span>
        <span class="skill">Docker</span>
        <span class="skill">GitLab</span>
      </div>
    </div>
  </article>
  <article class="xp">
    <img class="xp-logo" src="/cv/kollex.webp" alt="kollex logo" width="44" height="44">
    <div class="xp-body">
      <div class="xp-head">
        <div class="xp-title">
          <h3 class="xp-name"><a href="https://www.kollex.de/" target="_blank" rel="noopener noreferrer">Kollex<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
        </div>
        <div class="xp-role">Junior Software Developer</div>
        <div class="xp-meta">Sep 2020 — Sep 2021 · 1 yr 1 mo · Berlin, Germany (hybrid)</div>
      </div>
      <ul class="bullets">
        <li><strong>Built an S3-based file exchange</strong> to integrate with external systems</li>
        <li>Developed and enhanced multiple features, including performance and reliability improvements</li>
      </ul>
      <div class="tags">
        <span class="skill">PHP</span>
        <span class="skill">Symfony</span>
        <span class="skill">RabbitMQ</span>
        <span class="skill">Jira</span>
        <span class="skill">MySQL</span>
        <span class="skill">PostgreSQL</span>
        <span class="skill">Docker</span>
        <span class="skill">GitHub</span>
      </div>
    </div>
  </article>
  <article class="xp">
    <img class="xp-logo" src="/cv/selectra.webp" alt="selectra logo" width="44" height="44">
    <div class="xp-body">
      <div class="xp-head">
        <div class="xp-title">
          <h3 class="xp-name"><a href="https://selectra.info/" target="_blank" rel="noopener noreferrer">Selectra<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
        </div>
        <div class="xp-role">Junior Software Developer</div>
        <div class="xp-meta">Jun 2019 — Sep 2020 · 1 yr 4 mos · Madrid, Spain (onsite)</div>
      </div>
      <ul class="bullets">
        <li>Contributed to multiple projects through bug fixes, feature development, and enhancements</li>
      </ul>
      <div class="tags">
        <span class="skill">PHP</span>
        <span class="skill">Laravel</span>
        <span class="skill">Redis</span>
        <span class="skill">MySQL</span>
        <span class="skill">Docker</span>
        <span class="skill">Git</span>
        <span class="skill">Trello</span>
        <span class="skill">Basecamp</span>
      </div>
    </div>
  </article>
  <article class="xp">
    <img class="xp-logo" src="/cv/smile-and-learn.webp" alt="smile and learn logo" width="44" height="44">
    <div class="xp-body">
      <div class="xp-head">
        <div class="xp-title">
          <h3 class="xp-name"><a href="https://www.smileandlearn.com/" target="_blank" rel="noopener noreferrer">Smile And Learn<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
        </div>
        <div class="xp-role">Junior Software Developer</div>
        <div class="xp-meta">Nov 2018 — Jun 2019 · 8 mos · Madrid, Spain (onsite)</div>
      </div>
      <ul class="bullets">
        <li>Designed and implemented CSV import and export functionality, along with dynamic PDF generation</li>
      </ul>
      <div class="tags">
        <span class="skill">PHP</span>
        <span class="skill">Laravel</span>
        <span class="skill">JavaScript</span>
        <span class="skill">VueJS</span>
        <span class="skill">MySQL</span>
        <span class="skill">BitBucket</span>
        <span class="skill">Jira</span>
      </div>
    </div>
  </article>
  <article class="xp">
    <img class="xp-logo" src="/cv/rad4m.webp" alt="rad4m logo" width="44" height="44">
    <div class="xp-body">
      <div class="xp-head">
        <div class="xp-title">
          <h3 class="xp-name">RAD4M</h3>
        </div>
        <div class="xp-role">Intern Android Developer</div>
        <div class="xp-meta">Mar 2018 — Jun 2018 · 4 mos · Cracow, Poland (onsite)</div>
      </div>
      <ul class="bullets">
        <li>Designed and developed an application from scratch, with persistent storage and third-party APIs</li>
      </ul>
      <div class="tags">
        <span class="skill">Android</span>
        <span class="skill">Kotlin</span>
        <span class="skill">MySQL</span>
        <span class="skill">Git</span>
      </div>
    </div>
  </article>
</div>

## Education

<div class="edu-grid">
  <article class="card xp">
    <img class="xp-logo" src="/cv/carlos.webp" alt="CIFP Carlos III logo" width="44" height="44">
    <div class="xp-head">
      <h3 class="xp-name"><a href="https://cifpcarlos3.es/" target="_blank" rel="noopener noreferrer">CIFP Carlos III<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
      <div class="xp-role">Higher Technician in Web Applications Development</div>
      <div class="xp-meta">2016 — Jun 2017 · Cartagena, Spain</div>
      <div class="tags">
        <span class="skill">JavaScript</span>
        <span class="skill">PHP</span>
        <span class="skill">MySQL</span>
      </div>
    </div>
  </article>
  <article class="card xp">
    <img class="xp-logo" src="/cv/chirinos.webp" alt="IES Ginés Pérez Chirinos logo" width="44" height="44">
    <div class="xp-head">
      <h3 class="xp-name"><a href="https://ieschirinos.eu/" target="_blank" rel="noopener noreferrer">IES Ginés Pérez Chirinos<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a></h3>
      <div class="xp-role">Higher Technician in Multi-platform Applications Development</div>
      <div class="xp-meta">2014 — 2016 · Caravaca, Spain</div>
      <div class="tags">
        <span class="skill">Java</span>
        <span class="skill">Kotlin</span>
        <span class="skill">Android</span>
        <span class="skill">OracleSQL</span>
        <span class="skill">SQLite</span>
        <span class="skill">MongoDB</span>
      </div>
    </div>
  </article>
</div>

## Languages

<div class="card lang-grid">
  <div class="lang">
    <span class="lang-name">Spanish</span>
    <span class="lang-level">Native</span>
  </div>
  <div class="lang">
    <span class="lang-name">English</span>
    <span class="lang-level">C1 (Advanced)</span>
  </div>
  <div class="lang">
    <span class="lang-name">German</span>
    <span class="lang-level">A2 (Basic)</span>
  </div>
</div>

## Conferences

<div class="card">
  <div class="talk-group">
    <h3>IPC 2026 · Berlin</h3>
    <div class="talk">
      <span class="talk-role">Workshop leader</span>
      <a href="https://phpconference.com/php-core-coding/refactoring-workshop-modernizing-legacy-php-pair-programming" target="_blank" rel="noopener noreferrer">Modern PHP in Practice: TDD, Refactoring, and Pair Programming<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <div class="talk">
      <span class="talk-role">Speaker</span>
      <a href="https://phpconference.com/software-architecture/legacy-php-refactoring-patterns/" target="_blank" rel="noopener noreferrer">Evolving a Legacy PHP Application: Patterns for Refactoring Success<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
  </div>
  <div class="talk-group">
    <h3>IPC 2025 · Munich</h3>
    <div class="talk">
      <span class="talk-role">Workshop leader</span>
      <a href="https://phpconference.com/php-core-coding/refactoring-workshop-modernizing-legacy-php-pair-programming" target="_blank" rel="noopener noreferrer">Refactoring Workshop: Modernizing Legacy PHP with Pair Programming<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <div class="talk">
      <span class="talk-role">Speaker</span>
      <a href="https://phpconference.com/software-architecture/php-refactoring-techniques" target="_blank" rel="noopener noreferrer">From Mess to Maintainable: Real-World PHP Refactoring Techniques<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
  </div>
  <div class="talk-group">
    <h3>IPC 2025 · Berlin</h3>
    <div class="talk">
      <span class="talk-role">Speaker</span>
      <a href="https://phpconference.com/slideless-pure-coding/testing-refactoring-kata-live-coding-pair-mob-programming" target="_blank" rel="noopener noreferrer">Solving a Testing &amp; Refactoring Kata: Live Coding in Pair/Mob Programming<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
  </div>
</div>

## Projects

<div class="card">
  <article class="proj">
    <div class="proj-head">
      <img class="proj-logo" src="/cv/securityscorecard.webp" alt="Laravel Security Scorecard logo" width="36" height="36" loading="lazy">
      <div class="proj-title">
        <h3 class="proj-name">Security Scorecard</h3>
        <span class="proj-tagline">Instant Laravel security audit tool</span>
      </div>
      <a class="sec-link" href="https://laravel-security-scorecard-production-q6p9v4.laravel.cloud/" target="_blank" rel="noopener noreferrer">Visit site<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <p>Automated security auditing tool for Laravel applications.</p>
    <p>It scans publicly accessible deployments for common security issues such as leaked files, exposed dashboards, missing HTTP security headers, and configuration mistakes, then provides a graded report with clear, actionable remediation steps.</p>
    <div class="project-gallery">
      <a href="/cv/projects/securityscorecard1.webp"><img src="/cv/projects/securityscorecard1.webp" alt="Security Scorecard screenshot 1" loading="lazy"></a>
      <a href="/cv/projects/securityscorecard2.webp"><img src="/cv/projects/securityscorecard2.webp" alt="Security Scorecard screenshot 2" loading="lazy"></a>
      <a href="/cv/projects/securityscorecard3.webp"><img src="/cv/projects/securityscorecard3.webp" alt="Security Scorecard screenshot 3" loading="lazy"></a>
    </div>
  </article>
  <article class="proj">
    <div class="proj-head">
      <img class="proj-logo" src="/cv/dkrisna.webp" alt="D'Krisna Beauty Salon logo" width="36" height="36" loading="lazy">
      <div class="proj-title">
        <h3 class="proj-name">D'Krisna</h3>
        <span class="proj-tagline">Beauty & wellness salon in Murcia</span>
      </div>
      <a class="sec-link" href="https://dkrisna.es/" target="_blank" rel="noopener noreferrer">Visit site<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <p>Collaborated directly with the client through extensive conversations to understand their vision and business needs. Designed the complete visual identity and user experience from initial concept to final implementation.</p>
    <p>Developed a modern, bilingual website featuring integrated booking system and responsive design for enhanced client engagement.</p>
    <div class="project-gallery">
      <a href="/cv/projects/dkrisna1.webp"><img src="/cv/projects/dkrisna1.webp" alt="D'Krisna screenshot 1" loading="lazy"></a>
      <a href="/cv/projects/dkrisna2.webp"><img src="/cv/projects/dkrisna2.webp" alt="D'Krisna screenshot 2" loading="lazy"></a>
      <a href="/cv/projects/dkrisna3.webp"><img src="/cv/projects/dkrisna3.webp" alt="D'Krisna screenshot 3" loading="lazy"></a>
    </div>
  </article>
  <article class="proj">
    <div class="proj-head">
      <img class="proj-logo" src="/cv/bip39.webp" alt="BIP39 Word Selector logo" width="36" height="36" loading="lazy">
      <div class="proj-title">
        <h3 class="proj-name">BIP39 Word Selector</h3>
        <span class="proj-tagline">Online Bitcoin mnemonic converter</span>
      </div>
      <a class="sec-link" href="https://bip39.jesusvalera.dev/" target="_blank" rel="noopener noreferrer">Visit site<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <p>Developed a privacy-focused web tool for cryptocurrency enthusiasts working with BIP39 mnemonic phrases. Features bidirectional conversion between words and binary patterns with client-side processing.</p>
    <p>Built with vanilla JavaScript ensuring no data storage or tracking for maximum user security.</p>
    <div class="project-gallery">
      <a href="/cv/projects/bip1.webp"><img src="/cv/projects/bip1.webp" alt="BIP39 screenshot 1" loading="lazy"></a>
      <a href="/cv/projects/bip2.webp"><img src="/cv/projects/bip2.webp" alt="BIP39 screenshot 2" loading="lazy"></a>
      <a href="/cv/projects/bip3.webp"><img src="/cv/projects/bip3.webp" alt="BIP39 screenshot 3" loading="lazy"></a>
    </div>
  </article>
  <article class="proj">
    <div class="proj-head">
      <img class="proj-logo" src="/cv/phel-plugin.webp" alt="Phel Lang Plugin logo" width="36" height="36" loading="lazy">
      <div class="proj-title">
        <h3 class="proj-name">Phel Lang IntelliJ Plugin</h3>
        <span class="proj-tagline">A plugin for JetBrains IDEs</span>
      </div>
      <a class="sec-link" href="https://plugins.jetbrains.com/plugin/28459-phel-lang/" target="_blank" rel="noopener noreferrer">Visit site<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <p>Developed a comprehensive IntelliJ IDEA plugin written in Kotlin for Phel functional programming language. Implemented syntax highlighting, code navigation, auto-completion, and error detection features.</p>
    <p>Successfully published in JetBrains Marketplace, serving the growing Phel developer community.</p>
    <div class="project-gallery">
      <a href="/cv/projects/phelplugin1.webp"><img src="/cv/projects/phelplugin1.webp" alt="Phel Plugin screenshot 1" loading="lazy"></a>
      <a href="/cv/projects/phelplugin2.webp"><img src="/cv/projects/phelplugin2.webp" alt="Phel Plugin screenshot 2" loading="lazy"></a>
      <a href="/cv/projects/phelplugin3.webp"><img src="/cv/projects/phelplugin3.webp" alt="Phel Plugin screenshot 3" loading="lazy"></a>
    </div>
  </article>
  <article class="proj">
    <div class="proj-head">
      <img class="proj-logo" src="/cv/phel.webp" alt="Phel Lang logo" width="36" height="36" loading="lazy">
      <div class="proj-title">
        <h3 class="proj-name">Phel Lang</h3>
        <span class="proj-tagline">FP language that compiles to PHP</span>
      </div>
      <a class="sec-link" href="https://phel-lang.org/" target="_blank" rel="noopener noreferrer">Visit site<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <p><strong>Language Development:</strong> Contributed bug fixes, automated test suites, and design improvements to enhance language stability and reliability.</p>
    <p><strong>Website Design:</strong> Designed and developed the complete project website from scratch with responsive design, documentation, and custom search engine functionality.</p>
    <div class="project-gallery">
      <a href="/cv/projects/phel1.webp"><img src="/cv/projects/phel1.webp" alt="Phel Lang screenshot 1" loading="lazy"></a>
      <a href="/cv/projects/phel2.webp"><img src="/cv/projects/phel2.webp" alt="Phel Lang screenshot 2" loading="lazy"></a>
      <a href="/cv/projects/phel3.webp"><img src="/cv/projects/phel3.webp" alt="Phel Lang screenshot 3" loading="lazy"></a>
    </div>
  </article>
  <article class="proj">
    <div class="proj-head">
      <img class="proj-logo" src="/cv/gacela.webp" alt="Gacela logo" width="36" height="36" loading="lazy">
      <div class="proj-title">
        <h3 class="proj-name">Gacela Project</h3>
        <span class="proj-tagline">Split your application into modules</span>
      </div>
      <a class="sec-link" href="https://gacela-project.com/" target="_blank" rel="noopener noreferrer">Visit site<svg class="arrow-icon" width="14" height="14" aria-hidden="true"><use href="/assets/icons/sprite.svg#icon-external"></use></svg></a>
    </div>
    <p>Co-designed and developed Gacela, a comprehensive PHP modular framework for splitting large applications. Implemented core components including dependency resolver, code generator, and event manager system.</p>
    <p>Collaborated on design patterns and documentation, promoting clean architecture principles for scalable development.</p>
    <div class="project-gallery">
      <a href="/cv/projects/gacela1.webp"><img src="/cv/projects/gacela1.webp" alt="Gacela screenshot 1" loading="lazy"></a>
      <a href="/cv/projects/gacela2.webp"><img src="/cv/projects/gacela2.webp" alt="Gacela screenshot 2" loading="lazy"></a>
      <a href="/cv/projects/gacela3.webp"><img src="/cv/projects/gacela3.webp" alt="Gacela screenshot 3" loading="lazy"></a>
    </div>
  </article>
</div>
