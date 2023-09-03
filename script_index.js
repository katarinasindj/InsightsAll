class IndexPage {
  urlInput = null;
  autoPaste = null;
  errorMessage = null;
  pasteButtonPage = null;
  analyzePerformancePage = null;

  constructor() {
    this.fields();
    this.events();
  }

  fields() {
    this.urlInput = document.getElementById('url-input');
    this.autoPaste = document.getElementById('autopaste-toggle');
    this.errorMessage = document.getElementById('error-message');
    this.pasteButtonPage = document.getElementById('pasteButtonPage');
    this.analyzePerformancePage = document.getElementById(
      'analyzePerformancePage'
    );

    // this.autoPaste.checked =
    //   localStorage.getItem('autopasteEnabled') === 'true';
  }

  events() {
    const _this = this;
    this.urlInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        _this.analyzePerformance();
      }
    });

    // this.autoPaste.addEventListener('change', function () {
    //   localStorage.setItem('autopasteEnabled', this.checked);
    // });

    this.analyzePerformancePage.addEventListener('click', function () {
      console.log('test');
      _this.analyzePerformance();
    });

    this.pasteButtonPage.addEventListener('click', async function () {
      console.log('test');
      await _this.autoPasteFromClipboard();
    });
  }

  async autoPasteFromClipboard() {
    // if (localStorage.getItem('autopasteEnabled') !== 'true') return;
    if (navigator.clipboard) {
      try {
        this.urlInput.value = await navigator.clipboard.readText();
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    }
  }

  isValidURL(url) {
    return /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/.test(url);
  }

  resetResults() {
    this.errorMessage.style.display = 'none';
  }

  analyzePerformance() {
    this.resetResults();
    let url = this.urlInput.value.trim();

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
      this.urlInput.value = url;
    }

    if (!this.isValidURL(url)) {
      this.errorMessage.textContent = 'URL nije validan. Unesite validan URL!';
      this.errorMessage.style.display = 'block';
      return;
    }
    window.open(`results.html?url=${encodeURIComponent(url)}`, '_blank');
  }
}

window.addEventListener('DOMContentLoaded', function () {
  new IndexPage();
});
