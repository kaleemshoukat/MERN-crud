export * from './user.constants';
export * from './auth.constants';
export * from './table.constants';

export const config={headers: { 'Content-Type': 'application/json', "token": 'bearer '+sessionStorage.getItem("token")  }}
