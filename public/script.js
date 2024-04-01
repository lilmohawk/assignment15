const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const addItem = document.getElementById('addItem');
const addSupply = document.getElementById('addSupply');
const supplies = document.getElementById('supplies');
const itemImage = document.getElementById('image');

let popup = document.getElementById("popup");
let container = document.getElementById("container");
let modalTitle = document.getElementById("modalTitle");
let modalImg = document.getElementById("modalImg");
let modalDesc = document.getElementById("modalDesc");
let modalSupplies = document.getElementById("modalSupplies");
let craftArray = [];

//Form Information
addItem.onclick = () => {
  let id02 = document.getElementById("id02");
  id02.style.display = "block";
}

addSupply.onclick = ( e ) => {
  e.preventDefault();
  let supply = document.createElement("input");
  supply.type = "text";
  supply.style.display = "block";

  supplies.append(supply);
}

const addEditCraft = async (e) => {
  e.preventDefault();

  const form = document.getElementById("addForm");
  const formData = new FormData(form);
  formData.append("supplies", getSupplies());

  let response;

  response = await fetch("/api/crafts", {
    method: "POST",
    body: formData,
  });


  if(response.status != 200) {
    console.log("Error contacting server");
    return;
  }

  console.log(...formData);
  ShowUpdateCraft();
};

const getSupplies = () => {
  const inputs = document.querySelectorAll("#supplies input");
  const supplies = [];

  inputs.forEach((input)=> {
    supplies.push(input.value);
  });

  return supplies;
}


let i = 0;

const getJson = async() => {
  const url = "https://assignment15-ils3.onrender.com/api/crafts";
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
} 

const showCraft = async() => {
  let craft = await getJson();

  craft.forEach((item) => {
  
    let craftItem = new Craft(item.name, item.image, item.description, item.supplies);
    craftItem.craftImg;
    craftArray.push(craftItem);
  });
}

const ShowUpdateCraft = async() => {
  let craft = await getJson();

  for(let i = 0; i < craftArray.length; i++) {
    if(craftArray[i].title != craft[i].name) {
      let craftItem = new Craft(craft[i].name, craft[i].image, craft[i].description, craft[i].supplies);
      craftItem.craftImg;
      craftArray.push(craftItem);
    }
  }
}



class Craft {
  constructor(title, image, desc, supplies) {
    this.title = title;
    this.image = image;
    this.desc = desc;
    this.supplies = supplies
  }

  //Show the image
  get craftImg () {
    const image = document.createElement("img");
    image.src = 'crafts/' + this.image;
    image.style.width = '100%';

    image.onclick = () => {
      let id01 = document.getElementById('id01');
      id01.style.display = "block";

      model(this);
    }

    if(i < 7) {
      section1.append(image);
      i++
      return;
    }

    if(i >= 7 && i < 13) {
      section2.append(image);
      i++
      return;
    }

    if(i >= 13 && i < 20) {
      section3.append(image);
      i++
      return;
    }

    if(i >= 20) {
      section4.append(image);
      i++
      return;
    }
  }
}

let model = (craft) => {
  modalTitle.innerText = craft.title;
  modalImg.src = "crafts/" + craft.image;
  modalDesc.innerText = craft.desc;

  craft.supplies.forEach((item) => {
    let element = document.createElement("li");
    element.innerHTML = item;
    modalSupplies.append(element);
  })
}

window.onload = () => {
  showCraft();
  document.getElementById("addForm").onsubmit = addEditCraft;
}