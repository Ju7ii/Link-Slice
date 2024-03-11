class UrlShortener {
    constructor() {
      this.chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }
  
    generateShortUrl() {
      let shortUrl = "/";
      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * this.chars.length);
        shortUrl += this.chars[randomIndex];
      }
      return shortUrl;
    }
  }
  
  module.exports = UrlShortener;
  