export const examsList = [
  {
    id: 'raio-x-torax',
    name: 'Raio-X de Tórax',
    description: 'Exame de imagem que permite visualizar estruturas do tórax, incluindo pulmões, coração e ossos.',
    price: 150.00,
    duration: '15-20 min',
    preparation: 'Não é necessário jejum',
    category: 'radiologia',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    requirements: ['Documento com foto', 'Pedido médico'],
    instructions: [
      'Retire colares, brincos e objetos metálicos',
      'Vista a roupa apropriada fornecida pela clínica',
      'Informe se houver possibilidade de gravidez'
    ]
  },
  {
    id: 'ressonancia-cranio',
    name: 'Ressonância Magnética de Crânio',
    description: 'Exame detalhado do cérebro e estruturas do crânio utilizando campo magnético.',
    price: 800.00,
    duration: '40-60 min',
    preparation: 'Jejum de 4 horas',
    category: 'ressonancia',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    requirements: ['Documento com foto', 'Pedido médico'],
    instructions: [
      'Não use maquiagem ou cremes',
      'Retire todos os objetos metálicos',
      'Informe sobre implantes ou marca-passo'
    ]
  },
  {
    id: 'ultrassom-abdomen',
    name: 'Ultrassom de Abdômen Total',
    description: 'Exame por ultrassom que avalia órgãos abdominais como fígado, vesícula, rins e pâncreas.',
    price: 250.00,
    duration: '30 min',
    preparation: 'Jejum de 6 horas',
    category: 'ultrassom',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    requirements: ['Documento com foto', 'Pedido médico'],
    instructions: [
      'Jejum absoluto de 6 horas',
      'Tomar 6 copos de água 1 hora antes',
      'Não urinar 1 hora antes do exame'
    ]
  }
];