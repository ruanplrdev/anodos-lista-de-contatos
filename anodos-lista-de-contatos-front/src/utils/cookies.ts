import Cookies from 'js-cookie';

export function getAuthToken() {
  // Obtém o cookie com js-cookie
  return Cookies.get('auth-token');
}

export function removeAuthToken() {
  // Remove o cookie com js-cookie
  Cookies.remove('auth-token');
}
