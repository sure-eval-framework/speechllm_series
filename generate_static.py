#!/usr/bin/env python3
"""
Static site generator for Speech LLM Arena
Generates a complete static HTML website from YAML data
"""

import yaml
import re
from datetime import datetime

# Read the models data
with open('_data/models.yml', 'r', encoding='utf-8') as f:
    data = yaml.safe_load(f)
    models = data['models']

# Sort models by year (descending)
models_sorted = sorted(models, key=lambda x: x['year'], reverse=True)

# Generate model cards HTML
def generate_model_card(model):
    # Determine open source badge
    open_source_badge = ""
    if model.get('open_source', False):
        open_source_badge = '''
        <div class="open-source-badge" title="Open Source">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10z"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <span>Open Source</span>
        </div>
        '''
    
    # Generate tasks tags
    tasks_html = ""
    for task in model.get('tasks', []):
        tasks_html += f'<span class="task-tag">{task}</span>'
    
    # Generate language tags
    languages_html = ""
    for lang in model.get('languages', []):
        languages_html += f'<span class="lang-tag">{lang}</span>'
    
    # Generate links
    links_html = ""
    if model.get('paper_url'):
        links_html += f'''
        <a href="{model['paper_url']}" class="link-btn paper" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          Paper
        </a>
        '''
    
    if model.get('github_url'):
        stars = model.get('github_stars', 0)
        stars_text = f"⭐ {stars}" if stars > 0 else "Code"
        links_html += f'''
        <a href="{model['github_url']}" class="link-btn github" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          {stars_text}
        </a>
        '''
    
    if model.get('demo_url'):
        links_html += f'''
        <a href="{model['demo_url']}" class="link-btn demo" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="10 8 16 12 10 16 10 8"/>
          </svg>
          Demo
        </a>
        '''
    
    if model.get('huggingface_url'):
        links_html += f'''
        <a href="{model['huggingface_url']}" class="link-btn huggingface" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          🤗 HF
        </a>
        '''
    
    # Generic weights button (for ModelScope, Dropbox, Zenodo, etc.)
    if model.get('weights_url'):
        links_html += f'''
        <a href="{model['weights_url']}" class="link-btn weights" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Weights
        </a>
        '''
    
    # Architecture info
    arch_html = ""
    if model.get('architecture') and model['architecture'] != 'Unknown':
        params = model.get('parameters', '')
        params_text = f" ({params})" if params and params != 'Unknown' else ""
        arch_html = f'<p class="architecture">⚙️ {model["architecture"]}{params_text}</p>'
    
    # License
    license_html = ""
    if model.get('license') and model['license'] != 'Unknown':
        license_html = f'<span class="license">License: {model["license"]}</span>'
    
    card_html = f'''
    <div class="model-card" data-year="{model['year']}" data-institution="{model.get('institution', 'Unknown')}">
      <div class="card-header">
        <div class="model-name-wrapper">
          <h3 class="model-name">{model['name']}</h3>
          <span class="year-badge">{model['year']}</span>
        </div>
        {open_source_badge}
      </div>
      
      <div class="card-body">
        <p class="institution">🏛️ {model.get('institution', 'Unknown')}</p>
        {arch_html}
        
        <div class="tasks">
          {tasks_html}
        </div>
        
        <p class="description">{model.get('description', '')}</p>
        
        <div class="languages">
          {languages_html}
        </div>
      </div>
      
      <div class="card-footer">
        <div class="links">
          {links_html}
        </div>
        {license_html}
      </div>
    </div>
    '''
    
    return card_html

# Generate all cards
cards_html = ""
for model in models_sorted:
    cards_html += generate_model_card(model)

# Read SCSS and convert to CSS (basic conversion)
with open('assets/css/main.scss', 'r', encoding='utf-8') as f:
    scss_content = f.read()

# Simple SCSS to CSS conversion (remove nesting, convert variables)
css_content = """
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #7c3aed;
  --background: #ffffff;
  --surface: #f8fafc;
  --card: #ffffff;
  --text: #1e293b;
  --text-secondary: #64748b;
  --border: #e2e8f0;
  --radius: 12px;
  --radius-sm: 8px;
  --transition: all 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --surface: #1e293b;
    --card: #1e293b;
    --text: #f1f5f9;
    --text-secondary: #94a3b8;
    --border: #334155;
  }
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text);
  background: var(--background);
  min-height: 100vh;
}

.wrapper { display: flex; flex-direction: column; min-height: 100vh; }

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.site-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon { font-size: 32px; line-height: 1; }

.logo h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.025em;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 14px;
  transition: var(--transition);
}

.nav-link:hover {
  background: var(--card);
  color: var(--text);
}

.nav-link.active {
  background: var(--primary);
  color: white;
}

.main-content {
  flex: 1;
  padding: 40px 0;
}

.hero {
  text-align: center;
  padding: 60px 0;
  margin-bottom: 40px;
}

.hero h2 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.hero-description {
  font-size: 20px;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 40px;
}

.stat { text-align: center; }

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary);
  display: block;
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.models-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.model-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.model-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.model-name-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.model-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.01em;
}

.year-badge {
  background: var(--primary);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.open-source-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.card-body { flex: 1; }

.institution {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.architecture {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-family: 'Monaco', 'Consolas', monospace;
  background: var(--surface);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  display: inline-block;
  max-width: 100%;
  overflow-wrap: break-word;
}

.tasks {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.task-tag {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.lang-tag {
  background: var(--border);
  color: var(--text-secondary);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.card-footer {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  transition: var(--transition);
}

.link-btn.paper {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary);
}

.link-btn.paper:hover {
  background: var(--primary);
  color: white;
}

.link-btn.github {
  background: rgba(0, 0, 0, 0.08);
  color: var(--text);
}

.link-btn.github:hover {
  background: #333;
  color: white;
}

.link-btn.demo {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.link-btn.demo:hover {
  background: #10b981;
  color: white;
}

.link-btn.huggingface {
  background: rgba(255, 197, 92, 0.15);
  color: #d48900;
}

.link-btn.huggingface:hover {
  background: #ffbd2e;
  color: #000;
}

.link-btn.weights {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.link-btn.weights:hover {
  background: #3b82f6;
  color: white;
}

.license {
  font-size: 12px;
  color: var(--text-secondary);
  display: block;
  text-align: right;
}

.site-footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 40px 0;
  text-align: center;
}

.site-footer p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.stats-footer {
  font-size: 13px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .hero {
    padding: 40px 0;
  }
  
  .hero h2 {
    font-size: 32px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .models-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .model-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .nav-link {
    padding: 8px 12px;
    font-size: 13px;
  }
  
  .logo h1 {
    font-size: 20px;
  }
  
  .card-header {
    flex-direction: column;
    gap: 12px;
  }
  
  .open-source-badge {
    align-self: flex-start;
  }
}
"""

# Generate the complete HTML
html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Speech LLM Arena</title>
  <meta name="description" content="A curated collection of Speech Understanding Large Language Models">
  
  <meta property="og:title" content="Speech LLM Arena">
  <meta property="og:description" content="A curated collection of Speech Understanding Large Language Models">
  <meta property="og:type" content="website">
  
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎙️</text></svg>">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
{css_content}
  </style>
</head>
<body>
  <div class="wrapper">
    <header class="site-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">🎙️</span>
            <h1>Speech LLM Arena</h1>
          </div>
          <nav class="main-nav">
            <a href="#" class="nav-link active">Models</a>
            <a href="#about" class="nav-link">About</a>
            <a href="https://github.com/yourusername/speechllm_series" class="nav-link" target="_blank" rel="noopener">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <section class="hero">
        <div class="container">
          <h2>Speech LLM Arena</h2>
          <p class="hero-description">
            A comprehensive collection of Speech Understanding Large Language Models (Speech LLMs). 
            Explore the latest advances in speech processing, from early pioneers to cutting-edge multimodal systems.
          </p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">{len(models)}</span>
              <span class="stat-label">Models</span>
            </div>
            <div class="stat">
              <span class="stat-value">2022-2025</span>
              <span class="stat-label">Timeline</span>
            </div>
            <div class="stat">
              <span class="stat-value">∞</span>
              <span class="stat-label">Possibilities</span>
            </div>
          </div>
        </div>
      </section>
      
      <section class="models-section">
        <div class="container">
          <div class="models-grid">
{cards_html}
          </div>
        </div>
      </section>
    </main>
    
    <footer class="site-footer">
      <div class="container">
        <p>Speech LLM Arena &copy; 2025 | A curated collection of Speech Understanding Models</p>
        <p class="stats-footer">Total Models: {len(models)} | Last Updated: January 2025</p>
      </div>
    </footer>
  </div>
</body>
</html>'''

# Write the generated HTML
output_dir = '_site'
import os
os.makedirs(output_dir, exist_ok=True)

with open(f'{output_dir}/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Static site generated successfully!")
print(f"Location: {output_dir}/index.html")
print(f"Total models: {len(models)}")
