import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Portal from "@components/Portal";

interface ContainerProps {
  /**
   * z-index for the container.
   */
  zIndex: number;
}

/**
 * Component container.
 */
const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;

  min-height: 100vh;
  width: 100%;

  z-index: ${(props) => props.zIndex};
`;

/**
 * Background.
 */
const Background = styled.div`
  background-color: #000;
  opacity: 80%;

  min-height: 100vh;
  width: 100%;
`;

/**
 * Centers position of the modal.
 */
const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/**
 * Container which contains the Modal Title and Content.
 */
const Content = styled.div`
  background-color: #fff;
  min-width: 600px;

  border-radius: 3px;
  padding: 15px;
`;

/**
 * Container for the Modal Title.
 */
const ModalTitle = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

/**
 * Container for the Modal Content.
 */
const ModalContent = styled.div`
  max-height: 350px;
  overflow: scroll;
`;

interface Props {
  /**
   * Modal title.
   */
  title: string;

  /**
   * Modal content.
   */
  children: React.ReactElement;

  /**
   * Close click handler.
   */
  handleCloseButtonClick: () => void;
}

/**
 * Base Modal component.
 *
 * @param props Component props.
 * @param props.title Modal title.
 * @param props.children Child nodes to be rendered.
 * @param props.handleCloseButtonClick Click handler function for the close
 *                                     button.
 * @returns Base modal.
 */
const BaseModal: React.FC<Props> = ({
  title,
  children,
  handleCloseButtonClick,
}) => {
  // Modal z-index.
  const [zIndex, setZIndex] = useState<undefined | number>(undefined);

  useEffect(() => {
    // Get number of elements in the Portal container.
    const numPortalItems = document?.getElementById("portal")?.children?.length;

    if (numPortalItems === undefined) {
      return;
    }

    // Generate index for the new modal.
    setZIndex(numPortalItems + 1);
  }, []);

  if (!zIndex) {
    return null;
  }

  return (
    <Portal>
      <Container zIndex={zIndex}>
        <Background onClick={handleCloseButtonClick} />
        <Center>
          <Content>
            <ModalTitle>{title}</ModalTitle>
            <ModalContent>{children}</ModalContent>
          </Content>
        </Center>
      </Container>
    </Portal>
  );
};

export default BaseModal;
