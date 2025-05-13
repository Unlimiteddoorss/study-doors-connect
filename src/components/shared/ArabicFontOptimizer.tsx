
import { useEffect } from 'react';

export default function ArabicFontOptimizer() {
  useEffect(() => {
    // Add Arabic font optimization CSS to document
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Tajawal';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1nzGBC5xLhLFw4Q.woff2) format('woff2');
        unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
      }
      
      @font-face {
        font-family: 'Tajawal';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l8KiHrRpiYlJ.woff2) format('woff2');
        unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
      }
      
      @font-face {
        font-family: 'Tajawal';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l4qkHrRpiYlJ.woff2) format('woff2');
        unicode-range: U+0600-06FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE80-FEFC;
      }
      
      /* Apply Arabic optimizations */
      html[lang="ar"] body,
      .rtl {
        font-family: 'Tajawal', sans-serif;
        letter-spacing: 0;
        word-spacing: 1px;
        text-rendering: optimizeLegibility;
      }
      
      /* Optimize Arabic numbers */
      .arabic-numbers {
        font-feature-settings: "tnum" on;
      }
    `;
    document.head.appendChild(style);

    // Set the default direction and language for better Arabic support
    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This is a utility component that doesn't render anything
}
