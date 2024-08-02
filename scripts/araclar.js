fetch('../araclar.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('arac-container');
        let row;

        data.forEach((arac, index) => {
          if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row', 'justify-content-center');
            container.appendChild(row);
          }

          const aracDiv = document.createElement('div');
          aracDiv.classList.add('col-3');
          aracDiv.style.width = '400px';

          aracDiv.innerHTML = `
            <a href="${arac.link}"><img src="${arac.image}" alt=""></a>
            <p style="text-align: center;">${arac.name}</p>
            <p class="fw-bold">Kilometre: ${arac.kilometre} <br> Model: ${arac.model} <br> Beygir gücü: ${arac.power} <br> Yakıt türü: ${arac.fuel}<br> Fiyat: ${arac.price}</p>
            <div class="bg-danger rounded text-center text-light p-1 buy-button" data-arac='${JSON.stringify(arac)}'>Satın Al</div><hr>
          `;

          row.appendChild(aracDiv);
        });

        // Satın Al butonlarına olay dinleyici ekleyin
        const buyButtons = document.querySelectorAll('.buy-button');
        buyButtons.forEach(button => {
          button.addEventListener('click', event => {
            const arac = JSON.parse(event.target.getAttribute('data-arac'));
            localStorage.setItem('selectedArac', JSON.stringify(arac));
            window.location.href = '../sepet.html';
          });
        });
      })
      .catch(error => console.error('Verileri çekmede sorun yaşandı:', error));