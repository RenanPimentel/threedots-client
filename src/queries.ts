import { gql } from "@apollo/client";

export const FETCH_ALL_POSTS = gql`
  query posts($postsLength: Int) {
    posts(postsLength: $postsLength) {
      author {
        avatar
        username
        createdAt
      }
      body
      createdAt
      id
      liked
      likeCount
    }
  }
`;

export const FETCH_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      avatar
      createdAt
      username
    }
  }
`;

export const FETCH_USER_POSTS = gql`
  query userPosts($postsLength: Int, $authorUsername: String!) {
    posts(postsLength: $postsLength, authorUsername: $authorUsername) {
      author {
        avatar
        username
        createdAt
      }
      body
      createdAt
      id
      liked
      likeCount
    }
  }
`;
