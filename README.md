# 모노레포 설계

## 모노레포 환경 구축 (turborepo, pnpm)

- Source Code (<https://github.com/fc-micro-frontends/career-up/tree/step1>)

- Notion Guide (<https://2woongjae.notion.site/turborepo-pnpm-b31ab8ac4cd940d58660c01258a9cbc2>)

## 패키지 설계

- **_@career-up/ui-kit_**
  - 기본적인 전역 스타일 설정과 통일감을 주기 위한 컴포넌트
- **_@career-up/shell-router_**
  - shell 과 마이크로 앱을 원할히 연결해주기 위한 기능을 가집니다
  - 라우팅 처리와 인증 정보의 교환이라는 기능을 위해 여러 훅과 컴포넌트, 팩토리 함수를 가집니다.

**_UI 라이브러리 패키지 생성 및 설정_**

- Source Code (<https://github.com/fc-micro-frontends/career-up/tree/step2>)
- Notion Guide (<https://2woongjae.notion.site/UI-2ff9ecb4a6244a3bb58f060cc110f9d9>)

**_컴포넌트 제작 및 빌드_**

- Source Code (<https://github.com/fc-micro-frontends/career-up/tree/step3>)
- Notion Guide (<https://2woongjae.notion.site/e0ae164cd080463f8a6614bfc848a66a>)
