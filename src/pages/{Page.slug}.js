import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Container, Box, Heading } from "../components/ui"
import SEOHead from "../components/head"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"

export default function Page(props) {
  const { page } = props.data
  return (
    <Layout>
      <Box paddingY={5}>
        <Container width="narrow">
          {page.title && <Heading as="h1">{page.title}</Heading>}
          {page.blocks && page.blocks.map((block) => {
            const { id, blocktype, ...componentProps } = block
            const Component = sections[blocktype] || Fallback
            return <Component key={id} {...componentProps} />
          })}
          <div
            dangerouslySetInnerHTML={{
              __html: page.html,
            }}
          />
        </Container>
      </Box>
    </Layout>
  )
}
export const Head = (props) => {
  const { page } = props.data
  return <SEOHead {...page} />
}
export const query = graphql`
  query PageContent($id: String!) {
    page(id: { eq: $id }) {
      id
      title
      slug
      description
      image {
        id
        url
      }
      html
      body 
      blocks: content {
        id
        blocktype
        ...PageSectionContent
        ...HomepageHeroContent
        ...HomepageCtaContent
      }
    }
  }
`
