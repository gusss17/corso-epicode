

document.addEventListener('DOMContentLoaded', () => {
    const API = "https://striveschool-api.herokuapp.com/api/product/";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VjMjcyOTNkZjMwMzAwMTUxNWE2ZDUiLCJpYXQiOjE3NDY0NDc1NjMsImV4cCI6MTc0NzY1NzE2M30.ANV6GhDIYYQbwNY-LxKRwfmAEUC5nEj7rfa_cQ992vs';

    const container = document.getElementById('products');
    if (!container) return console.error('Container #products non trovato');

    const makeCard = p => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3 mb-4 ';

        const card = document.createElement('div');
        card.className = 'card-home';

        card.innerHTML = `
        <img src="${p.imageUrl}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-truncate">${p.description}</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <span class="fw-bold">€ ${p.price}</span>
          <button class="btn btn-sm btn-primary">Acquista</button>
        </div>
      `;
        col.appendChild(card);
        container.appendChild(col);
    };

    (async () => {
        try {
            const res = await fetch(API, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error(res.status);
            const list = await res.json();
            list.forEach(makeCard);
        } catch (e) {
            console.error('Errore caricamento:', e);
            alert('Non è possibile caricare i prodotti.');
        }
    })();
});
