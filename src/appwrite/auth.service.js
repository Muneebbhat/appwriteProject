import { envVariables } from '../config/config.env';
import { Client, Account, ID } from 'appwrite';

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(envVariables.appwriteUrl)
      .setProject(envVariables.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, fullname }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        fullname
      );
      if (userAccount) {
        return this.login({ login, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return this.account.get();
    } catch (error) {
      console.log('Appwrite serive :: getCurrentUser :: error', error);
      throw error;
    }
    return null;
  }
  async logout() {
    try {
      return this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new Authservice();
export default authService;
