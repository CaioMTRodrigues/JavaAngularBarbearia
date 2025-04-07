package com.barbearia.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AgendamentoDTO {
    @NotNull(message = "ID do cliente é obrigatório")
    private Long clienteId;

    @NotBlank(message = "Barbeiro é obrigatório")
    @Size(min = 3, max = 100)
    private String barbeiro;

    @NotNull
    @Future
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime dataHora;

    @NotBlank
    @Size(min = 3, max = 100)
    private String servico;

    @Size(max = 500)
    private String observacoes;
}
