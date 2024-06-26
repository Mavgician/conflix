import {
  Container
} from 'reactstrap'

export function SectionHeader({ children, className=null }) {
  return (
    <Container className={`mb-5 p-0 ${className === null ? '' : className}`}>
      <span>ConFlix Online</span>
      <h2>{children}</h2>
    </Container>
  )
}

export function Section({ children, className=null }) {
  return (
    <Container fluid={true} className={`${className === null ? '' : className}`}>
      {children}
    </Container>
  )
}