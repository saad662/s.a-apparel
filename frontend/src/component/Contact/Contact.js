import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css'; // Make sure to import your CSS file

const Contact = () => {
    const form = useRef();

    const [formData, setFormData] = useState({
        from_name: "",
        from_email: "",
        message: "",
    });

    const [formErrors, setFormErrors] = useState({
        from_name: "",
        from_email: "",
        message: "",
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.from_name) {
            isValid = false;
            errors.from_name = "Name is required";
        }

        if (!formData.from_email) {
            isValid = false;
            errors.from_email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.from_email)) {
            isValid = false;
            errors.from_email = "Email is invalid";
        }

        if (!formData.message) {
            isValid = false;
            errors.message = "Message is required";
        }

        setFormErrors(errors);

        return isValid;
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            emailjs
                .sendForm(
                    "service_dzpkxc9",
                    "template_s58sg2u",
                    form.current,
                    "WaCqsjZkKJgyJVVNb"
                )
                .then(
                    (result) => {
                        console.log(result.text);
                        setFormSubmitted(true);
                        toast.success('Form submitted successfully!');
                        setFormData({
                            from_name: "",
                            from_email: "",
                            message: "",
                        });
                    },
                    (error) => {
                        console.log(error.text);
                        toast.error('Form submission failed. Please try again.');
                    }
                );
        }
    };

    return (
        <div data-aos="fade-in" data-aos-duration="2000">
            <Container className="formContainer" id="form">
                <Row className="align-items-center">
                    <Col size={12} md={6}>
                        <h1>CONTACT US</h1>
                    </Col>
                    <Col>
                        <form ref={form} onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="from_name"
                                value={formData.from_name}
                                onChange={handleInputChange}
                            />
                            {formErrors.from_name && <div className="error">{formErrors.from_name}</div>}
                            <label>Email</label>
                            <input
                                type="email"
                                name="from_email"
                                value={formData.from_email}
                                onChange={handleInputChange}
                            />
                            {formErrors.from_email && <div className="error">{formErrors.from_email}</div>}
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                            {formErrors.message && <div className="error">{formErrors.message}</div>}
                            <input type="submit" value="Send" className="send" />
                            {formSubmitted && <div className="success">Form submitted successfully!</div>}
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Contact;
