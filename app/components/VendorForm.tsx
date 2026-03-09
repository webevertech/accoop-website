'use client';

import { useEffect } from 'react';

export default function VendorForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://links.webevertech.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <iframe
      src="https://links.webevertech.com/widget/form/gpqczX73E9PDYbOcpUgE"
      style={{ width: '100%', height: '659px', border: 'none', borderRadius: '3px' }}
      id="inline-gpqczX73E9PDYbOcpUgE"
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name="Form 3"
      data-height="659"
      data-layout-iframe-id="inline-gpqczX73E9PDYbOcpUgE"
      data-form-id="gpqczX73E9PDYbOcpUgE"
      title="Form 3"
    />
  );
}
