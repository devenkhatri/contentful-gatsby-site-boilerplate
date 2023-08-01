import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../components/ui"
import { avatar as avatarStyle } from "../components/ui.css"
import * as styles from "./blog-post.css"
import SEOHead from "../components/head"

export default function BlogPost({ data }) {
  const post = data.post;
  console.log("***** blog post", post)
  return (
    <Layout>
      <Container>
        <Box paddingY={5}>
          <Heading as="h1" center>
            {post.title}
          </Heading>
          <Space size={4} />
          {post.author && (
            <Box center>
              <Flex>
                {post.author.avatar &&
                  (!!post.author.avatar.gatsbyImageData ? (
                    <Avatar
                      {...post.author.avatar}
                      image={post.author.avatar.gatsbyImageData}
                    />
                  ) : (
                    <img
                      src={post.author.avatar.url}
                      alt={post.author.name}
                      className={avatarStyle}
                    />
                  ))}
                <Text variant="bold">{post.author.name}</Text>
              </Flex>
            </Box>
          )}
          <Space size={4} />
          <Text center>{post.date}</Text>
          <Space size={4} />
          {post.image && (
            <Text center>
              <GatsbyImage
                alt={post.image.alt}
                image={post.image.gatsbyImageData}
              />
            </Text>
          )}
          <Space size={5} />
          <div
            className={styles.blogPost}
            dangerouslySetInnerHTML={{
              __html: post.html,
            }}
          />
        </Box>
      </Container>
    </Layout>
  )
}
export const Head = ({ data }) => {
  return <SEOHead {...data.post} description={data.post.excerpt} />
}

export const query = graphql`
  query ( $id: String! ) {
    post: contentfulBlogPost(id: { eq: $id }) {
      id
      slug
      title
      html
      excerpt
      date(formatString: "MMMM DD, YYYY")
      category
      image {
        id
        url
        gatsbyImageData
        alt
      }
      author {
        name
        avatar {
          id
          url
          gatsbyImageData
          alt
        }
      }      
    }
  }
`