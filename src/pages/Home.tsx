import { Image, Container } from "react-bootstrap";
export function Home() {
  return (
    <Container>
      <h2 className="text-center mt-5">Welcome To Our Home Page</h2>
      <div className="d-flex justify-content-center align-item-center">
        <Image src="../../public/images/tractor.gif" alt="tractor" />
      </div>
      <h5 className="text-center mt-5">
        This Page Will Be Implemented Soon...
      </h5>
    </Container>
  );
}
