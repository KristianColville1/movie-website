import React from "react";
import { Modal, Button } from "react-bootstrap";
import './ModalWrapper.css';
/**
 * ModalWrapper encapsulates form content to display to user when triggered
 * @param {Object} props is the destructured props object
 * @param {string} props.title the header title of the modal
 * @param {React.ReactNode} props.children the content passed down the tree
 * @param {string} props.show the status of the open or closed modal
 * @param {Function} props.handleClose function to
 * @param {string} [props.className] css names if any for the nested element
 * @returns {JSX.Element} a modal wrapper element
 */
const ModalWrapper = ({ title, children, show, handleClose, className }) => (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ModalWrapper;
