import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  Container,
  FlexList,
  Box,
  Space,
  BlockLink,
  Heading,
  Subhead,
  Kicker,
  Text,
} from "../components/ui"
import SEOHead from "../components/head"

function PostCard({ slug, image, title, excerpt, author, category, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={image.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
      <Text as="p">{excerpt}</Text>
      {author?.name && (
        <Text variant="bold">
          <div>By {author.name}</div>
        </Text>
      )}
    </BlockLink>
  )
}

function PostCardSmall({ slug, image, title, category, ...props }) {
  return (
    <BlockLink {...props} to={`/blog/${slug}`}>
      {image && (
        <>
          <GatsbyImage alt={image.alt} image={image.gatsbyImageData} />
          <Space size={3} />
        </>
      )}
      <Subhead>
        <Kicker>{category}</Kicker>
        {title}
      </Subhead>
    </BlockLink>
  )
}

const BlogIndex = ({ data }) => {
  const posts = data.posts.nodes || [];
  console.log("***** posts", posts)
  const featuredPosts = posts.filter((p) => p.category === "Featured")
  const regularPosts = posts.filter((p) => p.category !== "Featured")

  return (
    <Layout>
      <Container>
        <Box paddingY={4}>
          <Heading as="h1">Blog</Heading>
          <FlexList variant="start" gap={0} gutter={3} responsive>
            {featuredPosts.map((post) => (
              <Box as="li" key={post.id} padding={3} width="half">
                <PostCard {...post} />
              </Box>
            ))}
          </FlexList>
        </Box>
        {regularPosts && regularPosts.length > 0 &&
          <Box paddingY={4}>
            <Subhead>Blog Updates</Subhead>
            <FlexList responsive wrap gap={0} gutter={3} variant="start">
              {regularPosts.map((post) => (
                <Box as="li" key={post.id} padding={3} width="third">
                  <PostCardSmall {...post} />
                </Box>
              ))}
            </FlexList>
          </Box>
        }
      </Container>
    </Layout>
  )
}
export const Head = () => {
  return <SEOHead title="Blog" />
}

export default BlogIndex

export const query = graphql`
  query {
    posts: allContentfulBlogPost {
      nodes {
        id
        slug
        title
        excerpt
        category
        image {
          id
          alt
          gatsbyImageData
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
  }
`