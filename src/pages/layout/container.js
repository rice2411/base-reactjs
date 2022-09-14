import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Container from "../../components/Layout/Container";

export default function ContainerPage() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}