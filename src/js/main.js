"use strict";
const isNumber = (numero) => /^[0-9]+$/.test(numero);
const isValidCep = (cep) => cep.length == 8 && isNumber(cep);
const cep = document.getElementById("cep");
const loading = document.getElementById("loading");
const form = document.getElementById("forms");

const fields = [
  "logradouro",
  "complemento",
  "bairro",
  "localidade",
  "uf",
  "ibge",
  "gia",
  "ddd",
  "siafi",
];
const setValue = (id, value) => (document.getElementById(id).value = value);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fillForm = (event) => {
  fields.forEach((f) => {
    setValue(f, event[f]);
  });
};

const getCep = async () => {
  loading.style.display = "inline-block";
  const formattedCep = cep.value.replace("-", "");
  const url = `https://viacep.com.br/ws/${formattedCep}/json/`;
  const errorMessage = document.getElementById("error");

  if (isValidCep(formattedCep)) {
    try {
      const fetchCep = fetch(url).then((res) => res.json());
      const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
      const [response] = await Promise.all([fetchCep, minDelay]);

      if (response.erro) {
        errorMessage.innerHTML = "CEP não existe.";
        form.style.display = "none";
        console.log(form.style.display);
        return null;
      }
      form.style.display = "block";
      errorMessage.innerHTML = "";
      return { response };
    } catch (error) {
      errorMessage.innerHTML = error;
      loading.style.display = "none";
      form.style.display = "none";
      return null;
    } finally {
      loading.style.display = "none";
    }
  }
  errorMessage.innerHTML = "CEP inválido.";
  form.style.display = "none";
  loading.style.display = "none";
  return null;
};

const handleSubmit = async () => {
  const { response } = await getCep();
  if (!response) return;
  fillForm(response);
};

cep.addEventListener("focusout", handleSubmit);
