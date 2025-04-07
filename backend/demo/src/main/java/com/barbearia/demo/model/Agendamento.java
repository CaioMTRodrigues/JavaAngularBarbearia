package com.barbearia.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @NotNull(message = "Cliente é obrigatório")
    private Cliente cliente;
    
    @NotNull(message = "Data/hora é obrigatória")
    @Future(message = "Data deve ser no futuro")
    private LocalDateTime dataHora;
    
    @NotBlank(message = "Serviço é obrigatório")
    private String servico;
    
    @NotBlank(message = "Barbeiro é obrigatório")
    private String barbeiro;
    
    private String observacoes;
    
    @Enumerated(EnumType.STRING)
    private StatusAgendamento status = StatusAgendamento.AGENDADO;
    
}
