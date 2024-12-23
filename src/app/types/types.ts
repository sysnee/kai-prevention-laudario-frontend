export type Estudo = {
  id: string
  nome: string
  imagens: Imagem[]
  status: string
  laudoId: string | null
}

export type Imagem = {
  id: string
  link: string
}

export type Laudo = {
  id: string
  medico: Medico
}

export type Medico = {
  id: string
  nome: string
  avatar: string
}

export type Achado = {
  id: string
  laudoId: string
  imagemId: string
  titulo: string
  orgao: string
  sistema: string
  patologias: string[]
  severidade: string
  observacoes: string
}
