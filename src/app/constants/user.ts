/**
 * User credentials shape aligned with Symfony Backend (User entity & Auth/Register APIs).
 * Use these keys when sending or reading user data so backend and app stay in sync.
 */

export const USER_FIELDS = {
  ID: 'id',
  EMAIL: 'email',
  USERNAME: 'username',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PHONE_NUMBER: 'phoneNumber',
  ROLE: 'role',
  ROLES: 'roles',
};

export const LOGIN_CREDENTIALS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const REGISTER_FIELDS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  USERNAME: 'username',
  EMAIL: 'email',
  PASSWORD: 'password',
  PHONE_NUMBER: 'phoneNumber',
};

export const AUTH_RESPONSE_USER = {
  ID: 'id',
  USERNAME: 'username',
  EMAIL: 'email',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ROLE: 'role',
};
