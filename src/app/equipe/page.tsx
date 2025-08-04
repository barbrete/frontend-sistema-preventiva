'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import api from "@/utils/axios";
import { RoundIconButton } from "@/components/Buttons";
import { Pencil, Plus, Trash, UserCheck, UserRoundCog, Users2, UserX } from "lucide-react";
import SelecaoTecnico from "@/components/Selecao";
import ConfirmacaoExcluir from "@/components/modal/ConfirmacaoExcluir";
import Editar from "@/components/modal/Editar";
import Cadastro from "@/components/modal/Cadastro";
import { criarUsuario, editarUsuario, excluirUsuario } from "@/services/usuario";
import Auth from "@/components/Auth";
import SearchBar from "@/components/SearchBar";

export default function MostrarEquipe() {
    const [open, setOpen] = useState(false);
    const [tecnicos, setTecnicos] = useState<any[]>([]);
    const [modoSelecao, setModoSelecao] = useState<null | "editar" | "excluir">(null);
    const [selecionado, setSelecionado] = useState<number | null>(null); const router = useRouter();
    const [modalExcluir, setModalExcluir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [tecnicoSelecionado, setTecnicoSelecionado] = useState<any>(null);
    const [modalCadastro, setModalCadastro] = useState(false);
    const headerPadding = "pt-24";
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('todos');

    const tecnicosFiltrados = tecnicos.filter(tecnico => {
        // Filtro de busca
        const matchSearch = tecnico.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tecnico.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtro de status
        if (filter === 'ativo') return tecnico.ativo && matchSearch;
        if (filter === 'inativo') return !tecnico.ativo && matchSearch;
        return matchSearch; // 'todos'
    });

    useEffect(() => {
        setLoading(true);
        api.get("/usuarios/tecnicos")
            .then(res => {
                setTecnicos(res.data as any[]);
                setLoading(false);
            })
            .catch(() => {
                setTecnicos([]);
                setLoading(false);
            });
    }, []);

    function handleSelecionar(id: number) {
        setSelecionado(id === selecionado ? null : id);
    }

    useEffect(() => {
        api.get("/usuarios/tecnicos")
            .then(res => setTecnicos(res.data as any[]))
            .catch(() => setTecnicos([]));
    }, []
    );

    function atualizarTecnicos() {
        api.get("/usuarios/tecnicos")
            .then(res => setTecnicos(res.data as any[]))
            .catch(() => setTecnicos([]));
    }

    useEffect(() => {
        if (modoSelecao === "excluir" && selecionado !== null) {
            const tecnico = tecnicos.find(t => t.id === selecionado);
            setTecnicoSelecionado(tecnico);
            setModalExcluir(true);
        } else {
            setModalExcluir(false);
        }

        if (modoSelecao === "editar" && selecionado !== null) {
            const tecnico = tecnicos.find(t => t.id === selecionado);
            setTecnicoSelecionado(tecnico);
            setModalEditar(true);
        } else {
            setModalEditar(false);
        }
    }, [modoSelecao, selecionado, tecnicos]);

    return (
        <Auth apenasAdmin>
            <div className="min-h-screen bg-gradient-to-br from-offWhite via-blue-50 to-royalBlue/20 flex flex-col">                <Menu open={open} setOpen={setOpen} />
                <Header open={open} />
                <main className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-stretch transition-all duration-300 ${open ? "pl-80 md:pl-64 sm:pl-45" : "pl-20 md:pl-20 sm:pl-16"} ${headerPadding}`}>
                    <div className="w-full mx-auto px-4 md:px-8">
                        <div className="mb-8 w-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-royalBlue to-deepNavy rounded-xl flex items-center justify-center shadow-lg">
                                    <UserRoundCog size={28} className="text-white" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-deepNavy">Gerenciar Equipe</h1>
                                    <p className="text-gray-600 text-lg">Visualize e gerencie todos os técnicos da sua equipe</p>
                                </div>
                            </div>
                            <div className="h-1 rounded-md bg-gradient-to-r from-royalBlue/70 to-neonGreen/70" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-neonGreen/10 rounded-lg flex items-center justify-center">
                                        <Users2 size={20} className="text-neonGreen" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Total de Técnicos</p>
                                        <p className="text-2xl font-bold text-deepNavy">{tecnicos.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <UserCheck size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Técnicos Ativos</p>
                                        <p className="text-2xl font-bold text-green-600">{tecnicos.filter(t => t.ativo).length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <UserX size={20} className="text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600 text-sm">Técnicos Desligados</p>
                                        <p className="text-2xl font-bold text-red-600">{tecnicos.filter(t => !t.ativo).length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <SearchBar
                            searchTerm={searchTerm}
                            handleSearchChange={setSearchTerm}
                            filter={filter}
                            handleFilterChange={setFilter}
                        />

                        <SelecaoTecnico
                            tecnicos={tecnicosFiltrados}
                            modoSelecao={modoSelecao}
                            selecionado={selecionado}
                            onSelecionar={handleSelecionar}
                            onCardClick={(id) => router.push(`/perfil/${id}`)}
                            loading={loading}
                        />

                        <div className="flex gap-10 w-full mt-48 justify-center">
                            <RoundIconButton
                                icon={<Plus size={50} className="text-white" />}
                                label="Adicionar"
                                onClick={() => setModalCadastro(true)}
                            />
                            <RoundIconButton
                                icon={<Pencil size={38} className="text-white" />}
                                label="Editar"
                                active={modoSelecao === "editar"}
                                onClick={() => setModoSelecao(modoSelecao === "editar" ? null : "editar")}
                            />
                            <RoundIconButton
                                icon={<Trash size={38} className="text-white" />}
                                label="Excluir"
                                active={modoSelecao === "excluir"}
                                onClick={() => setModoSelecao(modoSelecao === "excluir" ? null : "excluir")}
                            />
                        </div>
                    </div>
                </main>
                <ConfirmacaoExcluir
                    open={modalExcluir}
                    nome={tecnicoSelecionado?.name || ""}
                    onConfirm={async () => {
                        await excluirUsuario(tecnicoSelecionado.id);
                        atualizarTecnicos();
                        setModalExcluir(false);
                        setModoSelecao(null);
                        setSelecionado(null);
                    }}
                    onCancel={() => {
                        setModalExcluir(false);
                        setModoSelecao(null);
                        setSelecionado(null);
                    }}
                />

                <Editar
                    open={modalEditar}
                    nomeInicial={tecnicoSelecionado?.name || ""}
                    emailInicial={tecnicoSelecionado?.email || ""}
                    tipoInicial={tecnicoSelecionado?.tipo || "TECNICO"}
                    ativoInicial={tecnicoSelecionado?.ativo ?? true}
                    onConfirm={async (novoNome, novoEmail, novoTipo, ativo) => {
                        await editarUsuario(tecnicoSelecionado.id, { nome: novoNome, email: novoEmail, tipo: novoTipo, ativo });
                        atualizarTecnicos();
                        setModalEditar(false);
                        setModoSelecao(null);
                        setSelecionado(null);
                    }}
                    onCancel={() => {
                        setModalEditar(false);
                        setModoSelecao(null);
                        setSelecionado(null);
                    }}
                />

                <Cadastro
                    open={modalCadastro}
                    onConfirm={async (nome, email, tipo, ativo) => {
                        await criarUsuario({ nome, email, tipo, ativo });
                        atualizarTecnicos();

                        setModalCadastro(false);
                    }}
                    onCancel={() => setModalCadastro(false)}
                />
                <Footer />
            </div>
        </Auth>
    );
}