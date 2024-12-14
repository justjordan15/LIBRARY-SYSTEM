/**
 * Interface representing a user entity.
 */
export interface IUser{
    type: 'ADMIN' | 'EMPLOYEE' | 'PATRON';
    /**
   * User's first name.
   */
    firstName:string;
    /**
   * User's last name.
   */
    lastName:string;
    /**
   * User's email address.
   */
    email:string;
    /**
   * User's password (hashed or plain text, depending on implementation).
   */
    password:string;
}   