// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#enlistee_name' ),
        json = { enlistee_name: input.value },
        body = JSON.stringify( json )

  document.getElementById( 'enlistee_name' ).value = "";
  const response = await fetch( '/enlist', {
    method:'POST',
    body 
  })

  const text = await response.text()

  console.log( 'text:', text )
  window.location.href = '/game_page/';
}

window.onload = function() {
  const button = document.querySelector('button')
  button.onclick = submit
}
