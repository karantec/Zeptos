import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from './Home/sub_components/Navbar';
import Footer from './Home/sub_components/Footer';

export default function ContactUs () {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const emailData = {
    //         to: 'amritkum360@gmail.com',
    //         subject: formData.subject,
    //         body: `
    //             Name: ${formData.name}
    //             Email: ${formData.email}
    //             Subject: ${formData.subject}
    //             Message: ${formData.message}
    //         `,
    //     };

    //     fetch('/your-server-endpoint', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(emailData),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Success:', data);
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // };

    return (
        <>
            <Navbar />
            <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                <h1 className="fw-bold">Any Issues or Bugs</h1>
                <p className="text-muted">please contact Us at</p>
                <h3 className="fw-bold text-dark">9776769797</h3>
                <p className="fw-medium">or</p>
                
                <a
                    href="https://wa.me/message/K3RKY5ZNMAEID1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success d-flex align-items-center px-4 py-2"
                >
                    <FaWhatsapp size={24} className="me-2" />
                    Message Bejiness.com on WhatsApp
                </a>
            </div>
            <Footer />
        </>
    );
};
