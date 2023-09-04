const apiKey = 'AIzaSyCm0maPZlx25PRiuuEZkvzlarb61Hjyx-8';
class AnalysisPage {
  isLoadingDisplayed = false;
  mobileResult = null;
  desktopResult = null;
  mobileIncreasedScore = null;
  desktopIncreasedScore = null;
  facts = [
    'Zanimljiva činjenica: Da li ste znali da brža veb stranica može dovesti do većeg broja konverzija? Studije su pokazale da čak i poboljšanje vremena učitavanja stranice za samo jednu sekundu može povećati stopu konverzije za do 7%. Optimizacijom performansi vaše veb stranice, možete stvoriti besprekoran korisnički doživljaj koji podstiče posetioce da obave kupovinu.',
    'Evo zanimljive činjenice: Da li ste znali da dobro optimizovana veb stranica može smanjiti napuštanje korpe za kupovinu? Sporo učitavanje stranica često frustrira potencijalne kupce, što dovodi do napuštanja korpe pre završetka kupovine. Poboljšanjem brzine i performansi vaše veb stranice, možete smanjiti napuštanje korpe i povećati prihode od prodaje.',
    'Zanimljiva činjenica: Da li ste znali da brža veb stranica može poboljšati kredibilitet i poverenje u vašu online prodavnicu? Kada korisnici naiđu na veb stranicu koja se brzo i glatko učitava, veća je verovatnoća da će imati poverenja u brend i osećati se sigurno prilikom obavljanja kupovine. Unapređenje performansi vaše veb stranice može vam pomoći da izgradite poverenje i povećate prodaju.',
    'Da li ste znali da dobro optimizovana veb stranica može poboljšati ukupno korisničko iskustvo i povećati zadovoljstvo kupaca? Kada posetioci imaju pozitivno iskustvo na vašoj veb stranici, veća je verovatnoća da će se angažovati sa vašim proizvodima ili uslugama i postati stalni kupci. Optimizacijom brzine i performansi vaše veb stranice, možete stvoriti ugodno iskustvo kupovine koje će privući kupce da se vraćaju.',
    'Zanimljiva činjenica: Da li ste znali da brža veb stranica može poboljšati vidljivost vaših online oglašivačkih kampanja? Kada se vaša veb stranica brzo učitava, omogućava brže prikazivanje vaših oglasa, povećavajući šanse da privučete pažnju potencijalnih kupaca. Optimizacijom performansi vaše veb stranice, možete maksimizirati efikasnost vaših online oglašivačkih napora i povećati prodaju.',
    'Evo zanimljivog uvida: Da li ste znali da dobro optimizovana veb stranica može dovesti do većih prosečnih vrednosti porudžbina? Kada kupci imaju glatko i efikasno iskustvo kupovine, veća je verovatnoća da će istražiti dodatne proizvode ili usluge i obaviti veće kupovine. Unapređenjem brzine i performansi vaše veb stranice, možete podsticati dodatnu prodaju i povećati prihode.',
    'Zanimljiva činjenica: Da li ste znali da brža veb stranica može poboljšati stopu zadržavanja kupaca? Kada kupci imaju pozitivno iskustvo na vašoj veb stranici, veća je verovatnoća da će se vratiti za buduće kupovine i postati verni zagovornici vašeg brenda. Optimizacijom brzine i performansi vaše veb stranice, možete stvoriti lojalnu bazu kupaca koja generiše ponovljene prodaje i preporuke.',
  ];
  factIndex = 0;

  constructor(apiKey) {
    this.fields();
    this.events();
    this.apiKey = apiKey;
    this.currentWebsiteUrl = null;
    this.analysisState = {
      mobile: {},
      desktop: {},
    };
    this.savedData = {
      mobile: null,
      desktop: null,
    };
    this.displayFact();
    this.startFactRotation();
  }

  fields() {
    this.loadingBar = document.getElementById('loading');
    this.mobilePerformanceElement =
      document.getElementById('mobile-performance');
    this.desktopPerformanceElement = document.getElementById(
      'desktop-performance'
    );
    this.mobileIncreasedPerformanceElement = document.getElementById(
      'mobile-performance-increased'
    );
    this.desktopIncreasedPerformanceElement = document.getElementById(
      'desktop-performance-increased'
    );
    this.errorMessageElement = document.getElementById('error-message-exist');
    this.analysisState = {
      mobile: {
        isInProgress: false,
        result: null,
        increasedScore: null,
        screenshotData: null,
      },
      desktop: {
        isInProgress: false,
        result: null,
        increasedScore: null,
        screenshotData: null,
      },
    };
    this.urlParams = new URLSearchParams(window.location.search);
    this.url = this.urlParams.get('url');
    this.mobilePerformance = document.getElementById('mobile-performance');
    this.desktopPerformance = document.getElementById('desktop-performance');
    this.desktopIncreasedPerformance = document.getElementById(
      'desktop-performance-increased'
    );
    this.mobileIncreasedPerformance = document.getElementById(
      'mobile-performance-increased'
    );
    this.mobilePerformanceCircle = document.getElementById(
      'circle-progress-bar-mobile'
    );
    this.mobilePerformanceIncreasedCircle = document.getElementById(
      'circle-progress-bar-mobile-increased'
    );
    this.desktopPerformanceCircle = document.getElementById(
      'circle-progress-bar-desktop'
    );
    this.desktopPerformanceIncreasedCircle = document.getElementById(
      'circle-progress-bar-desktop-increased'
    );
    this.mobileIcon = document.getElementById('mobile-icon');
    this.desktopIcon = document.getElementById('desktop-icon');
    this.screenShotMobile = document.getElementById('mobile-logo-screen');
    this.screenShotDesktop = document.getElementById('desktop-logo-screen');
    this.popupOverlay = document.getElementById('popup-overlay');
    this.blurOverlay = document.getElementById('blur-overlay');
    this.contactForm = document.getElementById('contact-form');
    this.circleProgressBarContact = document.getElementById(
      'circle-progress-bar-contact'
    );
    this.circleProgressBarIncreased = document.getElementById(
      'circle-progress-bar-increased'
    );
    this.iconsMobileDesktop = document.getElementById('icons-mobile-desktop');
    this.factElement = document.getElementById('fact');
  }

  events() {
    const _this = this;
    document.getElementById('mobile-icon').addEventListener('click', () => {
      _this.displayMobilePerformance();
    });

    document.getElementById('desktop-icon').addEventListener('click', () => {
      _this.displayDesktopPerformance();
    });

    document
      .getElementById('mobile-icon')
      .addEventListener('click', async function () {
        console.log('Fetching data for mobile');
        await _this.fetchData('mobile', _this.url);
      });

    document
      .getElementById('desktop-icon')
      .addEventListener('click', async function () {
        console.log('Fetching data for desktop');
        await _this.fetchData('desktop', _this.url);
      });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        _this.closePopup();
        _this.closeContactForm();
      }
    });
    document
      .getElementById('button-like')
      .addEventListener('click', function () {
        _this.showPopup();
      });

    document
      .getElementById('button-not-like')
      .addEventListener('click', function () {
        _this.showContactForm();
        event.stopPropagation();
      });

    document
      .getElementById('button-yes')
      .addEventListener('click', function () {
        _this.visitSite();
      });

    document
      .getElementById('button-contact')
      .addEventListener('click', function () {
        _this.showContactForm();
      });

    document
      .getElementById('close-button')
      .addEventListener('click', function () {
        _this.closeContactForm();
      });

    document.addEventListener('click', function (event) {
      console.log('Global click event triggered');
      const isClickInsideContactForm = _this.contactForm.contains(event.target);
      const isClickInsidePopup = _this.popupOverlay.contains(event.target);
      const isClickOnOpenButton =
        event.target.id === 'button-contact' ||
        event.target.id === 'button-not-like' ||
        event.target.id === 'button-like';

      console.log('isClickInsideContactForm:', isClickInsideContactForm);
      console.log('isClickInsidePopup:', isClickInsidePopup);
      console.log('isClickOnOpenButton:', isClickOnOpenButton);

      if (
        !isClickInsideContactForm &&
        !isClickOnOpenButton &&
        !isClickInsidePopup
      ) {
        console.log('Zatvaranje na globalni klik');
        _this.closeContactForm();
        _this.closePopup();
      }
    });

    document
      .getElementById('close-button-popup')
      .addEventListener('click', function () {
        _this.closePopup();
      });

    document.addEventListener('click', function (event) {
      const isClickInsidePopup = _this.popupOverlay.contains(event.target);
      const isClickOnOpenButton = event.target.id === 'button-like';

      if (!isClickInsidePopup && !isClickOnOpenButton) {
        _this.closePopup();
      }
    });
  }

  displayLoading() {
    if (!this.isLoadingDisplayed) {
      this.loadingBar.style.display = 'block';
      this.isLoadingDisplayed = true;
    }
  }

  hideLoading() {
    this.loadingBar.style.display = 'none';
    this.isLoadingDisplayed = false;
  }

  drawProgressBar(
    progress,
    canvasId,
    iconColor,
    progressBarColor,
    fontColor,
    backgroundColor,
    lineColor
  ) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + progress * 2 * Math.PI;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.lineWidth = 7;
    context.strokeStyle = lineColor;
    context.fillStyle = backgroundColor;
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.lineWidth = 7;
    context.strokeStyle = progressBarColor;
    context.stroke();

    context.font = '35px Arial';
    context.fillStyle = fontColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const textX = centerX;
    const textY = centerY;

    context.fillText(`${Math.round(progress * 100)}%`, textX, textY);
  }

  displayResults(strategy, score, elementId) {
    console.log('Rezultat(score):', score);
    console.log('Strategija', strategy);
    console.log('ID elementa', elementId);

    const performanceElement = document.getElementById(elementId);
    performanceElement.textContent = `Trenutne performanse: ${(
      score * 100
    ).toFixed(1)}%`;
    performanceElement.style.marginTop = '10px';
    performanceElement.style.display = 'block';

    let progressBarCurrent = 0;

    if (strategy === 'mobile') {
      if (this.mobileResult && this.mobileResult.score) {
        progressBarCurrent = this.mobileResult.score;
      }
      console.log('Rezultat za mobilni', this.mobileResult.score);
    } else {
      if (this.desktopResult && this.desktopResult.score) {
        progressBarCurrent = this.desktopResult.score;
      }
      console.log('Rezultat za desktop', this.desktopResult.score);
    }

    console.log('Trenutni ucinak', progressBarCurrent);

    const progressBarId =
      strategy === 'mobile'
        ? 'circle-progress-bar-mobile'
        : 'circle-progress-bar-desktop';

    this.drawProgressBar(
      progressBarCurrent,
      progressBarId,
      '#ffffff',
      this.getProgressBarColor(score),
      '#ffffff',
      '#0e131e',
      this.getProgressBarColor(score)
    );

    const createProgressBar = (score, color) => {
      const progressBar = document.createElement('div');
      progressBar.classList.add('progress-bar');
      progressBar.style.setProperty('--progress-percent', `${score * 100}%`);
      progressBar.style.backgroundColor = color;
      return progressBar;
    };

    let circleProgressBar = document.getElementById(progressBarId);
    circleProgressBar.classList.remove('hidden');

    const progressBarContainer = this.createProgressBarContainer();
    const progressBar = createProgressBar(
      score,
      this.getProgressBarColor(score)
    );
    progressBarContainer.appendChild(progressBar);
    performanceElement.appendChild(progressBarContainer);

    let increasedScore = this.calculateIncreasedScore(score, strategy);
    const increasedProgressBarContainer = this.createProgressBarContainer();
    const increasedProgressBar = createProgressBar(increasedScore, '#34F072');
    const increasedProgressBarText = document.createElement('div');
    increasedProgressBarText.classList.add('progress-bar-text');

    const increasedElementId = elementId + '-increased';
    const increasedPerformanceElement =
      document.getElementById(increasedElementId);
    increasedPerformanceElement.textContent = `Mi garantujemo: ${(
      increasedScore * 100
    ).toFixed(1)}%`;
    increasedPerformanceElement.style.marginTop = '10px';

    const progressBarIncreasedId =
      strategy === 'mobile'
        ? 'circle-progress-bar-mobile-increased'
        : 'circle-progress-bar-desktop-increased';
    const progressBarGarant =
      strategy === 'mobile'
        ? this.mobileIncreasedScore
        : this.desktopIncreasedScore;
    console.log(progressBarGarant);
    if (strategy === 'mobile') {
      console.log('Garantovano za mobile', this.mobileIncreasedScore);
    } else {
      console.log('Garantovano za desktop', this.desktopIncreasedScore);
    }

    this.drawProgressBar(
      progressBarGarant,
      progressBarIncreasedId,
      '#ffffff',
      '#34F072',
      '#ffffff',
      '#0e131e',
      '#34F072'
    );
    let circleProgressBarIncreased = document.getElementById(
      progressBarIncreasedId
    );
    circleProgressBarIncreased.classList.remove('hidden');

    increasedProgressBarContainer.appendChild(increasedProgressBar);
    increasedProgressBarContainer.appendChild(increasedProgressBarText);
    increasedPerformanceElement.appendChild(increasedProgressBarContainer);
    increasedPerformanceElement.style.display = 'block';
  }

  createProgressBarContainer() {
    const progressBarContainer = document.createElement('div');
    progressBarContainer.classList.add('progress-bar-container');
    progressBarContainer.style.marginTop = '20px';
    return progressBarContainer;
  }

  getProgressBarColor(score) {
    if (score < 0.5) {
      return '#f24438';
    } else if (score < 0.9) {
      return '#FFC130';
    } else {
      return '#34F072';
    }
  }

  calculateIncreasedScore(score, strategy) {
    let increasedScore;

    if (strategy === 'mobile') {
      if (score >= 0 && score < 0.7) {
        increasedScore = 0.7;
      } else if (score >= 0.7 && score <= 1) {
        increasedScore = score;
      }
    } else if (strategy === 'desktop') {
      if (score >= 0 && score < 0.9) {
        increasedScore = 0.9;
      } else if (score >= 0.9 && score <= 1) {
        increasedScore = score;
      }
    }

    return increasedScore;
  }

  clearResults() {
    this.mobilePerformanceElement.textContent = '';
    this.desktopPerformanceElement.textContent = '';
    this.mobileIncreasedPerformanceElement.textContent = '';
    this.desktopIncreasedPerformanceElement.textContent = '';
  }

  displayScreenshot(strategy) {
    console.log(`Screenshot za ${strategy}`);
    const screenshotData = this.analysisState[strategy].screenshotData;
    if (!screenshotData) {
      return;
    }

    let img = new Image();
    img.src = screenshotData.data;

    let logoScreenDiv;
    if (strategy === 'mobile') {
      img.id = 'mobile-screenshot';
      logoScreenDiv = this.screenShotMobile;
      this.screenShotDesktop.classList.add('hidden');
    } else if (strategy === 'desktop') {
      img.id = 'desktop-screenshot';
      logoScreenDiv = this.screenShotDesktop;
      this.screenShotMobile.classList.add('hidden');
    }

    while (logoScreenDiv.firstChild) {
      logoScreenDiv.removeChild(logoScreenDiv.lastChild);
    }

    logoScreenDiv.appendChild(img);
    logoScreenDiv.classList.remove('hidden');
  }

  toggleElementDisplay(ids, displayStyle = 'none') {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = displayStyle;
      }
    });
  }

  toggleElementClass(ids, className, add = true) {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        add
          ? element.classList.add(className)
          : element.classList.remove(className);
      }
    });
  }

  async handleFetchError(response) {
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Status: ${response.status}, Message: ${message}`);
    }
    return await response.json();
  }

  async fetchAllData(url) {
    try {
      this.displayLoading();
      this.clearResults();
      this.currentWebsiteUrl = url;

      const mobileUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${apiKey}&strategy=mobile`;
      const desktopUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        url
      )}&key=${apiKey}&strategy=desktop`;

      this.savedData = {};

      const [mobileData, desktopData] = await Promise.all([
        fetch(mobileUrl).then(this.handleFetchError),
        fetch(desktopUrl).then(this.handleFetchError),
      ]);

      this.savedData.mobile = mobileData;
      this.savedData.desktop = desktopData;

      this.processFetchedData('mobile', mobileData, url);
      this.toggleElementDisplay(['mobile-icon', 'desktop-icon'], 'block');
    } catch (error) {
      console.error('Greška:', error);
      if (error.message.includes('Status: 400')) {
        this.errorMessageElement.innerText =
          'Neuspjeli zahtijev! Provjerite da li je URL ispravan i dostupan.';
      } else if (error.message.includes('Status: 404')) {
        this.errorMessageElement.innerText = 'Web sajt ne postoji online.';
      } else {
        this.errorMessageElement.innerText =
          'Došlo je do greške pri skeniranju web sajta.';
      }
      this.errorMessageElement.classList.remove('hidden');
    } finally {
      this.hideLoading();
    }
  }

  async processFetchedData(strategy, data, url) {
    let screenshotData = data.lighthouseResult.fullPageScreenshot.screenshot;
    this.analysisState[strategy].screenshotData = screenshotData;
    this.displayScreenshot(strategy, screenshotData);

    const category = data?.lighthouseResult?.categories?.performance?.title;
    const score = data?.lighthouseResult?.categories?.performance?.score;

    if (strategy === 'mobile') {
      this.mobileResult = {
        category: category || 'N/A',
        score: score || '-',
      };
      this.mobileIncreasedScore = this.calculateIncreasedScore(
        this.mobileResult.score,
        'mobile'
      );
      this.displayResults(strategy, score || '-', 'mobile-performance');
      this.displayMobilePerformance();
      this.toggleElementDisplay(['mobile-performance'], 'block');
    } else if (strategy === 'desktop') {
      this.desktopResult = {
        category: category || 'N/A',
        score: score || '-',
      };
      this.desktopIncreasedScore = this.calculateIncreasedScore(
        this.desktopResult.score,
        'desktop'
      );
      this.displayResults(strategy, score || '-', 'desktop-performance');
      this.displayDesktopPerformance();
      this.toggleElementDisplay(['desktop-performance'], 'block');
    }

    this.toggleElementClass(
      [
        'container-for-link',
        'results-info',
        'logo-results',
        'buttons-container',
        'back-home',
      ],
      'hidden',
      false
    );

    document.getElementById('entered-url').textContent = `${url}`;

    this.toggleElementDisplay(['mobile-icon', 'desktop-icon'], 'block');
  }

  async fetchData(strategy, url) {
    console.log('Strategy:', strategy);

    // Ako su podaci već sačuvani, samo ih prikažemo
    if (this.savedData[strategy]) {
      this.processFetchedData(
        strategy,
        this.savedData[strategy],
        this.currentWebsiteUrl
      );
      return;
    }

    if (this.analysisState[strategy].isInProgress) {
      return;
    }

    this.analysisState[strategy].isInProgress = true;
    this.currentWebsiteUrl = url;

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&key=${apiKey}&strategy=${strategy}`;

    this.clearResults();
    this.displayLoading();

    this.toggleElementDisplay([
      'mobile-icon',
      'desktop-icon',
      'mobile-performance',
      'desktop-performance',
    ]);

    this.toggleElementClass(['mobile-icon', 'desktop-icon'], 'selected', false);

    if (strategy === 'mobile') {
      this.toggleElementClass(['mobile-icon'], 'selected');
    } else {
      this.toggleElementClass(['desktop-icon'], 'selected');
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        this.handleFetchError(response, strategy);
        return;
      }

      const data = await response.json();

      // Sačuvamo podatke u slučaju da su potrebni kasnije
      this.savedData[strategy] = data;

      // Pozovemo processFetchedData za obradu i prikaz podataka
      this.processFetchedData(strategy, data, url);
    } catch (error) {
      console.error('Greška:', error);
      this.analysisState[strategy].isInProgress = false;
    } finally {
      this.hideLoading();
    }
  }

  displayMobilePerformance() {
    this.mobilePerformance.style.display = 'block';
    this.mobilePerformanceCircle.style.display = 'block';
    this.mobilePerformanceIncreasedCircle.style.display = 'block';
    this.iconsMobileDesktop.classList.remove('hidden');

    this.desktopPerformance.style.display = 'none';
    this.desktopPerformanceCircle.style.display = 'none';
    this.desktopPerformanceIncreasedCircle.style.display = 'none';

    this.mobileIcon.classList.add('selected');
    this.desktopIcon.classList.remove('selected');

    this.desktopIncreasedPerformance.style.display = 'none';
  }

  displayDesktopPerformance() {
    this.desktopPerformance.style.display = 'block';
    this.desktopPerformanceCircle.style.display = 'block';
    this.desktopPerformanceIncreasedCircle.style.display = 'block';
    this.iconsMobileDesktop.classList.remove('hidden');

    this.mobilePerformance.style.display = 'none';
    this.mobilePerformanceCircle.style.display = 'none';
    this.mobilePerformanceIncreasedCircle.style.display = 'none';

    this.desktopIcon.classList.add('selected');
    this.mobileIcon.classList.remove('selected');

    this.mobileIncreasedPerformance.style.display = 'none';
  }

  showPopup() {
    console.log('Funkcija showPopup je pozvana.');
    this.popupOverlay.classList.remove('hidden');
    this.blurOverlay.classList.remove('hidden');
    console.log('Palim blur');
  }

  closePopup() {
    this.popupOverlay.classList.add('hidden');
    this.blurOverlay.classList.add('hidden');
    console.log('Gasim blur');
  }

  showContactForm() {
    console.log('Dugme je kliknuto');
    this.popupOverlay.classList.add('hidden');
    this.contactForm.classList.remove('hidden');
    this.blurOverlay.classList.remove('hidden');
    console.log('Palim blur');

    let progressBar =
      this.mobileResult && this.mobileResult.score
        ? this.mobileResult.score
        : 0;
    console.log(this.mobileResult);

    this.drawProgressBar(
      progressBar,
      'circle-progress-bar-contact',
      '#ffffff',
      '#FFC130',
      '#ffffff',
      '#0e131e',
      '#FFC130'
    );

    this.circleProgressBarContact.classList.remove('hidden');

    let progressBarIncreased = this.mobileIncreasedScore || 0;
    console.log(this.mobileIncreasedScore);

    this.drawProgressBar(
      progressBarIncreased,
      'circle-progress-bar-increased',
      '#ffffff',
      '#34F072',
      '#ffffff',
      '#0e131e',
      '#34F072'
    );

    this.circleProgressBarIncreased.classList.remove('hidden');
  }

  closeContactForm() {
    this.contactForm.classList.add('hidden');
    console.log('Gasim blur');
    this.blurOverlay.classList.add('hidden');
  }

  visitSite() {
    window.open('https://robotcode.me/', '_blank');
  }

  displayFact() {
    this.factElement.innerText = this.facts[this.factIndex];
  }

  nextFact() {
    this.factIndex = (this.factIndex + 1) % this.facts.length;
    this.displayFact();
  }

  startFactRotation() {
    setInterval(() => this.nextFact(), 3000);
  }
}

window.addEventListener('DOMContentLoaded', function () {
  console.log('DOM je učitan');
  const analysisPage = new AnalysisPage(apiKey);

  if (analysisPage.url) {
    analysisPage.fetchAllData(analysisPage.url);
    console.log(analysisPage.url);
  } else {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'URL nije dostupan.';
    errorMessage.style.display = 'block';
  }
});
