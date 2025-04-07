package com.barbearia.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;
    
    @NotBlank(message = "Telefone é obrigatório")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Telefone inválido")
    private String telefone;
    
    @Email(message = "Email deve ser válido")
    private String email;
    
    @Past(message = "Data de nascimento deve ser no passado")
    private LocalDate dataNascimento;
}