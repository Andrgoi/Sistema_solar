const planetsData = {
    sun: {
        name: "Sol",
        description: "O Sol é a estrela no centro do Sistema Solar. É uma esfera quase perfeita de plasma quente, aquecida até a incandescência por reações de fusão nuclear em seu núcleo. O Sol irradia essa energia principalmente como luz, radiação ultravioleta e radiação infravermelha, e é a fonte mais importante de energia para a vida na Terra.",
        diameter: "1.392.700 km",
        temp: "5.500°C (superfície)",
        orbit: "Principal",
        distance: "0",
        bg: "var(--sun-bg)"
    },
    mercury: {
        name: "Mercúrio",
        description: "Mercúrio é o menor e mais interno planeta do Sistema Solar. Possui uma superfície rochosa coberta de crateras, parecida com a da Lua, e não tem atmosfera significativa para reter calor, causando variações extremas de temperatura.",
        diameter: "4.879 km",
        temp: "-173 a 427°C",
        orbit: "88 dias",
        distance: "57.9",
        bg: "var(--mercury-bg)"
    },
    venus: {
        name: "Vênus",
        description: "Vênus é o segundo planeta do sistema solar e é nomeado em homenagem à deusa romana do amor e da beleza. É o planeta mais quente do sistema solar devido a um efeito estufa descontrolado causado por sua densa atmosfera.",
        diameter: "12.104 km",
        temp: "462°C",
        orbit: "225 dias",
        distance: "108.2",
        bg: "var(--venus-bg)"
    },
    earth: {
        name: "Terra",
        description: "A Terra é o terceiro planeta a partir do sistema Solar e o único objeto astronômico conhecido por abrigar vida. Cerca de 71% da superfície da Terra é coberta por água.",
        diameter: "12.742 km",
        temp: "-88 a 58°C",
        orbit: "365.25 dias",
        distance: "149.6",
        bg: "var(--earth-bg)"
    },
    mars: {
        name: "Marte",
        description: "Marte é o quarto planeta a partir do sistema Solar e o segundo menor do Sistema Solar. Muitas vezes é chamado de 'Planeta Vermelho' devido ao óxido de ferro predominante em sua superfície.",
        diameter: "6.779 km",
        temp: "-65°C",
        orbit: "687 dias",
        distance: "227.9",
        bg: "var(--mars-bg)"
    },
    jupiter: {
        name: "Júpiter",
        description: "Júpiter é o maior planeta do sistema solar. É um gigante gasoso com massa um milésimo da do Sol, mas duas vezes e meia a de todos os outros planetas do Sistema Solar juntos. Famoso pela Grande Mancha Vermelha.",
        diameter: "139.820 km",
        temp: "-110°C",
        orbit: "11.86 anos",
        distance: "778.5",
        bg: "var(--jupiter-bg)"
    },
    saturn: {
        name: "Saturno",
        description: "Saturno é famoso por seu sistema de anéis proeminente. É um gigante gasoso composto principalmente de hidrogênio e hélio. É o único planeta do sistema solar que é menos denso que a água.",
        diameter: "116.460 km",
        temp: "-140°C",
        orbit: "29.45 anos",
        distance: "1.4 bi",
        bg: "var(--saturn-bg)"
    },
    uranus: {
        name: "Urano",
        description: "Urano é o sétimo planeta a partir do Sol. Tem a terceira maior raio planetário e a quarta maior massa planetária no Sistema Solar. Urano é semelhante em composição a Netuno, e ambos são chamados de 'gigantes de gelo'.",
        diameter: "50.724 km",
        temp: "-195°C",
        orbit: "84 anos",
        distance: "2.9 bi",
        bg: "var(--uranus-bg)"
    },
    neptune: {
        name: "Netuno",
        description: "Netuno é o oitavo e mais distante planeta solar conhecido a partir do Sol. É o quarto maior planeta por diâmetro, o terceiro mais massivo, e o gigante gasoso mais denso.",
        diameter: "49.244 km",
        temp: "-200°C",
        orbit: "164.8 anos",
        distance: "4.5 bi",
        bg: "var(--neptune-bg)"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Stop animations on hover logic (optional, users might prefer it)
    const orbits = document.querySelectorAll('.orbit');

    // Modal Logic
    const modal = document.getElementById('planet-modal');
    const closeBtn = document.querySelector('.close-modal');
    const planets = document.querySelectorAll('.planet-visual');
    const sun = document.querySelector('.sun');

    if (sun) {
        sun.addEventListener('click', () => {
            openModal('sun');
        });
    }

    planets.forEach(visual => {
        visual.addEventListener('click', (e) => {
            // Stop propagation so orbit doesn't capture click weirdly if we had logic there
            e.stopPropagation();

            // Get planet key from parent's data-attribute
            const planetKey = visual.parentElement.getAttribute('data-planet');
            openModal(planetKey);
        });
    });

    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function openModal(planetKey) {
        const data = planetsData[planetKey];
        if (!data) return;

        // Update Content
        document.getElementById('modal-title').textContent = data.name;
        document.getElementById('modal-description').textContent = data.description;
        document.getElementById('modal-diameter').textContent = data.diameter;
        document.getElementById('modal-temp').textContent = data.temp;
        document.getElementById('modal-orbit').textContent = data.orbit;
        document.getElementById('modal-distance').textContent = data.distance + " km";

        // Update Visual Background
        const visual = document.getElementById('modal-planet-icon');
        visual.style.backgroundImage = data.bg;
        visual.classList.remove('has-clouds', 'sun-internal');

        if (planetKey === 'earth') {
            visual.classList.add('has-clouds');
        }

        if (planetKey === 'sun') {
            visual.classList.add('sun-internal');
        }
        // Match rotation speed from main view if possible
        const mainPlanet = document.querySelector(`.planet.${planetKey} .planet-visual`);
        if (mainPlanet) {
            visual.style.animationDuration = `6s, ${getComputedStyle(mainPlanet).animationDuration}`;
        } else if (planetKey === 'sun') {
            visual.style.animationDuration = `6s, 20s`;
        }

        if (planetKey === 'earth') {
            visual.classList.add('has-clouds');
        }

        if (planetKey === 'sun') {
            visual.style.boxShadow = `0 0 50px #f1c40f, inset 0 0 30px rgba(255,255,255,0.5)`;
            visual.innerHTML = `
                <div class="corona" style="width: 150%; height: 150%;"></div>
                <div class="rays" style="width: 300%; height: 300%;"></div>
                <div class="flares">
                    <div class="flare"></div>
                    <div class="flare"></div>
                    <div class="flare"></div>
                    <div class="flare"></div>
                    <div class="flare"></div>
                </div>
            `;
        } else {
            visual.style.boxShadow = `inset -20px -20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.2)`;
            visual.innerHTML = '';
        }

        // Show
        modal.style.display = 'flex';

        // Pause orbits for better reading experience? 
        // orbits.forEach(o => o.style.animationPlayState = 'paused');
    }

    function closeModal() {
        modal.style.display = 'none';
        // orbits.forEach(o => o.style.animationPlayState = 'running');
    }
});

