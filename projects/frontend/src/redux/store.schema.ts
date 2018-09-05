import { IUserSchema } from './user/user.schema';
import { ISharesSchema } from './shares/shares.schema';

export interface IStoreSchema {
	user: IUserSchema;
	shares: ISharesSchema;
}