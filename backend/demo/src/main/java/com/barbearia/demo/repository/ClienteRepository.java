package com.barbearia.demo.repository;

import com.barbearia.demo.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByTelefone(String telefone);
    Optional<Cliente> findByEmail(String email);
}