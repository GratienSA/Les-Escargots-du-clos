let checkout = document.getElementById("checkout");
  let checdiv = document.getElementById("chec-div");
  let flag3 = false;
  const checkoutHandler = () => {
    if (!flag3) {
      checkout.classList.add("translate-x-full");
      checkout.classList.remove("translate-x-0");
      setTimeout(function () {
        checdiv.classList.add("hidden");
      }, 300);
      flag3 = true;
    } else {
      setTimeout(function () {
        checkout.classList.remove("translate-x-full");
        checkout.classList.add("translate-x-0");
      }, 300);
      checdiv.classList.remove("hidden");
      flag3 = false;
    }
  };

  const backToproduct = () => {
    window.location.href = 'produits.html';
  };


  
 