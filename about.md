---
layout: default
title: About - Speech LLM Arena
description: Learn about the Speech LLM Arena project and how to contribute
---

<div class="about-content">
  <div class="container">
    <h2>About Speech LLM Arena</h2>
    
    <p>
      <strong>Speech LLM Arena</strong> is a curated collection of Speech Understanding Large Language Models 
      (Speech LLMs). Our goal is to provide a comprehensive overview of the rapidly evolving field of 
      speech-language models, from early research prototypes to production-ready systems.
    </p>
    
    <p>
      The field of Speech LLMs has experienced explosive growth since 2023, with models like Pengi, SALMONN, 
      and Qwen-Audio pushing the boundaries of what's possible in speech understanding, recognition, and 
      generation. This project aims to catalog these developments in an accessible, well-organized format.
    </p>
    
    <h3>What We Track</h3>
    <p>
      Each model in our collection includes detailed metadata such as:
    </p>
    <ul style="margin-left: 24px; color: var(--text-secondary); line-height: 1.8;">
      <li>Release year and developing institution</li>
      <li>Model architecture and parameter count</li>
      <li>Supported tasks (ASR, TTS, speech understanding, etc.)</li>
      <li>Open source status and licensing</li>
      <li>Language support and multilingual capabilities</li>
      <li>Performance benchmarks on standard datasets</li>
      <li>Links to papers, code repositories, and demos</li>
    </ul>
    
    <h3>Coverage</h3>
    <p>
      Our collection spans from early 2023 pioneers like WavPrompt and SALMONN to the latest 2025 releases 
      including Qwen3-Omni and Step-Audio 2. We focus on models that bridge the gap between speech processing 
      and large language models, enabling end-to-end speech understanding and generation.
    </p>
    
    <div class="contribute-section">
      <h3>How to Contribute</h3>
      <p>
        Speech LLM Arena is an open project. We welcome contributions from the community! To add or update 
        a model:
      </p>
      <ol>
        <li>Fork the repository on GitHub</li>
        <li>Edit the <code>_data/models.yml</code> file to add your model information</li>
        <li>Submit a pull request with a clear description of your changes</li>
      </ol>
      <p style="margin-top: 16px;">
        Please ensure all information is accurate and include links to official papers and repositories 
        where available.
      </p>
    </div>
    
    <h3>Citation</h3>
    <p>
      The data collection and categorization in this project is based on the comprehensive survey paper:
    </p>
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin: 20px 0;">
      <p style="margin-bottom: 12px; font-weight: 600; color: var(--text);">
        📄 <a href="https://arxiv.org/abs/2410.18908" target="_blank" rel="noopener" style="color: var(--primary); text-decoration: none;">A Survey on Speech Large Language Models for Understanding</a>
      </p>
      <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">
        <strong>IEEE Journal of Selected Topics in Signal Processing</strong>, 2025, pp. 1-32
      </p>
      <p style="color: var(--text-secondary); font-size: 13px; line-height: 1.6;">
        <strong>Authors:</strong> Jing Peng, Yucheng Wang, Bohan Li, Yiwei Guo, Hankun Wang, YanGui Fang, Yu Xi, Haoyu Li, Xu Li, Ke Zhang, Shuai Wang, Kai Yu
      </p>
      <p style="color: var(--text-secondary); font-size: 13px; margin-top: 8px;">
        <strong>DOI:</strong> <a href="https://doi.org/10.1109/JSTSP.2025.3640535" target="_blank" rel="noopener" style="color: var(--primary);">10.1109/JSTSP.2025.3640535</a>
      </p>
    </div>
    
    <h4>BibTeX</h4>
    <pre style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 16px; overflow-x: auto; font-size: 13px; line-height: 1.5; color: var(--text-secondary);"><code>@ARTICLE{11278041,
  author={Peng, Jing and Wang, Yucheng and Li, Bohan and Guo, Yiwei and Wang, Hankun and Fang, YanGui and Xi, Yu and Li, Haoyu and Li, Xu and Zhang, Ke and Wang, Shuai and Yu, Kai},
  journal={IEEE Journal of Selected Topics in Signal Processing}, 
  title={A Survey on Speech Large Language Models for Understanding}, 
  year={2025},
  volume={},
  number={},
  pages={1-32},
  keywords={Semantics;Surveys;Speech processing;Cognition;Training;Linguistics;Taxonomy;Large language models;Pipelines;Data mining;Large Language Models;Speech Understanding},
  doi={10.1109/JSTSP.2025.3640535}
}</code></pre>
    
    <h3>Acknowledgments</h3>
    <p>
      This project is inspired by the amazing work of researchers and engineers worldwide who are advancing 
      the field of speech and language understanding. We thank the open source community for making many of 
      these models accessible to everyone.
    </p>
    
    <p style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); color: var(--text-secondary); font-size: 14px; font-style: italic;">
      <strong>Data Source:</strong> All model statistics and architecture details are curated from the survey paper "A Survey on Speech Large Language Models for Understanding" (IEEE JSTSP 2025).
    </p>
  </div>
</div>