'use client'

import Script from 'next/script'

export const GaScript = () => {
  const gaId = process.env.NODE_ENV

  return (
    // <!-- Google tag (gtag.js) -->
    <>
      <Script
        defer
        id="ga-connect"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      ></Script>
      <Script
        defer
        id="ga-track"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', ${gaId});`,
        }}
      ></Script>
    </>
  )
}
