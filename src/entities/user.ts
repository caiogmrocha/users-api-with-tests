interface IUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  constructor (props: IUserProps) {
    if (!props.id) {
      props.id = `${Date.now()}`
    }
    Object.assign(this, props)
  }
}
