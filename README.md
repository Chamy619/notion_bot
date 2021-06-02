# Notion Bot

우아한 테크러닝 4기 교육을 위한 Repository 입니다.

## 초기 세팅

React - Typescript - NodeJS 를 사용해 초기 세팅 진행

### 서버

MongoDB, NodeJS, Express 를 사용해 구성

MongoDB 사이트에서 클러스터 생성 후 `/server/config` 디렉터리 내에 `databaseURI.js` 파일을 생성하고 아래 코드를 넣으면 연동 가능

```javascript
module.exports = {
    mongoURI: 'mongodb+srv://<username>:<password>@<hostname>.phe87.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
};
```

## 클라이언트

`create-react-app` 을 사용

```bash
npx create-react-app . --template typescript
```

### 마크다운 파서

markdown-to-jsx 마크다운 파서 사용 이유
 * Typescript 지원
 * 결과 뿐 아니라 파싱된 내용을 보여줌

