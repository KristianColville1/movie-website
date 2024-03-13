import React from "react";
import { Form } from "react-bootstrap";

/**
 * FormInput encapsulates the from control functionality in forms within the website
 * @param {Object} props is the destructured props object
 * @param {string} props.id the id of the form which it belongs to
 * @param {string} props.label is the label of the form input element
 * @param {string} props.type is the type of input element, text, number etc
 * @param {string} props.placeholder is the content to temporarily display in the input element
 * @param {Function} props.onChange event handler on the input
 * @param {string} props.value is the contents of the input
 * @param {string} [props.className] css names if any for the nested element
 * @returns {JSX.Element} a form input element
 */
const FormInput = ({ id, label, type, placeholder, onChange, value, className }) => (
    <Form.Group controlId={id} className={`${className}`}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
        />
    </Form.Group>
);

export default FormInput;
