/** Class to represent confirm dialog model. */
export class ConfirmDialogModel {
  constructor(
    public title: string,
    public message: string,
    public normal: boolean,
  ) {}
}
