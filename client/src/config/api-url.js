const GenerateApiUrls = function () {
  const DOMAIN =
    process.env.NODE_ENV === 'development' ? '' : window.location.origin;
  const ROOT_URL = '/cockpit-cms';
  const API_TOKEN = '?token=103f29af06747077f89c89c620610d';

  // if domain is needed elsewhere
  this.DOMAIN = DOMAIN;
  this.collection = (name) =>
    `${DOMAIN}${ROOT_URL}/api/collections/get/${name}${API_TOKEN}`;
  this.singleton = (name) =>
    `${DOMAIN}${ROOT_URL}/api/singletons/get/${name}${API_TOKEN}`;
};

export const API_URL = new GenerateApiUrls();
