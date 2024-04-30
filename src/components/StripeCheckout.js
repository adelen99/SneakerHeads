import React from "react";
import styled from "styled-components";

const CheckoutForm = () => {
  return <h2> hello from stripe checkout</h2>;
};

const StripeCheckout = () => {
  return (
    <div>
      <Wrapper>
        <CheckoutForm />
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.section``;

export default StripeCheckout;
