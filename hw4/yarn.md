# Yarn

## 🏠 yarn이란?

<br>

> JavaScript 패키지 매니저로, npm(Node Package Manager)과 유사한 기능을 제공한다.  
> npm의 단점을 해결하고 개선했다.

<br>

### ✨ [Yarn과 npm의 차이점(장점)](https://www.sitepoint.com/yarn-vs-npm/):

- 설치 및 의존성 해결 방식: Yarn은 패키지를 병렬로 다운로드하고 설치하여 npm보다 더 빠른 속도로 의존성을 해결한다.
- 빌드의 반복 가능성: Yarn은 yarn.lock 파일을 사용하여 의존성 트리를 관리하므로, 다른 환경에서 프로젝트를 실행하거나 빌드할 때도 동일한 패키지 버전을 사용할 수 있어 반복 가능한 빌드를 가능하게 한다.
- 보안 및 안정성: Yarn은 패키지의 무결성을 검증하고 보고하여 보다 안정적인 의존성 관리를 제공하며, 패키지의 보안 취약점을 감지하고 보고하는 기능을 제공하여 보다 안전한 개발 환경을 조성한다.

### 😒 단점

- Yarn은 npm에 비해 더 큰 용량을 차지한다.

### 😎 주요 명령어

- yarn init: package.json 파일 생성
- yarn add [package]: package 설치
  - yarn global add [package]: package 전역 설치
- yarn remove [package]: package 제거
- yarn upgrade [package]: package 업그레이드
- yarn install: package 설치
- yarn cache clean: 캐시 삭제
- yarn list: 설치된 패키지 목록 출력
- yarn outdated: 업데이트가 필요한 패키지 목록 출력
- yarn run [script]: package.json에 정의된 script 실행

### 🔒 yarn.lock

- yarn.lock 파일은 의존성 트리를 관리하는 파일이다.
- yarn.lock 파일이 없으면, 의존성 트리를 관리할 수 없기 때문에 다른 환경에서 프로젝트를 실행하거나 빌드할 때도 동일한 패키지 버전을 사용할 수 없다.

### npm을 선택하는 경우

- 이미 기존 프로젝트에서 npm을 사용하고 있는 경우
- 프로젝트의 의존성이 간단하고 복잡하지 않거나, 추가적인 보안 검사가 필요하지 않은 경우
- 프로젝트의 다른 개발자들이 npm을 사용하고 있을 경우
