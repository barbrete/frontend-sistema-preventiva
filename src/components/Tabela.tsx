import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import api from "@/utils/axios";
import { Preventiva } from "@/utils/Interfaces";
import LoadingOverlay from "@/components/Loading";

interface TabelaPreventivasProps {
  preventivas: Preventiva[];
  loading?: boolean;
  onRowClick?: (id: number) => void;
  user_id?: number;
}

interface TabelaPreventivasGeralProps {
  loading?: boolean;
  onRowClick?: (id: number) => void;
  preventivas: Preventiva[];
}

export function TabelaPreventivas({ preventivas, loading = false, onRowClick, user_id }: TabelaPreventivasProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [preventivasState, setPreventivas] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPreventivas() {
      setLoading(true);
      try {
        const res = await api.get<{ preventivas: Preventiva[]; total: number }>(
          `/preventivas/paginacao/${user_id}?page=${page + 1
          }&limit=${rowsPerPage}`
        );
        setPreventivas(res.data.preventivas);
        setTotal(res.data.total);
      } catch (err) {
        setPreventivas([]);
        setTotal(0);
      }
      setLoading(false);
    }
    fetchPreventivas();
  }, [page, rowsPerPage, user_id]);

  return (
    <TableContainer
      sx={{ borderRadius: 2, boxShadow: 3, background: "#EFF6FF" }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#38b6ff" }}>
            <TableCell
              align="center"
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
            >
              Nome
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
            >
              Kilometragem
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
            >
              {"Irregularidades\nEncontradas"}
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
            >
              {"Irregularidades\nCorrigidas"}
            </TableCell>
            <TableCell align="center"
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
            >
              Data de Criação
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <LoadingOverlay show={true} text="Carregando preventivas..." />
              </TableCell>
            </TableRow>
          ) : preventivasState.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Carregando preventivas...
              </TableCell>
            </TableRow>
          ) : (
            preventivasState.map((p, idx) => (
              <TableRow
                key={p.id}
                hover
                sx={{
                  cursor: "pointer",
                  backgroundColor: idx % 2 === 0 ? "#c2dff6" : "#fff",
                }}
                onClick={() => onRowClick && onRowClick(p.id)}
              >
                <TableCell align="center">{p.id}</TableCell>
                <TableCell>{p.nome || "-"}</TableCell>
                <TableCell align="center">
                  {p.kilometragem_percorrida}
                </TableCell>
                <TableCell align="center">
                  {p.irregularidades_encontradas}
                </TableCell>
                <TableCell align="center">
                  {p.irregularidades_corrigidas}
                </TableCell>
                <TableCell align="center">
                  {new Date(p.created_at).toLocaleDateString("pt-br")}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        labelRowsPerPage="Linhas por página"
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
}

export function TabelaPreventivasGeral({ loading = false, onRowClick }: TabelaPreventivasGeralProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [preventivasState, setPreventivas] = useState<Preventiva[]>([]);
  const [total, setTotal] = useState(0);
  const [, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPreventivas() {
      setLoading(true);
      try {
        const res = await api.get<{ preventivas: Preventiva[]; total: number }>(
          `/preventivas/paginacao?page=${page + 1}&limit=${rowsPerPage}`
        );
        setPreventivas(res.data.preventivas);
        setTotal(res.data.total);
      } catch (err) {
        setPreventivas([]);
        setTotal(0);
      }
      setLoading(false);
    }
    fetchPreventivas();
  }, [page, rowsPerPage]);

  return (
    <TableContainer sx={{ borderRadius: 2, boxShadow: 3, background: "#EFF6FF" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#38b6ff" }}>

            <TableCell 
              align="center" 
              sx={{ 
                color: "#fff", 
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
                }}
              >
                {"ID"}
              </TableCell>

            <TableCell 
              align="center" 
              sx={{ 
                color: "#fff", 
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
            >
              Nome do técnico
            </TableCell>

            <TableCell 
              align="center" 
              sx={{ 
                color: "#fff", 
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
              >
                Nome da Preventiva
              </TableCell>

            <TableCell 
              align="center" 
              sx={{ 
                color: "#fff", 
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
            >
              Kilometragem
            </TableCell>
            
            <TableCell
              align="center"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
            >
              {"Irregularidades\nEncontradas"}
            </TableCell>

            <TableCell
              align="center"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
            >
              {"Irregularidades\nCorrigidas"}
            </TableCell>

            <TableCell 
              align="center" 
              sx={{  
                color: "#fff", 
                fontWeight: "bold",
                fontSize: "1rem",
                whiteSpace: "pre-line", 
              }}
            >
              {"Data de Criação"}
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <LoadingOverlay show={true} text="Carregando preventivas..." />
              </TableCell>
            </TableRow>
          ) : preventivasState.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhuma preventiva encontrada.
              </TableCell>
            </TableRow>
          ) : (
            preventivasState.map((p, idx) => (
              <TableRow
                key={p.id}
                hover
                sx={{
                  cursor: "pointer",
                  backgroundColor: idx % 2 === 0 ? "#c2dff6" : "#fff",
                }}
                onClick={() => onRowClick && onRowClick(p.id)}
              >
                <TableCell align="center">{p.id}</TableCell>
                <TableCell align="center">{p.usuario.name}</TableCell>
                <TableCell>{p.nome || "-"}</TableCell>
                <TableCell align="center">{p.kilometragem_percorrida}</TableCell>
                <TableCell align="center">{p.irregularidades_encontradas}</TableCell>
                <TableCell align="center">{p.irregularidades_corrigidas}</TableCell>
                <TableCell align="center">{new Date(p.created_at).toLocaleDateString("pt-br")}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        labelRowsPerPage="Linhas por página"
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
}
