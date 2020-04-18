/**
 * Validates the input parameter needed.
 */
export class StartParameter {

  private parameter: any;

  constructor(environment: any) {
    this.parameter = environment;
  }

  /**
  * Thorws an error when any of the required environmen variables is not set.
  */
  validate() {
    if (!this.parameter.RNV_API_TOKEN) {
      throw new Error('No API token via RNV_API_TOKEN set!');
    }
  }
}
