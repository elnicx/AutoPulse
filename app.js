/* app.js — Paste entire file (overwrite existing) */
document.addEventListener("DOMContentLoaded", () => {
  console.log("AutoPulse app.js loaded");

  // ===================== CATEGORIES DATA =====================
  const categories = {
    asia: [
      { id: 'fl5r', name: 'Civic Type R FL5', img: 'img/fl5r.jpg', gallery: ['img/fl5r.jpg', 'img/flint.jpg'], specs: { 'Price': 'RM 400,000', 'Top Speed': '275 km/h', 'Horsepower': '315 hp', 'Torque': '420 Nm', 'Production Year': '2023' }, history: "The FL5 is the sixth-generation Civic Type R, known for reclaiming the Nürburgring front-wheel-drive lap record in 2023." },
      { id: 'grcorolla', name: 'GR Yaris', img: 'img/gryaris.jpg', gallery: ['img/gryaris.jpg', 'img/yes.jpg'], specs: { 'Price':'RM 325,600', 'Top Speed': '230 km/h', 'Horsepower': '257 hp', 'Torque': '370 Nm', 'Production Year': '2023' }, history: "The GR Yaris was developed with Toyota’s rally team, featuring a bespoke 3-cylinder turbo engine and all-wheel drive." },
      { id: 'i30n', name: 'Hyundai i30N', img: 'img/i30n.jpg', gallery: ['img/i30n.jpg', 'img/n.jpg'], specs: { 'Price':'RM 293,798', 'Top Speed': '210 km/h', 'Horsepower': '140 hp', 'Torque': '230 Nm', 'Production Year': '2022' }, history: "Hyundai’s i30N marked the brand’s entry into performance hatchbacks, tuned at the Nürburgring for handling precision." }
    ],
    europe: [
      { id: 'golf8r', name: 'Golf 8 R', img: 'img/golf8r.jpg', gallery: ['img/golf8r.jpg', 'img/r.png'], specs: { 'Price' :'RM 332,990', 'Top Speed': '250 km/h', 'Horsepower': '315 hp', 'Torque': '420 Nm', 'Production Year': '2022' }, history: "The Golf R is VW’s flagship hot hatch, offering everyday usability with all-wheel drive and refined performance." },
      { id: 'm135i', name: 'BMW M135i', img: 'img/135i.jpg', gallery: ['img/135i.jpg', 'img/a.webp'], specs: { 'Price':'RM 210,000', 'Top Speed': '250 km/h', 'Horsepower': '302 hp', 'Torque': '450 Nm', 'Production Year': '2022' }, history: "The BMW M135i switched from rear-wheel drive to all-wheel drive in its latest generation, focusing on traction and daily usability." },
      { id: 'megane', name: 'Renault Megane RS', img: 'img/mrs.jpg', gallery: ['img/mrs.jpg', 'img/rs.jpg'], specs: { 'Price':'RM 368,888', 'Top Speed': '255 km/h', 'Horsepower': '300 hp', 'Torque': '400 Nm', 'Production Year': '2021' }, history: "The Megane RS is a legendary hot hatch, often praised for its sharp handling and Nürburgring records in the past." }
    ],
    america: [
      { id: 'focusrs', name: 'Ford Focus RS', img: 'img/fordrs.jpg', gallery: ['img/fordrs.jpg', 'img/v.jpg'], specs: { 'Price':'RM 280,000', 'Top Speed': '266 km/h', 'Horsepower': '350 hp', 'Torque': '440 Nm', 'Production Year': '2018' }, history: "The Focus RS was Ford’s rally-inspired AWD hatch, famous for its Drift Mode and raw power delivery." },
      { id: 'camaro', name: 'Chevrolet Camaro LT1', img: 'img/camaro.jpg', gallery: ['img/camaro.jpg', 'img/g.webp'], specs: { 'Price':'RM 148,800', 'Top Speed': '250 km/h', 'Horsepower': '455 hp', 'Torque': '617 Nm', 'Production Year': '2023' }, history: "The Camaro LT1 combines classic American muscle V8 power with modern styling and track-ready performance." },
      { id: 'charger', name: 'Dodge Charger', img: 'img/charger.jpg', gallery: ['img/charger.jpg', 'img/m.jpg'], specs: { 'Price' : 'RM 428,000', 'Top Speed': '240 km/h', 'Horsepower': '303 hp', 'Torque': '363 Nm', 'Production Year': '2022' }, history: "The Dodge Charger remains an icon of American muscle, offering retro styling with huge V8 options." }
    ]
  };

  // ===================== ELEMENTS =====================
  const navEl = document.querySelector("nav");
  const carList = document.getElementById("car-list");
  const carImage = document.getElementById("car-image");
  const carName = document.getElementById("car-name");
  const carSpecs = document.getElementById("car-specs");
  const carGallery = document.getElementById("car-gallery");

  // ===================== SOUNDS =====================
  const clickSound = new Audio("mp3/click.wav");
  const cardClickSound = new Audio("mp3/click2.wav");
  const bgMusic = new Audio("mp3/bgm.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.4;

  function safePlay(a){ try{ a.currentTime=0; a.play(); }catch(e){} }

  // Start background music after first interaction
  function initBgMusic() {
    safePlay(bgMusic);
    document.removeEventListener("click", initBgMusic);
  }
  document.addEventListener("click", initBgMusic);

  // ===================== SHOW CARS =====================
  function showCars(region) {
    if(!categories[region]) return;
    const cars = categories[region];
    carList.innerHTML = "";
    cars.forEach(car => {
      const card = document.createElement("div");
      card.className = "car-card";
      card.innerHTML = `<img src="${car.img}" alt="${car.name}" style="width:100%;border-radius:6px"><strong>${car.name}</strong>`;
      card.addEventListener("click", () => {
        showCarDetails(car);
        safePlay(cardClickSound);
      });
      carList.appendChild(card);
    });
  }

  function showCarDetails(car) {
    carImage.src = car.img;
    carName.textContent = car.name;
    carSpecs.innerHTML = "";
    for(const k in car.specs){
      const li=document.createElement("li");
      li.textContent=`${k}: ${car.specs[k]}`;
      carSpecs.appendChild(li);
    }
    carGallery.innerHTML = "";
    car.gallery.forEach(src=>{
      const img=document.createElement("img");
      img.src=src;
      img.addEventListener("click", ()=> carImage.src=src);
      carGallery.appendChild(img);
    });
  }

  if(navEl){
    navEl.addEventListener("click", e=>{
      const a = e.target.closest("a[data-region]");
      if(!a) return;
      e.preventDefault();
      safePlay(clickSound);
      showCars(a.dataset.region);
    });
  }

  showCars("asia");
 
  // ===================== UNIVERSAL VOTING =====================
  const voteArea = document.getElementById("vote-area");
  const leaderboardList = document.getElementById("leaderboard-list");

  if(voteArea && leaderboardList){
    const allCars = Object.values(categories).flat();
    let votes = JSON.parse(localStorage.getItem("carVotes")||"{}");
    allCars.forEach(c=>{ if(!(c.id in votes)) votes[c.id]=0; });
    localStorage.setItem("carVotes", JSON.stringify(votes));

    function renderVoteButtons(){
      voteArea.innerHTML="";
      allCars.forEach(car=>{
        const btn=document.createElement("button");
        btn.className="vote-btn";
        btn.textContent=`Vote ${car.name} (${votes[car.id]})`;
        btn.addEventListener("click", ()=>{
          votes[car.id]++; 
          localStorage.setItem("carVotes", JSON.stringify(votes));
          renderVoteButtons();
          renderLeaderboard();
        });
        voteArea.appendChild(btn);
      });

      // Reset button
      const resetBtn = document.createElement("button");
      resetBtn.className="vote-btn";
      resetBtn.style.background = "#ff4444";
      resetBtn.style.borderColor = "#ff4444";
      resetBtn.textContent = "🔄 Reset Voting";
      resetBtn.addEventListener("click", ()=>{
        if(confirm("⚠️ Reset all votes? This cannot be undone.")){
          allCars.forEach(car=> votes[car.id]=0 );
          localStorage.setItem("carVotes", JSON.stringify(votes));
          renderVoteButtons();
          renderLeaderboard();
        }
      });
      voteArea.appendChild(resetBtn);
    }

    function renderLeaderboard(){
      leaderboardList.innerHTML="";
      const sorted = allCars.slice().sort((a,b)=> (votes[b.id]||0)-(votes[a.id]||0));
      sorted.forEach((car,i)=>{
        const li=document.createElement("li");
        li.textContent=`${i+1}. ${car.name} — ${votes[car.id]} votes`;
        leaderboardList.appendChild(li);
      });
    }

    renderVoteButtons();
    renderLeaderboard();
  }

});
