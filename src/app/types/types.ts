type User = {
    id: string,
    nome: string,
    avatar: string
}


type Estudo = {
    id: string,
    nome: string,
    imagens: Imagem[],
    status: string,
    laudoId: string | null
}

type Imagem = {
    id: string, 
    link: string
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

