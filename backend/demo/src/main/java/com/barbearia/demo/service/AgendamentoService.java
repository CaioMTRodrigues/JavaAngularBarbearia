package com.barbearia.demo.service;

import com.barbearia.demo.exception.ConflictException;
import com.barbearia.demo.exception.ResourceNotFoundException;
import com.barbearia.demo.model.Agendamento;
import com.barbearia.demo.model.AgendamentoDTO;
import com.barbearia.demo.model.Cliente;
import com.barbearia.demo.model.StatusAgendamento;
import com.barbearia.demo.repository.AgendamentoRepository;
import com.barbearia.demo.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository, 
                            ClienteRepository clienteRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
    }

    @Transactional
    public Agendamento criarAgendamento(AgendamentoDTO agendamentoDTO) {
        // 1. Busca o cliente
        Cliente cliente = clienteRepository.findById(agendamentoDTO.getClienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "id", agendamentoDTO.getClienteId()));
        
        // 2. Verifica conflito de horário
        if (agendamentoRepository.existsByBarbeiroAndDataHora(
                agendamentoDTO.getBarbeiro(),
                agendamentoDTO.getDataHora())) {
            throw new ConflictException("Barbeiro já possui agendamento neste horário");
        }
        
        // 3. Cria o agendamento
        Agendamento agendamento = new Agendamento();
        agendamento.setCliente(cliente);
        agendamento.setBarbeiro(agendamentoDTO.getBarbeiro());
        agendamento.setDataHora(agendamentoDTO.getDataHora());
        agendamento.setServico(agendamentoDTO.getServico());
        agendamento.setObservacoes(agendamentoDTO.getObservacoes());
        agendamento.setStatus(StatusAgendamento.AGENDADO); // Definir status padrão
        
        return agendamentoRepository.save(agendamento);
    }

    public List<Agendamento> listarAgendamentos() {
        return agendamentoRepository.findAll();
    }

    public List<Agendamento> listarAgendamentosPorPeriodo(LocalDateTime inicio, LocalDateTime fim) {
        return agendamentoRepository.findByDataHoraBetween(inicio, fim);
    }

    public List<Agendamento> listarAgendamentosPorCliente(Long clienteId) {
        return agendamentoRepository.findByClienteId(clienteId);
    }

    @Transactional
    public Agendamento atualizarAgendamento(Long id, Agendamento agendamentoAtualizado) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento", "id", id));
        
        // Atualiza apenas os campos permitidos
        agendamento.setDataHora(agendamentoAtualizado.getDataHora());
        agendamento.setServico(agendamentoAtualizado.getServico());
        agendamento.setBarbeiro(agendamentoAtualizado.getBarbeiro());
        agendamento.setObservacoes(agendamentoAtualizado.getObservacoes());
        agendamento.setStatus(agendamentoAtualizado.getStatus());
        
        return agendamentoRepository.save(agendamento);
    }

    @Transactional
    public void cancelarAgendamento(Long id) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Agendamento", "id", id));
        
        agendamento.setStatus(StatusAgendamento.CANCELADO);
        agendamentoRepository.deleteById(id);
        // agendamentoRepository.saveAndFlush(agendamento);
    }
}