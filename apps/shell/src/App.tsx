import React from "react";
import ReactDOM from "react-dom";

import "@career-up/ui-kit/index.css";
import { Button, Icon } from "@career-up/ui-kit";

/**
 * 공통 모듈을 apps 에서 사용하기
 * - global.css
 * - Button
 * - Icon
 *
 * packges/ui-kit
 * - global.css 파일과 components 등 외에, App.tsx 등 파일은 불필요하므로 삭제
 * - package.json:
 *    - peerDependencies와 devDependencies에 eact + react-dom
 *    - pnpm build --watch 는 pnpm --filter @carerr-up/ui-kit build 로, 실시간 빌드할 수 있도록 스크립트 명령어를 추가했음
 * - vite.config 파일 살펴보기
 * - 빌드 폴더 이름은 dist
 *
 * - apps/shell
 * - webpack.config : "@career-up/ui-kit' 꼭 추가하기
 * - package.json: 스크립트 명령어 바뀐 부분
 */

const App = () => (
  <div className='container'>
    <div>Name: shell</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Empty CSS</div>
    <div>
      <Button>hello</Button>
    </div>
    <div>
      <Icon.Briefcase />
    </div>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
