export * from './user.constants';

export const config={headers: { 'Content-Type': 'application/json', "token": 'bearer '+sessionStorage.getItem("token")  }}
