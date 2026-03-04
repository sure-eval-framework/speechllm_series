# AGENTS.md - Coding Guidelines for Speech LLM Arena

## Build Commands

### Jekyll (Primary)
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Build with draft posts
bundle exec jekyll build --drafts
```

### Python Static Generator (Alternative)
```bash
# Generate standalone static HTML
python generate_static.py
```

### Testing
**No testing framework configured** - This is a static Jekyll site. Test by:
1. Running `bundle exec jekyll serve`
2. Opening http://localhost:4000/speechllm_series/
3. Manually verifying pages render correctly

---

## Code Style Guidelines

### General
- **Indentation**: 2 spaces (all file types)
- **Line endings**: LF (Unix-style)
- **Max line length**: 100 characters
- **Trailing whitespace**: Remove before committing

### Jekyll/Liquid Templates
```liquid
<!-- Use 2-space indentation -->
{% if condition %}
  {{ variable | filter }}
{% endif %}

<!-- Use relative_url filter for all internal links -->
<a href="{{ '/about' | relative_url }}">About</a>

<!-- Include files from _includes/ -->
{% include filename.html %}
```

### YAML Data Files (_data/)
```yaml
# Use 2-space indentation
# Group related entries with comments
models:
  - name: "Model Name"
    year: 2024
    institution: "Organization"
    tasks: ["Task1", "Task2"]
    open_source: true
```

### SCSS/CSS
```scss
// Use nested SCSS syntax with 2-space indentation
.component {
  property: value;
  
  &:hover {
    property: value;
  }
  
  .child-element {
    property: value;
  }
}

// Use CSS custom properties (variables)
color: var(--primary);
```

### Python
```python
# 4-space indentation for Python
# Use snake_case for variables and functions
def generate_model_card(model):
    open_source_badge = ""
    if model.get('open_source', False):
        # Use .get() with defaults for optional fields
        pass
```

### HTML
```html
<!-- Use semantic HTML5 elements -->
<header class="site-header">
  <nav class="main-nav">
    <a href="..." class="nav-link">Link</a>
  </nav>
</header>

<!-- Always include alt text for images -->
<img src="..." alt="Description">

<!-- External links: use target="_blank" rel="noopener" -->
<a href="..." target="_blank" rel="noopener">External Link</a>
```

---

## Naming Conventions

### CSS Classes
- Use **kebab-case**: `.model-card`, `.hero-stats`
- Use BEM-like naming for components: `.card-header`, `.card-body`
- State modifiers: `.active`, `.open-source-badge`

### Files and Directories
- **Jekyll conventions**:
  - `_layouts/` - Layout templates
  - `_includes/` - Reusable components
  - `_data/` - YAML data files
  - `assets/css/` - Stylesheets
- **Filenames**: Use lowercase with hyphens: `model-card.html`, `main.scss`

### Variables
- **YAML keys**: Use snake_case: `github_url`, `open_source`
- **Liquid variables**: Use snake_case: `sorted_models`
- **CSS variables**: Use kebab-case: `--primary-dark`, `--text-secondary`

---

## Project Structure

```
speechllm_series/
├── _config.yml              # Jekyll configuration
├── Gemfile                  # Ruby dependencies
├── _data/
│   └── models.yml          # Speech LLM data
├── _includes/
│   ├── head.html           # HTML head template
│   └── model-card.html     # Model card component
├── _layouts/
│   └── default.html        # Default page layout
├── assets/
│   └── css/
│       └── main.scss       # Main stylesheet
├── index.html              # Homepage
├── about.md               # About page
└── generate_static.py     # Python generator script
```

---

## Key Dependencies

- **Jekyll**: ~4.3.0
- **Plugins**: jekyll-sitemap
- **Markdown**: kramdown
- **Syntax Highlighter**: rouge

---

## Notes

- No linting tools configured - follow style guidelines manually
- No CI/CD configured - deploy manually to GitHub Pages
- Site designed for GitHub Pages with baseurl: `/speechllm_series`
- Dark mode supported via `prefers-color-scheme: dark`
