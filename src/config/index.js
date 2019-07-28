import axios from 'axios';

export default class endPointHandler {
	
	constructor(entity){
    // console.log(entity)
    this.entity = entity;
    this.apiAddress = 'https://unikrew-dominos.azurewebsites.net/';
    this.token = localStorage.getItem("access_token");
    this.instance = axios.create({
      baseURL: this.apiAddress,
      headers: {
        Authorization: 'bearer ' + this.token
      }
    });
    this.clientCredentials = {
      id: 'cjGhup1fkP1JPvQUaPddR8vqPGcfJQCP',
      secret: 'dKtkAV6nZZmLhFkdYXBRrBxqpI8lOX0O'
    }
  }
  
  // Access token management
  checkInstance = () => {
    this.token = localStorage.getItem("access_token");
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      Authorization: 'bearer ' + localStorage.getItem("access_token"),
      common: {
        ...this.instance.defaults.headers.common,
        Authorization: 'bearer ' + localStorage.getItem("access_token"),
      }
    }
  }
	
  // Dynamic entity handler
  urlFilteration = (url) => {
		switch(this.entity){
			case 'IDENTITY': return 'identity/api/v1.0/' + url;
      case 'JARVIS': return 'jarvis/api/v1.0/' + url;
			case 'MASTERDATA': return 'masterdata/api/v1.0/' + url;
      case 'SCRUTINIZER': return 'scrutinizer/api/v1.0/' + url;
      case 'DOMINOS': return 'api/v1.0/' + url;
			default: return url;
		}
  }

  // Token Generation Call handler
  async generateToken(url, params = null) {
    return await this.instance.post(this.urlFilteration(url), {
      ...params,
      clientId: this.clientCredentials.id,
      clientSecret: this.clientCredentials.secret,
    }).then(response => response).catch(error => error);
  }

  // GET Call handler
  async getHandler(url, params = null) {
    this.checkInstance();
    return await this.instance.get(this.urlFilteration(url), { params }).then(response => response).catch(error => error);
  }

  // POST Call handler
  async postHandler(url, params = null) {
    this.checkInstance();
    return await this.instance.post(this.urlFilteration(url), params).then(response => response).catch(error => error);
  }

  // PUT Call handler
  async putHandler(url, params = null) {
    this.checkInstance();
    return await this.instance.put(this.urlFilteration(url), params).then(response => response).catch(error => error);
  }

  // DELETE Call handler
  async deleteHandler(url, params = null) {
    this.checkInstance();
    return await this.instance.delete(this.urlFilteration(url), { params }).then(response => response).catch(error => error);
	}
}
