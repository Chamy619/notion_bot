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


## 2주차 (06.08 ~ 06.14)

### 에디터 라이브러리

<a href="https://docs.slatejs.org/">Slate.js</a> 라이브러리를 사용해서 텍스트 에디터 기능을 추가했습니다.

`Slate.js` 는 완전한 커스터마이징을 제공하고 있고, 문서화 및 예제도 잘 나와있어서, 노션에 적합한 라이브러리라 판단했고, 이를 사용하면 마크다운 에디터 뿐 아니라 다양한 기능을 추가할 수 있을 것이라고 예상됩니다.

### Slate.js 사용법

`Slate.js` 의 기본적인 컨셉은 Block 과 Leaf 의 조작입니다.
 * Block: 한 줄 또는 한 문단이라고 생각하시면 됩니다. 엔터를 누르지 않고(또는 shift + 엔터) 글을 쓸 때, 여러 줄로 나뉘어 지는 것은 기본적으로 한 Block 이고, 엔터를 입력해서 Block을 끝낼 수 있습니다.
 * Leaf: Leaf 는 한 Block 내에 존재할 수도 있고, 여러 Block에 걸쳐서 존재할 수도 있지만, 기본적으로는 한 Block 내에서 특정 부분을 Leaf 라고 합니다. 
    > 이것은 블록일까요? **리프**일까요?
    
    위의 문장에서 전체는 한 Block 이라고 말할 수 있고, 굴게 표시된 **리프** 부분은 Block 내의 Leaf 라고 할 수 있습니다. 물론 굴게 처리되지 않은 부분도 모두 Leaf 입니다.

위의 기본 컨셉을 가지고, 일단 Block과 Leaf를 어떻게 구성할 것인지에 대해 사용자가 정해주어야 합니다.
* Block.tsx

    ```tsx
    const Block = ({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
        case 'code':
        return <pre {...attributes}>{children}</pre>;
        case 'bullet':
        return (
            <ul>
            <li {...attributes}>{children}</li>
            </ul>
        );
        case 'h1':
        return <h1 {...attributes}>{children}</h1>;
        case 'h2':
        return <h2 {...attributes}>{children}</h2>;
        case 'h3':
        return <h3 {...attributes}>{children}</h3>;
        default:
        return <p {...attributes}>{children}</p>;
    }
    };
    ```

    저는 아무 처리도 하지 않은 디폴트 블록은 `<p>` 태그 내에 보여주도록 설정했습니다. 추가로 `code` 블록과 `bullet` 블록, `title` 블록을 만들었습니다.

* Leaf.tsx

    ```tsx
    const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }

        if (leaf.italic) {
            children = <em>{children}</em>;
        }

        if (leaf.underlined) {
            children = <u>{children}</u>;
        }

        return <span {...attributes}>{children}</span>;
    };
    ```

    리프의 경우 기본적으로 `<span>` 태그 내에 보여주도록 했고, 타입이 bold, italic, underlined 일 경우 이에 맞는 효과를 적용하도록 했습니다.

에디터 컴포넌트는 아래와 같이 생성했습니다.

```tsx
const MyEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  // Block 단위의 변화가 있을 때 기존에 만든 구문으로 변환시켜줌
  const renderElement = useCallback((props: RenderElementProps) => {
    return <Block {...props} />;
  }, []);

  // Leaf 내에서 변화가 있을 때 기존에 만든 구문으로 변환시켜줌
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  // 키다운 이벤트
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // ...
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar />
      <StyledEditable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDownHandler}
      />
    </Slate>
  );
};
```

### Slate.js 사용 이슈

webpack 설정을 혼자 해서 진행했을 때, Generate가 제대로 작동하지 않아서, 에디터 Block 또는 Leaf의 타입 체크를 하지 못하는 상황이 발생했습니다. CRA로 시작한 프로젝트에서는 정상 동작한 것으로 보아 webpack 또는 babel 설정에서 다른 점이 있을 것이라 추측하고 있습니다.