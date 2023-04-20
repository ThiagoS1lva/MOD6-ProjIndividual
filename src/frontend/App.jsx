import React, { useState, useEffect } from 'react';
import styles from './App.module.css';


function MeuFormulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [Coletores, setColetores] = useState([]);

  //Timer para sumir a mensagem
  
  useEffect(() => {
    let timer;
    if (mensagem) {
      timer = setTimeout(() => {
        setMensagem('');
      }, 500);
    }
  })
  
  //Metodo post
  const handleSubmit = async (event) => {
    event.preventDefault();
    setTimeout(() => {
      window.location.reload();
    }, 500);
    const response = await fetch('http://localhost:3000/Coletador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, cpf, data_nascimento })
    });

    if (response.ok) {
      setMensagem('Cadastrado com sucesso!');
    } else {
      setMensagem('Erro ao Cadastrar!');
    }
    const data = await response.text();
    console.log(data);
  };


  //Metodo get
  useEffect(() => {
    async function fetchColetores() {
      const response = await fetch('http://localhost:3000/Coletadores');
      const data = await response.json();
      setColetores(data);
    }

    fetchColetores();
  }, []);


  //Metodo delete
  const handleRemover = async (id) => {
    const response = await fetch(`http://localhost:3000/Coletador/id/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setMensagem('Removido com sucesso!');
      setColetores(Coletores.filter(coletor => coletor.id !== id));
    } else {
      setMensagem('Erro ao Remover!');
    }
  }




  return (
    <div>
      <div className={styles.container}>
        <p className={styles.titulo}>Cadastro de Coletores</p>
        {mensagem && <p>{mensagem}</p>}
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label>
            Nome:
          </label>
          <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} className={styles.input} />

          <label>
            E-mail:
          </label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={styles.input} />

          <label>
            CPF:
          </label>
          <input type="text"  value={cpf} onChange={(event) => setCpf(event.target.value)} className={styles.input} />

          <label>
            Data de nascimento:
          </label>
          <input type="date" className={styles.date} value={data_nascimento} onChange={(event) => setDataNascimento(event.target.value)} />

          <button type="submit">Enviar</button>
        </form>
      </div>

      <div className={styles.containerGet}>
          <h2>Coletores Cadastrados</h2>
          <ul>
            {Coletores.map(Coletor => (
              <li key={Coletor.id}>
                <p><b>Nome:</b> {Coletor.nome}</p>
                <p><b>E-mail:</b> {Coletor.email}</p>
                <p><b>CPF:</b> {Coletor.cpf}</p>
                <p><b>Data de Nascimento:</b> {Coletor.data_nascimento}</p>
                <button className={styles.btnR} onClick={() => handleRemover(Coletor.id)}>Remover</button>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}
export default MeuFormulario;