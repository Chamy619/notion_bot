# Notion Bot

우아한 테크러닝 4기 교육을 위한 Repository 입니다.

## 클라이언트 실행

1. client/src 디렉터리 내에 `api` 디렉터리를 생성하세요.

2. `api` 디렉터리 내에 `address.ts` 파일과 `key.ts` 파일을 생성하세요.

3. `/client/src/api/address.ts`

   ```typescript
   export const server: string = 'http://localhost:5000';
   ```

   

4. `client/src/api/key.ts`

   ```typescript
   export const googleApiKey: string: '구글 클라이언트 아이디.apps.googleusercontent.com';
   export const naverApiKey: string = '네이버 클라이언트 아이디';

## 목표

1. 로그인을 회원 서비스
2. 텍스트 에디터 기능(마크다운 지원)
3. 친구끼리 텍스트 공유

## 1주차 (06.01 ~ 06.07)

### 초기 세팅

React - Typescript 사용해 프론트 세팅했습니다.

백엔드는 <a href="https://github.com/Chamy619/notion_bot_server">여기</a>에서 확인할 수 있습니다. (프론트엔드와 백엔드의 개발 및 배포 사이클이 다르기 때문에 분리해서 진행하는 것이 더 좋을 수 있습니다.)



`create-react-app` 을 사용해 프론트엔드를 구성했습니다. webpack을 사용해 직접 구성하려 했지만, `react-router-dom` 과 `react-google-login` 을 같이 사용할 때 발생하는 에러를 아직 해결하지 못해, 이렇게 사용하려 합니다.

```bash
npx create-react-app . --template typescript
```



### 마크다운 파서

~~markdown-to-jsx 마크다운 파서 사용 이유~~

 * ~~Typescript 지원~~
 * ~~결과 뿐 아니라 파싱된 내용을 보여줌~~

codesandbox에 에디터 프로토타입을 만들었습니다.

* <a href="https://codesandbox.io/s/draft-jsprototype-fyv91">draft-js 를 사용한 프로토타입</a>
* <a href="https://codesandbox.io/s/slate-jsprototype-8tbiz">slate-js를 사용한 프로토타입</a>

둘 모두 완전한 커스터마이징을 제공하고, 다양한 플러그인이 존재합니다. typescript 지원 면에서는 draft-js 가 더 잘 되어 있다는 생각이 들었습니다. 하지만 키다운을 사용해 기능을 추가하는 slate-js의 사용법이 저에게 더 편리하게 느껴졌고, 별도의 플러그인을 사용하지 않아도 다양한 마크다운 기능을 추가할 수 있을 것 같다는 판단이 들어서 slate-js를 사용하여 진행할 예정입니다.



### OAuth 2.0 적용

구글 로그인과 네이버 로그인 기능을 추가했습니다. 구글 로그인은 `react-google-login` 을 사용해 여기서 지원하는 컴포넌트를 이용해서 쉽게 구현했습니다. 네이버 로그인의 경우는 javascriptSDK를 추가해서 구현했습니다. 

네이버 로그인의 특이한 점은 프론트쪽에서 유저 정보를 요청하면 에러 메시지를 보냅니다. 프론트 단에서는 access token만 받을 수 있고, 이를 백엔드로 전달하고, 백엔드에서 access token을 사용해 네이버에 유저 정보를 요청하고, 이를 다시 프론트로 보내는 과정을 통해 로그인을 진행했습니다. 

Typescript를 사용해 네이버에서 access token을 받을 때, `window.naver.loginWithnaverId(...)` 를 사용할 경우 에러가 발생합니다. window 객체에 naver가 없다는 에러가 발생하는데, 이는 아래와 같이 비구조화 할당을 통해 에러를 피했습니다.

```typescript
const {naver} = window as any
```



### 구글 로그인

구글 로그인을 추가하는 방법은 간단합니다. 일단 `react-google-login` 패키지를 설치한 후 아래와 같이 이용합니다.

```typescript
import GoogleLogin from 'react-google-login';

const GoogleLoginButton: React.FC = (props: any) {
    ...
    return (
    	<GoogleLogin
        	clientId={googleApiKey}
			onSuccess={googleLoginSuccess}
			onFailure={googleLoginFailure}
			cookiePoliy={'single_host_origin'}
		/>
    )
}
```

만들어진 버튼을 클릭하면, 구글 로그인 창이 나타나고, 구글 로그인을 진행하면 유저의 정보를 가져올 수 있습니다.

* clientId: 구글 로그인을 사용하기 위해 구글 api에서 애플리케이션을 등록하고 발급받은 키를 입력합니다.
* onSucess: 로그인에 성공했을 때 실행할 콜백 함수를 넣습니다.
* onFailure: 로그인에 실패했을 때 실행할 콜백 함수를 넣습니다.



### 네이버 로그인

네이버 로그인을 사용하기 위해, 일단 `index.html` 파일에 아래의 태그를 추가합니다.

```html
<script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charset="utf-8"></script>
```



Typescript에서 `window.naver` 를 사용하기 위해서 비구조화 할당을 사용합니다.

```typescript
import React, {useEffect} from 'react'

const {naver} = window as any;

const NaverLoginButton: React.FC = () => {
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: '네이버 developer에서 발급받은 키',
            callbackUrl: '이동할 Url',
            isPopup: true,	// 팝업을 열 것인지, 현재 페이지에서 진행할 것인지
            loginButton: {color: 'green', type: 3, height: '43'}	// 네이버 로그인 버튼 디자인 선택
    });
    naverLogin.init();
    
    useEffect(() => {
        initializeNaverLogin();
    }, []);
        
    return (
    	<div id="naverIdLogin" />	// id 입력 필수
    )
}
```

주의해야 할 점은 컴포넌트가 반환하는 div에 id를 꼭 naverIdLogin으로 해주어야 하는 점입니다. loginButton에서 선택한 디자인이 여기에 적용됩니다.

그리고 위의 과정을 통해 유저의 정보를 가져오지는 못하고, access token만 발급 받을 수 있습니다. access token의 정보는 callbakUrl에 get 파라미터로 전달됩니다.

그래서 해당 위치에서 받은 access token을 서버로 전달하고, 서버에서는 이를 사용해 유저의 정보를 요청한 후, 다시 프론트에게 전달해 줍니다.

