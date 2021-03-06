import React, { useState, useEffect } from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import api from '../../services/api';

import './styles.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Pessoa {
  id: number;
  nome: string;
}

const Analista = () => {
  const history = useHistory();

  const jwt = localStorage.getItem('jwt');

  if (localStorage.getItem('jwt') === null) {
    swal({
      text: 'Não foi possível carregar os dados necessários para essa ação. Verifique sua conexão e tente novamente!',
      icon: 'error'
    });
    history.push('/');
  }

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    api.get('pessoa', { headers: { 'Authorization': `Bearer ${jwt}` } }).then(
      response => {
        setPessoas(response.data);
      },
      () => {
        swal({
          text: 'Não foi possível carregar os dados necessários para essa ação. Verifique sua conexão e tente novamente!',
          icon: 'error'
        });
        handleLogout();
      }
    );
  }, [jwt]);

  function handleNavigateToDetailPessoa(operadorId: number) {
    history.push('/visualizar-pessoa', { id: operadorId });
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div id="page-analista">
      <div className="content">
        <Header title={'Bem vindo, Analista!'}/>

        <h2>Pessoas</h2>

        <ul>
          {!pessoas[0] && (
            <h3>Ainda não há pessoas cadastradas!</h3>
          )}
          {pessoas.map(pessoa => (
            <li
              key={pessoa.id}
              onClick={() => { }}
            >
              <span>{pessoa.nome}</span>

              <div className="buttons">
                <button 
                  title="Visualizar Pessoa"
                  className="enter-button"
                  onClick={() => handleNavigateToDetailPessoa(pessoa.id)}
                  type="button"
                >
                  <FiArrowRightCircle size={20} color="#34CB79" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Analista;
