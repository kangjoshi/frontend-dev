### NPM
1. 스펙 관리
- Typescript, SASS 같은 고 수준 프로그래밍 언어 사용시 전용 트랜스파일러가 필요
2. 빌드, 테스트 자동화
- 프로젝트에서 사용중인 외부 라이브러리 다운로드하는 등 빌드시 자동화
3. 개발 환경
- 각 프레임워크에서 제공하는 도구를 사용하면 쉽게 개발환경 구축 가능
- 외부 디펜던시 관리

##### sementic version
- version 표기법 ^16.12.0
- 주, 부, 수 세가지 숫자를 조합하여 버전 관리
- 주(Major) : 기존 버전과 호환되지 않게 변경한 경우
- 부(Minor) : 주 버전과 호환되면서 기능이 추가된 경우
- 수(Patch) : 주+부 버전과 호환되면서 버그를 수정한 경우

##### version 범위
- 1.2.3 : 특정 버전
- 특정 버전보다 높거나 낮은 경우
  - \>1.2.3 
  - \>=1.2.3
  - <1.2.3
  - <=1.2.3
- ~1.2.3
  - 부(Minor) 버전이 명시되어 있으면 패치 버전을 변경 (~1.2.3은 1.2.3 부터 1.2.n까지)
  - Minor 버전이 없다면, Minor 버전 갱신 (~0은 0.0.0 부터 0.n.n까지)
- ^1.2.3
  - 정식 버전에서 부(Minor)와 수(Patch) 버전을 변경 
  - 정식 버전이 아닌 0.x 버전은 패치만 갱신 (^0은 0.0.0 부터 0.0.n까지)
  - NPM 패키지로 생성시 이 방식을 사용한다

---

##### javascript 모듈 스펙
1. CommonJS
  - exports 키워드로 모듈을 만들고 require() 함수로 불러 들이는 방식
  - 서버 환경 (Node.js)에서 주로 사용
  - ```javascript
        // A.js
        exports function sum(a, b) { return a + b; }
        // B.js
        const sum = require('./A.js');
        sum(1, 2); // 3
     ```
2. ES2015 표준 모듈 스펙
  - exports 키워드로 모듈을 만들고 import 키워드를 통해 부러 들이는 방식
  - ```javascript
        // A.js
        exports function sum(a, b) { return a + b; }
        // B.js
        import * as math from './A.js';  // import { sum } from './A.js'; 특정 함수만 가져오기 가능
        math.sum(1, 2); // 3 
     ```

### Webpack
  - 모든 브라우저에서 모듈을 지원 하는건 아님 webpack을 통해 이를 해결
  - 각 모듈을 하나의 파일로 번들링

##### 로더
  - 로더를 통해서 javascript 뿐만 아니라 css, font까지도 전부 모듈로 만들어 javascript 코드로 가져 올 수 있다
  - 자주 사용하는 로더
    - CSS 로더
      - CSS 파일을 javascript 모듈 처럼 사용할 수 있게 로딩
    - Style 로더
      - javascript 문자열인 Css 코드를 HTML에 주입할 수 있게 해줌
    - File 로더
      - File을 모듈 처럼 사용할 수 있게 로딩
    - Url 로더
      - File을 Base64로 인코딩 하여 처리, 제한을 두어 제한 범위 이상이면 File 로더로 처리 하도록 할 수 있음

##### 플러그인
  - 로더가 파일 단위로 처리하는 반면 플러그인은 번들된 결과물을 처리
  - 자주 사용하는 플러그인
    - 배너 플러그인
      - 결과물에 빌드 정보나 커밋 버전 같은 배너성 정보를 추가한다
    - Define 플러그인
      - 전역 변수를 설정할 수 있다.
      - 환경 의존적인 정보를 소스가 아닌 다른 설정 파일로 관리할 수 있도록 한다
    - HtmlTemplatePlugin
      - Html 처리

### Babel
  - 각 브라우저 마다 지원 스펙이 다르다. 이런 크로스 브라우징 이슈를 해결하기 위해 사용
  - ECMA2015 이상 스펙으로 작성된 코드를 모든 브라우저에서 동작하도록 호환성을 지켜준다
  - 동작 단계
    1. 파싱 (바벨 코어 담당)
       - 코드를 읽어 추상 구문 트리(컴파일을 위한 자료 구조)로 분해
    2. 변환 (바벨 plugin 담당)
       - 추상 구문 트리를 실제 코드로 변경
    3. 출력 (바벨 코어 담당)
       - 변경된 결과물을 출력
  - Preset
    - 목적에 맞게 여러가지 플로그인을 세트로 모아놓은 것
    - 자주 사용하는 Preset
      - preset-env
        - ECMAScript 2015+를 변환시 사용
      - preset-flow / preset-react / preset-typescript
        - 각 프레임워크로 변환시 사용
  - Polyfill
    - 바벨은 ECMAScript2015+ 코드중 ECMAScript5 버전으로 변환할 수 있는 코드만 변환한다.
      - (Promise는 ECMAScript5 버전으로 대체할 수 없음.)
    - 변환하지 못하는 것들은 Polyfill이라고 부르는 코드 조각을 추가하여 해결
  - 웹팩으로 통합
    - 바벨을 직접 사용하는 것 보다는 웹팩으로 통합해서 사용하는 것이 일반적
    - babel-loader를 웹팩에 로더로 등록하여 사용

### SASS
  - sass, scss 언어로 작성된 코드를 css로 변경
  - sass-loader를 통해 웹팩으로 통합

### ESLint
  - ECMAScript 코드에서 문제점을 검사, 정정
  - 검사 항목
    - 포맷팅
      - 코드 컨벤션
    - 코드 품질
      - 잠재적인 오류 발생 가능한 코드를 발견하여 오류 가능성을 줄인다.
  - 설정 파일
    - `npx eslint --init` 명령어를 통해 생성
  - 규칙
    - 코드 검사 규칙을 정의
    - Extensible Config
      - 미리 정의되어 있는 규칙 세트
  - 자동화
    - 코딩할 때 마다 수시로 실행해야 하므로 자동화를 하여 검사
      1. (깃 사용한다면)깃 훅
         - husky 모듈 사용

### Prettier
  - 코드를 일관적으로 만들어 준다. (ESLint 차이점은 기능에서 코드 품질 기능은 제외한 포맷팅 기능을 제공)
  - ESLint와 통합하여 사용 (eslint-config-prettier, eslint-plugin-prettier)
    - 코드 품질 : ESLint
    - 포맷팅 : Prettier