export class Worker {
  public id;
  constructor(
    public firstName = '',
    public lastName = '',
    public middleName = '',
    public phone = '',
    public email = '',
    public date: number|string = ''
  ) {}
}
