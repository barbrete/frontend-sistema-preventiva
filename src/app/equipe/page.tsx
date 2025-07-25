'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import api from "@/utils/axios";
import RoundIconButton from "@/components/Buttons";
import { Pencil, Plus, Trash } from "lucide-react";
import SelecaoTecnico from "@/components/Selecao";
import ConfirmacaoExcluir from "@/components/modal/ConfirmacaoExcluir";
import Editar from "@/components/modal/Editar";
import Cadastro from "@/components/modal/Cadastro";
import { criarUsuario, editarUsuario, excluirUsuario } from "@/services/usuario";
import Auth from "@/components/Auth";

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
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex flex-col">
                <Menu open={open} setOpen={setOpen} />
                <Header open={open} />
                <main className={`flex-1 w-full bg-white shadow-lg p-8 flex flex-col items-stretch mt-8 transition-all duration-300 ${open ? "pl-80 md:pl-64 sm:pl-45" : "pl-20 md:pl-20 sm:pl-16"} ${headerPadding}`}>
                    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                        <h1 className="text-5xl text-blue-700 font-bold">Técnicos</h1>
                        <div className="border-t-2 border-blue-200 mb-8 mt-8" />

                        <SelecaoTecnico
                            tecnicos={tecnicos}
                            modoSelecao={modoSelecao}
                            selecionado={selecionado}
                            onSelecionar={handleSelecionar}
                            onCardClick={(id) => router.push(`/perfil/${id}`)}
                            loading={loading}
                        />

                        <div className="flex gap-10 w-full mt-20 justify-center">
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