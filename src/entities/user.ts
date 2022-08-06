
export interface IUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  props: IUserProps;

  constructor (props: IUserProps) {
    if (!props.id) {
      props.id = `${Date.now()}`;
    }

    this.props = props;
  }
}
