const apiUrl = '/alunos';

const form = document.getElementById('form-aluno');
const tabelaBody = document.getElementById('tabela-alunos');
const alunoIdInput = document.getElementById('aluno-id');
const nomeInput = document.getElementById('nome');
const matriculaInput = document.getElementById('matricula');
const emailInput = document.getElementById('email');
const cursoInput = document.getElementById('curso');
const telefoneInput = document.getElementById('telefone');
const enderecoInput = document.getElementById('endereco');
const dataMatriculaInput = document.getElementById('dataMatricula');
const cancelarBtn = document.getElementById('cancelar');

// Máscara de telefone
telefoneInput.addEventListener('keyup', function(e) {
    let valor = e.target.value.replace(/\D/g, '');
    valor = valor.substring(0, 11); 
    let formatado = '';
    if (valor.length > 0) {
        formatado = '(' + valor.substring(0,2);
    }
    if (valor.length > 2) {
        formatado += ') ' + valor.substring(2,7);
    }
    if (valor.length > 7) {
        formatado += '-' + valor.substring(7,11);
    }
    e.target.value = formatado;
});

document.addEventListener('DOMContentLoaded', carregarAlunos);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = alunoIdInput.value;
    const aluno = {
        nome: nomeInput.value,
        matricula: matriculaInput.value,
        email: emailInput.value,
        curso: cursoInput.value,
        telefone: telefoneInput.value,
        endereco: enderecoInput.value,
        dataMatricula: dataMatriculaInput.value
    };

    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        });
    } else {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        });
    }

    limparFormulario();
    carregarAlunos();
});

cancelarBtn.addEventListener('click', limparFormulario);

async function carregarAlunos() {
    const response = await fetch(apiUrl);
    const alunos = await response.json();
    tabelaBody.innerHTML = '';

    alunos.forEach(aluno => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.email}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.telefone || ''}</td>
            <td>${aluno.endereco || ''}</td>
            <td>${aluno.dataMatricula || ''}</td>
            <td>
                <button class="editar" onclick="editarAluno(${aluno.id})">Editar</button>
                <button class="excluir" onclick="excluirAluno(${aluno.id})">Excluir</button>
            </td>
        `;
        tabelaBody.appendChild(row);
    });
}

async function editarAluno(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const aluno = await response.json();
    alunoIdInput.value = aluno.id;
    nomeInput.value = aluno.nome;
    matriculaInput.value = aluno.matricula;
    emailInput.value = aluno.email;

    // Selecionar o curso correto no <select>
    const cursoSelect = document.getElementById('curso');
    for (let option of cursoSelect.options) {
        if (option.value === aluno.curso) {
            option.selected = true;
            break;
        }
    }

    telefoneInput.value = aluno.telefone || '';
    enderecoInput.value = aluno.endereco || '';
    dataMatriculaInput.value = aluno.dataMatricula || '';
    cancelarBtn.style.display = 'inline-block';
}

async function excluirAluno(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        carregarAlunos();
    }
}

function limparFormulario() {
    form.reset();
    alunoIdInput.value = '';
    cancelarBtn.style.display = 'none';
}