'use strict';
const apareceForms = () => {
    document.getElementById('forms').style.display = 'block'
}

const limparForms = () => {
    document.getElementById('forms').style.display = 'none'
}

const showError = () => {
    document.getElementById('error').style.display = 'block'
}

const showError2 = () => {
    document.getElementById('error2').style.display = 'block'
}

const limpaErros = () => {
    document.getElementById('error').style.display = 'none'
    document.getElementById('error2').style.display = 'none'
}


document.getElementById('forms').style.display = 'none'

const preencherFormulario = (event) =>{
    document.getElementById('logradouro').value = event.logradouro
    document.getElementById('complemento').value = event.complemento
    document.getElementById('bairro').value = event.bairro
    document.getElementById('localidade').value = event.localidade
    document.getElementById('uf').value = event.uf
    document.getElementById('ibge').value = event.ibge
    document.getElementById('gia').value = event.gia
    document.getElementById('ddd').value = event.ddd
    document.getElementById('siafi').value = event.siafi
}

document.getElementById('error').style.display = 'none'
document.getElementById('error2').style.display = 'none'


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparForms();
    
    const cep = document.getElementById('cep').value.replace("-","");
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            limparForms()
            limpaErros()
            showError2()
        }else {
            preencherFormulario(endereco);
            apareceForms()
            limpaErros()
        }
    }else{
        limparForms()
        limpaErros()
        showError()
    }
     
}

document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);