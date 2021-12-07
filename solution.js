let buttons_add = document.getElementsByClassName("menu");
let a = document.getElementsByClassName("item")[0];
let items = document.getElementsByClassName("items")[0];
let subtotal = document.getElementsByClassName("values")[0];
let taxes = document.getElementsByClassName("values")[1];
let total = document.getElementsByClassName("values")[2];
buttons_add = Array.from(buttons_add);
items.removeChild(a);
let images = [],
  titles = [],
  prices = [],
  buttons = [];
buttons_add.forEach((item) => {
  images.push(item.childNodes[1]);
  titles.push(item.childNodes[3]);
  prices.push(item.childNodes[5]);
  buttons.push(item.childNodes[7]);
});

let update = (sum) => {
  subtotal.innerHTML = sum.toFixed(2) + "$";
  taxes.innerHTML = (sum * 0.0975).toFixed(2) + "$";
  total.innerHTML = (sum + sum * 0.0975).toFixed(2) + "$";
};

let sum = 0;
let cart = [];
buttons.forEach((item) => {
  let totalPerItem = Number(
    prices[buttons.indexOf(item)].innerHTML.replace("$", "")
  );
  //   console.log(totalPerItem);
  let quantity = 1;

  let c = {};

  item.addEventListener("click", () => {
    totalPerItem = Number(
      prices[buttons.indexOf(item)].innerHTML.replace("$", "")
    );
    sum += Number(prices[buttons.indexOf(item)].innerHTML.replace("$", ""));
    console.log(sum);
    item.disabled = "true";
    item.innerHTML = "In Cart";
    let purchase = a.cloneNode(true);
    items.append(purchase);
    update(sum);
    let price = prices[buttons.indexOf(item)].innerHTML;
    purchase.children[0].src = images[buttons.indexOf(item)].src; //image
    purchase.children[1].innerHTML = titles[buttons.indexOf(item)].innerHTML; //title
    purchase.children[2].innerHTML = prices[buttons.indexOf(item)].innerHTML; //unity price
    purchase.children[3].children[0].children[1].innerHTML = 1; //quantity
    purchase.children[3].children[1].innerHTML = totalPerItem.toFixed(2) + "$"; //total per item

    c.name = purchase.children[1].innerHTML;
    c.total = purchase.children[3].children[1].innerHTML;
    console.log(c);

    //less
    purchase.children[3].children[0].children[0].addEventListener(
      "click",
      () => {
        quantity--;
        if (quantity > 0) {
          totalPerItem -= Number(price.replace("$", ""));
          purchase.children[3].children[0].children[1].innerHTML = quantity;
          if (totalPerItem <= 0) totalPerItem = 0;
          purchase.children[3].children[1].innerHTML =
            totalPerItem.toFixed(2) + "$";
        } else {
          items.removeChild(purchase);
          item.disabled = false;
          item.innerHTML = "Add to Cart";
          quantity = 1;
          purchase.children[3].children[0].children[1].innerHTML = 1;
          totalPerItem = Number(price.replace("$", ""));
          purchase.children[3].children[1].innerHTML =
            totalPerItem.toFixed(2) + "$";
          //   sum -= Number(price.replace("$", ""));
          //   console.log("sum: " + sum);
          //   update(sum);
        }
        sum -= Number(price.replace("$", ""));
        if (sum <= 0) sum = 0;
        console.log("sum: " + sum);
        update(sum);
      }
    );

    //more
    purchase.children[3].children[0].children[2].addEventListener(
      "click",
      () => {
        if (quantity > 0) {
          quantity++;
          totalPerItem += Number(price.replace("$", ""));
          purchase.children[3].children[0].children[1].innerHTML = quantity;
          purchase.children[3].children[1].innerHTML =
            totalPerItem.toFixed(2) + "$";
          sum += Number(price.replace("$", ""));
          console.log("sum: " + sum);
          update(sum);
          console.log(price);
        }
      }
    );

    console.log("khrat");
  });
});
