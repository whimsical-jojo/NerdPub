export interface Member{
    id?:number,
    firstName:string,
    lastName:string,
    username:string,
    password?:string,
    email?:string,
    dob:Date,
    role?:string,
    banned?:boolean
}

export interface PubTable{
    id?:number,
    name:string,
    capacity:number,
    available:boolean
    pub:Pub
    pubId?:number
}

export interface Game{
    id?:number,
    title:string,
    description:string

}

export interface GameSession{
    id?:number,
    date:Date | string,
    game:Game,
    table:PubTable
    gameId:number,
    tableId:number,
    bookedSpots:number
}

export interface GameSessionBooking{
    id?:number,
    member:Member,
    session:GameSession,
    date:Date
}

export interface Pub{
    id?:number,
    name:string,
    address:string,
    city:string

}