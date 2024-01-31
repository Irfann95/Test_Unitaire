import { getCollection, toObjectId } from '../../Config/mongo';
import { User, userToCreate } from '../models/userModel';

export interface UserService {
  createUser(user: userToCreate): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  updateUserById(id: string, user: User): Promise<User | undefined>;
}

export class UserServiceImpl implements UserService {
  async createUser(user: userToCreate): Promise<User> {
    const userCreated = (await getCollection('users').insertOne(
      user,
    )) as unknown;
    return userCreated as User;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = (await getCollection('users').findOne({
      email: email,
    })) as unknown;
    return user as User;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = (await getCollection('users').findOne({
      _id: toObjectId(id),
    })) as unknown;
    return user as User;
  }

  async updateUserById(id: string, user: User): Promise<User | undefined> {
    const userUpdated = (await getCollection('users').findOneAndUpdate(
      { _id: toObjectId(id) },
      { $set: user },
      { returnDocument: 'after' },
    )) as unknown;
    return userUpdated as User;
  }
}
