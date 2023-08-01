import * as React from "react"
import { graphql } from "gatsby"
import LogoList from "./logo-list"
import BenefitList from "./benefit-list"
import FeatureList from "./feature-list"
import ProductList from "./product-list"
import StatList from "./stat-list"
import TestimonialList from "./testimonial-list"

export default function PageSection(props) {
  console.log("******* in page section", props)
  if(props.type === "Logo List") return <LogoList {...props} />
  if(props.type === "Benefit List") return <BenefitList {...props} />
  if(props.type === "Feature List") return <FeatureList {...props} />
  if(props.type === "Product List") return <ProductList {...props} />
  if(props.type === "Stats List") return <StatList {...props} />
  if(props.type === "Testimonial List") return <TestimonialList {...props} />
  else return <React.Fragment />
}

export const query = graphql`
  fragment PageSectionContent on Section {
    id
    type
    kicker
    heading
    text
    body
    image {
      id
      alt
      gatsbyImageData
    }
    icon {
      id
      alt
      gatsbyImageData
    }
    links {
      id
      href
      text
    }
    content {
      __typename    
      ...HomepageLogoContent   
      ...HomepageBenefitContent
      ...HomepageFeatureContent  
      ...HomepageProductContent   
      ...HomepageStatContent
      ...HomepageTestimonialContent
    }
  }

  fragment HomepageLogoContent on HomepageLogo {
    id
    alt
    image {
      id
      gatsbyImageData
      alt
    }
  }

  fragment HomepageBenefitContent on HomepageBenefit {
    id
    heading
    text
    image {
      id
      gatsbyImageData
      alt
    }
  }

  fragment HomepageProductContent on HomepageProduct {
    id
    heading
    text
    image {
      alt
      id
      gatsbyImageData
    }
    links {
      id
      href
      text
    }
  }

  fragment HomepageStatContent on HomepageStat {
    id
    value
    label
    heading
  }

  fragment HomepageTestimonialContent on HomepageTestimonial {
    id
    quote
    source
    avatar {
      id
      gatsbyImageData
      alt
    }
  }
`
