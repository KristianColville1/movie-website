import React from "react";
import { Form } from "react-bootstrap";

/**
 * FormInput encapsulates the form control functionality in forms within the website
 * @param {object} props is the destructured props object
 * @param {string} props.id the id of the form which it belongs to
 * @param {string} props.label is the label of the form input element
 * @param {string} props.type is the type of input element, text, number etc
 * @param {string} props.placeholder is the content to temporarily display in the input element
 * @param {function} props.onChange event handler on the input
 * @param {string} props.value is the contents of the input
 * @param {object} props.options make the component dynamic for different form input types
 * @param {string} [props.className] css names if any for the nested element
 * @param {string} [props.name] name of the input field
 * @param {boolean} [props.required] indicates if the input is required
 * @param {string} [props.pattern] regex pattern the input value must match
 * @param {string} [props.feedback] feedback message for validation errors
 * @param {boolean} [props.isInvalid] indicates if the input value is invalid
 * @returns {JSX.Element} a form input element
 */

const FormInput = ({
    id,
    label,
    type,
    placeholder,
    onChange,
    value,
    options,
    className,
    name,
    pattern,
    feedback,
    required,
    isInvalid
}) => {
    return (
        <Form.Group controlId={id} className={`${className}`}>
            <Form.Label>{label}</Form.Label>
            {type === "select" ? (
                <Form.Control
                    as="select"
                    onChange={onChange}
                    value={value}
                    name={name}
                    required={required}
                >
                    {options &&
                        options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </Form.Control>
            ) : (
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    name={name}
                    required={required}
                    pattern={pattern}
                    isInvalid={isInvalid}
                />
            )}
            {isInvalid && feedback && (
                <Form.Control.Feedback type="invalid">
                    {feedback}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
};

export default FormInput;
