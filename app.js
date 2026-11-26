/* Ahmed Sakr — personal portfolio. Standalone static site, no external dependencies. */
(function () {
  'use strict';

  var certNames = [
    'Network Technician Career Path Exam',
    'Junior Cybersecurity Analyst Career Path Exam',
    'Introduction to Cybersecurity',
    'Introduction To Networking'
  ];
  var certImages = [
    'photos/cert-network-technician.jpg',
    'photos/cert-junior-cyber.jpg',
    'photos/cert-intro-cyber.jpg',
    'photos/cert-edraak-networking.jpg'
  ];
  var socialLinks = [
    'https://www.facebook.com/share/1ca3HTdTdk/',
    'https://t.me/Ahmedsakr53',
    'https://wa.me/201154655875',
    'https://instagram.com/ahmed.sakr53',
    'https://github.com/ahmedsakr53',
    'https://www.tiktok.com/@ahmed.sakr.35',
    'https://x.com/sakr5_3',
    'https://s.imoim.net/qkDhIX'
  ];
  var renderDone = false;
  var ICON_PATHS = {
    mail: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    send: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
    whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z',
    instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
    tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    verified: 'M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.52l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82 1.89 3.2L12 21.04l3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z',
    navUser: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    navCert: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
    navCode: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    navGrid: 'M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z',
    doc: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z',
    moon: 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z',
    sun: 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0-5 2.39 3.42a5.09 5.09 0 0 0-4.78 0L12 2zm10 10-3.42 2.39a5.09 5.09 0 0 0 0-4.78L22 12zM12 22l-2.39-3.42a5.09 5.09 0 0 0 4.78 0L12 22zM2 12l3.42-2.39a5.09 5.09 0 0 0 0 4.78L2 12zm17.07-7.07-.72 4.1a5.09 5.09 0 0 0-3.38-3.38l4.1-.72zM4.93 19.07l.72-4.1a5.09 5.09 0 0 0 3.38 3.38l-4.1.72zm14.14 0-4.1-.72a5.09 5.09 0 0 0 3.38-3.38l.72 4.1zM4.93 4.93l4.1.72a5.09 5.09 0 0 0-3.38 3.38l-.72-4.1z',
    imo: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z',
    x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
    github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    javascript: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
    html5: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
    css3: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z',
    tailwind: 'M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z',
    python: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z',
    chip: 'M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-3V6c0-1.1-.9-2-2-2h-3V1h-2v3h-4V1H9v3H6C4.9 4 4 4.9 4 6v3H1v2h3v2H1v2h3v3c0 1.1.9 2 2 2h3v3h2v-3h4v3h2v-3h3c1.1 0 2-.9 2-2v-3h3v-2h-3v-2h3zm-4 8H7V7h10v10z',
    store: 'M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z',
    navApp: 'M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z',
    navCap: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z',
    navGlobe: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.7 2 2.7 4.6 2.9 7H9.1C9.3 8.6 10.3 6 12 4zM4.3 11a8 8 0 013.9-6.1C7.3 6.5 6.7 8.6 6.6 11H4.3zm0 2h2.3c.1 2.4.7 4.5 1.6 6.1A8 8 0 014.3 13zM12 20c-1.7-2-2.7-4.6-2.9-7h5.8c-.2 2.4-1.2 5-2.9 7zm3.8-.9c.9-1.6 1.5-3.7 1.6-6.1h2.3a8 8 0 01-3.9 6.1zM17.4 11c-.1-2.4-.7-4.5-1.6-6.1A8 8 0 0119.7 11h-2.3z',
    navShield: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
    pin: 'M12 2C8.13 2 5 5.13 5 8.5c0 5.25 7 13 7 13s7-7.75 7-13c0-3.37-3.13-6.5-7-6.5zm0 8.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5z'
  };
  var socialIcons = ['facebook', 'telegram', 'whatsapp', 'instagram', 'github', 'tiktok', 'x', 'imo'];
  function icon(name) {
    return '<svg class="pf-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICON_PATHS[name] + '"/></svg>';
  }
  var navPaths = ['#/', '#/app', '#/about', '#/certifications', '#/projects', '#/services', '#/contact'];
  var navIcons = ['home', 'navApp', 'navUser', 'navCert', 'navCode', 'navGrid', 'navShield', 'mail'];

  var T = {
    ar: {
      navAria: 'صفحات الموقع',
      nav: ['الرئيسية', 'التطبيق', 'نبذة عني', 'الشهادات', 'المشاريع', 'خدماتي', 'التواصل'],
      brandName: 'عالم صقر',
      heroAlt: 'أحمد صقر ببدلة كحلية رسمية على خلفية استوديو بسيطة',
      verifiedTitle: 'الموقع الرسمي لأحمد مختار صقر',
      nameAr: 'أحمد مختار عوض',
      engPrefix: 'المهندس',
      role: 'Junior Cybersecurity Analyst · Network Technician · Software & Games Designer',
      purposeTitle: 'هدف التطبيق',
      tagline: 'أن يكون الواجهة الرسمية للمهندس أحمد مختار صقر: مكان واحد يعرض خدماته ومشاريعه وشهاداته، وتصل منه إليه مباشرة لتطلب خدمتك بضغطة واحدة، ويطمّن فيه أي زائر على أمانه الرقمي بفحص شخصي مجاني يعمل بالكامل على جهازه، ويتعلّم من «صقر أكاديمي»: كورسات مجانية في الأمن السيبراني والبرمجة والشبكات بشهادة إتمام.',
      visitsTitle: 'عدد زيارات الموقع',
      chips: ['طما، سوهاج، مصر', 'طالب هندسة كهرباء قسم اتصالات', 'الهدف: تدريب SOC'],
      ctaProjects: 'استعرض مشاريعي',
      ctaContact: 'تواصل معي',
      ctaServices: 'خدماتي',
      ctaServicesSub: 'اطلب خدمتك الآن',
      aboutEyebrow: 'ABOUT',
      appEyebrow: 'THE APP',
      appTitle: 'نبذة عن التطبيق',
      appIntro: 'هذا ليس مجرد موقع، بل تطبيق ويب تقدمي (PWA) صُمم ونُفذ من الصفر ليعمل كتطبيق حقيقي على الهاتف والكمبيوتر:',
      appFeatures: [
        ['صقر، المساعد الصوتي', 'مساعد ذكي يتكلم ويرد على الزوار بالصوت، يشتغل داخل الشات ويكمّل معاهم وهما بيتصفحوا أي صفحة في الموقع.'],
        ['قابل للتثبيت', 'يُثبَّت بضغطة واحدة من زر «حمّل التطبيق»، ويفتح بأيقونة الصقر الخاصة به كتطبيق مستقل عن المتصفح.'],
        ['ثنائي اللغة', 'عربي وإنجليزي بتبديل فوري، مع دعم كامل لاتجاه الكتابة في اللغتين.'],
        ['يحدّث نفسه', 'يراقب النسخ الجديدة ويُظهر إشعار «تحديث جديد متاح»، فيصلك الجديد بضغطة «حدّث».'],
        ['سريع وخفيف', 'صور مضغوطة بصيغة WebP وخطوط مستضافة محليًا، فيفتح في لحظة حتى مع اتصال ضعيف.'],
        ['ليلي ونهاري', 'وضع داكن وفاتح بألوان مريحة للعين، ويتذكر اختيارك في كل زيارة.'],
        ['تنقل كالتطبيقات', 'شريط تنقل ثابت أسفل الشاشة، وحركة ناعمة لصورة الغلاف تتبع الماوس على الكمبيوتر.'],
        ['إحصاءات شفافة', 'عداد زيارات حقيقي مفتوح للجميع، بلا إعلانات ولا تتبع تجاري.'],
        ['تواصل مباشر', 'زر واتساب برسالة جاهزة لكل خدمة، وسيرة ذاتية باللغتين بضغطة واحدة.']
      ],
      aboutTitle: 'من هو؟',
      aboutBio: [
        'من طما، محافظة سوهاج، تخرج أحمد مختار عوض (صقر) في الثانوية العامة شعبة علمي رياضة بمجموع 92.25%، والتحق بكلية الهندسة جامعة سوهاج، هندسة كهرباء قسم اتصالات، وهو يعرف تمامًا إلى أين يتجه.',
        'شغفه بالأمن السيبراني والشبكات ليس مادة في منهج، بل حياة يومية: شهادتان من Cisco (محلل أمن سيبراني مبتدئ، وفني شبكات)، وشهادة مقدمة في الأمن السيبراني، وشهادة شبكات من منصة إدراك، وتدريب عملي مستمر على TryHackMe. يبني ويختبر ويتعلم بيده: من أنظمة IoT ذكية إلى مواقع كاملة صممها ونفذها بنفسه.',
        'لا ينتظر شهادة التخرج ليبدأ. مساره بدأ يتشكل من الآن، والهدف واضح: محلل SOC يُعتمد عليه.'
      ],
      facts: [
        ['الموقع', 'طما، سوهاج، مصر'],
        ['التعليم', 'هندسة كهرباء قسم اتصالات، جامعة سوهاج — الفرقة التالتة (٢٠٢٨) • الثانوية العامة علمي رياضة دفعة ٢٠٢٤ — 92.25%'],
        ['الهدف الحالي', 'تدريب SOC أو دعم فني']
      ],
      skillsTitle: 'المهارات',
      skills: [
        'شبكات الحاسب (مسار Cisco)',
        'أساسيات الأمن السيبراني',
        'Nmap',
        'Burp Suite',
        'Python',
        'C++',
        'LaTeX',
        'ICDL',
        'مهارات IT',
        'Arduino',
        'إنترنت الأشياء (IoT)',
        'TryHackMe — تدريب يومي'
      ],
      techTitle: 'التقنيات',
      tech: [
        { n: 'JavaScript', i: 'javascript' },
        { n: 'HTML5', i: 'html5' },
        { n: 'CSS3', i: 'css3' },
        { n: 'Tailwind CSS', i: 'tailwind' },
        { n: 'Python', i: 'python' },
        { n: 'Arduino', i: 'chip' },
        { n: 'GitHub Pages', i: 'github' }
      ],
      journeyPhotoAlt: 'أحمد بسترة أمان ممسكاً النموذج الأولي للمطب الصناعي الذكي في معرض مشاريع',
      journeyTitle: 'My Map',
      journeySub: 'خارطة رحلته خطوة بخطوة',
      journeyDone: 'تم بنجاح',
      journeyNext: 'الهدف القادم',
      journey: [
        ['الثانوية العامة 92.25%', 'شعبة علمي رياضة — طما، سوهاج.', true],
        ['هندسة سوهاج — كهرباء اتصالات', 'الفرقة التالتة، دفعة ٢٠٢٨.', true],
        ['المطب الصناعي الذكي', 'مشروع Arduino شغال، نفذته وعرضته بنفسي.', true],
        ['تعلم تطوير الويب', 'HTML وCSS وJavaScript وTailwind.', true],
        ['موقعي الشخصي', 'صممته ونفذته ونشرته بنفسي على GitHub Pages.', true],
        ['شهادات Cisco وإدراك', 'Network Technician + Junior Cybersecurity Analyst + Introduction to Cybersecurity + شبكات إدراك.', true],
        ['TryHackMe', 'تدريب عملي يومي مستمر على منصة TryHackMe.', true],
        ['لعبة «اجري يا صقر!»', 'لعبة جري كاملة بالجافاسكريبت برسوم كرتونية.', true],
        ['العمل الحر على خمسات', 'انطلاقة استقبال طلبات العملاء.', true],
        ['CCNA', 'أشهر شهادة شبكات من Cisco — الهدف الكبير القادم.', false],
        ['الجدران النارية وأمن الشبكات', 'تخصص أعمق في حماية الشبكات.', false],
        ['أول تدريب SOC', 'دخول غرفة عمليات الأمن الحقيقية.', false],
        ['التخرج والاحتراف', 'بكالوريوس هندسة الاتصالات، ثم مسار احترافي في الأمن السيبراني.', false]
      ],
      langsTitle: 'اللغات',
      langs: [
        ['العربية', 'اللغة الأم'],
        ['الإنجليزية', 'مستوى B2']
      ],
      certsEyebrow: 'CERTIFICATIONS',
      certsTitle: 'شهادات معتمدة',
      certsIntro: 'جميعها باسم Ahmed Mokhtar Awad. انقر على أي شهادة لعرضها كاملة.',
      certIssuers: ['Cisco Networking Academy', 'Cisco Networking Academy', 'Cisco Networking Academy — شهادة إتمام المساق', 'منصة إدراك'],
      certDate: '١٣ نوفمبر ٢٠٢٦',
      certAlts: [
        'شهادة Network Technician من Cisco Networking Academy',
        'شهادة Junior Cybersecurity Analyst من Cisco Networking Academy',
        'شهادة Introduction to Cybersecurity من Cisco Networking Academy',
        'شهادة Introduction To Networking من إدراك'
      ],
      certView: 'عرض شهادة',
      certsViewerTitle: 'الشهادات',
      projectsEyebrow: 'PROJECTS',
      projectsTitle: 'مشاريع نفذتها بنفسي',
      projects: [
        { name: 'المطب الصناعي الذكي', detail: 'مشروع إنترنت أشياء باستخدام Arduino: مطب صناعي ذكي يستشعر الحركة ويتفاعل معها.', img: 'photos/speed-bump.webp', imgAlt: 'أحمد مع النموذج الأولي للمطب الصناعي الذكي أمام كلية الهندسة بجامعة سوهاج' },
        { name: 'منصة تجارية', detail: 'تصميم وتنفيذ منصة تجارية لصالح عميل خاص — تفاصيل المشروع محفوظة التزاماً بسرية العمل مع العملاء.' },
        { name: 'اجري يا صقر!', detail: 'لعبة جري لا نهائية برسوم كرتونية عالية الجودة وتجربة موبايل كاملة — في مراحلها الأخيرة، قريباً.', img: 'photos/game-cover.webp', imgAlt: 'الغلاف الرسمي للعبة اجري يا صقر: العريس يجري ووالد العروسة والعروسة وراءه في شوارع مصرية' }
      ],
      checkupEyebrow: 'CHECK YOURSELF',
      checkupTitle: 'اطمّن على نفسك',
      checkupIntro: 'أربع أدوات سريعة تقيس مستوى حمايتك على الإنترنت. كل شيء يعمل على جهازك أنت، ولا يُرسَل أو يُحفظ أي شيء تكتبه هنا.',
      checkupBannerT: 'اطمّن على نفسك',
      checkupBannerS: 'فحص أمني مجاني وسريع: قوة كلمة السر، عاداتك، وعينك على الاحتيال — كل شيء على جهازك، لا يُرسَل أي شيء.',
      passTitle: 'اختبر قوة كلمة السر',
      passNote: 'اكتب كلمة سر تجريبية مشابهة لأسلوبك، وليست الحقيقية. لا تُحفظ ولا تغادر جهازك.',
      passPlaceholder: 'اكتب كلمة السر هنا',
      passLevels: ['ضعيفة جداً', 'ضعيفة', 'متوسطة', 'قوية', 'قوية جداً'],
      passTipsEmpty: 'ابدأ الكتابة وستظهر لك النصائح فوراً.',
      passTipLen: 'اجعلها 12 حرفاً على الأقل',
      passTipUpper: 'أضف حروفاً كبيرة وصغيرة',
      passTipDigit: 'أضف أرقاماً',
      passTipSymbol: 'أضف رموزاً مثل ! @ # $',
      passTipCommon: 'ابتعد عن الكلمات الشائعة والأرقام المتسلسلة',
      passTipGood: 'ممتازة! استخدم مدير كلمات مرور لتخزينها بأمان.',
      chkTitle: 'مراجعة عاداتك',
      chkNote: 'جاوب بصراحة، النتيجة لك أنت بس.',
      chkYes: 'أيوه',
      chkNo: 'لأ',
      chkItems: [
        'التحقق بخطوتين (2FA) مفعّل على إيميلك وحساباتك المهمة',
        'نظام جهازك ومتصفحك محدّثان لآخر إصدار',
        'عندك نسخة احتياطية من ملفاتك المهمة',
        'كل حساب له كلمة سر مختلفة',
        'شاشة قفل برقم سري أو بصمة على موبايلك وكمبيوترك',
        'تراجع عنوان أي رابط قبل الضغط عليه'
      ],
      chkScoreBad: 'محتاج تظبط الأساسيات — ابدأ بالتحقق بخطوتين وكلمة سر مختلفة لكل حساب.',
      chkScoreMid: 'كويس، بس لسه فيه ثغرات. كمّل النواقص دي وانت في أمان أكبر.',
      chkScoreGood: 'ممتاز! عاداتك أقوى من أغلب الناس. حافظ عليها.',
      quizTitle: 'عينك على الاحتيال',
      quizNote: 'كل موقف من دول حقيقي بيحصل كل يوم. اختار: آمن ولا احتيال؟',
      quizSafe: 'آمن',
      quizPhish: 'احتيال',
      quizCorrect: 'صح!',
      quizWrong: 'غلط، دي كانت ',
      quizItems: [
        { q: 'رسالة واتساب من رقم مش معروف: «مبروووك كسبت آيفون! ابعت بيانات كارتك البنكي عشان تستلم الجايزة»', phish: true, why: 'جايزة مجهتش ليك + طلب بيانات بنكية = احتيال مية المية.' },
        { q: 'إيميل شكله من البنك: «تم رصد تسجيل دخول جديد. لو مش حضرتك، سجّل دخولك من التطبيق الرسمي للبنك» — من غير روابط ولا طلب بيانات', phish: false, why: 'تنبيه حقيقي بيوجهك للتطبيق الرسمي ومش بيطلب بياناتك.' },
        { q: 'رسالة: «حسابك هيتقفل خلال 24 ساعة! دوس على اللينك فوراً واكتب باسوردك عشان تثبت هويتك»', phish: true, why: 'الاستعجال والتهديد بالقفل وطلب الباسورد أشهر علامات الاحتيال.' },
        { q: 'صاحبك بعتلك لينك غريب من غير أي كلام، وحسابه اتهكر قبل كده', phish: true, why: 'حتى لو من حد تعرفه: اسأله الأول قبل ما تدوس. حسابه ممكن يكون متسرق.' }
      ],
      quizDoneBad: 'الاحتيال غلبك المرة دي، بس دلوقتي عرفت العلامات. راجع الإجابات فوق.',
      quizDoneMid: 'عينك بدأت تتفتح. راجع اللي غلطت فيه وخليك شكاك أكتر.',
      quizDoneGood: 'عين صقر حقيقي! محدش هيعرف يضحك عليك بسهولة.',
      saqrFab: 'كلّم صقر',
      saqrTitle: 'صقر',
      saqrSub: 'مساعد أحمد الذكي',
      saqrWelcome: 'أهلاً! أنا صقر 🦅 مساعد المهندس أحمد. اسألني عن خدماته أو مشاريعه أو أي حاجة تانية.',
      saqrChips: ['مين أحمد؟', 'إيه خدماته؟', 'عايز موقع لشغلي'],
      saqrPlaceholder: 'اكتب سؤالك هنا...',
      saqrSend: 'إرسال',
      saqrClose: 'قفل الشات',
      saqrTyping: 'صقر بيكتب...',
      saqrError: 'حصلت مشكلة في الاتصال. جرّب تاني بعد شوية.',
      saqrSoon: 'صقر لسه بيتجهّز. ارجع بعد شوية وهتلاقيني هنا.',
      saqrMute: 'كتم صوت صقر',
      saqrReplay: 'اسمع الرد تاني 🔊',
      saqrUnmute: 'تشغيل صوت صقر',
      saqrMic: 'اتكلم بصوتك',
      saqrCall: 'مكالمة صوتية',
      saqrCallEnd: 'إنهاء المكالمة',
      saqrCallListening: 'اتكلم، صقر سامعك…',
      saqrCallSpeaking: 'صقر بيتكلم… اتكلم في أي وقت عشان تقاطعه',
      saqrCallThinking: 'صقر بيفكر…',
      saqrListening: 'بسمعك...',
      saqrConsentText: 'تحب نحتفظ بنص محادثتك عشان نطوّر صقر؟ بيتحفظ نص الشات بس (مش الصوت)، بشكل مجهول تمامًا، لمدة 180 يوم وبعدين بيتمسح لوحده، ومحدش يقدر يشوفه غير صاحب الموقع. بلاش تكتب بيانات شخصية حساسة في الشات.',
      saqrVoiceNotice: 'ثانية واحدة قبل ما تتكلم 🎙️ المتصفح هو اللي بيحوّل صوتك لكلام مكتوب، والخطوة دي ممكن تعدّي على خدمة الصوت بتاعة المتصفح نفسه (زي خدمة جوجل في كروم). الكلام المكتوب بيروح لصقر عشان يرد عليك. صوتك نفسه مش بيتحفظ عندنا خالص، ولو وافقت على حفظ المحادثة، اللي بيتحفظ هو النص بس.',
      saqrVoiceNoticeOk: 'تمام، فهمت',
      saqrConsentYes: 'موافق',
      saqrConsentNo: 'لا شكرًا',
      saqrConsentThanks: 'تمام، اختيارك اتسجّل 🦅',
      saqrGreeting: 'أهلا بيك! أنا صقر، اسألني أي حاجة.',
      servicesEyebrow: 'SERVICES',
      servicesTitle: 'خدماتي',
      servicesIntro: 'خدمات أقدمها بنفس الجودة التي تراها في هذا الموقع:',
      services: [
        { name: 'اطمّن على نفسك — فحص أمني شخصي', detail: 'فحص مجاني داخل التطبيق: اختبر قوة كلمة سرك، راجع عادات حمايتك، وجرّب عينك على رسائل الاحتيال. كل شيء يعمل على جهازك ولا يُرسَل أي شيء.', free: true },
        { name: 'صقر أكاديمي — كورسات مجانية بشهادة', detail: 'ثلاث مسارات مجانية: أمن سيبراني وبرمجة وشبكات، كل مسار ١٠ حلقات بالصوت والصورة، وفي آخره اختبار وشهادة إتمام.', free: true, href: '#/academy', cta: 'ادخل صقر أكاديمي', ico: 'navCap' },
        { name: 'موقع شخصي أو صفحة تعريفية', detail: 'صفحة واحدة أنيقة وسريعة، مصممة للموبايل أولاً — تماماً مثل هذا الموقع.' },
        { name: 'صفحة هبوط لنشاطك التجاري', detail: 'صفحة تعرّف بمنتجك أو خدمتك وتجلب لك العملاء، مع أزرار تواصل جاهزة.' },
        { name: 'لعبة متصفح خفيفة', detail: 'لعبة جافاسكريبت كاملة تعمل من المتصفح على الموبايل والكمبيوتر.' },
        { name: 'تأمين وفحص أجهزتك وشبكتك', detail: 'مراجعة أساسية لإعدادات الأمان لجهازك أو شبكتك الصغيرة، مع خطوات عملية للحماية بمعايير Cisco.' },
        { name: 'إنشاء منصة تعليمية', detail: 'منصة كورسات كاملة: فيديوهات واختبارات ولوحة تحكم للطلاب، جاهزة تستقبل مشتركين من أول يوم.' },
        { name: 'إنشاء متجر إلكتروني', detail: 'متجر كامل بسلة شراء وبوابة دفع وإدارة منتجات، جاهز يبيع من أول يوم.' },
        { name: 'شات بوت للبيزنس', detail: 'بوت واتساب أو تليجرام يرد على عملائك تلقائياً، يستقبل الطلبات ويجاوب على الأسئلة الشائعة.' },
        { name: 'تسريع وتحسين المواقع', detail: 'تشخيص شامل لموقعك البطيء ورفع سرعته ونتائجه في محركات البحث.' },
        { name: 'دعم فني وصيانة عن بعد', detail: 'حل مشاكل جهازك وبرامجك عن بعد، وصيانة دورية تخليك مطمئن.' },
        { name: 'إدارة حماية الأجهزة والشبكات للشركات الصغيرة', detail: 'اشتراك شهري: تثبيت وإدارة حماية أعمال موثوقة (مثل Bitdefender أو Malwarebytes للأعمال) على أجهزة شركتك، ومتابعة التنبيهات والتقارير أولاً بأول، مع دعم مستمر.' }
      ],
      serviceFree: 'مجاني',
      serviceFreeCta: 'ابدأ الفحص',
      serviceWa: 'اطلب الخدمة',
      serviceWaLinks: [
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D9%85%D9%88%D9%82%D8%B9+%D8%B4%D8%AE%D8%B5%D9%8A+%D8%A3%D9%88+%D8%B5%D9%81%D8%AD%D8%A9+%D8%AA%D8%B9%D8%B1%D9%8A%D9%81%D9%8A%D8%A9',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%B5%D9%81%D8%AD%D8%A9+%D9%87%D8%A8%D9%88%D8%B7+%D9%84%D9%86%D8%B4%D8%A7%D8%B7%D9%8A+%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D9%8A',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D9%84%D8%B9%D8%A8%D8%A9+%D9%85%D8%AA%D8%B5%D9%81%D8%AD+%D8%AE%D9%81%D9%8A%D9%81%D8%A9',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%AA%D8%A3%D9%85%D9%8A%D9%86+%D9%88%D9%81%D8%AD%D8%B5+%D8%A3%D8%AC%D9%87%D8%B2%D8%AA%D9%8A+%D9%88%D8%B4%D8%A8%D9%83%D8%AA%D9%8A'
  ,
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%A5%D9%86%D8%B4%D8%A7%D8%A1+%D9%85%D9%86%D8%B5%D8%A9+%D8%AA%D8%B9%D9%84%D9%8A%D9%85%D9%8A%D8%A9',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%A5%D9%86%D8%B4%D8%A7%D8%A1+%D9%85%D8%AA%D8%AC%D8%B1+%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%B4%D8%A7%D8%AA+%D8%A8%D9%88%D8%AA+%D9%84%D9%84%D8%A8%D9%8A%D8%B2%D9%86%D8%B3',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%AA%D8%B3%D8%B1%D9%8A%D8%B9+%D9%88%D8%AA%D8%AD%D8%B3%D9%8A%D9%86+%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%82%D8%B9',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%AF%D8%B9%D9%85+%D9%81%D9%86%D9%8A+%D9%88%D8%B5%D9%8A%D8%A7%D9%86%D8%A9+%D8%B9%D9%86+%D8%A8%D8%B9%D8%AF',
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9+%D8%AD%D9%85%D8%A7%D9%8A%D8%A9+%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9+%D9%88%D8%A7%D9%84%D8%B4%D8%A8%D9%83%D8%A7%D8%AA+%D9%84%D9%84%D8%B4%D8%B1%D9%83%D8%A7%D8%AA+%D8%A7%D9%84%D8%B5%D8%BA%D9%8A%D8%B1%D8%A9'
      ],
      cvArBtn: 'السيرة الذاتية بالعربية',
      khamsatSoon: 'قريباً: اطلب خدماتي عبر منصة خمسات',
      contactEyebrow: 'CONTACT',
      contactTitle: 'تواصل معي',
      contactIntro: 'للتدريبات والفرص المهنية، أسهل طريقتين للتواصل معي:',
      followTitle: 'تابعني على',
      socials: ['فيسبوك', 'تليجرام', 'واتساب', 'إنستجرام', 'جيتهاب', 'تيك توك', 'إكس', 'ايمو'],
      cvBtn: 'عرض سيرتي الذاتية (CV)',
      closing: 'أُعدت للمراجعة في ٢٥ نوفمبر ٢٠٢٦.',
      toggleLabel: 'English',
      themeLabel: 'الوضع الليلي'
    },
    en: {
      navAria: 'Site pages',
      nav: ['Home', 'The App', 'About', 'Certifications', 'Projects', 'Services', 'Contact'],
      brandName: 'Sakr World',
      heroAlt: 'Ahmed Sakr in a formal navy suit on a simple studio background',
      verifiedTitle: "Ahmed Mokhtar Sakr's official website",
      nameAr: 'أحمد مختار عوض',
      engPrefix: 'Eng.',
      role: 'Junior Cybersecurity Analyst · Network Technician · Software & Games Designer',
      purposeTitle: 'Purpose of the app',
      tagline: 'To be the official home of Eng. Ahmed Mokhtar Sakr: one place for his services, projects and certifications, with a direct line to reach him and order your service in one tap, and where any visitor can check their own digital safety with a free personal checkup that runs entirely on their device, plus a free Sakr Academy with courses in cybersecurity, programming and networking, each ending with a completion certificate.',
      visitsTitle: 'Site visit count',
      chips: ['Tima, Sohag, Egypt', 'Electrical Engineering, Communications student', 'Goal: SOC internship'],
      ctaProjects: 'See my projects',
      ctaContact: 'Contact me',
      ctaServices: 'My services',
      ctaServicesSub: 'Order your service',
      aboutEyebrow: 'ABOUT',
      appEyebrow: 'THE APP',
      appTitle: 'About the app',
      appIntro: 'This is not just a website; it is a progressive web app (PWA) designed and built from scratch to work like a real app on phone and desktop:',
      appFeatures: [
        ['Saqr, the voice assistant', 'A smart assistant that talks and answers visitors out loud, working inside the chat and staying with them while they keep browsing any page of the site.'],
        ['Installable', 'Installs in one tap from the "Install app" button, and opens with its own falcon icon as an app independent of the browser.'],
        ['Bilingual', 'Arabic and English with instant switching, with full text-direction support in both languages.'],
        ['Self-updating', 'Watches for new versions and shows an "Update available" notice, so the latest arrives with one tap on "Refresh".'],
        ['Fast and light', 'WebP-compressed images and locally hosted fonts, so it opens in a blink even on a weak connection.'],
        ['Dark and light', 'Dark and light modes with eye-friendly colors, and it remembers your choice on every visit.'],
        ['App-like navigation', 'A fixed navigation bar at the bottom of the screen, and a soft hero-photo motion that follows the mouse on desktop.'],
        ['Transparent stats', 'A real visitor counter open to everyone, with no ads and no commercial tracking.'],
        ['Direct contact', 'A WhatsApp button with a ready message for every service, and a CV in both languages one tap away.']
      ],
      aboutTitle: 'Who is he?',
      aboutBio: [
        'From Tima, Sohag Governorate, Ahmed Mokhtar Awad (Sakr) graduated from Thanaweya Amma, advanced mathematics track, with a score of 92.25%, and entered the Faculty of Engineering at Sohag University, Electrical Engineering, Communications section, knowing exactly where he was headed.',
        'His passion for cybersecurity and networking is not a course in a curriculum; it is a daily life: two Cisco certifications (Junior Cybersecurity Analyst and Network Technician), an Introduction to Cybersecurity certificate, a networking certificate from the Edraak platform, and continuous hands-on training on TryHackMe. He builds, tests, and learns with his own hands: from smart IoT systems to complete websites he designed and built himself.',
        'He is not waiting for his graduation certificate to begin. His path is being built right now, and the goal is clear: a SOC analyst you can rely on.'
      ],
      facts: [
        ['Location', 'Tima, Sohag, Egypt'],
        ['Education', 'Electrical Engineering, Communications section, Sohag University — Third year (2028) • Thanaweya Amma, advanced math track, class of 2024 — 92.25%'],
        ['Current goal', 'SOC internship or technical support']
      ],
      skillsTitle: 'Skills',
      skills: [
        'Computer Networking (Cisco track)',
        'Cybersecurity Fundamentals',
        'Nmap',
        'Burp Suite',
        'Python',
        'C++',
        'LaTeX',
        'ICDL',
        'IT skills',
        'Arduino',
        'Internet of Things (IoT)',
        'TryHackMe — daily practice'
      ],
      techTitle: 'Tech stack',
      tech: [
        { n: 'JavaScript', i: 'javascript' },
        { n: 'HTML5', i: 'html5' },
        { n: 'CSS3', i: 'css3' },
        { n: 'Tailwind CSS', i: 'tailwind' },
        { n: 'Python', i: 'python' },
        { n: 'Arduino', i: 'chip' },
        { n: 'GitHub Pages', i: 'github' }
      ],
      journeyPhotoAlt: 'Ahmed in a safety vest holding the Smart Speed Bump prototype at a projects exhibition',
      journeyTitle: 'My Map',
      journeySub: 'My path, step by step',
      journeyDone: 'Done',
      journeyNext: 'Up next',
      journey: [
        ['Thanaweya Amma, 92.25%', 'Advanced mathematics track — Tima, Sohag.', true],
        ['Sohag Engineering, EE Communications', 'Third year, class of 2028.', true],
        ['The Smart Speed Bump', 'A working Arduino project I built and presented myself.', true],
        ['Learning web development', 'HTML, CSS, JavaScript and Tailwind.', true],
        ['My personal website', 'Designed, built and published it myself on GitHub Pages.', true],
        ['Cisco and Edraak certificates', 'Network Technician + Junior Cybersecurity Analyst + Introduction to Cybersecurity + Edraak Networking.', true],
        ['TryHackMe', 'Continuous daily hands-on practice on TryHackMe.', true],
        ['"Run, Sakr!" game', 'A complete JavaScript endless-runner with cartoon art.', true],
        ['Freelancing on Khamsat', 'Starting to take client orders.', true],
        ['CCNA', 'Cisco\'s flagship networking certificate — the next big goal.', false],
        ['Firewalls and network security', 'A deeper specialization in protecting networks.', false],
        ['First SOC internship', 'Entering a real security operations room.', false],
        ['Graduation and going pro', 'A Communications Engineering degree, then a professional cybersecurity career.', false]
      ],
      langsTitle: 'Languages',
      langs: [
        ['Arabic', 'Native'],
        ['English', 'B2 level']
      ],
      certsEyebrow: 'CERTIFICATIONS',
      certsTitle: 'Certifications',
      certsIntro: 'All awarded to Ahmed Mokhtar Awad. Click any certificate to view it in full.',
      certIssuers: ['Cisco Networking Academy', 'Cisco Networking Academy', 'Cisco Networking Academy — course completion', 'Edraak platform'],
      certDate: 'November 13, 2026',
      certAlts: [
        'Network Technician certificate from Cisco Networking Academy',
        'Junior Cybersecurity Analyst certificate from Cisco Networking Academy',
        'Introduction to Cybersecurity certificate from Cisco Networking Academy',
        'Introduction To Networking certificate from Edraak'
      ],
      certView: 'View certificate',
      certsViewerTitle: 'Certificates',
      projectsEyebrow: 'PROJECTS',
      projectsTitle: 'Things I built myself',
      projects: [
        { name: 'The Smart Speed Bump', detail: 'An Arduino IoT project: a smart speed bump that senses motion and reacts.', img: 'photos/speed-bump.webp', imgAlt: 'Ahmed holding the Smart Speed Bump prototype at the Faculty of Engineering, Sohag University' },
        { name: 'Commercial Platform', detail: 'Design and delivery of a commercial platform for a private client — project details kept confidential under client privacy.' },
        { name: 'Run, Sakr! (اجري يا صقر)', detail: 'An endless-runner mobile game with high-quality cartoon art and a full gameplay experience — in final stages, coming soon.', img: 'photos/game-cover.webp', imgAlt: 'Official cover art of Run Sakr: the groom sprinting away from the bride and her father through Egyptian streets' }
      ],
      checkupEyebrow: 'CHECK YOURSELF',
      checkupTitle: 'Check yourself',
      checkupIntro: 'Four quick tools that measure how protected you are online. Everything runs on your own device, and nothing you type is sent or saved anywhere.',
      checkupBannerT: 'Check yourself',
      checkupBannerS: 'A free quick security checkup: password strength, your habits, and your phishing radar. All on your device, nothing is sent.',
      passTitle: 'Test your password strength',
      passNote: 'Type a sample password similar to your style, not your real one. It is never saved or sent.',
      passPlaceholder: 'Type a password here',
      passLevels: ['Very weak', 'Weak', 'Medium', 'Strong', 'Very strong'],
      passTipsEmpty: 'Start typing and tips will appear instantly.',
      passTipLen: 'Make it at least 12 characters',
      passTipUpper: 'Mix upper and lower case letters',
      passTipDigit: 'Add numbers',
      passTipSymbol: 'Add symbols like ! @ # $',
      passTipCommon: 'Avoid common words and sequences',
      passTipGood: 'Excellent! Store it safely with a password manager.',
      chkTitle: 'Review your habits',
      chkNote: 'Answer honestly, the result is for you only.',
      chkYes: 'Yes',
      chkNo: 'No',
      chkItems: [
        'Two-factor authentication (2FA) is on for your email and important accounts',
        'Your device OS and browser are updated to the latest version',
        'You have a backup of your important files',
        'Every account has a different password',
        'Your phone and computer have a lock screen PIN or fingerprint',
        'You check the address of any link before tapping it'
      ],
      chkScoreBad: 'You need to fix the basics, start with 2FA and a different password for every account.',
      chkScoreMid: 'Good, but there are still gaps. Close them and you will be much safer.',
      chkScoreGood: 'Excellent! Your habits are stronger than most people. Keep them up.',
      quizTitle: 'Your phishing radar',
      quizNote: 'Each of these situations really happens every day. Choose: safe or phishing?',
      quizSafe: 'Safe',
      quizPhish: 'Phishing',
      quizCorrect: 'Correct!',
      quizWrong: 'Nope, that was ',
      quizItems: [
        { q: 'A WhatsApp message from an unknown number: "CONGRATS you won an iPhone! Send your bank card details to receive your prize"', phish: true, why: 'A prize you never entered plus a request for bank details equals certain phishing.' },
        { q: 'An email that looks like your bank: "A new sign-in was detected. If this was not you, sign in from the bank\'s official app" - no links, no data requests', phish: false, why: 'A real alert that points you to the official app and asks for nothing.' },
        { q: 'A message: "Your account will be locked within 24 hours! Tap this link NOW and enter your password to verify your identity"', phish: true, why: 'Urgency, threats, and asking for your password are the classic phishing signs.' },
        { q: 'Your friend sends you a strange link with no message, and his account was hacked before', phish: true, why: 'Even from someone you know: ask him first before tapping. His account may be stolen.' }
      ],
      quizDoneBad: 'Phishing got you this time, but now you know the signs. Review the answers above.',
      quizDoneMid: 'Your radar is waking up. Review what you missed and stay skeptical.',
      quizDoneGood: 'A true falcon eye! Nobody will fool you easily.',
      saqrFab: 'Ask Saqr',
      saqrTitle: 'Saqr',
      saqrSub: "Ahmed's AI assistant",
      saqrWelcome: "Hey! I'm Saqr 🦅, Eng. Ahmed's assistant. Ask me about his services, projects, or anything else.",
      saqrChips: ['Who is Ahmed?', 'What services?', 'I need a website'],
      saqrPlaceholder: 'Type your question...',
      saqrSend: 'Send',
      saqrClose: 'Close chat',
      saqrTyping: 'Saqr is typing...',
      saqrError: 'Connection problem. Try again in a moment.',
      saqrSoon: 'Saqr is still getting ready. Check back soon.',
      saqrMute: 'Mute Saqr voice',
      saqrReplay: 'Hear this reply again 🔊',
      saqrUnmute: 'Unmute Saqr voice',
      saqrMic: 'Speak your question',
      saqrCall: 'Voice call',
      saqrCallEnd: 'End call',
      saqrCallListening: 'Speak, Saqr is listening…',
      saqrCallSpeaking: 'Saqr is speaking… talk anytime to interrupt',
      saqrCallThinking: 'Saqr is thinking…',
      saqrListening: 'Listening...',
      saqrConsentText: "Mind if we keep this chat's text so we can improve Saqr? Only the chat text is saved (not audio), fully anonymous, kept for 180 days and then deleted automatically, and readable only by the site owner. Please avoid typing sensitive personal details in the chat.",
      saqrVoiceNotice: "One quick thing before you talk 🎙️ Your browser turns your voice into text, and that step may go through the browser's own speech service (like Google's in Chrome). The text goes to Saqr so he can reply. Your voice itself is never stored on our side, and if you agree to save the chat, only the text is kept.",
      saqrVoiceNoticeOk: 'Got it',
      saqrConsentYes: 'Sure',
      saqrConsentNo: 'No thanks',
      saqrConsentThanks: 'Got it, your choice is saved 🦅',
      saqrGreeting: "Hey there! I'm Saqr, ask me anything.",
      servicesEyebrow: 'SERVICES',
      servicesTitle: 'My services',
      servicesIntro: 'What I can build for you, with the same quality you see on this site:',
      services: [
        { name: 'Check yourself - personal security checkup', detail: 'A free in-app checkup: test your password strength, review your security habits, and try your phishing radar. Everything runs on your device, nothing is sent.', free: true },
        { name: 'Sakr Academy - free courses with certificates', detail: 'Three free tracks: cybersecurity, programming and networking. Each has 10 video episodes, a final exam and a completion certificate.', free: true, href: '#/academy', cta: 'Open Sakr Academy', ico: 'navCap' },
        { name: 'Personal one-page website', detail: 'A clean, fast, mobile-first page — just like this very site.' },
        { name: 'Landing page for your business', detail: 'A page that presents your product or service and brings you customers, with ready contact buttons.' },
        { name: 'A light browser game', detail: 'A complete JavaScript game that runs in the browser on mobile and desktop.' },
        { name: 'Security checkup for your devices and network', detail: 'A basic review of the security settings of your device or small network, with practical hardening steps following Cisco standards.' },
        { name: 'Educational platform', detail: 'A complete course platform with videos, quizzes and a student dashboard, ready to take subscribers from day one.' },
        { name: 'Online store', detail: 'A complete store with cart, payment gateway and product management, ready to sell from day one.' },
        { name: 'Business chatbot', detail: 'A WhatsApp or Telegram bot that replies to your customers automatically, takes orders and answers common questions.' },
        { name: 'Website speed optimization', detail: 'A full diagnosis of your slow website, boosting its speed and search engine scores.' },
        { name: 'Remote tech support and maintenance', detail: 'Fixing your device and software issues remotely, with regular maintenance for peace of mind.' },
        { name: 'Managed security for small businesses', detail: 'A monthly subscription: I set up and manage trusted business-grade protection (like Bitdefender or Malwarebytes for business) on your company devices, watch alerts and reports, and stay on call for support.' }
      ],
      serviceFree: 'FREE',
      serviceFreeCta: 'Start the checkup',
      serviceWa: 'Order on WhatsApp',
      serviceWaLinks: [
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Personal+one-page+website',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Landing+page+for+my+business',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+A+light+browser+game',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Security+checkup+for+my+devices+and+network'
  ,
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Educational+platform',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Online+store',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Business+chatbot',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Website+speed+optimization',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Remote+tech+support+and+maintenance',
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Managed+security+for+small+business+devices+and+networks'
      ],
      cvArBtn: 'My CV in Arabic',
      khamsatSoon: 'Coming soon: order my services on Khamsat',
      contactEyebrow: 'CONTACT',
      contactTitle: 'Contact me',
      contactIntro: 'For internships and professional opportunities, the two easiest ways to reach me:',
      followTitle: 'Follow me on',
      socials: ['Facebook', 'Telegram', 'WhatsApp', 'Instagram', 'GitHub', 'TikTok', 'X', 'imo'],
      cvBtn: 'View my CV',
      closing: 'Prepared for review on November 25, 2026.',
      toggleLabel: 'العربية',
      themeLabel: 'Dark mode'
    }
  };

  // Saqr AI chat backend (Cloudflare Worker). Empty = not deployed yet.
  var SAQR_WORKER_URL = 'https://saqr-ahmed.ahmedsakr5326.workers.dev/chat';

  // Live site config from the admin dashboard (served by the worker from KV).
  function pfShowBanner(text) {
    if (document.getElementById('pf-banner')) return;
    var bar = document.createElement('div');
    bar.id = 'pf-banner';
    bar.setAttribute('role', 'status');
    bar.innerHTML = '<span class="pf-banner-txt">' + esc(text) + '</span><button type="button" class="pf-banner-x" aria-label="إغلاق">\u00d7</button>';
    bar.querySelector('.pf-banner-x').addEventListener('click', function () { bar.remove(); });
    document.body.insertBefore(bar, document.body.firstChild);
  }
  fetch(SAQR_WORKER_URL.replace(/\/chat$/, '/chat/status'))
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (cfg) {
      if (!cfg || typeof cfg !== 'object') return;
      try {
        if (cfg.saqr === false) document.body.classList.add('pf-hide-saqr');
        if (cfg.checkup === false) document.body.classList.add('pf-hide-checkup');
        if (cfg.academy === false) document.body.classList.add('pf-hide-academy');
        if (cfg.banner) pfShowBanner(String(cfg.banner));
        if (cfg.palette && cfg.palette !== 'teal') document.body.setAttribute('data-palette', String(cfg.palette));
        if (cfg.appearance === 'dark' || cfg.appearance === 'light') {
          var storedTheme = null;
          try { storedTheme = localStorage.getItem('pf-theme'); } catch (e) {}
          if (!storedTheme && !themeParam) { theme = cfg.appearance; document.documentElement.setAttribute('data-theme', theme); }
        }
        var changed = false;
        if (cfg.name_ar && T.ar) { T.ar.nameAr = String(cfg.name_ar); changed = true; }
        if (cfg.name_en && T.en) { T.en.nameAr = String(cfg.name_en); changed = true; }
        if (cfg.saqr_name) {
          var sn = String(cfg.saqr_name);
          ['saqrFab', 'saqrTitle', 'saqrGreeting'].forEach(function (k) {
            if (T.ar && T.ar[k]) T.ar[k] = T.ar[k].split('صقر').join(sn);
            if (T.en && T.en[k]) T.en[k] = T.en[k].split('Saqr').join(sn);
          });
          changed = true;
        }
        if (changed) render();
      } catch (e) { /* config apply failed: site keeps defaults */ }
    })
    .catch(function () { /* offline or blocked: site keeps defaults */ });

  var lang = 'ar';
  try { lang = localStorage.getItem('pf-lang') === 'en' ? 'en' : 'ar'; } catch (e) {}
  var theme = 'light';
  try { theme = localStorage.getItem('pf-theme') === 'dark' ? 'dark' : 'light'; } catch (e) {}
  var langParam = (location.search.match(/[?&]lang=(ar|en)/) || [])[1];
  if (langParam) lang = langParam;
  var themeParam = (location.search.match(/[?&]theme=(light|dark)/) || [])[1];
  if (themeParam) theme = themeParam;
  if (/[?&]anim=off/.test(location.search)) document.documentElement.classList.add('pf-no-anim');
  var openCert = -1;

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function bdi(s) { return '<bdi>' + esc(s) + '</bdi>'; }

  function pageHead(eyebrow, title) {
    return '<div class="pf-pagehead"><div class="pf-eyebrow">' + esc(eyebrow) + '</div><h2 class="pf-h2">' + esc(title) + '</h2></div>';
  }

  function renderHome(t) {
    return '<div class="pf-page"><div class="pf-hero">' +
      '<div class="pf-hero-glow pf-glow-a"></div><div class="pf-hero-glow pf-glow-b"></div>' +
      '<div class="pf-hero-inner">' +
      '<div class="pf-portrait"><img src="photos/about-studio.webp" alt="' + esc(t.heroAlt) + '" fetchpriority="high"></div>' +
      '<div class="pf-hero-text">' +
      '<div class="pf-brandline">' + esc(t.brandName) + '</div>' +
      '<div class="pf-name-en">ENG. AHMED MOKHTAR AWAD <span class="pf-nick-en">SAKR</span></div>' +
      '<h1 class="pf-name"><span class="pf-eng">' + esc(t.engPrefix) + '</span> ' + esc(t.nameAr) + ' <span class="pf-nickwrap"><span class="pf-nick">صقر</span> <span class="pf-verified" title="' + esc(t.verifiedTitle) + '" role="img" aria-label="' + esc(t.verifiedTitle) + '">' + icon('verified') + '</span></span></h1>' +
      '<div class="pf-role"><bdi>' + esc(t.role) + '</bdi></div>' +
      '<div class="pf-purpose-label">' + esc(t.purposeTitle) + '</div><p class="pf-tagline">' + esc(t.tagline) + '</p>' +
      '<div class="pf-chips">' + t.chips.map(function (c) { return '<span class="pf-chip">' + esc(c) + '</span>'; }).join('') + '</div>' +
      '<div class="pf-cta">' +
      '<a class="pf-btn pf-btn-services" href="#/services">' + icon('navGrid') + '<span>' + esc(t.ctaServices) + '<small>' + esc(t.ctaServicesSub) + '</small></span></a>' +
      '<a class="pf-btn pf-btn-primary" href="#/projects">' + esc(t.ctaProjects) + '</a>' +
      '<a class="pf-btn pf-btn-ghost" href="#/contact">' + esc(t.ctaContact) + '</a>' +
      '</div>' +
      '<div class="pf-visits" title="' + esc(t.visitsTitle) + '"><img src="https://hits.sh/ahmedsakr53.github.io/hits.svg?label=%F0%9F%91%81&color=2f7fd4&style=flat" alt="' + esc(t.visitsTitle) + '" loading="lazy"></div>' +
      '</div></div></div>' +
      '<a class="pf-checkup-banner" href="#/checkup">' + icon('navShield') + '<span><b>' + esc(t.checkupBannerT) + '</b><small>' + esc(t.checkupBannerS) + '</small></span></a>' +
      '<a class="pf-checkup-banner pf-map-banner" href="#/map">' + icon('navGlobe') + '<span><b>' + esc(lang === 'ar' ? 'الزوار دلوقتي على الخريطة' : 'Live visitor map') + '</b><small>' + esc(lang === 'ar' ? 'شوف مين بيتصفح الموقع دلوقتي ومن أنهي دولة' : 'See who is browsing the site right now, and from which countries') + '</small></span></a></div>';
  }

  function renderApp(t) {
    var cards = t.appFeatures.map(function (f, i) {
      return '<div class="pf-card"><div class="pf-card-num">' + (i + 1) + '</div>' +
        '<div class="pf-card-name">' + esc(f[0]) + '</div>' +
        '<div class="pf-card-detail">' + esc(f[1]) + '</div></div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.appEyebrow, t.appTitle) +
      '<p class="pf-para">' + esc(t.appIntro) + '</p>' +
      '<div class="pf-grid">' + cards + '</div></div>';
  }

  function renderAbout(t) {
    return '<div class="pf-page">' + pageHead(t.aboutEyebrow, t.aboutTitle) +
      t.aboutBio.map(function (p) { return '<p class="pf-para">' + esc(p) + '</p>'; }).join('') +
      '<div class="pf-facts">' + t.facts.map(function (f) {
        return '<div class="pf-fact"><span class="pf-fact-label">' + esc(f[0]) + '</span><span class="pf-fact-value">' + esc(f[1]) + '</span></div>';
      }).join('') + '</div>' +
      '<h3 class="pf-h3">' + esc(t.techTitle) + '</h3>' +
      '<div class="pf-skills">' + t.tech.map(function (s) { return '<span class="pf-skill pf-tech">' + icon(s.i) + '<bdi>' + esc(s.n) + '</bdi></span>'; }).join('') + '</div>' +
      '<h3 class="pf-h3">' + esc(t.skillsTitle) + '</h3>' +
      '<div class="pf-skills">' + t.skills.map(function (s) { return '<span class="pf-skill"><bdi>' + esc(s) + '</bdi></span>'; }).join('') + '</div>' +
      '<h3 class="pf-h3">' + esc(t.langsTitle) + '</h3>' +
      '<div class="pf-langs">' + t.langs.map(function (l) {
        return '<div class="pf-lang"><span class="pf-lang-name">' + esc(l[0]) + '</span><span class="pf-lang-level">' + esc(l[1]) + '</span></div>';
      }).join('') + '</div>' +
      '<div class="pf-about-photo"><img src="photos/speed-bump-vest.webp" alt="' + esc(t.journeyPhotoAlt) + '" loading="lazy"></div>' +
      '<h3 class="pf-h3 pf-map-title">' + icon('pin') + '<span class="pf-map-word">' + esc(t.journeyTitle) + '</span><span class="pf-map-sub">' + esc(t.journeySub) + '</span></h3>' +
      '<div class="pf-timeline">' + t.journey.map(function (j) {
        var done = j[2];
        return '<div class="pf-timeline-item ' + (done ? 'pf-tl-done' : 'pf-tl-next') + '">' +
          '<div class="pf-timeline-dot">' + (done ? '&#10003;' : '') + '</div>' +
          '<div class="pf-timeline-card">' +
          '<div class="pf-timeline-state">' + esc(done ? t.journeyDone : t.journeyNext) + '</div>' +
          '<div class="pf-timeline-name">' + esc(j[0]) + '</div>' +
          '<div class="pf-timeline-detail">' + esc(j[1]) + '</div></div></div>';
      }).join('') + '</div></div>';
  }

  function renderCerts(t) {
    var cards = certNames.map(function (name, i) {
      return '<div class="pf-card pf-cert">' +
        '<button type="button" class="pf-cert-imgbtn" data-cert="' + i + '" aria-label="' + esc(t.certView + ' ' + name) + '">' +
        '<img src="' + certImages[i] + '" alt="' + esc(t.certAlts[i]) + '" loading="lazy"></button>' +
        '<div class="pf-card-num">' + (i + 1) + '</div>' +
        '<div class="pf-card-name">' + bdi(name) + '</div>' +
        '<div class="pf-card-detail">' + bdi(t.certIssuers[i]) + '</div>' +
        '<div class="pf-card-date">' + esc(t.certDate) + '</div></div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.certsEyebrow, t.certsTitle) +
      '<p class="pf-para">' + esc(t.certsIntro) + '</p>' +
      '<div class="pf-grid">' + cards + '</div></div>';
  }

  function renderProjects(t) {
    var cards = t.projects.map(function (p, i) {
      var body = '<div class="pf-card-num">' + (i + 1) + '</div>' +
        '<div class="pf-card-name">' + esc(p.name) + '</div>' +
        '<div class="pf-card-detail">' + esc(p.detail) + '</div>';
      if (p.imgs) return '<div class="pf-card pf-card-media">' +
        '<div class="pf-card-media-imgs">' + p.imgs.map(function (src, k) {
          return '<img src="' + esc(src) + '" alt="' + esc((p.imgAlts && p.imgAlts[k]) || p.name) + '" loading="lazy">';
        }).join('') + '</div>' +
        '<div class="pf-card-media-body">' + body + '</div></div>';
      if (p.img) return '<div class="pf-card pf-card-media">' +
        '<div class="pf-card-media-img"><img src="' + esc(p.img) + '" alt="' + esc(p.imgAlt || p.name) + '" loading="lazy"></div>' +
        '<div class="pf-card-media-body">' + body + '</div></div>';
      return '<div class="pf-card">' + body + '</div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.projectsEyebrow, t.projectsTitle) +
      '<div class="pf-grid">' + cards + '</div></div>';
  }

  function renderServices(t) {
    var waIdx = 0;
    var cards = t.services.map(function (s, i) {
      var btn;
      if (s.free) {
        btn = '<a class="pf-btn pf-btn-services pf-service-free" href="' + (s.href || '#/checkup') + '">' + icon(s.ico || 'navShield') + esc(s.cta || t.serviceFreeCta) + '</a>';
      } else {
        btn = '<a class="pf-btn pf-btn-primary pf-service-wa" href="' + t.serviceWaLinks[waIdx++] + '" target="_blank" rel="noopener">' + icon('whatsapp') + esc(t.serviceWa) + '</a>';
      }
      return '<div class="pf-card' + (s.free ? ' pf-card-free' : '') + '"><div class="pf-card-num">' + (i + 1) + '</div>' +
        (s.free ? '<span class="pf-free-badge">' + esc(t.serviceFree) + '</span>' : '') +
        '<div class="pf-card-name">' + esc(s.name) + '</div>' +
        '<div class="pf-card-detail">' + esc(s.detail) + '</div>' + btn + '</div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.servicesEyebrow, t.servicesTitle) +
      '<p class="pf-para">' + esc(t.servicesIntro) + '</p>' +
      '<div class="pf-grid">' + cards + '</div>' +
      '<div class="pf-contact"><span class="pf-btn pf-btn-ghost pf-btn-soon">' + icon('store') + esc(t.khamsatSoon) + '</span></div></div>';
  }

  function renderCheckup(t) {
    var chk = t.chkItems.map(function (q, i) {
      return '<div class="pf-card pf-chk-item" data-chk="' + i + '">' +
        '<div class="pf-chk-q">' + esc(q) + '</div>' +
        '<div class="pf-chk-btns"><button type="button" class="pf-chk-btn" data-val="1">' + esc(t.chkYes) + '</button>' +
        '<button type="button" class="pf-chk-btn" data-val="0">' + esc(t.chkNo) + '</button></div></div>';
    }).join('');
    var quiz = t.quizItems.map(function (item, i) {
      return '<div class="pf-card pf-quiz-item" data-quiz="' + i + '">' +
        '<div class="pf-chk-q">' + esc(item.q) + '</div>' +
        '<div class="pf-chk-btns"><button type="button" class="pf-chk-btn pf-quiz-safe" data-ans="0">' + esc(t.quizSafe) + '</button>' +
        '<button type="button" class="pf-chk-btn pf-quiz-phish" data-ans="1">' + esc(t.quizPhish) + '</button></div>' +
        '<div class="pf-quiz-why" hidden></div></div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.checkupEyebrow, t.checkupTitle) +
      '<p class="pf-para">' + esc(t.checkupIntro) + '</p>' +
      '<h3 class="pf-h3">' + esc(t.passTitle) + '</h3>' +
      '<div class="pf-card pf-pass-card">' +
      '<div class="pf-card-detail">' + esc(t.passNote) + '</div>' +
      '<input type="password" class="pf-pass-input" id="pf-pass" placeholder="' + esc(t.passPlaceholder) + '" autocomplete="off">' +
      '<div class="pf-pass-meter"><div class="pf-pass-fill" id="pf-pass-fill"></div></div>' +
      '<div class="pf-pass-label" id="pf-pass-label"></div>' +
      '<div class="pf-pass-tips" id="pf-pass-tips">' + esc(t.passTipsEmpty) + '</div></div>' +
      '<h3 class="pf-h3">' + esc(lang === 'ar' ? 'افحص لينك مشكوك فيه' : 'Check a suspicious link') + '</h3>' +
      '<div class="pf-card pf-pass-card">' +
      '<div class="pf-card-detail">' + esc(lang === 'ar' ? 'جاتلك رسالة فيها لينك مش مطمّن له؟ الصقه هنا من غير ما تفتحه، وهنقولك الشكل فيه علامات نصب ولا لأ.' : 'Got a message with a link you do not trust? Paste it here without opening it and we will tell you if it shows scam signs.') + '</div>' +
      '<input type="text" class="pf-pass-input" id="pf-link-input" dir="ltr" inputmode="url" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="https://example.com/...">' +
      '<button type="button" class="pf-btn pf-link-btn" id="pf-link-btn">' + esc(lang === 'ar' ? 'افحص اللينك' : 'Check link') + '</button>' +
      '<div class="pf-score" id="pf-link-result" hidden></div></div>' +
      '<h3 class="pf-h3">' + esc(t.chkTitle) + '</h3>' +
      '<p class="pf-para">' + esc(t.chkNote) + '</p>' +
      '<div class="pf-grid">' + chk + '</div>' +
      '<div class="pf-score" id="pf-chk-score" hidden></div>' +
      '<h3 class="pf-h3">' + esc(t.quizTitle) + '</h3>' +
      '<p class="pf-para">' + esc(t.quizNote) + '</p>' +
      '<div class="pf-grid">' + quiz + '</div>' +
      '<div class="pf-score" id="pf-quiz-score" hidden></div></div>';
  }

  function passScore(p) {
    if (!p) return -1;
    var score = 0;
    if (p.length >= 8) score++;
    if (p.length >= 12) score++;
    if (/[a-z\u0621-\u064a]/.test(p) && /[A-Z\u00c0-\u00de]/.test(p)) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score = score; // covered above
    if (/[0-9]/.test(p)) score++;
    if (/[^a-zA-Z0-9\u0621-\u064a]/.test(p)) score++;
    if (/^(password|123456|qwerty|letmein|admin|111111|abc123)/i.test(p)) score = 0;
    if (score > 4) score = 4;
    return score;
  }


  /* Suspicious-link checker: heuristic only, runs fully on the visitor's device. */
  function linkCheck(raw, ar) {
    var out = { score: 0, reasons: [], bad: false };
    function add(pts, a, e) { out.score += pts; out.reasons.push(ar ? a : e); }
    var input = String(raw || '').trim();
    if (!input) { out.bad = true; return out; }
    var hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(input) && !/^[^\/]+:\d+(\/|$)/.test(input);
    var u;
    try { u = new URL(hasScheme ? input : 'https://' + input); } catch (e) { out.bad = true; return out; }
    var proto = u.protocol.toLowerCase();
    var host = u.hostname.toLowerCase().replace(/\.$/, '');
    var full = (u.pathname + u.search).toLowerCase();
    if (proto !== 'http:' && proto !== 'https:') {
      add(3, 'اللينك مش لينك موقع عادي (بيبدأ بـ ' + proto + ') وده بيتستخدم أحياناً لتشغيل كود أو فتح حاجة غريبة.', 'This is not a normal web link (it starts with ' + proto + '), which can be used to run code or open something odd.');
    } else if (proto === 'http:') {
      add(1, 'مفيش HTTPS: الاتصال مش مشفّر، فأي بيانات تكتبها ممكن تتشاف.', 'No HTTPS: the connection is not encrypted, so anything you type could be seen.');
    }
    if (!hasScheme === false && proto === 'https:' ) { /* explicit https is fine */ }
    var isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.indexOf(':') !== -1 || /^0x[0-9a-f]+$/.test(host) || /^\d{8,10}$/.test(host);
    if (isIp) add(2, 'اللينك بيستخدم رقم IP بدل اسم موقع، والمواقع الحقيقية نادراً بتعمل كده.', 'The link uses an IP address instead of a site name. Real sites rarely do this.');
    if (u.username || u.password) add(2, 'فيه علامة @ أو بيانات قبل اسم الموقع، حيلة بتخلي اللينك يبان تبع موقع وهو رايح لموقع تاني.', 'It has an @ or credentials before the host, a trick that makes the link look like one site while going to another.');
    if (/xn--/.test(host) || /[^\x00-\x7f]/.test(input.split('/')[2] || input)) add(2, 'الاسم فيه حروف مقلّدة (زي حروف من لغة تانية شبه الإنجليزي)، وده أسلوب شهير للتزييف.', 'The name has lookalike characters (letters from another alphabet that resemble English ones), a classic spoofing trick.');
    var labels = host.split('.');
    var twoPartTld = /\.(co|com|org|net|gov|edu|ac)\.[a-z]{2}$/.test(host);
    var reg = isIp ? host : labels.slice(-(twoPartTld ? 3 : 2)).join('.');
    var tld = labels[labels.length - 1];
    if (!isIp) {
      var badTld = ['zip','mov','xyz','top','tk','ml','ga','cf','gq','click','link','work','loan','country','support','icu','buzz','rest','cyou','monster','fit','cam','sbs'];
      if (badTld.indexOf(tld) !== -1) add(1, 'الامتداد .' + tld + ' كتير بيتستخدم في مواقع النصب لأنه رخيص أو مجاني.', 'The ending .' + tld + ' is often used by scam sites because it is cheap or free.');
      if (labels.length > (twoPartTld ? 5 : 4)) add(1, 'فيه نطاقات فرعية كتير قبل الاسم الأساسي، وده بيستخدم لتشتيت عينك عن الموقع الحقيقي.', 'There are many subdomains before the main name, used to distract you from the real site.');
      var brands = ['paypal','google','facebook','instagram','whatsapp','microsoft','apple','amazon','netflix','vodafone','etisalat','orange','banquemisr','nbe','cib','fawry','binance','telegram','tiktok','youtube','cisco','github','gmail','outlook','icloud','steam'];
      var regName = reg.split('.')[0];
      var lookalike = false;
      brands.forEach(function (b) {
        if (host.indexOf(b) !== -1 && regName !== b) {
          add(2, 'اسم "' + b + '" ظاهر في اللينك بس الموقع الحقيقي مش بتاعهم (النطاق الفعلي: ' + reg + ').', 'The name "' + b + '" appears in the link but the real site is not theirs (actual domain: ' + reg + ').');
          lookalike = true;
        }
      });
      if (!lookalike) {
        var norm = regName.replace(/0/g, 'o').replace(/1/g, 'l').replace(/5/g, 's').replace(/rn/g, 'm').replace(/vv/g, 'w');
        brands.forEach(function (b) {
          if (norm !== regName && norm === b) add(2, 'الاسم "' + regName + '" شبه "' + b + '" بس مكتوب بأرقام أو حروف مبدّلة.', 'The name "' + regName + '" imitates "' + b + '" using swapped digits or letters.');
        });
      }
      if ((host.match(/-/g) || []).length >= 3) add(1, 'اسم الموقع فيه شرطات كتير، وده شائع في المواقع المزيفة.', 'The site name has many hyphens, common on fake sites.');
      var shorteners = ['bit.ly','tinyurl.com','t.co','goo.gl','is.gd','cutt.ly','ow.ly','rb.gy','shorturl.at','t.ly','buff.ly'];
      if (shorteners.indexOf(reg) !== -1) add(1, 'ده لينك مختصر، مش هتعرف رايح فين قبل ما تفتحه.', 'This is a shortened link, so you cannot see where it goes before opening it.');
    }
    var words = ['login','signin','sign-in','verify','verification','secure','account','update','confirm','password','wallet','bank','gift','prize','free','claim','suspend','unlock','billing','payment','otp','recover'];
    var hit = words.filter(function (w) { return (host + full).indexOf(w) !== -1; });
    if (hit.length) add(hit.length >= 2 ? 2 : 1, 'فيه كلمات بتتكرر في رسائل النصب: ' + hit.slice(0, 4).join('، ') + '.', 'It contains words common in phishing messages: ' + hit.slice(0, 4).join(', ') + '.');
    if (u.port && u.port !== '80' && u.port !== '443') add(1, 'بيستخدم بورت غريب (' + u.port + ').', 'It uses an unusual port (' + u.port + ').');
    if (input.length > 120) add(1, 'اللينك طويل جداً، وده بيستخدم أحياناً لإخفاء الجزء المهم.', 'The link is very long, sometimes used to hide the important part.');
    if (/(%[0-9a-f]{2}){4,}/i.test(input)) add(1, 'فيه رموز مشفّرة كتير جوه اللينك.', 'There are many encoded characters inside the link.');
    out.host = host;
    return out;
  }

  function wireLinkCheck(t) {
    var ar = lang === 'ar';
    var inp = document.getElementById('pf-link-input');
    var btn = document.getElementById('pf-link-btn');
    var box = document.getElementById('pf-link-result');
    if (!inp || !btn || !box) return;
    function run() {
      var r = linkCheck(inp.value, ar);
      box.hidden = false;
      if (r.bad) {
        box.className = 'pf-score pf-score-mid';
        box.textContent = ar ? 'اكتب لينك صح عشان نفحصه (مثال: example.com/page).' : 'Enter a valid link to check (e.g. example.com/page).';
        return;
      }
      var lvl = r.score === 0 ? 'good' : (r.score <= 2 ? 'mid' : 'bad');
      var title = ar
        ? (lvl === 'good' ? 'مفيش علامات خطر واضحة ✅' : (lvl === 'mid' ? 'مشبوه ⚠️ خد بالك' : 'غالباً خطر 🚫 متفتحوش'))
        : (lvl === 'good' ? 'No obvious red flags ✅' : (lvl === 'mid' ? 'Suspicious ⚠️ be careful' : 'Likely dangerous 🚫 do not open it'));
      var reasons = r.reasons.length ? r.reasons : [ar ? 'HTTPS شغال والاسم شكله عادي ومفيش حاجة غريبة في الشكل.' : 'HTTPS is used and the name looks normal with nothing odd in its shape.'];
      var note = ar
        ? 'ده مؤشر من شكل اللينك بس، مش ضمان. لينك شكله سليم ممكن يبقى خطر، ولينك مشبوه ممكن يبقى سليم. لو جاتلك رسالة بتستعجلك أو بتطلب بياناتك، متدوسش حتى لو الفحص مطمّن. الفحص بيتم على جهازك واللينك مش بيتبعت لأي حد.'
        : 'This is an indicator based on the link\'s shape, not a guarantee. A clean-looking link can still be harmful and a suspicious one can be fine. If a message rushes you or asks for your data, do not click even if the check looks fine. The check runs on your device and the link is not sent anywhere.';
      box.className = 'pf-score pf-score-' + lvl;
      box.innerHTML = '<b>' + esc(title) + '</b><ul class="pf-link-reasons">' +
        reasons.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
        '</ul><div class="pf-link-note">' + esc(note) + '</div>';
    }
    btn.addEventListener('click', run);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); run(); } });
  }


  /* ===== Live visitor map: anonymous, country/city-level dots from the worker's presence data ===== */
  var PF_MAP = { cols: 144, rows: 56, top: 84, bot: -58, step: 2.5, data: "AAAAAAH+A/8AAAAAAAAAAAAAAAAAAHn3//+AAeAQAAcAAAAAAAAAEEOf//8AAsAAAAAAAAAAAAAAfN8Af/8AAAABgB/4AfAAAAAD5a8AP/4AAAAECP//8IAAAfgAHmf4P/gAAHAAG/////8Ag///1v5cH+AAA/8v+///////J/////h6HwHAB7z/////////A////+AIDgAAHv//////////B/v//8BwAgAAPl////////xgAGA//+B+AAAABj///////wGAAAAf//5/AAACEH///////AOAAAAP//5/wAALv////////4IAAAAH///9AAACf////////0AAAAAD///84AAB/////////wAAAAAD////AAAB//fn/////gAAAAAD///wAAAPjeBn////+MAAAAAD///AAAAPEt/3////YIAAAAAB//+AAAAPBF/z////MQAAAAAA///AAAAD8Gf/////FwAAAAAAf/8AAAAP+IP/////CAAAAAAAH/IAAAAP////////gAAAAAAAL4EAAAAf//v3////AAAAAAAAF4AAAAA///363///AAAAAAAAA4MAAAB///z/D/f8AAAAAAAAA4hAAAB///7+B+fgAAAAAAAAAfgAAAA///58B4PggAAAAAAAAB4AAAB///94AwHwgAAAAAAAAAYAAAB////AAwHwwAAAAAAAAAI/AAA////wAwEgQAAAAAAAAAF/AAAf///wAIAAYAAAAAAAAAB/4AAPP//gAAKDAAAAAAAAAAB/8AAAD//gAAEGAAAAAAAAAAD/8AAAD/+AAACOAAAAAAAAAAD//AAAD/8AAADOhQAAAAAAAAH//4AAB/8AAABAAcAAAAAAAAD//8AAB/8AAAAYAeAAAAAAAAB//8AAB/8AAAAAQBAAAAAAAAB//4AAB/8AAAAADgAAAAAAAAA//wAAB/8QAAAALEAAAAAAAAAf/wAAB/4wAAAAf8AAAAAAAAAP/wAAB/wwAAAA/+AAAAAAAAAP/gAAA/xgAAAD//AAAAAAAAAP+AAAA/wgAAAH//gAAAAAAAAP+AAAA/gAAAAD//gAAAAAAAAf8AAAAfAAAAAD//gAAAAAAAAf4AAAAfAAAAADx/gAAAAAAAAfwAAAAAAAAAACAfAAAAAAAAAfgAAAAAAAAAAAAPAAAAAAAAAeAAAAAAAAAAAAAAACAAAAAAA+AAAAAAAAAAAAACAEAAAAAAA8AAAAAAAAAAAAAAAQAAAAAAA8AAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAEAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAA" };
  var pfLiveTimer = 0;
  function renderMapPage(t) {
    var ar = lang === 'ar';
    return '<div class="pf-page">' + pageHead(ar ? 'LIVE' : 'LIVE', ar ? 'خريطة الزوار الحية' : 'Live visitor map') +
      '<p class="pf-para">' + esc(ar ? 'نقط مضيئة بتبيّن الدول والمدن اللي زوار آخر ٢٤ ساعة دخلوا منها، والنقطة الخضرا المنوّرة معناها حد أونلاين دلوقتي. بتتحدث تلقائي كل نص دقيقة.' : 'Glowing dots show where visitors from the last 24 hours came from. A bright green dot means someone is online right now. It refreshes every 30 seconds.') + '</p>' +
      livePlaceholder() + '</div>';
  }
  function livePlaceholder() {
    var ar = lang === 'ar';
    return '<div class="pf-live" id="pf-live"><div class="pf-live-head"><span class="pf-live-pulse"></span><b id="pf-live-count">' + esc(ar ? 'الزوار' : 'Visitors') + '</b></div><div class="pf-live-online" id="pf-live-online"></div>' +
      '<div class="pf-live-map" id="pf-live-map"><canvas id="pf-live-canvas" width="720" height="280" aria-hidden="true"></canvas><div id="pf-live-dots"></div></div>' +
      '<div class="pf-live-list" id="pf-live-list"></div>' +
      '<div class="pf-live-note">' + esc(ar ? 'نقط تقريبية على مستوى المدينة، من غير أي بيانات شخصية أو عناوين IP.' : 'Approximate city-level dots only. No personal data and no IP addresses are shown.') + '</div></div>';
  }
  function drawLandMap(cv) {
    var raw = atob(PF_MAP.data), bits = [];
    for (var i = 0; i < raw.length; i++) { var b = raw.charCodeAt(i); for (var k = 7; k >= 0; k--) bits.push((b >> k) & 1); }
    var ctx = cv.getContext('2d'), W = cv.width, H = cv.height;
    var cw = W / PF_MAP.cols, ch = H / PF_MAP.rows, r = Math.min(cw, ch) * 0.34;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(120,150,190,0.55)';
    for (var row = 0; row < PF_MAP.rows; row++) for (var c = 0; c < PF_MAP.cols; c++) {
      if (bits[row * PF_MAP.cols + c]) { ctx.beginPath(); ctx.arc((c + 0.5) * cw, (row + 0.5) * ch, r, 0, 6.2832); ctx.fill(); }
    }
  }
  function wireLive() {
    var box = document.getElementById('pf-live');
    if (!box || !SAQR_WORKER_URL) return;
    clearInterval(pfLiveTimer);
    var ar = lang === 'ar';
    var cv = document.getElementById('pf-live-canvas');
    try { drawLandMap(cv); } catch (e) {}
    var names = null;
    try { names = new Intl.DisplayNames([lang], { type: 'region' }); } catch (e) {}
    function flag(cc) { return String.fromCodePoint.apply(null, cc.split('').map(function (ch) { return 127397 + ch.charCodeAt(0); })); }
    function load() {
      if (document.hidden || !document.getElementById('pf-live')) return;
      fetch(SAQR_WORKER_URL.replace(/\/chat$/, '/live')).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
        if (!d || !d.ok || !document.getElementById('pf-live')) return;
        var cc = Object.keys(d.countries || {});
        var cnt = document.getElementById('pf-live-count');
        var day = d.day || 0;
        cnt.textContent = day > 0
          ? (ar ? 'آخر ٢٤ ساعة: ' + day + (day === 1 ? ' زائر' : ' زائر') + (cc.length ? ' من ' + cc.length + (cc.length === 1 ? ' دولة' : ' دول') : '')
                : 'Last 24 hours: ' + day + (day === 1 ? ' visitor' : ' visitors') + (cc.length ? ' from ' + cc.length + (cc.length === 1 ? ' country' : ' countries') : ''))
          : (ar ? 'لسه مفيش زوار في آخر ٢٤ ساعة' : 'No visitors in the last 24 hours yet');
        var onl = document.getElementById('pf-live-online');
        onl.textContent = d.online > 0 ? (ar ? '🟢 دلوقتي أونلاين: ' + d.online : '🟢 Online now: ' + d.online) : '';
        var dots = document.getElementById('pf-live-dots');
        dots.innerHTML = (d.dots || []).map(function (p) {
          var x = (p.lo + 180) / 360 * 100, y = (PF_MAP.top - p.la) / (PF_MAP.top - PF_MAP.bot) * 100;
          if (y < 0 || y > 100) return '';
          return '<i class="pf-live-dot' + (p.on ? ' pf-live-dot-on' : '') + '" style="left:' + x.toFixed(2) + '%;top:' + y.toFixed(2) + '%" title="' + esc((p.city ? p.city + ' ' : '') + (p.c && names ? names.of(p.c) : '')) + '"></i>';
        }).join('');
        document.getElementById('pf-live-list').innerHTML = cc.sort(function (a, b) { return d.countries[b] - d.countries[a]; }).map(function (c) {
          var nm = c; try { if (names) nm = names.of(c) || c; } catch (e) {}
          return '<span class="pf-live-chip">' + flag(c) + ' ' + esc(nm) + ' <b>' + d.countries[c] + '</b></span>';
        }).join('');
      }).catch(function () {});
    }
    load();
    pfLiveTimer = setInterval(load, 30000);
  }

  function wireCheckup(t) {
    wireLinkCheck(t);
    var pass = document.getElementById('pf-pass');
    if (pass) {
      pass.addEventListener('input', function () {
        var p = pass.value, sc = passScore(p);
        var fill = document.getElementById('pf-pass-fill');
        var label = document.getElementById('pf-pass-label');
        var tips = document.getElementById('pf-pass-tips');
        if (!p) {
          fill.style.width = '0%'; label.textContent = ''; tips.textContent = t.passTipsEmpty;
          fill.className = 'pf-pass-fill';
          return;
        }
        var pct = [15, 35, 55, 80, 100][sc];
        fill.style.width = pct + '%';
        fill.className = 'pf-pass-fill pf-pass-' + sc;
        label.textContent = t.passLevels[sc];
        var tipsArr = [];
        if (p.length < 12) tipsArr.push(t.passTipLen);
        if (!(/[A-Z]/.test(p) && /[a-z]/.test(p))) tipsArr.push(t.passTipUpper);
        if (!/[0-9]/.test(p)) tipsArr.push(t.passTipDigit);
        if (!/[^a-zA-Z0-9\u0621-\u064a]/.test(p)) tipsArr.push(t.passTipSymbol);
        if (/^(password|123456|qwerty|letmein|admin|111111|abc123)/i.test(p)) tipsArr.push(t.passTipCommon);
        if (sc >= 3 && tipsArr.length === 0) tipsArr.push(t.passTipGood);
        tips.innerHTML = tipsArr.map(function (tp) { return '<div class="pf-pass-tip">' + esc(tp) + '</div>'; }).join('');
      });
    }

    var chkAnswers = {};
    document.querySelectorAll('.pf-chk-item').forEach(function (card) {
      var idx = +card.dataset.chk;
      card.querySelectorAll('.pf-chk-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          chkAnswers[idx] = +btn.dataset.val;
          card.querySelectorAll('.pf-chk-btn').forEach(function (b) { b.classList.remove('pf-chk-on-yes', 'pf-chk-on-no'); });
          btn.classList.add(+btn.dataset.val === 1 ? 'pf-chk-on-yes' : 'pf-chk-on-no');
          var total = t.chkItems.length;
          var answered = Object.keys(chkAnswers).length;
          var scoreBox = document.getElementById('pf-chk-score');
          if (answered === total) {
            var sum = 0; for (var k in chkAnswers) sum += chkAnswers[k];
            var msg = sum <= 2 ? t.chkScoreBad : (sum <= 4 ? t.chkScoreMid : t.chkScoreGood);
            scoreBox.hidden = false;
            scoreBox.className = 'pf-score ' + (sum <= 2 ? 'pf-score-bad' : (sum <= 4 ? 'pf-score-mid' : 'pf-score-good'));
            scoreBox.textContent = sum + ' / ' + total + ' — ' + msg;
          }
        });
      });
    });

    var quizAnswers = {};
    document.querySelectorAll('.pf-quiz-item').forEach(function (card) {
      var idx = +card.dataset.quiz;
      var item = t.quizItems[idx];
      card.querySelectorAll('.pf-chk-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (quizAnswers[idx] !== undefined) return;
          var ans = +btn.dataset.ans;
          var correct = (ans === 1) === item.phish;
          quizAnswers[idx] = correct ? 1 : 0;
          card.classList.add(correct ? 'pf-quiz-right' : 'pf-quiz-wrong');
          card.querySelectorAll('.pf-chk-btn').forEach(function (b) { b.disabled = true; });
          btn.classList.add(correct ? 'pf-chk-on-yes' : 'pf-chk-on-no');
          var why = card.querySelector('.pf-quiz-why');
          why.hidden = false;
          why.textContent = (correct ? t.quizCorrect + ' ' : t.quizWrong + (item.phish ? t.quizPhish : t.quizSafe) + '. ') + item.why;
          var total = t.quizItems.length;
          if (Object.keys(quizAnswers).length === total) {
            var sum = 0; for (var k in quizAnswers) sum += quizAnswers[k];
            var msg = sum <= 1 ? t.quizDoneBad : (sum <= 2 ? t.quizDoneMid : t.quizDoneGood);
            var scoreBox = document.getElementById('pf-quiz-score');
            scoreBox.hidden = false;
            scoreBox.className = 'pf-score ' + (sum <= 1 ? 'pf-score-bad' : (sum <= 2 ? 'pf-score-mid' : 'pf-score-good'));
            scoreBox.textContent = sum + ' / ' + total + ' — ' + msg;
          }
        });
      });
    });
  }

  function renderContact(t) {
    return '<div class="pf-page">' + pageHead(t.contactEyebrow, t.contactTitle) +
      '<p class="pf-para">' + esc(t.contactIntro) + '</p>' +
      '<div class="pf-contact">' +
      '<a class="pf-btn pf-btn-primary" href="mailto:Ahmedsakr5326@gmail.com">' + icon('mail') + '<bdi>Ahmedsakr5326@gmail.com</bdi></a>' +
      '<a class="pf-btn pf-btn-ghost" href="https://linkedin.com/in/ahmed-mokhtar-3b1b3b24a">' + icon('linkedin') + '<bdi>linkedin.com/in/ahmed-mokhtar-3b1b3b24a</bdi></a>' +
      '</div>' +
      '<h3 class="pf-h3">' + esc(t.followTitle) + '</h3>' +
      '<div class="pf-contact">' + socialLinks.map(function (href, i) {
        return '<a class="pf-btn pf-btn-ghost pf-btn-social" href="' + href + '" target="_blank" rel="noopener">' + icon(socialIcons[i]) + esc(t.socials[i]) + '</a>';
      }).join('') + '</div>' +
      '<div class="pf-contact pf-contact-cv">' +
      '<a class="pf-btn pf-btn-primary" href="cv.pdf?v=2" target="_blank" rel="noopener">' + icon('doc') + esc(t.cvBtn) + '</a>' +
      '<a class="pf-btn pf-btn-ghost" href="cv-ar.pdf" target="_blank" rel="noopener">' + icon('doc') + esc(t.cvArBtn) + '</a>' +
      '</div></div>';
  }

  function currentRoute() {
    var h = location.hash || '#/';
    if (navPaths.indexOf(h) === -1 && h !== '#/checkup' && h !== '#/map' && h.indexOf('#/academy') !== 0) return '#/';
    return h;
  }

  function setupTilt() {
    var p = document.querySelector('.pf-portrait img');
    if (!p || p.dataset.tiltBound) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    p.dataset.tiltBound = '1';
    var hero = p.closest('.pf-hero');
    var tx = 0, ty = 0, rx = 0, ry = 0, raf = null;
    function loop() {
      rx += (tx - rx) * 0.07;
      ry += (ty - ry) * 0.07;
      p.style.transform = 'perspective(700px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
      if (Math.abs(tx - rx) > 0.02 || Math.abs(ty - ry) > 0.02) raf = requestAnimationFrame(loop);
      else raf = null;
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      ty = x * 5; tx = -y * 5;
      kick();
    });
    hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
  }

  function wireNavSheet() {
    var btn = document.getElementById('pf-more-btn'), sheet = document.getElementById('pf-sheet');
    if (!btn || !sheet) return;
    function setOpen(o) { sheet.hidden = !o; btn.setAttribute('aria-expanded', o ? 'true' : 'false'); document.body.classList.toggle('pf-sheet-open', o); }
    btn.addEventListener('click', function () { setOpen(sheet.hidden); });
    sheet.addEventListener('click', function (e) { if (e.target.closest('[data-close]') || e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function esc2(e) { if (!document.getElementById('pf-sheet')) { document.removeEventListener('keydown', esc2); return; } if (e.key === 'Escape') setOpen(false); });
  }

  var acadCfg;
  function loadAcademy(route) {
    function go(cfg) {
      var host = document.getElementById('pf-acad');
      if (!host || !window.pfAcademy) return;
      var ar = lang === 'ar';
      function draw() {
        host.innerHTML = window.pfAcademy.render(route, ar, { esc: esc, icon: icon, pageHead: pageHead }, cfg);
        window.pfAcademy.wire(ar, route, draw);
      }
      draw();
    }
    var cfgP = acadCfg ? Promise.resolve(acadCfg) : Promise.race([
      fetch(SAQR_WORKER_URL.replace(/\/chat$/, '/academy/config')).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }),
      new Promise(function (res) { setTimeout(function () { res(null); }, 3000); })
    ]).then(function (c) { if (c) acadCfg = c; return c; });
    var jsP = window.pfAcademy ? Promise.resolve() : new Promise(function (res) {
      var sc = document.createElement('script');
      sc.src = 'academy.js?v=16';
      sc.onload = res; sc.onerror = res;
      document.head.appendChild(sc);
    });
    Promise.all([cfgP, jsP]).then(function (r) { go(r[0]); });
  }

  function render() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.theme = theme;
    document.title = lang === 'ar' ? 'أحمد مختار صقر' : 'Ahmed Mokhtar Sakr';
    var route = currentRoute();
    var ar0 = lang === 'ar';
    var isAcad = route.indexOf('#/academy') === 0;
    var mainIdx = [0, 5, 6];
    var moreItems = [
      { href: navPaths[1], icon: navIcons[1], label: t.nav[1] },
      { href: navPaths[2], icon: navIcons[2], label: t.nav[2] },
      { href: navPaths[3], icon: navIcons[3], label: t.nav[3] },
      { href: navPaths[4], icon: navIcons[4], label: t.nav[4] },
      { href: '#/checkup', icon: 'navShield', label: t.checkupTitle },
      { href: '#/map', icon: 'navGlobe', label: ar0 ? 'خريطة الزوار' : 'Visitor map' }
    ];
    var moreActive = moreItems.some(function (m) { return m.href === route || (m.href === '#/academy' && route.indexOf('#/academy') === 0); });
    var moreLabel = ar0 ? 'المزيد' : 'More';
    var nav = '<nav class="pf-nav" aria-label="' + esc(t.navAria) + '">' +
      mainIdx.map(function (i) {
        var active = navPaths[i] === route ? ' aria-current="page"' : '';
        return '<a href="' + navPaths[i] + '"' + active + '>' + icon(navIcons[i]) + esc(t.nav[i]) + '</a>';
      }).join('') +
      '<button type="button" class="pf-nav-more' + (moreActive ? ' pf-nav-more-on' : '') + '" id="pf-more-btn" aria-haspopup="dialog" aria-expanded="false">' + icon('navGrid') + esc(moreLabel) + '</button>' +
      '</nav>' +
      '<div class="pf-sheet" id="pf-sheet" hidden><div class="pf-sheet-back" data-close="1"></div>' +
      '<div class="pf-sheet-panel" role="dialog" aria-label="' + esc(moreLabel) + '"><div class="pf-sheet-grip"></div>' +
      '<div class="pf-sheet-grid">' + moreItems.map(function (m) {
        return '<a href="' + m.href + '"' + ((m.href === route || (m.href === '#/academy' && route.indexOf('#/academy') === 0)) ? ' aria-current="page"' : '') + '>' + icon(m.icon) + '<span>' + esc(m.label) + '</span></a>';
      }).join('') + '</div></div></div>' +
      '<div class="pf-switch" role="navigation">' +
      '<a class="pf-sw-site' + (isAcad ? '' : ' pf-sw-on') + '" href="#/">' + icon('navGlobe') + esc(ar0 ? 'الموقع' : 'Site') + '</a>' +
      '<a class="pf-sw-acad' + (isAcad ? ' pf-sw-on' : '') + '" href="#/academy">' + icon('navCap') + esc(ar0 ? 'صقر أكاديمي' : 'Sakr Academy') + '</a></div>' +
      '<div class="pf-fabs">' +
      '<button type="button" class="pf-lang-toggle" aria-label="' + esc(t.toggleLabel) + '">' +
      '<span class="pf-lang-toggle-thumb" aria-hidden="true"></span>' +
      '<span class="pf-lang-toggle-opt' + (lang === 'ar' ? ' pf-lang-toggle-active' : '') + '">ع</span>' +
      '<span class="pf-lang-toggle-opt' + (lang === 'en' ? ' pf-lang-toggle-active' : '') + '">EN</span>' +
      '</button>' +
      '<button type="button" class="pf-theme-toggle" aria-label="' + esc(t.themeLabel) + '" title="' + esc(t.themeLabel) + '">' +
      icon(theme === 'dark' ? 'sun' : 'moon') +
      '</button></div>';
    var page;
    if (route === '#/app') page = renderApp(t);
    else if (route === '#/about') page = renderAbout(t);
    else if (route === '#/certifications') page = renderCerts(t);
    else if (route === '#/projects') page = renderProjects(t);
    else if (route === '#/services') page = renderServices(t);
    else if (route === '#/checkup') page = renderCheckup(t);
    else if (route === '#/map') page = renderMapPage(t);
    else if (route === '#/contact') page = renderContact(t);
    else if (route.indexOf('#/academy') === 0) page = '<div class="pf-page" id="pf-acad"></div>';
    else page = renderHome(t);
    document.getElementById('app').innerHTML = nav + page + '<div class="pf-closing">' + esc(t.closing) + '</div>';
    saqrEnsure(t);
    document.body.classList.toggle('pf-not-home', route !== '#/');
    document.body.classList.toggle('pf-acad-world', isAcad);
    if (openCert >= 0 && route === '#/certifications') showLightbox(openCert);
    setupReveal();
    setupTilt();
    wireNavSheet();
    if (route === '#/checkup') wireCheckup(t);
    if (route.indexOf('#/academy') === 0) loadAcademy(route);
    if (route === '#/map') wireLive(); else clearInterval(pfLiveTimer);
    if (renderDone && window.goatcounter && window.goatcounter.count) {
      try { window.goatcounter.count({ path: location.hash.slice(1) || '/' }); } catch (e) {}
    }
    renderDone = true;
  }


  /* ===== Saqr AI chat widget (lives outside #app so state survives route changes) ===== */
  var saqrState = { open: false, sending: false, msgs: [] };
  var saqrWired = false;


  var saqrVoice = { muted: false };
  try { saqrVoice.muted = localStorage.getItem('pf-saqr-muted') === '1'; } catch (e) {}
  var saqrConsent = null;
  try { saqrConsent = localStorage.getItem('pf-saqr-consent'); } catch (e) {}
  var saqrVoiceOk = false;
  try { saqrVoiceOk = localStorage.getItem('pf-saqr-voice-ok') === '1'; } catch (e) {}
  var saqrVoicePending = null; // 'mic' | 'call' while the voice notice card is showing
  var saqrChatId = '';
  try {
    saqrChatId = localStorage.getItem('pf-saqr-chatid') || sessionStorage.getItem('pf-saqr-chatid') || '';
    if (!saqrChatId && window.crypto && crypto.randomUUID) saqrChatId = crypto.randomUUID();
    if (!saqrChatId) saqrChatId = 'chat-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
    try { localStorage.setItem('pf-saqr-chatid', saqrChatId); } catch (e1) { sessionStorage.setItem('pf-saqr-chatid', saqrChatId); }
  } catch (e) { if (!saqrChatId) saqrChatId = 'chat-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); }
  // Anonymous live-presence heartbeat: random visitor id + page path only.
  try {
    var pfVid = '';
    try { pfVid = localStorage.getItem('pf-vid') || ''; } catch (e0) {}
    if (!pfVid && window.crypto && crypto.randomUUID) {
      pfVid = crypto.randomUUID();
      try { localStorage.setItem('pf-vid', pfVid); } catch (e1) {}
    }
    if (pfVid && SAQR_WORKER_URL) {
      var SAQR_PING_URL = SAQR_WORKER_URL.replace(/\/chat$/, '/ping');
      var saqrPing = function (ptype) {
        try {
          fetch(SAQR_PING_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ vid: pfVid, type: ptype, page: location.pathname }),
          }).catch(function () {});
        } catch (e2) {}
      };
      saqrPing('view');
      setInterval(function () { if (!document.hidden) saqrPing('hb'); }, 240000);
      document.addEventListener('visibilitychange', function () { if (!document.hidden) saqrPing('hb'); });
    }
  } catch (e3) {}

  var SaqrRecog = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  var saqrRecog = null, saqrListening = false, saqrFinalBuf = '', saqrSilenceTimer = null, saqrManualStop = false;
  var SAQR_SILENCE_MS = 3000;


  var SAQR_FEATHER = '<svg class="pf-icon pf-saqr-feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>';
  var SAQR_MIC_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
  var SAQR_SPK_ON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
  var SAQR_SPK_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  var SAQR_PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  var SAQR_PHONE_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="23" y1="1" x2="1" y2="23"/></svg>';

  var saqrCall = { active: false, phase: 'idle' };
  var saqrBarge = false;

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = function () { try { window.speechSynthesis.getVoices(); } catch (e) {} };
    } catch (e) {}
  }

  function saqrPickVoice(lg) {
    var voices = [];
    try { voices = window.speechSynthesis.getVoices() || []; } catch (e) {}
    if (!voices.length) return null;
    var pref = lg === 'ar' ? 'ar' : 'en';
    var pool = voices.filter(function (x) { return x.lang && x.lang.toLowerCase().replace('_', '-').indexOf(pref) === 0; });
    if (!pool.length) return null;
    if (pref === 'ar') {
      var eg = pool.filter(function (x) { return /-eg\b/i.test(x.lang) || /egypt|salma|shakir|hoda|مصر/i.test(x.name); });
      if (eg.length) pool = eg;
      var nice = pool.filter(function (x) { return /google|natural|neural|online|premium|wavenet|microsoft/i.test(x.name) && !/espeak|mbrola|pico|festival/i.test(x.name); });
      if (nice.length) pool = nice;
      var g = pool.filter(function (x) { return /google/i.test(x.name); });
      if (g.length) pool = g;
    }
    return pool[0];
  }

  function saqrCleanForSpeech(text) {
    var s = String(text || '');
    try { s = s.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{200D}]/gu, ' '); } catch (e) { s = s.replace(/🦅/g, ' '); }
    s = s.replace(/https?:\/\/\S+/g, ' ').replace(/[*_`#>|•●○◦]/g, ' ');
    return s.replace(/\s+/g, ' ').trim();
  }

  function saqrCallSetPhase(p) {
    saqrCall.phase = p;
    var st = document.querySelector('.pf-saqr-micstage');
    if (st) {
      st.classList.remove('pf-saqr-stage-listening', 'pf-saqr-stage-thinking', 'pf-saqr-stage-speaking');
      if (saqrCall.active) st.classList.add('pf-saqr-stage-' + p);
    }
    var mb = document.querySelector('.pf-saqr-micbig');
    if (mb) mb.classList.toggle('pf-saqr-talking', saqrCall.active && p === 'speaking');
    var lbl = document.querySelector('.pf-saqr-micbig-lbl');
    if (lbl) {
      var tt = T[lang];
      lbl.textContent = !saqrCall.active ? tt.saqrMic
        : p === 'speaking' ? tt.saqrCallSpeaking
        : p === 'thinking' ? tt.saqrCallThinking : tt.saqrCallListening;
    }
  }

  function saqrCallListen() {
    if (!saqrCall.active) return;
    saqrCallSetPhase('listening');
    if (saqrListening) { saqrArmSilence(); return; } // barge-in session is already recording: reuse it, never stomp it
    saqrStartListening(T[lang]);
  }

  var saqrBargeGraceUntil = 0;
  function saqrCallBargeListen() {
    if (!SaqrRecog || saqrListening) return;
    try {
      saqrBargeGraceUntil = Date.now() + 900;
      saqrRecog = new SaqrRecog();
      saqrRecog.lang = lang === 'ar' ? 'ar-EG' : 'en-US';
      saqrRecog.continuous = true;
      saqrRecog.interimResults = true;
      saqrRecog.maxAlternatives = 1;
      saqrListening = true;
      saqrManualStop = false;
      saqrFinalBuf = '';
      saqrBarge = true;
      saqrRecog.onresult = function (e) {
        if (Date.now() < saqrBargeGraceUntil) return; // ignore speaker echo of Saqr's own voice at TTS start
        var i, any = '';
        for (i = e.resultIndex; i < e.results.length; i++) any += e.results[i][0].transcript;
        if (saqrBarge && any.trim()) {
          saqrBarge = false;
          saqrCallSetPhase('listening');
          try { window.speechSynthesis.cancel(); } catch (err) {}
          var mb = document.querySelector('.pf-saqr-micbig'); if (mb) mb.classList.add('pf-saqr-live');
          var inp0 = document.getElementById('pf-saqr-input'); if (inp0) inp0.placeholder = T[lang].saqrListening;
        }
        if (!saqrBarge) {
          var interim = '';
          for (i = e.resultIndex; i < e.results.length; i++) {
            if (e.results[i].isFinal) saqrFinalBuf += e.results[i][0].transcript;
            else interim += e.results[i][0].transcript;
          }
          var inp2 = document.getElementById('pf-saqr-input');
          if (inp2) inp2.value = (saqrFinalBuf + interim).trim();
          saqrArmSilence();
        }
      };
      saqrRecog.onend = function () {
        if (saqrListening && !saqrManualStop) { try { saqrRecog.start(); return; } catch (e) {}
        }
        saqrListening = false;
        saqrBarge = false;
        clearTimeout(saqrSilenceTimer);
        var mb2 = document.querySelector('.pf-saqr-micbig'); if (mb2) mb2.classList.remove('pf-saqr-live');
      };
      saqrRecog.onerror = function (ev) {
        if (ev && (ev.error === 'not-allowed' || ev.error === 'service-not-allowed')) { saqrBarge = false; saqrStopListening(false); saqrEndCall(); }
      };
      saqrRecog.start();
    } catch (e) { saqrListening = false; saqrBarge = false; }
  }

  function saqrStartCall() {
    if (!SaqrRecog || !('speechSynthesis' in window)) return;
    saqrCall.active = true;
    if (saqrVoice.muted) {
      saqrVoice.muted = false;
      try { localStorage.setItem('pf-saqr-muted', '0'); } catch (e) {}
    }
    saqrEnsure(T[lang]);
    saqrCallListen();
  }

  function saqrEndCall() {
    saqrCall.active = false;
    saqrBarge = false;
    saqrCall.phase = 'idle';
    saqrStopListening(false);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    saqrEnsure(T[lang]);
  }

  function saqrSetSpeaking(on) {
    var fab = document.querySelector('.pf-saqr-fab');
    if (fab) fab.classList.toggle('pf-saqr-speaking', !!on);
  }

  var saqrSpeakKA = null;
  function saqrSpeakKeepAlive(on) {
    clearInterval(saqrSpeakKA); saqrSpeakKA = null;
    if (on) {
      // Chrome network voices stall mid-utterance on long text; periodic pause/resume keeps them flowing.
      saqrSpeakKA = setInterval(function () {
        try { if (window.speechSynthesis.speaking) { window.speechSynthesis.pause(); window.speechSynthesis.resume(); } } catch (e) {}
      }, 10000);
    }
  }

  function saqrSpeechChunks(s) {
    // Sentence-sized chunks: browsers stutter/clip long single utterances; short queued ones flow naturally.
    var parts = s.match(/[^؟?!.…\n]+[؟?!.…]*\s*/g) || [s];
    var out = [], buf = '';
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (buf && (buf + p).length > 170) { out.push(buf.trim()); buf = p; }
      else buf += p;
    }
    if (buf.trim()) out.push(buf.trim());
    return out.length ? out : [s];
  }

  function saqrSpeak(text, lg, ondone) {
    if (saqrVoice.muted || !('speechSynthesis' in window)) { if (ondone) ondone(); return; }
    try {
      var spoken = saqrCleanForSpeech(text);
      if (!spoken) { if (ondone) ondone(); return; }
      window.speechSynthesis.cancel();
      var chunks = saqrSpeechChunks(spoken);
      var v = saqrPickVoice(lg);
      var idx = 0, finished = false;
      function done() {
        if (finished) return;
        finished = true;
        saqrSetSpeaking(false);
        saqrSpeakKeepAlive(false);
        if (ondone) ondone();
      }
      function next() {
        if (finished) return;
        if (idx >= chunks.length) { done(); return; }
        var u = new SpeechSynthesisUtterance(chunks[idx++]);
        u.lang = lg === 'ar' ? 'ar-EG' : 'en-US';
        if (v) u.voice = v;
        u.rate = 0.95;
        u.pitch = 1.03;
        u.volume = 1;
        u.onstart = function () { saqrSetSpeaking(true); };
        u.onend = function () { next(); };
        u.onerror = function () { done(); };
        window.speechSynthesis.speak(u);
      }
      saqrSpeakKeepAlive(true);
      // Small delay after cancel(): Chrome can swallow the first utterance otherwise.
      setTimeout(next, 60);
    } catch (e) { if (ondone) ondone(); }
  }

  function saqrArmSilence() {
    clearTimeout(saqrSilenceTimer);
    saqrSilenceTimer = setTimeout(function () {
      var inp = document.getElementById('pf-saqr-input');
      if (inp && inp.value.trim()) { saqrStopListening(true); return; }
      if (saqrCall.active) { saqrArmSilence(); return; } // quiet moment in a call: keep listening, like a real phone call
      saqrStopListening(false);
    }, SAQR_SILENCE_MS);
  }

  function saqrStopListening(send) {
    if (!saqrListening) return;
    saqrListening = false;
    saqrManualStop = true;
    clearTimeout(saqrSilenceTimer);
    try { if (saqrRecog) saqrRecog.stop(); } catch (e) {}
    var mb = document.querySelector('.pf-saqr-micbig'); if (mb) mb.classList.remove('pf-saqr-live');
    var inp = document.getElementById('pf-saqr-input');
    if (inp) inp.placeholder = T[lang].saqrPlaceholder;
    if (send && inp && inp.value.trim()) saqrSend();
  }

  function saqrStartListening(t) {
    if (!SaqrRecog) return;
    if (saqrListening) { saqrStopListening(true); return; }
    try {
      saqrRecog = new SaqrRecog();
      saqrRecog.lang = lang === 'ar' ? 'ar-EG' : 'en-US';
      saqrRecog.continuous = true;
      saqrRecog.interimResults = true;
      saqrRecog.maxAlternatives = 1;
      saqrListening = true;
      saqrManualStop = false;
      saqrFinalBuf = '';
      var inp = document.getElementById('pf-saqr-input');
      if (inp) inp.placeholder = t.saqrListening;
      var mb = document.querySelector('.pf-saqr-micbig'); if (mb) mb.classList.add('pf-saqr-live');
      saqrRecog.onresult = function (e) {
        var interim = '';
        for (var i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) saqrFinalBuf += e.results[i][0].transcript;
          else interim += e.results[i][0].transcript;
        }
        var inp2 = document.getElementById('pf-saqr-input');
        if (inp2) inp2.value = (saqrFinalBuf + interim).trim();
        saqrArmSilence();
      };
      saqrRecog.onend = function () {
        if (saqrListening && !saqrManualStop) {
          try { saqrRecog.start(); return; } catch (e) {}
        }
        saqrListening = false;
        clearTimeout(saqrSilenceTimer);
        var mb2 = document.querySelector('.pf-saqr-micbig'); if (mb2) mb2.classList.remove('pf-saqr-live');
        var inp3 = document.getElementById('pf-saqr-input');
        if (inp3) inp3.placeholder = T[lang].saqrPlaceholder;
      };
      saqrRecog.onerror = function (ev) {
        if (ev && (ev.error === 'not-allowed' || ev.error === 'service-not-allowed')) saqrStopListening(false);
      };
      saqrRecog.start();
      saqrArmSilence();
    } catch (e) { saqrListening = false; }
  }

  function saqrEnsure(t) {
    var root = document.getElementById('pf-saqr');
    if (!root) {
      root = document.createElement('div');
      root.id = 'pf-saqr';
      document.body.appendChild(root);
    }
    root.innerHTML =
      '<button type="button" class="pf-saqr-fab" aria-label="' + esc(t.saqrFab) + '" title="' + esc(t.saqrFab) + '">' +
        '<span class="pf-saqr-fab-ico">' + '<svg class="pf-icon pf-saqr-feather" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>' + '</span><span class="pf-saqr-fab-txt">' + esc(t.saqrFab) + '</span>' +
        '<span class="pf-saqr-waves" aria-hidden="true"><i></i><i></i><i></i></span></button>' +
      '<section class="pf-saqr-panel' + (saqrState.open ? ' pf-saqr-open' : '') + '" role="dialog" aria-label="' + esc(t.saqrTitle) + '">' +
        '<header class="pf-saqr-head">' +
          '<div class="pf-saqr-id"><span class="pf-saqr-avatar">' + SAQR_FEATHER + '</span>' +
          '<div><div class="pf-saqr-name">' + esc(t.saqrTitle) + '</div>' +
          '<div class="pf-saqr-sub">' + esc(t.saqrSub) + '</div></div></div>' +
          (SaqrRecog && ('speechSynthesis' in window) ? '<button type="button" class="pf-saqr-call' + (saqrCall.active ? ' pf-saqr-call-on' : '') + '" aria-label="' + esc(saqrCall.active ? t.saqrCallEnd : t.saqrCall) + '" title="' + esc(saqrCall.active ? t.saqrCallEnd : t.saqrCall) + '">' + (saqrCall.active ? SAQR_PHONE_OFF : SAQR_PHONE) + '</button>' : '') +
          '<button type="button" class="pf-saqr-mute" aria-label="' + esc(saqrVoice.muted ? t.saqrUnmute : t.saqrMute) + '" title="' + esc(saqrVoice.muted ? t.saqrUnmute : t.saqrMute) + '">' + (saqrVoice.muted ? SAQR_SPK_OFF : SAQR_SPK_ON) + '</button>' +
        '<button type="button" class="pf-saqr-close" aria-label="' + esc(t.saqrClose) + '">✕</button>' +
        '</header>' +
        '<div class="pf-saqr-msgs" id="pf-saqr-msgs"></div>' +
        (t.saqrChips ? '<div class="pf-saqr-chips" style="display:flex;gap:6px;flex-wrap:wrap;padding:10px 12px 0">' + t.saqrChips.map(function (c) { return '<button type="button" class="pf-saqr-chip" style="border:1.5px solid #d8d4cd;background:#fff;border-radius:99px;padding:6px 12px;font-size:12.5px;font-family:inherit;cursor:pointer;color:#5c6472">' + esc(c) + '</button>'; }).join('') + '</div>' : '') +
        (SaqrRecog ? '<div class="pf-saqr-micstage' + (saqrCall.active ? ' pf-saqr-stage-' + saqrCall.phase : '') + '">' +
            '<button type="button" class="pf-saqr-micbig' + (saqrCall.active && saqrCall.phase === 'speaking' ? ' pf-saqr-talking' : '') + '" aria-label="' + esc(t.saqrMic) + '" title="' + esc(t.saqrMic) + '"><span class="pf-saqr-micbig-ico">' + SAQR_MIC_SVG + '</span></button>' +
            '<div class="pf-saqr-micbig-lbl">' + esc(saqrCall.active ? (saqrCall.phase === 'speaking' ? t.saqrCallSpeaking : saqrCall.phase === 'thinking' ? t.saqrCallThinking : t.saqrCallListening) : t.saqrMic) + '</div></div>' : '') +
        '<form class="pf-saqr-form" id="pf-saqr-form">' +
          '<input type="text" class="pf-saqr-input" id="pf-saqr-input" placeholder="' + esc(t.saqrPlaceholder) + '" autocomplete="off" maxlength="500">' +
          '<button type="submit" class="pf-saqr-send" aria-label="' + esc(t.saqrSend) + '">' + icon('send') + '</button>' +
        '</form>' +
      '</section>';
    paintSaqrMsgs(t);
    if (!saqrWired) {
      saqrWired = true;
      root.addEventListener('click', function (e) {
        if (e.target.closest('.pf-saqr-fab')) {
          saqrState.open = !saqrState.open;
          saqrEnsure(T[lang]);
          if (saqrState.open) {
            saqrSpeak(T[lang].saqrGreeting, lang);
            var inp = document.getElementById('pf-saqr-input'); if (inp) inp.focus();
          } else if (!saqrCall.active && 'speechSynthesis' in window) { window.speechSynthesis.cancel(); }
        } else if (e.target.closest('.pf-saqr-consent-yes')) {
          saqrConsent = '1';
          try { localStorage.setItem('pf-saqr-consent', '1'); } catch (err) {}
          saqrState.msgs.push({ role: 'assistant', content: T[lang].saqrConsentThanks });
          saqrEnsure(T[lang]);
        } else if (e.target.closest('.pf-saqr-consent-no')) {
          saqrConsent = '0';
          try { localStorage.setItem('pf-saqr-consent', '0'); } catch (err) {}
          saqrState.msgs.push({ role: 'assistant', content: T[lang].saqrConsentThanks });
          saqrEnsure(T[lang]);
        } else if (e.target.closest('.pf-saqr-chip')) {
          var chipBtn = e.target.closest('.pf-saqr-chip');
          var inpC = document.getElementById('pf-saqr-input');
          if (inpC && chipBtn) { inpC.value = chipBtn.textContent; saqrSend(); }
        } else if (e.target.closest('.pf-saqr-call')) {
          if (saqrCall.active) saqrEndCall();
          else if (!saqrVoiceOk) { saqrVoicePending = 'call'; paintSaqrMsgs(T[lang]); }
          else saqrStartCall();
        } else if (e.target.closest('.pf-saqr-voice-ok')) {
          saqrVoiceOk = true;
          try { localStorage.setItem('pf-saqr-voice-ok', '1'); } catch (err) {}
          var pend = saqrVoicePending; saqrVoicePending = null;
          paintSaqrMsgs(T[lang]);
          if (pend === 'call') saqrStartCall();
          else if (pend === 'mic') saqrStartListening(T[lang]);
        } else if (e.target.closest('.pf-saqr-replay')) {
          var rb = e.target.closest('.pf-saqr-replay');
          var mm = saqrState.msgs[+rb.getAttribute('data-mi')];
          if (mm && mm.role !== 'user') {
            if (saqrVoice.muted) {
              saqrVoice.muted = false;
              try { localStorage.setItem('pf-saqr-muted', '0'); } catch (err) {}
              saqrEnsure(T[lang]);
            }
            saqrSpeak(mm.content, lang);
          }
        } else if (e.target.closest('.pf-saqr-mute')) {
          saqrVoice.muted = !saqrVoice.muted;
          try { localStorage.setItem('pf-saqr-muted', saqrVoice.muted ? '1' : '0'); } catch (err) {}
          if (saqrVoice.muted && 'speechSynthesis' in window) window.speechSynthesis.cancel();
          saqrEnsure(T[lang]);
        } else if (e.target.closest('.pf-saqr-micbig')) {
          if (!saqrVoiceOk && !saqrListening) { saqrVoicePending = 'mic'; paintSaqrMsgs(T[lang]); }
          else saqrStartListening(T[lang]);
        } else if (e.target.closest('.pf-saqr-close')) {
          if (!saqrCall.active) { saqrStopListening(false); if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
          saqrState.open = false;
          saqrEnsure(T[lang]);
        }
      });
      root.addEventListener('submit', function (e) {
        if (e.target.id === 'pf-saqr-form') { e.preventDefault(); saqrSend(); }
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && saqrState.open) { saqrState.open = false; saqrEnsure(T[lang]); }
      });
    }
  }

  function saqrProjectCards(text, t) {
    var s = String(text || '').toLowerCase();
    if (!s) return '';
    var projs = t.projects || [];
    var out = '', seen = {};
    for (var i = 0; i < projs.length; i++) {
      var pr = projs[i];
      if (!pr || !pr.img) continue;
      var hay = (pr.name + ' ' + pr.detail).toLowerCase();
      var hit = false;
      if (/مطب|speed bump/.test(hay) && /مطب|speed bump/.test(s)) hit = true;
      if (/اجري|لعبة|runner|run, sakr/.test(hay) && /اجري|لعبه|لعبة|اللعبة|runner|run,? sakr|\bgame\b/.test(s)) hit = true;
      if (hit && !seen[pr.img]) {
        seen[pr.img] = 1;
        out += '<a class="pf-saqr-card" href="#/projects"><img src="' + pr.img + '" alt="' + esc(pr.imgAlt || pr.name) + '" loading="lazy">' +
          '<span class="pf-saqr-card-t">' + esc(pr.name) + '</span><span class="pf-saqr-card-d">' + esc(pr.detail) + '</span></a>';
      }
    }
    return out;
  }

  function paintSaqrMsgs(t) {
    var box = document.getElementById('pf-saqr-msgs');
    if (!box) return;
    var html = '<div class="pf-saqr-msg pf-saqr-bot"><span class="pf-saqr-mini">' + SAQR_FEATHER + '</span><div class="pf-saqr-bubble">' + esc(t.saqrWelcome) + '</div></div>';
    if (saqrConsent === null) {
      html += '<div class="pf-saqr-msg pf-saqr-bot"><span class="pf-saqr-mini">' + SAQR_FEATHER + '</span><div class="pf-saqr-bubble pf-saqr-consent">' + esc(t.saqrConsentText) +
        '<div class="pf-saqr-consent-btns"><button type="button" class="pf-saqr-consent-yes">' + esc(t.saqrConsentYes) + '</button>' +
        '<button type="button" class="pf-saqr-consent-no">' + esc(t.saqrConsentNo) + '</button></div></div></div>';
    }
    if (saqrVoicePending) {
      html += '<div class="pf-saqr-msg pf-saqr-bot"><span class="pf-saqr-mini">' + SAQR_FEATHER + '</span><div class="pf-saqr-bubble pf-saqr-consent">' + esc(t.saqrVoiceNotice) +
        '<div class="pf-saqr-consent-btns"><button type="button" class="pf-saqr-voice-ok">' + esc(t.saqrVoiceNoticeOk) + '</button></div></div></div>';
    }
    saqrState.msgs.forEach(function (m, mi) {
      if (m.role === 'user') html += '<div class="pf-saqr-msg pf-saqr-me"><div class="pf-saqr-bubble">' + esc(m.content) + '</div></div>';
      else html += '<div class="pf-saqr-msg pf-saqr-bot"><span class="pf-saqr-mini">' + SAQR_FEATHER + '</span><div class="pf-saqr-bubble">' + esc(m.content) +
        '<button type="button" class="pf-saqr-replay" data-mi="' + mi + '" aria-label="' + esc(t.saqrReplay) + '" title="' + esc(t.saqrReplay) + '">' + SAQR_SPK_ON + '</button>' +
        saqrProjectCards(m.content, t) + '</div></div>';
    });
    if (saqrState.sending) html += '<div class="pf-saqr-msg pf-saqr-bot"><span class="pf-saqr-mini">' + SAQR_FEATHER + '</span><div class="pf-saqr-bubble pf-saqr-typing">' + esc(t.saqrTyping) + '</div></div>';
    box.innerHTML = html;
    box.scrollTop = box.scrollHeight;
  }

  function saqrSend() {
    var t = T[lang];
    var inp = document.getElementById('pf-saqr-input');
    var text = (inp.value || '').trim();
    if (!text || saqrState.sending) return;
    inp.value = '';
    saqrState.msgs.push({ role: 'user', content: text });
    if (!SAQR_WORKER_URL) {
      saqrState.msgs.push({ role: 'assistant', content: t.saqrSoon });
      paintSaqrMsgs(t);
      return;
    }
    saqrState.sending = true;
    if (saqrCall.active) saqrCallSetPhase('thinking');
    paintSaqrMsgs(t);
    var history = saqrState.msgs.slice(-12).map(function (m) {
      return { role: m.role === 'user' ? 'user' : 'model', content: m.content };
    });
    fetch(SAQR_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang: lang, messages: history, consent: saqrConsent === '1', chatId: saqrConsent === '1' ? saqrChatId : undefined })
    }).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }).then(function (data) {
      var reply = (data && data.reply) ? String(data.reply) : t.saqrError;
      saqrState.msgs.push({ role: 'assistant', content: reply });
      if (saqrCall.active) {
        saqrCallSetPhase('speaking');
        saqrSpeak(reply, lang, function () {
          if (saqrCall.active && saqrCall.phase === 'speaking') saqrCallListen();
        });
        saqrCallBargeListen();
      } else {
        saqrSpeak(reply, lang);
      }
    }).catch(function () {
      saqrState.msgs.push({ role: 'assistant', content: t.saqrError });
      if (saqrCall.active) {
        saqrCallSetPhase('speaking');
        saqrSpeak(t.saqrError, lang, function () { if (saqrCall.active && saqrCall.phase === 'speaking') saqrCallListen(); });
        saqrCallBargeListen();
      }
    }).finally(function () {
      saqrState.sending = false;
      paintSaqrMsgs(T[lang]);
      var box = document.getElementById('pf-saqr-msgs');
      if (box) box.scrollTop = box.scrollHeight;
    });
  }

  function setupReveal() {
    var els = document.querySelectorAll('.pf-card, .pf-fact, .pf-lang, .pf-skill, .pf-timeline-item, .pf-contact .pf-btn, .pf-pagehead, .pf-para, .pf-h3, .pf-closing');
    if (!('IntersectionObserver' in window)) return;
    var dirs = ['pf-reveal-l', 'pf-reveal-r', 'pf-reveal-b'];
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('pf-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    var idx = 0;
    els.forEach(function (el) {
      el.classList.add('pf-reveal', dirs[idx % 3]);
      el.style.transitionDelay = ((idx % 4) * 70) + 'ms';
      idx++;
      io.observe(el);
    });
  }

  function showLightbox(i) {
    var t = T[lang];
    openCert = i;
    var lb = document.createElement('div');
    lb.className = 'pf-lightbox';
    lb.id = 'pf-lightbox';
    lb.innerHTML = '<img src="' + certImages[i] + '" alt="' + esc(t.certAlts[i]) + '">' +
      '<div class="pf-lightbox-caption">' + esc(t.certsViewerTitle) + ' — ' + bdi(certNames[i]) + '</div>' +
      '<button type="button" class="pf-lightbox-btn pf-lightbox-prev" aria-label="&#8249;">&#8249;</button>' +
      '<button type="button" class="pf-lightbox-btn pf-lightbox-next" aria-label="&#8250;">&#8250;</button>' +
      '<button type="button" class="pf-lightbox-btn pf-lightbox-close" aria-label="&times;">&times;</button>';
    document.body.appendChild(lb);
    lb.querySelector('.pf-lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.pf-lightbox-prev').addEventListener('click', function () { stepLightbox(-1); });
    lb.querySelector('.pf-lightbox-next').addEventListener('click', function () { stepLightbox(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });
  }
  function stepLightbox(d) {
    var next = (openCert + d + certImages.length) % certImages.length;
    closeLightbox();
    showLightbox(next);
  }
  function closeLightbox() {
    openCert = -1;
    var lb = document.getElementById('pf-lightbox');
    if (lb) lb.remove();
  }

  document.addEventListener('click', function (e) {
    var themeToggle = e.target.closest && e.target.closest('.pf-theme-toggle');
    if (themeToggle) {
      theme = theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('pf-theme', theme); } catch (err) {}
      render();
      return;
    }
    var toggle = e.target.closest && e.target.closest('.pf-lang-toggle');
    if (toggle) {
      lang = lang === 'ar' ? 'en' : 'ar';
      try { localStorage.setItem('pf-lang', lang); } catch (err) {}
      if (window.pfSetLang) window.pfSetLang(lang);
      render();
      return;
    }
    var certBtn = e.target.closest && e.target.closest('.pf-cert-imgbtn');
    if (certBtn) {
      showLightbox(parseInt(certBtn.getAttribute('data-cert'), 10));
    }
  });

  document.addEventListener('pointerdown', function (e) {
    var target = e.target.closest && e.target.closest('.pf-btn, .pf-nav a, .pf-skill, .pf-cert-imgbtn, .pf-lang-toggle');
    if (!target) return;
    var rect = target.getBoundingClientRect();
    var ripple = document.createElement('span');
    var size = Math.max(rect.width, rect.height) * 2;
    ripple.className = 'pf-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    target.appendChild(ripple);
    ripple.addEventListener('animationend', function () { ripple.remove(); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  window.addEventListener('hashchange', function () { closeLightbox(); render(); window.scrollTo(0, 0); });
  render();
})();
