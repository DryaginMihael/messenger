export const notify = (message) => {
    if ('Notification' in window) {
        // Проверяем, поддерживаются ли уведомления в текущем браузере
        Notification.requestPermission()
          .then(function (permission) {
            if (permission === 'granted') {
              // Если разрешение дано, можно создавать уведомления
              navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('У вас новое сообщение', {
                  body: message,
                  icon: './logo2.png'
                });
              });

            //   var notification = new Notification('У вас новое сообщение', {
            //     body: message,
            //     icon: './logo2.png'
            //   });  
              
            //   notification.onclick = function () {
            //     // Действие, выполняемое при щелчке на уведомлении
            //     console.log('Уведомление было нажато.');
            //   };
            }
          });
      }
};
