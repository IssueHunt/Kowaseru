import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface User {
    id: number
    name: string
    email: string
    password: string
  }

  interface Post {
    id: number
    content: string
    created_at: Date
    user_id: number
  }

  interface Comment {
    id: number
    content: string
    created_at: Date
    user_id: number
    post_id: number
  }

  interface Tables {
    users: User
    users_composite: Knex.CompositeTableType<
      User,
      // insert
      Pick<User, 'name' | 'email' | 'password'>,
      // update
      Partial<Omit<User, 'id'>>
    >

    posts: Post
    posts_composite: Knex.CompositeTableType<
      Post,
      // insert
      Pick<Post, 'content' | 'user_id'>,
      // update
      Partial<Omit<Post, 'id'>>
    >

    comments: Comment
    comments_composite: Knex.CompositeTableType<
      Comment,
      // insert
      Pick<Comment, 'content' | 'user_id' | 'post_id'>,
      // update
      Partial<Omit<Comment, 'id'>>
    >
  }
}
