export default ({ app }) => {
  app.router.afterEach((to, from) => {
    if(to.name) {
      setTimeout(function() {
        document.body.classList.add(to.name)

        if(to.name == 'start') {document.body.classList.add('sticky')}
      }, 100)
    }
  });
}



