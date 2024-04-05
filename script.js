let participantes = [
    {
      nome: "Hilário Dantas",
      email: "hilario@gmail.com",
      dataInscricao: new Date(2024, 2, 25, 19, 20),
      dataCheckIn: new Date(2024, 2, 30, 22, 10)
    },
    {
      nome: "José Ananias",
      email: "jose@gmail.com",
      dataInscricao: new Date(2024, 2, 24, 16, 20),
      dataCheckIn: new Date(2024, 2, 29, 20, 10)
    },
    {
      nome: "Meris junio",
      email: "participante3@gmail.com",
      dataInscricao: new Date(2024, 2, 25, 12, 10),
      dataCheckIn: null
    },
    {
      nome: "Farinha Branca",
      email: "participante4@gmail.com",
      dataInscricao: new Date(2024, 2, 26, 8, 45),
      dataCheckIn: null
    },
    {
      nome: "Berikão",
      email: "participante5@gmail.com",
      dataInscricao: new Date(2024, 2, 27, 14, 30),
      dataCheckIn: new Date(2024, 3, 2, 20, 10)
    },
    {
      nome: "Qualquer nome",
      email: "participante6@gmail.com",
      dataInscricao: new Date(2024, 2, 28, 10, 5),
      dataCheckIn: new Date(2024, 3, 3, 16, 45)
    },
    {
      nome: "Eh isso",
      email: "participante7@gmail.com",
      dataInscricao: new Date(2024, 2, 29, 18, 20),
      dataCheckIn: null
    },
    {
      nome: "Amigão",
      email: "participante8@gmail.com",
      dataInscricao: new Date(2024, 2, 30, 11, 40),
      dataCheckIn: new Date(2024, 3, 5, 17, 30)
    },
    {
      nome: "AAAAAAAAAAAAAAAa",
      email: "participante9@gmail.com",
      dataInscricao: new Date(2024, 2, 31, 7, 15),
      dataCheckIn: new Date(2024, 3, 6, 13, 10)
    },
    {
      nome: "bosta",
      email: "participante10@gmail.com",
      dataInscricao: new Date(2024, 3, 1, 15, 55),
      dataCheckIn: new Date(2024, 3, 7, 21, 45)
    }
  ];
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
      dataCheckIn = `
        <button
        data-email="${participante.email}"
        onclick="fazerCheckin(event)"
        >
        Confirmar check-in
        </button>
      `
    }
    
    return` 
      <tbody>     
        <tr>
          <td>
            <strong>
              ${participante.nome}
            </strong>
            <br>
            <small>
              ${participante.email}
            </small>
          </td>
          <td> 
            ${dataInscricao} 
          </td>
          <td> 
            ${dataCheckIn} 
          </td>
        </tr>
      </tbody>`
  }
  
  const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
      output += criarNovoParticipante(participante)
    }

    document
    .querySelector('tbody')
    .innerHTML = output
  }
  
  atualizarLista(participantes)

  const adicionarParticipante = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const participante ={
      nome: formData.get('nome'),
      email: formData.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }

    const participanteExiste = participantes.find(
      (p) => p.email == participante.email
    )

    if(participanteExiste) {
      alert('Email já cadastrado!')
      return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }


  const fazerCheckin = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if(confirm(mensagemConfirmacao) == false) {
      return 
    }

    const participante = participantes.find((p) => p.email == event.target.dataset.email
    )

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
  }




