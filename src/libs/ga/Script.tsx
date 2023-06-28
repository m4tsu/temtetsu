'use client'

import Script from 'next/script'

export const GaScript = () => {
  return (
    // <!-- Google tag (gtag.js) -->
    <>
      <Script
        defer
        id="ga-connect"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      ></Script>
      <Script
        defer
        id="ga-track"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'G-8PB08KW64Z');`,
        }}
      ></Script>
    </>
  )
}
