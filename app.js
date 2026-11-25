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
    pin: 'M12 2C8.13 2 5 5.13 5 8.5c0 5.25 7 13 7 13s7-7.75 7-13c0-3.37-3.13-6.5-7-6.5zm0 8.75a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5z'
  };
  var socialIcons = ['facebook', 'telegram', 'whatsapp', 'instagram', 'github', 'tiktok', 'x', 'imo'];
  function icon(name) {
    return '<svg class="pf-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICON_PATHS[name] + '"/></svg>';
  }
  var navPaths = ['#/', '#/app', '#/about', '#/certifications', '#/projects', '#/services', '#/contact'];
  var navIcons = ['home', 'navApp', 'navUser', 'navCert', 'navCode', 'navGrid', 'mail'];

  var T = {
    ar: {
      navAria: 'صفحات الموقع',
      nav: ['الرئيسية', 'التطبيق', 'نبذة عني', 'الشهادات', 'المشاريع', 'خدماتي', 'التواصل'],
      heroAlt: 'أحمد صقر ببدلة كحلية رسمية على خلفية استوديو بسيطة',
      verifiedTitle: 'الموقع الرسمي لأحمد مختار صقر',
      nameAr: 'أحمد مختار عوض',
      engPrefix: 'المهندس',
      role: 'Junior Cybersecurity Analyst · Network Technician · Software & Games Designer',
      purposeTitle: 'هدف التطبيق',
      tagline: 'أن يكون الواجهة الرسمية للمهندس أحمد مختار صقر: مكان واحد يعرض خدماته ومشاريعه وشهاداته، وتصل منه إليه مباشرة لتطلب خدمتك بضغطة واحدة.',
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
      servicesEyebrow: 'SERVICES',
      servicesTitle: 'خدماتي',
      servicesIntro: 'خدمات أقدمها بنفس الجودة التي تراها في هذا الموقع:',
      services: [
        { name: 'موقع شخصي أو صفحة تعريفية', detail: 'صفحة واحدة أنيقة وسريعة، مصممة للموبايل أولاً — تماماً مثل هذا الموقع.' },
        { name: 'صفحة هبوط لنشاطك التجاري', detail: 'صفحة تعرّف بمنتجك أو خدمتك وتجلب لك العملاء، مع أزرار تواصل جاهزة.' },
        { name: 'لعبة متصفح خفيفة', detail: 'لعبة جافاسكريبت كاملة تعمل من المتصفح على الموبايل والكمبيوتر.' },
        { name: 'تأمين وفحص أجهزتك وشبكتك', detail: 'مراجعة أساسية لإعدادات الأمان لجهازك أو شبكتك الصغيرة، مع خطوات عملية للحماية بمعايير Cisco.' },
        { name: 'إنشاء منصة تعليمية', detail: 'منصة كورسات كاملة: فيديوهات واختبارات ولوحة تحكم للطلاب، جاهزة تستقبل مشتركين من أول يوم.' },
        { name: 'إنشاء متجر إلكتروني', detail: 'متجر كامل بسلة شراء وبوابة دفع وإدارة منتجات، جاهز يبيع من أول يوم.' },
        { name: 'شات بوت للبيزنس', detail: 'بوت واتساب أو تليجرام يرد على عملائك تلقائياً، يستقبل الطلبات ويجاوب على الأسئلة الشائعة.' },
        { name: 'تسريع وتحسين المواقع', detail: 'تشخيص شامل لموقعك البطيء ورفع سرعته ونتائجه في محركات البحث.' },
        { name: 'دعم فني وصيانة عن بعد', detail: 'حل مشاكل جهازك وبرامجك عن بعد، وصيانة دورية تخليك مطمئن.' }
      ],
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
        'https://wa.me/201154655875?text=%D8%A3%D9%87%D9%84%D8%A7%D9%8B+%D8%A3%D8%AD%D9%85%D8%AF%D8%8C+%D8%B9%D8%A7%D9%88%D8%B2+%D8%A3%D8%B3%D8%AA%D9%81%D8%B3%D8%B1+%D8%B9%D9%86+%D8%AE%D8%AF%D9%85%D8%A9%3A+%D8%AF%D8%B9%D9%85+%D9%81%D9%86%D9%8A+%D9%88%D8%B5%D9%8A%D8%A7%D9%86%D8%A9+%D8%B9%D9%86+%D8%A8%D8%B9%D8%AF'
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
      heroAlt: 'Ahmed Sakr in a formal navy suit on a simple studio background',
      verifiedTitle: "Ahmed Mokhtar Sakr's official website",
      nameAr: 'أحمد مختار عوض',
      engPrefix: 'Eng.',
      role: 'Junior Cybersecurity Analyst · Network Technician · Software & Games Designer',
      purposeTitle: 'Purpose of the app',
      tagline: 'To be the official home of Eng. Ahmed Mokhtar Sakr: one place for his services, projects and certifications, with a direct line to reach him and order your service in one tap.',
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
      servicesEyebrow: 'SERVICES',
      servicesTitle: 'My services',
      servicesIntro: 'What I can build for you, with the same quality you see on this site:',
      services: [
        { name: 'Personal one-page website', detail: 'A clean, fast, mobile-first page — just like this very site.' },
        { name: 'Landing page for your business', detail: 'A page that presents your product or service and brings you customers, with ready contact buttons.' },
        { name: 'A light browser game', detail: 'A complete JavaScript game that runs in the browser on mobile and desktop.' },
        { name: 'Security checkup for your devices and network', detail: 'A basic review of the security settings of your device or small network, with practical hardening steps following Cisco standards.' },
        { name: 'Educational platform', detail: 'A complete course platform with videos, quizzes and a student dashboard, ready to take subscribers from day one.' },
        { name: 'Online store', detail: 'A complete store with cart, payment gateway and product management, ready to sell from day one.' },
        { name: 'Business chatbot', detail: 'A WhatsApp or Telegram bot that replies to your customers automatically, takes orders and answers common questions.' },
        { name: 'Website speed optimization', detail: 'A full diagnosis of your slow website, boosting its speed and search engine scores.' },
        { name: 'Remote tech support and maintenance', detail: 'Fixing your device and software issues remotely, with regular maintenance for peace of mind.' }
      ],
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
        'https://wa.me/201154655875?text=Hi+Ahmed%2C+I%27d+like+to+ask+about+your+service%3A+Remote+tech+support+and+maintenance'
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
      '</div></div></div></div>';
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
    var cards = t.services.map(function (s, i) {
      return '<div class="pf-card"><div class="pf-card-num">' + (i + 1) + '</div>' +
        '<div class="pf-card-name">' + esc(s.name) + '</div>' +
        '<div class="pf-card-detail">' + esc(s.detail) + '</div>' +
        '<a class="pf-btn pf-btn-primary pf-service-wa" href="' + t.serviceWaLinks[i] + '" target="_blank" rel="noopener">' + icon('whatsapp') + esc(t.serviceWa) + '</a></div>';
    }).join('');
    return '<div class="pf-page">' + pageHead(t.servicesEyebrow, t.servicesTitle) +
      '<p class="pf-para">' + esc(t.servicesIntro) + '</p>' +
      '<div class="pf-grid">' + cards + '</div>' +
      '<div class="pf-contact"><span class="pf-btn pf-btn-ghost pf-btn-soon">' + icon('store') + esc(t.khamsatSoon) + '</span></div></div>';
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
    if (navPaths.indexOf(h) === -1) return '#/';
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

  function render() {
    var t = T[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.theme = theme;
    document.title = lang === 'ar' ? 'أحمد مختار صقر' : 'Ahmed Mokhtar Sakr';
    var route = currentRoute();
    var nav = '<nav class="pf-nav" aria-label="' + esc(t.navAria) + '">' +
      t.nav.map(function (label, i) {
        if (i === 0) {
          if (route === '#/') return '';
          return '<a href="' + navPaths[i] + '" class="pf-nav-home" aria-label="' + esc(label) + '" title="' + esc(label) + '">' + icon('home') + '</a>';
        }
        var active = navPaths[i] === route ? ' aria-current="page"' : '';
        return '<a href="' + navPaths[i] + '"' + active + '>' + icon(navIcons[i]) + esc(label) + '</a>';
      }).join('') +
      '</nav>' +
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
    else if (route === '#/contact') page = renderContact(t);
    else page = renderHome(t);
    document.getElementById('app').innerHTML = nav + page + '<div class="pf-closing">' + esc(t.closing) + '</div>';
    if (openCert >= 0 && route === '#/certifications') showLightbox(openCert);
    setupReveal();
    setupTilt();
    if (renderDone && window.goatcounter && window.goatcounter.count) {
      try { window.goatcounter.count({ path: location.hash.slice(1) || '/' }); } catch (e) {}
    }
    renderDone = true;
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
