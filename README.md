<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_ob_be_4) 선발과제

## Installation

```bash
$ npm install
```

DB : PostgreSQL

해당 서버는 PostgreSQL이 필요합니다. 또한 env파일이 필요하며 개발용(.development.env) 또는 배포용(.production.env)환경변수가 필요합니다.(.env.example 참고)

1. npm install을 CLI로 실행

2. .development.env파일을 해당 폴더에 생성(.env.example와 같은 경로)

3. .developmant.env 작성 및 저장
PG_HOST= 호스트
PG_PORT= 포트번호
PG_USERNAME= DB유저이름
PG_PASSWORD= 해당 유저비밀번호
PG_DATABASE= 해당 데이터베이스
PG_CHANGE= 데이터베이스 변경유무(true시 Entity에 따라 컬럼이 변경됩니다.)

4. npm run start:dev을 CLI로 실행

5. http://localhost:3500/api-docs에 접속해 해당 과제를 테스트 할수 있습니다.

## Running the app

```bash
# development
$ npm run start

# watch mode(.development.env파일이 필요함)
$ npm run start:dev

# production mode(.production.env파일이 필요함)
$ npm run start:prod
```

env파일에서 NEST_PORT이 지정이 되지 않을시 Default값은 3500이다.

## API Document

서버를 실행항 다음 'http://localhost:3500/api-docs'에서 Swagger문서를 확인할수 있습니다.