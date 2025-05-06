


document.addEventListener('DOMContentLoaded', () => {
    const API = "https://striveschool-api.herokuapp.com/api/product/";
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VjMjcyOTNkZjMwMzAwMTUxNWE2ZDUiLCJpYXQiOjE3NDY0NDc1NjMsImV4cCI6MTc0NzY1NzE2M30.ANV6GhDIYYQbwNY-LxKRwfmAEUC5nEj7rfa_cQ992vs';
  
    let editingId = null;
    const form = document.getElementById('product-form');
    const titleForm = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const inputs = {
      name: document.getElementById('name-product'),
      description: document.getElementById('description-product'),
      brand: document.getElementById('brand-product'),
      imageUrl: document.getElementById('img-product'),
      price: document.getElementById('price-product'),
    };
    const backContainer = document.getElementById('back-products');
  
    // PER RENDERIZZARE TUTTO CIO
    const renderBack = products => {
      backContainer.innerHTML = '';
      products.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-6 mb-3';
  
        const card = document.createElement('div');
        card.className = 'card card-back p-3 d-flex flex-row align-items-center';
  
        card.innerHTML = `
          <img src="${p.imageUrl}" class="me-3" style="width:80px; height:80px; object-fit:cover; border-radius:6px">
          <div class="flex-grow-1">
            <h6 class="mb-1">${p.name}</h6>
            <small class="text-muted">${p.brand}</small><br>
            <span class="fw-bold">€ ${p.price}</span>
          </div>
        `;
  
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-primary me-2';
        editBtn.innerText = 'Modifica';
        editBtn.onclick = () => {
          // PER POPOLARE IL FORM
          editingId = p._id;
          titleForm.innerText = 'Modifica prodotto';
          submitBtn.innerText = 'Salva Modifiche';
          Object.keys(inputs).forEach(key => inputs[key].value = p[key]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };
  
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.innerText = 'Elimina';
        deleteBtn.onclick = async () => {
          if (!confirm('Eliminare questo prodotto?')) return;
          await fetch(API + p._id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
          });
          loadBack();
        };
  
        const btnGroup = document.createElement('div');
        btnGroup.append(editBtn, deleteBtn);
        card.appendChild(btnGroup);
  
        col.appendChild(card);
        backContainer.appendChild(col);
      });
    };
  
    
    const loadBack = async () => {
      try {
        const res = await fetch(API, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const list = await res.json();
        renderBack(list);
      } catch (e) {
        console.error(e);
        alert('Errore nel caricamento prodotti backoffice');
      }
    };
  
    // POST
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const payload = {
        name: inputs.name.value,
        description: inputs.description.value,
        brand: inputs.brand.value,
        imageUrl: inputs.imageUrl.value,
        price: Number(inputs.price.value),
      };
      try {
        const url = API + (editingId || '');
        const method = editingId ? 'PUT' : 'POST';
        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(res.status);
        alert(editingId ? 'Modifiche salvate!' : 'Prodotto aggiunto!');
        form.reset();
        editingId = null;
        titleForm.innerText = 'Aggiungi nuovo prodotto';
        submitBtn.innerText = 'Aggiungi Prodotto';
        loadBack();
      } catch (err) {
        console.error(err);
        alert('Errore nel salvataggio del prodotto');
      }
    });
  
    
    loadBack();
  });
  
