// Este código registra el Service Worker y permite que la app sea instalable (PWA)
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );
  
  export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          fetch(swUrl, { cache: 'no-store' })
            .then((response) => {
              if (
                response.status === 404 ||
                response.headers.get('content-type')?.indexOf('javascript') === -1
              ) {
                navigator.serviceWorker.ready.then((registration) => {
                  registration.unregister().then(() => {
                    window.location.reload();
                  });
                });
              } else {
                registerValidSW(swUrl);
              }
            })
            .catch(() => {
              console.log('No se encontró conexión a internet. La app funcionará sin conexión.');
            });
        } else {
          registerValidSW(swUrl);
        }
      });
    }
  }
  
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('Nueva versión disponible. Actualiza la página.');
                } else {
                  console.log('Contenido en caché para su uso sin conexión.');
                }
              }
            };
          }
        };
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error('Error al desregistrar el Service Worker:', error);
        });
    }
  }
  