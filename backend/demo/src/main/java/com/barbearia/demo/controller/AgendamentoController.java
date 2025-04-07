package com.barbearia.demo.controller;

import com.barbearia.demo.model.Agendamento;
import com.barbearia.demo.model.AgendamentoDTO;
import com.barbearia.demo.service.AgendamentoService;

import jakarta.transaction.Transactional;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @PostMapping
    public ResponseEntity<Agendamento> criarAgendamento(@RequestBody AgendamentoDTO agendamentoDTO) {
        Agendamento novoAgendamento = agendamentoService.criarAgendamento(agendamentoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoAgendamento);
    }

    @GetMapping
    public List<Agendamento> listarAgendamentos() {
        return agendamentoService.listarAgendamentos();
    }

    @GetMapping("/periodo")
    public List<Agendamento> listarPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        return agendamentoService.listarAgendamentosPorPeriodo(inicio, fim);
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Agendamento> listarPorCliente(@PathVariable Long clienteId) {
        return agendamentoService.listarAgendamentosPorCliente(clienteId);
    }

    @PutMapping("/{id}")
    public Agendamento atualizarAgendamento(@PathVariable Long id, @RequestBody Agendamento agendamento) {
        return agendamentoService.atualizarAgendamento(id, agendamento);
    }

    @Transactional
    @DeleteMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelarAgendamento(@PathVariable Long id) {
        agendamentoService.cancelarAgendamento(id);
        return ResponseEntity.noContent().build();
    }
}