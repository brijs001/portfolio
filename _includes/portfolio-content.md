<header class="site-header">
  <div class="container-wide header-inner">
    <a href="#top" class="brand" aria-label="Brijesh Soni — home">
      <img class="brand-mark" src="brand-logo.png" alt="" width="36" height="36">
      <span class="brand-name">Brijesh Soni</span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="#case-studies">Case Studies</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
    <div style="display:flex;gap:var(--space-2);align-items:center;">
      <button class="theme-toggle" data-theme-toggle aria-label="Switch to dark mode">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="mobile-nav-overlay" id="mobileNavOverlay"></div>
<div class="mobile-nav" id="mobileNav">
  <a href="#case-studies">Case Studies</a>
  <a href="#about">About</a>
  <a href="#services">Services</a>
  <a href="#contact">Contact</a>
</div>

<main id="top">

<!-- ============ Hero ============ -->
<section class="hero">
  <div class="container">
    <div class="hero-layout">
      <div class="hero-inner">
        <p class="hero-eyebrow">Technical Product Leader · AI/ML · Cloud · SaaS</p>
        <h1>
          <span>Unlocking opportunity.</span>
          <span>Building innovative products.</span>
          <span>Driving growth.</span>
        </h1>
        <p class="hero-lede">
          15+ years in technology, 8+ in product management — building AI/ML systems, cloud platforms, and B2B SaaS products for capital markets and insurance. I own problems end-to-end: discovery, prioritization, execution, and the metrics that prove it worked.
        </p>
        <div class="hero-ctas">
          <a href="#case-studies" class="btn btn-primary">View Case Studies</a>
          <a href="#contact" class="btn btn-outline">Work With Me</a>
        </div>
        <div class="hero-stats" role="list">
          <div class="stat" role="listitem">
            <span class="stat-value">$250M+</span>
            <span class="stat-label">Combined revenue & savings delivered</span>
          </div>
          <div class="stat" role="listitem">
            <span class="stat-value">8</span>
            <span class="stat-label">B2B/B2C products owned end-to-end</span>
          </div>
          <div class="stat" role="listitem">
            <span class="stat-value">30%</span>
            <span class="stat-label">reduction in false positives via agentic AI</span>
          </div>
          <div class="stat" role="listitem">
            <span class="stat-value">0→1</span>
            <span class="stat-label">SaaS product grown to $97M+ revenue</span>
          </div>
        </div>
      </div>
      <img class="hero-photo" src="profile-photo.png" alt="Portrait of Brijesh Soni" width="1197" height="1314">
    </div>
  </div>
</section>

<!-- ============ Case Studies ============ -->
<section class="case-studies" id="case-studies">
  <div class="container">
    <div class="case-studies-header">
      <p class="section-eyebrow">Selected Work</p>
      <h2>Four case studies. From zero-to-one to enterprise AI.</h2>
      <p>Each one follows the same structure: the problem, the customers, the solution I owned, and the results — with measurement approaches clearly marked where details are still pending.</p>
    </div>

    <!-- ============ Case Study 1: BofA Agentic AI Fraud ============ -->
    <article class="case-study">
      <div class="case-study-header">
        <span class="case-number">01</span>
        <h3 class="case-title">Agentic AI Fraud Prevention</h3>
        <div class="case-meta">
          <span class="case-company">Bank of America</span>
          <span class="case-role">Sr. Technical Product Manager / Program Lead</span>
          <span class="case-dates">2022 – Present</span>
        </div>
        <p class="case-intro">
          An 8-agent LLM system that automates fraud operations at a top-tier bank. The engineering could have been built without a PM — <strong>but the technical PM framing the problem, choosing the evaluation criteria, and sequencing the rollout is what turned the technology into a production system</strong>.
        </p>
      </div>

      <div class="case-metrics">
        <div class="metric"><span class="metric-value">30%</span><span class="metric-label">reduction in false positives</span></div>
        <div class="metric"><span class="metric-value">28%</span><span class="metric-label">improvement in detection accuracy</span></div>
        <div class="metric"><span class="metric-value">50%</span><span class="metric-label">operational efficiency gain</span></div>
        <div class="metric"><span class="metric-value">$1M</span><span class="metric-label">indirect expense losses prevented</span></div>
      </div>

      <div class="case-sections">
        <div class="case-section">
          <h3><span class="section-num">1</span> The Problem</h3>
          <p>
            A rule-based fraud detection system was generating more noise than signal. Analysts were overwhelmed by false-positive alerts — and the recovery cost for flagged-but-legitimate transactions was <strong>roughly 4× the value of the actual fraud</strong>.
          </p>
        </div>

        <div class="case-section">
          <h3><span class="section-num">2</span> The Customers</h3>
          <p>Three distinct groups, each with a different definition of success:</p>
          <ul>
            <li><strong>Fraud analysts</strong> — the daily users. Needed fewer, higher-confidence alerts so they could focus on real risk.</li>
            <li><strong>Compliance and risk teams</strong> — the gatekeepers. Required explainability, auditability, and zero tolerance for false negatives.</li>
            <li><strong>Bank leadership</strong> — the sponsors. Needed a defensible business case: cost reduction without increased risk exposure.</li>
          </ul>
        </div>

        <div class="case-section">
          <h3><span class="section-num">3</span> The Solution I Owned</h3>
          <p>
            I owned the product vision — <strong>"reduce friction for legitimate users while improving fraud signal precision"</strong> — and the decisions that turned it into a shipped system.
          </p>
          <p>What I specifically did:</p>
          <ul>
            <li>Partnered with data science to identify where AI added real value versus where rules were already sufficient.</li>
            <li>Sequenced an MVP that <strong>assisted analysts rather than replacing their decisions</strong> — earning trust before expanding autonomy.</li>
            <li>Designed the multi-agent architecture: orchestration, inter-agent data contracts, retrieval, tool interfaces, and prompt governance.</li>
            <li>Built the evaluation harness — rubric-based evals derived from human-reviewed SOPs — that turned production misses into prompt and logic improvements.</li>
          </ul>
        </div>

        <div class="case-section">
          <h3><span class="section-num">4</span> Results & Measurement</h3>
          <p>
            The system reduced false positives by 30%, improved fraud detection accuracy by 28%, improved operational efficiency by 50%, scaled automation to roughly <strong>60% of manual operations</strong>, and prevented approximately <strong>$1M in indirect expense losses</strong> — all while maintaining regulatory confidence.
          </p>
          <div class="case-measurement">
            <span class="case-measurement-label">Proposed measurement approach — awaiting confirmation</span>
            <p>For an AI fraud system, four dimensions need to be measured — it has to prove both that it catches fraud and that it doesn't disrupt legitimate users:</p>
            <p><strong>Model performance:</strong> recall, precision, false-positive rate, model drift over time.</p>
            <p><strong>Business impact:</strong> dollar value of fraud prevented, cost per investigation, alerts per analyst.</p>
            <p><strong>User experience:</strong> false-decline rate, support contact rate post-flag, time to resolution.</p>
            <p><strong>Operational:</strong> alert volume, % auto-resolved vs. manual review, feedback loop health.</p>
          </div>
          <p class="case-learning">
            <strong>Learning:</strong> For agentic AI systems, the evaluation harness — not the model — is the real moat. Teams that skip structured evals spend months tuning blind.
          </p>
        </div>
      </div>
    </article>

    <!-- ============ Case Study 2: BofA Client Activation ============ -->
    <article class="case-study">
      <div class="case-study-header">
        <span class="case-number">02</span>
        <h3 class="case-title">Trading Platform Modernization & Client Activation</h3>
        <div class="case-meta">
          <span class="case-company">Bank of America</span>
          <span class="case-role">Sr. Technical Product Manager / Program Lead</span>
          <span class="case-dates">2022 – Present</span>
        </div>
        <p class="case-intro">
          A modernization of a mission-critical trading platform handling <strong>2M+ orders per hour</strong>. I owned specific customer journeys — authentication, order management, execution experience, APIs, and operational workflows. The migration could have been run as a pure engineering program — <strong>but the technical PM owning the customer-journey lens, prioritization, and cross-functional trade-offs is what made the difference between shipping infrastructure and delivering business outcomes</strong>.
        </p>
      </div>

      <div class="case-metrics">
        <div class="metric"><span class="metric-value">60%</span><span class="metric-label">reduction in feature delivery time</span></div>
        <div class="metric"><span class="metric-value">2M/hr</span><span class="metric-label">orders supported at market peak</span></div>
        <div class="metric"><span class="metric-value">100+</span><span class="metric-label">APIs in the partner-facing ecosystem</span></div>
        <div class="metric"><span class="metric-value">50%</span><span class="metric-label">reduction in scope changes</span></div>
      </div>

      <div class="case-sections">
        <div class="case-section">
          <h3><span class="section-num">1</span> The Problem</h3>
          <p>
            A legacy mainframe-based trading platform consumed <strong>35% of engineering capacity</strong> in maintenance and was approaching end-of-life support — creating cyber exposure and blocking feature velocity. User-level churn was rising at <strong>10%</strong>, driven by latency volatility during market spikes and a rigid UI/UX that slowed task completion.
          </p>
          <p>
            Deployment cycles created constant tension between agility and regulatory safety — compliance required slower, more careful releases that frustrated product and business stakeholders.
          </p>
        </div>

        <div class="case-section">
          <h3><span class="section-num">2</span> The Customers</h3>
          <ul>
            <li><strong>Institutional investors</strong> — hedge funds, asset managers, broker-dealers — executing high-frequency trades via FIX and REST APIs. Wanted self-service onboarding and real-time order visibility.</li>
            <li><strong>Retail partners</strong> — third-party brokerage platforms routing orders on behalf of end users. Needed reliable, low-latency integrations.</li>
            <li><strong>Internal teams</strong> — trading advisors, compliance, fraud analytics, and customer service — each a stakeholder in the platform's reliability and auditability.</li>
          </ul>
        </div>

        <div class="case-section">
          <h3><span class="section-num">3</span> The Solution I Owned</h3>
          <p>I owned specific customer journeys across the platform and ran a three-workstream strategy prioritized against business value and regulatory constraints:</p>
          <ul>
            <li><strong>Trading backend:</strong> built a sandbox + API Dev Portal for partners, cutting friction in test onboarding. Added telemetry to track partner errors and automate alerting. Led a UI redesign that introduced real-time log access with role-based visibility and contextual filters — cutting log retrieval time to under 60 seconds, helping reduce onboarding time by 75%.</li>
            <li><strong>Fraud detection integration:</strong> introduced an LLM-driven fraud scoring system — starting with a POC trained on historical triage logs. Worked with ML leads to define interpretability requirements to pass compliance scrutiny.</li>
            <li><strong>User interface and performance:</strong> shipped an interactive, customizable, widget-style UI for individual investors — <strong>78% of adoption</strong> came from this work.</li>
            <li><strong>API-first modernization:</strong> decomposed legacy services into API-first microservices behind the partner-facing portal, and migrated key capabilities to AWS.</li>
            <li><strong>Self-service onboarding:</strong> automated validations across Operations, Compliance, and Technology that had previously been manual hand-offs.</li>
          </ul>
          <p>
            I made the trade-offs: sequencing onboarding modernization first (fastest path to revenue), keeping the compliance requirements in scope, and keeping the UI redesign in scope when it would have been easier to cut.
          </p>
        </div>

        <div class="case-section">
          <h3><span class="section-num">4</span> Results & Measurement</h3>
          <p>
            Feature delivery time dropped by <strong>60%</strong>, platform scalability now supports roughly <strong>2 million orders per hour</strong> at market peak, and scope changes dropped by <strong>50%</strong>. Client onboarding time fell from six weeks to under five days.
          </p>
          <div class="case-measurement">
            <span class="case-measurement-label">Proposed measurement approach — awaiting confirmation</span>
            <p>Suggested success criteria would differ by audience — "external users" and "internal users" wanted different things:</p>
            <p><strong>External users</strong> — latency, uptime, self-service onboarding completion rate, API adoption.</p>
            <p><strong>Internal users</strong> — control, traceability, regulatory audit readiness, operational defect rate.</p>
            <p><strong>Business</strong> — feature delivery time, scope-change rate, client churn during migration.</p>
          </div>
          <p class="case-learning">
            <strong>Learning:</strong> Instrument partner-facing telemetry from day one. Partner pain points that surface in support tickets for months are the ones a real-time dashboard would have caught immediately.
          </p>
        </div>
      </div>
    </article>

    <!-- ============ Case Study 3: Verisk Circular Navigator ============ -->
    <article class="case-study">
      <div class="case-study-header">
        <span class="case-number">03</span>
        <h3 class="case-title">Circular Navigator — 0-to-1 SaaS Analytics Platform</h3>
        <div class="case-meta">
          <span class="case-company">Verisk Analytics</span>
          <span class="case-role">Technical Product Manager</span>
          <span class="case-dates">2018 – 2022</span>
        </div>
        <p class="case-intro">
          Took an acquired product from launch to <strong>$97M+ in revenue</strong> over 4 years. The acquisition gave Verisk the technology — <strong>but the technical PM doing the discovery, segmentation, and pricing work is what scaled it beyond a single-tier product for a narrow slice of the insurance market</strong>.
        </p>
      </div>

      <div class="case-metrics">
        <div class="metric"><span class="metric-value">$97M+</span><span class="metric-label">revenue over 4 years</span></div>
        <div class="metric"><span class="metric-value">2.8×</span><span class="metric-label">customer accounts in one year (50 → 140)</span></div>
        <div class="metric"><span class="metric-value">60%</span><span class="metric-label">revenue growth in year one</span></div>
        <div class="metric"><span class="metric-value">3 tiers</span><span class="metric-label">subscription pricing model launched</span></div>
      </div>

      <div class="case-sections">
        <div class="case-section">
          <h3><span class="section-num">1</span> The Problem</h3>
          <p>
            Verisk acquired an Irish startup with a data product that tracked insurance-industry activity — speeding tickets, claims, regulatory changes — for insurers like USAA, AAA, and GEICO. The product had strong data but <strong>no product strategy: one pricing tier, one customer segment, and no clear path to scale</strong>.
          </p>
          <p>
            The market opportunity was real but unaddressed: small-to-mid-market insurers were underserved by enterprise-grade analytics tools priced for Fortune 100 carriers. Vision: double customer adoption and grow revenue.
          </p>
        </div>

        <div class="case-section">
          <h3><span class="section-num">2</span> The Customers</h3>
          <ul>
            <li><strong>Enterprise insurers</strong> — USAA, AAA, GEICO — needed deep data access and custom integrations.</li>
            <li><strong>Mid-market insurers</strong> — underserved by existing tools; needed the same insights at a lower price point with faster time-to-value.</li>
            <li><strong>Technical teams at insurer clients</strong> — wanted raw API access to pipe data into their own ecosystems, not just a UI.</li>
          </ul>
          <blockquote class="case-quote">
            <p>Customers were paying full price for features they never used. Different customers had fundamentally different needs — but we were selling them the same product. I validated this with the data science team.</p>
          </blockquote>
        </div>

        <div class="case-section">
          <h3><span class="section-num">3</span> The Solution I Owned</h3>
          <p>I ran a two-phase discovery-to-launch process:</p>
          <ul>
            <li><strong>Problem discovery:</strong> competitive analysis to identify the SMB gap, plus customer interviews that surfaced two pain points — UI limitations slowing decisions, and pricing misaligned to actual usage.</li>
            <li><strong>Solution discovery:</strong> redesigned UI with a design workshop (wireframes, mocks, key customers, design and tech leads), and launched a three-tier subscription model based on usage-pattern segmentation.</li>
            <li><strong>Go-to-market:</strong> partnered with sales and marketing for insurance-industry conference promotion, channel sales to Verisk's existing customer base, and a one-month free trial.</li>
            <li><strong>Later pivot:</strong> identified the API-as-a-Service opportunity — opened direct API access for technical clients, creating an entirely new revenue stream.</li>
          </ul>
        </div>

        <div class="case-section">
          <h3><span class="section-num">4</span> Results & Measurement</h3>
          <p>
            In one year, customer accounts grew <strong>2.8×</strong> (50 → 140) and revenue grew by <strong>60%</strong>. Over four years, the product generated <strong>$97M+</strong> in revenue.
          </p>
          <div class="case-measurement">
            <span class="case-measurement-label">Proposed measurement approach — awaiting confirmation</span>
            <p><strong>Adoption:</strong> new customers onboarded through each sales and marketing channel.</p>
            <p><strong>Conversion:</strong> customers moving from basic to premium tiers.</p>
            <p><strong>Churn:</strong> customers lost ÷ total customers.</p>
            <p><strong>CAC:</strong> sales & marketing cost ÷ new customers acquired.</p>
          </div>
          <p class="case-learning">
            <strong>Learning:</strong> Tiered pricing can cannibalize adjacent subscription products — worth accepting to reach a new segment, but build the migration path for overlapping customers up front.
          </p>
        </div>
      </div>
    </article>

    <!-- ============ Case Study 4: Verisk UX Unification ============ -->
    <article class="case-study">
      <div class="case-study-header">
        <span class="case-number">04</span>
        <h3 class="case-title">UX Unification & Growth — Acquired Product Integration</h3>
        <div class="case-meta">
          <span class="case-company">Verisk Analytics</span>
          <span class="case-role">Technical Product Manager</span>
          <span class="case-dates">2018 – 2022</span>
        </div>
        <p class="case-intro">
          Brought an acquired analytics product onto Verisk's design standard without losing the customers attached to the old interface. A pure engineering team could have shipped the redesign — <strong>but the technical PM running the customer research, A/B testing, and stakeholder management is what kept adoption intact through the transition</strong>.
        </p>
      </div>

      <div class="case-metrics case-metrics-2">
        <div class="metric"><span class="metric-value">90%</span><span class="metric-label">customer satisfaction</span></div>
      </div>

      <div class="case-sections">
        <div class="case-section">
          <h3><span class="section-num">1</span> The Problem</h3>
          <p>
            Verisk had acquired multiple products over the years, each with its own interface, conventions, and customer base. The acquired analytics product looked and felt like a legacy tool. Users struggled with data visualization for quick decisions — <strong>a direct barrier to adoption and expansion</strong>.
          </p>
          <p>
            The risk: long-tenured customers were attached to the old interface. A forced redesign without evidence would have driven churn.
          </p>
        </div>

        <div class="case-section">
          <h3><span class="section-num">2</span> The Customers</h3>
          <ul>
            <li><strong>Mid-market insurer analysts</strong> — primary users; needed faster decision-making from data.</li>
            <li><strong>Enterprise customer stakeholders</strong> — attached to the existing interface; skeptical of change.</li>
            <li><strong>Verisk platform teams</strong> — needed the acquired product to conform to the company-wide design system for maintainability and cross-sell.</li>
          </ul>
        </div>

        <div class="case-section">
          <h3><span class="section-num">3</span> The Solution I Owned</h3>
          <ul>
            <li><strong>Empathy mapping and customer interviews</strong> — surfaced what users actually needed versus what the old interface provided.</li>
            <li><strong>Design workshop</strong> with key customers, design leads, and tech leads — wireframes and mocks co-created, not imposed.</li>
            <li><strong>A/B testing</strong> — ran the old and new interfaces head-to-head with real user cohorts before full rollout.</li>
            <li><strong>Stakeholder management</strong> — convinced skeptical customers and internal teams using the A/B test data and user-interview findings.</li>
          </ul>
        </div>

        <div class="case-section">
          <h3><span class="section-num">4</span> Results & Measurement</h3>
          <p>
            Customer satisfaction rose to <strong>90%</strong> after normalizing the acquired product onto Verisk's design standard. The UX work was part of the same broader initiative that took the product to <strong>$97M+</strong> in revenue over four years.
          </p>
          <div class="case-measurement">
            <span class="case-measurement-label">Proposed measurement approach — awaiting confirmation</span>
            <p><strong>Satisfaction:</strong> customer satisfaction before and after the redesign.</p>
            <p><strong>Adoption & retention:</strong> active usage by customer segment and churn rate through the migration.</p>
          </div>
          <p class="case-learning">
            <strong>Learning:</strong> Bring compliance and security stakeholders into the design process early. Late-stage requirements are the most expensive kind of rework.
          </p>
        </div>
      </div>
    </article>

  </div>
</section>

<!-- ============ About ============ -->
<section class="about" id="about">
  <div class="container-wide">
    <h2>About</h2>
    <div class="about-grid">
      <div class="about-body">
        <p>
          I'm a <strong>technical product manager</strong> with a software engineering foundation. I started my career building systems for the NYC Department of Education and NYPD, then moved into technical leadership at Verisk Analytics, and for the past four years have led product at Bank of America.
        </p>
        <p>
          What I do best: take an ambiguous, technically complex problem — an agentic AI system, a legacy platform migration, an acquired product with no strategy — and turn it into a shipped product with measurable business impact. I write the PRDs, run the discovery, make the prioritization calls, and own the metrics.
        </p>
        <p>
          I work at the intersection of <strong>AI/ML, cloud infrastructure, and B2B SaaS</strong> — industries where the technical decisions and the business decisions can't be separated.
        </p>
        <p>
          Beyond the day job, I'm a Certified Scrum Master (Scrum Alliance) and hold a Databricks Lakehouse Fundamentals certification. I'm currently exploring consulting engagements and fractional product leadership work alongside full-time opportunities.
        </p>
      </div>
      <div class="about-skills">
        <div class="skill-group">
          <p class="skill-group-label">Product</p>
          <div class="skill-pills">
            <span class="pill">Roadmap Strategy</span>
            <span class="pill">PLG</span>
            <span class="pill">GTM</span>
            <span class="pill">PRD Writing</span>
            <span class="pill">OKRs & KPIs</span>
            <span class="pill">A/B Testing</span>
          </div>
        </div>
        <div class="skill-group">
          <p class="skill-group-label">Technical</p>
          <div class="skill-pills">
            <span class="pill">RAG</span>
            <span class="pill">MCP</span>
            <span class="pill">Kafka</span>
            <span class="pill">Kubernetes</span>
            <span class="pill">Terraform</span>
            <span class="pill">AWS</span>
            <span class="pill">Java</span>
            <span class="pill">Node.js</span>
            <span class="pill">SQL</span>
          </div>
        </div>
        <div class="skill-group">
          <p class="skill-group-label">Domain</p>
          <div class="skill-pills">
            <span class="pill">Fraud & Risk</span>
            <span class="pill">Capital Markets</span>
            <span class="pill">Insurance</span>
            <span class="pill">Regulatory Compliance</span>
            <span class="pill">SaaS B2B/B2C</span>
          </div>
        </div>
        <div class="skill-group">
          <p class="skill-group-label">Education & Certifications</p>
          <div class="skill-pills">
            <span class="pill">Bachelor's in Computer Information Systems — City University of New York</span>
            <span class="pill">Certified Scrum Master</span>
            <span class="pill">Databricks Lakehouse</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============ Services ============ -->
<section class="services" id="services">
  <div class="container-wide">
    <h2>How I Can Help</h2>
    <p class="services-lede">
      Available for consulting, fractional product leadership, and contract work — alongside full-time senior PM roles.
    </p>
    <div class="services-grid">
      <div class="service-card">
        <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M12 2 L2 7 L12 12 L22 7 Z" />
          <path d="M2 12 L12 17 L22 12" />
          <path d="M2 17 L12 22 L22 17" />
        </svg>
        <h3>AI Product Strategy</h3>
        <p>Take an AI idea from concept to production. Discovery, model selection trade-offs, evaluation design, and the metrics that prove it works. Specialized in agentic systems and RAG.</p>
      </div>
      <div class="service-card">
        <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3 V21" />
          <path d="M3 9 H21" />
        </svg>
        <h3>Platform Modernization</h3>
        <p>Move legacy systems to cloud-native architectures without losing customers. API-first design, migration sequencing, and the compliance work that regulated industries require.</p>
      </div>
      <div class="service-card">
        <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M3 17 L6 17 L9 10 L12 21 L15 6 L18 17 L21 17" />
        </svg>
        <h3>0-to-1 Product Launch</h3>
        <p>Validate an idea, define an MVP, price it, and take it to market. Customer discovery, segmentation, pricing strategy, and go-to-market execution.</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ Contact ============ -->
<section class="contact" id="contact">
  <div class="container">
    <h2>Let's Talk</h2>
    <p>Whether you're hiring a senior technical PM or need help shipping a product — reach out.</p>
    <div class="contact-options">
      <div class="contact-card contact-card-unified">
        <div class="contact-audience">
          <h3>Hiring a Product Leader?</h3>
          <p>Full-time senior technical PM roles in AI/ML, fintech, or SaaS. Resume and references available on request.</p>
        </div>
        <div class="contact-audience">
          <h3>Need a Consultant?</h3>
          <p>Contract, fractional, or project-based work. AI product strategy, platform modernization, or 0-to-1 launches.</p>
        </div>
        <div class="contact-links" aria-label="Contact links">
          <button class="contact-email-link" type="button" data-contact-open data-inquiry-type="Portfolio inquiry">Email</button>
          <a href="https://www.linkedin.com/in/brijesh-soni/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  </div>
</section>

</main>

<button class="back-to-top" id="backToTop" type="button" aria-label="Scroll to top" title="Back to top" hidden>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 19V5"></path>
    <path d="m6 11 6-6 6 6"></path>
  </svg>
</button>

<dialog class="contact-dialog" id="contactDialog" aria-labelledby="contactDialogTitle">
  <div class="contact-dialog-header">
    <div>
      <p class="section-eyebrow">Get in touch</p>
      <h2 id="contactDialogTitle">Send me a message</h2>
    </div>
  </div>
  <form class="contact-form" id="contactForm" method="post" target="contactFormResponse">
    <input type="hidden" name="inquiryType" id="contactInquiryType">
    <input type="hidden" name="submissionToken" id="contactSubmissionToken">
    <div class="contact-form-trap" aria-hidden="true">
      <label for="contactWebsite">Leave this field empty</label>
      <input id="contactWebsite" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>
    <label for="contactName">Your name</label>
    <input id="contactName" name="name" type="text" autocomplete="name" maxlength="100" required>
    <label for="contactEmail">Email address</label>
    <input id="contactEmail" name="email" type="email" autocomplete="email" maxlength="254" required>
    <label for="contactMessage">Your query</label>
    <textarea id="contactMessage" name="message" rows="5" maxlength="5000" required></textarea>
    <p class="contact-form-status" id="contactFormStatus" role="status" aria-live="polite"></p>
    <div class="contact-form-actions">
      <button class="btn btn-outline" id="contactCancel" type="button">Cancel</button>
      <button class="btn btn-primary" id="contactSubmit" type="submit">Submit</button>
    </div>
  </form>
</dialog>
<p class="contact-success-toast" id="contactSuccessToast" role="status" aria-live="polite" hidden></p>
<iframe class="contact-form-response" name="contactFormResponse" title="Contact form response"></iframe>

<footer class="site-footer">
  <div class="container">
    © 2026 Brijesh Soni. Built with care.
    <button class="analytics-settings" id="analyticsSettings" type="button">Privacy settings</button>
  </div>
</footer>
