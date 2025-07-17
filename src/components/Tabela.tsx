import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import api from "@/utils/axios";

interface Preventiva {
  id: number;
  nome?: string;
  kilometragem_percorrida: number;
  irregularidades_encontradas: number;
  irregularidades_corrigidas: number;
  created_at: string;
}

interface TabelaPreventivasProps {
  preventivas: Preventiva[];
  onRowClick?: (id: number) => void;
}

export default function TabelaPreventivas({ preventivas, onRowClick }: TabelaPreventivasProps) {
  const [page, setPage] = useState(0); // Material UI começa do 0
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [preventivasState, setPreventivas] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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
            <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nome</TableCell>
            <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold" }}>Kilometragem</TableCell>
            <TableCell align="center" sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "pre-line"}}>{"Irregularidades\nEncontradas"}</TableCell>
            <TableCell
              align="center"
              sx={{ color: "#fff", fontWeight: "bold" , whiteSpace: "pre-line"}}
            >
              {"Irregularidades\nCorrigidas"}
            </TableCell>            
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Data de Criação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {preventivas.map((p, idx) => (
            <TableRow
              key={p.id}
              hover
              sx={{
                cursor: "pointer",
                backgroundColor: idx % 2 === 0 ? "#c2dff6" : "#fff"
              }}
              onClick={() => onRowClick && onRowClick(p.id)}
            >
              <TableCell align="center">{p.id}</TableCell>
              <TableCell>{p.nome || "-"}</TableCell>
              <TableCell align="center">{p.kilometragem_percorrida}</TableCell>
              <TableCell align="center">{p.irregularidades_encontradas}</TableCell>
              <TableCell align="center">{p.irregularidades_corrigidas}</TableCell>
              <TableCell>{new Date(p.created_at).toLocaleDateString('pt-br')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />

    </TableContainer>
  );
}