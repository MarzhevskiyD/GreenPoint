const storeScroll = () => {
  if (window.scrollY >= 150) {document.body.classList.add('sticky--visible');}
  else {document.body.classList.remove('sticky--visible');}
};

window.addEventListener('scroll', storeScroll, {passive: true});
window.addEventListener('load', storeScroll, {passive: true});


const checkVisibilities = () => {
  const sections = document.querySelectorAll('.detectVisibility');
  sections.forEach((item) => {
    if(!item.classList.contains('section--thisVisible')) {
      if(item.offsetTop < Math.round(window.scrollY + window.innerHeight * .5)) {
        item.classList.add('section--thisVisible');
      }
    }
    else if(item.offsetTop > Math.round(window.scrollY + window.innerHeight)) {
        item.classList.remove('section--thisVisible');
    }
  });
};

window.addEventListener('scroll', checkVisibilities, {passive: true});

checkVisibilities();





window.addEventListener('load', createMews, {passive: true});


function createMews() {
  setTimeout(function() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "(function(m,e,w,s){c=m.createElement(e);c.onload=function(){\n" +
      "Mews.D.apply(null,s)};c.async=1;c.src=w;t=m.getElementsByTagName(e)[0];t.parentNode.insertBefore(c,t);})\n" +
      "(document,'script','https://app.mews.com/distributor/distributor.min.js',[['06e3adcb-e00e-4f12-a893-ae7c00818850']]);";

    document.head.appendChild(script);
  }, 1000);
}



