import React, { useRef, useImperativeHandle } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const InvisibleReCAPTCHA = React.forwardRef(({ onVerify }, ref) => {
  const recaptchaRef = useRef();

  useImperativeHandle(ref, () => ({
    executeCaptcha: async () => {
      const token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
      onVerify(token);
    }
  }));

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      size="invisible"
      badge="bottomright"
    />
  );
});

export default InvisibleReCAPTCHA;
