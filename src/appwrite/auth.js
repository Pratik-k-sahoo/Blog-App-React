import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const user = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (user) {
				//call another method
                return this.login({email, password});
			} else {
				return user;
			}
		} catch (error) {
			console.log("Appwrite service :: createAccount :: error", error);
		}
	}

	async login({ email, password }) {
		try {
			const user = await this.account.createEmailPasswordSession(
				email,
				password
			);
            return user;
		} catch (error) {
			console.log("Appwrite service :: login :: error", error);
		}
	}

    async getCurrentUser() {
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;
