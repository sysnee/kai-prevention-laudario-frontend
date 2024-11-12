type User = {
    id: string,
    nome: string,
    avatar: string
}

type Estudo = {
    id: string,
    nome: string,
    imagens: string[],
    status: string,
    laudoId: string | null
}

type Laudo = {
    id: string,
    medico: Medico
}

type Medico = {
    id: string,
    nome: string,
    avatar: string
}

