package com.barbearia.demo.repository;

import com.barbearia.demo.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByDataHoraBetween(LocalDateTime inicio, LocalDateTime fim);
    List<Agendamento> findByClienteId(Long clienteId);
    boolean existsByBarbeiroAndDataHora(String barbeiro, LocalDateTime dataHora);
}