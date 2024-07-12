import { LitElement, html } from 'lit-element';
import '@bbva-global-apis-dm/bbva-global-generic-dm';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <pokeapi-dm></pokeapi-dm>
 * ```
 */
export class PokeapiDm extends LitElement {
  static get properties() {
    return {
      params: { type: Object },
    };
  }

  constructor() {
    super();
    this.params = {
      path: ''
    };
  }

  render() {
    return html`
      <p>Welcome to</p>
      <bbva-global-generic-dm
        id="el"
        method="GET"
        @request-success="${this._getCommissionSuccess}"
        @request-error="${this._getCommissionError}"
        ></bbva-global-generic-dm>
      <button
        class="btn btn-primary"
        type="button"
        @click="${this.getPokemonData}"
      >
        Text
      </button>
    `;
  }

  _getCommissionSuccess(success) {
    console.log(success.detail);
    this.dispatchEvent(new CustomEvent('get-commission-success', {
      detail: success.detail
    }));
  }

  _getCommissionError(error) {
    console.log(error.detail);
    this.dispatchEvent(new CustomEvent('get-commission-error', {
      detail: error.detail
    }));
  }

  async getPokemonData() {
    await this.requestUpdate();
    const genericDM = this .shadowRoot.querySelector('#el');
    genericDM.path = this.params.path;
    genericDM.host = 'https://pokeapi.co/api/v2/pokemon/';
    genericDM.crossDomain = false;
    genericDM.getData();
  }


}
