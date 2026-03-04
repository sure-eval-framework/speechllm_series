# Speech LLM Arena

A curated collection of **Speech Understanding Large Language Models** (Speech LLMs).

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://sure-eval-framework.github.io/speechllm_series)
[![Models](https://img.shields.io/badge/Models-36-blue)](https://sure-eval-framework.github.io/speechllm_series)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🌐 Live Demo

Visit the live website: **[Speech LLM Arena](https://sure-eval-framework.github.io/speechllm_series)**

## 📋 Overview

This project catalogs **36 Speech LLMs** spanning from 2022 to 2025, including:

- **2022**: Early pioneers (WavPrompt)
- **2023**: Foundation models (Pengi, SALMONN, Qwen-Audio, PandaGPT)
- **2024**: Improved architectures (Qwen2-Audio, WavLLM, Audio Flamingo 2)
- **2025**: Cutting-edge systems (Qwen3-Omni, Kimi-Audio, Step-Audio 2)

## 📚 Citation

The data collection and taxonomy in this project are based on our comprehensive survey paper:

> **A Survey on Speech Large Language Models for Understanding**  
> Jing Peng, Yucheng Wang, Bohan Li, Yiwei Guo, Hankun Wang, YanGui Fang, Yu Xi, Haoyu Li, Xu Li, Ke Zhang, Shuai Wang, Kai Yu  
> *IEEE Journal of Selected Topics in Signal Processing*, 2025, pp. 1-32  
> [![arXiv](https://img.shields.io/badge/arXiv-2410.18908-red)](https://arxiv.org/abs/2410.18908) [![DOI](https://img.shields.io/badge/DOI-10.1109/JSTSP.2025.3640535-blue)](https://doi.org/10.1109/JSTSP.2025.3640535)

### BibTeX

```bibtex
@ARTICLE{11278041,
  author={Peng, Jing and Wang, Yucheng and Li, Bohan and Guo, Yiwei and Wang, Hankun and Fang, YanGui and Xi, Yu and Li, Haoyu and Li, Xu and Zhang, Ke and Wang, Shuai and Yu, Kai},
  journal={IEEE Journal of Selected Topics in Signal Processing}, 
  title={A Survey on Speech Large Language Models for Understanding}, 
  year={2025},
  volume={},
  number={},
  pages={1-32},
  keywords={Semantics;Surveys;Speech processing;Cognition;Training;Linguistics;Taxonomy;Large language models;Pipelines;Data mining;Large Language Models;Speech Understanding},
  doi={10.1109/JSTSP.2025.3640535}
}
```

## 🏗️ Project Structure

```
speechllm_series/
├── _config.yml              # Jekyll configuration
├── _data/
│   └── models.yml           # All model data (36 models with full metadata)
├── _includes/
│   ├── head.html            # HTML head template
│   └── model-card.html      # Model card component
├── _layouts/
│   └── default.html         # Default page layout
├── assets/
│   └── css/
│       └── main.scss        # Styles (light/dark mode)
├── index.html               # Homepage with model grid
├── about.md                 # About page
├── README.md                # This file
└── LICENSE                  # MIT License
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/speechllm_series.git
   cd speechllm_series
   ```

2. **Install Jekyll** (if not already installed)
   ```bash
   gem install bundler jekyll
   ```

3. **Install dependencies**
   ```bash
   bundle install
   ```

4. **Run locally**
   ```bash
   bundle exec jekyll serve
   ```

5. **Open in browser**
   ```
   http://localhost:4000/speechllm_series/
   ```

### GitHub Pages Deployment

1. Push to GitHub
2. Go to **Settings > Pages**
3. Select **Source: Deploy from a branch**
4. Choose **main** branch and **/(root)** folder
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/speechllm_series`

## 📝 Data Format

Models are defined in `_data/models.yml` with the following schema:

```yaml
- name: "Model Name"
  year: 2024
  institution: "University/Company"
  tasks: ["ASR", "Speech Understanding", "TTS"]
  architecture: "Encoder + Adapter + LLM"
  parameters: "7B"
  open_source: true
  github_url: "https://github.com/..."
  github_stars: 1000
  paper_url: "https://arxiv.org/abs/..."
  demo_url: "https://demo.example.com"
  huggingface_url: "https://huggingface.co/..."
  license: "Apache-2.0"
  languages: ["English", "Chinese", "Multilingual"]
  performance:
    - metric: "WER"
      value: "3.2%"
      dataset: "LibriSpeech"
  description: "Brief description of the model"
```

## 🛠️ Customization

### Adding a New Model

1. Open `_data/models.yml`
2. Add a new entry following the existing format
3. Include all relevant metadata:
   - **Architecture**: Encoder / Adapter / Decoder breakdown
   - **URLs**: Paper, GitHub, Demo, HuggingFace
   - **Tasks**: ASR, TTS, Speech Understanding, etc.
   - **License**: Open source status
4. Commit and push - changes go live automatically!

### Modifying Styles

Edit `assets/css/main.scss` to customize:
- Colors and themes
- Card layouts
- Typography
- Responsive breakpoints

The site supports automatic dark mode based on system preferences.

## 📊 Model Statistics

| Year | Count | Notable Models | Open Source |
|------|-------|----------------|-------------|
| 2022 | 1 | WavPrompt | ✅ Yes |
| 2023 | 10 | Pengi, SALMONN, Qwen-Audio, LTU | 70% Open |
| 2024 | 16 | Qwen2-Audio, WavLLM, Audio Flamingo 2, DeSTA2 | 44% Open |
| 2025 | 9 | Qwen3-Omni, Kimi-Audio, Step-Audio 2 | 33% Open |

## 🔗 Quick Links by Category

### ASR Focused
- SALMONN, LTU-AS, SLAM-ASR, FireRedASR-LLM, SeedASR

### Audio Understanding
- Audio Flamingo (1, 2, 3), LTU, Pengi

### Multilingual/Multimodal
- Qwen-Audio series, PandaGPT, Qwen-Omni series

### Industrial Models
- SeedASR (ByteDance), Kimi-Audio (Moonshot), Step-Audio 2 (StepFun)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-model`)
3. Add your changes following the data format above
4. Commit (`git commit -m 'Add: New Speech LLM'`)
5. Push to the branch (`git push origin feature/add-model`)
6. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- All the amazing researchers and engineers developing Speech LLMs
- The open source community for making many of these models accessible
- Jekyll and GitHub Pages for making hosting free and easy
- HuggingFace for hosting model weights and demos

## 📬 Contact

For questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ for the Speech AI community

**Last Updated**: January 2025 | **Total Models**: 36

> **Data Source:** All model statistics and architecture details are curated from "A Survey on Speech Large Language Models for Understanding" (IEEE JSTSP 2025). If you use this dataset in your research, please cite our survey paper.
