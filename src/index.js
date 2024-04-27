
import express from 'express'
import cors  from 'cors'

const app = express()

app.use(cors())

app.use(express.json())


//------------------------

let carros = []   
let pessoas = [] 
let proximoId = 1  
let proximoUserId = 1



app.post('/carros',(request,response)=>{

    const modeloDocarro = request.body.modeloDocarro
    const marcaCarro = request.body.marcaCarro
    const anoDoCarro = Number(request.body.anoDoCarro)
    const corDoCarro = request.body.corDoCarro
    const precoDoCarro = Number(request.body.precoDoCarro)

    if (!modeloDocarro) {
        response.status(400).send(JSON.stringify({
            Mensagem: 'Passe um modelo válido para registrar o seu carro'
        }))
    }
responseposta
    if (!marcaCarro) {
      response.status(400).send(JSON.stringify({
          Mensagem: 'Passe uma marca válida para registrar o seu carro '
      }))
    }

    if (!corDoCarro) {
      response.status(400).send(JSON.stringify({
          Mensagem: 'Passe uma marca válida para registrar o seu carro '
      }))
    }

    if (!anoDoCarro) {
      response.status(400).send(JSON.stringify({
          Mensagem: 'Passe um ano válido, para registrar o seu carro. O ano deve conter 4 digitos'
      }))
    }

    if(!precoDoCarro){
        response.status(400).send(JSON.stringify({
            Mensagem: 'Passe um preço válido para registrar o seu carro'
        }))
    }

    let novoCarro ={
        id: proximoId,
        modeloDocarro:modeloDocarro, 
        marcaCarro:marcaCarro,
        anoDoCarro:anoDoCarro,
        corDoCarro:corDoCarro,
        precoDoCarro:precoDoCarro,
    }

    carros.push(novoCarro)

    proximoId ++

    response.status(201).send(`
    Carro - ${novoCarro.modeloDocarro} criado com sucesso!
    Marca: ${novoCarro.marcaCarro}, 
    Ano do Carro : ${novoCarro.anoDoCarro},
    Cor do Carro :  ${novoCarro.corDoCarro},  
    Preço: ${novoCarro.precoDoCarro}, `
    )

})

//-------------------- LER CARRO -------------------------

app.get('/carros', (request, response) => {
    if (carros.length === 0) {
      return response.status(400).send(JSON.stringify({
        Mensagem: 'Lista vazia, adicione carros para consultar',
      }))
    }
  
    const dadosMapeados = carros.map((carro) => `Carro: ${carro.modeloDocarro} - Marca: ${carro.marcaCarro} -  Cor : ${carro.corDoCarro} - Preço: ${carro.precoDoCarro}`)
  
    response.status(200).send({
      carros: dadosMapeados,
    })
})


//-------------------- FILTRAR CARRO ---------------------------

app.get ('/carros/:modeloDocarro',(request, response) => {
  const modeloDocarro= request.params.modeloDocarro

  const carrosVerificados = carros.find(carro => carro.modeloDocarro === modeloDocarro ) 

  if(!carrosVerificados){
      response.status(404).json({
          sucess: false,
          message: "Modelo de carro não encontrado no banco"
      })
  }

  response.status(201).json({
      sucess: true,
      data: carros
  })

})



app.listen(8080, () => console.log("Servidor iniciado na porta 8080"))