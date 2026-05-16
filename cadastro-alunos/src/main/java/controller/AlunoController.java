package controller;

public class AlunoController {
}

package com.example.cadastroalunos.controller;

import com.example.cadastroalunos.model.Aluno;
import com.example.cadastroalunos.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

        import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository repository;

    @GetMapping
    public List<Aluno> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Aluno> buscarPorId(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping
    public Aluno cadastrar(@RequestBody Aluno aluno) {
        return repository.save(aluno);
    }

    @PutMapping("/{id}")
    public Aluno atualizar(@PathVariable Long id,
                           @RequestBody Aluno alunoAtualizado) {

        Aluno aluno = repository.findById(id).orElseThrow();

        aluno.setNome(alunoAtualizado.getNome());
        aluno.setMatricula(alunoAtualizado.getMatricula());
        aluno.setEmail(alunoAtualizado.getEmail());
        aluno.setCurso(alunoAtualizado.getCurso());
        aluno.setAnoIngresso(alunoAtualizado.getAnoIngresso());

        return repository.save(aluno);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}