package com.barbearia.demo.service;

import com.barbearia.demo.model.Cliente;
import com.barbearia.demo.model.exception.ResourceNotFoundException;
import com.barbearia.demo.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Criar novo cliente
    public Cliente criarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    // Buscar todos os clientes
    public List<Cliente> listarTodosClientes() {
        return clienteRepository.findAll();
    }

    // Buscar cliente por ID
    public Cliente buscarClientePorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "id", id));
    }

    // Atualizar cliente
    public Cliente atualizarCliente(Long id, Cliente clienteAtualizado) {
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "id", id));

        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setTelefone(clienteAtualizado.getTelefone());
        clienteExistente.setEmail(clienteAtualizado.getEmail());
        clienteExistente.setDataNascimento(clienteAtualizado.getDataNascimento());

        return clienteRepository.save(clienteExistente);
    }

    // Deletar cliente
    public void deletarCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "id", id));
        
        clienteRepository.delete(cliente);
    }

    // Buscar cliente por telefone (exemplo de método customizado)
    public Cliente buscarPorTelefone(String telefone) {
        return clienteRepository.findByTelefone(telefone)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente", "telefone", telefone));
    }
}