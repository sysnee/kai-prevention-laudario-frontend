// import React, { useState, useEffect } from 'react';
// import { X, Save } from 'lucide-react';
// import { PermissionLevel } from '@/src/app/types/pemissions/permissions';
// import { Role } from '@/src/app/types/pemissions/permissions';

// interface RoleModalProps {
//   role: Role | null;
//   onSave: (role: Role) => void;
//   onClose: () => void;
//   mode: 'create' | 'edit' | 'view';
// }

// const STAGES = {
//   archived: 'Arquivado',
//   reported: 'Laudado',
//   completed: 'Concluído',
//   waiting: 'Aguardando',
//   billed: 'Faturado'
// };

// const FEATURES = {
//   patientData: 'Dados do Paciente',
//   technicalData: 'Dados Técnicos',
//   financialData: 'Dados Financeiros',
//   audit: 'Auditoria',
//   settings: 'Configurações'
// };

// const PERMISSION_LEVELS: Record<PermissionLevel, string> = {
//   none: 'Nenhum',
//   read: 'Leitura',
//   write: 'Escrita',
//   approve: 'Aprovação'
// };

// export function RoleModal({ role, onSave, onClose, mode }: RoleModalProps) {
//   const [formData, setFormData] = useState<Role>({
//     id: role?.id || crypto.randomUUID(),
//     name: role?.name || '',
//     description: role?.description || '',
//     type: role?.type || 'custom',
//     maxStage: role?.maxStage || 'waiting',
//     features: role?.features || {
//       patientData: 'none',
//       technicalData: 'none',
//       financialData: 'none',
//       audit: 'none',
//       settings: 'none'
//     },
//     status: role?.status || 'active'
//   });

//   const isViewMode = mode === 'view';

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFeatureChange = (feature: string, level: PermissionLevel) => {
//     setFormData(prev => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         [feature]: level
//       }
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-lg font-semibold text-gray-900">
//             {mode === 'create' ? 'Novo Perfil' : 
//              mode === 'edit' ? 'Editar Perfil' : 'Detalhes do Perfil'}
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Nome do Perfil
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={isViewMode}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent disabled:bg-gray-50"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Descrição
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 disabled={isViewMode}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent disabled:bg-gray-50"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Tipo
//               </label>
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 disabled={isViewMode}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent disabled:bg-gray-50"
//               >
//                 <option value="system">Sistema</option>
//                 <option value="healthcare">Profissional de Saúde</option>
//                 <option value="custom">Personalizado</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Nível Máximo
//               </label>
//               <select
//                 name="maxStage"
//                 value={formData.maxStage}
//                 onChange={handleChange}
//                 disabled={isViewMode}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent disabled:bg-gray-50"
//               >
//                 {Object.entries(STAGES).map(([value, label]) => (
//                   <option key={value} value={value}>{label}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Permissões por Recurso
//               </label>
//               <div className="space-y-4">
//                 {Object.entries(FEATURES).map(([feature, label]) => (
//                   <div key={feature} className="flex items-center justify-between">
//                     <span className="text-sm text-gray-600">{label}</span>
//                     <select
//                       value={formData.features[feature]}
//                       onChange={(e) => handleFeatureChange(feature, e.target.value as PermissionLevel)}
//                       disabled={isViewMode}
//                       className="ml-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent disabled:bg-gray-50"
//                     >
//                       {Object.entries(PERMISSION_LEVELS).map(([value, label]) => (
//                         <option key={value} value={value}>{label}</option>
//                       ))}
//                     </select>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Status
//               </label>
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 disabled={isViewMode}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-kai-primary focus:border-transparent disabled:bg-gray-50"
//               >
//                 <option value="active">Ativo</option>
//                 <option value="inactive">Inativo</option>
//               </select>
//             </div>
//           </div>

//           {!isViewMode && (
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//               >
//                 Cancelar
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 text-sm font-medium text-white bg-kai-primary rounded-md hover:bg-kai-primary/90 flex items-center"
//               >
//                 <Save className="w-4 h-4 mr-2" />
//                 Salvar
//               </button>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }