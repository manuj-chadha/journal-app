import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const InvisibleReCAPTCHA = ({ onVerify }) => {
  const recaptchaRef = useRef();

  const executeCaptcha = async () => {
    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    onVerify(token);
  };

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      size="invisible"
      badge="bottomright"
    />
  );
};

export default InvisibleReCAPTCHA;
