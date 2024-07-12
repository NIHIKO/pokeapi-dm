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
      path: { type: String },
    };
  }

  constructor() {
    super();
    this.path = '';
  }

  render() {
    return html`
      <bbva-global-generic-dm
        id="el"
        @request-success="${this._getPokemonSuccess}"
        @request-error="${this._getPokemonError}"
      ></bbva-global-generic-dm>
      <bbva-global-generic-dm
        id="el2"
        @request-success="${this._getPokemonInfoSuccess}"
        @request-error="${this._getPokemonInfoError}"
      ></bbva-global-generic-dm>
    `;
  }

  async getPokemonData() {
    await this.requestUpdate();
    const genericDM = this.shadowRoot.querySelector("#el");
    genericDM.method = "GET";
    genericDM.host = "https://pokeapi.co/api/v2/pokemon/";
    genericDM.crossDomain = false;
    genericDM.getData();
  }

  async getPokemonInfo() {
    await this.requestUpdate();
    const genericDM = this.shadowRoot.querySelector("#el2");
    genericDM.path = this.path;
    genericDM.method = "GET";
    genericDM.host = "https://pokeapi.co/api/v2/pokemon/";
    genericDM.crossDomain = false;
    genericDM.getData();
  }

  _getPokemonSuccess(success) {
    console.log(success.detail);
    this._fireEvent("get-pokemon-success", success.detail);
  }

  _getPokemonError(error) {
    this._fireEvent("get-pokemon-error", error.detail);
  }

  _getPokemonInfoSuccess(success) {
    this._fireEvent("get-pokemon-info-success", success.detail);
  }

  _getPokemonInfoError(error) {
    this._fireEvent("get-pokemon-info-error", error.detail);
  }

  _fireEvent(event, detail) {
    this.dispatchEvent(
      new CustomEvent(event, {
        bubbles: true,
        composed: true,
        detail: detail,
      })
    );
  }
}
