const API = 'http://localhost:3000';

const menuBtn = document.getElementById("menu-btn");
const navBar = document.getElementById("nav-bar");

if (menuBtn && navBar) {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("active");
  });
}

// Salva o animal selecionado
function selecionarAnimal(nome) {
  localStorage.setItem("animalSelecionado", nome);
}

// Recupera animal selecionado ao carregar
document.addEventListener("DOMContentLoaded", () => {
  const animalSelecionado = localStorage.getItem("animalSelecionado");
  const campoAnimal = document.getElementById("animal");
  if (animalSelecionado && campoAnimal) campoAnimal.value = animalSelecionado;
});

// Validação e envio do formulário
const form = document.getElementById("formulario");
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const animal = document.getElementById("animal").value.trim();
    const motivo = document.getElementById("motivo").value.trim();

    if (!nome || !email || !telefone || !animal || !motivo) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const banco = await fetch(`${API}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, animal, motivo })
      });

      const dados = await banco.json();

      if (!banco.ok) {
        alert(dados.error || "Erro ao cadastrar o usuário");
        return; // ⚠️ evita mostrar o alerta de sucesso
      }

      alert("Seu cadastro foi realizado com sucesso! Agradecemos o seu interesse em adotar um amigo peludo.");
      form.reset();
      localStorage.removeItem("animalSelecionado");

    } catch (error) {
      console.error("Erro ao conectar ao servidor", error);
      alert("Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://localhost:3000");
    }
  });
}
