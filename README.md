# sumin1371.github.io

개인 공부 노트와 CV를 올려 두는 사이트입니다. → https://sumin1371.github.io

- [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 문서 테마
- 수식: 문장 속은 `$x$`, 블록은 줄을 따로 쓴 `$$ ... $$` (remark-math + KaTeX)
- `main` 브랜치에 push 하면 GitHub Actions(`.github/workflows/pages.yml`)가 빌드하고 배포합니다.

## 구조

```
src/content/docs/index.mdx     홈 (소개, CV 링크)
src/content/docs/notes/dl1/    밑바닥부터 시작하는 딥러닝 1
src/content/docs/notes/dl2/    밑바닥부터 시작하는 딥러닝 2
public/cv.pdf                  CV
public/assets/notes/           원본 손글씨 노트 스캔
astro.config.mjs               사이트 설정, 사이드바
```

새 노트는 `src/content/docs/notes/` 아래에 `.md` 파일을 만들고 맨 위에 `title` 과 `sidebar.order` 를 적으면 사이드바에 자동으로 추가됩니다.

## 로컬 미리보기

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 빌드
```
