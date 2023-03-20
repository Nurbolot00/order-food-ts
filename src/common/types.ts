export enum UserRoles{
    ADMIN = "ADMIN",
    USER = "USER",
    GUEST = "GUEST",
}

export interface Meal {
    readonly _id : string
    price: number;
    title: string;
    amount: number;
    description: string
}


export type SignUpUser = {
    name: string
    email: string
    password: string
    confirm: string
    role: string
}

export  type Column<T> = {
    header: string
    key: string
    minWidth?: string | number
    align?: 'left' | 'right' | 'center'
    index?: boolean
    render?: (meal: T) => JSX.Element
  }


  export type updateMealData = {
    id?: string
    data: {
        title: string
        description: string
        price: number
    }
}