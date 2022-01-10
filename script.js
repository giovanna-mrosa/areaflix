function handler(e) {
  e.preventDefault()

  let movie = document.querySelector('.form-input').value

  if (movie) {
    const url = `http://www.omdbapi.com/?s=${movie}&apikey=954d4961`
    const options = {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      cache: 'default'
    }

    fetch(url, options)
      .then(function (response) {
        //Tratamento de erro
        if (!response.ok) throw new Error('Erro ao executar requisição')

        ///Retorne um objeto no formato json
        return response.json()
      })
      //Receber dados
      .then(function (data) {
        // console.log(data)

        let newContent = ''
        for (let i = 1; i < data.Search.length; i++) {
          newContent += `<li class="app-movies-all-card">`
          newContent += `<figure class="app-movies-all-figure">`
          newContent += `<img class="app-movies-all-thumb" src="${data.Search[i].Poster}"/>`
          newContent += `</figure>`
          newContent += `<legend class="app-movies-all-legend">`
          newContent += `<span class="app-movies-all-year">${data.Search[i].Year}</span>`
          newContent += `<h2 class="app-movies-all-title">${data.Search[i].Title}</h2>`
          newContent += `</legend>`
          newContent += `</li>`
        }

        document.getElementById('movies').innerHTML = newContent
      })
  } else {
    alert('Digite o nome de um filme!')
  }
}

window.onload = () => {
  const submit = document.querySelector('.form-submit')
  submit.addEventListener('click', handler)
}
