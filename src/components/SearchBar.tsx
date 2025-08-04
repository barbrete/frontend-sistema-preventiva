import React from 'react'
import { TextField, InputAdornment, Select, MenuItem } from '@mui/material';
import { Search } from 'lucide-react';

interface SearchBarProps {
    filter: string;
    handleFilterChange: (value: string) => void;
    searchTerm?: string;
    handleSearchChange?: (value: string) => void;
}

export default function SearchBar({ filter, handleFilterChange, searchTerm = '', handleSearchChange = () => { }, }: SearchBarProps) {
    return (
        <div className="flex gap-4 items-center justify-between mb-5 mt-5">
            <TextField
                className="flex-1"
                placeholder="Buscar Técnicos..."
                variant="outlined"
                value={searchTerm}
                onChange={e => handleSearchChange(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '1rem',
                        background: '#f6f8fa',
                        fontSize: '1rem',
                        color: '#1e293b',
                        boxShadow: '0 2px 8px 0 #e0e7ef33',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd',
                    },
                    minWidth: 500,
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <div className="bg-gradient-to-b from-deepNavy to-neonGreen rounded-3xl p-2 flex items-center justify-center">
                                    <Search color="white" />
                                </div>
                            </InputAdornment>
                        ),
                    },
                }}
            />
            <Select
                value={filter}
                onChange={e => handleFilterChange(e.target.value as string)}
                sx={{
                    borderRadius: '1rem',
                    background: '#f6f8fa',
                    fontSize: '1rem',
                    color: '#1e293b',
                    boxShadow: '0 2px 8px 0 #e0e7ef33',
                    minWidth: 110,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#ddd',
                    },
                }}
            >
                <MenuItem value="todos">Todos</MenuItem>
                <MenuItem value="ativo">Ativos</MenuItem>
                <MenuItem value="inativo">Desligados</MenuItem>
            </Select>
        </div>
    );
}