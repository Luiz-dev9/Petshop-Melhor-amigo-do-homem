const API = 'http://localhost:3000';

const menuBtn = document.getElementById("menu-btn");
const navBar = document.getElementById("nav-bar");

menuBtn.addEventListener("click", () => {
  navBar.classList.toggle("active");
});

// Salva o animal selecionado
function selecionarAnimal(nome){
  localStorage.setItem("animalSelecionado", nome);
}

// Recupera animal selecionado ao carregar
document.addEventListener("DOMContentLoaded", () => {
  const animalSelecionado = localStorage.getItem("animalSelecionado");
  const campoAnimal = document.getElementById("animal");
  if (animalSelecionado && campoAnimal) campoAnimal.value = animalSelecionado;
});

// Validação e envio do formulário
document.getElementById("formulario").addEventListener('submit', async function(e){
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("tele").value.trim();
  const animal = document.getElementById("animal").value.trim();
  const motivo = document.getElementById("motivo").value.trim();

  if(!nome || !email || !telefone || !animal || !motivo){
    alert("Preencha todos os campos");
    return;
  }

  try {
    const response = await fetch(`${API}/cadastro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone, animal, motivo })
    });

    let dados;
    try {
      dados = await response.json();
    } catch {
      dados = {};
    }

    if(!response.ok){
      alert(dados.error || "Erro ao cadastrar usuário");
      return;
    }

    alert("Cadastro realizado com sucesso!");
    document.getElementById("formulario").reset();
    localStorage.removeItem("animalSelecionado");

  } catch(error){
    console.error(error);
    alert(error.message || "Erro ao conectar ao servidor");
  }
});
