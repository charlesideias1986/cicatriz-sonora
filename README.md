# Cicatriz Sonora

Landing page PT-BR do estúdio **Cicatriz Sonora** — memórias audiovisuais que encontram uma forma de continuar vivas.

## Stack

- HTML + CSS + JS puro
- Sem build, sem frameworks, sem dependências npm
- Publicado no GitHub Pages a partir da raiz do repositório

## Estrutura

```
index.html    # marcação da página
styles.css    # tokens de design + estilos
script.js     # interações (progressivo)
assets/       # imagens e mídia
```

## Design tokens

| Token        | Valor                        |
| ------------ | ---------------------------- |
| `--bg`       | `#0A0A0C`                    |
| `--ink`      | `#F2EFE9`                    |
| `--accent`   | `#A46BA8`                    |
| `--accent-2` | `#8A2E2E`                    |
| `--sans`     | Manrope                      |
| `--wrap`     | `1080px`                     |
| `--gutter`   | `clamp(1.25rem, 5vw, 4rem)`  |

## Desenvolvimento local

Qualquer servidor estático na raiz do projeto:

```powershell
npx --yes serve -l 5500 .
```
