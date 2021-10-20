let mealList = [];
mealCards = document.getElementById('mealCards');

const addMealCard = () => {
  const mealDetails = {
    id: `${Date.now()}`,
    dish: document.getElementById('nameOfDish').value,
    desc: document.getElementById('descOfDish').value,
  };
  mealCards.insertAdjacentHTML('beforeend', generateMeal(mealDetails));

  mealList.push(mealDetails);
  saveToLocalStorage();
};

const generateMeal = ({ id, dish, desc }) => {
  return `<div class="col-md-6 col-lg-4 my-3" id=${id} key=${id}>
  <div class="card">
    <img src="https://source.unsplash.com/random/1600x900?food" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">${dish}</h5>
      <p class="card-text">${desc}</p>
      <a href="#" class="btn btn-primary mb-3" name=${id} onclick="editMealCard(this)">Edit Meal</a>
      <a href="#" class="btn btn-success mb-3 d-none" name=${id} onclick="saveMealCard(this)">Save Meal</a>
      <a href="#" class="btn btn-danger mb-3" name=${id} onclick="deleteMealCard(this)">Delete Meal</a>
    </div>
  </div>
</div>`;
};

const saveToLocalStorage = () => {
  localStorage.setItem('mealList', JSON.stringify({ meals: mealList }));
};

const readFromLocalStorage = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem('mealList'));

  if (localStorageCopy) {
    mealList = localStorageCopy.meals;
  }

  mealList.map((mealDetails) => {
    mealCards.insertAdjacentHTML('beforeend', generateMeal(mealDetails));
  });
};

const deleteMealCard = (e) => {
  const targetID = e.getAttribute('name');
  mealList = mealList.filter((meal) => meal.id !== targetID);
  saveToLocalStorage();
  window.location.reload();
};

const editMealCard = (e) => {
  e.parentNode.childNodes[1].setAttribute('contenteditable', 'true');
  e.parentNode.childNodes[3].setAttribute('contenteditable', 'true');
  e.parentNode.childNodes[7].classList.remove('d-none');
  // console.log(e.parentNode.childNodes[7].classList);
};

const saveMealCard = (e) => {
  const targetID = e.name;

  mealList.filter((meal) => {
    if (meal.id === targetID) {
      meal.dish = e.parentNode.childNodes[1].innerText;
      meal.desc = e.parentNode.childNodes[3].innerText;
    }
  });

  e.parentNode.childNodes[1].setAttribute('contenteditable', 'false');
  e.parentNode.childNodes[1].setAttribute('contenteditable', 'false');
  e.parentNode.childNodes[7].classList.add('d-none');
  saveToLocalStorage();
};
