"use client";

import React, { useState } from "react";
import {
  Users,
  Settings,
  DollarSign,
  FileText,
  Grid,
  List,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { Role } from "../../types/pemissions/permissions";
import { RoleModal } from "./components/RoleModal";

const FEATURE_ICONS = {
  patientData: Users,
  technicalData: Settings,
  financialData: DollarSign,
  audit: FileText,
  settings: Settings,
};

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Recepcionista",
    description: "Gestão de agendamentos e controle inicial de exames",
    type: "custom",
    modules: {
      patient: "write",
      exam: {
        planned: "write",
        waiting: "read",
        started: "none",
        completed: "none",
        reported: "read",
      },
    },
    status: "active",
  },
  {
    id: "2",
    name: "Enfermeiro",
    description: "Auxílio em exames e gerenciamento intermediário",
    type: "healthcare",
    modules: {
      patient: "read",
      exam: {
        planned: "read",
        waiting: "read",
        started: "write",
        completed: "write",
        reported: "none",
      },
    },
    status: "active",
  },
  {
    id: "3",
    name: "Técnico Biomédico",
    description: "Operação de equipamentos e registro de exames",
    type: "healthcare",
    modules: {
      patient: "read",
      exam: {
        planned: "read",
        waiting: "write",
        started: "write",
        completed: "write",
        reported: "none",
      },
    },
    status: "active",
  },
  {
    id: "4",
    name: "Radiologista",
    description: "Análise de exames e geração de laudos",
    type: "healthcare",
    modules: {
      patient: "read",
      exam: {
        planned: "none",
        waiting: "read",
        started: "read",
        completed: "read",
        reported: "write",
      },
    },
    status: "active",
  },
  {
    id: "5",
    name: "HeadDoctor",
    description: "Coordenação geral e validação de exames e laudos",
    type: "management",
    modules: {
      patient: "read",
      exam: {
        planned: "read",
        waiting: "read",
        started: "read",
        completed: "read",
        reported: "write",
      },
    },
    status: "active",
  },
  {
    id: "6",
    name: "Master",
    description: "Acesso completo ao sistema",
    type: "system",
    modules: {
      patient: "full",
      exam: {
        planned: "full",
        waiting: "full",
        started: "full",
        completed: "full",
        reported: "full",
      },
    },
    status: "active",
  },
];

export default function PermissionsManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view" | null>(
    null
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (updatedRole: Role) => {
    if (modalMode === "create") {
      setRoles([...roles, { ...updatedRole, id: crypto.randomUUID() }]);
    } else {
      setRoles(
        roles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
      );
    }
    setModalMode(null);
    setSelectedRole(null);
  };

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (roleToDelete) {
      setRoles(roles.filter((role) => role.id !== roleToDelete.id));
      setDeleteModalOpen(false);
      setRoleToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar perfis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kai-primary focus:border-transparent"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex rounded-lg border border-gray-200 p-1 bg-white">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded flex items-center ${
                viewMode === "list"
                  ? "bg-kai-gray-50 text-kai-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <List className="w-5 h-5 mr-2" />
              Lista
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded flex items-center ${
                viewMode === "grid"
                  ? "bg-kai-gray-50 text-kai-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Grid className="w-5 h-5 mr-2" />
              Grade
            </button>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedRole(null);
            setModalMode("create");
          }}
          className="px-4 py-2 bg-kai-primary text-white rounded-lg hover:bg-kai-primary/90 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Perfil
        </button>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {role.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    role.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {role.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>

              <div className="space-y-3">
                {/* {Object.entries(role.modules).map(([feature, permission]) => {
                  const Icon =
                    FEATURE_ICONS[feature as keyof typeof FEATURE_ICONS];
                  return (
                    <div
                      key={feature}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center">
                        {Icon && <Icon className="w-4 h-4 mr-2" />}
                        <span>
                          {feature === "patientData"
                            ? "Dados do Paciente"
                            : feature === "technicalData"
                            ? "Dados Técnicos"
                            : feature === "financialData"
                            ? "Dados Financeiros"
                            : feature === "audit"
                            ? "Auditoria"
                            : "Configurações"}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          permission === "approve"
                            ? "bg-blue-100 text-blue-800"
                            : permission === "write"
                            ? "bg-green-100 text-green-800"
                            : permission === "read"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {permission === "approve"
                          ? "Aprovação"
                          : permission === "write"
                          ? "Escrita"
                          : permission === "read"
                          ? "Leitura"
                          : "Nenhum"}
                      </span>
                    </div>
                  );
                })} */}
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setModalMode("view");
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedRole(role);
                    setModalMode("edit");
                  }}
                  className="p-2 text-gray-400 hover:text-kai-primary rounded-lg hover:bg-kai-gray-50"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(role)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="grid grid-cols-6 gap-4 p-4 font-medium text-gray-500 border-b border-gray-200">
            <div className="col-span-2">Perfil</div>
            <div>Tipo</div>
            <div>Nível Máximo</div>
            <div>Status</div>
            <div className="text-right">Ações</div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className="grid grid-cols-6 gap-4 p-4 items-center"
              >
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">{role.name}</div>
                  <div className="text-sm text-gray-500">
                    {role.description}
                  </div>
                </div>
                <div className="capitalize text-gray-600">{role.type}</div>
                {/* <div className="text-gray-600">{role.maxStage}</div> */}
                <div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      role.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {role.status === "active" ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setModalMode("view");
                    }}
                    className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRole(role);
                      setModalMode("edit");
                    }}
                    className="p-2 text-gray-400 hover:text-kai-primary rounded-lg hover:bg-kai-gray-50"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(role)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalMode && (
        <RoleModal
          role={selectedRole}
          onSave={handleSave}
          onClose={() => {
            setModalMode(null);
            setSelectedRole(null);
          }}
          mode={modalMode}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setRoleToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        roleName={roleToDelete?.name || ""}
      />
    </div>
  );
}
