import { User } from '../typeorm/user.entity'
import { Book } from '../../books/entities/book.entity'
import { Like } from '../../likes/entities/like.entity';
const entities = [User, Book, Like];
export { User, Book, Like }
export default entities;