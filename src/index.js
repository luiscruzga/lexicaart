const axios = require('axios');
const ShortUniqueId = require('short-unique-id');
const { SEARCH_URL, CREATE_URL } = require('./config/constants');

class LexicaArt {
  constructor(opts) {
    if (opts) {
      this.mode = opts.sessionToken && opts.sessionToken !== '' ? 'token' : 'login';
      this.sessionToken = opts.sessionToken || '';
      this.csrfToken = opts.csrfToken || '';
      this.cookie = `__Secure-next-auth.callback-url=https%3A%2F%2Flexica.art%2Faperture;__Host-next-auth.csrf-token=${this.csrfToken};__Secure-next-auth.session-token=${this.sessionToken}`;
      this.username = this.mode === 'login' ? opts.username : '';
      this.password = this.mode === 'login' ? opts.password : '';
    } else {
      this.mode = 'token';
      this.sessionToken = '';
      this.csrfToken = '';
      this.cookie = '';
      this.username = '';
      this.password = '';
    }
  }

  async search(prompt) {
    try {
      if (!prompt || prompt === '') return Promise.reject('no prompt provided!');

      const res = await axios.post(SEARCH_URL, {
        cursor: 1,
        model: 'lexica-aperture-v2',
        searchMode: 'images',
        source: 'search',
        text: prompt
      });

      const data = res.data.prompts.map(el => {
        el.images = el.images.map(img => {
          img.url = `https://lexica-serve-encoded-images2.sharif.workers.dev/md2/${img.id}`;
          return img;
        });
        return el;
      });
      return data;
    } catch (e) {
      return {
        error: e.message
      }
    }
  }

  async create(opts) {
    try {
      if (typeof opts === 'string' && opts === '') return Promise.reject('no prompt provided!');
      if (this.mode === 'token' && (this.sessionToken === '' || this.csrfToken === '')) return Promise.reject('the token login information is invalid');
      if (this.mode === 'login' && (this.username === '' || this.password === '')) return Promise.reject('the login information is invalid');
      
      const headers = {
        Cookie: this.cookie,
      };
      const prompt = typeof opts === 'string' ? opts : opts.prompt;
      
      const uuid = new ShortUniqueId({ length: 20 });
      const id = uuid();
      const payload = {
        id,
        prompt,
        enableHiresFix: false,
        guidanceScale: opts.guidanceScale || 7,
        height: opts.height || 768,
        width: opts.width || 512,
        model: opts.model || 'lexica-aperture-v2',
        negativePrompt: '',
        numImagesGenerated: 0
      }
      const res = await axios.post(CREATE_URL, payload, { headers });
      if (res.data.bannedTerms && res.data.bannedTerms.length > 0) {
        throw new Error('This words is banned: ', res.data.bannedTerms.join(','));
      }
      res.data.prompt.images = res.data.images;
      return res.data.prompt;
    } catch (e) {
      return {
        error: e.message
      }
    }
  }
}

module.exports = LexicaArt;