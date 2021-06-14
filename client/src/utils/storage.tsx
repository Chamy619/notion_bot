export const setTokenId = (tokenId: string) => {
  window.sessionStorage.setItem('tokenId', JSON.stringify(tokenId));
};

export const getTokenId = () => {
  const origin = window.sessionStorage.getItem('tokenId') || '""';
  let tokenId: string = '';
  if (typeof origin === 'string') {
    tokenId = JSON.parse(origin);
  }

  return tokenId;
};

interface IUserInfo {
  name: string;
  image: string;
}

export const setUserInfo = (userInfo: IUserInfo) => {
  window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  const origin = window.sessionStorage.getItem('userInfo');
  let userInfo: IUserInfo = {
    name: '',
    image: '',
  };
  if (typeof origin === 'string') {
    userInfo = JSON.parse(origin);
  }

  return userInfo;
};
